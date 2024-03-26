
const { neon, neonConfig } = require('@neondatabase/serverless');
const {drizzle} = require('drizzle-orm/neon-http')
const secrets = require('../lib/secrets')

async function checkDatabaseStatus() {
  try {
    // Attempt to establish a connection to the database
    const sql = await getDbClient();
    
    // If connection is successful, return status indicating database is reachable
    return { status: 'reachable' };
  } catch (error) {
    // If there's an error while connecting, handle it and return status indicating database is unreachable
    console.error('Error connecting to database:', error);
    return { status: 'unreachable', error: error.message };
  }
}

async function getDbClient(){
  const dburl = await secrets.getDatabaseUrl()
  neonConfig.fetchConnectionCache = true
  const sql = neon(dburl);
  return sql
}

async function getDrizzleDbClient(){
  const sql = await getDbClient()
  return drizzle(sql)
}
 
module.exports = {
  checkDatabaseStatus,
  getDbClient,
  getDrizzleDbClient
};
