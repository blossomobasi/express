const express = require("express");
const router = express.Router();
const Joi = require("joi");

const courses = [
  { id: 1, name: "course1" },
  { id: 2, name: "course2" },
  { id: 3, name: "course3" },
];

// app.get("/api/posts/:year/:month", (req, res) => {
//   res.send(req.params);
//   //   res.send(req.query);
// });

// --------- HTTP GET request ---------
router.get("/", (req, res) => {
  res.send(courses);
});

router.get("/:id", (req, res) => {
  const course = courses.find((c) => c.id === parseInt(req.params.id));
  if (!course)
    res.status(404).send("The course with the given ID was not found");
  res.send(course);
});

// --------- HTTP POST request ---------
router.post("/", (req, res) => {
  // Input Validation
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
router.put("/:id", (req, res) => {
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

router.delete("/:id", (req, res) => {
  // Look up the course
  const course = courses.find((c) => c.id === parseInt(req.params.id));
  if (!course)
    return res.status(404).send("The course with the given ID was not found");

  // Delete
  const index = courses.indexOf(course);
  courses.splice(index, 1);

  res.send(course);
});

module.exports = router;
