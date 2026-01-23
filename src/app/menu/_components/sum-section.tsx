"use client";

import { useDiscount } from "@/hooks/useDiscount";
import { useMenu } from "@/hooks/useMenu";
import { api } from "@/trpc/react";
import { useSession } from "next-auth/react";
import { useTranslations } from "next-intl";

export function SumSection() {
  const { totalSum } = useMenu();
  const { discountType, discountedPrice } = useDiscount();
  const t = useTranslations("Sum Section");

  return (
    <div
      className="flex justify-between bg-[#FED775] px-10 py-2 
    text-2xl font-bold text-muted-sm max-lg:px-6 max-lg:text-lg
    max-xs:text-xs"
    >
      <h3>{t("sum")}</h3>
      {
        <h3>
          ₾{totalSum}
          {discountType == "third order" ? ` 10% ${t("discount 3rd")}` : ""}
          {discountType != "none" && discountedPrice}
        </h3>
      }
    </div>
  );
}
