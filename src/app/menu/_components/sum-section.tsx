"use client";

import { useMenu } from "@/hooks/useMenu";

export function SumSection() {
  const { totalSum } = useMenu();
  return (
    <div className="text-muted-sm flex justify-between bg-[#FED775] px-10 py-2 text-2xl font-bold">
      <h3>Sum</h3>
      <h3>{totalSum}</h3>
    </div>
  );
}
