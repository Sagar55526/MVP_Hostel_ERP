// src/components/BedCard/index.jsx
import React from "react";

const BedCard = ({ bed, onAssign, onVacate }) => {
  const isOccupied = bed.student;

  return (
    <div
      className={`card mb-2 ${isOccupied ? "border-danger" : "border-success"}`}
    >
      <div className="card-body">
        <h6>Bed No: {bed.number}</h6>
        {isOccupied ? (
          <>
            <p className="text-danger">Occupied</p>
            <p>Student: {bed.student.name}</p>
            <button
              className="btn btn-sm btn-warning"
              onClick={() => onVacate(bed.id)}
            >
              Vacate
            </button>
          </>
        ) : (
          <>
            <p className="text-success">Available</p>
            <button
              className="btn btn-sm btn-primary"
              onClick={() => onAssign(bed.id)}
            >
              Assign
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default BedCard;
