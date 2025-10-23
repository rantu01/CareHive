"use client";

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// User marker (blue default)
const userIcon = new L.Icon({
  iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

// Hospital pulsing red circle
const hospitalIcon = L.divIcon({
  className: "hospital-marker",
  html: `<div class="hospital-pulse"></div>`,
  iconSize: [40, 40],
  iconAnchor: [20, 20],
});

// Ambulance emoji marker
const ambulanceIcon = L.divIcon({
  className: "ambulance-marker",
  html: "🚑",
  iconSize: [30, 30],
  iconAnchor: [15, 15],
});

export default function MapView({ userCoords, hospitals }) {
  if (!userCoords) return null;

  return (
    <>
      <style>{`
        .hospital-pulse {
          width: 30px;
          height: 30px;
          background: red;
          border-radius: 50%;
          border: 2px solid white;
          box-shadow: 0 0 10px rgba(255,0,0,0.8);
          animation: pulse 1.5s infinite;
        }
        @keyframes pulse {
          0% { transform: scale(0.8); opacity: 0.7; }
          50% { transform: scale(1.2); opacity: 0.4; }
          100% { transform: scale(0.8); opacity: 0.7; }
        }
        .ambulance-marker {
          font-size: 26px;
        }
      `}</style>

      <div className="w-full h-full rounded-xl overflow-hidden shadow mt-6">
        <MapContainer
          center={[userCoords.lat, userCoords.lon]}
          zoom={13}
          className="h-full w-full"
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a>'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          {/* User Marker */}
          <Marker position={[userCoords.lat, userCoords.lon]} icon={userIcon}>
            <Popup>📍 You are here</Popup>
          </Marker>

          {/* Hospital Markers */}
          {hospitals.map((h) => (
            <Marker
              key={h._id}
              position={[parseFloat(h.latitude), parseFloat(h.longitude)]}
              icon={hospitalIcon}
            >
              <Popup>
                🏥 <strong>{h.name}</strong><br />
                Distance: {h.distance.toFixed(2)} km<br />
                📞 {h.phone_number || "N/A"}
              </Popup>
            </Marker>
          ))}

          {/* Ambulance Markers (optional demo) */}
          {hospitals.flatMap((h, i) =>
            h.ambulances?.map((a) => (
              <Marker
                key={`${h._id}-${a.id}-${i}`}
                position={[parseFloat(a.lat), parseFloat(a.lon)]}
                icon={ambulanceIcon}
              >
                <Popup>🚑 Ambulance #{a.id} ({a.status})</Popup>
              </Marker>
            ))
          )}
        </MapContainer>
      </div>
    </>
  );
}
