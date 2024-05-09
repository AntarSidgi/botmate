import { drizzle } from 'drizzle-orm/libsql';

import { createClient } from '@libsql/client';

import { env } from '../env';
import * as schema from './schema';

const client = createClient(
  env.DATABASE_TOKEN
    ? {
        url: env.DATABASE_URL,
        authToken: env.DATABASE_TOKEN,
      }
    : {
        url: env.DATABASE_URL,
      },
);

const db = drizzle(client, {
  schema,
});
export default db;
