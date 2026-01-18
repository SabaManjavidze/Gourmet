import { Button } from "@/components/ui/button";
import { useMenu } from "@/hooks/useMenu";
import { useSession } from "next-auth/react";
import { useTranslations } from "next-intl";
import { toast } from "sonner";

export function BottomButtons({
  saveClick,
  saveText,
  orderId,
  size = "lg",
}: {
  saveClick?: () => void;
  saveText?: string;
  orderId?: string;
  size?: "sm" | "lg" | "xl";
}) {
  const g = useTranslations("General");
  const { handleSaveClick, changes, saveLoading } = useMenu();
  const { status } = useSession();
  return (
    <div
      className="*:spacing flex w-[500px] justify-center *:border-2
      *:py-6 *:font-bold *:uppercase *:tracking-wider"
    >
      <Button
        variant={"outline-accent"}
        isLoading={saveLoading}
        disabled={!changes || saveLoading}
        className="max-md:w-40 max-md:py-0 max-md:text-base max-xs:w-32 max-xs:text-xs "
        onClick={async () => {
          if (status !== "authenticated") {
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
    </div>
  );
}
