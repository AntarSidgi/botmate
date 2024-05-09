export function register() {
  const address =
    process.env.NODE_ENV === 'development'
      ? 'http://localhost:3000'
      : process.env.APP_URL ||
        `https://${process.env.VERCEL_URL}`;

  fetch(`${address}/api/init`);
}
