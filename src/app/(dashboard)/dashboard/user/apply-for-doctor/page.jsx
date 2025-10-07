"use client"
import axios from "axios";
import { Calendar, Camera, Flag, Heart, Hospital, Mail, MapPin, MessageCircle, Phone, Upload, User } from "lucide-react";
import { use, useState } from "react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import Home from "../../page";
import { AuthContext } from "@/app/context/authContext";

const Page = () => {


    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm()

    const {user} = use(AuthContext)

    const [formData, setFormData] = useState({});


    const [profileImage, setProfileImage] = useState("");
    const [licenseCertificatePdf, setLicenseCertificate] = useState("")
    const [governmentIdPdf, setGovernmentIdPdf] = useState("")


    console.log(licenseCertificatePdf, governmentIdPdf)


    const [timeLoop, setTimeLoop] = useState(0)

    const [doctorAvailableDays, setAvailableDays] = useState([])
    const [timeFrom, setTimeFrom] = useState('')
    const [slots, setSlots] = useState({});
    const [spokenLanguage, setSpokenLanguage] = useState([])

    const handleSpokenLanguage = (e) => {
        if (e.target.value && e.target.checked) {
            setSpokenLanguage([...spokenLanguage, e.target.value])
        } else {
            const newArray = spokenLanguage.filter((lang) => (lang !== e.target.value))
            setSpokenLanguage(newArray)
        }
    }




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

    const handleImageUpload = async (e) => {
        const file = e.target.files[0];
        if (file) {
            const imageData = new FormData()
            imageData.append("file", file)
            imageData.append("upload_preset", "carehive_persist")
            imageData.append("cloud_name", "dqbwtffom")

            const response = await fetch(`https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_IMAGE_CLOUD}/auto/upload`,
                {
                    method: "POST",
                    body: imageData
                }
            )

            const uploadImageURL = await response.json()
            setProfileImage(uploadImageURL?.url)
        } else return
    };




    const handlePdfUpload = async (e, pdfSater) => {
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

            const uploadPdfURL = await response.json()
            pdfSater(uploadPdfURL?.url)
        } else return
    };


    const onSubmit = async (data) => {

        const formData = {

            _id: { "$oid": `${user?.uid}` },
            personalInfo: {
                fullName: data?.fullName,
                dateOfBirth: data?.dob,
                gender: data?.gender,
                contactNumber: {
                    mobile: data?.mobile,
                    whatsapp: data?.whatsapp
                },
                email: data?.email,
                address: {
                    current: data?.presentAddress,
                    permanent: data?.permanentAddress
                }
            },

            educationAndCredentials: {
                medicalDegree: data?.degreeName,
                postGraduate: data?.postGraduate,
                university: {
                    name: data?.universityName,
                    graduationYear: data?.graduationYear
                },
                specialization: data?.specialization,
                workExperience: [
                    {
                        hospitalName: data?.previousHospital,
                        position: data?.previousPosition,
                        years: `${data?.previousFrom}-${data?.previousTo}`
                    },
                    {
                        hospitalName: data?.currentHospital,
                        position: data?.currentPosition,
                        years: `${data?.currentFrom}-${data?.currentTo}`
                    }
                ],
                currentAffiliation: data?.hospital
            },

            licenseAndVerification: {
                medicalLicenseNumber: data?.medicalLicenseNumber,
                expiryDate: data?.expiryDate,
                documents: {
                    licenseCertificate: licenseCertificatePdf,
                    govtId: governmentIdPdf
                }
            },

            practiceInfo: {
                consultationType: data?.consultation,
                workingHours: slots,
                consultationFees: {
                    online: data?.onlineFee,
                    inPerson: data?.offlineFee
                },
                languagesSpoken: spokenLanguage, // array
                profilePhoto: profileImage
            },

            status: {
                isVerified: false,
                adminRemarks: "",
                submittedAt: new Date().toISOString(),
                approvedAt: null
            }
        };

        try {
            const res = await axios.post("/api/approved-doctor", formData, {
                headers: {
                    "Content-Type": "application/json",
                },
            });

            Swal.fire({
                title: "✅ Successfully Submitted!",
                text: "Your approval request has been submitted.",
                icon: "success",
                confirmButtonText: "OK",
            });
        } catch (err) {
            Swal.fire({
                title: "❌ Submission Failed",
                text: err.response?.data?.message || err.message || "Something went wrong.",
                icon: "error",
                confirmButtonText: "Try Again",
            });
        }

    }


    const weekDays = [
        { name: "Sunday", value: 'sunday' },
        { name: "Monday", value: 'monday' },
        { name: "Tuesday", value: 'tuesday' },
        { name: "Wednesday", value: 'wednesday' },
        { name: "Thursday", value: 'thursday' },
        { name: "Friday", value: 'friday' },
        { name: "Saturday", value: 'saturday' },
    ];

    const lanaguages = [
        { name: "Bengali", value: 'bengali' },
        { name: "Hindi", value: 'hindi' },
        { name: "English", value: 'english' },
    ]


    return (
        <div className="min-h-screen text-gray-900 mt-18 bg-[var(--gray-color)]">

            {/* Header */}
            <header className="flex justify-center items-center gap-3 py-6 shadow-lg" style={{ background: 'linear-gradient(to right, var(--color-calm-blue), var(--dashboard-blue))', color: 'var(--color-white)' }}>
                <Hospital size={40} />
                <h1 className="text-2xl md:text-4xl font-bold tracking-wide">
                    Doctor Registration Form
                </h1>
            </header>

            {/* Form */}
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="max-w-6xl mx-auto mt-10 shadow-2xl rounded-2xl p-6 md:p-10 space-y-10"
            // style={{ backgroundColor: 'var(--color-white)', borderWidth: '1px', borderColor: 'var(--dashboard-border)' }}
            >
                {/* Personal Info */}


                <section>
                    <h2
                        className="text-xl md:text-2xl font-semibold text-center mb-6"
                        style={{ color: "var(--dashboard-blue)" }}
                    >
                        Personal Information
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-6 gap-6 items-start">
                        {/* Avatar */}
                        <div className="flex flex-col justify-center items-center md:col-span-1 gap-3">
                            <div
                                className="w-28 h-28 rounded-full overflow-hidden"
                                style={{
                                    border: "4px solid var(--dashboard-blue)",
                                    boxShadow: "0 0 0 4px var(--color-white)",
                                }}
                            >
                                {profileImage && <img
                                    src={profileImage}
                                    alt="profile"
                                    className="w-full h-full object-cover"
                                />}
                            </div>
                            <label
                                className="cursor-pointer px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 transition-colors"
                                style={{
                                    backgroundColor: "var(--dashboard-blue)",
                                    color: "var(--color-white)",
                                }}
                            >
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
                            {/* Full Name */}
                            <div>
                                <input
                                    type="text"
                                    placeholder="Full Name *"
                                    {...register("fullName", { required: "Full name is required" })}
                                    className="w-full px-4 py-3 rounded-lg focus:outline-none"
                                    style={{
                                        borderWidth: "2px",
                                        borderColor: "var(--dashboard-border)",
                                        color: "var(--fourground-color)",
                                    }}
                                />
                                {errors.fullName && (
                                    <p className="text-red-500 text-sm mt-1">{errors.fullName.message}</p>
                                )}
                            </div>

                            {/* Date of Birth */}
                            <div>
                                <input
                                    type="date"
                                    {...register("dob", { required: "Date of birth is required" })}
                                    className="w-full px-4 py-3 rounded-lg focus:outline-none"
                                    style={{
                                        borderWidth: "2px",
                                        borderColor: "var(--dashboard-border)",
                                        color: "var(--fourground-color)",
                                    }}
                                />
                                {errors.dob && (
                                    <p className="text-red-500 text-sm mt-1">{errors.dob.message}</p>
                                )}
                            </div>

                            {/* Gender */}
                            <div>
                                <select
                                    {...register("gender", { required: "Gender is required" })}
                                    className="w-full px-4 py-3 rounded-lg focus:outline-none"
                                    style={{
                                        borderWidth: "2px",
                                        borderColor: "var(--dashboard-border)",
                                        // backgroundColor: "var(--color-white)",
                                        color: "var(--fourground-color)",
                                    }}
                                >
                                    <option value="">Select Gender *</option>
                                    <option value="Female">Female</option>
                                    <option value="Male">Male</option>
                                </select>
                                {errors.gender && (
                                    <p className="text-red-500 text-sm mt-1">{errors.gender.message}</p>
                                )}
                            </div>

                            {/* Mobile Number */}
                            <div>
                                <input
                                    type="tel"
                                    placeholder="Mobile Number *"
                                    maxLength={11}
                                    {...register("mobile", { required: "Mobile number is required" })}
                                    className="w-full px-4 py-3 rounded-lg focus:outline-none"
                                    style={{
                                        borderWidth: "2px",
                                        borderColor: "var(--dashboard-border)",
                                        color: "var(--fourground-color)",
                                    }}
                                />
                                {errors.mobile && (
                                    <p className="text-red-500 text-sm mt-1">{errors.mobile.message}</p>
                                )}
                            </div>

                            {/* WhatsApp */}
                            <div>
                                <input
                                    type="tel"
                                    placeholder="WhatsApp *"
                                    maxLength={11}
                                    {...register("whatsapp", { required: "WhatsApp number is required" })}
                                    className="w-full px-4 py-3 rounded-lg focus:outline-none"
                                    style={{
                                        borderWidth: "2px",
                                        borderColor: "var(--dashboard-border)",
                                        color: "var(--fourground-color)",
                                    }}
                                />
                                {errors.whatsapp && (
                                    <p className="text-red-500 text-sm mt-1">{errors.whatsapp.message}</p>
                                )}
                            </div>

                            {/* Email */}
                            <div>
                                <input
                                    type="email"
                                    placeholder="Email Address *"
                                    {...register("email", { required: "Email is required" })}
                                    className="w-full px-4 py-3 rounded-lg focus:outline-none"
                                    style={{
                                        borderWidth: "2px",
                                        borderColor: "var(--dashboard-border)",
                                        color: "var(--fourground-color)",
                                    }}
                                />
                                {errors.email && (
                                    <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
                                )}
                            </div>

                            {/* Marital Status */}
                            <div>
                                <select
                                    {...register("maritalStatus", { required: "Marital status is required" })}
                                    className="w-full px-4 py-3 rounded-lg focus:outline-none"
                                    style={{
                                        borderWidth: "2px",
                                        borderColor: "var(--dashboard-border)",
                                        color: "var(--fourground-color)",
                                    }}
                                >
                                    <option value="">Marital Status *</option>
                                    <option value="Married">Married</option>
                                    <option value="Unmarried">Unmarried</option>
                                    <option value="Engaged">Engaged</option>
                                </select>
                                {errors.maritalStatus && (
                                    <p className="text-red-500 text-sm mt-1">{errors.maritalStatus.message}</p>
                                )}
                            </div>

                            {/* Residential Status */}
                            <div>
                                <select
                                    {...register("residentialStatus", {
                                        required: "Residential status is required",
                                    })}
                                    className="w-full px-4 py-3 rounded-lg focus:outline-none"
                                    style={{
                                        borderWidth: "2px",
                                        borderColor: "var(--dashboard-border)",
                                        color: "var(--fourground-color)",
                                    }}
                                >
                                    <option value="">Residential Status *</option>
                                    <option value="Residence">Residence</option>
                                    <option value="Non-Residence">Non-Residence</option>
                                </select>
                                {errors.residentialStatus && (
                                    <p className="text-red-500 text-sm mt-1">{errors.residentialStatus.message}</p>
                                )}
                            </div>

                            {/* Nationality */}
                            <div>
                                <input
                                    type="text"
                                    placeholder="Nationality *"
                                    {...register("nationality", { required: "Nationality is required" })}
                                    className="w-full px-4 py-3 rounded-lg focus:outline-none"
                                    style={{
                                        borderWidth: "2px",
                                        borderColor: "var(--dashboard-border)",
                                        color: "var(--fourground-color)",
                                    }}
                                />
                                {errors.nationality && (
                                    <p className="text-red-500 text-sm mt-1">{errors.nationality.message}</p>
                                )}
                            </div>

                            {/* National ID */}
                            {/* <div>
                                <input
                                    type="text"
                                    placeholder="National ID No. *"
                                    {...register("nid", { required: "National ID is required" })}
                                    className="w-full px-4 py-3 rounded-lg focus:outline-none"
                                    style={{
                                        borderWidth: "2px",
                                        borderColor: "var(--dashboard-border)",
                                        color: "var(--fourground-color)",
                                    }}
                                />
                                {errors.nid && (
                                    <p className="text-red-500 text-sm mt-1">{errors.nid.message}</p>
                                )}
                            </div> */}

                            {/* Present Address */}
                            <div>
                                <input
                                    type="text"
                                    placeholder="Present Address *"
                                    {...register("presentAddress", {
                                        required: "Present address is required",
                                    })}
                                    className="w-full px-4 py-3 rounded-lg focus:outline-none"
                                    style={{
                                        borderWidth: "2px",
                                        borderColor: "var(--dashboard-border)",
                                        color: "var(--fourground-color)",
                                    }}
                                />
                                {errors.presentAddress && (
                                    <p className="text-red-500 text-sm mt-1">{errors.presentAddress.message}</p>
                                )}
                            </div>

                            {/* Permanent Address */}
                            <div>
                                <input
                                    type="text"
                                    placeholder="Permanent Address *"
                                    {...register("permanentAddress", {
                                        required: "Permanent address is required",
                                    })}
                                    className="w-full px-4 py-3 rounded-lg focus:outline-none"
                                    style={{
                                        borderWidth: "2px",
                                        borderColor: "var(--dashboard-border)",
                                        color: "var(--fourground-color)",
                                    }}
                                />
                                {errors.permanentAddress && (
                                    <p className="text-red-500 text-sm mt-1">{errors.permanentAddress.message}</p>
                                )}
                            </div>
                        </div>
                    </div>
                </section>
                {/* Education */}
                <section>
                    <h2
                        className="text-xl md:text-2xl font-semibold text-center mb-6"
                        style={{ color: "var(--dashboard-blue)" }}
                    >
                        Educational Qualification
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {/* Degree Name */}
                        <div>
                            <input
                                type="text"
                                placeholder="Degree Name *"
                                {...register("degreeName", { required: "Degree name is required" })}
                                className="w-full px-4 py-3 rounded-lg focus:outline-none"
                                style={{
                                    borderWidth: "2px",
                                    borderColor: "var(--dashboard-border)",
                                    color: "var(--fourground-color)",
                                }}
                            />
                            {errors.degreeName && (
                                <p className="text-red-500 text-sm mt-1">
                                    {errors.degreeName.message}
                                </p>
                            )}
                        </div>

                        {/* Post Graduate */}
                        <div>
                            <input
                                type="text"
                                placeholder="Post Graduate *"
                                {...register("postGraduate", { required: "Post graduate info is required" })}
                                className="w-full px-4 py-3 rounded-lg focus:outline-none"
                                style={{
                                    borderWidth: "2px",
                                    borderColor: "var(--dashboard-border)",
                                    color: "var(--fourground-color)",
                                }}
                            />
                            {errors.postGraduate && (
                                <p className="text-red-500 text-sm mt-1">
                                    {errors.postGraduate.message}
                                </p>
                            )}
                        </div>

                        {/* Graduation Year */}
                        <div>
                            <input
                                type="text"
                                placeholder="Graduation Year *"
                                {...register("graduationYear", {
                                    required: "Graduation year is required",
                                    pattern: {
                                        value: /^[0-9]{4}$/,
                                        message: "Enter a valid year (e.g., 2020)",
                                    },
                                })}
                                className="w-full px-4 py-3 rounded-lg focus:outline-none"
                                style={{
                                    borderWidth: "2px",
                                    borderColor: "var(--dashboard-border)",
                                    color: "var(--fourground-color)",
                                }}
                            />
                            {errors.graduationYear && (
                                <p className="text-red-500 text-sm mt-1">
                                    {errors.graduationYear.message}
                                </p>
                            )}
                        </div>

                        {/* Specialization */}
                        <div>
                            <input
                                type="text"
                                placeholder="Specialization *"
                                {...register("specialization", {
                                    required: "Specialization is required",
                                })}
                                className="w-full px-4 py-3 rounded-lg focus:outline-none"
                                style={{
                                    borderWidth: "2px",
                                    borderColor: "var(--dashboard-border)",
                                    color: "var(--fourground-color)",
                                }}
                            />
                            {errors.specialization && (
                                <p className="text-red-500 text-sm mt-1">
                                    {errors.specialization.message}
                                </p>
                            )}
                        </div>

                        {/* University Name */}
                        <div>
                            <input
                                type="text"
                                placeholder="University Name *"
                                {...register("universityName", {
                                    required: "University name is required",
                                })}
                                className="w-full px-4 py-3 rounded-lg focus:outline-none"
                                style={{
                                    borderWidth: "2px",
                                    borderColor: "var(--dashboard-border)",
                                    color: "var(--fourground-color)",
                                }}
                            />
                            {errors.universityName && (
                                <p className="text-red-500 text-sm mt-1">
                                    {errors.universityName.message}
                                </p>
                            )}
                        </div>
                    </div>
                </section>


                {/* Work Experience */}
                <section>
                    <h2
                        className="text-xl md:text-2xl font-semibold text-center mb-6"
                        style={{ color: "var(--dashboard-blue)" }}
                    >
                        Work Experience
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Previous */}
                        <div
                            className="p-6 rounded-xl shadow-sm"
                            style={{
                                borderWidth: "2px",
                                borderColor: "var(--dashboard-border)",
                                backgroundColor: "var(--gray-color)",
                            }}
                        >
                            <h3
                                className="font-semibold mb-4 text-lg"
                                style={{ color: "var(--fourground-color)" }}
                            >
                                Previous
                            </h3>

                            {/* Hospital Name */}
                            <div>
                                <input
                                    type="text"
                                    placeholder="Hospital Name *"
                                    {...register("previousHospital", {
                                        required: "Previous hospital name is required",
                                    })}
                                    className="w-full px-4 py-3 rounded-lg focus:outline-none mb-3"
                                    style={{
                                        borderWidth: "2px",
                                        borderColor: "var(--dashboard-border)",
                                        color: "var(--fourground-color)",
                                    }}
                                />
                                {errors.previousHospital && (
                                    <p className="text-red-500 text-sm mt-1">
                                        {errors.previousHospital.message}
                                    </p>
                                )}
                            </div>

                            {/* Position */}
                            <div>
                                <input
                                    type="text"
                                    placeholder="Position *"
                                    {...register("previousPosition", {
                                        required: "Previous position is required",
                                    })}
                                    className="w-full px-4 py-3 rounded-lg focus:outline-none mb-3"
                                    style={{
                                        borderWidth: "2px",
                                        borderColor: "var(--dashboard-border)",
                                        color: "var(--fourground-color)",
                                    }}
                                />
                                {errors.previousPosition && (
                                    <p className="text-red-500 text-sm mt-1">
                                        {errors.previousPosition.message}
                                    </p>
                                )}
                            </div>

                            {/* From & To */}
                            <div className="flex gap-3">
                                <div className="flex-1">
                                    <input
                                        type="text"
                                        placeholder="From *"
                                        {...register("previousFrom", { required: "Start year is required" })}
                                        className="w-full px-4 py-3 rounded-lg focus:outline-none"
                                        style={{
                                            borderWidth: "2px",
                                            borderColor: "var(--dashboard-border)",
                                            color: "var(--fourground-color)",
                                        }}
                                    />
                                    {errors.previousFrom && (
                                        <p className="text-red-500 text-sm mt-1">
                                            {errors.previousFrom.message}
                                        </p>
                                    )}
                                </div>
                                <div className="flex-1">
                                    <input
                                        type="text"
                                        placeholder="To *"
                                        {...register("previousTo", { required: "End year is required" })}
                                        className="w-full px-4 py-3 rounded-lg focus:outline-none"
                                        style={{
                                            borderWidth: "2px",
                                            borderColor: "var(--dashboard-border)",
                                            color: "var(--fourground-color)",
                                        }}
                                    />
                                    {errors.previousTo && (
                                        <p className="text-red-500 text-sm mt-1">
                                            {errors.previousTo.message}
                                        </p>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Current */}
                        <div
                            className="p-6 rounded-xl shadow-sm"
                            style={{
                                borderWidth: "2px",
                                borderColor: "var(--dashboard-blue)",
                                backgroundColor: "var(--gray-color)",
                            }}
                        >
                            <h3
                                className="font-semibold mb-4 text-lg"
                                style={{ color: "var(--fourground-color)" }}
                            >
                                Current
                            </h3>

                            {/* Hospital Name */}
                            <div>
                                <input
                                    type="text"
                                    placeholder="Hospital Name *"
                                    {...register("currentHospital", {
                                        required: "Current hospital name is required",
                                    })}
                                    className="w-full px-4 py-3 rounded-lg focus:outline-none mb-3"
                                    style={{
                                        borderWidth: "2px",
                                        borderColor: "var(--dashboard-border)",
                                        color: "var(--fourground-color)",
                                    }}
                                />
                                {errors.currentHospital && (
                                    <p className="text-red-500 text-sm mt-1">
                                        {errors.currentHospital.message}
                                    </p>
                                )}
                            </div>

                            {/* Position */}
                            <div>
                                <input
                                    type="text"
                                    placeholder="Position *"
                                    {...register("currentPosition", {
                                        required: "Current position is required",
                                    })}
                                    className="w-full px-4 py-3 rounded-lg focus:outline-none mb-3"
                                    style={{
                                        borderWidth: "2px",
                                        borderColor: "var(--dashboard-border)",
                                        color: "var(--fourground-color)",
                                    }}
                                />
                                {errors.currentPosition && (
                                    <p className="text-red-500 text-sm mt-1">
                                        {errors.currentPosition.message}
                                    </p>
                                )}
                            </div>

                            {/* From & To */}
                            <div className="flex gap-3">
                                <div className="flex-1">
                                    <input
                                        type="text"
                                        placeholder="From *"
                                        {...register("currentFrom", { required: "Start year is required" })}
                                        className="w-full px-4 py-3 rounded-lg focus:outline-none"
                                        style={{
                                            borderWidth: "2px",
                                            borderColor: "var(--dashboard-border)",
                                            color: "var(--fourground-color)",
                                        }}
                                    />
                                    {errors.currentFrom && (
                                        <p className="text-red-500 text-sm mt-1">
                                            {errors.currentFrom.message}
                                        </p>
                                    )}
                                </div>
                                <div className="flex-1">
                                    <input
                                        type="text"
                                        placeholder="To *"
                                        {...register("currentTo", { required: "End year is required" })}
                                        className="w-full px-4 py-3 rounded-lg focus:outline-none"
                                        style={{
                                            borderWidth: "2px",
                                            borderColor: "var(--dashboard-border)",
                                            color: "var(--fourground-color)",
                                        }}
                                    />
                                    {errors.currentTo && (
                                        <p className="text-red-500 text-sm mt-1">
                                            {errors.currentTo.message}
                                        </p>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </section>


                {/* Available Time */}
                <section className="flex flex-col">
                    <h2 className="text-xl md:text-2xl font-semibold text-center mb-6" style={{ color: 'var(--dashboard-blue)' }}>
                        Available Days & Time
                    </h2>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                        {weekDays?.map((day) => (
                            <div key={day.value}>
                                <div className="flex items-center p-3 mb-4 rounded-xl transition-all duration-300" style={{ backgroundColor: 'var(--gray-color)', borderWidth: '2px', borderColor: 'var(--dashboard-border)' }}>
                                    <input
                                        id={`${day.name.toLowerCase()}-checkbox`}
                                        type="checkbox"
                                        value={day.value}
                                        name="day-checkbox"
                                        onChange={(e) => handleAvailableWeekDays(e)}
                                        className="w-4 h-4 rounded focus:ring-2"
                                        style={{ accentColor: 'var(--dashboard-blue)' }}
                                    />
                                    <label
                                        htmlFor={`${day.name.toLowerCase()}-checkbox`}
                                        className="ml-2 text-sm font-medium cursor-pointer"
                                        style={{ color: 'var(--fourground-color)' }}
                                    >
                                        {day.name}
                                    </label>
                                </div>

                                <div className="flex gap-2">
                                    {doctorAvailableDays.includes(day.value) && (
                                        <div className="flex gap-2">
                                            <div>
                                                <label htmlFor={`from-${day.value}`} className="text-sm" style={{ color: 'var(--fourground-color)' }}>From : </label>
                                                <input
                                                    type="time"
                                                    id={`from-${day.value}`}
                                                    required
                                                    onChange={(e) => setTimeFrom(e.target.value)}
                                                    className="w-full p-3 rounded-xl focus:outline-none focus:ring-2 transition-all duration-300"
                                                    style={{ color: 'var(--fourground-color)', backgroundColor: 'var(--color-white)', borderWidth: '2px', borderColor: 'var(--dashboard-border)' }}
                                                />
                                            </div>

                                            <div>
                                                <label htmlFor={`to-${day.value}`} className="text-sm" style={{ color: 'var(--fourground-color)' }}>To :</label>
                                                <input
                                                    type="time"
                                                    id={`to-${day.value}`}
                                                    required
                                                    onChange={(e) => captureAvailableSlot(day.value, timeFrom, e.target.value)}
                                                    className="w-full p-3 rounded-xl focus:outline-none focus:ring-2 transition-all duration-300"
                                                    style={{ color: 'var(--fourground-color)', backgroundColor: 'var(--color-white)', borderWidth: '2px', borderColor: 'var(--dashboard-border)' }}
                                                />
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="flex flex-col gap-4 p-3 rounded-md  shadow">
                        {/* Consultation Type */}
                        <div className="flex flex-col ">
                            <label htmlFor="consultation" className="font-medium mb-1 text-[var(--fourground-color)]">
                                Consultation Type
                            </label>
                            <select
                                id="consultation"
                                {...register("consultation", { required: true })}
                                className="border rounded px-3 py-2 text-[var(--fourground-color)] bg-[var(--gray-color)] focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                                <option value="">Select...</option>
                                <option value="online">Online</option>
                                <option value="offline">Offline</option>
                                <option value="both">Both</option>
                            </select>
                        </div>

                        {/* Hospital Name */}
                        <div className="flex flex-col text-[var(--fourground-color)]">
                            <label htmlFor="hospital" className="font-medium mb-1">
                                Hospital Name
                            </label>
                            <input
                                id="hospital"
                                type="text"
                                placeholder="Enter hospital name"
                                {...register("hospital", { required: true })}
                                className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>


                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 ">
                            <div>
                                <label
                                    htmlFor="offline-fee"
                                    className="font-medium mb-1 block"
                                    style={{ color: "var(--fourground-color)" }}
                                >
                                    Offline Fee
                                </label>
                                <input
                                    type="number"
                                    id="offline-fee"
                                    placeholder="Offline Fee"
                                    {...register("offlineFee", { required: true })}
                                    className="w-full px-4 py-3 rounded-lg focus:outline-none"
                                    style={{
                                        borderWidth: "2px",
                                        borderColor: "var(--dashboard-border)",
                                        color: "var(--fourground-color)",
                                    }}
                                />
                            </div>

                            <div>
                                <label
                                    htmlFor="online-fee"
                                    className="font-medium mb-1 block"
                                    style={{ color: "var(--fourground-color)" }}
                                >
                                    Online Fee
                                </label>
                                <input
                                    type="number"
                                    id="online-fee"
                                    placeholder="Online Fee"
                                    {...register("onlineFee", { required: true })}
                                    className="w-full px-4 py-3 rounded-lg focus:outline-none"
                                    style={{
                                        borderWidth: "2px",
                                        borderColor: "var(--dashboard-border)",
                                        color: "var(--fourground-color)",
                                    }}
                                />
                            </div>
                        </div>
                        <div className="flex md:flex-row gap-6 justify-center items-center">
                            {lanaguages?.map((lang) => (
                                <div key={lang.value}>
                                    <div className="flex items-center p-3 mb-4 rounded-xl transition-all duration-300" style={{ backgroundColor: 'var(--gray-color)', borderWidth: '2px', borderColor: 'var(--dashboard-border)' }}>
                                        <input
                                            id={`${lang.name.toLowerCase()}-checkbox`}
                                            type="checkbox"
                                            value={lang.value}
                                            name="day-checkbox"
                                            onChange={(e) => handleSpokenLanguage(e)}
                                            className="w-4 h-4 rounded focus:ring-2"
                                            style={{ accentColor: 'var(--dashboard-blue)' }}
                                        />
                                        <label
                                            htmlFor={`${lang.name.toLowerCase()}-checkbox`}
                                            className="ml-2 text-sm font-medium cursor-pointer"
                                            style={{ color: 'var(--fourground-color)' }}
                                        >
                                            {lang.name}
                                        </label>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                </section>

                {/* Certification And License */}
                <section>
                    <div className="mb-6">
                        <h2
                            className="text-xl md:text-2xl font-semibold text-center mb-6"
                            style={{ color: "var(--dashboard-blue)" }}
                        >
                            Certification And License
                        </h2>
                        <p
                            className="text-sm opacity-60"
                            style={{ color: "var(--fourground-color)" }}
                        >
                            Provide your medical license and identification details
                        </p>
                    </div>

                    <div className="space-y-6">
                        {/* Medical License Number */}
                        <div>
                            <label
                                htmlFor="medicalLicenseNumber"
                                className="block mb-2 text-sm font-medium"
                                style={{ color: "var(--fourground-color)" }}
                            >
                                Medical License Number <span style={{ color: "#ef4444" }}>*</span>
                            </label>
                            <input
                                type="text"
                                id="medicalLicenseNumber"
                                placeholder="Enter your medical license number"
                                {...register("medicalLicenseNumber", {
                                    required: "Medical license number is required",
                                })}
                                className="w-full p-3 rounded-xl focus:outline-none focus:ring-2 transition-all duration-300"
                                style={{
                                    color: "var(--fourground-color)",
                                    borderWidth: "2px",
                                    borderColor: "var(--dashboard-border)",
                                }}
                            />
                            {errors.medicalLicenseNumber && (
                                <p className="text-red-500 text-sm mt-1">
                                    {errors.medicalLicenseNumber.message}
                                </p>
                            )}
                        </div>

                        {/* Issuing Authority */}
                        <div>
                            <label
                                htmlFor="issuingAuthority"
                                className="block mb-2 text-sm font-medium"
                                style={{ color: "var(--fourground-color)" }}
                            >
                                Issuing Authority <span style={{ color: "#ef4444" }}>*</span>
                            </label>
                            <input
                                type="text"
                                id="issuingAuthority"
                                placeholder="e.g., Medical Council of Bangladesh"
                                {...register("issuingAuthority", {
                                    required: "Issuing authority is required",
                                })}
                                className="w-full p-3 rounded-xl focus:outline-none focus:ring-2 transition-all duration-300"
                                style={{
                                    color: "var(--fourground-color)",
                                    borderWidth: "2px",
                                    borderColor: "var(--dashboard-border)",
                                }}
                            />
                            {errors.issuingAuthority && (
                                <p className="text-red-500 text-sm mt-1">
                                    {errors.issuingAuthority.message}
                                </p>
                            )}
                        </div>

                        {/* Expiry Date */}
                        <div>
                            <label
                                htmlFor="expiryDate"
                                className="block mb-2 text-sm font-medium"
                                style={{ color: "var(--fourground-color)" }}
                            >
                                Expiry Date <span style={{ color: "#ef4444" }}>*</span>
                            </label>
                            <input
                                type="date"
                                id="expiryDate"
                                {...register("expiryDate", { required: "Expiry date is required" })}
                                className="w-full p-3 rounded-xl focus:outline-none focus:ring-2 transition-all duration-300"
                                style={{
                                    color: "var(--fourground-color)",
                                    borderWidth: "2px",
                                    borderColor: "var(--dashboard-border)",
                                }}
                            />
                            {errors.expiryDate && (
                                <p className="text-red-500 text-sm mt-1">{errors.expiryDate.message}</p>
                            )}
                        </div>

                        {/* License Certificate PDF */}
                        <div>
                            <label
                                htmlFor="licenseCertificate"
                                className="block mb-2 text-sm font-medium"
                                style={{ color: "var(--fourground-color)" }}
                            >
                                License Certificate (PDF) <span style={{ color: "#ef4444" }}>*</span>
                            </label>
                            <input
                                type="file"
                                id="licenseCertificate"
                                accept=".pdf"
                                {...register("licenseCertificate", {
                                    required: "License certificate PDF is required",
                                })}
                                onChange={(e) => handlePdfUpload(e, setLicenseCertificate)}
                                className="w-full p-3 rounded-xl focus:outline-none focus:ring-2 transition-all duration-300"
                                style={{
                                    color: "var(--fourground-color)",
                                    borderWidth: "2px",
                                    borderColor: "var(--dashboard-border)",
                                }}
                            />
                            {errors.licenseCertificate && (
                                <p className="text-red-500 text-sm mt-1">
                                    {errors.licenseCertificate.message}
                                </p>
                            )}
                        </div>

                        {/* Government ID PDF */}
                        <div>
                            <label
                                htmlFor="govtId"
                                className="block mb-2 text-sm font-medium"
                                style={{ color: "var(--fourground-color)" }}
                            >
                                Government ID (PDF) <span style={{ color: "#ef4444" }}>*</span>
                            </label>
                            <input
                                type="file"
                                id="govtId"
                                accept=".pdf"
                                {...register("govtId", {
                                    required: "Government ID PDF is required",
                                })}
                                onChange={(e) => handlePdfUpload(e, setGovernmentIdPdf)}
                                className="w-full p-3 rounded-xl focus:outline-none focus:ring-2 transition-all duration-300"
                                style={{
                                    color: "var(--fourground-color)",
                                    borderWidth: "2px",
                                    borderColor: "var(--dashboard-border)",
                                }}
                            />
                            {errors.govtId && (
                                <p className="text-red-500 text-sm mt-1">{errors.govtId.message}</p>
                            )}
                        </div>
                    </div>
                </section>
                {/* Submit */}
                <div className="flex justify-center">
                    <button
                        type="submit"
                        className="px-12 py-4 text-lg font-semibold rounded-lg shadow-lg transform hover:scale-105 transition-all duration-200"
                        style={{ background: 'linear-gradient(to right, var(--color-light-green), var(--color-light-green))', color: 'var(--fourground-color)' }}
                    >
                        Submit Registration
                    </button>
                </div>
            </form>
        </div>
    );
};

export default Page;