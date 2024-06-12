"use client";
import { Menu, menuKeys } from "menu";
import { MenuTemplate } from "./_components/menu-template";
import { v4 as uuid } from "uuid";
import { MenuProvider } from "@/hooks/useMenu";
import { Checkbox } from "@/components/ui/checkbox";
import { HideZeroCheckbox } from "./_components/hidezero-checkbox";
import { Input } from "@/components/ui/input";
import { SumSection } from "./_components/sum-section";
import { XIcon } from "lucide-react";
import { ClearButton } from "./_components/clear-button";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { OrderNowModal } from "@/components/order-now-modal/order-now-modal";

export default function MenuPage() {
  const [orderOpen, setOrderOpen] = useState(false);
  const handleSaveClick = () => {
    console.log("saved");
  };
  const handleOrderNowClick = () => {
    setOrderOpen(true);
  };
  const closeOrderModal = () => {
    setOrderOpen(false);
  };
  return (
    <main className="mt-8">
      <div className="flex h-[500px] flex-col items-center justify-center bg-menu-banner bg-cover bg-center bg-no-repeat">
        <h1 className="text-shadow-sm font-lucida-bold text-8xl">Menu</h1>
        <p className="mt-2 text-xl font-normal text-blue-950/80">
          Explore, Customize, and Order Your Perfect Meal!
        </p>
      </div>
      <div className="mx-44 p-12 px-36 pb-20 pt-0 max-xl:mx-16 max-xl:px-0 max-lg:mx-5 max-sm:mx-6">
        <div>
          <MenuProvider dbMenu={Menu}>
            <OrderNowModal open={orderOpen} closeModal={closeOrderModal} />
            {menuKeys.map((item, idx) => (
              <MenuTemplate
                key={uuid()}
                name={item}
                header={
                  idx == 0 ? (
                    <div className="mt-8">
                      <div className="flex items-center justify-center">
                        <h3 className="text-xl font-semibold text-gray-500">
                          Please Enter Number of Guests and Get Perfect Menu For
                          You
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
                  ) : undefined
                }
                footer={
                  idx == menuKeys.length - 1 && (
                    <div className="mt-8">
                      <SumSection />
                    </div>
                  )
                }
              />
            ))}
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
