import React, { useEffect, useState } from "react";

const StudentProfile = () => {
  const [students, setStudents] = useState([]);
  const [sortBy, setSortBy] = useState("studentId");
  const [order, setOrder] = useState("asc");
  const [courseFilter, setCourseFilter] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchStudents = async () => {
    setLoading(true);
    setError(null);

    try {
      // Build query parameters
      const params = new URLSearchParams();
      if (sortBy) params.append("sortBy", sortBy);
      if (order) params.append("order", order);
      if (courseFilter) params.append("course", courseFilter);

      const response = await fetch(
        `http://localhost:5000/api/students?${params.toString()}`
      );

      if (!response.ok) {
        throw new Error("Failed to fetch students");
      }

      const data = await response.json();
      setStudents(data.students || []);
    } catch (err) {
      setError(err.message);
    }

    setLoading(false);
  };

  useEffect(() => {
    fetchStudents();
  }, [sortBy, order, courseFilter]);

  return (
    <div className="container mt-5">
      <h3 className="mb-4">Student Profile Management</h3>

      {/* Filters */}
      <div className="mb-3 d-flex gap-3 align-items-center">
        <div>
          <label>Sort By:</label>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="form-select"
          >
            <option value="studentId">Student ID</option>
            <option value="name">Name</option>
            <option value="course">Course</option>
          </select>
        </div>
        <div>
          <label>Order:</label>
          <select
            value={order}
            onChange={(e) => setOrder(e.target.value)}
            className="form-select"
          >
            <option value="asc">Ascending</option>
            <option value="desc">Descending</option>
          </select>
        </div>
        <div>
          <label>Course Filter:</label>
          <input
            type="text"
            className="form-control"
            value={courseFilter}
            onChange={(e) => setCourseFilter(e.target.value)}
            placeholder="Enter course"
          />
        </div>
      </div>

      {/* Loading/Error */}
      {loading && <p>Loading students...</p>}
      {error && <p className="text-danger">Error: {error}</p>}

      {/* Student Cards */}
      <div className="row">
        {!loading && !error && students.length === 0 && (
          <p>No students found.</p>
        )}

        {students.map((student) => (
          <div key={student.id} className="col-md-3 mb-4">
            <div className="card h-100 shadow-sm">
              {student.photo ? (
                <img
                  src={`http://localhost:5000/uploads/${student.photo}`}
                  alt={`${student.name}'s photo`}
                  className="card-img-top mt-3"
                  style={{
                    width: "100%",
                    height: "auto",
                    maxHeight: "200px",
                    objectFit: "contain",
                    backgroundColor: "#f8f9fa",
                  }}
                />
              ) : (
                <div
                  className="d-flex align-items-center justify-content-center bg-secondary text-white"
                  style={{ height: "200px" }}
                >
                  No Photo
                </div>
              )}
              <div className="card-body">
                <h5 className="card-title">{student.name}</h5>
                <p className="card-text">
                  <b>Student ID:</b> {student.studentId}
                  <br />
                  <b>Course:</b> {student.course}
                  <br />
                  <b>Email:</b> {student.email}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StudentProfile;
