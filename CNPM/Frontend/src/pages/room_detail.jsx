import React, { useState } from 'react';
import { AlertCircle, CheckCircle, Wrench } from 'lucide-react';

function RoomDetail({ roomList, onBack, onUpdateTimeSlot }) {
    const [selectedSlot, setSelectedSlot] = useState(null);

    const handleClickSlot = (slot) => {
        setSelectedSlot(slot);
    };

    const updateSlotStatus = (newStatus) => {
        if (!selectedSlot) return;
        const updatedSlot = { ...selectedSlot, status: newStatus };
        setSelectedSlot(updatedSlot);
        onUpdateTimeSlot(updatedSlot);
    };

    const handleCancel = () => {
        updateSlotStatus('Available');
    };

    const getStatusIcon = (status) => {
        switch (status) {
            case 'Available': return <CheckCircle className="text-green-600 mr-2" size={18} />;
            case 'Booked': return <AlertCircle className="text-red-500 mr-2" size={18} />;
            case 'Maintenance': return <Wrench className="text-gray-500 mr-2" size={18} />;
            default: return null;
        }
    };

    const getStatusClass = (status) => {
        switch (status) {
            case 'Available': return 'bg-green-100 border border-green-400';
            case 'Booked': return 'bg-red-100 border border-red-400';
            case 'Maintenance': return 'bg-gray-100 border border-gray-400';
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
                <h2 className="text-xl font-bold text-blue-600 text-center flex-grow">
                    {roomList[0]?.classId || 'Room'}
                </h2>
                <div className="w-20" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Slot List */}
                <div className="flex flex-col gap-2">
                    {roomList.map((slot) => {
                        const isSelected = selectedSlot?._id === slot._id;
                        const highlight = isSelected ? 'border-2 border-yellow-400 shadow' : '';
                        return (
                            <div
                                key={slot._id}
                                className={`flex items-center rounded px-3 py-2 cursor-pointer transition ${getStatusClass(slot.status)} ${highlight}`}
                                onClick={() => handleClickSlot(slot)}
                            >
                                {getStatusIcon(slot.status)}
                                <span className="flex-grow font-medium">{slot.timeSlot}</span>
                            </div>
                        );
                    })}

                    {/* Maintenance checkbox */}
                    <div className="mt-4">
                        <label className="flex items-center space-x-2">
                            <input
                                type="checkbox"
                                className="form-checkbox rounded"
                                checked={selectedSlot?.status === 'Maintenance'}
                                onChange={(e) => updateSlotStatus(e.target.checked ? 'Maintenance' : 'Available')}
                                disabled={!selectedSlot}
                            />
                            <span className="text-sm">Mark as Maintained</span>
                        </label>
                    </div>
                </div>


                <div className="md:col-span-2 flex flex-col gap-4">
                    {/* Room Detail */}
                    <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 shadow-sm">
                        <h6 className="text-sm font-bold text-gray-900 mb-2">Room Detail</h6>
                        {selectedSlot ? (
                            <div className="space-y-2">
                                <div className="text-gray-700 text-sm">Campus: {selectedSlot.campus}</div>
                                <div className="text-gray-700 text-sm">Room used for: {selectedSlot.description}</div>
                                {/* <div className="text-gray-700 text-sm">
                                    Status:
                                    <span className={`ml-2 px-2 py-1 rounded text-white text-xs ${selectedSlot.status === 'Available'
                                        ? 'bg-green-500'
                                        : selectedSlot.status === 'Booked'
                                            ? 'bg-red-500'
                                            : 'bg-gray-500'
                                        }`}>
                                        {selectedSlot.status}
                                    </span>
                                </div> */}
                            </div>
                        ) : (
                            <div className="text-gray-400 text-sm">Select a time slot</div>
                        )}
                    </div>
                    {/* Slot Detail */}
                    <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 shadow-sm">
                        <h6 className="text-sm font-bold text-gray-900 mb-2">Slot Detail</h6>
                        {selectedSlot ? (
                            <div className="space-y-2">
                                <div className="text-gray-700 text-sm">Time: {selectedSlot.timeSlot}</div>
                                <div className="text-gray-700 text-sm">
                                    Status:
                                    <span className={`ml-2 px-2 py-1 rounded text-white text-xs ${selectedSlot.status === 'Available'
                                        ? 'bg-green-500'
                                        : selectedSlot.status === 'Booked'
                                            ? 'bg-red-500'
                                            : 'bg-gray-500'
                                        }`}>
                                        {selectedSlot.status}
                                    </span>
                                </div>
                            </div>
                        ) : (
                            <div className="text-gray-400 text-sm">Select a time slot</div>
                        )}
                    </div>

                    <div className="text-right">
                        <button
                            className="border border-red-500 text-red-500 hover:bg-red-100 transition px-4 py-2 rounded-lg text-sm"
                            onClick={handleCancel}
                            disabled={!selectedSlot || selectedSlot.status === 'Maintenance'}
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
