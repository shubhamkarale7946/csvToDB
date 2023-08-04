const csvtojson = require("csvtojson");
const db = require("../db");
const fs = require("fs");

// Import data to db
async function importData(req, next) {
  try {
    if (!req.file) {
      return next({ status: 200, message: "No file uploaded." });
    }
    const jsonArray = await csvtojson().fromFile(req.file.path);

    await Promise.all([
      db.User.insertMany(jsonArray),
      db.Agent.insertMany(jsonArray),
      db.Policy.insertMany(jsonArray),
    ]);
    fs.unlinkSync(req.file.path);
    return next({
      success: true,
      message: "Data inserted successfully into all collections.",
    });
  } catch (error) {
    console.log(error);
    return next({
      status: false,
      message: "Something went wrong!",
      error,
    });
  }
}

module.exports = { importData };
