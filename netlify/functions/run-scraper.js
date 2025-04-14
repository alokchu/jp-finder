const { spawn } = require('child_process');
const path = require('path');

exports.handler = async function(event, context) {
  // Only allow scheduled or authenticated requests
  if (event.httpMethod === "POST" && (event.headers['x-webhook-secret'] === process.env.WEBHOOK_SECRET || context.clientContext.user)) {
    try {
      // Run your Python script
      const process = spawn('python', ['JPScraper.py']);

      return {
        statusCode: 200,
        body: JSON.stringify({ message: "Scraper triggered successfully" })
      };
    } catch (error) {
      return {
        statusCode: 500,
        body: JSON.stringify({ error: "Failed to run scraper" })
      };
    }
  } else {
    return {
      statusCode: 403,
      body: JSON.stringify({ error: "Unauthorized" })
    };
  }
};