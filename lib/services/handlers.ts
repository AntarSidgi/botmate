import { eq } from 'drizzle-orm';

import db from '../db';
import { handlers } from '../db/schema';

function all() {
  return db.query.handlers.findMany();
}

type CreateHandlerInput = {
  name: string;
  botId: string;
};
function create(input: CreateHandlerInput) {
  return db.insert(handlers).values({
    name: input.name,
    botId: input.botId,
  });
}

function get(id: number) {
  return db.query.handlers.findFirst({
    where(fields, operators) {
      return operators.eq(fields.id, id);
    },
  });
}

function getOf(botId: string) {
  return db.query.handlers.findMany({
    where(fields, operators) {
      return operators.eq(fields.botId, botId);
    },
  });
}

function save(
  id: number,
  files: Record<string, any>,
) {
  const buffer = Buffer.from(
    JSON.stringify(files),
  );

  return db
    .update(handlers)
    .set({
      files: buffer,
    })
    .where(eq(handlers.id, id));
}

function remove(id: number) {
  return db
    .delete(handlers)
    .where(eq(handlers.id, id));
}

export { all, get, getOf, create, save, remove };
