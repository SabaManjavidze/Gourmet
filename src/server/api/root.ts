import { productRouter } from "@/server/api/routers/product";
import {
  createCallerFactory,
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "@/server/api/trpc";
import { sampleMenuRouter } from "./routers/sample_menu";
import { db } from "../db";
import { categories, users } from "../db/schema";
import { orderRouter } from "./routers/orders";
import { adminRouter } from "./routers/admin";
import { eq, ne } from "drizzle-orm";
import { orderDetailsRouter } from "./routers/order_details";
import { tbcRouter } from "./routers/tbc";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  product: productRouter,
  admin: adminRouter,
  sampleMenu: sampleMenuRouter,
  orderDetails: orderDetailsRouter,
  order: orderRouter,
  tbc: tbcRouter,
  getUserPhone: protectedProcedure.query(async ({ ctx: { session } }) => {
    const number = await db
      .select()
      .from(users)
      .where(eq(users.id, session.user.id));
    if (!number[0]) throw new Error("something went wrong");
    return number[0].phoneNumber;
  }),
  getCategories: publicProcedure.query(async () => {
    const cats = await db
      .select()
      .from(categories)
      .where(ne(categories.name, "def"));
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
