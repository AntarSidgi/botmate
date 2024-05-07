import { sql } from 'drizzle-orm';
import {
  blob,
  integer,
  sqliteTable,
  text,
} from 'drizzle-orm/sqlite-core';

const bots = sqliteTable('bots', {
  id: text('id').primaryKey(),
  name: text('name').notNull(),
  picture: text('picture', { mode: 'text' }),
  username: text('username').notNull(),
  token: text('token').notNull(),
  status: integer('status').notNull(),
  createdAt: text('created_at').default(
    sql`CURRENT_TIMESTAMP`,
  ),
});

export { bots };

export type Bot = typeof bots.$inferSelect;
