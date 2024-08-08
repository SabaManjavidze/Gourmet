"use client";
import { Menu, menuKeys } from "menu";
import { MenuTemplate } from "./_components/menu-template";
import { v4 as uuid } from "uuid";
import { MenuProvider } from "@/hooks/useMenu";
import { HideZeroCheckbox } from "./_components/hidezero-checkbox";
import { Input } from "@/components/ui/input";
import { SumSection } from "./_components/sum-section";
import { Loader2, XIcon } from "lucide-react";
import { ClearButton } from "./_components/clear-button";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { OrderNowModal } from "@/components/order-now-modal/order-now-modal";
import { api } from "@/trpc/react";

export default function MenuPage() {
  const { data, isLoading, error } = api.sampleMenu.getMainMenu.useQuery();

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
  if (error) throw error;
  if (isLoading || !data)
    return (
      <div className="flex min-h-screen w-full items-center justify-center bg-background">
        <Loader2 size={50} color={"black"} />
      </div>
    );
  return (
    <main className="mt-8">
      <div className="flex w-full flex-col items-center justify-center bg-menu-banner bg-contain bg-center bg-no-repeat py-48 max-lg:bg-none">
        <h1 className="text-shadow-sm z-10 font-lucida-bold text-8xl">Menu</h1>
        <p className="z-10 mt-2 text-xl font-normal text-blue-950/80">
          Explore, Customize, and Order Your Perfect Meal!
        </p>
      </div>
      <div className="flex justify-center pb-20">
        <div className="w-3/4">
          <MenuProvider dbMenu={data}>
            <OrderNowModal open={orderOpen} closeModal={closeOrderModal} />
            {Object.keys(data).map((item, idx) => (
              <MenuTemplate
                key={uuid()}
                addable={false}
                // products={data[item] ?? []}
                name={item}
                header={
                  idx == 0 ? (
                    <div className="mt-8">
                      <div className="flex items-center justify-center">
                        <h3 className="text-xl font-semibold text-gray-500 max-lg:text-base max-md:text-sm">
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
