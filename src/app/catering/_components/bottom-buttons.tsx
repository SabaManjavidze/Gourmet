import { Button } from "@/components/ui/button";
import { useMenu } from "@/hooks/useMenu";
import { useState } from "react";
import { toast } from "sonner";

export function BottomButtons({
  saveText,
  orderText,
  orderId,
}: {
  saveText?: string;
  orderId?: string;
  orderText?: string;
}) {
  const [saveLoading, setSaveLoading] = useState(false);
  const { handleSaveClick, handleOrderClick, changes, menu } = useMenu();
  const [menuName] = Object.keys(menu);
  return (
    <div className="*:spacing flex w-[500px] justify-between *:border-2 *:py-6 *:text-base *:font-bold *:uppercase *:tracking-wider">
      <Button
        variant={"outline-accent"}
        isLoading={saveLoading}
        disabled={!changes}
        onClick={async () => {
          setSaveLoading(true);
          await handleSaveClick(orderId);
          setSaveLoading(false);
          toast.success(orderId ? `${menuName} Updated` : `${menuName} Saved`);
        }}
        size={"lg"}
      >
        {saveText ?? "Save For Later"}
      </Button>
      <Button
        variant={"accent"}
        onClick={handleOrderClick}
        size={"lg"}
        className={"border-accent"}
      >
        {orderText ?? "Order Now"}
      </Button>
    </div>
  );
}
