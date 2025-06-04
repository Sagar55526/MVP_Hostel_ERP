// src/pages/StudentProfile.jsx
import React, { useState, useEffect } from "react";
import FloorSelector from "../components/FloorSelector";
import RoomSelector from "../components/RoomSelector";
import BedManager from "../components/BedManager";
import AssignStudentModal from "../components/AssignStudentModal";
import {
  getFloors,
  getRooms,
  getBeds,
} from "../features/infrastructure/infraAPI";

const StudentProfile = () => {
  const [floors, setFloors] = useState([]);
  const [rooms, setRooms] = useState([]);
  const [beds, setBeds] = useState([]);
  const [selectedFloor, setSelectedFloor] = useState("");
  const [selectedRoom, setSelectedRoom] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [selectedBedId, setSelectedBedId] = useState(null);

  useEffect(() => {
    console.log("Selected Floor:", selectedFloor);
    console.log("Rooms:", rooms);
  }, [rooms]);

  useEffect(() => {
    console.log("Selected Room:", selectedRoom);
    console.log("Beds:", beds);
  }, [beds]);

  useEffect(() => {
    getFloors().then(setFloors);
  }, []);

  useEffect(() => {
    if (selectedFloor) getRooms(selectedFloor).then(setRooms);
  }, [selectedFloor]);

  useEffect(() => {
    if (selectedRoom) getBeds(selectedRoom).then(setBeds);
  }, [selectedRoom]);

  const handleAssignClick = (bedId) => {
    setSelectedBedId(bedId);
    setShowModal(true);
  };

  const handleAssignStudent = ({ bedId, student }) => {
    // Simulate assigning student (replace with API later)
    setBeds((prev) =>
      prev.map((bed) => (bed.id === bedId ? { ...bed, student } : bed))
    );
  };

  const handleVacate = (bedId) => {
    setBeds((prev) =>
      prev.map((bed) => (bed.id === bedId ? { ...bed, student: null } : bed))
    );
  };

  return (
    <div className="container">
      <h2 className="mb-4">Manage Bed Assignments</h2>
      <FloorSelector
        floors={floors}
        selectedFloor={selectedFloor}
        onChange={setSelectedFloor}
      />
      <RoomSelector
        rooms={rooms}
        selectedRoom={selectedRoom}
        onChange={setSelectedRoom}
      />
      <BedManager
        beds={beds}
        onAssign={handleAssignClick}
        onVacate={handleVacate}
      />

      <AssignStudentModal
        show={showModal}
        bedId={selectedBedId}
        onClose={() => setShowModal(false)}
        onSubmit={handleAssignStudent}
      />
    </div>
  );
};

export default StudentProfile;
