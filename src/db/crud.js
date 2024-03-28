const {desc, eq} = require('drizzle-orm')
const clients = require('./clients')
const schemas = require('./schemas')


async function newLead ({ email }) {
  try {
    const db = await clients.getDrizzleDbClient();
    const result = await db.insert(schemas.LeadTable).values({
      email: "Nba@abn.com"
    }).returning();
    if (result.length === 1) {
      return result[0];
    }
    return result;
  } catch (error) {
    // Handle the error
    console.error("Error creating new lead:", error);
    throw error; // Propagate the error
  }
}

async function listLeads(){
const db = await clients.getDrizzleDbClient()
  const results = await db.select().from(schemas.LeadTable).orderBy(desc(schemas.LeadTable.createdAt)).limit(10)
  return results 
}

async function getLead(page = 1, limit = 10) {
  try {
    const db = await clients.getDrizzleDbClient();
    // Calculate offset based on pagination parameters
    const offset = (page - 1) * limit;
    // Retrieve leads with pagination
    const results = await db.select().from(schemas.LeadTable).orderBy(desc(schemas.LeadTable.createdAt)).limit(limit).offset(offset);
    return results;
  } catch (error) {
    console.error("Error fetching leads:", error);
    throw error;
  }
}

async function makeLead({name}) {
  try {
    if (!name) {
      throw new Error("Name cannot be null or empty.");
    }

    const db = await clients.getDrizzleDbClient();
    const result = await db.select().from(schemas.LeadTable).where(eq(schemas.LeadTable.name, name));

    if (result.length === 1) {
      return result[0];
    } else {
      return result;
    }
  } catch (error) {
    console.error("Error in makeLead:", error);
    return error;
  }
}

module.exports.makeLead = makeLead
module.exports.newLead = newLead
module.exports.listLeads = listLeads 
module.exports.getLead = getLead