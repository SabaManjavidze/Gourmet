"use client";

import { useMenu } from "@/hooks/useMenu";
import { api } from "@/trpc/react";
import { useSession } from "next-auth/react";
import { useTranslations } from "next-intl";

export function SumSection() {
  const { totalSum } = useMenu();
  const { isLoading, data, error } = api.order.getUserOrderCount.useQuery();
  const session = useSession();
  const t = useTranslations("Sum Section");
  return (
    <div
      className="flex justify-between bg-[#FED775] px-10 py-2 
    text-2xl font-bold text-muted-sm max-lg:px-6 max-lg:text-lg
    max-xs:text-xs"
    >
      <h3>{t("sum")}</h3>
      {session.status == "unauthenticated" || Number(data) > 0 ? (
        <h3>₾{totalSum}</h3>
      ) : (
        <h3>
          ₾{totalSum}(5% {t("discount")} {0.95 * totalSum})
        </h3>
      )}
    </div>
  );
}
