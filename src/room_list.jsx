import React from 'react';
import rooms from './rooms';
import { Lock, Clock, Check } from 'lucide-react';

function RoomList({ onSelectRoom }) {
    // Map trạng thái phòng sang class màu của Bootstrap
    const getColorClass = (status) => {
        switch (status) {
            case 'available':
                return 'bg-success';
            case 'locked':
                return 'bg-danger';
            case 'pending':
                return 'bg-warning';
            default:
                return 'bg-secondary';
        }
    };

    // Icon lucide-react – có thể dùng size thay vì className
    const getIcon = (status) => {
        switch (status) {
            case 'available':
                return <Check size={20} />;
            case 'locked':
                return <Lock size={20} />;
            case 'pending':
                return <Clock size={20} />;
            default:
                return null;
        }
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
                                room.status
                            )}`}
                            onClick={() => onSelectRoom(room)}
                            disabled={room.status === 'locked'}
                            style={{
                                transition: 'transform 0.2s',
                            }}
                            onMouseOver={(e) => (e.currentTarget.style.transform = 'scale(1.05)')}
                            onMouseOut={(e) => (e.currentTarget.style.transform = 'scale(1)')}
                        >
                            {room.name}
                            <div className="mt-2">{getIcon(room.status)}</div>
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default RoomList;
