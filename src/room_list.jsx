import React from 'react';
import { Lock, Check } from 'lucide-react'; // Icon

function RoomList({ rooms, onSelectRoom }) {
    // Xác định màu dựa trên danh sách slot
    const getColorClass = (slots) => {
        const hasAvailable = slots.some(slot => slot.status === 'Available');
        return hasAvailable ? 'bg-success' : 'bg-danger';
    };

    // Xác định icon
    const getIcon = (slots) => {
        const hasAvailable = slots.some(slot => slot.status === 'Available');
        return hasAvailable ? <Check size={20} /> : <Lock size={20} />;
    };

    return (
        <div>
            {/* Tiêu đề */}
            <h2 className="fw-bold text-center text-danger mb-4">ROOM LIST</h2>

            {/* Tạo row 4 cột (g-3 = gap-3) */}
            <div className="row row-cols-4 g-3">
                {rooms.map((room) => (
                    <div className="col" key={room.id}>
                        <button
                            className={`w-100 rounded p-4 d-flex flex-column justify-content-center align-items-center text-white fw-semibold fs-5 border-0 ${getColorClass(
                                room.slots
                            )}`}
                            onClick={() => onSelectRoom(room)}
                            //disabled={!room.slots.some(slot => slot.status === 'Available')}
                            style={{
                                transition: 'transform 0.2s',
                            }}
                            onMouseOver={(e) => (e.currentTarget.style.transform = 'scale(1.05)')}
                            onMouseOut={(e) => (e.currentTarget.style.transform = 'scale(1)')}
                        >
                            {room.name}
                            <div className="mt-2">{getIcon(room.slots)}</div>
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default RoomList;
