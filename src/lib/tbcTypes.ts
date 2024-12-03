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
  method: "GET" | "REDIRECT";
  rel: string;
}

export interface WebPaymentPayload {
  amount: PaymentAmount;
  returnurl: string;
  extra?: string;
  expirationMinutes?: number | string;
  methods?: PaymentMethods[];
  installmentProducts?: InstallmentProduct[];
  userIpAddress?: string;
  callbackUrl?: string;
  preAuth?: boolean;
  language?: PageLanguage;
  merchantPaymentId?: string;
  skipInfoMessage?: boolean;
  saveCard?: boolean;
  saveCardToDate?: string;
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

export interface PaymentDetails {
  payId: string; // payment id
  status:
    | "Created"
    | "Processing"
    | "Succeeded"
    | "Failed"
    | "Expired"
    | "WaitingConfirm"
    | "CancelPaymentProcessing"
    | "PaymentCompletionProcessing"
    | "Returned"
    | "PartialReturned"; // payment status with allowed values
  currency: string; // transaction currency (3-digit ISO code)
  amount: number; // transaction amount, format: 0.00
  confirmedAmount: number; // confirmed amount for the transaction, format: 0.00
  returnedAmount: number; // transaction returned amount
  links: {
    uri: string; // URL
    method: string; // HTTP method to use on URL
    rel: string; // action to use on URL
  }[]; // links object is an array of link objects
  transactionId: string; // transaction_id from UFC
  recurringCard: {
    recId: string; // saved card recId
    cardMask: string; // masked card PAN
    expiryDate: string; // card expiry date
  } | null; // saved card parameters or null if saving wasn't required
  paymentMethod: number; // payment method identifier
  RRN: string; // Transaction identifier (12 characters)
  extra?: string; // optional additional merchant-specific info
  extra2?: string; // optional additional merchant-specific info
  preAuth: "true" | "false"; // preauthorization status for the payment
  Initiator: "client" | "Merchant" | "None"; // who initiated the transaction
  httpStatusCode: number; // HTTP status code
  developerMessage: string; // developer message for logging
  userMessage: string; // user-facing error message
  resultCode: string; // business-level transaction status description
  PaymentCardNumber: number; // masked payment card number
  operationType: 0 | 1 | 2; // 0: Standard QR, 1: BNPL, 2: Ertguli Points
}

export interface CompletePreAuthResponse {
  status: string;
  amount: number;
  confirmedAmount: number;
  httpStatusCode: number;
  developerMessage?: string;
  userMessage?: string;
}
