import { Button } from "@/components/ui/button";
import { useMenu } from "@/hooks/useMenu";
import { useSession } from "next-auth/react";
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
  const [saveLoading, setSaveLoading] = useState(false);
  const { handleSaveClick, handleOrderClick, changes, menu } = useMenu();
  const { status } = useSession();
  return (
    <div
      className="*:spacing flex w-[500px] justify-between *:border-2 
      *:py-6 *:font-bold *:uppercase *:tracking-wider"
    >
      <Button
        variant={"outline-accent"}
        isLoading={saveLoading}
        disabled={!changes}
        className="max-md:w-40 max-md:py-0 max-md:text-base max-xs:w-32 max-xs:text-xs "
        onClick={async () => {
          if (status !== "authenticated") {
            toast.error("You need to authenticate");
            return;
          }
          setSaveLoading(true);
          saveClick?.();
          const success = await handleSaveClick(orderId);
          setSaveLoading(false);
          if (!success) return;
          toast.success(orderId ? "Updated Menu" : "Saved Menu");
        }}
        size={size}
      >
        {saveText ?? "Save For Later"}
      </Button>
      <Button
        variant={"accent"}
        onClick={() => {
          if (status !== "authenticated") {
            toast.error("You need to authenticate");
            return;
          }
          orderClick?.();
          handleOrderClick();
        }}
        size={size}
        className="border-accent max-md:w-40 max-md:py-0 max-md:text-base 
          max-xs:w-32 max-xs:text-xs"
      >
        {orderText ?? "Order Now"}
      </Button>
    </div>
  );
}
