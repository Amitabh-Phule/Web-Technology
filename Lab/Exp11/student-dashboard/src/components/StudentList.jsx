// src/components/StudentList.jsx

function StudentList({ students }) {
  return (
    <div className="list-container">
      <h2>Enrolled Students</h2>
      
      {/* Conditional rendering for empty state */}
      {students.length === 0 ? (
        <div className="empty-state">
          <p>No students found. Please add a student first.</p>
        </div>
      ) : (
        <div className="grid-layout">
          {students.map((student) => (
            <div key={student.id} className="student-card">
              <div className="card-header">
                <h3>{student.name}</h3>
              </div>
              <div className="card-body">
                <p><strong>Course:</strong> {student.course}</p>
                <p className="student-id">ID: {student.id}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default StudentList;