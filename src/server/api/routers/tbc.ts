import { db } from "@/server/db";
import { createTRPCRouter, protectedProcedure, publicProcedure } from "../trpc";
import { z } from "zod";
import { TBC, TBCErrorStatus } from "@/server/tbcClass";
import type { PaymentErrorResponse } from "@/server/tbcClass";
import { webPaymentPayloadSchema } from "@/lib/tbcZod";
import { PaymentResponse } from "@/lib/tbcTypes";
import { orders, users, verificationTokens } from "@/server/db/schema";
import { eq } from "drizzle-orm";
import { v4 } from "uuid";

export const addTBCTokenToDB = async (token: string) => {
  try {
    const now = new Date();
    const twentyFourHoursInMilliseconds = 23.5 * 60 * 60 * 1000;
    const expires = new Date(now.getTime() + twentyFourHoursInMilliseconds);
    await db
      .insert(verificationTokens)
      .values({
        // email: "admin@gmail.com",
        // name: "admin",
        token,
        // role: "token",
        identifier: "tbcToken",
        expires,
      })
      .onConflictDoUpdate({
        set: { token, expires },
        target: verificationTokens.identifier,
      });
  } catch (error: any) {
    throw new Error(error);
  }
};
const getTBCTokenDB = async () => {
  const token = await db
    .select()
    .from(verificationTokens)
    .where(eq(verificationTokens.identifier, "tbcToken"))
    .limit(1);
  if (!token?.[0]) {
    return { token: undefined, error: "not found" as const };
  }
  const curr = new Date();
  if (curr >= token[0].expires) {
    return { token: undefined, error: "expired" as const };
  }
  return { token: token[0].token, error: undefined };
};
export const tbcRouter = createTRPCRouter({
  completePaymentOrder: publicProcedure
    .input(z.object({ payId: z.string() }))
    .query(async ({ input: { payId } }) => {
      const { token } = await getTBCTokenDB();
      console.log(
        "------------------------------------------------------------------------\n\n",
      );
      const tbc = new TBC({
        // access_token_callback: addTBCTokenToDB,
        access_token: token,
      });
      if (!token) {
        await tbc.get_access_token();
      }
      const payment = await tbc.get_payment(payId);
      if (payment.status == "Succeeded") {
        await db
          .update(orders)
          .set({ status: "completed" })
          .where(eq(orders.payId, payId));
      } else {
        await db.delete(orders).where(eq(orders.payId, payId));
      }
      return payment.status;
    }),
  createPayment: publicProcedure
    .input(webPaymentPayloadSchema)
    .mutation(async ({ input: { amount, returnurl, installmentProducts } }) => {
      const { token } = await getTBCTokenDB();
      console.log(
        "------------------------------------------------------------------------\n\n",
      );
      const tbc = new TBC({
        // access_token_callback: addTBCTokenToDB,

        access_token: token,
      });
      if (!token) {
        await tbc.get_access_token();
      }
      let res: PaymentResponse;
      try {
        res = await tbc.create_payment({
          amount,
          returnurl,
          installmentProducts,
        });
      } catch (error) {
        const typedError = error as PaymentErrorResponse;
        if (typedError.status == TBCErrorStatus.UNAUTHORIZED) {
          // access token response
          console.log("unauthorized");
          await tbc.get_access_token();
          console.log("authorized");
        } else {
          throw new Error(JSON.stringify(error, null, 2));
        }
        res = await tbc.create_payment({
          amount,
          returnurl,
          installmentProducts,
        });
      }
      console.log({ res });
      // return await tbc.complete_payment(res.amount.toString(), res.payId);
      return res;
    }),
});
