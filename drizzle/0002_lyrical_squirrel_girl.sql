CREATE TABLE "feedback_links" (
	"id" serial PRIMARY KEY NOT NULL,
	"token" text NOT NULL,
	"is_used" boolean DEFAULT false NOT NULL,
	"created_at" timestamp DEFAULT now()
);
