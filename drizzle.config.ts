import { Config } from 'drizzle-kit';

import { env } from './lib/env';

export default {
  schema: './lib/db/schema.ts',
  out: './migrations',
  driver: 'turso',
  dbCredentials: env.DATABASE_TOKEN
    ? {
        url: env.DATABASE_URL,
        authToken: env.DATABASE_TOKEN,
      }
    : {
        url: env.DATABASE_URL,
      },
} satisfies Config;
