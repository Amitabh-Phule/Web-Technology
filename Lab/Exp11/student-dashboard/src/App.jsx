// src/App.jsx
import { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import StudentList from './components/StudentList';
import AddStudent from './components/AddStudent';
import './App.css';

function App() {
  // Global state to store the list of students
  const [students, setStudents] = useState([]);

  return (
    <BrowserRouter>
      <div className="app-layout">
        <Navbar />
        
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/students" element={<StudentList students={students} />} />
            <Route 
              path="/add" 
              element={<AddStudent students={students} setStudents={setStudents} />} 
            />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;