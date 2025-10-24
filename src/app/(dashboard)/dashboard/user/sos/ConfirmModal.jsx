"use client";

export default function ConfirmModal({ open, onConfirm, onCancel, loading }) {
  if (!open) return null;

  return (
    <div className="modal modal-open">
      <div className="modal-box text-center">
        <h3 className="font-bold text-lg text-error">Confirm Emergency SOS?</h3>
        <p className="py-4">
          Are you sure you want to send an emergency alert right now?
        </p>

        <div className="flex justify-center gap-4 mt-4">
          <button onClick={onCancel} className="btn btn-outline">
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className={`btn btn-error ${loading ? "loading" : ""}`}
          >
            Yes, Send SOS
          </button>
        </div>
      </div>
    </div>
  );
}
