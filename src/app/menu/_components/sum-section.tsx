"use client";

import { useMenu } from "@/hooks/useMenu";
import { api } from "@/trpc/react";

export function SumSection() {
  const { totalSum } = useMenu();
  const { isLoading, data, error } = api.order.getUserOrderCount.useQuery();
  return (
    <div
      className="flex justify-between bg-[#FED775] px-10 py-2 
    text-2xl font-bold text-muted-sm max-lg:px-6 max-lg:text-lg
    max-xs:text-xs"
    >
      <h3>ჯამი</h3>
      {Number(data) > 0 ? (
        <h3>₾{totalSum}</h3>
      ) : (
        <h3>
          ₾{totalSum}(5% ფასდაკლება პირველ შეკვეთაზე {0.95 * totalSum})
        </h3>
      )}
    </div>
  );
}
