// App.jsx
import React, { useState } from "react";
import RoomList from "./room_list";
import RoomDetail from "./room_detail";

function App() {
  const [selectedRoom, setSelectedRoom] = useState(null);

  return (
    <div
      className="d-flex min-vh-100"
      style={{
        // Thay thế gradient Tailwind bằng inline style
        background: "linear-gradient(to bottom right, #cce4f6, #bbc5f5)",
      }}
    >
      {/* Sidebar */}
      <aside
        className="bg-white border-end shadow p-4"
        style={{
          width: "16rem",
          // Tương đương backdrop-blur & opacity
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
            <RoomList onSelectRoom={(room) => setSelectedRoom(room)} />
          ) : (
            <RoomDetail room={selectedRoom} onBack={() => setSelectedRoom(null)} />
          )}
        </div>
      </main>
    </div>
  );
}

export default App;
