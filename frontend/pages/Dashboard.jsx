import React, { useState, useEffect } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
} from "recharts";

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("bedTrends");
  const [selectedFloor, setSelectedFloor] = useState("All");
  const [selectedRoomType, setSelectedRoomType] = useState("All");

  const bedData = [
    { date: "2025-05-01", occupied: 70, available: 130 },
    { date: "2025-05-02", occupied: 75, available: 125 },
    { date: "2025-05-03", occupied: 80, available: 120 },
    { date: "2025-05-04", occupied: 78, available: 122 },
    { date: "2025-05-05", occupied: 82, available: 118 },
    { date: "2025-05-06", occupied: 85, available: 115 },
    { date: "2025-05-07", occupied: 90, available: 110 },
  ];

  const floorData = [
    { floor: "Floor 1", totalBeds: 40, occupiedBeds: 35 },
    { floor: "Floor 2", totalBeds: 35, occupiedBeds: 28 },
    { floor: "Floor 3", totalBeds: 30, occupiedBeds: 25 },
    { floor: "Floor 4", totalBeds: 35, occupiedBeds: 32 },
  ];

  const roomTypeData = [
    { name: "1-Sharing", value: 25, color: "#8884d8" },
    { name: "2-Sharing", value: 45, color: "#82ca9d" },
    { name: "3-Sharing", value: 20, color: "#ffc658" },
    { name: "4-Sharing", value: 10, color: "#ff8042" },
  ];

  const filteredFloorData =
    selectedFloor === "All"
      ? floorData
      : floorData.filter((f) => f.floor === selectedFloor);

  const filteredRoomTypeData =
    selectedRoomType === "All"
      ? roomTypeData
      : roomTypeData.filter((r) => r.name === selectedRoomType);

  return (
    <div className="container my-4">
      <h2 className="mb-4">📊 Dashboard</h2>

      {/* Summary Cards */}
      <div className="row mb-5">
        <div className="col-md-4">
          <div className="card text-white bg-success mb-3">
            <div className="card-body">
              <h5 className="card-title">Available Beds</h5>
              <p className="card-text fs-3">120 🟩</p>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card text-white bg-danger mb-3">
            <div className="card-body">
              <h5 className="card-title">Occupied Beds</h5>
              <p className="card-text fs-3">80 🟥</p>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card bg-light mb-3">
            <div className="card-body">
              <h5 className="card-title">Total Floors</h5>
              <p className="card-text fs-3">10</p>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <ul className="nav nav-tabs mb-4">
        <li className="nav-item">
          <button
            className={`nav-link ${activeTab === "bedTrends" ? "active" : ""}`}
            onClick={() => setActiveTab("bedTrends")}
          >
            🛏️ Bed Trends
          </button>
        </li>
        <li className="nav-item">
          <button
            className={`nav-link ${activeTab === "floorStats" ? "active" : ""}`}
            onClick={() => setActiveTab("floorStats")}
          >
            🏢 Floor Stats
          </button>
        </li>
        <li className="nav-item">
          <button
            className={`nav-link ${activeTab === "roomTypes" ? "active" : ""}`}
            onClick={() => setActiveTab("roomTypes")}
          >
            🧾 Room Types
          </button>
        </li>
      </ul>

      {/* Filters */}
      {activeTab === "floorStats" && (
        <div className="mb-3">
          <label className="me-2">Filter by Floor:</label>
          <select
            value={selectedFloor}
            onChange={(e) => setSelectedFloor(e.target.value)}
            className="form-select w-auto d-inline-block"
          >
            <option>All</option>
            {floorData.map((f) => (
              <option key={f.floor}>{f.floor}</option>
            ))}
          </select>
        </div>
      )}

      {activeTab === "roomTypes" && (
        <div className="mb-3">
          <label className="me-2">Filter by Room Type:</label>
          <select
            value={selectedRoomType}
            onChange={(e) => setSelectedRoomType(e.target.value)}
            className="form-select w-auto d-inline-block"
          >
            <option>All</option>
            {roomTypeData.map((r) => (
              <option key={r.name}>{r.name}</option>
            ))}
          </select>
        </div>
      )}

      {/* Visuals by tab */}
      {activeTab === "bedTrends" && (
        <ResponsiveContainer width="100%" height={500}>
          <LineChart data={bedData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis allowDecimals={false} />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="occupied" stroke="#ff4d4d" />
            <Line type="monotone" dataKey="available" stroke="#4caf50" />
          </LineChart>
        </ResponsiveContainer>
      )}

      {activeTab === "floorStats" && (
        <ResponsiveContainer width="100%" height={500}>
          <BarChart data={filteredFloorData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="floor" />
            <YAxis allowDecimals={false} />
            <Tooltip />
            <Legend />
            <Bar dataKey="totalBeds" fill="#8884d8" />
            <Bar dataKey="occupiedBeds" fill="#ff4d4d" />
          </BarChart>
        </ResponsiveContainer>
      )}

      {activeTab === "roomTypes" && (
        <ResponsiveContainer width="100%" height={500}>
          <PieChart>
            <Pie
              data={filteredRoomTypeData}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={150}
              label
            >
              {filteredRoomTypeData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      )}
    </div>
  );
};

export default Dashboard;
