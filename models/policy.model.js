const mongoose = require("mongoose");

const policySchema = new mongoose.Schema({
  policy_mode: String,
  policy_number: String,
  policy_type: String,
  policy_start_date: String,
  policy_end_date: String,
});

const Policy = mongoose.model("policy", policySchema);

module.exports = Policy;
