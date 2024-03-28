const serverless = require("serverless-http");
const express = require("express");
const crud = require('./db/crud')
const validators = require('./db/validators')
const {getDbClient} = require('./db/clients')
const app = express();


const STAGE = process.env.STAGE || 'prod'

// Parse JSON bodies
app.use(express.json())

// Modify root endpoint ("/") handler
app.get("/", async (req, res, next) => {
  // Log environment DEBUG variable
  console.log(process.env.DEBUG);
  const sql = await getDbClient();
  const now = Date.now();
  try {
    const [dbNowResult] = await sql`select now() as current_time;`;

    if (dbNowResult && dbNowResult.current_time) {
      const dbNow = new Date(dbNowResult.current_time);
      if (!isNaN(dbNow.getTime())) {
        const delta = (dbNow.getTime() - now) / 1000;
        return res.status(200).json({
          delta: delta,
          stage: STAGE
        });
      }
    }
    // If dbNowResult or dbNowResult.current_time is missing or invalid
    throw new Error("Error fetching current time from the database.");
  } catch (error) {
    console.error("Error fetching current time from the database:", error);
    return res.status(500).json({
      error: "Error fetching current time from the database."
    });
  }
});

// Modify "/path" endpoint handler
app.get("/path", (req, res, next) => {
  try {
    return res.status(200).json({
      message: "Hello from path!",
      stage: STAGE
    });
  } catch (error) {
    console.error("Error handling request:", error);
    return res.status(500).json({
      error: "Internal Server Error."
    });
  }
});
//not be implemented once done to avoid crushing the project
/*
app.get("leads/:id", async (req, res, next) =>{
  try{
    //Extract the ID parameter from the request URL
    const leadId = req.params.id;

    //Query the database to find the lead with the specified ID
    const lead = await crud.getLeadById(leadId);

    // Check if the lead exists
    if (!lead) {
      return res.status(404).json({ error: "lead not found"});
    }

    // Return the lead object if found
    return res.status(200).json({ lead: lead});
  } catch (error) {
    console.error("Error fetching leads:", error);
    return res.status(500).json({error: "Error fetching lead"});
  }
})
*/
// "/leads" endpoint handler
app.get("/leads", async (req, res, next) => {
  try {
    // Get pagination parameters from query string
    const page = req.query.page || 1;
    const limit = req.query.limit || 10;
    // Retrieve leads with pagination
    const results = await crud.getLead(page, limit);
    // Return success response
    return res.status(200).json({
      results: results,
    });
  } catch (error) {
    console.error("Error fetching leads:", error);
    return res.status(500).json({
      error: "Error fetching leads."
    });
  }
});

app.post("/leads", async (req, res, next) => {
  // POST -> create data
  const postData = await req.body
  //validation
  const {data, hasError, message} = await validators.validateLead(postData)
  //const {email} = data
  if (hasError === true) {
    return res.status(400).json({
      message: message ? message : "Invalid request. please try again",
    });
  } else if (hasError === undefined) {
    return res.status(500).json({
      message: "Server Error",
    });
  }

  // Add new lead to the database
  const result = await crud.newLead(data)
  //Insert data to database
  return res.status(201).json({
    result: result,
  });
});

app.use((req, res, next) => {
  return res.status(404).json({
    error: "Not Found",
  });
});

//app.listen(3000, ()=> {
//  console.log("running at http://localhost:3000")
//})

module.exports.handler = serverless(app);
