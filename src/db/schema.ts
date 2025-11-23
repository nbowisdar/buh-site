import { boolean, integer, pgTable, serial, text, timestamp } from "drizzle-orm/pg-core"

import { relations } from "drizzle-orm"

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

export const feedbackLinks = pgTable("feedback_links", {
	id: serial("id").primaryKey(),
	token: text().notNull(),
	is_used: boolean().notNull().default(false),
	createdAt: timestamp("created_at").defaultNow(),
})

// Types for feedbackLinks
export type FeedbackLinkInsert = typeof feedbackLinks.$inferInsert
export type FeedbackLink = typeof feedbackLinks.$inferSelect

// Types for comments
export type CommentInsert = typeof comments.$inferInsert
export type Comment = typeof comments.$inferSelect

// Types for price
export type PriceInsert = typeof price.$inferInsert
export type Price = typeof price.$inferSelect

// Types for priceRow
export type PriceRowInsert = typeof priceRow.$inferInsert
export type PriceRow = typeof priceRow.$inferSelect

export type PriceFull = PriceInsert & {
	rows: PriceRowInsert[]
}

export type PriceRowUpdate = { id: number } & Partial<PriceRowInsert>

export type PriceFullUpdate = { id: number } & Partial<PriceInsert> & { rows?: PriceRowUpdate[] }

export const priceRelations = relations(price, ({ many }) => ({
	rows: many(priceRow),
}))

export const priceRowRelations = relations(priceRow, ({ one }) => ({
	parent: one(price, {
		fields: [priceRow.priceId],
		references: [price.id],
	}),
}))
