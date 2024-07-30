import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";
import { orders, products, productstoOrders } from "@/server/db/schema";
import { db } from "@/server/db";
import { eq, like, and, sql, or, gt, count } from "drizzle-orm";
import { v4 as uuid } from "uuid";
import { Product } from "menu";

export type Status = "draft" | "submitted" | "completed";
interface Order {
  id: string;
  name: string;
  created_at: string;
  totalPrice: string;
  status: Status;
  products: (Product & { variant_name?: string; quantity: number })[];
}

export const orderRouter = createTRPCRouter({
  removeProductFromOrder: protectedProcedure
    .input(
      z.object({
        orderId: z.string().uuid(),
        productIds: z.array(z.string().uuid()),
      }),
    )
    .mutation(async ({ input: { orderId, productIds }, ctx: { session } }) => {
      const order = await db
        .select()
        .from(orders)
        .where(and(eq(orders.id, orderId), eq(orders.userId, session.user.id)));
      if (!order?.[0]) throw new Error("Order not found or access denied");

      for (const productId of productIds) {
        await db
          .delete(productstoOrders)
          .where(
            and(
              eq(productstoOrders.orderId, orderId),
              eq(productstoOrders.productId, productId),
            ),
          );
      }
      return true;
    }),
  deleteUserOrder: protectedProcedure
    .input(
      z.object({
        orderId: z.string().uuid(),
      }),
    )
    .mutation(async ({ input: { orderId }, ctx: { session } }) => {
      // Your existing deleteUserOrder logic here...
      await db
        .delete(orders)
        .where(and(eq(orders.id, orderId), eq(orders.userId, session.user.id)));
    }),
  getUserOrders: protectedProcedure
    .input(
      z.object({
        status: z.enum(["draft", "submitted", "completed"]),

        page: z.number().min(1).optional().default(1),
        limit: z.number().min(1).max(20).optional().default(20),
      }),
    )
    .query(async ({ input: { status, page, limit }, ctx: { session } }) => {
      const offset = (page - 1) * limit;
      const order = await db
        .select()
        .from(orders)
        .limit(limit)
        .offset(offset)
        .where(
          and(eq(orders.status, status), eq(orders.userId, session.user.id)),
        );

      if (!order?.length) return { orders: [], totalPages: 0 };

      const [totalItems] = await db
        .select({ count: count() })
        .from(orders)
        .where(
          and(eq(orders.status, status), eq(orders.userId, session.user.id)),
        );
      if (!totalItems) return { orders: [], totalPages: 0 };
      const totalPages = Math.ceil(totalItems.count / limit);

      const result: Order[] = [];
      for (const ord of order) {
        const pto = await db
          .select()
          .from(productstoOrders)
          .innerJoin(products, eq(products.id, productstoOrders.productId))
          .where(eq(productstoOrders.orderId, ord.id));
        const final_prods = pto.slice(0, 6).map((item) => {
          return {
            id: item.product.id,
            name: item.product.name,
            price: Number(item.product.price),
            quantity: item.order_product.quantity,
            variant_name: item.order_product.variant_name ?? undefined,
          };
        });
        // format created_at to a string dd/mm/yyyy
        const created_at = new Intl.DateTimeFormat("en-GB").format(
          ord.createdAt,
        );
        result.push({
          id: ord.id,
          name: ord.name,
          created_at,
          totalPrice: ord.totalPrice,
          status: ord.status,
          products: final_prods,
        });
      }
      return { orders: result, totalPages };
    }),
  getUserOrder: protectedProcedure
    .input(
      z.object({
        orderId: z.string().uuid(),
      }),
    )
    .query(async ({ input: { orderId }, ctx: { session } }) => {
      // Fetch the order by ID, ensuring it belongs to the current user
      const order = await db
        .select()
        .from(orders)
        .where(and(eq(orders.id, orderId), eq(orders.userId, session.user.id)));

      if (!order?.[0]) throw new Error("Order not found or access denied");
      const [ord] = order;

      // Fetch the products associated with the order
      const pto = await db
        .select()
        .from(productstoOrders)
        .innerJoin(products, eq(products.id, productstoOrders.productId))
        .where(eq(productstoOrders.orderId, orderId));
      const final_prods = pto.map((item) => {
        return {
          id: item.product.id,
          name: item.product.name,
          price: Number(item.product.price),
          quantity: item.order_product.quantity,
          variant_name: item.order_product.variant_name ?? undefined,
        };
      });
      const created_at = new Intl.DateTimeFormat("en-GB").format(ord.createdAt);
      return {
        id: ord.id,
        name: ord.name,
        created_at,
        totalPrice: ord.totalPrice,
        status: ord.status,
        products: final_prods,
      };
    }),
  createUserOrder: protectedProcedure
    .input(
      z.object({
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
        input: { products, menuName, totalPrice, orderId, status },
        ctx: { session },
      }) => {
        let order;
        if (!orderId) {
          order = await db
            .insert(orders)
            .values({
              id: uuid(),
              userId: session.user.id,
              name: menuName,
              status: "draft",
              totalPrice,
            })
            .returning();
        } else {
          order = await db
            .update(orders)
            .set({ status, name: menuName, totalPrice })
            .where(eq(orders.id, orderId))
            .returning();
        }
        if (!order?.[0]?.id) throw new Error("Order not created");
        const [ord] = order;
        const prods = products.map((item) => {
          return {
            productId: item.id,
            variant_name: item.variant_name,
            quantity: item.quantity,
            orderId: ord.id,
          };
        });
        console.log(products);

        const final_prods = await db
          .insert(productstoOrders)
          .values(prods)
          .onConflictDoUpdate({
            target: [productstoOrders.productId, productstoOrders.orderId],
            set: {
              quantity: sql`excluded.quantity`,
            },
          })
          .returning();
        return {
          id: ord.id,
          name: ord.name,
          totalPrice: ord.totalPrice,
          status: ord.status,
          products: final_prods,
        };
      },
    ),
});
