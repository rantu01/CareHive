"use client";
import { X, MapPin, Mail, Phone, Globe } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function HospitalDetailsModal({ hospital, isOpen, onClose }) {
  if (!isOpen || !hospital) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 bg-black/40 flex justify-center items-center z-50 p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div
          className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full relative overflow-hidden"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          transition={{ type: "spring", damping: 20, stiffness: 200 }}
        >
          {/* Header */}
          <div
            className="flex items-center justify-between p-6 text-white"
            style={{
              background: "linear-gradient(135deg, var(--color-primary), var(--color-gradient))",
            }}
          >
            <div>
              <h2 className="text-2xl font-bold">{hospital.name}</h2>
              <p className="text-sm opacity-90 flex items-center gap-1">
                <MapPin size={14} /> {hospital.city}, {hospital.state}
              </p>
            </div>
            <button
              onClick={onClose}
              className="bg-white/20 hover:bg-white/30 p-2 rounded-full"
            >
              <X size={18} />
            </button>
          </div>

          {/* Content */}
          <div className="p-6 space-y-5 text-gray-700">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <div>
                  <p className="font-semibold flex items-center gap-2">
                    <MapPin size={16} className="text-[var(--color-primary)]" /> Address
                  </p>
                  <p className="ml-6 text-gray-600">{hospital.address}</p>
                </div>

                <div>
                  <p className="font-semibold flex items-center gap-2">
                    <Phone size={16} className="text-[var(--color-primary)]" /> Phone
                  </p>
                  <p className="ml-6">{hospital.phone_number}</p>
                </div>

                <div>
                  <p className="font-semibold flex items-center gap-2">
                    <Mail size={16} className="text-[var(--color-primary)]" /> Email
                  </p>
                  <p className="ml-6 text-gray-600">
                    {hospital.email || "Not provided"}
                  </p>
                </div>

                <div>
                  <p className="font-semibold flex items-center gap-2">
                    <Globe size={16} className="text-[var(--color-primary)]" /> Website
                  </p>
                  <a
                    href={hospital.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="ml-6 text-[var(--color-primary)] hover:underline"
                  >
                    Visit Website
                  </a>
                </div>
              </div>

              <div>
                <p className="font-semibold mb-2">Specialties</p>
                <div className="flex flex-wrap gap-2">
                  {(hospital.specialties || ["General"]).map((spec, i) => (
                    <span
                      key={i}
                      className="bg-teal-50 text-teal-700 border border-teal-100 text-sm px-3 py-1 rounded-full"
                    >
                      {spec}
                    </span>
                  ))}
                </div>

                <p className="font-semibold mt-4 mb-2">Ownership</p>
                <p className="text-gray-600">{hospital.ownership}</p>

                <p className="font-semibold mt-4 mb-2">Beds</p>
                <p className="text-gray-600">{hospital.bedcount}</p>
              </div>
            </div>

            <div className="pt-5 border-t text-center">
              <a
                href={`https://www.google.com/maps?q=${hospital.latitude},${hospital.longitude}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block mt-3 px-6 py-3 rounded-xl text-white hover:opacity-90"
                style={{
                  background: "linear-gradient(135deg, var(--color-primary), var(--color-gradient))",
                }}
              >
                View on Google Maps
              </a>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
