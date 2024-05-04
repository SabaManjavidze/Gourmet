import type { MenuDish } from "menu";
import { nanoid } from "nanoid";

export function MenuDishes({ dishes }: { dishes: MenuDish[] }) {
  return (
    <ul>
      {dishes.map((dish) => (
        <li
          key={nanoid()}
          className="mt-3 flex w-full justify-between font-bold"
        >
          <div className="flex w-2/3 items-center">
            <p className="w-auto whitespace-nowrap text-xl">{dish.name}</p>
            <div className="dotted z-10 ml-8 h-[1px] w-full"></div>
          </div>
          <div className="flex w-1/3 justify-between text-center text-lg *:w-full">
            <p>{dish.price}</p>
            <p>{dish.price}</p>
            <p>{dish.price}</p>
          </div>
        </li>
      ))}
    </ul>
  );
}
