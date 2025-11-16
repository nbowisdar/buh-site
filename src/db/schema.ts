import { integer, pgTable, serial, text, timestamp } from "drizzle-orm/pg-core"

export const comments = pgTable("comments", {
	id: serial("id").primaryKey(),
	name: text().notNull(),
	company: text(),
	rating: integer().notNull().default(5),
	createdAt: timestamp("created_at").defaultNow(),
	text: text(),
	userId: text("user_id").notNull(),
})

export const price = pgTable("price", {
	id: serial("id").primaryKey(),
	title: text().notNull(),
	comment: text(),
})

export const priceRow = pgTable("price_row", {
	id: serial("id").primaryKey(),
	name: text().notNull(),
	price: text().notNull(),
	priceId: integer("price_id").references(() => price.id, { onDelete: "cascade" }),
})

// Types for comments
export type CommentInsert = typeof comments.$inferInsert
export type Comment = typeof comments.$inferSelect

// Types for price
export type PriceInsert = typeof price.$inferInsert
export type Price = typeof price.$inferSelect

// Types for priceRow
export type PriceRowInsert = typeof priceRow.$inferInsert
export type PriceRow = typeof priceRow.$inferSelect
