import { ClearButton } from "@/app/menu/_components/clear-button";
import { HideZeroCheckbox } from "@/app/menu/_components/hidezero-checkbox";
import { MenuTemplate } from "@/app/menu/_components/menu-template";
import { SumSection } from "@/app/menu/_components/sum-section";
import { OrderNowModal } from "@/components/order-now-modal/order-now-modal";
import { MenuProvider } from "@/hooks/useMenu";
import { api } from "@/trpc/react";
import { Loader2, PlusCircle } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { AddProductModal } from "./add-product-modal";

export function ProductsSection({ currMenu }: { currMenu: string }) {
  const [orderOpen, setOrderOpen] = useState(false);
  const [addProdOpen, setAddProdOpen] = useState(false);
  const {
    data: dbMenu,
    isLoading,
    error,
  } = api.sampleMenu.getMenuProducts.useQuery({ menuName: currMenu });
  useEffect(() => {
    if (!isLoading && dbMenu) {
      console.log(dbMenu);
    }
  }, [isLoading, dbMenu]);
  if (error) throw error;
  if (isLoading || !dbMenu)
    return (
      <div className="flex min-h-screen w-full items-center justify-center bg-background">
        <Loader2 size={50} color={"black"} />
      </div>
    );

  const handleSaveClick = () => {
    console.log("saved");
  };
  const handleOrderNowClick = () => {
    setOrderOpen(true);
  };
  const closeModal = () => {
    setAddProdOpen(false);
  };
  const addProductsClick = () => {
    setAddProdOpen(true);
  };
  const closeOrderModal = () => {
    setOrderOpen(false);
  };
  return (
    <MenuProvider dbMenu={dbMenu}>
      <OrderNowModal open={orderOpen} closeModal={closeOrderModal} />
      {addProdOpen ? (
        <AddProductModal
          menuSample={currMenu}
          open={addProdOpen}
          closeModal={closeModal}
        />
      ) : null}
      <MenuTemplate
        products={dbMenu[currMenu] ?? []}
        name={currMenu}
        id="menu"
        header={
          <div className="mt-8">
            <div className="flex items-center justify-center">
              <h3 className="text-xl font-semibold text-gray-500">
                Please Enter Number of Guests and Get Perfect Menu For You
              </h3>
              <Input
                placeholder="0"
                type="number"
                className="ml-4 w-16 rounded-xl text-center text-lg text-muted-sm"
              />
            </div>

            <div className="mt-8 flex items-center justify-between px-3">
              <HideZeroCheckbox iconSide="left" />
              <ClearButton />
            </div>
          </div>
        }
      />
      <div
        key="234234"
        className="flex w-full justify-between text-center text-lg font-medium text-muted-sm"
      >
        <div className="flex w-1/2 items-center justify-center border border-t-0 max-sm:w-2/5 max-xs:w-1/4 xl:w-3/4">
          <Button
            variant={"ghost"}
            className="group h-4/5 text-xl text-accent-foreground"
            onClick={addProductsClick}
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
      <div className="mt-8">
        <SumSection />
      </div>
      {/* if user is editing the menu make the buttons sticky else keep it normal. 
            reset buttons to normal if currMenu is changed */}
      <div className={`sticky bottom-8 mt-8 flex w-full justify-center`}>
        <div className="*:spacing flex w-[500px] justify-between *:border-2 *:py-6 *:text-base *:font-bold *:uppercase *:tracking-wider">
          <Button
            variant={"outline-accent"}
            onClick={handleSaveClick}
            size={"lg"}
          >
            Save For Later
          </Button>
          <Button
            variant={"accent"}
            onClick={handleOrderNowClick}
            size={"lg"}
            className={"border-accent"}
          >
            Order Now
          </Button>
        </div>
      </div>
    </MenuProvider>
  );
}
