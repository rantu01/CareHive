"use client";
import { useState } from "react";
import MapView from "./MapView";


export default function SOSButton({ userId }) {
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(null);
  const [coords, setCoords] = useState(null);
  const [nearbyHospitals, setNearbyHospitals] = useState([]);

  const sendSOS = async (lat, lon) => {
    const res = await fetch("/api/sos", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId, lat, lon }),
    });
    const data = await res.json();
    setStatus(data.message);
    setNearbyHospitals(data.nearbyHospitals);
  };

  const getLocation = () => {
    if (!navigator.geolocation) {
      alert("Your browser does not support Geolocation");
      return;
    }
    setLoading(true);
    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const lat = pos.coords.latitude;
        const lon = pos.coords.longitude;
        setCoords({ lat, lon });
        await sendSOS(lat, lon);
        setLoading(false);
      },
      (err) => {
        alert("Failed to get location. Enable GPS.");
        setLoading(false);
      },
      { enableHighAccuracy: true }
    );
  };

  return (
    <div className="space-y-4">
      <button
        className={`btn btn-error btn-lg w-full max-w-xs ${loading ? "loading" : ""}`}
        onClick={getLocation}
      >
        🚨 Emergency SOS
      </button>

      {coords && (
        <MapView userCoords={coords} hospitals={nearbyHospitals} />
      )}

      {status && <p className="text-green-600 font-semibold">{status}</p>}
    </div>
  );
}
