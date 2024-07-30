import { Button } from "@/components/ui/button";
import { useMenu } from "@/hooks/useMenu";
import { PlusCircle } from "lucide-react";

export function AddProductsSection({ onClick }: { onClick: () => void }) {
  return (
    <div className="flex w-full justify-between text-center text-lg font-medium text-muted-sm">
      <div className="flex w-1/2 items-center justify-center border border-t-0 max-sm:w-2/5 max-xs:w-1/4 xl:w-3/4">
        <Button
          variant={"ghost"}
          className="group h-4/5 text-xl text-accent-foreground"
          onClick={onClick}
        >
          <PlusCircle className="mr-2" />
          Add more Products
        </Button>
      </div>
      <div className="flex w-1/2 justify-between text-2xl font-bold *:w-full max-sm:w-3/5 max-xs:w-3/4">
        <p className="border border-l-0 border-t-0 p-5">-</p>
        <p className="border border-l-0  border-t-0 p-5">-</p>
        <p className="border border-l-0  border-t-0 p-5">-</p>
      </div>
    </div>
  );
}
