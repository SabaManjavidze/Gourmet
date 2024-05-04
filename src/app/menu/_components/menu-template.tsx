import { MenuDish, menu, menuKeys } from "menu";
import { MenuDishes } from "./menu-dishes";

export function MenuTemplate({ name }: { name: keyof typeof menu }) {
  return (
    <div className="mt-12 flex flex-col justify-center">
      <h3 className="text-center font-lucida-bold text-4xl text-accent-foreground">
        {name}
      </h3>
      <div className="mt-8">
        <MenuDishes dishes={menu[name] as unknown as MenuDish[]} />
      </div>
    </div>
  );
}
