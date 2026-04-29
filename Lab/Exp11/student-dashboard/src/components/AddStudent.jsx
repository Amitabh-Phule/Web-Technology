// src/components/AddStudent.jsx
import { useState } from 'react';

function AddStudent({ students, setStudents }) {
  const [name, setName] = useState('');
  const [course, setCourse] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevents page reload on form submit

    // Basic Validation
    if (!name.trim() || !course.trim()) {
      alert("Please fill in all fields.");
      return;
    }

    // Add new student to the existing array
    const newStudent = {
      id: Date.now(), // Generate a unique ID
      name: name,
      course: course
    };

    setStudents([...students, newStudent]);
    
    // Clear inputs and show success message
    setName('');
    setCourse('');
    alert("Student added successfully!");
  };

  return (
    <div className="form-container">
      <h2>Register New Student</h2>
      <form onSubmit={handleSubmit}>
        <div className="input-group">
          <label>Student Name</label>
          <input 
            type="text" 
            value={name} 
            onChange={(e) => setName(e.target.value)} 
            placeholder="e.g., John Doe"
          />
        </div>

        <div className="input-group">
          <label>Course Name</label>
          <input 
            type="text" 
            value={course} 
            onChange={(e) => setCourse(e.target.value)} 
            placeholder="e.g., Computer Science"
          />
        </div>

        <button type="submit" className="submit-btn">Add Student</button>
      </form>
    </div>
  );
}

export default AddStudent;