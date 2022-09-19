var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

var app = express();
const dotenv = require("dotenv");
const mongoose = require("mongoose");
dotenv.config();

var createError = require("http-errors");
var session = require("express-session");
var cors = require("cors");
var bodyparser = require("body-parser");

// Routes
var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
var postRouter = require("./routes/Post");
var userRouter = require('./routes/User')




// Connect to the MongoDB cluster
const mongoAtlasUri = process.env.MONGO_DB;

try {
  mongoose.connect(
    mongoAtlasUri,
    { useNewUrlParser: true, useUnifiedTopology: true },
    () => console.log("Mongoose is connected")
  );
} catch (e) {
  console.log("could not connect");
}

const dbConnection = mongoose.connection;
dbConnection.on("error", (err) => console.log(`Connection error ${err}`));
dbConnection.once("open", () => console.log("Connected to DB!"));

/// middelwar ///
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use((req, res, next) => {
  console.log(req.path, req.method);
  next()
})

app.use(cors());
app.use(bodyparser.json());
var IS_PRODUCTION = app.get("env") === "production";
if (IS_PRODUCTION) {
  app.set("trust proxy", 1); // secures the app if it is running behind Nginx/Apache/similar
}
app.use(
  session({
    secret: "keyword cat", //<-- this should be a secret phrase
    cookie: { secure: IS_PRODUCTION }, //<-- secure only on production
    resave: true,
    saveUninitialized: true,
  })
);

/// my routes
app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/api/post", postRouter);
app.use("/api/user", userRouter);


// Create error
// app.use(function (req, res, next) {
//   next(createError(404));
// });

// error handler
app.use(function (err, req, res, next) {
  res.status(err.status || 500).send({
    success: false,
    message: err.message,
  });
});

module.exports = app;
