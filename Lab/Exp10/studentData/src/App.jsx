// src/App.jsx
import Student from './Student';
import './App.css'; // Import the CSS file

function App() {
  // 1. Simple event function for the button click
  const showMessage = () => {
    alert("Button Clicked! Welcome to the Student Portal.");
  };

  // 2. Array of objects for multiple records
  const studentList = [
    { id: 1, name: "Pradip", age: "22", course: "Computer" },
    { id: 2, name: "Omkar", age: "23", course: "IT" },
    { id: 3, name: "Shivani", age: "21", course: "Mechanical" }
  ];

  return (
    <>
      <h1>Student Information System</h1>
      
      {/* Event Handling */}
      <button onClick={showMessage}>
        Click Me
      </button>

      <hr />

      {/* Looping through the array to render multiple Student components */}
      <div className="student-container">
        {studentList.map((student) => (
          <Student 
            key={student.id} 
            name={student.name} 
            age={student.age} 
            course={student.course} 
          />
        ))}
      </div>
    </>
  );
}

export default App;