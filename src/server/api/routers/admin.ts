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
  Status,
} from "./orders";

export const adminRouter = createTRPCRouter({
  confirmInvoice: adminProcedure
    .input(
      z.object({
        orderId: z.string().uuid(),
      }),
    )
    .mutation(async ({ input: { orderId } }) => {
      await db
        .update(orders)
        .set({ adminInvoice: true })
        .where(eq(orders.id, orderId));
    }),
  getInvoiceHistory: adminProcedure
    .input(
      z.object({
        page: z.number().min(1).optional().default(1),
        limit: z.number().min(1).max(20).optional().default(20),
      }),
    )
    .query(async ({ input: { page, limit } }) => {
      const offset = (page - 1) * limit;
      // const status: Status = "draft";
      const filter = and(
        eq(orders.status, "submitted"),
        eq(orders.userInvoice, true),
        eq(orders.adminInvoice, false),
      );
      const invoiceHistory = await db
        .select()
        .from(orders)
        .limit(limit)
        .offset(offset)
        .innerJoin(
          users,
          and(eq(orders.userId, users.id), eq(users.role, "user")),
        )
        .where(filter);
      const [totalItems] = await db
        .select({ count: count() })
        .from(orders)
        .where(filter);
      if (!totalItems) return { invoices: [], totalPages: 0 };
      const totalPages = Math.ceil(totalItems.count / limit);
      return { invoices: invoiceHistory, totalPages };
    }),
  getOrderHistory: adminProcedure
    .input(
      z.object({
        page: z.number().min(1).optional().default(1),
        limit: z.number().min(1).max(20).optional().default(20),
      }),
    )
    .query(async ({ input: { page, limit } }) => {
      const offset = (page - 1) * limit;
      const status: Status = "draft";
      const orderHistory = await db
        .select()
        .from(orders)
        .limit(limit)
        .offset(offset)
        .innerJoin(
          users,
          and(eq(orders.userId, users.id), eq(users.role, "user")),
        )
        .where(eq(orders.status, status));
      const [totalItems] = await db
        .select({ count: count() })
        .from(orders)
        .where(eq(orders.status, status));
      if (!totalItems) return { orders: [], totalPages: 0 };
      const totalPages = Math.ceil(totalItems.count / limit);
      return { orders: orderHistory, totalPages };
    }),
  createUserOrder: adminProcedure
    .input(
      z.object({
        userId: z.string().uuid(),
        menuName: z.string(),
        totalPrice: z.string(),
        orderId: z.string().uuid().optional(),
        userInvoice: z.boolean(),
        adminInvoice: z.boolean(),
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
        input: {
          menuName,
          totalPrice,
          orderId,
          status,
          products,
          userId,
          userInvoice,
          adminInvoice,
        },
      }) => {
        return await createUserOrder({
          orderId,
          products,
          menuName,
          totalPrice,
          status,
          userId,
          invoiceRequested: userInvoice,
          invoiceConfirmed: adminInvoice,
        });
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
      const results = await db
        .select({
          id: users.id,
          name: users.name,
          role: users.role,
          email: users.email,
          image: users.image,
          orderCount: count(orders.id),
        })
        .from(users)
        .leftJoin(
          orders,
          and(eq(orders.userId, users.id), eq(orders.status, "draft")),
        )
        .where(
          and(
            or(
              ilike(users.email, `%${query}%`),
              ilike(users.name, `%${query}%`),
            ),
            eq(users.role, "user"),
          ),
        )
        .groupBy(users.id);
      return results;
    }),
});
