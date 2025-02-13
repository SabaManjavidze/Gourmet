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
import { and, eq, gt, ne, sql } from "drizzle-orm";
import { v4 as uuid } from "uuid";
import { ProductWithVariants } from "menu";
import { cateringFormSchema } from "@/app/catering/_components/catering-form-modal";
import { product_with_variants_query } from "@/lib/utils";
export const menuTypeEnum = z.enum(["cheap", "standard", "expensive"]);
// refactor product with variants query function
// and use it for getting drink and plate
export const getProductWithVariants = async (productName: string) => {
  const result = (await db.execute(
    sql<{
      data: ProductWithVariants;
    }>`
  SELECT
  p.id,
  p.name,
  p.price,
  COALESCE(
    ARRAY_AGG(
      JSONB_BUILD_OBJECT(
        'id', pv.id,
        'name', pv.name,
        'price', pv.price
      )
      ORDER BY pv.id
    ) FILTER (
      WHERE pv.id IS NOT NULL
    ),
    '{}'
  ) AS "variants"
FROM
  product p
LEFT JOIN LATERAL (
  SELECT
    pv.id,
    pv.name,
    pv.price
  FROM
    product pv
    JOIN products_to_variants ptv ON pv.id = ptv.product_id
  WHERE
    ptv.variant_id = (
      SELECT
        ptv2.variant_id
      FROM
        products_to_variants ptv2
      WHERE
        ptv2.product_id = p.id
      LIMIT 1 -- Ensure only one row is returned
    )
    AND pv.id != p.id -- Exclude the product itself
) pv ON TRUE -- Join using LATERAL subquery
WHERE
  p.name = ${productName}
GROUP BY
  p.id,
  p.name,
  p.price`,
  )) as unknown as ProductWithVariants[];
  return result;
};

export const checkPlates = async (
  item: ProductWithVariants,
  plateType: string,
) => {
  const db_plate = await getProductWithVariants(`${plateType} ჭურჭელი`);
  console.log({ variants: db_plate[0]?.variants });
  if (!db_plate[0]) throw new Error("Plate not found.");
  const in_var = item.variants?.find((variant) => {
    if (!db_plate[0]) throw new Error("Plate not found.");
    if (variant.name == db_plate[0].name) {
      return variant;
    }
  });

  // if (in_var) {
  //   const id = in_var.id;
  //   const name = in_var.name;
  //   in_var.name = item.name;
  //   in_var.id = item.id;
  //   item.name = name;
  //   item.id = id;
  //   item.name = db_plate[0].name;
  //   item.id = db_plate[0].id;
  //   item.variants = db_plate[0].variants;
  // } else {
  return {
    ...db_plate[0],
    price: Number(db_plate[0].price),
  };
  // }
  // return true;
};
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
        plates: z.enum(["ერთჯერადი", "ფაიფურის", "ჭურჭლის გარეშე"]),
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
      async ({
        input: {
          menuId,
          type: menuType,
          personRange,
          menuName,
          assistance,
          drinks,
          plates,
        },
      }) => {
        let productsWithVariants = (await db.execute(
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
        )) as unknown as ProductWithVariants[];
        const new_pr = Math.floor(personRange / 10) * 10 + 10;

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
        // add assistance
        const ass_in_prods = productsWithVariants.find(
          (item) => item.name == "მომსახურება",
        );
        if (assistance == "კი" && !ass_in_prods) {
          const assistance_prod = await db
            .select()
            .from(products)
            .where(eq(products.name, "მომსახურება"))
            .limit(1);
          if (!assistance_prod[0]) throw new Error("Assistance not found.");
          productsWithVariants.push({
            ...assistance_prod[0],
            price: Number(assistance_prod[0].price),
            quantity: 1,
          });
        }
        //add plates
        const plate_in_prods = productsWithVariants.find((item) =>
          item?.name?.endsWith?.("ჭურჭელი"),
        );
        if (plates !== "ჭურჭლის გარეშე") {
          if (!plate_in_prods) {
            const plates_prod = await getProductWithVariants(
              `${plates} ჭურჭელი`,
            );
            if (!plates_prod[0]) throw new Error("Plates not found.");
            productsWithVariants.push({
              ...plates_prod[0],
              price: Number(plates_prod[0].price),
              quantity: personRange,
            });
          }
        }
        //add drinks
        if (drinks[0] !== "არ მსურს სასმელი") {
          for (const drink of drinks) {
            const drink_prod = await getProductWithVariants(drink);
            if (!drink_prod[0]) throw new Error("Drink not found.");
            let was_in_menu = false;
            productsWithVariants.forEach((item) => {
              if (!drink_prod[0]) throw new Error("Drink not found.");
              if (item.name !== drink && item.variants) {
                const in_var = item.variants?.find((variant) => {
                  if (variant.name == drink) {
                    if (drink.startsWith("ყავის") && item.name == "ყავა") {
                      return variant;
                    } else if (!drink.startsWith("ყავის")) {
                      return variant;
                    }
                  }
                });
                if (in_var) {
                  was_in_menu = true;
                  const id = in_var.id;
                  const name = in_var.name;
                  in_var.name = item.name;
                  in_var.id = item.id;
                  item.name = name;
                  item.id = id;
                }
              } else if (item.name == drink) {
                was_in_menu = true;
              }
            });
            if (!was_in_menu) {
              productsWithVariants.push({
                ...drink_prod[0],
                price: Number(drink_prod[0].price),
                quantity:
                  drink_prod[0].name == "ნატურალური წვენი"
                    ? Math.round(personRange / 2)
                    : personRange,
              });
            }
          }
        }
        (productsWithVariants as any) = productsWithVariants.filter((item) => {
          if (!item.id) return false;
          if (plates == "ჭურჭლის გარეშე" && item.name.endsWith("ჭურჭელი")) {
            return false;
          }
          if (
            ass_in_prods &&
            assistance == "არა" &&
            item.name == "მომსახურება"
          ) {
            return false;
          }
          if (
            item.name == plate_in_prods?.name &&
            plate_in_prods?.name !== plates
          ) {
            checkPlates(item, plates).then((res) => {
              console.log({ res });
              productsWithVariants.push({ ...res, quantity: item.quantity });
            });
            return false;
          }
          return true;
        });

        const nextPersonRange = await db
          .select()
          .from(menuSampleVariants)
          .where(
            and(
              eq(menuSampleVariants.menu_id, menuId),
              eq(menuSampleVariants.type, menuType),
              eq(menuSampleVariants.person_range, new_pr),
            ),
          )
          .limit(1);
        return {
          data: {
            [menuName]: productsWithVariants,
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
