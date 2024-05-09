import { z } from 'zod';

import services from '#/lib/services';

import { procedure } from '../trpc';

export const createHandler = procedure
  .input(
    z.object({
      name: z.string(),
      botId: z.string(),
    }),
  )
  .mutation(async ({ input }) => {
    return services.handlers.create({
      name: input.name,
      botId: input.botId,
    });
  });

export const handlers = procedure
  .input(z.object({ botId: z.string() }))
  .query(async ({ input }) => {
    return services.handlers.getOf(input.botId);
  });

export const saveHandler = procedure
  .input(
    z.object({
      id: z.number(),
      files: z.record(z.any()),
    }),
  )
  .mutation(async ({ input }) => {
    return services.handlers.save(
      input.id,
      input.files,
    );
  });

export const deleteHandler = procedure
  .input(z.number())
  .mutation(async ({ input }) => {
    return services.handlers.remove(input);
  });
