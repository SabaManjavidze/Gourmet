"use client";
import { api } from "@/trpc/react";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function PaymentCallBack() {
  const [payId, setPayId] = useState("");
  const router = useRouter();
  const { data, isLoading, error } = api.tbc.completePaymentOrder.useQuery(
    {
      payId,
    },
    { enabled: !!payId },
  );
  useEffect(() => {
    if (!payId) {
      const storedId = localStorage.getItem("payId");
      setPayId(storedId ?? "");
    }
    if (!isLoading && data == "Succeeded") {
      localStorage.removeItem("payId");
      router.push("/user/profile");
    }
  }, [isLoading]);
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
  return (
    <div className="flex h-[70vh] w-full items-center justify-center">
      <h1 className="text-center text-6xl text-primary">
        Payment was succesfull
      </h1>
    </div>
  );
}
