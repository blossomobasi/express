const express = require("express");

const app = express();

app.get("/", (req, res) => {
  res.send('Message for url "/" ');
});

app.get("/api/courses", (req, res) => {
  res.send([
    { id: 1, name: "course1" },
    { id: 2, name: "course2" },
    { id: 3, name: "course3" },
  ]);
});

app.get("/api/courses/:id", (req, res) => {
  res.send(req.params.id);
});

app.get("/api/posts/:year/:month", (req, res) => {
  res.send(req.params);
  //   res.send(req.query);
});

// PORT
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
