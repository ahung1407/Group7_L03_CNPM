import React, { useState } from 'react';
import { Lock, Check } from 'lucide-react';

function RoomList({ rooms, onSelectRoom }) {
    const [searchText, setSearchText] = useState('');
    const [filterType, setFilterType] = useState('All');

    const getColorClass = (slots) => {
        const hasAvailable = slots.some(slot => slot.status === 'Available');
        return hasAvailable ? 'border-success' : 'border-danger';
    };

    const getIcon = (slots) => {
        const hasAvailable = slots.some(slot => slot.status === 'Available');
        return hasAvailable ? <Check size={20} className="text-success" /> : <Lock size={20} className="text-danger" />;
    };

    const countAvailable = (slots) => slots.filter(slot => slot.status === 'Available').length;

    // Danh sách loại phòng duy nhất từ dữ liệu
    const roomTypes = ['All', ...new Set(rooms.map(room => room.description || 'Unknown'))];

    const filteredRooms = rooms
        .filter(room => room.name.toLowerCase().includes(searchText.toLowerCase()))
        .filter(room =>
            filterType === 'All' ? true : (room.description || '').toLowerCase().includes(filterType.toLowerCase())
        )
        .sort((a, b) => a.name.localeCompare(b.name));

    return (
        <div className="container-fluid">
            <h2 className="fw-bold text-center text-danger mb-4">ROOM LIST</h2>

            {/* Tìm kiếm và lọc */}
            <div className="row mb-4 justify-content-center">
                <div className="col-md-5">
                    <input
                        type="text"
                        className="form-control shadow-sm"
                        placeholder="Search room..."
                        value={searchText}
                        onChange={(e) => setSearchText(e.target.value)}
                    />
                </div>
                <div className="col-md-3 mt-2 mt-md-0">
                    <select
                        className="form-select shadow-sm"
                        value={filterType}
                        onChange={(e) => setFilterType(e.target.value)}
                    >
                        {roomTypes.map((type, index) => (
                            <option key={index} value={type}>{type}</option>
                        ))}
                    </select>
                </div>
            </div>

            {/* Danh sách phòng */}
            <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
                {filteredRooms.map((room) => (
                    <div key={room.id} className="col">
                        <div
                            className={`card h-100 border-2 ${getColorClass(room.slots)} shadow-sm`}
                            style={{ cursor: 'pointer', transition: 'transform 0.2s' }}
                            onClick={() => onSelectRoom(room)}
                            onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.02)'}
                            onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}>
                            <div className="card-body d-flex justify-content-between align-items-center">
                                <div>
                                    <h5 className="card-title mb-1">{room.name}</h5>
                                    <span className="badge bg-light text-dark">
                                        {countAvailable(room.slots)} slots available
                                    </span>
                                    <div className="text-white-50 small fst-italic mt-1">{room.description}</div>
                                </div>
                                <div>{getIcon(room.slots)}</div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default RoomList;
