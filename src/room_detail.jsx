import React, { useState } from 'react';
import { AlertCircle, CheckCircle, Wrench } from 'lucide-react';

function RoomDetail({ room, onBack, onUpdateTimeSlots }) {
    const [timeSlots, setTimeSlots] = useState(room.slots);
    const [selectedSlot, setSelectedSlot] = useState(null);

    const handleClickSlot = (slot) => setSelectedSlot(slot);

    const updateSlotStatus = (newStatus) => {
        if (!selectedSlot) return;
        const updatedSlots = timeSlots.map((slot) =>
            slot.id === selectedSlot.id ? { ...slot, status: newStatus } : slot
        );
        setTimeSlots(updatedSlots);
        setSelectedSlot({ ...selectedSlot, status: newStatus });
        onUpdateTimeSlots(room.id, updatedSlots);
    };

    const handleCancel = () => updateSlotStatus('Available');

    const getStatusIcon = (status) => {
        switch (status) {
            case 'Available': return <CheckCircle className="text-green-600 mr-2" size={18} />;
            case 'Reserved': return <AlertCircle className="text-red-500 mr-2" size={18} />;
            case 'Maintained': return <Wrench className="text-gray-500 mr-2" size={18} />;
            default: return null;
        }
    };

    const getStatusClass = (status) => {
        switch (status) {
            case 'Available': return 'bg-green-100 border border-green-400';
            case 'Reserved': return 'bg-red-100 border border-red-400';
            case 'Maintained': return 'bg-gray-100 border border-gray-400';
            default: return 'bg-white border';
        }
    };

    return (
        <div className="px-4">
            {/* Header */}
            <div className="flex justify-between items-center mb-6">
                <button onClick={onBack} className="text-gray-600 border px-3 py-1 rounded hover:bg-gray-100">
                    &larr; Back
                </button>
                <h2 className="text-xl font-bold text-blue-600 text-center flex-grow">{room.name}</h2>
                <div className="w-20" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Slot List */}
                <div className="flex flex-col gap-2">
                    {timeSlots.map((slot) => {
                        const isSelected = selectedSlot?.id === slot.id;
                        const highlight = isSelected ? 'border-2 border-yellow-400 shadow' : '';
                        return (
                            <div
                                key={slot.id}
                                className={`flex items-center rounded px-3 py-2 cursor-pointer transition ${getStatusClass(slot.status)} ${highlight}`}
                                onClick={() => handleClickSlot(slot)}
                            >
                                {getStatusIcon(slot.status)}
                                <span className="flex-grow font-medium">{slot.range}</span>
                            </div>
                        );
                    })}

                    {/* Maintained checkbox */}
                    <div className="mt-4">
                        <label className="flex items-center space-x-2">
                            <input
                                type="checkbox"
                                className="form-checkbox rounded"
                                checked={selectedSlot?.status === 'Maintained'}
                                onChange={(e) => updateSlotStatus(e.target.checked ? 'Maintained' : 'Available')}
                                disabled={!selectedSlot}
                            />
                            <span className="text-sm">Mark as Maintained</span>
                        </label>
                    </div>
                </div>

                {/* Slot Detail */}
                <div className="md:col-span-2 flex flex-col gap-4">
                    <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 shadow-sm">
                        <div className="flex items-center gap-2">
                            <h6 className="text-sm font-medium text-gray-900 mb-0">Room used for:</h6>
                            <p className="text-sm text-gray-800">{room.description || 'No description'}</p>
                        </div>
                    </div>

                    <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 shadow-sm">
                        <div className="flex items-center gap-2">
                            <h6 className="text-sm font-medium text-gray-900 mb-0">Status:</h6>
                            <p className="font-semibold">
                                {selectedSlot ? (
                                    <span className={`px-3 py-1 rounded text-white text-sm ${selectedSlot.status === 'Available'
                                        ? 'bg-green-500'
                                        : selectedSlot.status === 'Reserved'
                                            ? 'bg-red-500'
                                            : 'bg-gray-500'
                                        }`}>
                                        {selectedSlot.status}
                                    </span>
                                ) : (
                                    <p className="text-gray-500 text-sm ">Select slot</p>
                                )}
                            </p>
                        </div>
                    </div>

                    {selectedSlot?.status === 'Reserved' && (
                        <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 shadow-sm">
                            <h6 className="text-sm font-medium text-gray-700 mb-2">Booking Details</h6>
                            <div className="space-y-1">
                                <div className="flex items-center gap-2">
                                    <span className="text-sm text-gray-500">Name:</span>
                                    <span className="text-sm text-gray-800">{selectedSlot.book || 'No name provided'}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <span className="text-sm text-gray-500">Student ID:</span>
                                    <span className="text-sm text-gray-800">{selectedSlot.book || 'No ID provided'}</span>
                                </div>
                            </div>
                        </div>
                    )}

                    <div className="text-right">
                        <button
                            className="border border-red-500 text-red-500 hover:bg-red-100 transition px-4 py-2 rounded-lg text-sm"
                            onClick={handleCancel}
                            disabled={!selectedSlot || selectedSlot.status === 'Maintained'}
                        >
                            Cancel Reservation
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default RoomDetail;
