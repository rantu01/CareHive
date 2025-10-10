// import React, { useState } from 'react';
// import { useFormContext } from 'react-hook-form';

// const AvailableTimeSection = ({patientLimit, setPatientLimit, setAvailableDays, setTimeLoop, timeLoop, slots, setSlots, doctorAvailableDays, spokenLanguage, setSpokenLanguage }) => {
//     const { register, formState: { errors } } = useFormContext();

//     const weekDays = [
//         { name: "Sunday", value: 'sunday' },
//         { name: "Monday", value: 'monday' },
//         { name: "Tuesday", value: 'tuesday' },
//         { name: "Wednesday", value: 'wednesday' },
//         { name: "Thursday", value: 'thursday' },
//         { name: "Friday", value: 'friday' },
//         { name: "Saturday", value: 'saturday' },
//     ];

//     const lanaguages = [
//         { name: "Bengali", value: 'bengali' },
//         { name: "Hindi", value: 'hindi' },
//         { name: "English", value: 'english' },
//     ]

//     const [timeFrom, setTimeFrom] = useState('')



//     const handleSpokenLanguage = (e) => {
//         if (e.target.value && e.target.checked) {
//             setSpokenLanguage([...spokenLanguage, e.target.value])
//         } else {
//             const newArray = spokenLanguage.filter((lang) => (lang !== e.target.value))
//             setSpokenLanguage(newArray)
//         }
//     }

//     const handleAvailableWeekDays = (e) => {
//         if (e.target.value && e.target.checked) {
//             setAvailableDays([...doctorAvailableDays, e.target.value])
//             setTimeLoop(timeLoop + 1)
//         } else {
//             const newArray = doctorAvailableDays.filter((day) => (day !== e.target.value))
//             setAvailableDays(newArray)
//             setTimeLoop(timeLoop - 1)

//             const toRemove = e.target.value
//             console.log(toRemove)
//             delete slots[toRemove]
//             delete patientLimit[toRemove]
//             setSlots(slots)
//         }
//     }



//     const captureAvailableSlot = (day, from, to) => {
//         setSlots(prev => ({
//             ...prev,
//             [day]: `${from}-${to}`
//         }));
//     }
//     const capturePatientLimit = (day,limit) => {
//         setPatientLimit(prev => ({
//             ...prev,
//             [day]: 0 || `${limit}`
//         }));
//     }

//     console.log("patient limit",patientLimit)
//     return (
//         <section className="flex flex-col">
//             <h2 className="text-xl md:text-2xl font-semibold text-center mb-6" style={{ color: 'var(--dashboard-blue)' }}>
//                 Available Days & Time
//             </h2>
//             <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
//                 {weekDays?.map((day) => (
//                     <div key={day.value}>
//                         <div className="flex items-center p-3 mb-4 rounded-xl transition-all duration-300" style={{ backgroundColor: 'var(--gray-color)', borderWidth: '2px', borderColor: 'var(--dashboard-border)' }}>
//                             <input
//                                 id={`${day.name.toLowerCase()}-checkbox`}
//                                 type="checkbox"
//                                 value={day.value}
//                                 name="day-checkbox"
//                                 onChange={(e) => handleAvailableWeekDays(e)}
//                                 className="w-4 h-4 rounded focus:ring-2"
//                                 style={{ accentColor: 'var(--dashboard-blue)' }}
//                             />
//                             <label
//                                 htmlFor={`${day.name.toLowerCase()}-checkbox`}
//                                 className="ml-2 text-sm font-medium cursor-pointer"
//                                 style={{ color: 'var(--fourground-color)' }}
//                             >
//                                 {day.name}
//                             </label>
//                         </div>

