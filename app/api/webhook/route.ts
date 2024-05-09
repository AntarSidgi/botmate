import { Bot } from 'grammy';

declare module globalThis {
  var instances: Map<string, Bot>;
}
export async function POST(req: Request) {
  const { searchParams } = new URL(req.url);
  const botId = searchParams.get('botId');

  if (!botId) {
    return Response.json({
      ok: false,
      error: 'Bot not found',
    });
  }

  const bot = globalThis.instances?.get(botId);

  if (bot) {
    const body = await req.json();
    await bot.handleUpdate(body);
  }

  return Response.json({ ok: true });
}
