import React, { useState, useEffect } from 'react';
import RoomList from './room_list';
import RoomDetail from './room_detail';
import axios from 'axios';

function App() {
  const [rooms, setRooms] = useState([]);
  const [selectedRoom, setSelectedRoom] = useState(null);

  useEffect(() => {
    axios
      .get('http://localhost:5000/api/rooms')
      .then((response) => setRooms(response.data))
      .catch((error) => console.error('Error fetching rooms:', error));
  }, []);

  const handleUpdateTimeSlots = async (roomId, updatedSlots) => {
    try {
      const response = await axios.put(`http://localhost:5000/api/rooms/${roomId}/slots`, {
        slots: updatedSlots,
      });
      const updatedRoom = response.data;
      setRooms((prevRooms) =>
        prevRooms.map((room) => (room.id === roomId ? updatedRoom : room))
      );
      if (selectedRoom && selectedRoom.id === roomId) {
        setSelectedRoom(updatedRoom);
      }
    } catch (error) {
      console.error('Error updating slots:', error);
    }
  };

  return (
    <div className="d-flex min-vh-100" style={{ background: 'linear-gradient(to bottom right, #cce4f6, #bbc5f5)' }}>
      <aside className="bg-white border-end shadow p-4" style={{ width: '16rem', backdropFilter: 'blur(6px)', opacity: 0.9 }}>
        <h1 className="fs-2 fw-bolder text-primary mb-4">Admin</h1>
        <nav className="d-flex flex-column gap-3">
          <div className="text-primary fw-medium cursor-pointer">Dashboard</div>
          {/*<div className="text-secondary cursor-pointer">Rooms</div>
          <div className="text-secondary cursor-pointer">Statistics</div>
          <div className="text-secondary cursor-pointer">Settings</div>*/}
        </nav>
      </aside>
      <main className="flex-grow-1 px-4 py-4 overflow-auto">
        <div className="mx-auto shadow-lg rounded-4 p-4" style={{ maxWidth: '80%', background: 'rgba(255,255,255,0.95)', backdropFilter: 'blur(4px)' }}>
          {!selectedRoom ? (
            <RoomList rooms={rooms} onSelectRoom={setSelectedRoom} />
          ) : (
            <RoomDetail room={selectedRoom} onBack={() => setSelectedRoom(null)} onUpdateTimeSlots={handleUpdateTimeSlots} />
          )}
        </div>
      </main>
    </div>
  );
}

export default App;