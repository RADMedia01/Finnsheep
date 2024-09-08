const { Client, Environment } = require("square");
const squareClient = new Client({
    accessToken: process.env.SQUARE_ACCESS_TOKEN,
    environment: Environment.Sandbox,
  });

export default squareClient;  