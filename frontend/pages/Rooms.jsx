import React, { useState, useEffect } from "react";

const Rooms = () => {
  // Existing rooms data with floor, type, occupancy, capacity (total beds)
  const [rooms, setRooms] = useState([
    { id: 101, floor: "Floor 1", occupancy: 1, capacity: 2 },
    { id: 102, floor: "Floor 1", occupancy: 3, capacity: 3 },
  ]);

  // For the new room form
  const [form, setForm] = useState({
    id: "",
    floor: "",
    capacity: "",
  });

  // Floors list for dropdown — in real app fetch from backend
  const floors = ["Floor 1", "Floor 2", "Floor 3"];

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  // Add new room
  const handleAddRoom = (e) => {
    e.preventDefault();

    if (!form.id || !form.floor || !form.capacity) {
      alert("Please fill all fields");
      return;
    }

    // Check if room with same ID already exists
    if (rooms.find((r) => r.id === Number(form.id))) {
      alert("Room with this ID already exists.");
      return;
    }

    const newRoom = {
      id: Number(form.id),
      floor: form.floor,
      occupancy: 0, // New room initially empty
      capacity: Number(form.capacity),
    };

    setRooms((prev) => [...prev, newRoom]);
    setForm({ id: "", floor: "", capacity: "" });
  };

  return (
    <div className="container my-5">
      <h3 className="mb-4">Rooms Dashboard</h3>

      {/* Rooms table */}
      <table className="table table-bordered mb-5">
        <thead>
          <tr>
            <th>Room ID</th>
            <th>Floor</th>
            <th>Occupancy</th>
            <th>Capacity (Beds)</th>
            <th>Available Beds</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {rooms.length === 0 ? (
            <tr>
              <td colSpan="7" className="text-center">
                No rooms found.
              </td>
            </tr>
          ) : (
            rooms.map((room) => (
              <tr key={room.id}>
                <td>{room.id}</td>
                <td>{room.floor}</td>
                <td>{room.occupancy}</td>
                <td>{room.capacity}</td>
                <td>{room.capacity - room.occupancy}</td>
                <td>
                  <button className="btn btn-primary btn-sm me-2">Edit</button>
                  <button className="btn btn-danger btn-sm">Delete</button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      {/* Add Room Form */}
      <div className="card p-4 shadow-sm">
        <h4>Add New Room</h4>
        <form onSubmit={handleAddRoom}>
          <div className="mb-3">
            <label className="form-label">Room ID / Number</label>
            <input
              type="number"
              className="form-control"
              name="id"
              value={form.id}
              onChange={handleChange}
              placeholder="e.g., 103"
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Floor</label>
            <select
              className="form-select"
              name="floor"
              value={form.floor}
              onChange={handleChange}
              required
            >
              <option value="">Select Floor</option>
              {floors.map((floor) => (
                <option key={floor} value={floor}>
                  {floor}
                </option>
              ))}
            </select>
          </div>

          <div className="mb-3">
            <label className="form-label">Total Beds Capacity</label>
            <input
              type="number"
              className="form-control"
              name="capacity"
              value={form.capacity}
              onChange={handleChange}
              min="1"
              required
            />
          </div>

          <button className="btn btn-success" type="submit">
            Add Room
          </button>
        </form>
      </div>
    </div>
  );
};

export default Rooms;
