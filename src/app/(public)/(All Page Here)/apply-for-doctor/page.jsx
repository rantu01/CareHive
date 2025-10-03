"use client"
import { Hospital, Upload } from "lucide-react";
import { useState } from "react";

const Page = () => {
    const [formData, setFormData] = useState({});
    const [errors, setErrors] = useState({});

    const [profileImage, setProfileImage] = useState("https://img.daisyui.com/images/profile/demo/spiderperson@192.webp");
    const [licenseCertificatePdf, setLicenseCertificate] = useState("")
    const [governmentIdPdf, setGovernmentIdPdf] = useState("")


    console.log(licenseCertificatePdf, governmentIdPdf)


    const [timeLoop, setTimeLoop] = useState(0)

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


    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(doctorAvailableDays)
        console.log(slots)
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
        <div className="min-h-screen text-gray-900">

            {/* Header */}
            <header className="flex justify-center items-center gap-3 py-6 shadow-lg" style={{ background: 'linear-gradient(to right, var(--color-calm-blue), var(--dashboard-blue))', color: 'var(--color-white)' }}>
                <Hospital size={40} />
                <h1 className="text-2xl md:text-4xl font-bold tracking-wide">
                    Doctor Registration Form
                </h1>
            </header>

            {/* Form */}
            <form
                onSubmit={handleSubmit}
                className="max-w-6xl mx-auto mt-10 shadow-2xl rounded-2xl p-6 md:p-10 space-y-10"
                style={{ backgroundColor: 'var(--color-white)', borderWidth: '1px', borderColor: 'var(--dashboard-border)' }}
            >
                {/* Personal Info */}
                <section>
                    <h2 className="text-xl md:text-2xl font-semibold text-center mb-6" style={{ color: 'var(--dashboard-blue)' }}>
                        Personal Information
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-6 gap-6 items-start">
                        {/* Avatar */}
                        <div className="flex flex-col justify-center items-center md:col-span-1 gap-3">
                            <div className="w-28 h-28 rounded-full overflow-hidden" style={{ border: '4px solid var(--dashboard-blue)', boxShadow: '0 0 0 4px var(--color-white)' }}>
                                <img
                                    src={profileImage}
                                    alt="profile"
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            <label className="cursor-pointer px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 transition-colors" style={{ backgroundColor: 'var(--dashboard-blue)', color: 'var(--color-white)' }}>
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
                                    required
                                    className="w-full px-4 py-3 rounded-lg focus:outline-none"
                                    style={{ borderWidth: '2px', borderColor: 'var(--dashboard-border)', color: 'var(--fourground-color)' }}
                                />
                            </div>

                            <div>
                                <input
                                    type="date"
                                    required
                                    className="w-full px-4 py-3 rounded-lg focus:outline-none"
                                    style={{ borderWidth: '2px', borderColor: 'var(--dashboard-border)', color: 'var(--fourground-color)' }}
                                />
                            </div>

                            <div>
                                <select
                                    required
                                    className="w-full px-4 py-3 rounded-lg focus:outline-none"
                                    style={{ borderWidth: '2px', borderColor: 'var(--dashboard-border)', backgroundColor: 'var(--color-white)', color: 'var(--fourground-color)' }}
                                >
                                    <option value="">Select Gender *</option>
                                    <option value="Female">Female</option>
                                    <option value="Male">Male</option>
                                </select>
                            </div>

                            <div>
                                <input
                                    type="tel"
                                    placeholder="Mobile Number *"
                                    required
                                    maxLength={11}
                                    className="w-full px-4 py-3 rounded-lg focus:outline-none"
                                    style={{ borderWidth: '2px', borderColor: 'var(--dashboard-border)', color: 'var(--fourground-color)' }}
                                />
                            </div>

                            <div>
                                <input
                                    type="tel"
                                    placeholder="WhatsApp *"
                                    required
                                    maxLength={11}
                                    className="w-full px-4 py-3 rounded-lg focus:outline-none"
                                    style={{ borderWidth: '2px', borderColor: 'var(--dashboard-border)', color: 'var(--fourground-color)' }}
                                />
                            </div>

                            <div>
                                <input
                                    type="email"
                                    placeholder="Email Address *"
                                    required
                                    className="w-full px-4 py-3 rounded-lg focus:outline-none"
                                    style={{ borderWidth: '2px', borderColor: 'var(--dashboard-border)', color: 'var(--fourground-color)' }}
                                />
                            </div>

                            <div>
                                <select
                                    required
                                    className="w-full px-4 py-3 rounded-lg focus:outline-none"
                                    style={{ borderWidth: '2px', borderColor: 'var(--dashboard-border)', backgroundColor: 'var(--color-white)', color: 'var(--fourground-color)' }}
                                >
                                    <option value="">Marital Status *</option>
                                    <option value="Married">Married</option>
                                    <option value="Unmarried">Unmarried</option>
                                    <option value="Engaged">Engaged</option>
                                </select>
                            </div>

                            <div>
                                <select
                                    required
                                    className="w-full px-4 py-3 rounded-lg focus:outline-none"
                                    style={{ borderWidth: '2px', borderColor: 'var(--dashboard-border)', backgroundColor: 'var(--color-white)', color: 'var(--fourground-color)' }}
                                >
                                    <option value="">Residential Status *</option>
                                    <option value="Residence">Residence</option>
                                    <option value="Non-Residence">Non-Residence</option>
                                </select>
                            </div>

                            <div>
                                <input
                                    type="text"
                                    placeholder="Nationality *"
                                    required
                                    className="w-full px-4 py-3 rounded-lg focus:outline-none"
                                    style={{ borderWidth: '2px', borderColor: 'var(--dashboard-border)', color: 'var(--fourground-color)' }}
                                />
                            </div>

                            <div>
                                <input
                                    type="text"
                                    placeholder="National ID No. *"
                                    required
                                    className="w-full px-4 py-3 rounded-lg focus:outline-none"
                                    style={{ borderWidth: '2px', borderColor: 'var(--dashboard-border)', color: 'var(--fourground-color)' }}
                                />
                            </div>

                            <div>
                                <input
                                    type="text"
                                    placeholder="Present Address *"
                                    required
                                    className="w-full px-4 py-3 rounded-lg focus:outline-none"
                                    style={{ borderWidth: '2px', borderColor: 'var(--dashboard-border)', color: 'var(--fourground-color)' }}
                                />
                            </div>

                            <div>
                                <input
                                    type="text"
                                    placeholder="Permanent Address *"
                                    required
                                    className="w-full px-4 py-3 rounded-lg focus:outline-none"
                                    style={{ borderWidth: '2px', borderColor: 'var(--dashboard-border)', color: 'var(--fourground-color)' }}
                                />
                            </div>
                        </div>
                    </div>
                </section>

                {/* Education */}
                <section>
                    <h2 className="text-xl md:text-2xl font-semibold text-center mb-6" style={{ color: 'var(--dashboard-blue)' }}>
                        Educational Qualification
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                            <input
                                type="text"
                                placeholder="Degree Name *"
                                required
                                className="w-full px-4 py-3 rounded-lg focus:outline-none"
                                style={{ borderWidth: '2px', borderColor: 'var(--dashboard-border)', color: 'var(--fourground-color)' }}
                            />
                        </div>

                        <div>
                            <input
                                type="text"
                                placeholder="Post Graduate *"
                                required
                                className="w-full px-4 py-3 rounded-lg focus:outline-none"
                                style={{ borderWidth: '2px', borderColor: 'var(--dashboard-border)', color: 'var(--fourground-color)' }}
                            />
                        </div>

                        <div>
                            <input
                                type="text"
                                placeholder="Graduation Year *"
                                required
                                className="w-full px-4 py-3 rounded-lg focus:outline-none"
                                style={{ borderWidth: '2px', borderColor: 'var(--dashboard-border)', color: 'var(--fourground-color)' }}
                            />
                        </div>

                        <div>
                            <input
                                type="text"
                                placeholder="Specialization *"
                                required
                                className="w-full px-4 py-3 rounded-lg focus:outline-none"
                                style={{ borderWidth: '2px', borderColor: 'var(--dashboard-border)', color: 'var(--fourground-color)' }}
                            />
                        </div>

                        <div>
                            <input
                                type="text"
                                placeholder="University Name *"
                                required
                                className="w-full px-4 py-3 rounded-lg focus:outline-none"
                                style={{ borderWidth: '2px', borderColor: 'var(--dashboard-border)', color: 'var(--fourground-color)' }}
                            />
                        </div>
                    </div>
                </section>

                {/* Work Experience */}
                <section>
                    <h2 className="text-xl md:text-2xl font-semibold text-center mb-6" style={{ color: 'var(--dashboard-blue)' }}>
                        Work Experience
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Previous */}
                        <div className="p-6 rounded-xl shadow-sm" style={{ borderWidth: '2px', borderColor: 'var(--dashboard-border)', backgroundColor: 'var(--gray-color)' }}>
                            <h3 className="font-semibold mb-4 text-lg" style={{ color: 'var(--fourground-color)' }}>Previous</h3>
                            <div>
                                <input
                                    type="text"
                                    placeholder="Hospital Name *"
                                    required
                                    className="w-full px-4 py-3 rounded-lg focus:outline-none mb-3"
                                    style={{ borderWidth: '2px', borderColor: 'var(--dashboard-border)', backgroundColor: 'var(--color-white)', color: 'var(--fourground-color)' }}
                                />
                            </div>

                            <div>
                                <input
                                    type="text"
                                    placeholder="Position *"
                                    required
                                    className="w-full px-4 py-3 rounded-lg focus:outline-none mb-3"
                                    style={{ borderWidth: '2px', borderColor: 'var(--dashboard-border)', backgroundColor: 'var(--color-white)', color: 'var(--fourground-color)' }}
                                />
                            </div>

                            <div className="flex gap-3">
                                <div className="flex-1">
                                    <input
                                        type="text"
                                        placeholder="From *"
                                        required
                                        className="w-full px-4 py-3 rounded-lg focus:outline-none"
                                        style={{ borderWidth: '2px', borderColor: 'var(--dashboard-border)', backgroundColor: 'var(--color-white)', color: 'var(--fourground-color)' }}
                                    />
                                </div>
                                <div className="flex-1">
                                    <input
                                        type="text"
                                        placeholder="To *"
                                        required
                                        className="w-full px-4 py-3 rounded-lg focus:outline-none"
                                        style={{ borderWidth: '2px', borderColor: 'var(--dashboard-border)', backgroundColor: 'var(--color-white)', color: 'var(--fourground-color)' }}
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Current */}
                        <div className="p-6 rounded-xl shadow-sm" style={{ borderWidth: '2px', borderColor: 'var(--dashboard-blue)', backgroundColor: 'var(--gray-color)' }}>
                            <h3 className="font-semibold mb-4 text-lg" style={{ color: 'var(--fourground-color)' }}>Current</h3>
                            <div>
                                <input
                                    type="text"
                                    placeholder="Hospital Name *"
                                    required
                                    className="w-full px-4 py-3 rounded-lg focus:outline-none mb-3"
                                    style={{ borderWidth: '2px', borderColor: 'var(--dashboard-border)', backgroundColor: 'var(--color-white)', color: 'var(--fourground-color)' }}
                                />
                            </div>

                            <div>
                                <input
                                    type="text"
                                    placeholder="Position *"
                                    required
                                    className="w-full px-4 py-3 rounded-lg focus:outline-none mb-3"
                                    style={{ borderWidth: '2px', borderColor: 'var(--dashboard-border)', backgroundColor: 'var(--color-white)', color: 'var(--fourground-color)' }}
                                />
                            </div>

                            <div className="flex gap-3">
                                <div className="flex-1">
                                    <input
                                        type="text"
                                        placeholder="From *"
                                        required
                                        className="w-full px-4 py-3 rounded-lg focus:outline-none"
                                        style={{ borderWidth: '2px', borderColor: 'var(--dashboard-border)', backgroundColor: 'var(--color-white)', color: 'var(--fourground-color)' }}
                                    />
                                </div>
                                <div className="flex-1">
                                    <input
                                        type="text"
                                        placeholder="To *"
                                        required
                                        className="w-full px-4 py-3 rounded-lg focus:outline-none"
                                        style={{ borderWidth: '2px', borderColor: 'var(--dashboard-border)', backgroundColor: 'var(--color-white)', color: 'var(--fourground-color)' }}
                                    />
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
                </section>

                {/* Certification And License */}
                <section>
                    <div className="mb-6">
                        <h2 className="text-xl md:text-2xl font-semibold text-center mb-6" style={{ color: 'var(--dashboard-blue)' }}>
                            Certification And License
                        </h2>
                        <p className="text-sm opacity-60" style={{ color: 'var(--fourground-color)' }}>
                            Provide your medical license and identification details
                        </p>
                    </div>

                    <div className="space-y-6">
                        <div>
                            <label htmlFor="medicalLicenseNumber" className="block mb-2 text-sm font-medium" style={{ color: 'var(--fourground-color)' }}>
                                Medical License Number <span style={{ color: '#ef4444' }}>*</span>
                            </label>
                            <input
                                type="text"
                                id="medicalLicenseNumber"
                                placeholder="Enter your medical license number"

                                required
                                className="w-full p-3 rounded-xl focus:outline-none focus:ring-2 transition-all duration-300"
                                style={{ color: 'var(--fourground-color)', backgroundColor: 'var(--color-white)', borderWidth: '2px', borderColor: 'var(--dashboard-border)' }}
                            />
                        </div>

                        <div>
                            <label htmlFor="issuingAuthority" className="block mb-2 text-sm font-medium" style={{ color: 'var(--fourground-color)' }}>
                                Issuing Authority <span style={{ color: '#ef4444' }}>*</span>
                            </label>
                            <input
                                type="text"
                                id="issuingAuthority"
                                placeholder="e.g., Medical Council of Bangladesh "
                                required
                                className="w-full p-3 rounded-xl focus:outline-none focus:ring-2 transition-all duration-300"
                                style={{ color: 'var(--fourground-color)', backgroundColor: 'var(--color-white)', borderWidth: '2px', borderColor: 'var(--dashboard-border)' }}
                            />
                        </div>

                        <div>
                            <label htmlFor="expiryDate" className="block mb-2 text-sm font-medium" style={{ color: 'var(--fourground-color)' }}>
                                Expiry Date <span style={{ color: '#ef4444' }}>*</span>
                            </label>
                            <input
                                type="date"
                                id="expiryDate"
                                required
                                className="w-full p-3 rounded-xl focus:outline-none focus:ring-2 transition-all duration-300"
                                style={{ color: 'var(--fourground-color)', backgroundColor: 'var(--color-white)', borderWidth: '2px', borderColor: 'var(--dashboard-border)' }}
                            />
                        </div>

                        <div>
                            <label htmlFor="licenseCertificate" className="block mb-2 text-sm font-medium" style={{ color: 'var(--fourground-color)' }}>
                                License Certificate (PDF) <span style={{ color: '#ef4444' }}>*</span>
                            </label>
                            <input
                                type="file"
                                id="licenseCertificate"
                                accept=".pdf"
                                onChange={(e) => { handlePdfUpload(e, setLicenseCertificate) }}
                                required
                                className="w-full p-3 rounded-xl focus:outline-none focus:ring-2 transition-all duration-300"
                                style={{ color: 'var(--fourground-color)', backgroundColor: 'var(--color-white)', borderWidth: '2px', borderColor: 'var(--dashboard-border)' }}
                            />
                        </div>

                        <div>
                            <label htmlFor="govtId" className="block mb-2 text-sm font-medium" style={{ color: 'var(--fourground-color)' }}>
                                Government ID (PDF) <span style={{ color: '#ef4444' }}>*</span>
                            </label>
                            <input
                                type="file"
                                id="govtId"
                                accept=".pdf"
                                required
                                onChange={(e) => { handlePdfUpload(e, setGovernmentIdPdf) }}
                                className="w-full p-3 rounded-xl focus:outline-none focus:ring-2 transition-all duration-300"
                                style={{ color: 'var(--fourground-color)', backgroundColor: 'var(--color-white)', borderWidth: '2px', borderColor: 'var(--dashboard-border)' }}
                            />
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