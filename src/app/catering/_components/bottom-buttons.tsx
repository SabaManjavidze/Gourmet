import { Button } from "@/components/ui/button";
import { useMenu } from "@/hooks/useMenu";
import { api } from "@/trpc/react";
import { useSession } from "next-auth/react";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { toast } from "sonner";

export function BottomButtons({
  orderClick,
  saveClick,
  saveText,
  orderText,
  orderId,
  size = "lg",
}: {
  orderClick?: () => void;
  saveClick?: () => void;
  saveText?: string;
  orderId?: string;
  orderText?: string;
  size?: "sm" | "lg" | "xl";
}) {
  const g = useTranslations("General");
  const {
    handleSaveClick,
    handleOrderClick,
    changes,
    saveLoading,
    setOrderOpen,
  } = useMenu();
  const { status } = useSession();
  return (
    <div
      className="*:spacing flex w-[500px] justify-between *:border-2 
      *:py-6 *:font-bold *:uppercase *:tracking-wider"
    >
      <Button
        variant={"outline-accent"}
        isLoading={saveLoading}
        disabled={!changes || saveLoading}
        className="max-md:w-40 max-md:py-0 max-md:text-base max-xs:w-32 max-xs:text-xs "
        onClick={async () => {
          if (status !== "authenticated") {
            // toast.error("You need to authenticate");
            toast.error("გაიარეთ ავტორიზაცია");
            return;
          }
          saveClick?.();
          await handleSaveClick({ orderId });
        }}
        size={size}
      >
        {saveText ?? g("save")}
      </Button>
      <Button
        variant={"accent"}
        onClick={() => {
          // if (status !== "authenticated") {
          //   toast.error("You need to authenticate");
          //   return;
          // }
          const result = handleOrderClick();
          if (!result) {
            return;
          }
          orderClick?.();
          setOrderOpen(true);
        }}
        size={size}
        className="border-accent max-md:w-40 max-md:py-0 max-md:text-base 
          max-xs:w-32 max-xs:text-xs"
      >
        {orderText ?? g("order")}
      </Button>
    </div>
  );
}
