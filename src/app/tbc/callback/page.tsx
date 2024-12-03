"use client";
import { api } from "@/trpc/react";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/router";

export default function PaymentCallBack() {
  const payId = localStorage.getItem("payId");
  if (!payId) {
    return <p>Something went wrong</p>;
  }
  const { data, isLoading, error } = api.tbc.completePaymentOrder.useQuery({
    payId,
  });
  if (isLoading) {
    return (
      <div className="flex min-h-screen w-full items-center justify-center bg-background">
        <Loader2 size={50} color={"black"} />
      </div>
    );
  }
  if (error ?? data !== "Succeeded") {
    return <p>Something went wrong</p>;
  }
  return <p>Payment was succesfull</p>;
}
