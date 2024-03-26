const { serial } = require("drizzle-orm/mysql-core");
const { text, timestamp, pgTable } = require ("drizzle-orm/pg-core");

const LeadTable = pgTable('leads', {
  name: text('name').default('Neon serverless'),
  id: serial('id').primaryKey().notNull(),
  email: text('email').default('yes@test.com'),
  description: text('description').default('Testing database'),
  createdAt: timestamp('created_at').defaultNow(),

});

module.exports.LeadTable = LeadTable