//                         <div className="flex gap-2">
//                             {doctorAvailableDays.includes(day.value) && (
//                                 <div className="flex flex-col items-center gap-2">
//                                     <div className="flex gap-2">
//                                         <div>
//                                             <label htmlFor={`from-${day.value}`} className="text-sm" style={{ color: 'var(--fourground-color)' }}>From : </label>
//                                             <input
//                                                 type="time"
//                                                 id={`from-${day.value}`}
//                                                 required
//                                                 onChange={(e) => setTimeFrom(e.target.value)}
//                                                 className="w-full p-3 rounded-xl focus:outline-none focus:ring-2 transition-all duration-300"
//                                                 style={{ color: 'var(--fourground-color)', borderWidth: '2px', borderColor: 'var(--dashboard-border)' }}
//                                             />
//                                         </div>

//                                         <div>
//                                             <label htmlFor={`to-${day.value}`} className="text-sm" style={{ color: 'var(--fourground-color)' }}>To :</label>
//                                             <input
//                                                 type="time"
//                                                 id={`to-${day.value}`}
//                                                 required
//                                                 onChange={(e) => captureAvailableSlot(day.value, timeFrom, e.target.value)}
//                                                 className="w-full p-3 rounded-xl focus:outline-none focus:ring-2 transition-all duration-300"
//                                                 style={{ color: 'var(--fourground-color)', borderWidth: '2px', borderColor: 'var(--dashboard-border)' }}
//                                             />
//                                         </div>
//                                     </div>
//                                     <div className="flex flex-col space-y-2">
//                                         <label htmlFor="max-patient" className="text-lg font-semibold text-gray-700">Maximum Patient</label>
//                                         <input
//                                             id="max-patient"
//                                             type="number"
//                                             onChange={(e)=>capturePatientLimit(day.value, e.target.value)}
//                                             placeholder="Enter maximum patients"
//                                             required
//                                             className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none text-gray-800"
//                                         />
//                                     </div>

//                                 </div>
//                             )}
//                         </div>
//                     </div>
//                 ))}
//             </div>

//             <div className="flex flex-col gap-4 p-3 rounded-md  shadow">
//                 {/* Consultation Type */}
//                 <div className="flex flex-col ">
//                     <label htmlFor="consultation" className="font-medium mb-1 text-[var(--fourground-color)]">
//                         Consultation Type
//                     </label>
//                     <select
//                         id="consultation"
//                         {...register("consultation", { required: true })}
//                         className="border rounded px-3 py-2 text-[var(--fourground-color)] bg-[var(--gray-color)] focus:outline-none focus:ring-2 focus:ring-blue-500"
//                     >
//                         <option value="">Select...</option>
//                         <option value="online">Online</option>
//                         <option value="offline">Offline</option>
//                         <option value="both">Both</option>
//                     </select>
//                 </div>

//                 {/* Hospital Name */}
//                 <div className="flex flex-col text-[var(--fourground-color)]">
//                     <label htmlFor="hospital" className="font-medium mb-1">
//                         Hospital Name
//                     </label>
//                     <input
//                         id="hospital"
//                         type="text"
//                         placeholder="Enter hospital name"
//                         {...register("hospital", { required: true })}
//                         className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
//                     />
//                 </div>


//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4 ">
//                     <div>
//                         <label
//                             htmlFor="offline-fee"
//                             className="font-medium mb-1 block"
//                             style={{ color: "var(--fourground-color)" }}
//                         >
//                             Offline Fee
//                         </label>
//                         <input
//                             type="number"
//                             id="offline-fee"
//                             placeholder="Offline Fee"
//                             {...register("offlineFee", { required: true })}
//                             className="w-full px-4 py-3 rounded-lg focus:outline-none"
//                             style={{
//                                 borderWidth: "2px",
//                                 borderColor: "var(--dashboard-border)",
//                                 color: "var(--fourground-color)",
//                             }}
//                         />
//                     </div>

