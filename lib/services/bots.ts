import { eq } from 'drizzle-orm';
import { Bot, GrammyError } from 'grammy';
import * as grammy from 'grammy';

import { LibsqlError } from '@libsql/client';

import {
  Bot as BotSchema,
  bots as botSchema,
} from '#/lib/db/schema';

import db from '../db';
import { getOf } from './handlers';

declare module globalThis {
  var instances: Map<string, Bot>;
}

async function create(token: string) {
  const bot = new Bot(token);
  const me = await bot.api.getMe();

  let picture = Buffer.from('');

  const photos =
    await bot.api.getUserProfilePhotos(me.id);
  if (photos.total_count > 0) {
    const file = await bot.api.getFile(
      photos.photos[0][0].file_id,
    );
    const response = await fetch(
      `https://api.telegram.org/file/bot${token}/${file.file_path}`,
    );
    const blog = await response.blob();
    picture = Buffer.from(
      await blog.arrayBuffer(),
    );
  }

  try {
    await db.insert(botSchema).values({
      id: me.id.toString(),
      name: me.first_name,
      picture: `data:image/jpeg;base64,${picture.toString(
        'base64',
      )}`,
      status: 0,
      username: me.username,
      token: token,
    });
    return me;
  } catch (err) {
    if (err instanceof LibsqlError) {
      if (
        err.code ===
        'SQLITE_CONSTRAINT_PRIMARYKEY'
      ) {
        throw new Error('Bot already exists');
      }
    }
  }
}

function all(
  ids: string[] = [],
  where?: {
    status?: number;
  },
) {
  if (ids.length === 0) {
    return db.query.bots.findMany({
      where(fields, operators) {
        if (where?.status) {
          return operators.eq(
            fields.status,
            where.status,
          );
        }
      },
    });
  }

  return db.query.bots.findMany({
    where(fields, operators) {
      return operators.inArray(fields.id, ids);
    },
  });
}

function get(id: string) {
  return db.query.bots.findFirst({
    where(fields, operators) {
      return operators.eq(fields.id, id);
    },
  });
}

function update(
  id: string,
  data: Partial<BotSchema>,
) {
  return db
    .update(botSchema)
    .set(data)
    .where(eq(botSchema.id, id));
}

async function updateToken(
  id: string,
  newToken: string,
) {
  const bot = await get(id);

  if (!bot) {
    throw new Error('Bot not found');
  }

  try {
    const i = new Bot(newToken);
    const me = await i.api.getMe();

    if (bot.id !== me.id.toString()) {
      throw new Error(
        'You are trying to update the token with a different bot',
      );
    }
    return update(id, { token: newToken });
  } catch (e) {
    if (e instanceof GrammyError) {
      throw new Error(e.message);
    }
  }
}

async function enableWebhook(
  botId: string,
  url: string,
) {
  const bot = await get(botId);

  if (!bot) {
    throw new Error('Bot not found');
  }

  const hasInstance =
    globalThis.instances?.has(botId);
  if (hasInstance) {
    const instance =
      globalThis.instances.get(botId)!;
    const res = await instance.api.setWebhook(
      `${url}?botId=${botId}`,
    );
    return update(botId, {
      enableWebhook: res,
      webhookUrl: url,
    });
  }

  try {
    const i = new Bot(bot.token);
    await i.api.setWebhook(
      `${url}?botId=${botId}`,
    );

    return update(botId, {
      enableWebhook: true,
      webhookUrl: url,
    });
  } catch (err) {
    if (err instanceof GrammyError) {
      throw new Error(err.description);
    }
  }
}

async function disableWebhook(botId: string) {
  const bot = await get(botId);

  if (!bot) {
    throw new Error('Bot not found');
  }

  const hasInstance =
    globalThis.instances?.has(botId);
  if (hasInstance) {
    const instance =
      globalThis.instances.get(botId)!;
    const res =
      await instance.api.deleteWebhook();
    return update(botId, {
      enableWebhook: res,
    });
  }

  try {
    const i = new Bot(bot.token);
    await i.api.deleteWebhook();

    return update(botId, {
      enableWebhook: false,
    });
  } catch (err) {
    if (err instanceof GrammyError) {
      throw new Error(err.description);
    }
  }
}

async function launchBots(ids?: string[]) {
  const bots = await all(ids, { status: 1 });
  const instances = new Map<string, Bot>();

  // for code evaluation
  const Composer = grammy.Composer;

  for (const data of bots) {
    if (globalThis.instances?.has(data.id)) {
      continue;
    }

    const bot = new Bot(data.token);
    await bot.init();

    const handlers = await getOf(data.id);

    for (const handler of handlers) {
      const files = JSON.parse(
        Buffer.from(
          handler.files ?? '{}',
        ).toString(),
      );
      const index = files['index.js'] ?? '';
      try {
        const composer = eval(index);
        if (typeof composer === 'object')
          bot.use(composer);
      } catch (e) {
        // todo: save in database [logs]
        console.error(e);
      }
    }

    if (data.enableWebhook) {
      await bot.api.setWebhook(
        `${data.webhookUrl}?botId=${data.id}`,
      );
    } else bot.start();

    instances.set(data.id, bot);
    await update(data.id, { status: 1 });
  }

  globalThis.instances = instances;
  return true;
}

async function stop(id: string) {
  const bot = globalThis.instances?.get(id);
  if (bot) {
    await bot.stop();
    await bot.api.deleteWebhook();
    await update(id, { status: 0 });
    globalThis.instances.delete(id);
  } else {
    await update(id, { status: 0 });
  }
}

async function start(id: string) {
  const data = await get(id);
  if (!data) {
    throw new Error('Bot not found');
  }
  try {
    const bot = globalThis.instances?.get(id);
    if (bot) {
      if (data.enableWebhook) {
        await bot.api.setWebhook(
          `${data.webhookUrl}?botId=${id}`,
        );
      } else bot.start();
      console.log('Bot started');
      return update(id, { status: 1 });
    } else {
      return launchBots([id]);
    }
  } catch (err) {
    console.error(err);
  }
}

async function restart(id: string) {
  const oldInstance =
    globalThis.instances?.get(id);
  if (oldInstance) {
    await oldInstance.stop();
    globalThis.instances.delete(id);

    await launchBots([id]);
  } else {
    await launchBots([id]);
  }
}

export {
  all,
  get,
  create,
  update,
  start,
  stop,
  restart,
  launchBots,
  updateToken,
  enableWebhook,
  disableWebhook,
};
