const serverless = require('serverless-http');
const app = require('../../server/server.js');

// Wrap the Express app for serverless deployment
const handler = serverless(app);

module.exports.handler = async (event, context) => {
  // Add any custom logic here if needed
  const result = await handler(event, context);
  return result;
};
