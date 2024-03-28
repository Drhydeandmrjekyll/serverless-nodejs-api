const {desc, eq} = require('drizzle-orm')
const clients = require('./clients') // Importing client module
const schemas = require('./schemas') // Importing schemas module

/**
 * Create a new lead in the database.
 * @param {Object} data - Data for creating a new lead.
 * @returns {Object} - Created lead object.
 */

async function newLead ({ email }) {
  try {
    // Get Drizzle database client
    const db = await clients.getDrizzleDbClient();
    const result = await db.insert(schemas.LeadTable).values({
      email: email 
    }).returning();
    // Return the created lead
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


/**
 * List all leads from the database.
 * @returns {Array} - Array of lead objects.
 */
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
    // Handle and propagate the error
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
/*
async function getLeadById(id) {
  try{
    //Query the database for the lead with the specified ID
    const db = await clients.getDrizzleDbClient();
    const result = await db.select().from(schemas.LeadTable).where(eq(schemas.LeadTable.id, id));

    // Check if a lead with the specified ID was found
    if (result.length === 1) {
      return result[0];
    } else {
      return null // Return null if no lead with the soecified ID was found
    }
  } catch (error) {
    console.error("Error fetching lead by ID:", error);
    throw error;
  }
}
*/
// Export functions
module.exports.makeLead = makeLead
module.exports.newLead = newLead
module.exports.listLeads = listLeads 
module.exports.getLead = getLead
//module.exports.getLeadById = getLeadById