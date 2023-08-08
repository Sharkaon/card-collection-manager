import { z } from 'zod';

import {
  createTRPCRouter,
  protectedProcedure,
} from '@/server/api/trpc';

export const boostersRouter = createTRPCRouter({
  list: protectedProcedure
    .input(z.object({ groupId: z.string() }))
    .query(async ({ input, ctx }) => {
      return await ctx.prisma.boosterPack.findMany({
        where: {
          groupId: input.groupId,
        },
      });
    }),

  create: protectedProcedure
    .input(z.object({
      groupId: z.string().min(1),
      name: z.string().min(1),
      cardsPerPack: z.number().min(1),
      price: z.number().min(0),
    }))
    .mutation(async ({ input, ctx }) => {
      return await ctx.prisma.boosterPack.create({
        data: {
          groupId: input.groupId,
          name: input.name,
          cardPerPack: input.cardsPerPack,
          price: input.price,
        }
      });
    }),
});
