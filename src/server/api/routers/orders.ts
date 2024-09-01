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
  adminInvoice: boolean;
  userInvoice: boolean;
  status: Status;
  products: (Product & { variant_name?: string; quantity: number })[];
}
export async function getUserOrder(orderId: string, userId: string) {
  // Fetch the order by ID, ensuring it belongs to the current user
  const order = await db
    .select()
    .from(orders)
    .where(and(eq(orders.id, orderId), eq(orders.userId, userId)));

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
}
export async function getUserOrdersWithPaging(
  status: Status,
  page: number,
  limit: number,
  userId: string,
) {
  const offset = (page - 1) * limit;
  const order = await db
    .select()
    .from(orders)
    .limit(limit)
    .offset(offset)
    .where(and(eq(orders.status, status), eq(orders.userId, userId)));

  if (!order?.length) return { orders: [], totalPages: 0 };

  const [totalItems] = await db
    .select({ count: count() })
    .from(orders)
    .where(and(eq(orders.status, status), eq(orders.userId, userId)));
  if (!totalItems) return { orders: [], totalPages: 0 };
  const totalPages = Math.ceil(totalItems.count / limit);
  console.log(order, totalPages);

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
    const created_at = new Intl.DateTimeFormat("en-GB").format(ord.createdAt);
    result.push({
      id: ord.id,
      name: ord.name,
      userInvoice: ord.userInvoice,
      adminInvoice: ord.adminInvoice,
      created_at,
      totalPrice: ord.totalPrice,
      status: ord.status,
      products: final_prods,
    });
  }
  return { orders: result, totalPages };
}
export async function removeProductFromUserOrder(
  orderId: string,
  productIds: string[],
  userId: string,
) {
  const order = await db
    .select()
    .from(orders)
    .where(and(eq(orders.id, orderId), eq(orders.userId, userId)));
  if (!order?.[0]) throw new Error("Order not found or access denied");

  for (const productId of productIds) {
    try {
      await db
        .delete(productstoOrders)
        .where(
          and(
            eq(productstoOrders.orderId, orderId),
            eq(productstoOrders.productId, productId),
          ),
        );
    } catch (error) {
      throw new Error("Product not found in order");
    }
  }
  return true;
}

export async function createUserOrder(
  orderId: string | undefined,
  products: { id: string; quantity: number; variant_name?: string }[],
  menuName: string,
  totalPrice: string,
  status: Status,
  userId: string,
  invoiceReqeusted: boolean,
  invoiceConfirmed?: boolean,
) {
  let order;
  if (!orderId) {
    const values = {
      id: uuid(),
      userId: userId,
      name: menuName,
      status,
      totalPrice,
      userInvoice: invoiceReqeusted ?? false,
      adminInvoice: invoiceConfirmed ?? false,
    };
    console.log({ values });
    order = await db.insert(orders).values(values).returning();
  } else {
    order = await db
      .update(orders)
      .set({
        status,
        name: menuName,
        totalPrice,
        userInvoice: invoiceReqeusted ?? false,
        adminInvoice: invoiceConfirmed ?? false,
      })
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
      return await removeProductFromUserOrder(
        orderId,
        productIds,
        session.user.id,
      );
    }),
  deleteUserOrder: protectedProcedure
    .input(
      z.object({
        orderId: z.string().uuid(),
      }),
    )
    .mutation(async ({ input: { orderId }, ctx: { session } }) => {
      return await db
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
      return await getUserOrdersWithPaging(
        status,
        page,
        limit,
        session.user.id,
      );
    }),
  getUserOrder: protectedProcedure
    .input(
      z.object({
        orderId: z.string().uuid(),
      }),
    )
    .query(async ({ input: { orderId }, ctx: { session } }) => {
      return await getUserOrder(orderId, session.user.id);
    }),
  createUserOrder: protectedProcedure
    .input(
      z.object({
        menuName: z.string(),
        totalPrice: z.string(),
        orderId: z.string().uuid().optional(),
        invoiceRequested: z.boolean(),
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
          products,
          menuName,
          totalPrice,
          orderId,
          status,
          invoiceRequested,
        },
        ctx: { session },
      }) => {
        return await createUserOrder(
          orderId,
          products,
          menuName,
          totalPrice,
          status,
          session.user.id,
          invoiceRequested,
        );
      },
    ),
});
