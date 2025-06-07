import React, { useState, useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaPlus } from "react-icons/fa";
import "./Floors.css";

const Floors = () => {
  const [floors, setFloors] = useState([]);
  const [floorName, setFloorName] = useState("");
  const [floorNo, setFloorNo] = useState("");
  const hostelId = 1;

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

  const handleAddFloor = async (e) => {
    e.preventDefault();
    if (!floorName || !floorNo) {
      toast.error("Please enter floor name and floor number"); // Use toast here too for consistency
      return;
    }
    try {
      const res = await fetch("http://localhost:5000/api/floors", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          hostel_id: hostelId,
          floor_no: parseInt(floorNo, 10),
          name: floorName,
        }),
      });
      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.error || "Failed to add floor");
      }
      setFloorName("");
      setFloorNo("");
      fetchFloors(); // refresh floor list
      toast.success("Floor added successfully!");
    } catch (err) {
      toast.error(err.message); // Show error in toast instead of alert
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
            <label className="form-label">Floor Number</label>
            <input
              type="number"
              className="form-control"
              value={floorNo}
              onChange={(e) => setFloorNo(e.target.value)}
              placeholder="e.g., 1"
              required
            />
          </div>
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
                <button
                  className="btn btn-primary btn-sm"
                  onClick={() => {
                    window.location.href = `/rooms?floorId=${floor.id}`;
                  }}
                >
                  <FaPlus style={{ marginRight: "5px" }} />
                  Add Rooms
                </button>
              </div>
            )}
          </div>
        </div>
      ))}
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
      />
    </div>
  );
};

export default Floors;
