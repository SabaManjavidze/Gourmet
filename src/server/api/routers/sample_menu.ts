import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "@/server/api/trpc";
import {
  menuSamples,
  menuSampleVariants,
  orders,
  products,
  productsToMainMenu,
  productstoOrders,
  productsToSamples,
  productsToVariants,
  variants,
} from "@/server/db/schema";
import { db } from "@/server/db";
import { and, eq, gt, like, ne } from "drizzle-orm";
import { v4 as uuid } from "uuid";
import { ProductWithVariants } from "menu";
export const menuTypeEnum = z.enum(["cheap", "standard", "expensive"]);
export const sampleMenuRouter = createTRPCRouter({
  getMenus: publicProcedure.query(async () => {
    const menus = await db
      .select()
      .from(menuSamples)
      .where(ne(menuSamples.name, "Main Menu"));
    return menus;
  }),
  getMenuProducts: publicProcedure
    .input(
      z.object({
        menuId: z.string().uuid(),
        menuType: menuTypeEnum,
        personRange: z.number(),
      }),
    )
    .query(async ({ input }) => {
      // get menu from sample_menus
      const new_pr = Math.floor(input.personRange / 10) * 10;
      const menu = await db
        .select()
        .from(menuSampleVariants)
        .innerJoin(menuSamples, eq(menuSamples.id, menuSampleVariants.menu_id))
        .where(
          and(
            eq(menuSampleVariants.menu_id, input.menuId),
            eq(menuSampleVariants.person_range, new_pr),
            eq(menuSampleVariants.type, input.menuType),
          ),
        );
      if (!menu[0]) throw new Error("Menu not found");

      const pts = await db
        .select()
        .from(productsToSamples)
        .innerJoin(products, eq(products.id, productsToSamples.productId))
        .where(eq(productsToSamples.menuId, menu[0].menu_sample_variants.id));

      const variant_map = {} as Record<string, string>;

      const categoryName = menu[0]?.menu_samples.name;
      if (!categoryName) throw new Error("Category not found");
      const formatedData: Record<string, ProductWithVariants[]> = {
        [categoryName]: [],
      };
      const sample = formatedData[categoryName] as ProductWithVariants[];
      for (const item of pts) {
        // const variantName = item?.products_to_samples?.variant_name;
        // const in_vars = variantName ? variant_map[variantName] : undefined;
        // if (!variantName || in_vars === undefined) {
        sample.push({
          id: item.product.id,
          name: item.product.name,
          price: parseFloat(item.product.price),
          quantity: item.products_to_samples.quantity,
          qgroth_factor: item.products_to_samples.qgrowth_factor,
          variants: [],
        });
        // }

        // if (variantName) {
        //   if (in_vars === undefined) {
        //     variant_map[variantName] = item.product.id;
        //     continue;
        //   }
        //   for (const defVar of sample) {
        //     if (defVar.id === variant_map[variantName]) {
        //       if (!defVar.variant_name) {
        //         defVar.variant_name = variantName;
        //       }
        //       defVar.variants?.push({
        //         id: item.product.id,
        //         name: item.product.name,
        //         price: parseFloat(item.product.price),
        //         qgroth_factor: item.products_to_samples.qgrowth_factor,
        //         quantity: item.products_to_samples.quantity,
        //       });
        //       break;
        //     }
        //   }
        // }
      }
      const nextPersonRange = await db
        .select()
        .from(menuSampleVariants)
        .where(
          and(
            eq(menuSampleVariants.menu_id, input.menuId),
            eq(menuSampleVariants.type, input.menuType),
            gt(menuSampleVariants.person_range, input.personRange),
          ),
        )
        .limit(1);
      return {
        data: formatedData,
        nextPersonRange: nextPersonRange?.[0]?.person_range ?? undefined,
      };
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
      .from(productsToMainMenu)
      .innerJoin(products, eq(products.id, productsToMainMenu.productId));

    const variant_map = {} as Record<string, string>;

    pts.forEach((item) => {
      if (!item) throw new Error("Product not found");
      const categoryName = item?.product?.categoryName;
      const variantName = item?.products_to_main_menu?.variant_name;
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
              quantity: 0,
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
          quantity: 0,
        });
      } else {
        formatedData[categoryName] = [
          {
            id: item.product.id,
            name: item.product.name,
            price: parseFloat(item.product.price),
            variants: [],
            quantity: 0,
          },
        ];
      }
    });
    return formatedData;
  }),
});
