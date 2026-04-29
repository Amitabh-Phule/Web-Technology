const express = require("express");
const app = express();

app.use(express.json()); 

let students = [
  { id: 1, name: "Pradip", age: 20 },
  { id: 2, name: "Ayan", age: 21 }
];


app.get("/students", (req, res) => {
  res.json(students);
});

app.post("/students", (req, res) => {

});

app.put("/students/:id", (req, res) => {

});

app.delete("/students/:id", (req, res) => {
    
});

app.listen(3000, () => {
  console.log("Server running on port http://localhost:3000");
});