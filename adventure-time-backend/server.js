const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const cors = require("cors");

const app = express();

// CORS is a node.js package for providing a Connect/Express middleware
// that can be used to enable CORS with various options.
app.use(cors());

// link to database
const dbConfig = require("./config/secrets");

// init socket.io server instance
// used to get live feedback from the nodejs server
const server = require("http").createServer(app);
// const io = require("socket.io")(server).listen(server);
const io = require("socket.io")(server);

// connect frontend to backend
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Original", "*");
    res.header("Access-Control-Allow-Credentials", "true");
    res.header(
        "Access-Control-Allow-Methods",
        "GET",
        "POST",
        "DELETE",
        "PUT",
        "OPTIONS"
    );
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    next();
});

// express middleware that passes url encoded data
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true, limit: "50mb" }));
// use cookie-parser and loger
app.use(cookieParser());
app.use(logger("dev"));

// connect to DB
mongoose.Promise = global.Promise;
mongoose.connect(dbConfig.urlForDB);

// pass socket.io const to socket/streams.js
require("./socket/streams")(io);

// route for authentication (middleware)
const auth = require("./routes/authRoutes");
app.use("/api/adventuretime", auth);

// route for game posting - temporary (middleware)
const games = require("./routes/gameRoutes");
app.use("/api/adventuretime", games);

// route for users (middleware)
const users = require("./routes/usersRoutes");
app.use("/api/adventuretime", users);

// route for message (middleware)
const message = require("./routes/messageRoutes");
app.use("/api/adventuretime", message);

// use express server to listen on port 3000
const port = process.env.PORT || 3000;
server.listen(port, () => {
    console.log("Running on port 3000");
});
