import { isHttpUri, isHttpsUri } from 'valid-url';

export async function register() {
  const address =
    process.env.NODE_ENV === 'development'
      ? 'http://localhost:3000'
      : process.env.APP_URL ||
        `https://${process.env.VERCEL_URL}`;

  try {
    if (isHttpsUri(address) || isHttpUri(address))
      await fetch(`${address}/api/init`);
  } catch {}
}
