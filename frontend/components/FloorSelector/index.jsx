import React from "react";

const FloorSelector = ({ floors, selectedFloor, onChange }) => {
  return (
    <div className="mb-3">
      <label className="form-label">Select Floor</label>
      <select
        className="form-select"
        value={selectedFloor}
        onChange={(e) => onChange(e.target.value)}
      >
        <option value="">-- Select Floor --</option>
        {floors.map((floor) => (
          <option key={floor.id} value={floor.id}>
            {floor.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default FloorSelector;
