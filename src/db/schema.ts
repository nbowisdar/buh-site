import { boolean, integer, json, pgTable, serial, text, timestamp } from "drizzle-orm/pg-core"

export const comments = pgTable("comments", {
	id: serial("id").primaryKey(),
	name: text().notNull(),
	company: text(),
	rating: integer().notNull().default(5),
	createdAt: timestamp("created_at").defaultNow(),
	text: text(),
	userId: text("user_id").notNull(),
})

export type Services = {
	name: string
	price: string
}

export const price = pgTable("price", {
	id: serial("id").primaryKey(),
	title: text().notNull(),
	comment: text(),
	services: json().$type<Services[]>(),
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
