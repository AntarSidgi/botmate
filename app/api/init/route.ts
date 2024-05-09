import { launchBots } from '#/lib/services/bots';

export async function GET() {
  try {
    await launchBots();
    return Response.json({ ok: true });
  } catch (err) {
    if (err instanceof Error) {
      return Response.json({
        ok: false,
        error: err.message,
      });
    }
  }
}
