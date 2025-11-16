CREATE TABLE "comments" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"company" text,
	"rating" integer DEFAULT 5 NOT NULL,
	"created_at" timestamp DEFAULT now(),
	"text" text
);
--> statement-breakpoint
CREATE TABLE "price" (
	"id" serial PRIMARY KEY NOT NULL,
	"title" text NOT NULL,
	"comment" text
);
--> statement-breakpoint
CREATE TABLE "price_row" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"price" text NOT NULL,
	"price_id" integer
);
--> statement-breakpoint
ALTER TABLE "price_row" ADD CONSTRAINT "price_row_price_id_price_id_fk" FOREIGN KEY ("price_id") REFERENCES "public"."price"("id") ON DELETE cascade ON UPDATE no action;