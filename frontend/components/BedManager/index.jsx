// src/components/BedManager/index.jsx
import React from "react";
import BedCard from "../BedCard";

const BedManager = ({ beds, onAssign, onVacate }) => (
  <div className="row">
    {beds.map((bed) => (
      <div className="col-md-3" key={bed.id}>
        <BedCard bed={bed} onAssign={onAssign} onVacate={onVacate} />
      </div>
    ))}
  </div>
);
export default BedManager;
