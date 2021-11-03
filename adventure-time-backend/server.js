const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const logger = require("morgan");

const app = express();

// link to database
const dbConfig = require("./config/secrets");

// express middleware that passes url encoded data
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true, limit: "50mb" }));
// use cookie-parser and loger
app.use(cookieParser());
app.use(logger("dev"));

mongoose.Promise = global.Promise;
mongoose.connect(dbConfig.url);

// route for authentication
const auth = require("./routes/authRoutes");
app.use("/api/adventuretime", auth);

app.listen(3000, () => {
    console.log("Running on port 3000");
});
