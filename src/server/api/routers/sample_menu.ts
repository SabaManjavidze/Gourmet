import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "@/server/api/trpc";
import {
  menuSamples,
  orders,
  products,
  productstoOrders,
  productsToSamples,
  productsToVariants,
  variants,
} from "@/server/db/schema";
import { db } from "@/server/db";
import { eq, like } from "drizzle-orm";
import { v4 as uuid } from "uuid";
import { ProductWithVariants } from "menu";

export const sampleMenuRouter = createTRPCRouter({
  getMenus: publicProcedure.query(async () => {
    const menus = await db.select().from(menuSamples);
    return menus;
  }),
  getMenuProducts: publicProcedure
    .input(z.object({ menuName: z.string() }))
    .query(async ({ input }) => {
      // get menu from sample_menus
      const menu = await db
        .select()
        .from(menuSamples)
        .where(eq(menuSamples.name, input.menuName));
      if (!menu[0]) throw new Error("Menu not found");

      const pts = await db
        .select()
        .from(productsToSamples)
        .innerJoin(products, eq(products.id, productsToSamples.productId))
        .where(eq(productsToSamples.sampleId, menu[0].id));

      const variant_map = {} as Record<string, string>;

      const categoryName = menu[0]?.name;
      if (!categoryName) throw new Error("Category not found");
      const formatedData: Record<string, ProductWithVariants[]> = {
        [categoryName]: [],
      };
      const sample = formatedData[categoryName] as ProductWithVariants[];
      for (const item of pts) {
        const variantName = item?.products_to_samples?.variant_name;
        const formatedProd: ProductWithVariants = {
          id: item.product.id,
          name: item.product.name,
          price: parseFloat(item.product.price),
        };
        const in_vars = variantName ? variant_map[variantName] : undefined;
        if (!variantName || in_vars === undefined) {
          sample.push({
            id: item.product.id,
            name: item.product.name,
            price: parseFloat(item.product.price),
            variants: [],
          });
        }

        if (variantName) {
          if (in_vars === undefined) {
            variant_map[variantName] = item.product.id;
            continue;
          }
          for (const defVar of sample) {
            if (defVar.id === variant_map[variantName]) {
              if (!defVar.variant_name) {
                defVar.variant_name = variantName;
              }
              defVar.variants?.push({
                id: item.product.id,
                name: item.product.name,
                price: parseFloat(item.product.price),
              });
              break;
            }
          }
          continue;
        }
      }
      return formatedData;
    }),
  getMainMenu: publicProcedure.query(async () => {
    const mainMenu = await db
      .select()
      .from(menuSamples)
      .where(eq(menuSamples.name, "Main Menu"));
    if (!mainMenu[0]) throw new Error("Main Menu not found");

    const formatedData: Record<string, ProductWithVariants[]> = {};
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
