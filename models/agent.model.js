const mongoose = require("mongoose");

const agentSchema = new mongoose.Schema({
  agent: String,
  userType: String,
  email: String,
  account_name: String,
});

const Agent = mongoose.model("agent", agentSchema);

module.exports = Agent;
