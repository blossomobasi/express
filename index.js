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

app.listen(3000, () => console.log("Listening on port 3000..."));
