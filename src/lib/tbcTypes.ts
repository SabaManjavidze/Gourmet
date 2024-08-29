export enum PaymentCurrency {
  EUR = "EUR",
  USD = "USD",
  GEL = "GEL",
}

export enum PaymentMethods {
  web_qr = 4,
  pan_card = 5,
  ertguli_points = 6,
  internet_bank = 7,
  installment = 8,
  apple_pay = 9,
}

export enum PageLanguage {
  KA = "KA",
  EN = "EN",
}

export interface Authentication {
  access_token: string;
  expires_in: number;
  token_type: string;
}

export interface PaymentAmount {
  total: number;
  subtotal: number;
  tax: number;
  shipping: number;
  currency: PaymentCurrency;
}

export interface InstallmentProduct {
  Price: number;
  Quantity: number;
  Name?: string;
}

export interface PaymentLink {
  uri: string;
  method: string;
  rel: string;
}

export interface PaymentResponse {
  payId: string;
  status: string;
  amount: number;
  links: PaymentLink[];
  transactionId?: string;
  preAuth: boolean;
  recId?: string;
  httpStatusCode: number;
  developerMessage?: string;
  userMessage?: string;
}

export interface WebPaymentPayload {
  amount: PaymentAmount;
  returnurl: string;
  extra?: string;
  expiration_minutes?: number;
  methods?: PaymentMethods[];
  installmentProducts?: InstallmentProduct[];
  callbackUrl?: string;
  preAuth?: boolean;
  language?: PageLanguage;
  merchantPaymentId?: string;
  skipInfoMessage?: boolean;
  saveCard?: boolean;
  saveCardToDate?: string;
}

export interface PaymentDetails {
  payId: string;
  status: string;
  currency: string;
  amount: number;
  confirmedAmount: number;
  returnedAmount: number;
  links?: string;
  transactionId: string;
  paymentMethod: number;
  recurringCard?: object;
  preAuth: boolean;
  httpStatusCode: number;
  developerMessage?: string;
  userMessage?: string;
  isBnpl: boolean;
}

export interface CompletePreAuthResponse {
  status: string;
  amount: number;
  confirmedAmount: number;
  httpStatusCode: number;
  developerMessage?: string;
  userMessage?: string;
}
