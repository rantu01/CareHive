// hooks/useGeolocation.js
"use client";
import { useState, useRef } from "react";

export default function useGeolocation() {
  const [status, setStatus] = useState("idle"); // idle|loading|success|error
  const [coords, setCoords] = useState(null);
  const [error, setError] = useState(null);
  const watchIdRef = useRef(null);

  const getLocation = (opts = { enableHighAccuracy: true, timeout: 10000 }) => {
    if (!navigator.geolocation) {
      setError("Geolocation not supported");
      setStatus("error");
      return;
    }
    setStatus("loading");
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setCoords({
          lat: pos.coords.latitude,
          lon: pos.coords.longitude,
          accuracy: pos.coords.accuracy,
          timestamp: pos.timestamp,
        });
        setStatus("success");
        setError(null);
      },
      (err) => {
        setError(err.message);
        setStatus("error");
      },
      opts
    );
  };

  const watch = (opts = { enableHighAccuracy: true }) => {
    if (!navigator.geolocation) return;
    watchIdRef.current = navigator.geolocation.watchPosition(
      (pos) => {
        setCoords({
          lat: pos.coords.latitude,
          lon: pos.coords.longitude,
          accuracy: pos.coords.accuracy,
          timestamp: pos.timestamp,
        });
        setStatus("success");
      },
      (err) => {
        setError(err.message);
        setStatus("error");
      },
      opts
    );
  };

  const stopWatch = () => {
    if (watchIdRef.current !== null) {
      navigator.geolocation.clearWatch(watchIdRef.current);
      watchIdRef.current = null;
    }
  };

  return { status, coords, error, getLocation, watch, stopWatch };
}
