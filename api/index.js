const serverless = require("serverless-http");
const { createApp } = require("../src/server");

const app = createApp();
module.exports = serverless(app);
