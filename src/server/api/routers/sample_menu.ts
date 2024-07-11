import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "@/server/api/trpc";
import { menuSamples, products, productsToSamples } from "@/server/db/schema";
import { db } from "@/server/db";
import { eq, like } from "drizzle-orm";
interface Product {
  id: string;
  name: string;
  price: number;
  variants?: Product[];
}
export const sampleMenuRouter = createTRPCRouter({
  getMainMenu: publicProcedure.query(async () => {
    const mainMenu = await db
      .select()
      .from(menuSamples)
      .where(eq(menuSamples.name, "Main Menu"));
    if (!mainMenu[0]) throw new Error("Main Menu not found");

    const formatedData: Record<string, Product[]> = {};
    const pts = await db
      .select()
      .from(productsToSamples)
      .innerJoin(products, eq(products.id, productsToSamples.productId))
      .where(eq(productsToSamples.sampleId, mainMenu[0].id));

    const variant_map = {} as Record<string, string>;

    pts.forEach((item) => {
      if (!item) throw new Error("Product not found");
      const categoryName = item?.product?.categoryName;
      const variantName = item?.products_to_samples?.variant_name;
      if (!categoryName) throw new Error("Category not found");

      const sample = formatedData[categoryName];
      if (sample !== undefined && variantName && !variant_map[variantName]) {
        variant_map[variantName] = item.product.id;
      } else if (
        sample !== undefined &&
        variantName &&
        variant_map[variantName]
      ) {
        for (const defVar of sample) {
          if (!defVar) throw new Error("Product not found");
          if (defVar.id === variant_map[variantName]) {
            defVar?.variants?.push({
              id: item.product.id,
              name: item.product.name,
              price: parseFloat(item.product.price),
            });
            break;
          }
        }
        return;
      }

      if (sample !== undefined) {
        sample.push({
          id: item.product.id,
          name: item.product.name,
          price: parseFloat(item.product.price),
          variants: [],
        });
      } else {
        formatedData[categoryName] = [
          {
            id: item.product.id,
            name: item.product.name,
            price: parseFloat(item.product.price),
            variants: [],
          },
        ];
      }
    });
    return formatedData;
  }),
});
