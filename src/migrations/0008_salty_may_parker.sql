CREATE TABLE IF NOT EXISTS "leads2" (
	"name" text DEFAULT 'Pseudo_John',
	"id" serial PRIMARY KEY NOT NULL,
	"email" text DEFAULT 'test@test.com',
	"description" text DEFAULT 'This is my comment',
	"created_at" timestamp DEFAULT now()
);
