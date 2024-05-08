import { eq } from 'drizzle-orm';
import { Bot, GrammyError } from 'grammy';

import { LibsqlError } from '@libsql/client';

import {
  Bot as BotSchema,
  bots as botSchema,
} from '#/lib/db/schema';

import db from '../db';

type CreateBotInput = {
  token: string;
};
async function create(input: CreateBotInput) {
  const bot = new Bot(input.token);
  const me = await bot.api.getMe();

  let picture = Buffer.from('');

  const photos =
    await bot.api.getUserProfilePhotos(me.id);
  if (photos.total_count > 0) {
    const file = await bot.api.getFile(
      photos.photos[0][0].file_id,
    );
    const response = await fetch(
      `https://api.telegram.org/file/bot${input.token}/${file.file_path}`,
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
      token: input.token,
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

function all() {
  return db.query.bots.findMany();
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

  try {
    const i = new Bot(bot.token);
    await i.api.setWebhook(url);

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

const bots = {
  all,
  get,
  create,
  update,
  updateToken,
  enableWebhook,
  disableWebhook,
};

export default bots;
