import React from "react";

const BedCard = ({ bed, onAssign, onVacate }) => {
  const isOccupied = bed.student;

  return (
    <div
      className={`card mb-2 ${isOccupied ? "border-danger" : "border-success"}`}
    >
      <div className="card-body">
        <h5 className="card-title">Bed No: {bed.bed_no}</h5>

        {isOccupied ? (
          <>
            <p className="text-danger fw-bold">Occupied</p>
            <p>
              <strong>Student Name:</strong> {bed.student.name}
              <br />
              <strong>ID:</strong> {bed.student.studentId}
            </p>
            <button
              className="btn btn-sm btn-warning"
              onClick={() => onVacate(bed.id)}
            >
              Vacate
            </button>
          </>
        ) : (
          <>
            <p className="text-success fw-bold">Available</p>
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
