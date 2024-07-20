import { productRouter } from "@/server/api/routers/product";
import {
  createCallerFactory,
  createTRPCRouter,
  publicProcedure,
} from "@/server/api/trpc";
import { sampleMenuRouter } from "./routers/sample_menu";
import { db } from "../db";
import { categories } from "../db/schema";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  product: productRouter,
  sampleMenu: sampleMenuRouter,
  getCategories: publicProcedure.query(async () => {
    const cats = await db.select().from(categories);
    return cats;
  }),
});

// export type definition of API
export type AppRouter = typeof appRouter;

/**
 * Create a server-side caller for the tRPC API.
 * @example
 * const trpc = createCaller(createContext);
 * const res = await trpc.post.all();
 *       ^? Post[]
 */
export const createCaller = createCallerFactory(appRouter);
