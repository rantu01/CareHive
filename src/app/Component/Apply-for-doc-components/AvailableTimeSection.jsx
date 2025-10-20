"use client"
import { bangladeshDistricts, languages, weekDays } from '@/app/utils/iterableVariable';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import Swal from 'sweetalert2';

const AvailableTimeSection = ({
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




  const handleSpokenLanguage = (e) => {
    if (e.target.value && e.target.checked) {
      setSpokenLanguage([...spokenLanguage, e.target.value]);
    } else {
      const newArray = spokenLanguage.filter((lang) => lang !== e.target.value);
      setSpokenLanguage(newArray);
    }
  };






  return (
    <section className="flex flex-col gap-6">
      <h2 className="text-xl md:text-2xl font-semibold text-center" style={{ color: 'var(--dashboard-blue)' }}>
        Where You Want Apply
      </h2>



      {/* Consultation & Fee Section */}
      <div className="flex flex-col gap-5 p-4 rounded-xl border-2" style={{ borderColor: 'var(--dashboard-border)' }}>

        {/* Hospital Name */}
        <div>
          <div className="flex items-center space-x-6 mt-2">
            <div className='flex-1'>
              <label htmlFor="city" className="block text-lg mb-2" style={{ color: 'var(--text-color-all)' }}>
                Select Your City
              </label>
              <select

                onChange={(e) => setAreaBased(e.target.value)}
                value={areaBasedHospital}
                id="city"
                name="city"
                className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"

                style={{
                  backgroundColor: 'var(--bg-color-all)',
                  color: 'var(--text-color-all)',
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
              <label htmlFor="hospital" className="block font-medium mb-2" style={{ color: 'var(--text-color-all)' }}>
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
                  backgroundColor: 'var(--bg-color-all)',
                  color: 'var(--text-color-all)',
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


        {/* Spoken Languages */}
        <div>
          <label className="block font-medium mb-3" style={{ color: 'var(--text-color-all)' }}>
            Spoken Languages
          </label>
          <div className="flex flex-wrap gap-3">
            {languages.map((lang) => (
              <div
                key={lang.value}
                className="flex items-center p-2 rounded-xl border-2"
                style={{
                  backgroundColor: 'var(--bg-color-all)',
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
                  style={{ color: 'var(--text-color-all)' }}
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