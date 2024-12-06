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
import { and, eq, gt, like, ne, sql } from "drizzle-orm";
import { v4 as uuid } from "uuid";
import { ProductWithVariants } from "menu";
import { cateringFormSchema } from "@/app/catering/_components/catering-form-modal";
export const menuTypeEnum = z.enum(["cheap", "standard", "expensive"]);
export const sampleMenuRouter = createTRPCRouter({
  getMenus: publicProcedure.query(async () => {
    const menus = await db
      .select()
      .from(menuSamples)
      .where(ne(menuSamples.name, "მთავარი მენიუ"));
    return menus;
  }),
  getMenuProducts: publicProcedure
    .input(
      z.object({
        type: z.enum(["cheap", "standard", "expensive"]),
        personRange: z.number(),
        assistance: z.enum(["კი", "არა"]),
        plates: z.enum(["ერთჯერადი", "ფაიფურის"]),
        drinks: z
          .array(z.string())
          .refine((value) => value.some((item) => item), {
            message: "You have to select at least one item.",
          }),
        menuId: z.string().uuid(),
        menuName: z.string(),
      }),
    )
    .query(
      async ({ input: { menuId, type: menuType, personRange, menuName } }) => {
        const productsWithVariants = await db.execute(
          sql<{ data: ProductWithVariants }>`
 select
  p.id,
  p.name,
  p.price,
  pts.quantity,
  pts.qgrowth_factor,
  coalesce(
    array_agg(
      jsonb_build_object(
        'id',
        pv.id,
        'name',
        pv.name,
        'price',
        pv.price,
        'qgrowth_factor',
        pts.qgrowth_factor,
        'quantity',
        pts.quantity
      )
      order by
        pv.id
    ) filter (
      where
        pv.id is not null
    ),
    '{}'
  ) as "variants"
from
  menu_samples as ms
  left join menu_sample_variants as m on ms.id = m.menu_id
  and m.type = ${menuType}
  and m.person_range = ${personRange}
  left join products_to_samples as pts on pts.menu_id = m.id
  left join product as p on p.id = pts.product_id
  left join lateral (
    select
      pv.id,
      pv.name,
      pv.price
    from
      product pv
      join products_to_variants ptv on pv.id = ptv.product_id
    where
      ptv.variant_id = (
        select
          ptv2.variant_id from
          products_to_variants as ptv2
        where
          ptv2.product_id = p.id
        limit
          1 -- Ensure only one row is returned
      )
      and pv.id != p.id -- Exclude the current product
      AND pv.id NOT IN (
        SELECT
          pts2.product_id
        FROM
          products_to_samples AS pts2
        WHERE
          pts2.menu_id = m.id
          -- Ensure we are filtering based on the same menu_id
      )
  ) pv on true -- Join using LATERAL subquery

where
  ms.id = ${menuId}
    -- Filter out products that are themselves variants in this menu
group by
  p.id,
  p.name,
  p.price,
  pts.qgrowth_factor,
  pts.quantity; 
  `,
        );
        // console.log({ data: productsWithVariants });
        const new_pr = Math.floor(personRange / 10) * 10;
        const menu = await db
          .select()
          .from(menuSampleVariants)
          .innerJoin(
            menuSamples,
            eq(menuSamples.id, menuSampleVariants.menu_id),
          )
          .where(
            and(
              eq(menuSampleVariants.menu_id, menuId),
              eq(menuSampleVariants.person_range, new_pr),
              eq(menuSampleVariants.type, menuType),
            ),
          );
        if (!menu[0]) throw new Error("Menu not found");

        const nextPersonRange = await db
          .select()
          .from(menuSampleVariants)
          .where(
            and(
              eq(menuSampleVariants.menu_id, menuId),
              eq(menuSampleVariants.type, menuType),
              gt(menuSampleVariants.person_range, personRange),
            ),
          )
          .limit(1);
        return {
          data: {
            [menuName]:
              productsWithVariants as unknown as ProductWithVariants[],
          },
          nextPersonRange: nextPersonRange?.[0]?.person_range ?? undefined,
        };
      },
    ),
  getMainMenu: publicProcedure.query(async () => {
    const mainMenu = await db
      .select()
      .from(menuSamples)
      .where(eq(menuSamples.name, "მთავარი მენიუ"));
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
