"use client";

import { useEffect, useState } from "react";
import { Calendar, Clock, Edit, Trash2 } from "lucide-react";

export default function AvailableTimeSlots({ doctorId }) {
  const [slots, setSlots] = useState({});
  const [loading, setLoading] = useState(true);
  const [editSlot, setEditSlot] = useState(null);
  const [day, setDay] = useState("");
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");

  const to12Hour = (timeStr) => {
    if (!timeStr) return "";
    const [h, m] = timeStr.split(":");
    const hour = parseInt(h, 10);
    const suffix = hour >= 12 ? "PM" : "AM";
    const hour12 = ((hour + 11) % 12) + 1;
    return `${hour12.toString().padStart(2, "0")}:${m} ${suffix}`;
  };

  const orderedDays = [
    "monday",
    "tuesday",
    "wednesday",
    "thursday",
    "friday",
    "saturday",
    "sunday",
  ];

  // Fetch slots
useEffect(() => {
  if (!doctorId) return;
  const fetchSlots = async () => {
    try {
      const res = await fetch(`/api/doctors-slots/${doctorId}`);
      const data = await res.json();
      setSlots(data || {});
    } catch (err) {
      console.error("Error loading slots:", err);
    } finally {
      setLoading(false);
    }
  };
  fetchSlots();
}, [doctorId]);


  // Add or update slot
  const handleSave = async () => {
    if (!day || !start || !end) return;

    const updated = {
      ...slots,
      [day]: `${start}-${end}`,
    };

    try {
      await fetch(`/api/doctors-slots/${doctorId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ workingHours: updated }),
      });
      setSlots(updated);
      setEditSlot(null);
    } catch (err) {
      console.error("Failed to save slot:", err);
    }
  };

  // Delete slot
  const handleDelete = async (dayKey) => {
    try {
      await fetch(`/api/doctors-slots/${doctorId}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ day: dayKey }),
      });

      const updated = { ...slots };
      delete updated[dayKey];
      setSlots(updated);
    } catch (err) {
      console.error("Failed to delete slot:", err);
    }
  };

  if (loading) return <p>Loading slots...</p>;

  return (
    <div className="bg-[var(--sidebar-bg)] p-6 rounded-xl shadow-md w-full">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
        <h2 className="text-xl font-semibold flex items-center gap-2 text-[var(--fourground-color)]">
          <Clock className="w-5 h-5 text-[var(--fourground-color)]" />
          Available Time Slots
        </h2>
        <button
          className="btn btn-sm md:btn-md bg-[var(--dashboard-blue)] text-white border-none hover:opacity-90 flex items-center gap-2"
          onClick={() => {
            setEditSlot({});
            setDay("monday");
            setStart("");
            setEnd("");
          }}
        >
          <span className="text-lg">+</span>
          Add New Slot
        </button>
      </div>

      {/* Slots Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {orderedDays.map((dayKey) => {
          const timeRange = slots[dayKey];
          if (!timeRange) return null;
          const [start24, end24] = timeRange.split("-");
          return (
            <div
              key={dayKey}
              className="border rounded-xl p-5 bg-white shadow-sm hover:shadow-lg transition flex flex-col justify-between"
            >
              {/* Day Header */}
              <div className="flex items-center gap-2 mb-3">
                <div className="bg-[var(--dashboard-blue)] text-white p-2 rounded-lg">
                  <Calendar className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg capitalize text-gray-600">{dayKey}</h3>
                  <p className="text-xs text-gray-500">Weekly Schedule</p>
                </div>
              </div>

              {/* Times */}
              <div className="text-sm space-y-2 mb-4">
                <p className="flex justify-between">
                  <span className="text-gray-500">Start Time</span>
                  <span className="font-medium text-gray-600">{to12Hour(start24)}</span>
                </p>
                <p className="flex justify-between">
                  <span className="text-gray-500">End Time</span>
                  <span className="font-medium text-gray-600">{to12Hour(end24)}</span>
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex justify-end gap-2">
                <button
                  className="btn btn-xs bg-blue-100 text-blue-600 hover:bg-blue-200 border-none rounded-lg flex items-center gap-1"
                  onClick={() => {
                    setEditSlot({ day: dayKey, time: timeRange });
                    setDay(dayKey);
                    setStart(start24);
                    setEnd(end24);
                  }}
                >
                  <Edit className="w-4 h-4" />
                  Edit
                </button>
                <button
                  className="btn btn-xs bg-red-100 text-red-600 hover:bg-red-200 border-none rounded-lg flex items-center gap-1"
                  onClick={() => handleDelete(dayKey)}
                >
                  <Trash2 className="w-4 h-4" />
                  Delete
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Edit/Add Modal */}
      {editSlot && (
        <dialog className="modal modal-open">
          <div className="modal-box max-w-md">
            <h3 className="font-bold text-lg flex items-center gap-2 mb-2 bg-[var(--sidebar-bg)] text-[var(--fourground-color)]">
              <Edit className="w-5 h-5 text-blue-500" />
              {editSlot.day ? "Edit Time Slot" : "Add New Slot"}
            </h3>
            <p className="text-sm text-gray-400 mb-4">
              {editSlot.day
                ? "Update the selected time slot details."
                : "Add a new available time slot."}
            </p>

            <form className="space-y-3">
              {/* Day of Week */}
              <div>
                <label className="block text-sm font-medium mb-1">
                  Day of Week
                </label>
                <select
                  value={day}
                  onChange={(e) => setDay(e.target.value)}
                  className="select select-bordered w-full"
                >
                  {orderedDays.map((d) => (
                    <option key={d} value={d}>
                      {d.charAt(0).toUpperCase() + d.slice(1)}
                    </option>
                  ))}
                </select>
              </div>

              {/* Start and End Time */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Start Time
                  </label>
                  <input
                    type="time"
                    value={start}
                    onChange={(e) => setStart(e.target.value)}
                    className="input input-bordered w-full"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">
                    End Time
                  </label>
                  <input
                    type="time"
                    value={end}
                    onChange={(e) => setEnd(e.target.value)}
                    className="input input-bordered w-full"
                  />
                </div>
              </div>
            </form>

            {/* Actions */}
            <div className="modal-action">
              <button
                className="btn btn-sm"
                onClick={() => setEditSlot(null)}
              >
                Cancel
              </button>
              <button
                className="btn btn-sm bg-blue-500 text-white hover:bg-blue-600"
                onClick={handleSave}
              >
                Save
              </button>
            </div>
          </div>
        </dialog>
      )}
    </div>
  );
}
