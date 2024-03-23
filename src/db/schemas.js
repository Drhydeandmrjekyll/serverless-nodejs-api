const { serial } = require("drizzle-orm/mysql-core");
const { text, timestamp, pgTable } = require ("drizzle-orm/pg-core");

const LeadTable = pgTable('leads', {
  name: text('name').default('Pseudo_John'),
  id: serial('id').primaryKey().notNull(),
  email: text('email').default('test@test.com'),
  description: text('description').default('This is my comment'),
  createdAt: timestamp('created_at').defaultNow(),

});


module.exports.LeadTable = LeadTable