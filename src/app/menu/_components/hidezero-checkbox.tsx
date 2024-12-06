"use client";

import { Checkbox } from "@/components/ui/checkbox";
import { useMenu } from "@/hooks/useMenu";

export function HideZeroCheckbox({
  iconSide = "right",
}: {
  iconSide?: "left" | "right";
}) {
  const { setHideZeroQt } = useMenu();
  return (
    <div className="flex items-center space-x-2">
      {iconSide == "left" ? (
        <>
          <Checkbox
            size="sm"
            className="border-2 max-md:h-4 max-md:w-4"
            onCheckedChange={(checked) => setHideZeroQt(Boolean(checked))}
          />
          <label
            htmlFor="terms"
            className="text-base font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 max-md:text-sm max-xs:text-xs"
          >
            დამალეთ პროდუქტები ნულოვანი რაოდენობით
          </label>
        </>
      ) : (
        <>
          <label
            htmlFor="terms"
            className="text-base font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            დამალეთ პროდუქტები ნულოვანი რაოდენობით
          </label>
          <Checkbox
            size="sm"
            className="border-2 max-md:h-3 max-md:w-3"
            onCheckedChange={(checked) => setHideZeroQt(Boolean(checked))}
          />
        </>
      )}
    </div>
  );
}
