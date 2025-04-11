import React from 'react';

function RoomDetail({ room, onBack }) {
    const timeSlots = [
        '7:00 - 9:00',
        '9:00 - 11:00',
        '11:00 - 13:00',
        '13:00 - 15:00',
        '15:00 - 17:00',
        '17:00 - 19:00',
        '19:00 - 21:00',
    ];

    return (
        <div>
            {/* Header: Back Button, Title */}
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
                {/* Khoảng trống thay cho .w-10 */}
                <div style={{ width: '40px' }} />
            </div>

            <div className="row g-4">
                {/* Cột trái: danh sách time slots */}
                <div className="col-4">
                    {timeSlots.map((slot) => (
                        <div
                            key={slot}
                            className="px-3 py-2 bg-light rounded text-center fw-medium mb-2"
                        >
                            {slot}
                        </div>
                    ))}
                </div>

                {/* Cột phải: thông tin + nút Reserve/Cancel */}
                <div className="col-8 d-flex flex-column gap-3">
                    <div className="bg-light p-3 rounded shadow-sm">
                        <p className="mb-2 fw-medium">Room used for:</p>
                        <p className="text-muted">....</p>
                    </div>
                    <div className="bg-light p-3 rounded shadow-sm">
                        <p className="mb-2 fw-medium">Status:</p>
                        <p className="text-success fw-semibold">Available</p>
                    </div>
                    <div className="d-flex gap-3">
                        <button className="btn btn-danger fw-semibold">Reserve</button>
                        <button className="btn btn-secondary fw-semibold">Cancel</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default RoomDetail;
