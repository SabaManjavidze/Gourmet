"use client";

import { Checkbox } from "@/components/ui/checkbox";
import { useMenu } from "@/hooks/useMenu";
import { useTranslations } from "next-intl";

export function HideZeroCheckbox({
  iconSide = "right",
}: {
  iconSide?: "left" | "right";
}) {
  const { setHideZeroQt } = useMenu();
  const t = useTranslations("MenuPage");
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
            {t("hide zero")}
          </label>
        </>
      ) : (
        <>
          <label
            htmlFor="terms"
            className="text-base font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            {t("hide zero")}
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
