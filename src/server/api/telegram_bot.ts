import TelegramBot from "node-telegram-bot-api";
import { env } from "@/env";
import { config } from "dotenv";
import { OrderFormType } from "@/components/order-now-modal/utils";
import { limitTxt } from "@/lib/utils";
import { customCateringFormType } from "@/app/catering/utils";
// config();

export async function ConsultationRequestTelegram({
  data,
  userName,
  userEmail,
}: {
  data: customCateringFormType;
  userName: string;
  userEmail?: string;
}) {
  //   const token = process.env.TELEGRAM_BOT_KEY;
  //   const chat_id = process.env.TELEGRAM_CHAT_ID;
  const token = env.TELEGRAM_BOT_KEY;
  const chat_id = env.TELEGRAM_CHAT_ID;
  if (!token || !chat_id) throw new Error("telegram token not provided");
  const detailsText = (
    Object.entries(data) as unknown as [key: keyof typeof data, value: string][]
  )
    .map(([key, value]) => {
      if (key == "dateOfEvent") {
        const date = new Date(value.toString());
        return `${key} - ${new Intl.DateTimeFormat("en-GB").format(date)}`;
      } else if (key !== "userEmail") {
        return `${key} - ${value}`;
      }
    })
    .join("\n");

  const bot = new TelegramBot(token);
  await bot.sendMessage(
    chat_id,
    `${userName} (${userEmail}) ითხოვს კონსულტაციას.
   ${detailsText} 
    `,
    { parse_mode: "HTML" },
  );
}

export async function DraftSavedMessageTelegram(
  fullname: string,
  order_name: string,
  user_email: string,
  totalPrice: string,
  products: { name: string; price: string; quantity: string }[],
  phoneNumber?: string,
) {
  //   const token = process.env.TELEGRAM_BOT_KEY;
  //   const chat_id = process.env.TELEGRAM_CHAT_ID;
  const token = env.TELEGRAM_BOT_KEY;
  const chat_id = env.TELEGRAM_CHAT_ID;
  if (!token || !chat_id) throw new Error("telegram token not provided");
  const tableHTML = `\nპროდუქტები:\n\nსახელი               რაოდენობა    ფასი    სრული ფასი

${products
  .map((prod) => {
    return `${limitTxt(prod.name, 18)}         ${prod.quantity}                ${prod.price}               ${Number(prod.price) * Number(prod.quantity)} \n`;
  })
  .join("")}

  `;

  const bot = new TelegramBot(token);
  await bot.sendMessage(
    chat_id,
    `${fullname} 
(${user_email}); (${phoneNumber}) შეინახა მენიუ ${order_name}.
სრული ფასი: ₾${totalPrice} 
   ${tableHTML} 
    `,
    { parse_mode: "HTML" },
  );
}

export async function OrderMadeMessageTelegram(
  fullname: string,
  order_name: string,
  user_email: string,
  totalPrice: string,
  orderDetails: OrderFormType,
  products: { name: string; price: string; quantity: string }[],
) {
  //   const token = process.env.TELEGRAM_BOT_KEY;
  //   const chat_id = process.env.TELEGRAM_CHAT_ID;
  const token = env.TELEGRAM_BOT_KEY;
  const chat_id = env.TELEGRAM_CHAT_ID;
  if (!token || !chat_id) throw new Error("telegram token not provided");
  const detailsText = (
    Object.entries(orderDetails) as unknown as [
      key: keyof typeof orderDetails,
      value: string,
    ][]
  )
    .map(([key, value]) => {
      if (key == "time") {
        const time = new Date(value.toString());
        return `${key} - ${time.getHours()}:${time.getMinutes()}`;
      } else if (key == "date") {
        const date = new Date(value.toString());
        return `${key} - ${new Intl.DateTimeFormat("en-GB").format(date)}`;
      } else if (key != "invoiceRequested") {
        return `${key} - ${value}`;
      }
    })
    .join("\n");
  const bot = new TelegramBot(token);
  try {
    console.log({ chat_id });

    const tableHTML = `
\nპროდუქტები:\n\nსახელი               რაოდენობა    ფასი    სრული ფასი

${products
  .map((prod) => {
    return `${limitTxt(prod.name, 18)}         ${prod.quantity}                ${prod.price}               ${Number(prod.price) * Number(prod.quantity)} \n`;
  })
  .join("")}

  `;
    const html = `${fullname} 
(${user_email}) შეინახა მენიუ ${order_name}.
სრული ფასი: ₾${totalPrice} 
   ${tableHTML} 

დეტალები:
    ${detailsText}
    `;
    await bot.sendMessage(chat_id, html, { parse_mode: "HTML" });
  } catch (error) {
    // console.log(error);
  }
}
