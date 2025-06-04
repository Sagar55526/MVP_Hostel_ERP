// src/pages/FeeTracking.jsx
import React, { useState, useEffect } from "react";

const FeeTracking = () => {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    // Fetch students and their fee details from API
    setStudents([
      {
        id: 1,
        name: "John Doe",
        totalFee: 5000,
        paid: 3000,
        pending: 2000,
        lastPaymentDate: "2025-05-10",
      },
      {
        id: 2,
        name: "Jane Smith",
        totalFee: 5000,
        paid: 5000,
        pending: 0,
        lastPaymentDate: "2025-05-01",
      },
    ]);
  }, []);

  return (
    <div className="container">
      <h3 className="my-4">Fee Tracking</h3>

      <table className="table table-bordered">
        <thead>
          <tr>
            <th>Student</th>
            <th>Total Fee</th>
            <th>Paid</th>
            <th>Pending</th>
            <th>Last Payment Date</th>
            <th>Update Payment</th>
          </tr>
        </thead>
        <tbody>
          {students.map((stu) => (
            <tr key={stu.id}>
              <td>{stu.name}</td>
              <td>₹{stu.totalFee}</td>
              <td>₹{stu.paid}</td>
              <td>₹{stu.pending}</td>
              <td>{stu.lastPaymentDate}</td>
              <td>
                <button className="btn btn-success btn-sm">Update</button>
              </td>
            </tr>
          ))}
          {students.length === 0 && (
            <tr>
              <td colSpan="6" className="text-center">
                No fee records found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default FeeTracking;
