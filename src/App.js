import React, { useState } from "react";
import RoomList from "./room_list";
import RoomDetail from "./room_detail";

function App() {
  const [rooms, setRooms] = useState([
    {
      id: 1,
      name: "Room1",
      slots: [
        { id: 1, range: "7:00 - 9:00", status: "Available" },
        { id: 2, range: "9:00 - 11:00", status: "Reserved" },
        { id: 3, range: "11:00 - 13:00", status: "Available" },
        { id: 4, range: "13:00 - 15:00", status: "Maintained" },
        { id: 5, range: "15:00 - 17:00", status: "Reserved" },
        { id: 6, range: "17:00 - 19:00", status: "Available" },
        { id: 7, range: "19:00 - 21:00", status: "Available" },
      ],
    },
    {
      id: 2,
      name: "Room2",
      slots: [
        { id: 1, range: "7:00 - 9:00", status: "Reserved" },
        { id: 2, range: "9:00 - 11:00", status: "Reserved" },
        { id: 3, range: "11:00 - 13:00", status: "Maintained" },
        { id: 4, range: "13:00 - 15:00", status: "Reserved" },
        { id: 5, range: "15:00 - 17:00", status: "Reserved" },
        { id: 6, range: "17:00 - 19:00", status: "Maintained" },
        { id: 7, range: "19:00 - 21:00", status: "Reserved" },
      ],
    },
    {
      id: 3,
      name: "Room3",
      slots: [
        { id: 1, range: "7:00 - 9:00", status: "Available" },
        { id: 2, range: "9:00 - 11:00", status: "Available" },
        { id: 3, range: "11:00 - 13:00", status: "Available" },
        { id: 4, range: "13:00 - 15:00", status: "Available" },
        { id: 5, range: "15:00 - 17:00", status: "Available" },
        { id: 6, range: "17:00 - 19:00", status: "Available" },
        { id: 7, range: "19:00 - 21:00", status: "Available" },
      ],
    },
    {
      id: 4,
      name: "Room4",
      slots: [
        { id: 1, range: "7:00 - 9:00", status: "Maintained" },
        { id: 2, range: "9:00 - 11:00", status: "Maintained" },
        { id: 3, range: "11:00 - 13:00", status: "Reserved" },
        { id: 4, range: "13:00 - 15:00", status: "Reserved" },
        { id: 5, range: "15:00 - 17:00", status: "Reserved" },
        { id: 6, range: "17:00 - 19:00", status: "Maintained" },
        { id: 7, range: "19:00 - 21:00", status: "Reserved" },
      ],
    },
    {
      id: 5,
      name: "Room5",
      slots: [
        { id: 1, range: "7:00 - 9:00", status: "Maintained" },
        { id: 2, range: "9:00 - 11:00", status: "Maintained" },
        { id: 3, range: "11:00 - 13:00", status: "Reserved" },
        { id: 4, range: "13:00 - 15:00", status: "Reserved" },
        { id: 5, range: "15:00 - 17:00", status: "Reserved" },
        { id: 6, range: "17:00 - 19:00", status: "Maintained" },
        { id: 7, range: "19:00 - 21:00", status: "Reserved" },
      ],
    },
    {
      id: 6,
      name: "Room6",
      slots: [
        { id: 1, range: "7:00 - 9:00", status: "Maintained" },
        { id: 2, range: "9:00 - 11:00", status: "Available" },
        { id: 3, range: "11:00 - 13:00", status: "Reserved" },
        { id: 4, range: "13:00 - 15:00", status: "Reserved" },
        { id: 5, range: "15:00 - 17:00", status: "Reserved" },
        { id: 6, range: "17:00 - 19:00", status: "Maintained" },
        { id: 7, range: "19:00 - 21:00", status: "Reserved" },
      ],
    },
    {
      id: 7,
      name: "Room7",
      slots: [
        { id: 1, range: "7:00 - 9:00", status: "Maintained" },
        { id: 2, range: "9:00 - 11:00", status: "Maintained" },
        { id: 3, range: "11:00 - 13:00", status: "Reserved" },
        { id: 4, range: "13:00 - 15:00", status: "Reserved" },
        { id: 5, range: "15:00 - 17:00", status: "Reserved" },
        { id: 6, range: "17:00 - 19:00", status: "Maintained" },
        { id: 7, range: "19:00 - 21:00", status: "Reserved" },
      ],
    },
    {
      id: 8,
      name: "Room8",
      slots: [
        { id: 1, range: "7:00 - 9:00", status: "Maintained" },
        { id: 2, range: "9:00 - 11:00", status: "Maintained" },
        { id: 3, range: "11:00 - 13:00", status: "Reserved" },
        { id: 4, range: "13:00 - 15:00", status: "Reserved" },
        { id: 5, range: "15:00 - 17:00", status: "Reserved" },
        { id: 6, range: "17:00 - 19:00", status: "Maintained" },
        { id: 7, range: "19:00 - 21:00", status: "Reserved" },
      ],
    },
    {
      id: 9,
      name: "Room9",
      slots: [
        { id: 1, range: "7:00 - 9:00", status: "Maintained" },
        { id: 2, range: "9:00 - 11:00", status: "Maintained" },
        { id: 3, range: "11:00 - 13:00", status: "Reserved" },
        { id: 4, range: "13:00 - 15:00", status: "Reserved" },
        { id: 5, range: "15:00 - 17:00", status: "Available" },
        { id: 6, range: "17:00 - 19:00", status: "Maintained" },
        { id: 7, range: "19:00 - 21:00", status: "Reserved" },
      ],
    },
    {
      id: 10,
      name: "Room10",
      slots: [
        { id: 1, range: "7:00 - 9:00", status: "Maintained" },
        { id: 2, range: "9:00 - 11:00", status: "Maintained" },
        { id: 3, range: "11:00 - 13:00", status: "Reserved" },
        { id: 4, range: "13:00 - 15:00", status: "Available" },
        { id: 5, range: "15:00 - 17:00", status: "Reserved" },
        { id: 6, range: "17:00 - 19:00", status: "Maintained" },
        { id: 7, range: "19:00 - 21:00", status: "Reserved" },
      ],
    },
    {
      id: 11,
      name: "Room11",
      slots: [
        { id: 1, range: "7:00 - 9:00", status: "Maintained" },
        { id: 2, range: "9:00 - 11:00", status: "Maintained" },
        { id: 3, range: "11:00 - 13:00", status: "Reserved" },
        { id: 4, range: "13:00 - 15:00", status: "Reserved" },
        { id: 5, range: "15:00 - 17:00", status: "Reserved" },
        { id: 6, range: "17:00 - 19:00", status: "Maintained" },
        { id: 7, range: "19:00 - 21:00", status: "Reserved" },
      ],
    },
    {
      id: 12,
      name: "Room12",
      slots: [
        { id: 1, range: "7:00 - 9:00", status: "Maintained" },
        { id: 2, range: "9:00 - 11:00", status: "Maintained" },
        { id: 3, range: "11:00 - 13:00", status: "Reserved" },
        { id: 4, range: "13:00 - 15:00", status: "Available" },
        { id: 5, range: "15:00 - 17:00", status: "Reserved" },
        { id: 6, range: "17:00 - 19:00", status: "Maintained" },
        { id: 7, range: "19:00 - 21:00", status: "Available" },
      ],
    },
  ]);

  const [selectedRoom, setSelectedRoom] = useState(null);

  // Cập nhật slot của phòng
  const handleUpdateTimeSlots = (roomId, updatedSlots) => {
    const updatedRooms = rooms.map((room) =>
      room.id === roomId ? { ...room, slots: updatedSlots } : room
    );
    setRooms(updatedRooms);

    // Nếu phòng đang xem là phòng vừa update => cập nhật lại selectedRoom
    const updatedRoom = updatedRooms.find((room) => room.id === roomId);
    setSelectedRoom(updatedRoom);
  };

  return (
    <div
      className="d-flex min-vh-100"
      style={{
        background: "linear-gradient(to bottom right, #cce4f6, #bbc5f5)",
      }}
    >
      {/* Sidebar */}
      <aside
        className="bg-white border-end shadow p-4"
        style={{
          width: "16rem",
          backdropFilter: "blur(6px)",
          opacity: 0.9,
        }}
      >
        <h1 className="fs-2 fw-bolder text-primary mb-4">C7 Admin</h1>
        <nav className="d-flex flex-column gap-3">
          <div className="text-primary fw-medium cursor-pointer">Dashboard</div>
          <div className="text-secondary cursor-pointer">Rooms</div>
          <div className="text-secondary cursor-pointer">Statistics</div>
          <div className="text-secondary cursor-pointer">Settings</div>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-grow-1 px-4 py-4 overflow-auto">
        <div
          className="mx-auto shadow-lg rounded-4 p-4"
          style={{
            maxWidth: "80%",
            background: "rgba(255,255,255,0.95)",
            backdropFilter: "blur(4px)",
          }}
        >
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
