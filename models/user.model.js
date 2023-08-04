const mongoose = require("mongoose");

const usersSchema = new mongoose.Schema({
  firstname: String,
  company_name: String,
  category_name: String,
  city: String,
  address: String,
});

const User = mongoose.model("users", usersSchema);

module.exports = User;
