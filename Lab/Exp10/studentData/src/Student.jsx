// src/Student.jsx

function Student(props) {
  return (
    <div className="student-card">
      <h2>Name: {props.name}</h2> 
      <h3>Age: {props.age}</h3> 
      <h3>Course: {props.course}</h3> 
    </div>
  );
}

// Ensure the export matches the exact function name (case-sensitive)
export default Student;