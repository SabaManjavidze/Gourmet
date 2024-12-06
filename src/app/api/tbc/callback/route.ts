import { sendEmail } from "@/server/api/nodemailer";
import { db } from "@/server/db";
import { orders, users } from "@/server/db/schema";
import { TBC } from "@/server/tbcClass";
import { eq } from "drizzle-orm";

export async function POST(request: Request) {
  const { PaymentId } = await request.json();
  if (!PaymentId) return Response.error();
  const tbc = new TBC({});
  const payment = await tbc.get_payment(PaymentId);
  if (
    payment.status !== "Succeeded" &&
    payment.status !== "Processing" &&
    payment.status !== "WaitingConfirm"
  ) {
    const res = await db
      .select()
      .from(orders)
      .innerJoin(users, eq(users.id, orders.userId))
      .where(eq(orders.payId, PaymentId));
    const email = res[0]?.user.email;
    if (!email) {
      throw new Error("email not found");
    }
    await sendEmail({
      subject: "Gourmet: თქვენი გადახდა არ შესრულდა",
      to: email,
      text: "თქვენი გადახდა ვერ შესრულდა. კითხვებისთვის დაგვეკონტაქტეთ +995 511 22 32 38",
    });
    await db.delete(orders).where(eq(orders.payId, PaymentId));
    return Response.error();
  }
  return Response.json({ message: "hello" });
}
