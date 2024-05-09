export function register() {
  const address =
    process.env.NODE_ENV === 'development'
      ? 'http://localhost:3000'
      : process.env.VERCEL_URL ||
        process.env.APP_URL;

  fetch(`${address}/api/init`);
}
