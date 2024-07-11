import { db } from "@/server/db/script-db";
import {
  categories,
  menuSamples,
  products,
  productsToSamples,
  productsToVariants,
  variants,
} from "@/server/db/schema";
import { v4 as uuid } from "uuid";
import { eq } from "drizzle-orm";
import { pds, product_cats, product_vars, sample_menus } from "./data";

async function populateProducts() {
  console.log("generating...");
  const entries = Object.entries(pds);
  for (const [name, price] of entries) {
    console.log({ name, price });
    try {
      const prod = {
        name,
        price: price.toString(),
        categoryId: "7ee8d909-ceb3-473a-848d-6c07e1eddddf",
        id: uuid(),
      };
      console.log(prod);
      await db.insert(products).values(prod);
    } catch (error) {
      if (String(error).includes("unique constraint")) {
        const existing_prod = await db
          .select()
          .from(products)
          .where(eq(products.name, name));
        if (!existing_prod?.[0]) {
          throw new Error("cound't find the product");
        }
        if (!existing_prod[0].categoryName) {
          const category = await db
            .select()
            .from(categories)
            .where(eq(categories.id, existing_prod[0]?.categoryId as string));
          if (!category?.[0]) throw new Error("cound't find category");
          await db
            .update(products)
            .set({
              name,
              price: price.toString(),
              categoryName: category[0].name,
            })
            .where(eq(products.name, name));
          continue;
        }
        await db
          .update(products)
          .set({ name, price: price.toString() })
          .where(eq(products.name, name));
      }
    }
  }
  return;
}

async function populateSampleMenus() {
  console.log("menus");
}
async function populateMainMenu() {
  console.log("generating...");
  if (!sample_menus?.[0])
    throw new Error("sample menus are not properly filled");
  const prods = sample_menus[0].products;
  let mainmenu = await db
    .select()
    .from(menuSamples)
    .where(eq(menuSamples.name, sample_menus[0].name));
  if (!mainmenu?.[0]) {
    mainmenu = await db
      .insert(menuSamples)
      .values({
        id: uuid(),
        name: sample_menus[0].name,
        picture: "",
      })
      .returning();
  }
  for (const prod_name of prods) {
    const db_prod = await db
      .select()
      .from(products)
      .where(eq(products.name, prod_name.name));
    if (!db_prod?.[0]) throw new Error("couldn't find product");
    if (!mainmenu?.[0]) throw new Error("main menu from db is null");
    const pts = {
      productId: db_prod[0].id,
      sampleId: mainmenu[0].id,
      quantity: 0,
      variant_name: prod_name?.variant_name,
    };
    console.log(pts);
    await db.insert(productsToSamples).values(pts);
  }
}
async function populateProductCategories() {
  console.log("generating...");
  const cats = Object.keys(product_cats) as (keyof typeof product_cats)[];
  for (const name of cats) {
    let db_cat = await db
      .select()
      .from(categories)
      .where(eq(categories.name, name));

    console.table(`found category: ${JSON.stringify(db_cat[0], null, 2)}`);
    if (!db_cat?.[0]) {
      const new_cat = await db
        .insert(categories)
        .values({
          id: uuid(),
          name,
        })
        .returning();
      db_cat = new_cat;
    }
    if (!db_cat?.[0])
      throw new Error("There was a problem with making a new category");
    for (const product of product_cats[name]) {
      const db_prod = await db
        .select()
        .from(products)
        .where(eq(products.name, product));
      console.table(
        `searching product: ${product} --- found product: ${JSON.stringify(db_prod[0], null, 2)}`,
      );
      if (!db_prod?.[0]) throw new Error("could not find a product");
      try {
        await db
          .update(products)
          .set({
            categoryId: db_cat[0].id,
          })
          .where(eq(products.id, db_prod[0].id));
      } catch (err) {
        continue;
      }
    }
  }
  return;
}
async function populateProductVariants() {
  console.log("generating...");
  const vars = Object.keys(product_vars) as (keyof typeof product_vars)[];
  for (const name of vars) {
    let db_var = await db
      .select()
      .from(variants)
      .where(eq(variants.name, name));
    console.table(`found variant: ${JSON.stringify(db_var[0], null, 2)}`);
    if (!db_var?.[0]) {
      const new_var = await db
        .insert(variants)
        .values({
          id: uuid(),
          name,
        })
        .returning();
      db_var = new_var;
    }
    if (!db_var?.[0])
      throw new Error("There was a problem with making a new variant");
    for (const product of product_vars[name]) {
      const db_prod = await db
        .select()
        .from(products)
        .where(eq(products.name, product));
      console.table(
        `searching product: ${product} --- found product: ${JSON.stringify(db_prod[0], null, 2)}`,
      );
      if (!db_prod?.[0]) throw new Error("could not find a product");
      try {
        await db.insert(productsToVariants).values({
          variantId: db_var[0].id,
          productId: db_prod[0].id,
        });
      } catch (err) {
        continue;
      }
    }
  }
  return;
}
async function populateVariants() {
  console.log("generating...");
  const vars = Object.keys(product_vars);
  for (const name of vars) {
    try {
      const variant = {
        id: uuid(),
        name,
      };
      await db.insert(variants).values(variant);
    } catch (error) {
      console.log({ error });
    }
  }
  return;
}
// await populateProducts();
//await populateVariants();
//await populateProductVariants();
// await populateProductCategories();
await populateMainMenu();
process.exit();
