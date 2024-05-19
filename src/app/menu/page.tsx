import { Menu, menuKeys } from "menu";
import { MenuTemplate } from "./_components/menu-template";
import { nanoid } from "nanoid";
import { MenuProvider } from "@/hooks/useMenu";

export default function MenuPage() {
  return (
    <main>
      <div className="flex h-[500px] items-center justify-center bg-menu-banner bg-cover bg-center bg-no-repeat">
        <h1 className="text-shadow font-lucida-bold text-8xl">Menu</h1>
      </div>
      <div className="mx-44 mt-24 p-12 pb-20">
        <div className="mt-12">
          <MenuProvider dbMenu={Menu}>
            {menuKeys.map((item) => (
              <MenuTemplate key={nanoid()} name={item} />
            ))}
          </MenuProvider>
        </div>
      </div>
    </main>
  );
}
