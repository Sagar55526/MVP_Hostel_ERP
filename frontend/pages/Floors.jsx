import React, { useState, useEffect } from "react";
import {
  getFloors,
  getRooms,
  getBeds,
} from "../features/infrastructure/infraAPI";
import "./Floors.css";

const Floors = () => {
  const [floors, setFloors] = useState([]);
  const [floorName, setFloorName] = useState("");

  // Load all floors with nested rooms and beds
  const loadFloors = async () => {
    try {
      const floorsData = await getFloors();
      const enrichedFloors = await Promise.all(
        floorsData.map(async (floor) => {
          const roomsData = await getRooms(floor.id);
          const enrichedRooms = await Promise.all(
            roomsData.map(async (room) => {
              const bedsData = await getBeds(room.id);
              return { ...room, beds: bedsData };
            })
          );
          return { ...floor, rooms: enrichedRooms };
        })
      );
      setFloors(enrichedFloors);
    } catch (err) {
      console.error("Failed to load floors data:", err);
    }
  };

  useEffect(() => {
    loadFloors();
  }, []);

  // Add new floor (POST)
  const handleAddFloor = async (e) => {
    e.preventDefault();
    if (!floorName.trim()) {
      alert("Please enter a floor name");
      return;
    }

    try {
      const res = await fetch("http://localhost:5000/api/floors", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: floorName }),
      });

      if (!res.ok) throw new Error("Failed to add floor");

      setFloorName("");
      loadFloors(); // refresh list
    } catch (err) {
      console.error("Error adding floor:", err);
    }
  };

  return (
    <div className="container my-5">
      <h3 className="mb-4">Floors Dashboard</h3>

      {/* Add Floor Form */}
      <div className="card p-4 shadow-sm">
        <h4>Add New Floor</h4>
        <form onSubmit={handleAddFloor}>
          <div className="mb-3">
            <label className="form-label">Floor Name</label>
            <input
              type="text"
              className="form-control"
              value={floorName}
              onChange={(e) => setFloorName(e.target.value)}
              placeholder="e.g., Ground Floor"
              required
            />
          </div>
          <button className="btn btn-success" type="submit">
            Add Floor
          </button>
        </form>
      </div>

      {/* Floor Layout */}
      {floors.map((floor) => (
        <div
          key={floor.id}
          className="floor-section card shadow-sm p-3 mb-2 mt-3"
        >
          <h5 className="floor-title mb-3">{floor.name}</h5>
          <div className="floor-layout">
            {floor.rooms.map((room) => (
              <div key={room.id} className="room-card">
                <div className="room-header">Room {room.name}</div>
                <div className="beds-grid">
                  {room.beds.map((bed) => (
                    <div
                      key={bed.id}
                      className={`bed-box ${
                        bed.student ? "occupied" : "vacant"
                      }`}
                      title={
                        bed.student
                          ? `Occupied by ${bed.student.name}`
                          : "Available"
                      }
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Floors;
