const {desc, eq} = require('drizzle-orm')
const clients = require('./clients')
const schemas = require('./schemas')


async function newLead({email}) {
  const db = await clients.getDrizzleDbClient()
  const result = await db.insert(schemas.LeadTable).values({
      email: "Hello"
  }).returning()
  if (result.length === 1) {
      return result[0]
  }
  return result
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
    const results = await db.select().from(schemas.LeadTable).where(eq(schemas.LeadTable.id, id))
    if (result.length === 1) {
      return result[0]
    }
    return null
}

module.exports.newLead = newLead
module.exports.listLeads = listLeads 
module.exports.getLead = getLead