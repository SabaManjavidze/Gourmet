"use client";
import { nanoid } from "nanoid";
import { MenuTemplate } from "../menu/_components/menu-template";
import { Menu, menuKey } from "menu";
import { useMemo, useState } from "react";
import { SampleMenuCarousel } from "./_components/sample-menu-carousel";
import { MenuProvider } from "@/hooks/useMenu";
import { Button } from "@/components/ui/button";
import { PlusCircle, XCircleIcon, XIcon } from "lucide-react";
import { AddProductModal } from "./_components/add-product-modal";
import { Input } from "@/components/ui/input";
import { HideZeroCheckbox } from "../menu/_components/hidezero-checkbox";
import { SumSection } from "../menu/_components/sum-section";
import { ClearButton } from "../menu/_components/clear-button";
import { OrderNowModal } from "@/components/order-now-modal/order-now-modal";

export default function SampleMenus() {
  const [currMenu, setCurrMenu] = useState<menuKey>("Drinks");
  const [orderOpen, setOrderOpen] = useState(false);
  const [open, setOpen] = useState(false);
  const handleItemClick = (name: menuKey) => {
    setCurrMenu(name);
  };
  const closeModal = () => {
    setOpen(false);
  };
  const addProductsClick = () => {
    setOpen(true);
  };
  const handleOrderNowClick = () => {
    setOrderOpen(true);
  };
  const closeOrderModal = () => {
    setOrderOpen(false);
  };
  const handleSaveClick = () => {};
  const dbMenu = useMemo(() => {
    return { [currMenu]: Menu[currMenu] };
  }, [currMenu]);
  return (
    <main className="min-h-[140vh]">
      <div className="mt-44 flex w-full justify-center">
        <SampleMenuCarousel currMenu={currMenu} onItemClick={handleItemClick} />
      </div>
      <div className="mx-44 rounded-xl p-12 pb-20">
        <div className="mt-36">
          <MenuProvider dbMenu={dbMenu}>
            <OrderNowModal
              menuSample={currMenu}
              open={orderOpen}
              closeModal={closeOrderModal}
            />
            <AddProductModal
              menuSample={currMenu}
              open={open}
              closeModal={closeModal}
            />
            <MenuTemplate
              key={nanoid()}
              name={currMenu}
              header={
                <div className="mt-20">
                  <div className="flex items-center justify-center">
                    <h3 className="text-2xl font-semibold text-gray-500">
                      Please Enter Number of Guests and Get Perfect Menu For You
                    </h3>
                    <Input
                      placeholder="0"
                      type="number"
                      className="ml-4 w-16 rounded-xl text-center text-lg text-muted-sm"
                    />
                  </div>

                  <div className="mt-20 flex items-center justify-between px-3">
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
              <div className="flex w-2/3 items-center border border-t-0 max-lg:justify-center">
                <div className="w-1/4 max-lg:absolute"></div>
                <Button
                  variant={"ghost"}
                  className="group h-4/5 text-xl text-accent-foreground"
                  onClick={addProductsClick}
                >
                  <PlusCircle className="mr-2" />
                  Add more Products
                </Button>
              </div>
              <div className="flex w-1/3 justify-between text-2xl font-bold *:w-full">
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
        </div>
      </div>
    </main>
  );
}
