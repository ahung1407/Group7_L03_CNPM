import React, { useState, useEffect } from 'react';
import RoomList from './room_list.jsx';
import RoomDetail from './room_detail.jsx';
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
    <div className="flex min-h-screen bg-gradient-to-r from-blue-800 via-blue-100 to-white">
      {/* Sidebar */}
      <aside className="bg-white shadow-lg w-64 p-6 backdrop-blur-md bg-opacity-90">
        <h1 className="text-2xl font-bold text-blue-700 mb-6 text-center">Admin</h1>
        <nav className="flex flex-col gap-4">
          <div className="flex items-center gap-2 text-primary font-medium cursor-pointer">
            <img
              src="/hcmut.png"
              alt="HCMUT Logo"
              className="w-12 h-12 object-contain"
            />
            <span>HCMUT SMSR</span>
          </div>

          {/* <div className="text-gray-500 cursor-pointer">Rooms</div>
          <div className="text-gray-500 cursor-pointer">Statistics</div>
          <div className="text-gray-500 cursor-pointer">Settings</div> */}
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 px-6 py-6 overflow-auto">
        <div className="max-w-6xl mx-auto bg-white/90 backdrop-blur-md shadow-xl rounded-xl p-6">
          {!selectedRoom ? (
            <RoomList rooms={rooms} onSelectRoom={setSelectedRoom} />
          ) : (
            <RoomDetail
              room={selectedRoom}
              onBack={() => setSelectedRoom(null)}
              onUpdateTimeSlots={handleUpdateTimeSlots}
            />
          )}
        </div>
      </main>
    </div>
  );
}

export default App;
