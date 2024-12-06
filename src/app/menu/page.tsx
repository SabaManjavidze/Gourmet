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
import { api } from "@/trpc/react";
import { BottomButtons } from "../catering/_components/bottom-buttons";
import { NumberOfGuests } from "./_components/number-of-guests";

export default function MenuPage() {
  const { data, isLoading, error } = api.sampleMenu.getMainMenu.useQuery();

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
        <h1 className="text-shadow-sm z-10 font-lucida-bold text-8xl max-md:text-6xl">
          მთავარი მენიუ
        </h1>
        <p
          className="z-10 mt-7 text-center text-xl font-normal 
        text-blue-950/80 max-md:text-base"
        >
          გაეცანით მენიუს და შეარჩიეთ თქვენთვის სასურველი კერძები
        </p>
      </div>
      <div className="flex justify-center pb-20">
        <div className="w-3/4 max-md:w-[90%]">
          <MenuProvider dbMenu={data} changes={true}>
            {Object.keys(data).map((item, idx) => (
              <MenuTemplate
                key={uuid()}
                // addable={false}
                // products={data[item] ?? []}
                name={item}
                header={
                  idx == 0 ? (
                    <div className="mt-8">
                      <NumberOfGuests />

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
              <BottomButtons />
            </div>
          </MenuProvider>
        </div>
      </div>
    </main>
  );
}
