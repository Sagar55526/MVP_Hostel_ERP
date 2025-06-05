import React, { useEffect, useState } from "react";
import {
  getFloors,
  getRooms,
  getBeds,
  createRoom,
} from "../features/infrastructure/infraAPI";

const Rooms = () => {
  const [floors, setFloors] = useState([]);
  const [rooms, setRooms] = useState([]);
  const [form, setForm] = useState({ name: "", floor_id: "", capacity: "" });

  // This version enriches each floor with rooms and their beds
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

  // Load rooms whenever a floor is selected
  useEffect(() => {
    if (!form.floor_id) return;

    const loadRoomsForFloor = async () => {
      try {
        const roomsData = await getRooms(form.floor_id);
        const enrichedRooms = await Promise.all(
          roomsData.map(async (room) => {
            const beds = await getBeds(room.id);
            return {
              ...room,
              capacity: beds.length,
              occupancy: beds.filter((b) => b.student !== null).length,
            };
          })
        );
        setRooms(enrichedRooms);
      } catch (err) {
        console.error("Failed to fetch rooms", err);
      }
    };

    loadRoomsForFloor();
  }, [form.floor_id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  useEffect(() => {
    loadFloors();
  }, []);

  const handleAddRoom = async (e) => {
    e.preventDefault();
    const { name, floor_id, capacity } = form;
    if (!name || !floor_id || !capacity) return alert("Please fill all fields");

    try {
      await createRoom({ name, floor_id, capacity: Number(capacity) });
      setForm({ name: "", floor_id: "", capacity: "" });

      // Reload floors so newly added room appears
      await loadFloors();
    } catch (err) {
      console.error("Failed to add room", err);
      alert("Failed to add room");
    }
  };

  return (
    <div className="container my-5">
      <h3 className="mb-4">Rooms Dashboard</h3>

      {/* Add Form */}
      <div className="card p-4 shadow-sm">
        <h4>Add New Room</h4>
        <form onSubmit={handleAddRoom}>
          <div className="mb-3">
            <label className="form-label">Room Name</label>
            <input
              type="text"
              name="name"
              value={form.name}
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
      {floors.map((floor) => (
        <div key={floor.id} className="floor-section card shadow-sm p-3 mt-3">
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

export default Rooms;
