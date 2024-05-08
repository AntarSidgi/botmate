import { GrammyError } from 'grammy';
import { z } from 'zod';

import { TRPCError } from '@trpc/server';

import services from '#/lib/services';

import { procedure } from '../trpc';

export const addBot = procedure
  .input(
    z.object({
      token: z.string(),
    }),
  )
  .mutation(async ({ input }) => {
    try {
      const bot =
        await services.bots.create(input);
      return bot;
    } catch (err) {
      if (err instanceof GrammyError) {
        throw new TRPCError({
          code: 'BAD_REQUEST',
          message: err.description,
        });
      }

      if (err instanceof Error) {
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: err.message,
        });
      }
    }
  });

export const updateBotToken = procedure
  .input(
    z.object({
      id: z.string(),
      token: z.string(),
    }),
  )
  .mutation(async ({ input }) => {
    try {
      return await services.bots.updateToken(
        input.id,
        input.token,
      );
    } catch (err) {
      if (err instanceof Error) {
        throw new TRPCError({
          code: 'BAD_REQUEST',
          message: err.message,
        });
      }
    }
  });
