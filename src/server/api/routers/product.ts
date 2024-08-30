import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "@/server/api/trpc";
import { products, productsToVariants, variants } from "@/server/db/schema";
import { db } from "@/server/db";
import { and, eq, like } from "drizzle-orm";
import { Product, ProductWithVariants } from "menu";

export const productRouter = createTRPCRouter({
  getProductVariants: publicProcedure
    .input(
      z.object({
        products: z
          .object({
            id: z.string().uuid(),
            name: z.string(),
            price: z.number(),
          })
          .array(),
      }),
    )
    .mutation(async ({ input: { products } }) => {
      return await injectProductVariants(products);
    }),
  search: publicProcedure
    .input(
      z.object({
        query: z.string().min(2).optional(),
        filter: z.string().min(3).optional(),
      }),
    )
    .mutation(async ({ input: { query, filter } }) => {
      if (!query && !filter) return [];
      const results = await db
        .select()
        .from(products)
        .limit(!query && filter ? 10 : 0)
        .where(
          and(
            query ? like(products.name, `%${query}%`) : undefined,
            filter ? eq(products.categoryName, filter) : undefined,
          ),
        );
      const formatedProds: Product[] = [];
      for (const prod of results) {
        formatedProds.push({
          id: prod.id,
          name: prod.name,
          price: Number(prod.price),
        });
      }
      return formatedProds;
    }),
  // create: protectedProcedure
  //   .input(z.object({ name: z.string().min(1) }))
  //   .mutation(async ({ ctx, input }) => {
  //     // simulate a slow db call
  //     await new Promise((resolve) => setTimeout(resolve, 1000));
  //     await ctx.db.insert(posts).values({
  //       name: input.name,
  //       createdById: ctx.session.user.id,
  //     });
  //   }),
  // getLatest: publicProcedure.query(({ ctx }) => {
  //   return ctx.db.query.posts.findFirst({
  //     orderBy: (posts, { desc }) => [desc(posts.createdAt)],
  //   });
  // }),
  // getSecretMessage: protectedProcedure.query(() => {
  //   return "you can now see this secret message!";
  // }),
});
const injectProductVariants = async (prods: Product[]) => {
  const formatedProds: ProductWithVariants[] = [];
  for (const prod of prods) {
    const newProd: ProductWithVariants = prod;
    const hasVars = await db
      .select()
      .from(productsToVariants)
      .where(eq(productsToVariants.productId, prod.id));
    if (!hasVars?.[0]) {
      formatedProds.push(newProd);
      continue;
    }
    const prodVariants = await db
      .select()
      .from(productsToVariants)
      .innerJoin(products, eq(products.id, productsToVariants.productId))
      .where(eq(productsToVariants.variantId, hasVars[0].variantId));
    if (prodVariants.length > 0) {
      newProd.variants = [];
      for (const p of prodVariants) {
        if (p.product.id == prod.id) continue;
        newProd.variants.push({
          id: p.product.id,
          name: p.product.name,
          price: Number(p.product.price),
        });
      }
    }
    formatedProds.push(newProd);
  }
  return formatedProds;
};
