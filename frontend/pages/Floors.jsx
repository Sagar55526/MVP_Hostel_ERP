import React, { useState } from "react";
import "./Floors.css"; // We'll write custom styles here

const Floors = () => {
  const [floors, setFloors] = useState([
    {
      id: 1,
      name: "Floor 1",
      rooms: [
        { roomId: 101, totalBeds: 4, occupiedBeds: 2 },
        { roomId: 102, totalBeds: 3, occupiedBeds: 1 },
        { roomId: 103, totalBeds: 5, occupiedBeds: 5 },
      ],
    },
    {
      id: 2,
      name: "Floor 2",
      rooms: [
        { roomId: 201, totalBeds: 2, occupiedBeds: 1 },
        { roomId: 202, totalBeds: 4, occupiedBeds: 0 },
        { roomId: 203, totalBeds: 3, occupiedBeds: 3 },
      ],
    },
  ]);

  const [form, setForm] = useState({
    name: "",
    totalRooms: "",
    totalBeds: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddFloor = (e) => {
    e.preventDefault();
    if (!form.name) {
      alert("Please fill all fields");
      return;
    }

    const newRooms = Array.from(
      { length: Number(form.totalRooms) },
      (_, i) => ({
        roomId: Number(`${floors.length + 1}${i + 1}`),
        totalBeds: Math.floor(form.totalBeds / form.totalRooms),
        occupiedBeds: 0,
      })
    );

    const newFloor = {
      id: floors.length + 1,
      name: form.name,
      rooms: newRooms,
    };

    setFloors((prev) => [...prev, newFloor]);
    setForm({ name: "", totalRooms: "", totalBeds: "" });
  };

  return (
    <div className="container my-5">
      <h3 className="mb-4">Floors Dashboard</h3>

      {/* Floor Layout */}
      {floors.map((floor) => (
        <div key={floor.id} className="floor-section card shadow-sm p-3 mb-4">
          <h5 className="floor-title mb-3">{floor.name}</h5>
          <div className="floor-layout">
            {floor.rooms.map((room) => (
              <div key={room.roomId} className="room-card">
                <div className="room-header">Room {room.roomId}</div>
                <div className="beds-grid">
                  {Array.from({ length: room.totalBeds }).map((_, idx) => {
                    const isOccupied = idx < room.occupiedBeds;
                    return (
                      <div
                        key={idx}
                        className={`bed-box ${
                          isOccupied ? "occupied" : "vacant"
                        }`}
                        title={isOccupied ? "Occupied" : "Available"}
                      />
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}

      {/* Add new floor form */}
      <div className="card p-4 shadow-sm">
        <h4>Add New Floor</h4>
        <form onSubmit={handleAddFloor}>
          <div className="mb-3">
            <label className="form-label">Floor Name / Number</label>
            <input
              type="text"
              className="form-control"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="e.g., Floor 3"
              required
            />
          </div>

          <button className="btn btn-success" type="submit">
            Add Floor
          </button>
        </form>
      </div>
    </div>
  );
};

export default Floors;
