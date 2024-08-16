import { z } from "zod";

import { createTRPCRouter, adminProcedure } from "@/server/api/trpc";
import {
  orders,
  products,
  productsToVariants,
  users,
  variants,
} from "@/server/db/schema";
import { db } from "@/server/db";
import { and, count, eq, ilike, like, or } from "drizzle-orm";
import { ProductWithVariants } from "menu";
import {
  createUserOrder,
  getUserOrder,
  getUserOrdersWithPaging,
  removeProductFromUserOrder,
} from "./orders";

export const adminRouter = createTRPCRouter({
  createUserOrder: adminProcedure
    .input(
      z.object({
        userId: z.string().uuid(),
        menuName: z.string(),
        totalPrice: z.string(),
        orderId: z.string().uuid().optional(),
        status: z.enum(["draft", "submitted", "completed"]),
        products: z.array(
          z.object({
            id: z.string().uuid(),
            quantity: z.number(),
            variant_name: z.string().optional(),
          }),
        ),
      }),
    )
    .mutation(
      async ({
        input: { menuName, totalPrice, orderId, status, products, userId },
      }) => {
        return await createUserOrder(
          orderId,
          products,
          menuName,
          totalPrice,
          status,
          userId,
        );
      },
    ),
  deleteUserOrder: adminProcedure
    .input(
      z.object({
        orderId: z.string().uuid(),
        userId: z.string().uuid(),
      }),
    )
    .mutation(async ({ input: { orderId, userId } }) => {
      await db
        .delete(orders)
        .where(and(eq(orders.id, orderId), eq(orders.userId, userId)));
    }),
  removeProductFromUserOrder: adminProcedure
    .input(
      z.object({
        userId: z.string().uuid(),
        orderId: z.string().uuid(),
        productIds: z.array(z.string().uuid()),
      }),
    )
    .mutation(async ({ input: { userId, productIds, orderId } }) => {
      return await removeProductFromUserOrder(orderId, productIds, userId);
    }),
  getUserOrder: adminProcedure
    .input(
      z.object({
        userId: z.string().uuid(),
        orderId: z.string().uuid(),
      }),
    )
    .query(async ({ input: { userId, orderId } }) => {
      return await getUserOrder(orderId, userId);
    }),
  getUserOrders: adminProcedure
    .input(
      z.object({
        userId: z.string().uuid(),
        page: z.number().min(1).optional().default(1),
        limit: z.number().min(1).max(20).optional().default(20),
      }),
    )
    .query(async ({ input: { userId, limit, page } }) => {
      return await getUserOrdersWithPaging("draft", page, limit, userId);
    }),
  searchUsers: adminProcedure
    .input(z.object({ query: z.string().min(2) }))
    .mutation(async ({ input: { query } }) => {
      // search users by name or email
      const results = await db.select({
        id: users.id,
        name: users.name,
        role: users.role,
        email: users.email,
        image: users.image,
        orderCount: count(orders.id)
      })
        .from(users)
        .innerJoin(orders,
          and(eq(orders.userId, users.id), eq(orders.status, "draft")))
        .where(
          and(
            or(
              ilike(users.email, `%${query}%`),
              ilike(users.name, `%${query}%`),
            ),
            eq(users.role, "user"),
          )
        ).groupBy(users.id)
      return results;
    }),
});
