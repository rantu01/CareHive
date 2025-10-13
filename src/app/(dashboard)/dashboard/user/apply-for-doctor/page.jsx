"use client"
import axios from "axios";
import { Calendar, Camera, Flag, Heart, Hospital, Mail, MapPin, MessageCircle, Phone, Upload, User, ChevronLeft, ChevronRight } from "lucide-react";
import { use, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { AuthContext } from "@/app/context/authContext";
import PersonalInfoSection from "@/app/Component/Apply-for-doc-components/PersonalInfoSection";
import EducationSection from "@/app/Component/Apply-for-doc-components/EducationSection";
import WorkExperience from "@/app/Component/Apply-for-doc-components/WorkExperience";
import AvailableTimeSection from "@/app/Component/Apply-for-doc-components/AvailableTimeSection";
import CertificationAndLicenceSection from "@/app/Component/Apply-for-doc-components/CertificationAndLicenceSection";

const Page = () => {
    const methods = useForm();
    const { register, handleSubmit } = methods;
    const { user } = use(AuthContext);

    const [profileImage, setProfileImage] = useState("");
    const [licenseCertificatePdf, setLicenseCertificate] = useState("");
    const [governmentIdPdf, setGovernmentIdPdf] = useState("");
    const [timeLoop, setTimeLoop] = useState(0);
    const [doctorAvailableDays, setAvailableDays] = useState([]);
    const [slots, setSlots] = useState({});
    const [spokenLanguage, setSpokenLanguage] = useState([]);
    const [patientLimit, setPatientLimit] = useState({});

    const [doctorHospital, setDoctorHospital] = useState("")


    // Carousel state
    const [currentStep, setCurrentStep] = useState(0);

    const steps = [
        { id: 0, title: "Personal Info", shortTitle: "Personal", icon: User },
        { id: 1, title: "Education", shortTitle: "Education", icon: Calendar },
        { id: 2, title: "Experience", shortTitle: "Work", icon: Hospital },
        { id: 3, title: "Availability", shortTitle: "Time", icon: MessageCircle },
        { id: 4, title: "Certification", shortTitle: "License", icon: Flag }
    ];

    const nextStep = () => {
        if (currentStep < steps.length - 1) {
            setCurrentStep(currentStep + 1);
        }
    };

    const prevStep = () => {
        if (currentStep > 0) {
            setCurrentStep(currentStep - 1);
        }
    };

    const goToStep = (step) => {
        setCurrentStep(step);
    };


    // original


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
                email: user?.email,
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
                patientLimit: patientLimit,
                totalCapacity:patientLimit,
                consultationFees: {
                    online: data?.onlineFee,
                    inPerson: data?.offlineFee
                },
                languagesSpoken: spokenLanguage,
                profilePhoto: profileImage,
                clinicAddress: doctorHospital
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

            await fetch("/api/send-notification", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    targetRole: "admin",
                    title: "New Doctor Application Received",
                    body: `${data?.fullName} has applied for doctor approval.`,
                })
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
    };

    return (
        <div className="min-h-screen text-gray-900 ">
            {/* Header */}
            <header className="flex justify-center items-center gap-2 md:gap-3 py-4 md:py-6 shadow-lg bg-gradient-to-r from-blue-600 to-cyan-600 text-white px-4">
                <Hospital className="w-6 h-6 md:w-10 md:h-10" />
                <h1 className="text-lg sm:text-xl md:text-3xl lg:text-4xl font-bold tracking-wide text-center">
                    Doctor Registration Form
                </h1>
            </header>

            <FormProvider {...methods}>
                <form onSubmit={handleSubmit(onSubmit)} className="max-w-7xl mx-auto mt-4 md:mt-10 px-3 sm:px-4 md:px-6 pb-6 md:pb-10">
                    {/* Progress Steps - Desktop/Tablet */}
                    <div className="hidden sm:block mb-6 md:mb-8 rounded-xl md:rounded-2xl shadow-xl p-4 md:p-6">
                        <div className="flex items-center justify-between">
                            {steps.map((step, index) => {
                                const Icon = step.icon;
                                return (
                                    <div key={step.id} className="flex items-center flex-1">
                                        <button
                                            type="button"
                                            onClick={() => goToStep(index)}
                                            className={`flex flex-col items-center transition-all duration-300 w-full ${currentStep === index
                                                ? 'scale-105 md:scale-110'
                                                : currentStep > index
                                                    ? 'opacity-75'
                                                    : 'opacity-50'
                                                }`}
                                        >
                                            <div
                                                className={`w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 lg:w-16 lg:h-16 rounded-full flex items-center justify-center transition-all duration-300 ${currentStep === index
                                                    ? 'bg-gradient-to-r from-blue-600 to-cyan-600 text-white shadow-lg'
                                                    : currentStep > index
                                                        ? 'bg-green-500 text-white'
                                                        : 'bg-gray-200 text-gray-500'
                                                    }`}
                                            >
                                                <Icon className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" />
                                            </div>
                                            <span className={`mt-1 md:mt-2 text-[10px] sm:text-xs md:text-sm font-medium text-center px-1 ${currentStep === index ? 'text-blue-600' : 'text-gray-500'
                                                }`}>
                                                <span className="hidden lg:inline">{step.title}</span>
                                                <span className="lg:hidden">{step.shortTitle}</span>
                                            </span>
                                        </button>
                                        {index < steps.length - 1 && (
                                            <div className={`flex-1 h-0.5 md:h-1 mx-1 md:mx-2 transition-all duration-300 ${currentStep > index ? 'bg-green-500' : 'bg-gray-200'
                                                }`} />
                                        )}
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    {/* Progress Steps - Mobile */}
                    <div className="sm:hidden mb-4 rounded-xl shadow-xl p-4">
                        <div className="flex items-center justify-between mb-3">
                            <div className="flex items-center gap-2">
                                {steps.map((step) => {
                                    if (step.id === currentStep) {
                                        const Icon = step.icon;
                                        return (
                                            <div key={step.id} className="flex items-center gap-2">
                                                <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-600 to-cyan-600 text-white flex items-center justify-center">
                                                    <Icon className="w-5 h-5" />
                                                </div>
                                                <span className="text-sm font-semibold text-blue-600">
                                                    {step.title}
                                                </span>
                                            </div>
                                        );
                                    }
                                    return null;
                                })}
                            </div>
                            <span className="text-xs font-medium text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                                {currentStep + 1} / {steps.length}
                            </span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                            <div
                                className="bg-gradient-to-r from-blue-600 to-cyan-600 h-2 rounded-full transition-all duration-300"
                                style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
                            />
                        </div>
                    </div>

                    {/* Carousel Container */}
                    <div className="relative  rounded-xl md:rounded-2xl shadow-2xl overflow-hidden">
                        {/* Slide Content */}
                        <div className="p-4 sm:p-6 md:p-8 lg:p-10 min-h-[400px] sm:min-h-[500px] md:min-h-[600px]">
                            <div className="transition-all duration-500 ease-in-out">
                                {currentStep === 0 && (
                                    <div className="animate-fadeIn">
                                        <PersonalInfoSection
                                            profileImage={profileImage}
                                            setProfileImage={setProfileImage}
                                        />
                                    </div>
                                )}
                                {currentStep === 1 && (
                                    <div className="animate-fadeIn">
                                        <EducationSection />
                                    </div>
                                )}
                                {currentStep === 2 && (
                                    <div className="animate-fadeIn">
                                        <WorkExperience />
                                    </div>
                                )}
                                {currentStep === 3 && (
                                    <div className="animate-fadeIn">
                                        <AvailableTimeSection
                                            setDoctorHospital={setDoctorHospital}
                                            slots={slots}
                                            setSlots={setSlots}
                                            doctorAvailableDays={doctorAvailableDays}
                                            setAvailableDays={setAvailableDays}
                                            setTimeLoop={setTimeLoop}
                                            timeLoop={timeLoop}
                                            spokenLanguage={spokenLanguage}
                                            setSpokenLanguage={setSpokenLanguage}
                                            patientLimit={patientLimit}
                                            setPatientLimit={setPatientLimit}
                                        />
                                    </div>
                                )}
                                {currentStep === 4 && (
                                    <div className="animate-fadeIn">
                                        <CertificationAndLicenceSection
                                            licenseCertificatePdf={licenseCertificatePdf}
                                            governmentIdPdf={governmentIdPdf}
                                            setGovernmentIdPdf={setGovernmentIdPdf}
                                            setLicenseCertificate={setLicenseCertificate}
                                        />
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Navigation Buttons */}
                        <div className="flex flex-col sm:flex-row justify-between items-center gap-3 sm:gap-0 p-4 sm:p-6 bg-gradient-to-r from-gray-50 to-blue-50 border-t border-gray-200">
                            <button
                                type="button"
                                onClick={prevStep}
                                disabled={currentStep === 0}
                                className={`w-full sm:w-auto flex items-center justify-center gap-2 px-4 sm:px-6 py-2.5 sm:py-3 rounded-lg font-semibold transition-all duration-300 text-sm sm:text-base ${currentStep === 0
                                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                                    : 'bg-gradient-to-r from-gray-600 to-gray-700 text-white hover:scale-105 shadow-lg active:scale-95'
                                    }`}
                            >
                                <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
                                <span>Previous</span>
                            </button>

                            {/* Progress Dots - Hidden on mobile, shown on desktop */}
                            <div className="hidden sm:flex items-center gap-2">
                                {steps.map((_, index) => (
                                    <button
                                        key={index}
                                        type="button"
                                        onClick={() => goToStep(index)}
                                        className={`h-2 sm:h-2.5 md:h-3 rounded-full transition-all duration-300 ${currentStep === index
                                            ? 'bg-blue-600 w-6 sm:w-7 md:w-8'
                                            : currentStep > index
                                                ? 'bg-green-500 w-2 sm:w-2.5 md:w-3'
                                                : 'bg-gray-300 w-2 sm:w-2.5 md:w-3'
                                            }`}
                                    />
                                ))}
                            </div>

                            {currentStep < steps.length - 1 ? (
                                <button
                                    type="button"
                                    onClick={nextStep}
                                    className="w-full sm:w-auto flex items-center justify-center gap-2 px-4 sm:px-6 py-2.5 sm:py-3 rounded-lg font-semibold bg-gradient-to-r from-blue-600 to-cyan-600 text-white hover:scale-105 active:scale-95 transition-all duration-300 shadow-lg text-sm sm:text-base"
                                >
                                    <span>Next</span>
                                    <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
                                </button>
                            ) : (
                                <button
                                    type="submit"
                                    className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 sm:px-8 py-2.5 sm:py-3 rounded-lg font-semibold bg-gradient-to-r from-green-500 to-emerald-600 text-white hover:scale-105 active:scale-95 transition-all duration-300 shadow-lg text-sm sm:text-base"
                                >
                                    <span>Submit Registration</span>
                                    <Flag className="w-4 h-4 sm:w-5 sm:h-5" />
                                </button>
                            )}
                        </div>
                    </div>
                </form>
            </FormProvider>

            <style jsx>{`
                @keyframes fadeIn {
                    from {
                        opacity: 0;
                        transform: translateY(20px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
                .animate-fadeIn {
                    animation: fadeIn 0.5s ease-out;
                }
            `}</style>
        </div>
    );
};

export default Page;