// src/components/Navbar.jsx
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav className="navbar">
      <div className="nav-brand">🎓 EduDash</div>
      <div className="nav-links">
        <Link to="/" className="nav-item">Home</Link>
        <Link to="/students" className="nav-item">Student List</Link>
        <Link to="/add" className="nav-item btn-primary">Add Student</Link>
      </div>
    </nav>
  );
}

export default Navbar;