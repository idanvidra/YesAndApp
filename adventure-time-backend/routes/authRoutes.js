const express = require("express");
const router = express.Router();
const authCtrl = require("../controllers/auth");

// call the post routes
router.post("/register", authCtrl.createUser);

module.exports = router;