//                     <div>
//                         <label
//                             htmlFor="online-fee"
//                             className="font-medium mb-1 block"
//                             style={{ color: "var(--fourground-color)" }}
//                         >
//                             Online Fee
//                         </label>
//                         <input
//                             type="number"
//                             id="online-fee"
//                             placeholder="Online Fee"
//                             {...register("onlineFee", { required: true })}
//                             className="w-full px-4 py-3 rounded-lg focus:outline-none"
//                             style={{
//                                 borderWidth: "2px",
//                                 borderColor: "var(--dashboard-border)",
//                                 color: "var(--fourground-color)",
//                             }}
//                         />
//                     </div>
//                 </div>
//                 <div className="flex md:flex-row gap-6 justify-center items-center">
//                     {lanaguages?.map((lang) => (
//                         <div key={lang.value}>
//                             <div className="flex items-center p-3 mb-4 rounded-xl transition-all duration-300" style={{ backgroundColor: 'var(--gray-color)', borderWidth: '2px', borderColor: 'var(--dashboard-border)' }}>
//                                 <input
//                                     id={`${lang.name.toLowerCase()}-checkbox`}
//                                     type="checkbox"
//                                     value={lang.value}
//                                     name="day-checkbox"
//                                     onChange={(e) => handleSpokenLanguage(e)}
//                                     className="w-4 h-4 rounded focus:ring-2"
//                                     style={{ accentColor: 'var(--dashboard-blue)' }}
//                                 />
//                                 <label
//                                     htmlFor={`${lang.name.toLowerCase()}-checkbox`}
//                                     className="ml-2 text-sm font-medium cursor-pointer"
//                                     style={{ color: 'var(--fourground-color)' }}
//                                 >
//                                     {lang.name}
//                                 </label>
//                             </div>
//                         </div>
//                     ))}
//                 </div>
//             </div>

//         </section>
//     );


// };

// export default AvailableTimeSection;


import React, { useState } from 'react';
import { useFormContext } from 'react-hook-form';

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
}) => {
  const { register, formState: { errors } } = useFormContext();

  const weekDays = [
    { name: "Sunday", value: 'sunday' },
    { name: "Monday", value: 'monday' },
    { name: "Tuesday", value: 'tuesday' },
    { name: "Wednesday", value: 'wednesday' },
    { name: "Thursday", value: 'thursday' },
    { name: "Friday", value: 'friday' },
    { name: "Saturday", value: 'saturday' },
  ];

  const languages = [
    { name: "Bengali", value: 'bengali' },
    { name: "Hindi", value: 'hindi' },
    { name: "English", value: 'english' },
  ];

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
          >
            <option value="">Select...</option>
            <option value="online">Online</option>
            <option value="offline">Offline</option>
            <option value="both">Both</option>
          </select>
        </div>

        {/* Hospital Name */}
        <div>
          <label htmlFor="hospital" className="block font-medium mb-2" style={{ color: 'var(--fourground-color)' }}>
            Hospital Name
          </label>
          <input
            id="hospital"
            type="text"
            placeholder="Enter hospital name"
            {...register("hospital", { required: true })}
            className="w-full p-3 rounded-lg focus:outline-none"
            style={{
              borderWidth: '2px',
              borderColor: 'var(--dashboard-border)',
              color: 'var(--fourground-color)',
            }}
          />
        </div>

        {/* Fees */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="offline-fee" className="block font-medium mb-2" style={{ color: 'var(--fourground-color)' }}>
              Offline Fee
            </label>
            <input
              type="number"
              id="offline-fee"
              placeholder="Offline Fee"
              {...register("offlineFee", { required: true })}
              className="w-full p-3 rounded-lg focus:outline-none"
              style={{
                borderWidth: "2px",
                borderColor: "var(--dashboard-border)",
                color: "var(--fourground-color)",
              }}
            />
          </div>

          <div>
            <label htmlFor="online-fee" className="block font-medium mb-2" style={{ color: 'var(--fourground-color)' }}>
              Online Fee
            </label>
            <input
              type="number"
              id="online-fee"
              placeholder="Online Fee"
              {...register("onlineFee", { required: true })}
              className="w-full p-3 rounded-lg focus:outline-none"
              style={{
                borderWidth: "2px",
                borderColor: "var(--dashboard-border)",
                color: "var(--fourground-color)",
              }}
            />
          </div>
        </div>

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