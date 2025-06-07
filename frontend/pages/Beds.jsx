import React, { useState, useEffect } from "react";
import FloorSelector from "../components/FloorSelector";
import RoomSelector from "../components/RoomSelector";
import BedManager from "../components/BedManager";
import AssignStudentModal from "../components/AssignStudentModal";

const Beds = () => {
  const [floors, setFloors] = useState([]);
  const [rooms, setRooms] = useState([]);
  const [beds, setBeds] = useState([]);
  const [selectedFloor, setSelectedFloor] = useState("");
  const [selectedRoom, setSelectedRoom] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [selectedBedId, setSelectedBedId] = useState(null);

  // Load floors once (static)
  useEffect(() => {
    fetch("http://localhost:5000/floorsOnly")
      .then((res) => res.json())
      .then((data) => setFloors(data))
      .catch((err) => console.error("Failed to load floors:", err));
  }, []);

  // Update rooms when floor changes
  useEffect(() => {
    if (selectedFloor) {
      fetch(`http://localhost:5000/rooms/floor/${selectedFloor}`)
        .then((res) => res.json())
        .then((data) => {
          setRooms(data);
          setSelectedRoom("");
          setBeds([]);
        })
        .catch((err) => console.error("Failed to load rooms:", err));
    } else {
      setRooms([]);
      setSelectedRoom("");
      setBeds([]);
    }
  }, [selectedFloor]);

  // Update beds when room changes
  useEffect(() => {
    if (selectedRoom) {
      fetch(`http://localhost:5000/beds/room/${selectedRoom}`)
        .then((res) => res.json())
        .then((data) => setBeds(data))
        .catch((err) => console.error("Failed to load beds:", err));
    } else {
      setBeds([]);
    }
  }, [selectedRoom]);

  const handleAssignClick = (bedId) => {
    setSelectedBedId(bedId);
    setShowModal(true);
  };

  // Dummy assign handler (frontend only)
  const handleAssignStudent = ({ bedId, student }) => {
    setBeds((prev) =>
      prev.map((bed) => (bed.id === bedId ? { ...bed, student: student } : bed))
    );
    setShowModal(false);
  };

  // Dummy vacate handler (frontend only)
  const handleVacate = (bedId) => {
    setBeds((prev) =>
      prev.map((bed) => (bed.id === bedId ? { ...bed, student: null } : bed))
    );
  };

  return (
    <div className="container my-5">
      <h3 className="mb-4">Manage Bed Assignments (Frontend Only)</h3>
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

export default Beds;
