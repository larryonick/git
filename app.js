const express = require("express");

const app = express();
app.use(express.json());
const courses = [
  { id: 1, name: "English Course" },
  { id: 2, name: "Maths Course" },
  { id: 3, name: "Physics Course" }
];

app.get("/", (req, res) => {
  res.send("This is the HomePage");
});

//lets return a list of all courses
app.get("/api/books/list", (req, res) => {
  res.send(courses);
});
//to get a single course
app.get("/api/books/:id", (req, res) => {
  const course = courses.find(c => c.id === parseInt(req.params.id));

  if (!course) {
    res.status(404).send("<h1>Not Found</h1>");
  } else {
    res.status(200).send(course);
  }
});

//How to handle http post requests
app.post("/api/courses", (req, res) => {
  //here we, need to implement an input validation: This is sbecause w e cannot always trust the input coming from an application user
  if (req.body.name == "" || req.body.name < 3) {
    // we then respond with a bad request status.
    res.status(400).send("Name must not be les than three characters0");
    return;
  }
  const course = {
    id: courses.length + 1,
    name: req.body.name
  };
  courses.push(course);
  res.send(courses);
});
//this section illustartes how to set the port
const PORT = 5000;
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`This app is listening on Port ${port}...`);
});
