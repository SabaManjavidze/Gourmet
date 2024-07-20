import { MenuProduct } from "@/app/menu/_components/menu-product";

const Menu = {
  "Main Course": [
    { name: "khachapuri", price: 3.0 },
    { name: "megruli khachapuri", price: 3.0 },
    { name: "khachapuri with sulguni", price: 4.0 },
    { name: "Khachapuri with 4 Cheess", price: 2.8 },
    { name: "Chakhrakina", price: 2.8 },
    { name: "Mini Adjaruni", price: 4.5 },
    { name: "Potato Pie", price: 1.5 },
    { name: "French Meat Pie", price: 3.5 },
    { name: "Meat Pie", price: 2.5 },
    { name: "Chicken Pie", price: 2.5 },
    { name: "Bean Pie", price: 1.8 },
    { name: "Tarragon Pie (Seasonal)", price: 3.0 },
    { name: "Mushroom Pie", price: 3.0 },
  ],

  "Corporate Catering": [
    { name: "canapé chicken", price: 3.0 },
    { name: "canapé Ibiza", price: 3.0 },
    { name: "canapé New (with beef)", price: 3.5 },
    { name: "Mozzarella balls wrapped in panko", price: 3.5 },
    { name: "canapé With Blue Cheese", price: 3.0 },
    { name: "Canape mushroom caps with Dutch cheese", price: 2.8 },
    { name: "Canape with chicken in puff pastry", price: 2.8 },
    { name: "canapé With Curd and Mint", price: 7.0 },
    { name: "canapé With Salami", price: 5.0 },
    { name: "canapé With Smoked Salmon", price: 3.0 },
    { name: "canapé With Smoked Salmon", price: 5.0 },
    { name: "canapé With Caviar", price: 5.0 },
    { name: "Royal shrimp with sweet spicy sauce", price: 6.0 },
    { name: "Caesar Salad", price: 5.0 },
  ],
  Salads: [
    { name: "eggplant/ Aubergine with walnuts", price: 3.0 },
    { name: "Assorted pkhali on mchadi", price: 3.0 },
    { name: "Brocolli salad", price: 3.0 },
    { name: "Mushrooms with nuts", price: 3.5 },
  ],
  "Canape/Salads": [
    { name: "Bruschetta with ham and Dutch cheese", price: 3.0 },
    { name: "Bruschetta", price: 3.0 },
    { name: "Bruschetta Guacamole", price: 4.0 },
    { name: "Kish", price: 3.0 },
    { name: "mini pizza", price: 2.5 },
    { name: "Mini pizza with Pepperoni ", price: 3.5 },
    { name: "Mini burger with beef ", price: 3.5 },
    { name: "Mini burget with chicken", price: 3.0 },
    { name: "Mini burger with vegetables", price: 2.5 },
    { name: "Barbecue pork", price: 3.0 },
    { name: "Barbecue vegetables", price: 5.0 },
    { name: "Mini kebab on sticks", price: 3.5 },
    { name: "Beef balls in filo dough", price: 3.5 },
    { name: "chicken balls", price: 3.0 },
    { name: "Pancakes with meat", price: 2.0 },
    { name: "Potato balls with cheese", price: 3.0 },
    { name: "Mexican potato", price: 3.5 },
  ],
  Meats: [
    { name: "meat assortment", price: 6.0 },
    { name: "Assorted old Georgian cheese", price: 6.0 },
    { name: "Assorted sausages", price: 5.0 },
    { name: "Assorted nuts", price: 5.0 },
    { name: "Assorted fruits", price: 4.0 },
    { name: "Fakhita chicken", price: 10.0 },
    { name: "chicken fillet in creamy sauce", price: 10.0 },
    { name: "Bistroganov", price: 10.0 },
    { name: "ragu", price: 10.0 },
    { name: "Calf ribs with ajik bitter", price: 10.0 },
    { name: "Beshel with Dutch cheese", price: 10.0 },
    { name: "Beef skewer in sweet-spicy sauce", price: 10.0 },
    {
      name: "Chicken fillet in a sweet-spicy (sauce is less spicy)",
      price: 10.0,
    },
    { name: "Vegetables", price: 8.0 },
    { name: "french caramel cake", price: 3.0 },
    { name: "cake", price: 2.0 },
    { name: "lent cake", price: 2.0 },
    { name: "Croissant chocolate", price: 2.0 },
    { name: "mini tart fruit", price: 3.0 },
    { name: "fasting tart with apples and nuts ", price: 3.5 },
    { name: "mini tart fruit fasting", price: 3.0 },
    { name: "mini tart with chocolate", price: 3.0 },
    { name: "mini tart with chocolate", price: 3.5 },
    { name: "mini shu", price: 2.0 },
    { name: "mini eclair", price: 2.0 },
    { name: "roll with berries", price: 2.0 },
    { name: "croissant with jam", price: 2.0 },
    { name: "panacote in shades", price: 4.5 },
    { name: "a glass of tiramisu", price: 3.5 },
    { name: "cheese cake", price: 3.0 },
    { name: "mini iris", price: 2.0 },
    { name: "macaroni with chocolate", price: 2.5 },
    { name: "truffles", price: 1.5 },
    { name: "chocolate bars with walnuts and raisins", price: 1.5 },
    { name: "muffins", price: 1.5 },
    { name: "honey cake", price: 3.0 },
  ],
  Drinks: [
    { name: "red wine", price: 17.0 },
    { name: "white wine", price: 17.0 },
    { name: "Juice", price: 10.0 },
    { name: "Coffee", price: 3.5 },
    { name: "Tea", price: 2.8 },
    { name: "water", price: 2.0 },
  ],

  Inventory: [
    { name: "table", price: 30.0 },
    { name: "cocktail table", price: 50.0 },
    { name: "flowers for cocktail table decoration", price: 40.0 },
    { name: "porcelain table", price: 5.0 },
    { name: "services", price: 150.0 },
  ],

  "Coffee Break": [
    { name: "Croissant", price: 2.2 },
    { name: "Croissant chocolate", price: 2.5 },
    { name: "Croissant with vanilla", price: 2.5 },
    { name: "croissant with jam", price: 2.5 },
    { name: "croissant almond cream", price: 4.0 },
    { name: "croissant with ham and Cheese", price: 4.5 },
    { name: "mini cookie berry", price: 2.5 },
    { name: "mini danish with chocolate bars", price: 2.5 },
    { name: "Bruschetta prosciutto", price: 4.0 },
    { name: "mini danish vanilla cream and ice-cream", price: 30.0 },
    { name: "mini ogane", price: 2.5 },
    { name: "Mini cookie with strawberries (seasonal)", price: 2.5 },
    { name: "chocolate cookies", price: 2.0 },
    { name: "American biscuits", price: 2.0 },
    { name: "fasting cookies", price: 2.0 },
    { name: "caramel cookies", price: 2.0 },
    { name: "muffin with chocolate", price: 2.0 },
    { name: "muffin with cherries", price: 2.0 },
    { name: "muffin fasting", price: 2.0 },
    { name: "truffles", price: 2.0 },
    { name: "macaroni", price: 3.5 },
    { name: "french cake", price: 2.5 },
    { name: "fasting cake brownie", price: 2.0 },
    { name: "funeral cake with fruit", price: 2.0 },
    { name: "iris cake", price: 2.0 },
    { name: "mini shu", price: 2.0 },
    { name: "mini shu caramel", price: 2.5 },
    { name: "mini eclair", price: 2.0 },
    { name: "mini eclair with nuts", price: 3.0 },
    { name: "tart with fruits", price: 3.5 },
    { name: "tart chocolate fasting", price: 3.0 },
    { name: "fasting tart with apples and nuts", price: 3.5 },
    { name: "assorted Fruits", price: 3.5 },
    { name: "milk", price: 10.0 },
    { name: "coffee", price: 3.5 },
    { name: "tea", price: 2.8 },
    { name: "cream", price: 8.0 },
    { name: "compote", price: 8.0 },
    { name: "juice santali", price: 8.0 },
    { name: "water 0.5l", price: 2.0 },
    { name: "mineral water 0.5l", price: 2.0 },
    { name: "table", price: 25.0 },
    { name: "cardboard cup", price: 1.5 },
    { name: "disposable tableware", price: 3.5 },
    { name: "porcelain tableware", price: 4.0 },
    { name: "services", price: 150.0 },
    { name: "cocktail table", price: 50.0 },
  ],
};
export const sampleMenus = [
  {
    name: "Coffee Break",
    src: "/imgs/coffee-break.jpg",
  },
  {
    name: "Drinks",
    src: "/imgs/drinks.jpg",
  },
  {
    name: "Corporate Catering",
    src: "/imgs/corporate-catering.jpg",
  },
] as const;
export const menuKeys = Object.keys(Menu) as unknown as Array<
  keyof typeof Menu
>;
export type Menu = {
  [key in keyof typeof Menu]?: MenuProduct[];
};
export type MenuState = {
  [key: string]: productState[];
};
export type menuKey = keyof typeof Menu;

export type productState = MenuProduct & {
  totalPrice: number;
  quantity: number;
  active?: string;
};

export interface productsState {
  [productId: string]: MenuProduct & { totalPrice: number; quantity: number };
}
export type MenuProduct = {
  id: string;
  name: string;
  price: number;
  variants?: MenuProduct[];
};
