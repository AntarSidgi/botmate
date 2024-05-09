import { config } from 'dotenv';
import { cleanEnv, str } from 'envalid';

config({ path: '.env.local' });

export const env = cleanEnv(process.env, {
  DATABASE_URL: str({
    default: 'file:./database.sqlite',
  }),
  DATABASE_TOKEN: str({
    default: '',
  }),
});
