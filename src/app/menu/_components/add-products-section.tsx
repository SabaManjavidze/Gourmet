import { Button } from "@/components/ui/button";
import { useMenu } from "@/hooks/useMenu";
import { PlusCircle } from "lucide-react";

export function AddProductsSection({ onClick }: { onClick: () => void }) {
  return (
    <div
      className="flex w-full justify-between text-center 
    font-medium text-muted-sm"
    >
      <div
        className="menu-table-items flex items-center justify-center 
      border border-t-0"
      >
        <Button
          variant={"ghost"}
          className="group h-4/5 text-accent-foreground
          max-md:w-40 max-md:py-0"
          onClick={onClick}
        >
          <PlusCircle className="mr-2 max-md:h-5 max-md:w-5" />
          Add more Products
        </Button>
      </div>
      <div className="menu-table-other-fields flex justify-between font-bold *:w-full">
        <p className="border border-l-0 border-t-0 p-5">-</p>
        <p className="border border-l-0  border-t-0 p-5">-</p>
        <p className="border border-l-0  border-t-0 p-5">-</p>
      </div>
    </div>
  );
}
