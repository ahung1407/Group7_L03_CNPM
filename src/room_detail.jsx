import React, { useState } from 'react';

function RoomDetail({ room, onBack }) {
    const [timeSlots, setTimeSlots] = useState([
        { id: 1, range: '7:00 - 9:00', status: 'Available', description: 'Khung giờ sáng' },
        { id: 2, range: '9:00 - 11:00', status: 'Reserved', description: 'Đã có lịch họp nhóm' },
        { id: 3, range: '11:00 - 13:00', status: 'Available', description: '' },
        { id: 4, range: '13:00 - 15:00', status: 'Available', description: '' },
        { id: 5, range: '15:00 - 17:00', status: 'Reserved', description: '' },
        { id: 6, range: '17:00 - 19:00', status: 'Available', description: '' },
        { id: 7, range: '19:00 - 21:00', status: 'Available', description: '' },
    ]);

    const [selectedSlot, setSelectedSlot] = useState(null);

    // Chọn slot khi bấm
    const handleClickSlot = (slot) => {
        setSelectedSlot(slot);
    };

    // Khi bấm "Reserve" -> chuyển slot được chọn sang "Reserved" (màu đỏ nhạt)
    const handleReserve = () => {
        if (!selectedSlot) return;

        const updatedSlots = timeSlots.map((slot) =>
            slot.id === selectedSlot.id
                ? { ...slot, status: 'Reserved' }
                : slot
        );

        setTimeSlots(updatedSlots);
        setSelectedSlot({
            ...selectedSlot,
            status: 'Reserved',
        });
    };

    // Khi bấm "Cancel" -> chuyển slot được chọn sang "Available" (màu xanh nhạt)
    const handleCancel = () => {
        if (!selectedSlot) return;

        const updatedSlots = timeSlots.map((slot) =>
            slot.id === selectedSlot.id
                ? { ...slot, status: 'Canceled' }
                : slot
        );

        setTimeSlots(updatedSlots);
        setSelectedSlot({
            ...selectedSlot,
            status: 'Available',
        });
    };

    const handleMaintain = () => {
        if (!selectedSlot) return;

        const updatedSlots = timeSlots.map((slot) =>
            slot.id === selectedSlot.id
                ? { ...slot, status: 'Maintained' }
                : slot
        );

        setTimeSlots(updatedSlots);
        setSelectedSlot({
            ...selectedSlot,
            status: 'Maintained',
        });
    };

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
                {/* Cột trái: danh sách time slots */}
                <div className="col-4">
                    {timeSlots.map((slot) => {
                        const isSelected = selectedSlot && selectedSlot.id === slot.id;

                        let bgColor = '#f8f9fa';
                        if (slot.status === 'Reserved') bgColor = '#ffd6d6';
                        else if (slot.status === 'Available') bgColor = '#d1e7dd';
                        else if (slot.status === 'Maintained') bgColor = '#e2e3e5'; // maintained: xám nhạt

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

                    {/* Nút Maintained */}
                    <button
                        className="btn btn-warning fw-semibold mt-4"
                        style={{ width: '100%' }}
                        onClick={handleMaintain}
                        disabled={!selectedSlot || selectedSlot.status === 'Maintained'}
                    >
                        Maintained
                    </button>
                </div>

                {/* Cột phải: hiển thị detail slot, nút Reserve/Cancel */}
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
