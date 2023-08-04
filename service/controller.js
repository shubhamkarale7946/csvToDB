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
router.post("/updateUserData/:id", updateUserData);
router.post("/updatePolicyData/:id", updatePolicyData);
router.post("/updateAgentData/:id", updateAgentData);
router.post("/deleteUser/:id", deleteUser);
router.post("/deletePolicy/:id", deletePolicy);
router.post("/deleteAgent/:id", deleteAgent);

function importData(req, res, next) {
  service.importData(req, (error, result) => {
    return error ? res.send(error) : res.send(result);
  });
}

function updateUserData(req, res, next) {
  service.updateUserData(req, (error, result) => {
    return error ? res.send(error) : res.send(result);
  });
}

function updatePolicyData(req, res, next) {
  service.updatePolicyData(req, (error, result) => {
    return error ? res.send(error) : res.send(result);
  });
}

function updateAgentData(req, res, next) {
  service.updateAgentData(req, (error, result) => {
    return error ? res.send(error) : res.send(result);
  });
}

function deleteUser(req, res, next) {
  service.deleteUser(req, (error, result) => {
    return error ? res.send(error) : res.send(result);
  });
}

function deletePolicy(req, res, next) {
  service.deletePolicy(req, (error, result) => {
    return error ? res.send(error) : res.send(result);
  });
}

function deleteAgent(req, res, next) {
  service.deleteAgent(req, (error, result) => {
    return error ? res.send(error) : res.send(result);
  });
}

module.exports = router;
