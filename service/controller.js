const express = require("express");
const service = require("./service");
const router = express.Router();
const multer = require("multer");
var path = require("path");

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads");
  },
  filename: function (req, file, cb) {
    var fullPath = Date.now() + path.extname(file.originalname);
    cb(null, fullPath);
  },
});

const upload = multer({
  storage: storage,
}).single("file");

router.post("/importData", upload, importData);

function importData(req, res, next) {
  service.importData(req, (error, result) => {
    return error ? res.send(error) : res.send(result);
  });
}

module.exports = router;
