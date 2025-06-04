// src/pages/BiometricLogs.jsx
import React, { useState, useEffect } from "react";

const BiometricLogs = () => {
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    // Fetch biometric logs
    setLogs([
      {
        id: 1,
        student: "John Doe",
        date: "2025-06-01",
        time: "08:00 AM",
        status: "Present",
      },
      {
        id: 2,
        student: "Jane Smith",
        date: "2025-06-01",
        time: "08:05 AM",
        status: "Present",
      },
      {
        id: 3,
        student: "John Doe",
        date: "2025-06-02",
        time: "08:02 AM",
        status: "Present",
      },
    ]);
  }, []);

  return (
    <div className="container">
      <h3 className="my-4">Biometric Logs</h3>

      <table className="table table-striped">
        <thead>
          <tr>
            <th>Student</th>
            <th>Date</th>
            <th>Time</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {logs.map((log) => (
            <tr key={log.id}>
              <td>{log.student}</td>
              <td>{log.date}</td>
              <td>{log.time}</td>
              <td>{log.status}</td>
            </tr>
          ))}
          {logs.length === 0 && (
            <tr>
              <td colSpan="4" className="text-center">
                No biometric logs found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default BiometricLogs;
