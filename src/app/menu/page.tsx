import { Menu, menuKeys } from "menu";
import { MenuTemplate } from "./_components/menu-template";
import { nanoid } from "nanoid";
import { MenuProvider } from "@/hooks/useMenu";
import { Checkbox } from "@/components/ui/checkbox";
import { HideZeroCheckbox } from "./_components/hidezero-checkbox";
import { Input } from "@/components/ui/input";
import { SumSection } from "./_components/sum-section";
import { XIcon } from "lucide-react";

export default function MenuPage() {
  return (
    <main className="mt-8">
      <div className="flex h-[500px] flex-col items-center justify-center bg-menu-banner bg-cover bg-center bg-no-repeat">
        <h1 className="text-shadow-sm font-lucida-bold text-8xl">Menu</h1>
        <p className="mt-2 text-xl font-normal text-muted-foreground">
          Explore, Customize, and Order Your Perfect Meal!
        </p>
      </div>
      <div className="mx-44 p-12 pb-20 pt-0">
        <div>
          <MenuProvider dbMenu={Menu}>
            {menuKeys.map((item, idx) => (
              <MenuTemplate
                key={nanoid()}
                name={item}
                header={
                  idx == 0 && (
                    <div className="mt-20">
                      <div className="flex items-center justify-center">
                        <h3 className="text-2xl font-semibold text-gray-500">
                          Please Enter Number of Guests and Get Perfect Menu For
                          You
                        </h3>
                        <Input
                          placeholder="0"
                          type="number"
                          className="ml-4 w-16 rounded-xl text-center text-lg text-muted-sm"
                        />
                      </div>
                      <div className="mt-12 flex items-center justify-end">
                        <HideZeroCheckbox />
                      </div>
                    </div>
                  )
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
          </MenuProvider>
        </div>
      </div>
    </main>
  );
}
