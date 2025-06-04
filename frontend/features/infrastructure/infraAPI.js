// src/features/infrastructure/infraAPI.js

export const getFloors = async () => {
  return [
    { id: '1', name: 'Ground Floor' },
    { id: '2', name: 'First Floor' },
    { id: '3', name: 'Second Floor' },
  ];
};

export const getRooms = async (floorId) => {
  const rooms = {
    '1': [
      { id: '101', number: 'G101' },
      { id: '102', number: 'G102' },
    ],
    '2': [
      { id: '201', number: 'F201' },
      { id: '202', number: 'F202' },
    ],
    '3': [
      { id: '301', number: 'S301' },
      { id: '302', number: 'S302' },
    ],
  };
  return rooms[floorId] || [];
};

export const getBeds = async (roomId) => {
  const beds = {
    '101': [
      { id: '1', number: 'B1', student: null },
      { id: '2', number: 'B2', student: { id: 'S1', name: 'Aryan' } },
    ],
    '102': [
      { id: '3', number: 'B1', student: null },
      { id: '4', number: 'B2', student: null },
    ],
    '201': [
      { id: '5', number: 'B1', student: { id: 'S2', name: 'Priya' } },
      { id: '6', number: 'B2', student: { id: 'S3', name: 'Ravi' } },
    ],
    '301': [
      { id: '7', number: 'B1', student: null },
      { id: '8', number: 'B2', student: null },
      { id: '9', number: 'B3', student: { id: 'S4', name: 'Neha' } },
    ],
  };
  return beds[roomId] || [];
};
