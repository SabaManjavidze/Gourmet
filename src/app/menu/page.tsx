import { Menu, menuKeys } from "menu";
import { MenuTemplate } from "./_components/menu-template";
import { nanoid } from "nanoid";
import { MenuProvider } from "@/hooks/useMenu";

export default function MenuPage() {
  return (
    <main className="mt-8">
      <div className="flex h-[620px] flex-col items-center justify-center bg-menu-banner bg-cover bg-center bg-no-repeat">
        <h1 className="text-shadow-sm font-lucida-bold text-8xl">Menu</h1>
        <p className="mt-2 text-xl font-normal text-muted-foreground">
          Explore, Customize, and Order Your Perfect Meal!
        </p>
      </div>
      <div className="mx-44 p-12 pb-20 pt-0">
        <div>
          <MenuProvider dbMenu={Menu}>
            {menuKeys.map((item, idx) => (
              <MenuTemplate showzqt={idx == 0} key={nanoid()} name={item} />
            ))}
          </MenuProvider>
        </div>
      </div>
    </main>
  );
}
