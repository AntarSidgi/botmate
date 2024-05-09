import { readdirSync } from 'fs';
import { Bot } from 'grammy';

declare module globalThis {
  var instances: Map<string, Bot>;
}
export async function POST(req: Request) {
  const { searchParams } = new URL(req.url);
  const botId = searchParams.get('botId');
  const debug = searchParams.get('debug');

  if (!botId) {
    return Response.json({
      ok: false,
      error: 'Bot not found',
    });
  }

  const bot = globalThis.instances?.get(botId);

  const debugData = debug
    ? {
        dirCWD: readdirSync(process.cwd()),
        dir: readdirSync(__dirname),
        instanceCount: globalThis.instances?.size,
      }
    : null;

  try {
    if (bot) {
      const body = await req.json();
      await bot.handleUpdate(body);
    }
  } catch (e) {
    return Response.json({
      ok: false,
      debug: debugData,
    });
  }
  return Response.json({
    ok: true,
    debug: debugData,
  });
}
