// components/AvailableTimeSlots.js
"use client";

import { useState } from "react";
import { Calendar, Clock, Edit, Trash2 } from "lucide-react";

const slots = [
  { id: 1, day: "Monday", start: "09:00 AM", end: "05:00 PM", duration: "30 min" },
  { id: 2, day: "Tuesday", start: "09:00 AM", end: "05:00 PM", duration: "30 min" },
  { id: 3, day: "Wednesday", start: "09:00 AM", end: "12:00 PM", duration: "30 min" },
  { id: 4, day: "Thursday", start: "09:00 AM", end: "05:00 PM", duration: "45 min" },
  { id: 5, day: "Friday", start: "09:00 AM", end: "03:00 PM", duration: "30 min" },
];

export default function AvailableTimeSlots() {
  const [editSlot, setEditSlot] = useState(null);

  return (
    <div className="bg-base-100 p-6 rounded-xl shadow-md w-full">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
        <h2 className="text-xl font-semibold flex items-center gap-2">
          <Clock className="w-5 h-5 text-[var(--dashboard-blue)]" />
          Available Time Slots
        </h2>
        <button className="btn btn-sm md:btn-md bg-[var(--dashboard-blue)] text-white border-none hover:opacity-90 flex items-center gap-2">
          <span className="text-lg">+</span>
          Add New Slot
        </button>
      </div>

      {/* Slots Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {slots.map((slot) => (
          <div
            key={slot.id}
            className="border rounded-xl p-5 bg-white shadow-sm hover:shadow-lg transition flex flex-col justify-between"
          >
            {/* Day Header */}
            <div className="flex items-center gap-2 mb-3">
              <div className="bg-[var(--dashboard-blue)] text-white p-2 rounded-lg">
                <Calendar className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-semibold text-lg">{slot.day}</h3>
                <p className="text-xs text-gray-500">Weekly Schedule</p>
              </div>
            </div>

            {/* Times */}
            <div className="text-sm space-y-2 mb-4">
              <p className="flex justify-between">
                <span className="text-gray-500">Start Time</span>
                <span className="font-medium">{slot.start}</span>
              </p>
              <p className="flex justify-between">
                <span className="text-gray-500">End Time</span>
                <span className="font-medium">{slot.end}</span>
              </p>
              <p className="flex justify-between">
                <span className="text-gray-500">Slot Duration</span>
                <span className="badge badge-md bg-gray-100 text-gray-700">
                  {slot.duration}
                </span>
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-end gap-2">
              <button
                className="btn btn-xs bg-blue-100 text-blue-600 hover:bg-blue-200 border-none rounded-lg flex items-center gap-1"
                onClick={() => setEditSlot(slot)}
              >
                <Edit className="w-4 h-4" />
                Edit
              </button>
              <button className="btn btn-xs bg-red-100 text-red-600 hover:bg-red-200 border-none rounded-lg flex items-center gap-1">
                <Trash2 className="w-4 h-4" />
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Edit Modal */}
      {editSlot && (
        <dialog className="modal modal-open">
          <div className="modal-box max-w-md">
            <h3 className="font-bold text-lg flex items-center gap-2 mb-2">
              <Edit className="w-5 h-5 text-blue-500" />
              Edit Time Slot
            </h3>
            <p className="text-sm text-gray-500 mb-4">
              Update the selected time slot details.
            </p>

            {/* Form */}
            <form className="space-y-3">
              {/* Day of Week */}
              <div>
                <label className="block text-sm font-medium mb-1">Day of Week</label>
                <select defaultValue={editSlot.day} className="select select-bordered w-full">
                  <option>Monday</option>
                  <option>Tuesday</option>
                  <option>Wednesday</option>
                  <option>Thursday</option>
                  <option>Friday</option>
                  <option>Saturday</option>
                  <option>Sunday</option>
                </select>
              </div>

              {/* Start and End Time */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium mb-1">Start Time</label>
                  <input
                    type="time"
                    defaultValue="09:00"
                    className="input input-bordered w-full"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">End Time</label>
                  <input
                    type="time"
                    defaultValue="17:00"
                    className="input input-bordered w-full"
                  />
                </div>
              </div>

              {/* Slot Duration */}
              <div>
                <label className="block text-sm font-medium mb-1">Slot Duration</label>
                <select defaultValue={editSlot.duration} className="select select-bordered w-full">
                  <option>15 minutes</option>
                  <option>30 minutes</option>
                  <option>45 minutes</option>
                  <option>60 minutes</option>
                </select>
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
              <button className="btn btn-sm bg-blue-500 text-white hover:bg-blue-600">
                Update Slot
              </button>
            </div>
          </div>
        </dialog>
      )}
    </div>
  );
}
