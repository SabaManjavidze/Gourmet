"use client";

import { Input } from "@/components/ui/input";
import { useMenu } from "@/hooks/useMenu";
import { XCircleIcon } from "lucide-react";

export function NumberOfGuests() {
  return (
    <div className="flex w-full items-center justify-center">
      <h3
        className="w-4/5 text-xl font-semibold text-gray-500 
              max-xl:text-lg max-md:text-base max-sm:text-xs"
      >
        Please Enter Number of Guests and Get Perfect Menu For You
      </h3>
      <Input
        placeholder="0"
        type="number"
        className="ml-4 w-16 rounded-xl text-center text-lg text-muted-sm
                max-lg:h-8 max-lg:text-base max-md:w-12 max-md:px-1 max-sm:text-xs"
      />
    </div>
  );
}
