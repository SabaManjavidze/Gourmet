import { Button } from "@/components/ui/button";
import { useMenu } from "@/hooks/useMenu";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { toast } from "sonner";

export function BottomButtons({
  saveText,
  orderText,
  orderId,
  size = "lg",
}: {
  saveText?: string;
  orderId?: string;
  orderText?: string;
  size?: "sm" | "lg" | "xl";
}) {
  const [saveLoading, setSaveLoading] = useState(false);
  const { handleSaveClick, handleOrderClick, changes, menu } = useMenu();
  const { status } = useSession()
  const [menuName] = Object.keys(menu);
  return (
    <div className="*:spacing flex w-[500px] justify-between *:border-2 
      *:py-6 *:font-bold *:uppercase *:tracking-wider">
      <Button
        variant={"outline-accent"}
        isLoading={saveLoading}
        disabled={!changes}
        onClick={async () => {
          if (status !== "authenticated") {
            toast.error("You need to authenticate");
            return
          }
          setSaveLoading(true);
          const success = await handleSaveClick(orderId);
          setSaveLoading(false);
          if (!success) return
          toast.success(orderId ? `${menuName} Updated` : `${menuName} Saved`);
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
            return
          }
          handleOrderClick()
        }
        }
        size={size}
        className={"border-accent"}
      >
        {orderText ?? "Order Now"}
      </Button>
    </div>
  );
}
