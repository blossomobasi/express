const debug = require("debug")("app:startup");
// const config = require("config");
const express = require("express");
const helmet = require("helmet");
const morgan = require("morgan");
const Joi = require("joi");

const logger = require("./logger");
const authentication = require("./authentication");

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

// Enable only on development machine
if (app.get("env") === "development") {
  app.use(morgan("tiny"));
  debug("Morgan enabled...");
}

app.use(logger);
app.use(authentication);

const courses = [
  { id: 1, name: "course1" },
  { id: 2, name: "course2" },
  { id: 3, name: "course3" },
];

app.get("/", (req, res) => {
  res.render("index", {
    title: "My Express App",
    message: "Hello",
  });
});

// app.get("/api/courses", (req, res) => {
//   res.send([
//     { id: 1, name: "course1" },
//     { id: 2, name: "course2" },
//     { id: 3, name: "course3" },
//   ]);
// });

// app.get("/api/posts/:year/:month", (req, res) => {
//   res.send(req.params);
//   //   res.send(req.query);
// });

// --------- HTTP GET request ---------
app.get("/api/courses", (req, res) => {
  res.send(courses);
});

app.get("/api/courses/:id", (req, res) => {
  const course = courses.find((c) => c.id === parseInt(req.params.id));
  if (!course)
    res.status(404).send("The course with the given ID was not found");
  res.send(course);
});

// --------- HTTP POST request ---------
app.post("/api/courses", (req, res) => {
  // Input Validation

  //   if (!req.body.name || req.body.name.length < 3) {
  //     // 400 - Bad Request
  //     res.status(400).send("Name is required and should be minimum 3 characters");
  //     return;
  //   }
  const { error } = validateCourse(req.body);
  if (error) return res.status(400).send(error.message);

  const course = {
    id: courses.length + 1,
    name: req.body.name,
  };

  courses.push(course);
  res.send(course);
});

// --------- HTTP PUT request ---------
app.put("/api/courses/:id", (req, res) => {
  // Look up the course
  // If not existing, return 404
  const course = courses.find((c) => c.id === parseInt(req.params.id));
  if (!course)
    return res.status(404).send("The course with the given ID was not found");

  // Validate
  // If invalid, return 400 - Bad Request
  const { error } = validateCourse(req.body); // result.error
  if (error) return res.status(400).send(error.message);

  // Update course
  course.name = req.body.name;

  // Return the updated course
  res.send(course);
});

const validateCourse = (course) => {
  const schema = Joi.object({
    name: Joi.string().min(3).required(),
  });

  const result = schema.validate(course);
  return result;
};

app.delete("/api/courses/:id", (req, res) => {
  // Look up the course
  const course = courses.find((c) => c.id === parseInt(req.params.id));
  if (!course)
    return res.status(404).send("The course with the given ID was not found");

  // Delete
  const index = courses.indexOf(course);
  courses.splice(index, 1);

  res.send(course);
});

// PORT
// const port = process.env.PORT || 3000;
// app.listen(port, () => console.log(`Listening on port ${port}...`));

app.listen(3000, () => console.log("Listening on port 3000..."));
