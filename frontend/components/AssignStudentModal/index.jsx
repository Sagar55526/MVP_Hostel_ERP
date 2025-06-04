// src/components/AssignStudentModal.jsx
import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const AssignStudentModal = ({ show, onClose, onSubmit, bedId }) => {
  const navigate = useNavigate();
  const [isNew, setIsNew] = useState(false);
  const [existingStudentId, setExistingStudentId] = useState("");
  const [newStudent, setNewStudent] = useState({
    name: "",
    email: "",
    rollNo: "",
  });

  const handleSubmit = () => {
    const student = isNew
      ? { ...newStudent, id: Date.now().toString() } // Temporary ID for demo
      : { id: existingStudentId, name: "Demo Student" }; // Replace later with real fetch

    onSubmit({ bedId, student });
    onClose();
    resetForm();
  };

  const resetForm = () => {
    setIsNew(false);
    setExistingStudentId("");
    setNewStudent({ name: "", email: "", rollNo: "" });
  };

  return (
    <Modal show={show} onHide={onClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Assign Student to Bed #{bedId}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group>
            <Form.Check
              type="checkbox"
              label="Register new student"
              checked={isNew}
              onChange={() => setIsNew(!isNew)}
            />
          </Form.Group>

          {isNew ? (
            <>
              <Form.Group className="mt-2">
                <Form.Label>Student Name</Form.Label>
                <Form.Control
                  type="text"
                  value={newStudent.name}
                  onChange={(e) =>
                    setNewStudent({ ...newStudent, name: e.target.value })
                  }
                  required
                />
              </Form.Group>
              <Form.Group className="mt-2">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  value={newStudent.email}
                  onChange={(e) =>
                    setNewStudent({ ...newStudent, email: e.target.value })
                  }
                />
              </Form.Group>
              <Form.Group className="mt-2">
                <Form.Label>Roll No</Form.Label>
                <Form.Control
                  type="text"
                  value={newStudent.rollNo}
                  onChange={(e) =>
                    setNewStudent({ ...newStudent, rollNo: e.target.value })
                  }
                />
              </Form.Group>
            </>
          ) : (
            <Form.Group className="mt-2">
              <Form.Label>Select Existing Student</Form.Label>
              <Form.Select
                value={existingStudentId}
                onChange={(e) => setExistingStudentId(e.target.value)}
              >
                <option value="">-- Select Student --</option>
                <option value="1">Aman Sharma (ID: 1)</option>
                <option value="2">Priya Patel (ID: 2)</option>
                <option value="2">sagar ahire (ID: 3)</option>
              </Form.Select>
            </Form.Group>
          )}
        </Form>
      </Modal.Body>
      <div className="modal-footer">
        <button className="btn btn-secondary" onClick={onClose}>
          Cancel
        </button>
        <button
          className="btn btn-success"
          onClick={() => navigate("/register-student")}
        >
          Register New Student
        </button>
      </div>
    </Modal>
  );
};

export default AssignStudentModal;
