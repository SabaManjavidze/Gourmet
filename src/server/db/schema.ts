import { relations, sql } from "drizzle-orm";
import {
  index,
  integer,
  pgTableCreator,
  primaryKey,
  timestamp,
  varchar,
  decimal,
  date,
  pgEnum,
  text,
  boolean,
  uuid,
} from "drizzle-orm/pg-core";
import { type AdapterAccount } from "next-auth/adapters";

const idtype = (name: string) => uuid(name);

export const createTable = pgTableCreator((name) => `gourmet_${name}`);

export const categories = createTable("category", {
  id: idtype("id").primaryKey(),
  name: varchar("name", { length: 256 }).notNull(),
});
export const categoriesRelationships = relations(categories, ({ many }) => ({
  products: many(products),
}));

export const products = createTable(
  "product",
  {
    id: idtype("id").primaryKey().notNull(),
    name: varchar("name", { length: 256 }).unique().notNull(),
    price: decimal("price").notNull(),
    categoryId: idtype("category_id").references(() => categories.id),
    categoryName: varchar("category_name", { length: 256 }),
  },
  (product) => ({
    categoryIdIdx: index("product_categoryId_idx").on(product.categoryId),
  }),
);
export const variants = createTable("variant", {
  id: idtype("id").primaryKey().notNull(),
  name: varchar("name", { length: 256 }).unique(),
});

export const productsRelations = relations(products, ({ one, many }) => ({
  samples: many(productsToSamples),
  category: one(categories, {
    fields: [products.id],
    references: [categories.id],
  }),
  orders: many(productstoOrders),
}));

export const productsToVariants = createTable(
  "products_to_variants",
  {
    productId: idtype("product_id")
      .notNull()
      .references(() => products.id),
    variantId: idtype("variant_id")
      .notNull()
      .references(() => variants.id),
  },
  (t) => ({
    compoundKey: primaryKey({ columns: [t.productId, t.variantId] }),
  }),
);
export const productsToSamples = createTable(
  "products_to_samples",
  {
    productId: idtype("product_id")
      .notNull()
      .references(() => products.id),
    sampleId: idtype("sample_id")
      .notNull()
      .references(() => menuSamples.id, { onDelete: "cascade" }),
    quantity: integer("quantity").notNull(),
    variant_name: varchar("variant_name", { length: 255 }).references(
      () => variants.name,
    ),
  },
  (t) => ({
    compoundKey: primaryKey({ columns: [t.productId, t.sampleId] }),
  }),
);
export const productsToSamplesRelations = relations(
  productsToSamples,
  ({ one }) => ({
    product: one(products, {
      fields: [productsToSamples.productId],
      references: [products.id],
    }),
    sample: one(menuSamples, {
      fields: [productsToSamples.sampleId],
      references: [menuSamples.id],
    }),
  }),
);

export const menuSamples = createTable("menu_samples", {
  id: idtype("id").primaryKey().notNull(),
  name: varchar("name", { length: 50 }).unique().notNull(),
  picture: varchar("picture", { length: 255 }),
});
export const menuSamplesRelations = relations(menuSamples, ({ many }) => ({
  products: many(productsToSamples),
}));
export const statusEnum = pgEnum("status", ["draft", "submitted", "completed"]);
export const orders = createTable(
  "order",
  {
    id: idtype("id").primaryKey().notNull(),
    name: varchar("name").notNull(),
    totalPrice: decimal("total_price").notNull(),
    status: statusEnum("status").notNull(),
    createdAt: timestamp("created_at").notNull().defaultNow(),
    userId: varchar("userId")
      .references(() => users.id)
      .notNull(),
  },
  (order) => ({
    userIdIdx: index("order_userId_idx").on(order.userId),
  }),
);
export const ordersRelationships = relations(orders, ({ one, many }) => ({
  user: one(users, { fields: [orders.userId], references: [users.id] }),
  products: many(productstoOrders),
}));
export const productstoOrders = createTable(
  "order_product",
  {
    productId: idtype("product_id")
      .notNull()
      .references(() => products.id),
    orderId: idtype("order_id")
      .notNull()
      .references(() => orders.id, { onDelete: "cascade" }),
    quantity: integer("quantity").notNull(),
    variant_name: varchar("variant_name", { length: 255 }).references(
      () => variants.name,
    ),
  },
  (pto) => ({
    compoundKey: primaryKey({
      columns: [pto.productId, pto.orderId],
    }),
  }),
);
export const roleEnum = pgEnum("role", ["user", "admin"]);
export const users = createTable("user", {
  id: varchar("id", { length: 255 }).notNull().primaryKey(),
  name: varchar("name", { length: 255 }),
  role: roleEnum("role").default("user"),
  email: varchar("email", { length: 255 }).notNull(),
  emailVerified: timestamp("emailVerified", {
    mode: "date",
  }).default(sql`CURRENT_TIMESTAMP`),
  image: varchar("image", { length: 255 }),
});

export const usersRelations = relations(users, ({ many }) => ({
  accounts: many(accounts),
  orders: many(orders),
}));

export const accounts = createTable(
  "account",
  {
    userId: varchar("userId", { length: 255 })
      .notNull()
      .references(() => users.id),
    type: varchar("type", { length: 255 })
      .$type<AdapterAccount["type"]>()
      .notNull(),
    provider: varchar("provider", { length: 255 }).notNull(),
    providerAccountId: varchar("providerAccountId", { length: 255 }).notNull(),
    refresh_token: text("refresh_token"),
    access_token: text("access_token"),
    expires_at: integer("expires_at"),
    token_type: varchar("token_type", { length: 255 }),
    scope: varchar("scope", { length: 255 }),
    id_token: text("id_token"),
    session_state: varchar("session_state", { length: 255 }),
  },
  (account) => ({
    compoundKey: primaryKey({
      columns: [account.provider, account.providerAccountId],
    }),
    userIdIdx: index("account_userId_idx").on(account.userId),
  }),
);

export const accountsRelations = relations(accounts, ({ one }) => ({
  user: one(users, { fields: [accounts.userId], references: [users.id] }),
}));

export const sessions = createTable(
  "session",
  {
    sessionToken: varchar("sessionToken", { length: 255 })
      .notNull()
      .primaryKey(),
    userId: varchar("userId", { length: 255 })
      .notNull()
      .references(() => users.id),
    expires: timestamp("expires", { mode: "date" }).notNull(),
  },
  (session) => ({
    userIdIdx: index("session_userId_idx").on(session.userId),
  }),
);

export const sessionsRelations = relations(sessions, ({ one }) => ({
  user: one(users, { fields: [sessions.userId], references: [users.id] }),
}));

export const verificationTokens = createTable(
  "verificationToken",
  {
    identifier: varchar("identifier", { length: 255 }).notNull(),
    token: varchar("token", { length: 255 }).notNull(),
    expires: timestamp("expires", { mode: "date" }).notNull(),
  },
  (vt) => ({
    compoundKey: primaryKey({ columns: [vt.identifier, vt.token] }),
  }),
);
