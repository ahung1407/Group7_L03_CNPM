import React, { useState } from 'react';

function RoomDetail({ room, onBack, onUpdateTimeSlots }) {
    const [timeSlots, setTimeSlots] = useState(room.slots);
    const [selectedSlot, setSelectedSlot] = useState(null);

    const handleClickSlot = (slot) => {
        setSelectedSlot(slot);
    };

    const updateSlotStatus = (newStatus) => {
        if (!selectedSlot) return;

        const updatedSlots = timeSlots.map((slot) =>
            slot.id === selectedSlot.id ? { ...slot, status: newStatus } : slot
        );

        setTimeSlots(updatedSlots);
        setSelectedSlot({ ...selectedSlot, status: newStatus });

        onUpdateTimeSlots(room.id, updatedSlots);
    };

    const handleReserve = () => updateSlotStatus('Reserved');
    const handleCancel = () => updateSlotStatus('Available');

    return (
        <div>
            {/* Header */}
            <div className="d-flex justify-content-between align-items-center mb-3">
                <button
                    onClick={onBack}
                    className="text-muted bg-transparent border-0"
                    style={{ cursor: 'pointer' }}
                >
                    &larr; Back
                </button>
                <h2 className="fs-4 fw-bold text-danger flex-fill text-center">
                    ROOM LIST - {room.name}
                </h2>
                <div style={{ width: '40px' }} />
            </div>

            <div className="row g-4">
                {/* Danh sách khung giờ */}
                <div className="col-4">
                    {timeSlots.map((slot) => {
                        const isSelected = selectedSlot && selectedSlot.id === slot.id;

                        let bgColor = '#f8f9fa';
                        if (slot.status === 'Reserved') bgColor = '#ffd6d6';
                        else if (slot.status === 'Available') bgColor = '#d1e7dd';
                        else if (slot.status === 'Maintained') bgColor = '#e2e3e5';

                        const border = isSelected ? '2px solid #f39c12' : '1px solid #ccc';
                        if (isSelected) bgColor = '#fffbe6';

                        return (
                            <div
                                key={slot.id}
                                className="px-3 py-2 rounded text-center fw-medium mb-2"
                                style={{ cursor: 'pointer', border, backgroundColor: bgColor }}
                                onClick={() => handleClickSlot(slot)}
                            >
                                {slot.range}
                            </div>
                        );
                    })}

                    {/* Checkbox Maintained */}
                    <div className="form-check mt-4">
                        <input
                            className="form-check-input"
                            type="checkbox"
                            id="maintainCheckbox"
                            checked={selectedSlot?.status === 'Maintained'}
                            onChange={(e) => {
                                if (!selectedSlot) return;
                                const newStatus = e.target.checked ? 'Maintained' : 'Available';
                                updateSlotStatus(newStatus);
                            }}
                            disabled={!selectedSlot}
                        />
                        <label className="form-check-label ms-2" htmlFor="maintainCheckbox">
                            Maintained
                        </label>
                    </div>
                </div>

                {/* Chi tiết + nút điều khiển */}
                <div className="col-8 d-flex flex-column gap-3">
                    <div className="bg-light p-3 rounded shadow-sm">
                        <p className="mb-2 fw-medium">Room used for:</p>
                        <p className="text-muted">
                            {selectedSlot ? selectedSlot.description || 'No description' : '...'}
                        </p>
                    </div>

                    <div className="bg-light p-3 rounded shadow-sm">
                        <p className="mb-2 fw-medium">Status:</p>
                        {selectedSlot ? (
                            <p
                                className={
                                    selectedSlot.status === 'Available'
                                        ? 'text-success fw-semibold'
                                        : selectedSlot.status === 'Reserved'
                                            ? 'text-danger fw-semibold'
                                            : selectedSlot.status === 'Maintained'
                                                ? 'text-secondary fw-semibold'
                                                : 'text-warning fw-semibold'
                                }
                            >
                                {selectedSlot.status}
                            </p>
                        ) : (
                            <p className="text-muted">Chưa chọn khung giờ</p>
                        )}
                    </div>

                    <div className="d-flex gap-3">
                        <button
                            className={`btn fw-semibold ${selectedSlot?.status === 'Reserved' || selectedSlot?.status === 'Maintained'
                                ? 'btn-secondary'
                                : 'btn-danger'
                                }`}
                            onClick={handleReserve}
                            disabled={!selectedSlot || selectedSlot.status === 'Maintained'}
                        >
                            Reserve
                        </button>
                        <button
                            className={`btn fw-semibold ${selectedSlot?.status === 'Available' || selectedSlot?.status === 'Maintained'
                                ? 'btn-secondary'
                                : 'btn-danger'
                                }`}
                            onClick={handleCancel}
                            disabled={!selectedSlot || selectedSlot.status === 'Maintained'}
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default RoomDetail;
