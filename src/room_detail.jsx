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
            case 'Available':
                return <CheckCircle className="text-success me-2" size={18} />;
            case 'Reserved':
                return <AlertCircle className="text-danger me-2" size={18} />;
            case 'Maintained':
                return <Wrench className="text-secondary me-2" size={18} />;
            default:
                return null;
        }
    };

    const getStatusClass = (status) => {
        switch (status) {
            case 'Available': return 'bg-success-subtle border border-success';
            case 'Reserved': return 'bg-danger-subtle border border-danger';
            case 'Maintained': return 'bg-secondary-subtle border border-secondary';
            default: return 'bg-light border';
        }
    };

    return (
        <div>
            {/* Header */}
            <div className="d-flex justify-content-between align-items-center mb-4">
                <button onClick={onBack} className="btn btn-outline-secondary btn-sm">
                    &larr; Back
                </button>
                <h2 className="fs-4 fw-bold text-danger text-center flex-grow-1">{room.name}</h2>
                <div style={{ width: '80px' }} />
            </div>

            <div className="row g-4">
                {/* Slot List */}
                <div className="col-md-4">
                    <div className="d-flex flex-column gap-2">
                        {timeSlots.map((slot) => {
                            const isSelected = selectedSlot?.id === slot.id;
                            const highlight = isSelected ? 'border-2 border-warning shadow-sm' : '';
                            return (
                                <div
                                    key={slot.id}
                                    className={`d-flex align-items-center rounded px-3 py-2 ${getStatusClass(slot.status)} ${highlight}`}
                                    style={{ cursor: 'pointer', transition: '0.2s' }}
                                    onClick={() => handleClickSlot(slot)}
                                >
                                    {getStatusIcon(slot.status)}
                                    <span className="flex-grow-1 fw-medium">{slot.range}</span>
                                </div>
                            );
                        })}
                    </div>

                    {/* Maintained checkbox */}
                    <div className="form-check mt-4">
                        <input
                            className="form-check-input"
                            type="checkbox"
                            id="maintainCheckbox"
                            checked={selectedSlot?.status === 'Maintained'}
                            onChange={(e) =>
                                updateSlotStatus(e.target.checked ? 'Maintained' : 'Available')
                            }
                            disabled={!selectedSlot}
                        />
                        <label className="form-check-label ms-2" htmlFor="maintainCheckbox">
                            Mark as Maintained
                        </label>
                    </div>
                </div>

                {/* Slot Detail */}
                <div className="col-md-8 d-flex flex-column gap-3">
                    <div className="card shadow-sm">
                        <div className="card-body">
                            <h6 className="mb-2 fw-bold text-dark fs-6">Room used for:</h6>
                            <p className="text-muted">{room.description || 'No description'}</p>
                        </div>
                    </div>

                    <div className="card shadow-sm">
                        <div className="card-body">
                            <h6 className="mb-2 fw-bold text-dark fs-6">Status:</h6>
                            <p className="fw-semibold mb-0">
                                {selectedSlot ? (
                                    <span className={`badge fs-6 ${selectedSlot.status === 'Available'
                                        ? 'bg-success'
                                        : selectedSlot.status === 'Reserved'
                                            ? 'bg-danger'
                                            : 'bg-secondary'
                                        }`}>
                                        {selectedSlot.status}
                                    </span>
                                ) : (
                                    <span className="text-secondary">Select slot</span>
                                )}
                            </p>
                        </div>
                    </div>

                    <div className="text-end">
                        <button
                            className="btn btn-outline-danger"
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
