"use client";

import { useMenu } from "@/hooks/useMenu";
import { XCircleIcon } from "lucide-react";

export function ClearButton() {
  const { clearQuantities } = useMenu();
  return (
    <button
      className="flex items-center text-lg text-gray-500
      duration-150 hover:text-gray-400 max-md:text-sm max-xs:text-xs"
      onClick={clearQuantities}
    >
      <h3>Clear</h3>
      <XCircleIcon className="ml-1 max-sm:h-5 max-sm:w-5" />
    </button>
  );
}
