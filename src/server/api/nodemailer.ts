import { env } from "@/env";
import nodemailer from "nodemailer";
import { dirname } from "path";

type messageType = {
  from?: string;
  to: string;
  subject?: string;
  text?: string;
  html?: string;
};
export async function sendEmail({ subject, text, html, to }: messageType) {
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    service: "gmail",
    port: 465,
    secure: false,
    auth: {
      user: env.PUBLIC_EMAIL,
      pass: env.EMAIL_PASSWORD,
    },
    logger: false,
    debug: false, // include SMTP traffic in the logs
  });
  const message: messageType = {
    from: "Gourmet Dev",
    to,
  };
  if (text) {
    message.text = text;
  }
  if (html) {
    message.html = html;
  }
  if (subject) {
    message.subject = subject;
  }
  await transporter.sendMail(message);
  transporter.close();
}

export async function DraftSavedEmail(
  fullname: string,
  order_name: string,
  user_email: string,
  totalPrice: string,
  products: { name: string; price: string; quantity: string }[],
) {
  //   const safe_email = await z.string().email().parseAsync(email);
  //   if (!safe_email) return;
  const tableHTML = `
<table class="tg"><thead>
  <tr>
    <th class="tg-a3y7">Name</th>
    <th class="tg-a3y7">Quantity</th>
    <th class="tg-m48a">Price</th>
    <th class="tg-m48a">TotalPrice</th>
  </tr></thead>
<tbody>
${products
  .map((prod) => {
    return `
  <tr>
    <td class="tg-0lax">${prod.name}</td>
    <td class="tg-0lax">${prod.quantity}</td>
    <td class="tg-0lax">${prod.price}</td>
    <td class="tg-0lax">${Number(prod.price) * Number(prod.quantity)}</td>
  </tr>
`;
  })
  .join("")}
</tbody>
</table>
  `;
  await sendEmail({
    to: "saba.manjavidze@gmail.com",
    // to: "r.muzashvili@gurme.ge",
    subject: `${fullname} saved a draft menu`,
    html: `
    <html>
    <head>
    <style type="text/css">
        .tg  {border-collapse:collapse;border-spacing:0;margin-top:35px}
        .tg td{border-color:black;border-style:solid;border-width:1px;font-family:Arial, sans-serif;font-size:14px;
          overflow:hidden;padding:10px 5px;word-break:normal;}
        .tg th{border-color:black;border-style:solid;border-width:1px;font-family:Arial, sans-serif;font-size:14px;
          font-weight:normal;overflow:hidden;padding:10px 5px;word-break:normal;}
        .tg .tg-a3y7{font-family:"Arial Black", Gadget, sans-serif !important;text-align:left;vertical-align:top}
        .tg .tg-m48a{font-family:"Arial Black", Gadget, sans-serif !important;font-size:100%;text-align:left;vertical-align:top}
        .tg .tg-0lax{text-align:left;vertical-align:top}
    </style>
    </head>
    <body>
        <div style="display:flex;align-items:center; justify-content:center">
        <h3 style="font-weight:600">${fullname}</h3>
        <h4 style="margin-left:6px">(${user_email}) Saved a Draft Menu ${order_name}.</h4> 
        </div>
        <div style="display:flex;align-items:center; justify-content:center;
        margin-top:15px;font-weight:600">
        <h4>Total Price -</h4>
         <h3 style="color:green;font-weight:600; margin-left:6px">₾${totalPrice}</h3>
        </div>
    </body>
    </html>
   ${tableHTML} 
    `,
  });
}
export async function OrderMadeEmail(
  fullname: string,
  order_name: string,
  user_email: string,
  totalPrice: string,
  detailsText: string,
  products: { name: string; price: string; quantity: string }[],
) {
  //   const safe_email = await z.string().email().parseAsync(email);
  //   if (!safe_email) return;
  const tableHTML = `
<table class="tg"><thead>
  <tr>
    <th class="tg-a3y7">Name</th>
    <th class="tg-a3y7">Quantity</th>
    <th class="tg-m48a">Price</th>
    <th class="tg-m48a">TotalPrice</th>
  </tr></thead>
<tbody>
${products
  .map((prod) => {
    return `
  <tr>
    <td class="tg-0lax">${prod.name}</td>
    <td class="tg-0lax">${prod.quantity}</td>
    <td class="tg-0lax">${prod.price}</td>
    <td class="tg-0lax">${Number(prod.price) * Number(prod.quantity)}</td>
  </tr>
`;
  })
  .join("")}
</tbody>
</table>
  `;
  await sendEmail({
    to: "saba.manjavidze@gmail.com",
    // to: "r.muzashvili@gurme.ge",
    subject: `${fullname} Made An Order`,
    html: `
    <html>
    <head>
    <style type="text/css">
        .tg  {border-collapse:collapse;border-spacing:0;margin-top:35px}
        .tg td{border-color:black;border-style:solid;border-width:1px;font-family:Arial, sans-serif;font-size:14px;
          overflow:hidden;padding:10px 5px;word-break:normal;}
        .tg th{border-color:black;border-style:solid;border-width:1px;font-family:Arial, sans-serif;font-size:14px;
          font-weight:normal;overflow:hidden;padding:10px 5px;word-break:normal;}
        .tg .tg-a3y7{font-family:"Arial Black", Gadget, sans-serif !important;text-align:left;vertical-align:top}
        .tg .tg-m48a{font-family:"Arial Black", Gadget, sans-serif !important;font-size:100%;text-align:left;vertical-align:top}
        .tg .tg-0lax{text-align:left;vertical-align:top}
    </style>
    </head>
    <body>
        <div style="display:flex;align-items:center; justify-content:center">
        <h3 style="font-weight:600">${fullname}</h3>
        <h4 style="margin-left:6px">(${user_email}) Made An Order ${order_name}.</h4> 
        </div>
        <div style="display:flex;align-items:center; justify-content:center;
        margin-top:15px;font-weight:600">
        <h4>Total Price -</h4>
         <h3 style="color:green;font-weight:600; margin-left:6px">₾${totalPrice}</h3>
        </div>
        ${detailsText}
    </body>
    </html>
   ${tableHTML} 
    `,
  });
}
