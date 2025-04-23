import React, { useState } from 'react';
import { Lock, Check } from 'lucide-react';

function RoomList({ rooms, onSelectRoom }) {
    const [searchText, setSearchText] = useState('');
    const [filterType, setFilterType] = useState('All');

    const getColorClass = (slots) => {
        const hasAvailable = slots.some((slot) => slot.status === 'Available');
        return hasAvailable ? 'border-green-500' : 'border-red-500';
    };

    const getIcon = (slots) => {
        const hasAvailable = slots.some((slot) => slot.status === 'Available');
        return hasAvailable ? <Check size={20} className="text-green-600" /> : <Lock size={20} className="text-red-500" />;
    };

    const countAvailable = (slots) => slots.filter((slot) => slot.status === 'Available').length;

    const roomTypes = ['All', ...new Set(rooms.map((room) => room.description || 'Unknown'))];

    const filteredRooms = rooms
        .filter((room) => room.name.toLowerCase().includes(searchText.toLowerCase()))
        .filter((room) =>
            filterType === 'All'
                ? true
                : (room.description || '').toLowerCase().includes(filterType.toLowerCase())
        )
        .sort((a, b) => a.name.localeCompare(b.name));

    return (
        <div className="w-full px-4">
            <h2 className="text-2xl font-bold text-center text-blue-700 mb-6">ROOM LIST</h2>

            {/* Search and filter */}
            <div className="flex flex-col md:flex-row justify-center items-center gap-4 mb-6">
                <input
                    type="text"
                    className="w-full max-w-md px-4 py-2 border rounded shadow-sm"
                    placeholder="Search room..."
                    value={searchText}
                    onChange={(e) => setSearchText(e.target.value)}
                />
                <select
                    className="w-full max-w-xs px-4 py-2 border rounded shadow-sm"
                    value={filterType}
                    onChange={(e) => setFilterType(e.target.value)}
                >
                    {roomTypes.map((type, index) => (
                        <option key={index} value={type}>
                            {type}
                        </option>
                    ))}
                </select>
            </div>

            {/* Room list */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredRooms.map((room) => {
                    const available = countAvailable(room.slots);
                    return (
                        <div
                            key={room.id}
                            className={`border-2 ${getColorClass(
                                room.slots
                            )} rounded-lg shadow-md transition-transform duration-200 hover:scale-[1.02] cursor-pointer`}
                            onClick={() => onSelectRoom(room)}
                        >
                            <div className="p-4 flex justify-between items-center">
                                <div>
                                    <h5 className="text-lg font-semibold mb-1">{room.name}</h5>
                                    <span className="inline-block text-sm bg-gray-200 text-gray-700 px-2 py-0.5 rounded">
                                        {available === 0
                                            ? 'No slot left'
                                            : `${available} slot${available > 1 ? 's' : ''} available`}
                                    </span>
                                    <div className="text-sm italic text-gray-500 mt-1">{room.description}</div>
                                </div>
                                <div>{getIcon(room.slots)}</div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

export default RoomList;
