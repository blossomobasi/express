const debug = require("debug")("app:startup");
// const config = require("config");
const express = require("express");
const helmet = require("helmet");
const morgan = require("morgan");
const courses = require("./routes/courses");
const home = require("./routes/home");

const logger = require("./middleware/logger");
const authentication = require("./middleware/authentication");

const app = express();

app.set("view engine", "pug");
app.set("views", "./views");

// Configuration
// console.log("Application Name: " + config.get("name"));
// console.log("Mail Server: " + config.get("mail.host"));
// console.log("Mail Password: " + config.get("mail.password"));

/*
// Detect if machine is on production or development mode
console.log(`NODE_ENV: ${process.env.NODDE_ENV}`);
console.log(`app: ${app.get("env")}`);
*/

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(helmet());
app.use("/api/courses", courses);
app.use("/", home);

// Enable only on development machine
if (app.get("env") === "development") {
  app.use(morgan("tiny"));
  debug("Morgan enabled...");
}

app.use(logger);
app.use(authentication);

// PORT
// const port = process.env.PORT || 3000;
// app.listen(port, () => console.log(`Listening on port ${port}...`));

app.listen(3000, () => console.log("Listening on port 3000..."));
