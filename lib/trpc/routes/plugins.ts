import { z } from 'zod';

import services from '#/lib/services';

import { procedure } from '../trpc';

export const installPlugin = procedure
  .input(
    z.object({
      repo: z.string(),
      botId: z.string(),
    }),
  )
  .mutation(({ input }) => {
    return services.plugins.install(
      input.botId,
      input.repo,
    );
  });
