"use client";

import { useEffect, useState } from "react";
import { Calendar, Clock, Edit, Trash2 } from "lucide-react";

export default function AvailableTimeSlots({ doctorId }) {
  const [slots, setSlots] = useState({
    workingHours: {},
    patientLimit: {},
    totalCapacity: {},
    meetLink: {},
  });
  const [loading, setLoading] = useState(true);
  const [editSlot, setEditSlot] = useState(null);
  const [day, setDay] = useState("");
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");

  const orderedDays = [
    "monday",
    "tuesday",
    "wednesday",
    "thursday",
    "friday",
    "saturday",
    "sunday",
  ];

  const to12Hour = (timeStr) => {
    if (!timeStr) return "";
    const [h, m] = timeStr.split(":");
    const hour = parseInt(h, 10);
    const suffix = hour >= 12 ? "PM" : "AM";
    const hour12 = ((hour + 11) % 12) + 1;
    return `${hour12.toString().padStart(2, "0")}:${m} ${suffix}`;
  };

  // 🟢 Fetch slots
  useEffect(() => {
    if (!doctorId) return;
    const fetchSlots = async () => {
      try {
        const res = await fetch(`/api/doctors-slots/${doctorId}`);
        const data = await res.json();

        if (res.ok) {
          setSlots({
            workingHours: data.workingHours || {},
            patientLimit: data.patientLimit || {},
            totalCapacity: data.totalCapacity || {},
            meetLink: data.meetLink || {},
          });
        } else {
          console.error("Error loading slots:", data.message);
        }
      } catch (err) {
        console.error("Error loading slots:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchSlots();
  }, [doctorId]);

  // 🟢 Save (Add/Edit)
  const handleSave = async () => {
    if (!day || !start || !end) return;

    const newWorkingHours = { ...slots.workingHours, [day]: `${start}-${end}` };
    const newPatientLimit = {
      ...slots.patientLimit,
      [day]: editSlot.limit || "10",
    };
    const newMeetLink = { ...slots.meetLink, [day]: editSlot.meetLink || "" };
    const newTotalCapacity = { ...slots.totalCapacity, [day]: editSlot.limit || "10" };

    try {
      await fetch(`/api/doctors-slots/${doctorId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          workingHours: newWorkingHours,
          patientLimit: newPatientLimit,
          meetLink: newMeetLink,
          totalCapacity: newTotalCapacity,
        }),
      });

      setSlots({
        workingHours: newWorkingHours,
        patientLimit: newPatientLimit,
        meetLink: newMeetLink,
        totalCapacity: newTotalCapacity,
      });
      setEditSlot(null);
    } catch (err) {
      console.error("Failed to save slot:", err);
    }
  };

  // 🟢 Delete
  const handleDelete = async (dayKey) => {
    try {
      await fetch(`/api/doctors-slots/${doctorId}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ day: dayKey }),
      });

      const updated = {
        workingHours: { ...slots.workingHours },
        patientLimit: { ...slots.patientLimit },
        meetLink: { ...slots.meetLink },
        totalCapacity: { ...slots.totalCapacity },
      };

      delete updated.workingHours[dayKey];
      delete updated.patientLimit[dayKey];
      delete updated.meetLink[dayKey];
      delete updated.totalCapacity[dayKey];

      setSlots(updated);
    } catch (err) {
      console.error("Failed to delete slot:", err);
    }
  };

  if (loading) return <p>Loading slots...</p>;

  return (
    <div className="lg:ml-5 bg-[var(--sidebar-bg)] p-6 rounded-xl shadow-md w-full">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
        <h2 className="text-xl font-semibold flex items-center gap-2 text-[var(--text-color-all)]">
          <Clock className="w-5 h-5 text-[var(--text-color-all)]" />
          Available Time Slots
        </h2>
        <button
          className="btn btn-sm md:btn-md bg-[var(--color-primary)] text-white border-none hover:opacity-90 flex items-center gap-2"
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
{Object.keys(slots.workingHours || {}).length === 0 ? (
  <p className="text-gray-400 text-center py-10">
    No slots added yet. Click <strong>“Add New Slot”</strong> to create one.
  </p>
) : (
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
    {orderedDays.map((dayKey) => {
      const timeRange = slots.workingHours?.[dayKey];
      if (!timeRange) return null;
      const [start24, end24] = timeRange.split("-");
      const limit = slots.patientLimit?.[dayKey] || "-";
      const meetLink = slots.meetLink?.[dayKey] || "—";

      return (
        <div
          key={dayKey}
          className="border rounded-xl p-5 bg-white shadow-sm hover:shadow-lg transition flex flex-col justify-between"
        >
          {/* Header */}
          <div className="flex items-center gap-2 mb-3">
            <div className="bg-[var(--color-primary)] text-white p-2 rounded-lg">
              <Calendar className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-semibold text-lg capitalize text-gray-600">{dayKey}</h3>
              <p className="text-xs text-gray-500">Weekly Schedule</p>
            </div>
          </div>

          {/* Details */}
          <div className="text-sm space-y-2 mb-4">
            <p className="flex justify-between">
              <span className="text-gray-500">Start Time</span>
              <span className="font-medium text-gray-600">{to12Hour(start24)}</span>
            </p>
            <p className="flex justify-between">
              <span className="text-gray-500">End Time</span>
              <span className="font-medium text-gray-600">{to12Hour(end24)}</span>
            </p>
            <p className="flex justify-between">
              <span className="text-gray-500">Patient Limit</span>
              <span className="font-medium text-gray-600">{limit}</span>
            </p>
            <p className="flex justify-between">
              <span className="text-gray-500">Meeting Link</span>
              <a
                href={meetLink}
                target="_blank"
                className="text-blue-500 underline truncate max-w-[150px]"
              >
                {meetLink}
              </a>
            </p>
          </div>

          {/* Buttons */}
          <div className="flex justify-end gap-2">
            <button
              className="btn btn-xs bg-blue-100 text-[var(--color-primary)] hover:bg-blue-200 border-none rounded-lg flex items-center gap-1"
              onClick={() => {
                setEditSlot({
                  day: dayKey,
                  time: timeRange,
                  limit: slots.patientLimit?.[dayKey],
                  meetLink: slots.meetLink?.[dayKey],
                });
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
)}


      {/* Modal */}
      {editSlot && (
        <dialog className="modal modal-open">
          <div className="modal-box max-w-md">
            <h3 className="font-bold text-lg flex items-center gap-2 mb-2">
              <Edit className="w-5 h-5 text-[var(--color-primary)]" />
              {editSlot.day ? "Edit Slot" : "Add Slot"}
            </h3>

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

              {/* Time */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium mb-1">Start</label>
                  <input
                    type="time"
                    value={start}
                    onChange={(e) => setStart(e.target.value)}
                    className="input input-bordered w-full"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">End</label>
                  <input
                    type="time"
                    value={end}
                    onChange={(e) => setEnd(e.target.value)}
                    className="input input-bordered w-full"
                  />
                </div>
              </div>

              {/* Patient Limit */}
              <div>
                <label className="block text-sm font-medium mb-1">
                  Daily Patient Limit
                </label>
                <input
                  type="number"
                  min="1"
                  placeholder="e.g. 10"
                  value={editSlot.limit || ""}
                  onChange={(e) =>
                    setEditSlot({ ...editSlot, limit: e.target.value })
                  }
                  className="input input-bordered w-full"
                />
              </div>

              {/* Meeting Link */}
              <div>
                <label className="block text-sm font-medium mb-1">
                  Meeting Link
                </label>
                <input
                  type="text"
                  placeholder="https://zoom.us/j/123..."
                  value={editSlot.meetLink || ""}
                  onChange={(e) =>
                    setEditSlot({ ...editSlot, meetLink: e.target.value })
                  }
                  className="input input-bordered w-full"
                />
              </div>
            </form>

            {/* Actions */}
            <div className="modal-action">
              <button className="btn btn-sm" onClick={() => setEditSlot(null)}>
                Cancel
              </button>
              <button
                className="btn btn-sm text-white bg-[var(--color-primary)] hover:bg-[#18cfcf]"
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
