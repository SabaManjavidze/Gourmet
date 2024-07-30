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
import { BottomButtons } from "./bottom-buttons";
import { AddProductsSection } from "@/app/menu/_components/add-products-section";

export function ProductsSection({ currMenu }: { currMenu: string }) {
  const [orderOpen, setOrderOpen] = useState(false);
  const [addProdOpen, setAddProdOpen] = useState(false);
  const {
    data: dbMenu,
    isLoading,
    error,
  } = api.sampleMenu.getMenuProducts.useQuery({ menuName: currMenu });
  if (error ?? isLoading ?? !dbMenu)
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
        // products={dbMenu[currMenu] ?? []}
        addClick={addProductsClick}
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
      <div className="mt-8">
        <SumSection />
      </div>
      <div className={`sticky bottom-8 mt-8 flex w-full justify-center`}>
        <BottomButtons />
      </div>
    </MenuProvider>
  );
}
