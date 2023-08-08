
import { prisma } from '@/server/db';
import { z } from 'zod';
import {
  createTRPCRouter,
  protectedProcedure,
} from '@/server/api/trpc';

export const groupsRouter = createTRPCRouter({
  list: protectedProcedure
    .input(z.object({ userId: z.string() }))
    .query(async ({ input }) => {
      const groups = await prisma.group.findMany({
        where: {
          users: {
            some: {
              userId: input.userId,
            }
          },
        },
      });

      return groups;
    }),

  create: protectedProcedure
    .input(z.object({
      name: z.string().min(1),
      userId: z.string().min(1),
    }))
    .mutation(async ({ input }) => {
      return await prisma.group.create({
        data: {
          name: input.name,
          users: {
            create: {
              isOwner: true,
              isModerator: true,
              user: {
                connect: {
                  id: input.userId,
                }
              }
            },
          },
        },
      });
    }),
});
