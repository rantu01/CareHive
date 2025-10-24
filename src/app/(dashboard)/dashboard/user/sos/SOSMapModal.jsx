"use client";

import { X } from "lucide-react";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

const MapView = dynamic(() => import("./MapView"), { ssr: false });

export default function SOSMapModal({ isOpen, onClose, userCoords, hospitals }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setVisible(true);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
      setTimeout(() => setVisible(false), 200);
    }
  }, [isOpen]);

  if (!visible) return null;

  return (
    <div
      className={`fixed inset-0 z-[1000] flex items-center justify-center bg-black/60 backdrop-blur-sm transition-opacity duration-300 ${
        isOpen ? "opacity-100 visible" : "opacity-0 invisible"
      }`}
    >
      {/* Close Button */}
      <button
        onClick={onClose}
        className="absolute top-6 right-6 z-[1100] bg-red-600 hover:bg-red-700 text-white rounded-full p-3 shadow-lg transition"
      >
        <X className="w-6 h-6" />
      </button>

      {/* Center Popup Box */}
      <div className="bg-white rounded-2xl overflow-hidden shadow-2xl w-[90%] md:w-[70%] lg:w-[60%] h-[70vh] relative border border-gray-200 animate-in fade-in zoom-in">
        {userCoords ? (
          <div className="bg-white rounded-2xl overflow-hidden shadow-2xl w-[90%] md:w-[70%] lg:w-[60%] h-[70vh] relative border border-gray-200">
  <MapView userCoords={userCoords} hospitals={hospitals} />
</div>

        ) : (
          <div className="flex items-center justify-center h-full text-gray-700 font-semibold text-lg">
            Getting your location...
          </div>
        )}
      </div>
    </div>
  );
}
