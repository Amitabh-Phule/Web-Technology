// STEP 6: Basic Server Setup
const express = require("express");
const mysql = require("mysql2");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());

// STEP 7: Connect to MySQL
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "student", // 
    database: "studentdb"
});

db.connect((err) => {
    if (err) {
        console.log("Database connection failed:", err);
    } else {
        console.log("Connected to MySQL successfully!");
    }
});

// STEP 8: CRUD Operations

// 1. CREATE (Insert Data)
app.post("/students", (req, res) => {
    const { name, age, course } = req.body;
    const sql = "INSERT INTO students (name, age, course) VALUES (?, ?, ?)";
    
    db.query(sql, [name, age, course], (err, result) => {
        if (err) {
            res.send(err);
        } else {
            res.send("Student added successfully");
        }
    });
});

// 2. READ (Get All Students)
app.get("/students", (req, res) => {
    db.query("SELECT * FROM students", (err, result) => {
        if (err) {
            res.send(err);
        } else {
            res.send(result); // Returns array of students
        }
    });
});

// 3. UPDATE Student
app.put("/students/:id", (req, res) => {
    const { name, age, course } = req.body;
    const { id } = req.params; // Extract ID from the URL

    const sql = "UPDATE students SET name=?, age=?, course=? WHERE id=?";
    
    db.query(sql, [name, age, course, id], (err, result) => {
        if (err) {
            res.send(err);
        } else {
            res.send("Student updated successfully");
        }
    });
});

// 4. DELETE Student
app.delete("/students/:id", (req, res) => {
    const { id } = req.params; // Extract ID from the URL

    db.query("DELETE FROM students WHERE id=?", [id], (err, result) => {
        if (err) {
            res.send(err);
        } else {
            res.send("Student deleted successfully");
        }
    });
});

// STEP 9: Start Server
app.listen(3000, () => {
    console.log("Server is running on http://localhost:3000");
});