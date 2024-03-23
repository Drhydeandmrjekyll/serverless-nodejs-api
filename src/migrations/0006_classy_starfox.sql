ALTER TABLE "leads" ALTER COLUMN "email" SET DEFAULT 'test@test.com';--> statement-breakpoint
ALTER TABLE "leads" ALTER COLUMN "email" DROP NOT NULL;