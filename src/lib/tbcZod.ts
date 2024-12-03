import { z } from "zod";
import { PaymentCurrency, PaymentMethods, PageLanguage } from "./tbcTypes";

export const paymentCurrencySchema = z.nativeEnum(PaymentCurrency);

export const paymentMethodsSchema = z.nativeEnum(PaymentMethods);

export const installmentProductSchema = z.object({
  Price: z.number(),
  Quantity: z.number(),
  Name: z.string().optional(),
});

export const pageLanguageSchema = z.nativeEnum(PageLanguage);

export const paymentAmountSchema = z.object({
  total: z.number(),
  subtotal: z.number(),
  tax: z.number(),
  shipping: z.number(),
  currency: paymentCurrencySchema,
});

export const webPaymentPayloadSchema = z.object({
  amount: paymentAmountSchema,
  returnurl: z.string(),
  //   extra: z.string().optional(),
  //   expiration_minutes: z.number().optional(),
  //   methods: z.array(paymentMethodsSchema).optional(),
  installmentProducts: z.array(installmentProductSchema).optional(),
  //   callbackUrl: z.string().optional(),
  //   preAuth: z.boolean().optional(),
  //   language: pageLanguageSchema.optional(),
  //   merchantPaymentId: z.string().optional(),
  //   skipInfoMessage: z.boolean().optional(),
  //   saveCard: z.boolean().optional(),
  //   saveCardToDate: z.string().optional(),
});
