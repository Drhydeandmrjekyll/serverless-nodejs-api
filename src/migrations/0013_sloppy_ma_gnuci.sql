CREATE TABLE IF NOT EXISTS "leads2" (
	"name" text DEFAULT 'Mr Neon',
	"id" serial PRIMARY KEY NOT NULL,
	"email" text DEFAULT 'yes@test.com',
	"description" text DEFAULT 'Testing database',
	"created_at" timestamp DEFAULT now()
);
