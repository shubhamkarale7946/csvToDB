const config = require("./config.json");
const mongoose = require("mongoose");
const connectionOptions = {
  useNewUrlParser: true,
};

mongoose.connect(
  process.env.MONGODB_URI || config.conndata_DB,
  connectionOptions || config.conndata_DB,
  connectionOptions
);

mongoose.Promise = global.Promise;

mongoose.set("debug", true);
module.exports = {
  Agent: require("./models/agent.model"),
  User: require("./models/user.model"),
  Policy: require("./models/policy.model"),
};
