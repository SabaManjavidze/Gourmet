import { InputHTMLAttributes } from "react";
import { z } from "zod";

export const InputSchema = {
  "Primary Contact Information": [
    { title: "Name" },
    { title: "Phone Number", type: "number", name: "phone" },
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
      type: "email",
    },
  ],
} satisfies Record<string, inputType[]>;
export type InputSchema = {
  [key in keyof typeof InputSchema]: inputType[];
};
export const orderNowSchema = z.object({
  firstname: z.string(),
  lastname: z.string(),
  phone: z.number(),
  firstname2: z.string().optional(),
  lastname2: z.string().optional(),
  phone2: z.number().optional(),
  address: z.string(),
  date: z.date(),
  time: z.string().time(),
  companyName: z.string().optional(),
  dotNumber: z.number().optional(),
  extraInfo: z.number().optional(),
  companyEmail: z.string().email().optional(),
});
const orderKeys = orderNowSchema.keyof();
export type OrderFormType = z.infer<typeof orderNowSchema>;
type inputType = {
  title: string;
  placeholder?: string;
  type?: InputHTMLAttributes<HTMLInputElement>["type"];
  name?: z.infer<typeof orderKeys>;
};
