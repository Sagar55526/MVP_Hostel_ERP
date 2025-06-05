// src/features/infrastructure/infraAPI.js

export const getFloors = async () => {
  const response = await fetch("http://localhost:5000/api/floors");
  if (!response.ok) throw new Error("Failed to fetch floors");
  return response.json();
};

export const getRooms = async (floorId) => {
  const response = await fetch(`http://localhost:5000/api/rooms/${floorId}`);
  if (!response.ok) throw new Error("Failed to fetch rooms");
  return response.json();
};

export const getBeds = async (roomId) => {
  const response = await fetch(`http://localhost:5000/api/beds/${roomId}`);
  if (!response.ok) throw new Error("Failed to fetch beds");
  return response.json();
};

export const assignBed = async (bedId, studentId) => {
  const res = await fetch("http://localhost:5000/api/assign-bed", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ bedId, studentId }),
  });
  return await res.json();
};

export const vacateBed = async (bedId) => {
  const res = await fetch(`http://localhost:5000/api/vacate-bed/${bedId}`, {
    method: "POST",
  });
  return await res.json();
};

export const createRoom = async ({ name, floor_id, capacity }) => {
  const res = await fetch("http://localhost:5000/api/rooms", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, floor_id, capacity }),
  });
  if (!res.ok) throw new Error("Failed to add room");
  return await res.json();
};