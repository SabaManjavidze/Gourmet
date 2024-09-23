import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";
import { orderDetails, orders } from "@/server/db/schema";
import { db } from "@/server/db";
import { orderNowSchema } from "@/components/order-now-modal/utils";
import { v4 } from "uuid";
import { eq } from "drizzle-orm";

export const orderDetailsRouter = createTRPCRouter({
  createOrderDetails: protectedProcedure
    .input(
      orderNowSchema
        .omit({ invoiceRequested: true })
        .and(z.object({ orderId: z.string() })),
    )
    .mutation(
      async ({
        input: {
          address,
          date,
          firstname: firstName,
          //   invoiceRequested: userInvoice,
          lastname: lastName,
          orderId,
          phone: phoneNumber,
          time,
          companyEmail,
          companyName,
          dotNumber,
          extraInfo,
          firstname2: firstName2,
          lastname2: lastName2,
          phone2: phoneNumber2,
        },
      }) => {
        // await db
        //   .update(orders)
        //   .set({ userInvoice })
        //   .where(eq(orders.id, orderId));
        await db.insert(orderDetails).values({
          id: v4(),
          time: `${time.getHours()}:${time.getMinutes()}`,
          address,
          date: date.toISOString(),
          firstName,
          lastName,
          orderId,
          phoneNumber,
          companyEmail,
          companyName,
          dotNumber,
          extraInfo,
          firstName2,
          lastName2,
          phoneNumber2,
        });
      },
    ),
});
