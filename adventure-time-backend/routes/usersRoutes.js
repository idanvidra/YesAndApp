const express = require("express");
const router = express.Router();
const UserCtrl = require("../controllers/users");
const AuthHelper = require("../Helpers/authHelper");

// route to get all users in the DB
router.get("/users", AuthHelper.VerifyToken, UserCtrl.GetAllUsers);

module.exports = router;
