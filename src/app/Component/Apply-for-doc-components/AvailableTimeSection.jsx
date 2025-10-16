"use client"
import { bangladeshDistricts, languages, weekDays } from '@/app/utils/iterableVariable';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import Swal from 'sweetalert2';

const AvailableTimeSection = ({
  patientLimit,
  setPatientLimit,
  setAvailableDays,
  setTimeLoop,
  timeLoop,
  slots,
  setSlots,
  doctorAvailableDays,
  spokenLanguage,
  setSpokenLanguage,
  setDoctorHospital,
  setDoctorHospitalId
}) => {


  const { register, formState: { errors } } = useFormContext();

  const [areaBasedHospital, setAreaBased] = useState("dhaka")
  const [hospitals, setHospitals] = useState([])
  const [consatlationType, setConsaltationType] = useState("both")

  const fetchHospitalData = async (areaType) => {
    try {
      const response = await axios.post('/api/hospital-list', { areaType })
      return response.data.hospitals
    } catch (error) {
      Swal.fire(error)
    }
  }

  const areaMutation = useMutation({
    mutationFn: fetchHospitalData,
    onSuccess: (data) => {
      setDoctorHospital(data[0]?.name)
      setDoctorHospitalId(data[0]?._id)
      setHospitals(data)
    },
    onError: () => {
      Swal.fire("Something Error")
    }
  })

  useEffect(() => {
    if (areaBasedHospital) {
      areaMutation.mutate(areaBasedHospital)
    }
  }, [areaBasedHospital]);


  const [timeFrom, setTimeFrom] = useState('');

  const handleSpokenLanguage = (e) => {
    if (e.target.value && e.target.checked) {
      setSpokenLanguage([...spokenLanguage, e.target.value]);
    } else {
      const newArray = spokenLanguage.filter((lang) => lang !== e.target.value);
      setSpokenLanguage(newArray);
    }
  };

  const handleAvailableWeekDays = (e) => {
    if (e.target.value && e.target.checked) {
      setAvailableDays([...doctorAvailableDays, e.target.value]);
      setTimeLoop(timeLoop + 1);
    } else {
      const newArray = doctorAvailableDays.filter((day) => day !== e.target.value);
      setAvailableDays(newArray);
      setTimeLoop(timeLoop - 1);

      const toRemove = e.target.value;
      delete slots[toRemove];
      delete patientLimit[toRemove];
      setSlots({ ...slots });
    }
  };

  const captureAvailableSlot = (day, from, to) => {
    setSlots((prev) => ({
      ...prev,
      [day]: `${from}-${to}`,
    }));
  };

  const capturePatientLimit = (day, limit) => {
    setPatientLimit((prev) => ({
      ...prev,
      [day]: limit || '0',
    }));
  };




  const feeFields = (
    <div className={`grid grid-cols-1 ${consatlationType === "both" ? "md:grid-cols-2" : ""} gap-4`}>
      {(consatlationType === "inPerson" || consatlationType === "both") && (
        <div>
          <label htmlFor="offline-fee" className="block font-medium mb-2" style={{ color: 'var(--fourground-color)' }}>
            Offline Fee
          </label>
          <input
            type="number"
            id="offline-fee"
            placeholder="Offline Fee"
            {...register("offlineFee", { required: consatlationType === "offline" || consatlationType === "both" })}
            className="w-full p-3 rounded-lg focus:outline-none"
            style={{
              borderWidth: "2px",
              borderColor: "var(--dashboard-border)",
              color: "var(--fourground-color)",
            }}
          />
        </div>
      )}

      {(consatlationType === "online" || consatlationType === "both") && (
        <div>
          <label htmlFor="online-fee" className="block font-medium mb-2" style={{ color: 'var(--fourground-color)' }}>
            Online Fee
          </label>
          <input
            type="number"
            id="online-fee"
            placeholder="Online Fee"
            {...register("onlineFee", { required: consatlationType === "online" || consatlationType === "both" })}
            className="w-full p-3 rounded-lg focus:outline-none"
            style={{
              borderWidth: "2px",
              borderColor: "var(--dashboard-border)",
              color: "var(--fourground-color)",
            }}
          />
        </div>
      )}
    </div>
  );

  return (
    <section className="flex flex-col gap-6">
      <h2 className="text-xl md:text-2xl font-semibold text-center" style={{ color: 'var(--dashboard-blue)' }}>
        Available Days & Time
      </h2>

      {/* Week Days Selection */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {weekDays.map((day) => (
          <div key={day.value} className="flex flex-col gap-3">
            <div
              className="flex items-center p-3 rounded-xl transition-all duration-300 border-2"
              style={{
                backgroundColor: 'var(--gray-color)',
                borderColor: 'var(--dashboard-border)',
              }}
            >
              <input
                id={`${day.value}-checkbox`}
                type="checkbox"
                value={day.value}
                name="day-checkbox"
                onChange={handleAvailableWeekDays}
                className="w-4 h-4 rounded focus:ring-2"
                style={{ accentColor: 'var(--dashboard-blue)' }}
              />
              <label
                htmlFor={`${day.value}-checkbox`}
                className="ml-2 text-sm font-medium cursor-pointer"
                style={{ color: 'var(--fourground-color)' }}
              >
                {day.name}
              </label>
            </div>

            {doctorAvailableDays.includes(day.value) && (
              <div className="flex flex-col gap-3 p-3 rounded-xl border-2" style={{ borderColor: 'var(--dashboard-border)' }}>
                {/* Time Slot Inputs */}
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label htmlFor={`from-${day.value}`} className="block text-sm mb-1" style={{ color: 'var(--fourground-color)' }}>
                      From
                    </label>
                    <input
                      type="time"
                      id={`from-${day.value}`}
                      required
                      onChange={(e) => setTimeFrom(e.target.value)}
                      className="w-full p-2 rounded-lg focus:outline-none focus:ring-2"
                      style={{
                        color: 'var(--fourground-color)',
                        borderWidth: '2px',
                        borderColor: 'var(--dashboard-border)',
                      }}
                    />
                  </div>
                  <div>
                    <label htmlFor={`to-${day.value}`} className="block text-sm mb-1" style={{ color: 'var(--fourground-color)' }}>
                      To
                    </label>
                    <input
                      type="time"
                      id={`to-${day.value}`}
                      required
                      onChange={(e) => captureAvailableSlot(day.value, timeFrom, e.target.value)}
                      className="w-full p-2 rounded-lg focus:outline-none focus:ring-2"
                      style={{
                        color: 'var(--fourground-color)',
                        borderWidth: '2px',
                        borderColor: 'var(--dashboard-border)',
                      }}
                    />
                  </div>
                </div>

                {/* Patient Limit */}
                <div>
                  <label htmlFor={`max-patient-${day.value}`} className="block text-sm mb-1 font-medium" style={{ color: 'var(--fourground-color)' }}>
                    Maximum Patients
                  </label>
                  <input
                    id={`max-patient-${day.value}`}
                    type="number"
                    min="0"
                    onChange={(e) => capturePatientLimit(day.value, e.target.value)}
                    placeholder="e.g. 10"
                    required
                    className="w-full p-2 rounded-lg focus:outline-none"
                    style={{
                      borderWidth: '2px',
                      borderColor: 'var(--dashboard-border)',
                      color: 'var(--fourground-color)',
                    }}
                  />
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Consultation & Fee Section */}
      <div className="flex flex-col gap-5 p-4 rounded-xl border-2" style={{ borderColor: 'var(--dashboard-border)' }}>
        {/* Consultation Type */}
        <div>
          <label htmlFor="consultation" className="block font-medium mb-2" style={{ color: 'var(--fourground-color)' }}>
            Consultation Type
          </label>
          <select
            id="consultation"
            {...register("consultation", { required: true })}
            className="w-full p-3 rounded-lg focus:outline-none focus:ring-2"
            style={{
              backgroundColor: 'var(--gray-color)',
              color: 'var(--fourground-color)',
              borderWidth: '2px',
              borderColor: 'var(--dashboard-border)',
            }}

            value={consatlationType}

            onChange={(e) => setConsaltationType(e.target.value)}
          >
            <option value="online">Online</option>
            <option value="inPerson">Offline</option>
            <option value="both">Both</option>
          </select>
        </div>

        {/* Hospital Name */}
        <div>
          <div className="flex items-center space-x-6 mt-2">
            <div className='flex-1'>
              <label htmlFor="city" className="block text-lg mb-2" style={{ color: 'var(--fourground-color)' }}>
                Select Your City
              </label>
              <select

                onChange={(e) => setAreaBased(e.target.value)}
                value={areaBasedHospital}
                id="city"
                name="city"
                className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"

                style={{
                  backgroundColor: 'var(--gray-color)',
                  color: 'var(--fourground-color)',
                  borderWidth: '2px',
                  borderColor: 'var(--dashboard-border)',
                }}
              >
                <option >
                  Choose a city...
                </option>
                {bangladeshDistricts?.map((city) => (
                  <option key={city.name} value={city.value}>
                    {city.name}
                  </option>
                ))}
              </select>
            </div>

            <div className='flex-1'>
              <label htmlFor="hospital" className="block font-medium mb-2" style={{ color: 'var(--fourground-color)' }}>
                Hospital Name
              </label>
              <select
                onChange={(e) => {
                  const selectedHospital = hospitals.find(h => h._id === e.target.value);
                  if (selectedHospital) {
                    setDoctorHospital(selectedHospital.name);
                    setDoctorHospitalId(selectedHospital._id);
                  }
                }}
                id="hospital"
                name="hospital"
                className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"

                style={{
                  backgroundColor: 'var(--gray-color)',
                  color: 'var(--fourground-color)',
                  borderWidth: '2px',
                  borderColor: 'var(--dashboard-border)',
                }}
              >
                {hospitals?.map((hospital) => (

                  <option key={hospital._id} value={hospital._id}>
                    {hospital.name}
                  </option>
                ))}
              </select>
            </div>

          </div>

        </div>

        {/* Fees */}
        {feeFields}

        {/* Spoken Languages */}
        <div>
          <label className="block font-medium mb-3" style={{ color: 'var(--fourground-color)' }}>
            Spoken Languages
          </label>
          <div className="flex flex-wrap gap-3">
            {languages.map((lang) => (
              <div
                key={lang.value}
                className="flex items-center p-2 rounded-xl border-2"
                style={{
                  backgroundColor: 'var(--gray-color)',
                  borderColor: 'var(--dashboard-border)',
                }}
              >
                <input
                  id={`${lang.value}-lang-checkbox`}
                  type="checkbox"
                  value={lang.value}
                  onChange={handleSpokenLanguage}
                  className="w-4 h-4 rounded focus:ring-2"
                  style={{ accentColor: 'var(--dashboard-blue)' }}
                />
                <label
                  htmlFor={`${lang.value}-lang-checkbox`}
                  className="ml-2 text-sm font-medium cursor-pointer"
                  style={{ color: 'var(--fourground-color)' }}
                >
                  {lang.name}
                </label>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AvailableTimeSection;