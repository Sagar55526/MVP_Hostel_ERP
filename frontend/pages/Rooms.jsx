import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Rooms.css";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaPlus } from "react-icons/fa";

const Rooms = () => {
  const [form, setForm] = useState({ room_no: "", floor_id: "", capacity: "" });
  const [floors, setFloors] = useState([]);

  // Fetch floors from backend on component mount
  useEffect(() => {
    fetchFloors();
  }, []);

  const fetchFloors = async () => {
    try {
      const res = await fetch("http://localhost:5000/floors");
      if (!res.ok) throw new Error("Failed to fetch floors");
      const data = await res.json();
      setFloors(data.floors);
    } catch (err) {
      alert(err.message);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddRoom = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/rooms", form); // use full URL if CORS proxy isn't set
      toast.success("Room added successfully!");
      setForm({ name: "", floor_id: "", capacity: "" });
      fetchFloors();
    } catch (err) {
      if (err.response && err.response.data && err.response.data.error) {
        toast.error(err.response.data.error); // Show the specific error from backend
      } else {
        toast.error("Failed to add room");
      }
    }
  };

  return (
    <div className="container my-5">
      <ToastContainer />
      <h3 className="mb-4">Rooms Dashboard</h3>

      {/* Add Room Form */}
      <div className="card p-4 shadow-sm mb-4">
        <h4>Add New Room</h4>
        <form onSubmit={handleAddRoom}>
          <div className="mb-3">
            <label className="form-label">Room Number</label>
            <input
              type="text"
              name="room_no"
              value={form.room_no}
              onChange={handleChange}
              className="form-control"
              placeholder="e.g., 102A"
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Select Floor</label>
            <select
              name="floor_id"
              value={form.floor_id}
              onChange={handleChange}
              className="form-select"
              required
            >
              <option value="">Choose...</option>
              {floors.map((floor) => (
                <option key={floor.id} value={floor.id}>
                  {floor.name}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-3">
            <label className="form-label">Total Beds</label>
            <input
              type="number"
              name="capacity"
              value={form.capacity}
              onChange={handleChange}
              className="form-control"
              min={1}
              required
            />
          </div>
          <button type="submit" className="btn btn-success">
            Add Room
          </button>
        </form>
      </div>

      {/* Floor Layout */}
      {floors.length === 0 && (
        <p className="mt-3 text-muted">No floors found.</p>
      )}
      {floors.map((floor) => (
        <div
          key={floor.id}
          className="floor-container card mb-4 p-3 shadow-sm bg-light border"
        >
          <h5 className="mb-3 text-primary fw-bold">
            {floor.name} (Floor No: {floor.floor_no})
          </h5>

          <div className="room-row d-flex flex-wrap gap-3">
            {floor.rooms && floor.rooms.length > 0 ? (
              floor.rooms.map((room) => (
                <div
                  key={room.id}
                  className="room-card p-3 bg-white border rounded shadow-sm"
                  style={{ minWidth: "180px" }}
                >
                  <h6 className="mb-2 text-secondary">Room {room.room_no}</h6>
                  <div className="bed-grid d-flex flex-wrap gap-2">
                    {room.beds && room.beds.length > 0 ? (
                      room.beds.map((bed) => (
                        <div
                          key={bed.id}
                          className={`bed-box p-2 rounded text-center text-white fw-semibold shadow-sm ${
                            bed.status === "occupied"
                              ? "bg-danger"
                              : "bg-success"
                          }`}
                          title={
                            bed.student
                              ? `Occupied by ${bed.student.name}`
                              : "Available"
                          }
                          style={{
                            width: "40px",
                            height: "40px",
                            cursor: "pointer",
                          }}
                        >
                          {bed.bed_no}
                        </div>
                      ))
                    ) : (
                      <div className="text-muted">No beds</div>
                    )}
                  </div>
                </div>
              ))
            ) : (
              <div>
                <p className="text-muted">No rooms found.</p>
                {/* <button
                  className="btn btn-primary btn-sm"
                  onClick={() => {
                    window.location.href = `/rooms?floorId=${floor.id}`;
                  }}
                >
                  <FaPlus style={{ marginRight: "5px" }} />
                  Add Rooms
                </button> */}
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Rooms;
