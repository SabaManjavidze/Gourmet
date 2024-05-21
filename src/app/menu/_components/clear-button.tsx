"use client";

import { useMenu } from "@/hooks/useMenu";
import { XCircleIcon } from "lucide-react";

export function ClearButton() {
  const { clearQuantities } = useMenu();
  return (
    <button
      className="flex items-center text-lg
                    text-gray-500 duration-150 hover:text-gray-400"
      onClick={clearQuantities}
    >
      <h3>Clear</h3>
      <XCircleIcon className="ml-1" />
    </button>
  );
}
