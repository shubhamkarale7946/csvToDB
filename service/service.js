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

// update user data
async function updateUserData(req, next) {
  try {
    const updateResult = await db.User.updateOne(
      { _id: req.params.id },
      {
        $set: {
          firstname: req.body.firstName,
          company_name: req.body.companyName,
          category_name: req.body.categoryName,
          city: req.body.city,
          address: req.body.address,
        },
      }
    );

    if (updateResult.matchedCount === 1 && updateResult.modifiedCount === 1) {
      // Successfully updated
      return next({
        status: true,
        message: "User updated successfully.",
      });
    } else {
      // Document not found or not modified
      return next({
        status: false,
        message: "Data Not Found!",
      });
    }
  } catch (error) {
    console.log(error);
    return next({
      status: false,
      message: "Something went wrong!",
      error,
    });
  }
}

// update policy data
async function updatePolicyData(req, next) {
  try {
    const updateResult = await db.Policy.updateOne(
      { _id: req.params.id },
      {
        $set: {
          policy_mode: req.body.policyMode,
          policy_number: req.body.policyNumber,
          policy_type: req.body.policyType,
          policy_start_date: req.body.policyStartDate,
          policy_end_date: req.body.policyEndDate,
        },
      }
    );

    if (updateResult.matchedCount === 1 && updateResult.modifiedCount === 1) {
      // Successfully updated
      return next({
        status: true,
        message: "Policy updated successfully.",
      });
    } else {
      // Document not found or not modified
      return next({
        status: false,
        message: "Data Not Found!",
      });
    }
  } catch (error) {
    console.log(error);
    return next({
      status: false,
      message: "Something went wrong!",
      error,
    });
  }
}

// update agent data
async function updateAgentData(req, next) {
  try {
    const updateResult = await db.Agent.updateOne(
      { _id: req.params.id },
      {
        $set: {
          agent: req.body.agent,
          userType: req.body.userType,
          email: req.body.email,
          account_name: req.body.accountName,
        },
      }
    );
    console.log(updateResult);
    if (updateResult.matchedCount === 1 && updateResult.modifiedCount === 1) {
      // Successfully updated
      return next({
        status: true,
        message: "Agent updated successfully.",
      });
    } else {
      // Document not found or not modified
      return next({
        status: false,
        message: "Data Not Found!",
      });
    }
  } catch (error) {
    console.log(error);
    return next({
      status: false,
      message: "Something went wrong!",
      error,
    });
  }
}

// delete user
async function deleteUser(req, next) {
  try {
    const result = await db.User.deleteOne({ _id: req.params.id });
    if (result.deletedCount === 1) {
      // Successfully deleted
      return next({
        status: true,
        message: "User deleted successfully.",
      });
    } else {
      // Document not found or not modified
      return next({
        status: false,
        message: "Data Not Found!",
      });
    }
  } catch (error) {
    console.log(error);
    return next({
      status: false,
      message: "Something went wrong!",
      error,
    });
  }
}

// delete policy
async function deletePolicy(req, next) {
  try {
    const result = await db.Policy.deleteOne({ _id: req.params.id });
    if (result.deletedCount === 1) {
      // Successfully deleted
      return next({
        status: true,
        message: "Policy deleted successfully.",
      });
    } else {
      // Document not found or not modified
      return next({
        status: false,
        message: "Data Not Found!",
      });
    }
  } catch (error) {
    console.log(error);
    return next({
      status: false,
      message: "Something went wrong!",
      error,
    });
  }
}

// delete agent
async function deleteAgent(req, next) {
  try {
    const result = await db.Agent.deleteOne({ _id: req.params.id });
    if (result.deletedCount === 1) {
      // Successfully deleted
      return next({
        status: true,
        message: "Agent deleted successfully.",
      });
    } else {
      // Document not found or not modified
      return next({
        status: false,
        message: "Data Not Found!",
      });
    }
  } catch (error) {
    console.log(error);
    return next({
      status: false,
      message: "Something went wrong!",
      error,
    });
  }
}

module.exports = {
  importData,
  updateUserData,
  updatePolicyData,
  updateAgentData,
  deleteUser,
  deletePolicy,
  deleteAgent,
};
