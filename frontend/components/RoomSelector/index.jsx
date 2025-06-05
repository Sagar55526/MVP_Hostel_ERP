import React from "react";

const RoomSelector = ({ rooms, selectedRoom, onChange }) => {
  return (
    <div className="mb-3">
      <label className="form-label">Select Room</label>
      <select
        className="form-select"
        value={selectedRoom}
        onChange={(e) => onChange(e.target.value)}
      >
        <option value="">-- Select Room --</option>
        {rooms.map((room) => (
          <option key={room.id} value={room.id}>
            {room.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default RoomSelector;
