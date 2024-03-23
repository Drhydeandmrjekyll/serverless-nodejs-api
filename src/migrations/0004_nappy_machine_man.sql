CREATE TABLE IF NOT EXISTS "leads2" (
	"name" text NOT NULL,
	"id" serial PRIMARY KEY NOT NULL,
	"email" text NOT NULL,
	"description" text DEFAULT 'This is my comment',
	"created_at" timestamp DEFAULT now()
);
