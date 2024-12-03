// import { config } from "dotenv";
import { env } from "@/env";
import { TBC_BASE_URL } from "@/lib/constants";
import axios, { AxiosHeaders, AxiosInstance } from "axios";
import {
  Authentication,
  CompletePreAuthResponse,
  PaymentDetails,
  PaymentResponse,
  WebPaymentPayload,
} from "../lib/tbcTypes";
import { addTBCTokenToDB } from "./api/routers/tbc";
export interface PaymentErrorResponse {
  type: string;
  title: string;
  status: number;
  detail: string;
  systemCode: string;
  code: string;
  traceId: string;
}
export enum TBCErrorStatus {
  UNAUTHORIZED = 401,
}

// config();
const tbcClient = axios.create({
  baseURL: TBC_BASE_URL,
  headers: {
    // Authorization: this.access_token
    //   ? `Bearer ${this.access_token}`
    //   : undefined,
    apiKey: env.TBC_API_KEY,
  },
});
export class TBC {
  access_token?: string;
  access_token_callback?: (token: string) => Promise<void>;
  payment_id?: string;
  // tbcClient: AxiosInstance;
  constructor({
    access_token,
    payment_id,
  }: {
    access_token?: string;
    payment_id?: string;
    access_token_callback?: (token: string) => void;
  }) {
    if (!access_token) {
      this.get_access_token().then((res) => {
        this.access_token = res.access_token;
        this.access_token_callback?.(res.access_token);
      });
    } else {
      this.access_token = access_token;
    }
    this.access_token_callback = this.access_token_callback;
    this.payment_id = payment_id;
  }

  public async get_payment(payId: string) {
    const { data } = await tbcClient.post(`/v1/tpay/payments/${payId}`, "", {
      headers: {
        Authorization: `Bearer ${this.access_token}`,
        "Content-Type": "application/x-www-form-urlencoded",
        apiKey: env.TBC_API_KEY,
      },
    });
    console.log({ data });
    return data as PaymentDetails;
  }
  public async get_access_token() {
    const myHeaders = new AxiosHeaders();
    myHeaders.set("Content-Type", "application/x-www-form-urlencoded");
    myHeaders.set("apiKey", env.TBC_API_KEY);
    const urlencoded = new URLSearchParams();
    urlencoded.append("client_id", env.TBC_CLIENT_ID);
    urlencoded.append("client_secret", env.TBC_CLIENT_SECRET);
    // try {
    const { data } = await tbcClient.post("/v1/tpay/access-token", urlencoded, {
      headers: myHeaders,
    });
    if (!data?.access_token || !data?.expires_in || !data?.token_type) {
      throw new Error("invalid response");
    }
    this.access_token = data.access_token;
    await addTBCTokenToDB(data.access_token);
    console.log({ data });
    return data as Authentication;
    // } catch (error: any) {
    //   throw new Error(error);
    // }
  }
  public async create_payment(data: WebPaymentPayload) {
    // try {
    const result = await tbcClient.post(
      "/v1/tpay/payments",
      Object.assign(data, {
        methods: [5],
      } as WebPaymentPayload),
      {
        headers: {
          Authorization: `Bearer ${this.access_token}`,
        },
      },
    );
    return result.data as PaymentResponse;
    // } catch (error: any) {
    //   throw new Error(
    //     JSON.stringify(error?.response?.data, null, 2) ||
    //       JSON.stringify(error, null, 2),
    //   );
    // }
  }
  public async complete_payment(amount: string, payment_id: string) {
    console.log({ amount, payment_id });
    try {
      const result = await tbcClient.post(
        `/v1/tpay/payments/${payment_id}/completion`,
        { amount },
        {
          headers: {
            Authorization: `Bearer ${this.access_token}`,
          },
        },
      );
      return result.data as CompletePreAuthResponse;
    } catch (error: any) {
      throw new Error(
        JSON.stringify(error?.response?.data, null, 2) ||
          JSON.stringify(error, null, 2),
      );
    }
  }
}
// const tbc = new TBC({});
// const payment = await tbc.create_payment({
//   amount: {
//     currency: PaymentCurrency.GEL,
//     total: 0.01,
//     subtotal: 0,
//     tax: 0,
//     shipping: 0,
//   },
//   returnurl: "shopping.ge/callback",
//   extra: "GE60TB7226145063300008",
//   userIpAddress: "127.0.0.1",
//   expirationMinutes: "5",
//   methods: [5],
//   installmentProducts: [
//     { Name: "t1", Price: 100, Quantity: 1 },
//     { Name: "t1", Price: 50, Quantity: 1 },
//     { Name: "t1", Price: 50, Quantity: 1 },
//     { Name: "t1", Price: 100, Quantity: 1 },
//     { Name: "t1", Price: 50, Quantity: 1 },
//     { Name: "t1", Price: 50, Quantity: 1 },
//   ],
//   callbackUrl: "https://google.com",
//   preAuth: false,
//   language: PageLanguage.KA,
//   saveCard: false,
// });
// const token = await tbc.get_access_token();
// console.log({ token });
//THINK ABOUT WHERE TO SAVE THE ACCESS_TOKEN
// ALSO FIND OUT WHAT IS THE RESPONSE LIKE WHEN ACCESS_TOKEN IS EXPIRED
