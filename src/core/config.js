require("dotenv").config();

const BOT_NAME = "bby";
const OWNER_NAME = "Arnol";

module.exports = {
  BOT_NAME,
  OWNER_NAME,
  AI_API_KEY: process.env.AI_API_KEY || ""
};
