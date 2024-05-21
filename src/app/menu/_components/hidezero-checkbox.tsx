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
            className="border-2"
            onCheckedChange={(checked) => setHideZeroQt(Boolean(checked))}
          />
          <label
            htmlFor="terms"
            className="text-lg font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            Hide the products with zero quantity
          </label>
        </>
      ) : (
        <>
          <label
            htmlFor="terms"
            className="text-lg font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            Hide the products with zero quantity
          </label>
          <Checkbox
            size="sm"
            className="border-2"
            onCheckedChange={(checked) => setHideZeroQt(Boolean(checked))}
          />
        </>
      )}
    </div>
  );
}