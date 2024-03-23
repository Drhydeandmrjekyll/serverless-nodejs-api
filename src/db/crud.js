const {desc, eq} = require('drizzle-orm')
const clients = require('./clients')
const schemas = require('./schemas')


async function newLead ({ email }) {
  try {
    const db = await clients.getDrizzleDbClient();
    const result = await db.insert(schemas.LeadTable).values({
      email: email
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

async function getLead(id) {
    const db = await clients.getDrizzleDbClient()
    //get id alone
    //const result = await db.select({id:schemas.LeadTable.id}).from(schemas.LeadTable).where(eq(schemas.LeadTable.id, id))
    //const result = await db.select().from(schemas.LeadTable).where(eq(schemas.LeadTable.id, id))
    const result = await db.insert(schemas.LeadTable).values({
      email: "Hello"
  }).returning()
  if (result.length === 1) {
      return result[0]
    }
    return null
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