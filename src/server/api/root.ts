import { boostersRouter } from "./routers/boosters";
import { createTRPCRouter } from "@/server/api/trpc";
import { groupsRouter } from "./routers/groups";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  booster: boostersRouter,
  groups: groupsRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
