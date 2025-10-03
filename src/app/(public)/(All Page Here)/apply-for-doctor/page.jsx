"use client"
import axios from "axios";
import { Hospital, Upload } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";

const Page = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const [profileImage, setProfileImage] = useState("https://img.daisyui.com/images/profile/demo/spiderperson@192.webp");
    const [timeLoop, setTimeLoop] = useState(0)

    // this state will be
    const [doctorAvailableDays, setAvailableDays] = useState([])

    const [timeFrom, setTimeFrom] = useState('')



    const [slots, setSlots] = useState({});

    const handleAvailableWeekDays = (e) => {
        if (e.target.value && e.target.checked) {
            setAvailableDays([...doctorAvailableDays, e.target.value])
            setTimeLoop(timeLoop + 1)
        } else {
            const newArray = doctorAvailableDays.filter((day) => (day !== e.target.value))
            setAvailableDays(newArray)
            setTimeLoop(timeLoop - 1)

            const toRemove = e.target.value
            delete slots[toRemove]
            setSlots(slots)

        }
    }


    const captureAvailableSlot = (day, from, to) => {
        setSlots(prev => ({
            ...prev,
            [day]: `${from}-${to}`
        }));

    }

    console.log(slots)











    const handleImageUpload = async (e) => {
        const file = e.target.files[0];
        if (file) {
            const imageData = new FormData()
            imageData.append("file", file)

            imageData.append("upload_preset", "pdf_persist")
            imageData.append("cloud_name", "dqbwtffom")

            const response = await fetch(`https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_IMAGE_CLOUD}/auto/upload`,
                {
                    method: "POST",
                    body: imageData
                }
            )


            const uploadImageURL = await response.json()


            setProfileImage(uploadImageURL?.url)

            console.log(uploadImageURL?.url)

        } else return

    };


    const onSubmit = (data) => {
        // const newData = { ...data, profileImage, doctorAvailableDays }

        // console.log(newData)
        // console.log(profileImage)
        // console.log(doctorAvailableDays)

        console.log(doctorAvailableDays)

    };

    const weekDays = [
        { name: "Sunday", value: 'sunday' },
        { name: "Monday", value: 'monday' },
        { name: "Tuesday", value: 'tuesday' },
        { name: "Wednesday", value: 'wednesday' },
        { name: "Thursday", value: 'thursday' },
        { name: "Friday", value: 'friday' },
        { name: "Saturday", value: 'saturday' },
    ];

    return (
        <div className="min-h-screen bg-white text-gray-900">
            {/* Header */}
            <header className="flex justify-center items-center gap-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white py-6 shadow-lg">
                <Hospital size={40} />
                <h1 className="text-2xl md:text-4xl font-bold tracking-wide">
                    Doctor Registration Form
                </h1>
            </header>

            {/* Form */}
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="max-w-6xl mx-auto mt-10 bg-white shadow-2xl rounded-2xl p-6 md:p-10 space-y-10 border border-gray-200"
            >
                {/* Personal Info */}
                <section>
                    <h2 className="text-xl md:text-2xl font-semibold text-center mb-6 text-blue-600">
                        Personal Information
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-6 gap-6 items-start">
                        {/* Avatar */}
                        <div className="flex flex-col justify-center items-center md:col-span-1 gap-3">
                            <div className="w-28 h-28 rounded-full ring-4 ring-blue-400 ring-offset-4 overflow-hidden">
                                <img
                                    src={profileImage}
                                    alt="profile"
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            <label className="cursor-pointer bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 transition-colors">
                                <Upload size={16} />
                                Upload Photo
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={handleImageUpload}
                                    className="hidden"
                                />
                            </label>
                        </div>

                        {/* Fields */}
                        <div className="md:col-span-5 grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <input
                                    type="text"
                                    placeholder="Full Name *"
                                    {...register("fullName", { required: "Full name is required" })}
                                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none"
                                />
                                {errors.fullName && <p className="text-red-600 text-sm mt-1">{errors.fullName.message}</p>}
                            </div>

                            <div>
                                <input
                                    type="date"
                                    {...register("dateOfBirth", { required: "Date of birth is required" })}
                                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none"
                                />
                                {errors.dateOfBirth && <p className="text-red-600 text-sm mt-1">{errors.dateOfBirth.message}</p>}
                            </div>

                            <div>
                                <select
                                    {...register("gender", { required: "Gender is required" })}
                                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none bg-white"
                                >
                                    <option value="">Select Gender *</option>
                                    <option value="Female">Female</option>
                                    <option value="Male">Male</option>
                                </select>
                                {errors.gender && <p className="text-red-600 text-sm mt-1">{errors.gender.message}</p>}
                            </div>

                            <div>
                                <input
                                    type="tel"
                                    placeholder="Mobile Number *"
                                    {...register("mobileNumber", {
                                        required: "Mobile number is required",
                                        maxLength: { value: 11, message: "Maximum 11 digits" }
                                    })}
                                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none"
                                />
                                {errors.mobileNumber && <p className="text-red-600 text-sm mt-1">{errors.mobileNumber.message}</p>}
                            </div>

                            <div>
                                <input
                                    type="tel"
                                    placeholder="WhatsApp *"
                                    {...register("whatsApp", {
                                        required: "WhatsApp number is required",
                                        maxLength: { value: 11, message: "Maximum 11 digits" }
                                    })}
                                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none"
                                />
                                {errors.whatsApp && <p className="text-red-600 text-sm mt-1">{errors.whatsApp.message}</p>}
                            </div>

                            <div>
                                <input
                                    type="email"
                                    placeholder="Email Address *"
                                    {...register("email", { required: "Email is required" })}
                                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none"
                                />
                                {errors.email && <p className="text-red-600 text-sm mt-1">{errors.email.message}</p>}
                            </div>

                            <div>
                                <select
                                    {...register("maritalStatus", { required: "Marital status is required" })}
                                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none bg-white"
                                >
                                    <option value="">Marital Status *</option>
                                    <option value="Married">Married</option>
                                    <option value="Unmarried">Unmarried</option>
                                    <option value="Engaged">Engaged</option>
                                </select>
                                {errors.maritalStatus && <p className="text-red-600 text-sm mt-1">{errors.maritalStatus.message}</p>}
                            </div>

                            <div>
                                <select
                                    {...register("residentialStatus", { required: "Residential status is required" })}
                                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none bg-white"
                                >
                                    <option value="">Residential Status *</option>
                                    <option value="Residence">Residence</option>
                                    <option value="Non-Residence">Non-Residence</option>
                                </select>
                                {errors.residentialStatus && <p className="text-red-600 text-sm mt-1">{errors.residentialStatus.message}</p>}
                            </div>

                            <div>
                                <input
                                    type="text"
                                    placeholder="Nationality *"
                                    {...register("nationality", { required: "Nationality is required" })}
                                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none"
                                />
                                {errors.nationality && <p className="text-red-600 text-sm mt-1">{errors.nationality.message}</p>}
                            </div>

                            <div>
                                <input
                                    type="text"
                                    placeholder="National ID No. *"
                                    {...register("nationalId", { required: "National ID is required" })}
                                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none"
                                />
                                {errors.nationalId && <p className="text-red-600 text-sm mt-1">{errors.nationalId.message}</p>}
                            </div>

                            <div>
                                <input
                                    type="text"
                                    placeholder="Present Address *"
                                    {...register("presentAddress", { required: "Present address is required" })}
                                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none"
                                />
                                {errors.presentAddress && <p className="text-red-600 text-sm mt-1">{errors.presentAddress.message}</p>}
                            </div>

                            <div>
                                <input
                                    type="text"
                                    placeholder="Permanent Address *"
                                    {...register("permanentAddress", { required: "Permanent address is required" })}
                                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none"
                                />
                                {errors.permanentAddress && <p className="text-red-600 text-sm mt-1">{errors.permanentAddress.message}</p>}
                            </div>
                        </div>
                    </div>
                </section>

                {/* Education */}
                <section>
                    <h2 className="text-xl md:text-2xl font-semibold text-center mb-6 text-blue-600">
                        Educational Qualification
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                            <input
                                type="text"
                                placeholder="Degree Name *"
                                {...register("degreeName", { required: "Degree name is required" })}
                                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none"
                            />
                            {errors.degreeName && <p className="text-red-600 text-sm mt-1">{errors.degreeName.message}</p>}
                        </div>

                        <div>
                            <input
                                type="text"
                                placeholder="Post Graduate *"
                                {...register("postGraduate", { required: "Post graduate info is required" })}
                                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none"
                            />
                            {errors.postGraduate && <p className="text-red-600 text-sm mt-1">{errors.postGraduate.message}</p>}
                        </div>

                        <div>
                            <input
                                type="text"
                                placeholder="Graduation Year *"
                                {...register("graduationYear", { required: "Graduation year is required" })}
                                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none"
                            />
                            {errors.graduationYear && <p className="text-red-600 text-sm mt-1">{errors.graduationYear.message}</p>}
                        </div>

                        <div>
                            <input
                                type="text"
                                placeholder="Specialization *"
                                {...register("specialization", { required: "Specialization is required" })}
                                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none"
                            />
                            {errors.specialization && <p className="text-red-600 text-sm mt-1">{errors.specialization.message}</p>}
                        </div>

                        <div>
                            <input
                                type="text"
                                placeholder="University Name *"
                                {...register("universityName", { required: "University name is required" })}
                                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none"
                            />
                            {errors.universityName && <p className="text-red-600 text-sm mt-1">{errors.universityName.message}</p>}
                        </div>
                    </div>
                </section>

                {/* Work Experience */}
                <section>
                    <h2 className="text-xl md:text-2xl font-semibold text-center mb-6 text-blue-600">
                        Work Experience
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Previous */}
                        <div className="p-6 border-2 border-gray-200 rounded-xl shadow-sm bg-gray-50">
                            <h3 className="font-semibold mb-4 text-lg text-gray-700">Previous</h3>
                            <div>
                                <input
                                    type="text"
                                    placeholder="Hospital Name *"
                                    {...register("previousHospital", { required: "Previous hospital is required" })}
                                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none mb-3 bg-white"
                                />
                                {errors.previousHospital && <p className="text-red-600 text-sm mb-3">{errors.previousHospital.message}</p>}
                            </div>

                            <div>
                                <input
                                    type="text"
                                    placeholder="Position *"
                                    {...register("previousPosition", { required: "Previous position is required" })}
                                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none mb-3 bg-white"
                                />
                                {errors.previousPosition && <p className="text-red-600 text-sm mb-3">{errors.previousPosition.message}</p>}
                            </div>

                            <div className="flex gap-3">
                                <div className="flex-1">
                                    <input
                                        type="text"
                                        placeholder="From *"
                                        {...register("previousFrom", { required: "Start date is required" })}
                                        className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none bg-white"
                                    />
                                    {errors.previousFrom && <p className="text-red-600 text-sm mt-1">{errors.previousFrom.message}</p>}
                                </div>
                                <div className="flex-1">
                                    <input
                                        type="text"
                                        placeholder="To *"
                                        {...register("previousTo", { required: "End date is required" })}
                                        className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none bg-white"
                                    />
                                    {errors.previousTo && <p className="text-red-600 text-sm mt-1">{errors.previousTo.message}</p>}
                                </div>
                            </div>
                        </div>

                        {/* Current */}
                        <div className="p-6 border-2 border-blue-200 rounded-xl shadow-sm bg-blue-50">
                            <h3 className="font-semibold mb-4 text-lg text-gray-700">Current</h3>
                            <div>
                                <input
                                    type="text"
                                    placeholder="Hospital Name *"
                                    {...register("currentHospital", { required: "Current hospital is required" })}
                                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none mb-3 bg-white"
                                />
                                {errors.currentHospital && <p className="text-red-600 text-sm mb-3">{errors.currentHospital.message}</p>}
                            </div>

                            <div>
                                <input
                                    type="text"
                                    placeholder="Position *"
                                    {...register("currentPosition", { required: "Current position is required" })}
                                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none mb-3 bg-white"
                                />
                                {errors.currentPosition && <p className="text-red-600 text-sm mb-3">{errors.currentPosition.message}</p>}
                            </div>

                            <div className="flex gap-3">
                                <div className="flex-1">
                                    <input
                                        type="text"
                                        placeholder="From *"
                                        {...register("currentFrom", { required: "Start date is required" })}
                                        className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none bg-white"
                                    />
                                    {errors.currentFrom && <p className="text-red-600 text-sm mt-1">{errors.currentFrom.message}</p>}
                                </div>
                                <div className="flex-1">
                                    <input
                                        type="text"
                                        placeholder="To *"
                                        {...register("currentTo", { required: "End date is required" })}
                                        className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none bg-white"
                                    />
                                    {errors.currentTo && <p className="text-red-600 text-sm mt-1">{errors.currentTo.message}</p>}
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Available Time */}

                <section className="flex flex-col">
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">

                        {weekDays?.map((day) => (
                            <div key={day.value}>
                                <div className="flex items-center p-3 mb-4 bg-[var(--sidebar-bg)] border-2 border-[var(--dashboard-border)] rounded-xl hover:border-[var(--dashboard-blue)]/30 transition-all duration-300">
                                    <input
                                        id={`${day.name.toLowerCase()}-checkbox`}
                                        type="checkbox"
                                        value={day.value}
                                        name="day-checkbox"
                                        onChange={(e) => handleAvailableWeekDays(e)}
                                        className="w-4 h-4 text-[var(--dashboard-blue)] bg-[var(--sidebar-bg)] border-[var(--dashboard-border)] rounded focus:ring-[var(--dashboard-blue)] focus:ring-2"
                                    />
                                    <label
                                        htmlFor={`${day.name.toLowerCase()}-checkbox`}
                                        className="ml-2 text-sm font-medium text-[var(--fourground-color)] cursor-pointer"
                                    >
                                        {day.name}
                                    </label>

                                </div>

                                <div className={`flex gap-2 `}>
                                    {
                                        doctorAvailableDays.includes(day.value) && (
                                            <div className="flex gap-2">
                                                <div>
                                                    <label htmlFor={`from-${day.value}`}>From : </label>
                                                    <input
                                                        type="time"
                                                        id={`from-${day.value}`}
                                                        required
                                                        onChange={(e) => setTimeFrom(e.target.value)}
                                                        className="w-full p-3 text-[var(--fourground-color)] bg-[var(--sidebar-bg)] border-2 border-[var(--dashboard-border)] rounded-xl focus:outline-none focus:ring-2 focus:ring-[var(--dashboard-blue)]/30 focus:border-[var(--dashboard-blue)] transition-all duration-300"
                                                    />
                                                </div>

                                                <div>
                                                    <label htmlFor={`to-${day.value}`}>To :</label>
                                                    <input
                                                        type="time"
                                                        id={`to-${day.value}`}
                                                        required
                                                        onChange={(e) => captureAvailableSlot(day.value, timeFrom, e.target.value)}
                                                        className="w-full p-3 text-[var(--fourground-color)] bg-[var(--sidebar-bg)] border-2 border-[var(--dashboard-border)] rounded-xl focus:outline-none focus:ring-2 focus:ring-[var(--dashboard-blue)]/30 focus:border-[var(--dashboard-blue)] transition-all duration-300"
                                                    />
                                                </div>


                                            </div>
                                        )
                                    }
                                </div>
                            </div>


                        )



                        )}



                    </div>

                    {/* <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">

                        {
                            (() => {
                                const inputs = [];
                                for (let i = 0; i < timeLoop; i++) {
                                    inputs.push(
                                        <div key={i} className="space-y-2">
                                            <label htmlFor={`time-${i}`} className="text-sm text-[var(--fourground-color)]/70 font-medium" >
                                                Time {i + 1}
                                            </label>
                                            <input
                                                // onChange={handleMedicineTakingTimes}
                                                type="time"
                                                id={`time-${i}`}
                                                name={`time-${i}`}
                                                className="w-full p-3 text-[var(--fourground-color)] bg-[var(--sidebar-bg)] border-2 border-[var(--dashboard-border)] rounded-xl focus:outline-none focus:ring-2 focus:ring-[var(--dashboard-blue)]/30 focus:border-[var(--dashboard-blue)] transition-all duration-300"
                                            />
                                        </div>
                                    );
                                }
                                return inputs;
                            })()
                        }

                    </div> */}

                </section>

                {/* Certification And License */}

                <section>
                    <div className="mb-6">
                        <h2 className="text-xl md:text-2xl font-semibold text-center mb-6 text-blue-600">
                            Certification And License
                        </h2>
                        <p className="text-[var(--fourground-color)]/60 text-sm">
                            Provide your medical license and identification details
                        </p>
                    </div>

                    <div className="space-y-6">
                        {/* Medical License Number */}
                        <div>
                            <label
                                htmlFor="medicalLicenseNumber"
                                className="block mb-2 text-sm font-medium text-[var(--fourground-color)]"
                            >
                                Medical License Number <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="text"
                                id="medicalLicenseNumber"
                                name="medicalLicenseNumber"
                                // value={certificationData.medicalLicenseNumber}
                                // onChange={handleCertificationChange}
                                placeholder="Enter your medical license number"
                                required
                                className="w-full p-3 text-[var(--fourground-color)] bg-[var(--sidebar-bg)] border-2 border-[var(--dashboard-border)] rounded-xl focus:outline-none focus:ring-2 focus:ring-[var(--dashboard-blue)]/30 focus:border-[var(--dashboard-blue)] transition-all duration-300"
                            />
                        </div>

                        {/* Issuing Authority */}
                        <div>
                            <label
                                htmlFor="issuingAuthority"
                                className="block mb-2 text-sm font-medium text-[var(--fourground-color)]"
                            >
                                Issuing Authority <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="text"
                                id="issuingAuthority"
                                name="issuingAuthority"
                                // value={certificationData.issuingAuthority}
                                // onChange={handleCertificationChange}
                                placeholder="e.g., Medical Council of India"
                                required
                                className="w-full p-3 text-[var(--fourground-color)] bg-[var(--sidebar-bg)] border-2 border-[var(--dashboard-border)] rounded-xl focus:outline-none focus:ring-2 focus:ring-[var(--dashboard-blue)]/30 focus:border-[var(--dashboard-blue)] transition-all duration-300"
                            />
                        </div>

                        {/* Expiry Date */}
                        <div>
                            <label
                                htmlFor="expiryDate"
                                className="block mb-2 text-sm font-medium text-[var(--fourground-color)]"
                            >
                                Expiry Date <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="date"
                                id="expiryDate"
                                name="expiryDate"
                                // value={certificationData.expiryDate}
                                // onChange={handleCertificationChange}
                                required
                                className="w-full p-3 text-[var(--fourground-color)] bg-[var(--sidebar-bg)] border-2 border-[var(--dashboard-border)] rounded-xl focus:outline-none focus:ring-2 focus:ring-[var(--dashboard-blue)]/30 focus:border-[var(--dashboard-blue)] transition-all duration-300"
                            />
                        </div>

                        {/* License Certificate (PDF) */}
                        <div>
                            <label
                                htmlFor="licenseCertificate"
                                className="block mb-2 text-sm font-medium text-[var(--fourground-color)]"
                            >
                                License Certificate (PDF) <span className="text-red-500">*</span>
                            </label>
                            <div className="relative">
                                <input
                                    type="file"
                                    id="licenseCertificate"
                                    accept=".pdf"
                                    // onChange={(e) => handleFileUpload(e, 'licenseCertificate')}
                                    required
                                    className="w-full p-3 text-[var(--fourground-color)] bg-[var(--sidebar-bg)] border-2 border-[var(--dashboard-border)] rounded-xl focus:outline-none focus:ring-2 focus:ring-[var(--dashboard-blue)]/30 focus:border-[var(--dashboard-blue)] transition-all duration-300 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-[var(--dashboard-blue)] file:text-white hover:file:bg-[var(--dashboard-blue)]/80 file:cursor-pointer"
                                />
                            </div>
                            {/* {certificationData.licenseCertificate && (
                                <p className="mt-2 text-sm text-green-500">
                                    ✓ {certificationData.licenseCertificate.name}
                                </p>
                            )} */}
                        </div>

                        {/* Government ID (PDF) */}
                        <div>
                            <label
                                htmlFor="govtId"
                                className="block mb-2 text-sm font-medium text-[var(--fourground-color)]"
                            >
                                Government ID (PDF) <span className="text-red-500">*</span>
                            </label>
                            <div className="relative">
                                <input
                                    type="file"
                                    id="govtId"
                                    accept=".pdf"
                                    // onChange={(e) => handleFileUpload(e, 'govtId')}
                                    required
                                    className="w-full p-3 text-[var(--fourground-color)] bg-[var(--sidebar-bg)] border-2 border-[var(--dashboard-border)] rounded-xl focus:outline-none focus:ring-2 focus:ring-[var(--dashboard-blue)]/30 focus:border-[var(--dashboard-blue)] transition-all duration-300 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-[var(--dashboard-blue)] file:text-white hover:file:bg-[var(--dashboard-blue)]/80 file:cursor-pointer"
                                />
                            </div>
                            {/* {certificationData.govtId && (
                                <p className="mt-2 text-sm text-green-500">
                                    ✓ {certificationData.govtId.name}
                                </p>
                            )}
                            <p className="mt-1 text-xs text-[var(--fourground-color)]/60">
                                Accepted: Aadhaar, Passport, Driver's License, Voter ID
                            </p> */}
                        </div>
                    </div>
                </section>

                {/* Submit */}
                <div className="flex justify-center">
                    <button
                        type="submit"
                        className="px-12 py-4 bg-gradient-to-r from-green-400 to-green-500 text-white text-lg font-semibold rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
                    >
                        Submit Registration
                    </button>
                </div>
            </form>
        </div>
    );
};

export default Page;