import { InputHTMLAttributes } from "react";
import { z } from "zod";

export const InputSchema = {
  "Primary Contact Information": [
    { title: "Name" },
    { title: "Phone Number", type: "number", name: "phone" },
    { title: "Email", type: "email", name: "email" },
  ],
  "Secondary Contact Information (Optional)": [
    { title: "Name" },
    {
      title: "Phone Number",
      name: "phone2",
      type: "number",
    },
  ],
  "Delivery Information": [
    { title: "Address", name: "address" },
    { title: "Delivery Date and Time", type: "date" },
    { title: "Extra Information", type: "text", name: "extraInfo" },
  ],
  "Company Information (Optional)": [
    { title: "Company Name", name: "companyName" },
    { title: "Dot Number", type: "number", name: "dotNumber" },
    {
      title: "Email Address (For sending BOL PDF)",
      placeholder: "email address",
      name: "companyEmail",
      // type: "email",
    },
  ],
} satisfies Record<string, inputType[]>;
export type InputSchema = {
  [key in keyof typeof InputSchema]: inputType[];
};
export const orderNowSchema = z.object({
  firstname: z.string().min(2),
  lastname: z.string(),
  email: z.string().email().optional(),
  invoiceRequested: z.boolean().optional().default(false),
  phone: z.string().min(9),
  firstname2: z.string().optional(),
  lastname2: z.string().optional(),
  phone2: z.string().optional(),
  address: z.string(),
  date: z.date(),
  time: z.date(),
  companyName: z.string().optional(),
  dotNumber: z.string().optional(),
  extraInfo: z.string().optional(),
  companyEmail: z.string().optional(),
});
const orderKeys = orderNowSchema.keyof();
export type OrderFormType = z.infer<typeof orderNowSchema>;
type inputType = {
  title: string;
  placeholder?: string;
  type?: InputHTMLAttributes<HTMLInputElement>["type"];
  name?: z.infer<typeof orderKeys>;
};
