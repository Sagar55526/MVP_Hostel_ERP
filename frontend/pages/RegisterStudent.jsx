import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const RegisterStudent = () => {
  const navigate = useNavigate();
  const generateStudentId = () => `S${Math.floor(1000 + Math.random() * 9000)}`;

  const [form, setForm] = useState({
    name: "",
    studentId: generateStudentId(),
    fatherName: "",
    dob: "",
    gender: "",
    email: "",
    phone: "",
    emergencyContact: "",
    aadhar: "",
    address: "",
    course: "",
    photo: null, // New field for photo file
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "photo") {
      setForm({ ...form, photo: files[0] }); // Handle file input
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    Object.entries(form).forEach(([key, value]) => {
      formData.append(key, value);
    });

    try {
      const res = await fetch("http://localhost:5000/api/students", {
        method: "POST",
        body: formData,
      });

      if (res.ok) {
        // Replace alert with toast success notification
        toast.success("Student registered successfully!", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        // Optional: Reset form or redirect after delay
      } else {
        const err = await res.json();
        toast.error("Error: " + err.error, {
          position: "top-right",
          autoClose: 4000,
        });
      }
    } catch (err) {
      toast.error("Network error: " + err.message, {
        position: "top-right",
        autoClose: 4000,
      });
    }
  };

  return (
    <div className="container mt-5">
      <h3 className="mb-4">Register New Student</h3>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <div className="row">
          <div className="col-md-6 mb-3">
            <label>Full Name</label>
            <input
              type="text"
              className="form-control"
              name="name"
              required
              value={form.name}
              onChange={handleChange}
            />
          </div>
          <div className="col-md-6 mb-3">
            <label>Father's Name</label>
            <input
              type="text"
              className="form-control"
              name="fatherName"
              required
              value={form.fatherName}
              onChange={handleChange}
            />
          </div>

          <div className="col-md-4 mb-3">
            <label>Date of Birth</label>
            <input
              type="date"
              className="form-control"
              name="dob"
              required
              value={form.dob}
              onChange={handleChange}
            />
          </div>
          <div className="col-md-4 mb-3">
            <label>Gender</label>
            <select
              className="form-control"
              name="gender"
              required
              value={form.gender}
              onChange={handleChange}
            >
              <option value="">--Select--</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>
          <div className="col-md-4 mb-3">
            <label>Student Reg. Number</label>
            <input
              type="text"
              className="form-control"
              name="studentId"
              value={form.studentId}
              readOnly
            />
          </div>

          <div className="col-md-4 mb-3">
            <label>Phone</label>
            <input
              type="tel"
              className="form-control"
              name="phone"
              required
              value={form.phone}
              onChange={handleChange}
            />
          </div>
          <div className="col-md-4 mb-3">
            <label>Emergency Contact</label>
            <input
              type="tel"
              className="form-control"
              name="emergencyContact"
              required
              value={form.emergencyContact}
              onChange={handleChange}
            />
          </div>
          <div className="col-md-4 mb-3">
            <label>Aadhar Number</label>
            <input
              type="text"
              className="form-control"
              name="aadhar"
              required
              maxLength="12"
              value={form.aadhar}
              onChange={handleChange}
            />
          </div>

          <div className="col-md-6 mb-3">
            <label>Email</label>
            <input
              type="email"
              className="form-control"
              name="email"
              required
              value={form.email}
              onChange={handleChange}
            />
          </div>
          <div className="col-md-6 mb-3">
            <label>Course / Department</label>
            <input
              type="text"
              className="form-control"
              name="course"
              required
              value={form.course}
              onChange={handleChange}
            />
          </div>

          <div className="col-md-12 mb-3">
            <label>Address</label>
            <textarea
              className="form-control"
              name="address"
              rows="2"
              required
              value={form.address}
              onChange={handleChange}
            ></textarea>
          </div>

          <div className="col-md-6 mb-3">
            <label>Upload Profile Photo</label>
            <input
              type="file"
              className="form-control"
              name="photo"
              accept="image/*"
              onChange={handleChange}
            />
          </div>
        </div>

        <button className="btn btn-success" type="submit">
          Register Student
        </button>
      </form>
      <ToastContainer />
    </div>
  );
};

export default RegisterStudent;
