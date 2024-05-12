const express = require("express");
const Joi = require("joi");

const app = express();

const courses = [
  { id: 1, name: "course1" },
  { id: 2, name: "course2" },
  { id: 3, name: "course3" },
];

app.get("/", (req, res) => {
  res.send('Message for url "/" ');
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

app.use(express.json());

// HTTP GET request
app.get("/api/courses", (req, res) => {
  res.send(courses);
});

app.get("/api/courses/:id", (req, res) => {
  const course = courses.find((c) => c.id === parseInt(req.params.id));
  if (!course)
    res.status(404).send("The course with the given ID was not found");
  res.send(course);
});

// HTTP POST request
app.post("/api/courses", (req, res) => {
  // Input Validation

  //   if (!req.body.name || req.body.name.length < 3) {
  //     // 400 - Bad Request
  //     res.status(400).send("Name is required and should be minimum 3 characters");
  //     return;
  //   }

  const schema = Joi.object({
    name: Joi.string().min(3).required(),
  });

  const result = schema.validate(req.body);
  if (result.error) {
    res.send(result.error.message);
  }

  const course = {
    id: courses.length + 1,
    name: req.body.name,
  };
  courses.push(course);
  res.send(course);
});

// PORT
// const port = process.env.PORT || 3000;
// app.listen(port, () => console.log(`Listening on port ${port}...`));

app.listen(3000, () => console.log("Listening on port 3000..."));
