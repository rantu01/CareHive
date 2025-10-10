// services/api.js
export async function fetchPendingDoctorApprovals() {
  try {
    const res = await fetch("/api/approved-doctor");
    const data = await res.json();
    if (!data.ok) throw new Error("Failed to fetch pending doctor approvals");
    return data.data; // returns the array of pending approvals
  } catch (err) {
    console.error(err);
    return []; // fallback to empty array
  }
}

