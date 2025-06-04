import React, { useState, useEffect } from "react";

const Floors = () => {
  // Sample existing floors data with stats
  const [floors, setFloors] = useState([
    {
      id: 1,
      name: "Floor 1",
      totalRooms: 10,
      totalBeds: 50,
      occupiedBeds: 32,
    },
    {
      id: 2,
      name: "Floor 2",
      totalRooms: 8,
      totalBeds: 40,
      occupiedBeds: 18,
    },
  ]);

  const [form, setForm] = useState({
    name: "",
    totalRooms: "",
    totalBeds: "",
  });

  // Handle form inputs
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  // Add new floor
  const handleAddFloor = (e) => {
    e.preventDefault();
    if (!form.name || !form.totalRooms || !form.totalBeds) {
      alert("Please fill all fields");
      return;
    }

    const newFloor = {
      id: floors.length + 1, // For now local ID
      name: form.name,
      totalRooms: Number(form.totalRooms),
      totalBeds: Number(form.totalBeds),
      occupiedBeds: 0, // New floor starts with 0 occupied beds
    };

    setFloors((prev) => [...prev, newFloor]);
    setForm({ name: "", totalRooms: "", totalBeds: "" });
  };

  return (
    <div className="container my-5">
      <h3 className="mb-4">Floors Dashboard</h3>

      {/* Floor summary cards */}
      <div className="row mb-5">
        {floors.length === 0 ? (
          <p>No floors found.</p>
        ) : (
          floors.map((floor) => (
            <div className="col-md-4" key={floor.id}>
              <div className="card mb-3 shadow-sm">
                <div className="card-body">
                  <h5 className="card-title">{floor.name}</h5>
                  <p className="mb-1">Total Rooms: {floor.totalRooms}</p>
                  <p className="mb-1">Total Beds: {floor.totalBeds}</p>
                  <p className="mb-1">
                    Occupied Beds:{" "}
                    <span
                      className={
                        floor.occupiedBeds === 0
                          ? "text-success"
                          : "text-danger"
                      }
                    >
                      {floor.occupiedBeds}
                    </span>{" "}
                    / {floor.totalBeds}
                  </p>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

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

          <div className="mb-3">
            <label className="form-label">Total Rooms</label>
            <input
              type="number"
              className="form-control"
              name="totalRooms"
              value={form.totalRooms}
              onChange={handleChange}
              min="1"
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Total Beds Capacity</label>
            <input
              type="number"
              className="form-control"
              name="totalBeds"
              value={form.totalBeds}
              onChange={handleChange}
              min="1"
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
