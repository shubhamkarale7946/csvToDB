require("rootpath")();
require("./db");
const express = require("express");
const app = express();
app.use(express.static("uploads"));
const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Import controllers here
app.use("/service", require("./service/controller"));

// start server
const port = 8035;
app.listen(port, function () {
  console.log("Server listening on port " + port);
});
