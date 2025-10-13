// "use client";
// import axios from "axios";
// import {
//   Calendar,
//   Camera,
//   Flag,
//   Heart,
//   Hospital,
//   Mail,
//   MapPin,
//   MessageCircle,
//   Phone,
//   Upload,
//   User,
// } from "lucide-react";
// import { use, useState } from "react";
// import { FormProvider, useForm } from "react-hook-form";
// import Swal from "sweetalert2";
// import { AuthContext } from "@/app/context/authContext";
// import PersonalInfoSection from "@/app/Component/Apply-for-doc-components/PersonalInfoSection";
// import EducationSection from "@/app/Component/Apply-for-doc-components/EducationSection";
// import WorkExperience from "@/app/Component/Apply-for-doc-components/WorkExperience";
// import AvailableTimeSection from "@/app/Component/Apply-for-doc-components/AvailableTimeSection";
// import CertificationAndLicenceSection from "@/app/Component/Apply-for-doc-components/CertificationAndLicenceSection";

// const Page = () => {
//   const {
//     register,
//     handleSubmit,
//     watch,
//     formState: { errors },
//   } = useForm();

//   const { user } = use(AuthContext);

//   const [formData, setFormData] = useState({});

//   const [profileImage, setProfileImage] = useState("");
//   const [licenseCertificatePdf, setLicenseCertificate] = useState("");
//   const [governmentIdPdf, setGovernmentIdPdf] = useState("");

//   console.log(licenseCertificatePdf, governmentIdPdf);

//   const [timeLoop, setTimeLoop] = useState(0);

//   const [doctorAvailableDays, setAvailableDays] = useState([]);
//   const [timeFrom, setTimeFrom] = useState("");
//   const [slots, setSlots] = useState({});
//   const [spokenLanguage, setSpokenLanguage] = useState([]);

//   const handleSpokenLanguage = (e) => {
//     if (e.target.value && e.target.checked) {
//       setSpokenLanguage([...spokenLanguage, e.target.value]);
//     } else {
//       const newArray = spokenLanguage.filter((lang) => lang !== e.target.value);
//       setSpokenLanguage(newArray);
//     }
//   };

//   const handleAvailableWeekDays = (e) => {
//     if (e.target.value && e.target.checked) {
//       setAvailableDays([...doctorAvailableDays, e.target.value]);
//       setTimeLoop(timeLoop + 1);
//     } else {
//       const newArray = doctorAvailableDays.filter(
//         (day) => day !== e.target.value
//       );
//       setAvailableDays(newArray);
//       setTimeLoop(timeLoop - 1);

//       const toRemove = e.target.value;
//       delete slots[toRemove];
//       setSlots(slots);
//     }
//   };

//   const captureAvailableSlot = (day, from, to) => {
//     setSlots((prev) => ({
//       ...prev,
//       [day]: `${from}-${to}`,
//     }));
//   };

//   const handleImageUpload = async (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       const imageData = new FormData();
//       imageData.append("file", file);
//       imageData.append("upload_preset", "carehive_persist");
//       imageData.append("cloud_name", "dqbwtffom");

//       const response = await fetch(
//         `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_IMAGE_CLOUD}/auto/upload`,
//         {
//           method: "POST",
//           body: imageData,
//         }
//       );

//       const uploadImageURL = await response.json();
//       setProfileImage(uploadImageURL?.url);
//     } else return;
//   };

//   const handlePdfUpload = async (e, pdfSater) => {
//     const file = e.target.files[0];
//     if (file) {
//       const imageData = new FormData();
//       imageData.append("file", file);
//       imageData.append("upload_preset", "pdf_persist");
//       imageData.append("cloud_name", "dqbwtffom");

//       const response = await fetch(
//         `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_IMAGE_CLOUD}/auto/upload`,
//         {
//           method: "POST",
//           body: imageData,
//         }
//       );

//       const uploadPdfURL = await response.json();
//       pdfSater(uploadPdfURL?.url);
//     } else return;
//   };

//   const onSubmit = async (data) => {
//     const formData = {
//       _id: { $oid: `${user?.uid}` },
//       personalInfo: {
//         fullName: data?.fullName,
//         dateOfBirth: data?.dob,
//         gender: data?.gender,
//         contactNumber: {
//           mobile: data?.mobile,
//           whatsapp: data?.whatsapp,
//         },
//         email: data?.email,
//         address: {
//           current: data?.presentAddress,
//           permanent: data?.permanentAddress,
//         },
//       },
//       educationAndCredentials: {
//         medicalDegree: data?.degreeName,
//         postGraduate: data?.postGraduate,
//         university: {
//           name: data?.universityName,
//           graduationYear: data?.graduationYear,
//         },
//         specialization: data?.specialization,
//         workExperience: [
//           {
//             hospitalName: data?.previousHospital,
//             position: data?.previousPosition,
//             years: `${data?.previousFrom}-${data?.previousTo}`,
//           },
//           {
//             hospitalName: data?.currentHospital,
//             position: data?.currentPosition,
//             years: `${data?.currentFrom}-${data?.currentTo}`,
//           },
//         ],
//         currentAffiliation: data?.hospital,
//       },
//       licenseAndVerification: {
//         medicalLicenseNumber: data?.medicalLicenseNumber,
//         expiryDate: data?.expiryDate,
//         documents: {
//           licenseCertificate: licenseCertificatePdf,
//           govtId: governmentIdPdf,
//         },
//       },
//       practiceInfo: {
//         consultationType: data?.consultation,
//         workingHours: slots,
//         consultationFees: {
//           online: data?.onlineFee,
//           inPerson: data?.offlineFee,
//         },
//         languagesSpoken: spokenLanguage,
//         profilePhoto: profileImage,
//       },
//       status: {
//         isVerified: false,
//         adminRemarks: "",
//         submittedAt: new Date().toISOString(),
//         approvedAt: null,
//       },
//     };

//     try {
//       // 1️⃣ Save doctor application data
//       const res = await axios.post("/api/approved-doctor", formData, {
//         headers: { "Content-Type": "application/json" },
//       });

//       // 2️⃣ Notify admin
//       await fetch("/api/send-notification", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           targetRole: "admin",
//           title: "New Doctor Application Received",
//           body: `${data?.fullName} has applied for doctor approval.`,
//         }),
//       });

//       // 3️⃣ Success alert
//       Swal.fire({
//         title: "✅ Successfully Submitted!",
//         text: "Your approval request has been submitted.",
//         icon: "success",
//         confirmButtonText: "OK",
//       });
//     } catch (err) {
//       Swal.fire({
//         title: "❌ Submission Failed",
//         text:
//           err.response?.data?.message || err.message || "Something went wrong.",
//         icon: "error",
//         confirmButtonText: "Try Again",
//       });
//     }
//   };

//   const weekDays = [
//     { name: "Sunday", value: "sunday" },
//     { name: "Monday", value: "monday" },
//     { name: "Tuesday", value: "tuesday" },
//     { name: "Wednesday", value: "wednesday" },
//     { name: "Thursday", value: "thursday" },
//     { name: "Friday", value: "friday" },
//     { name: "Saturday", value: "saturday" },
//   ];

//   const lanaguages = [
//     { name: "Bengali", value: "bengali" },
//     { name: "Hindi", value: "hindi" },
//     { name: "English", value: "english" },
//   ];

//   return (
//     <div className="min-h-screen text-gray-900 mt-18 bg-[var(--gray-color)]">
//       {/* Header */}
//       <header
//         className="flex justify-center items-center gap-3 py-6 shadow-lg"
//         style={{
//           background:
//             "linear-gradient(to right, var(--color-calm-blue), var(--dashboard-blue))",
//           color: "var(--color-white)",
//         }}
//       >
//         <Hospital size={40} />
//         <h1 className="text-2xl md:text-4xl font-bold tracking-wide">
//           Doctor Registration Form
//         </h1>
//       </header>

//       {/* Form */}
//       <form
//         onSubmit={handleSubmit(onSubmit)}
//         className="max-w-6xl mx-auto mt-10 shadow-2xl rounded-2xl p-6 md:p-10 space-y-10"
//         // style={{ backgroundColor: 'var(--color-white)', borderWidth: '1px', borderColor: 'var(--dashboard-border)' }}
//       >
//         {/* Personal Info */}

//         <section>
//           <h2
//             className="text-xl md:text-2xl font-semibold text-center mb-6"
//             style={{ color: "var(--dashboard-blue)" }}
//           >
//             Personal Information
//           </h2>

//           <div className="grid grid-cols-1 md:grid-cols-6 gap-6 items-start">
//             {/* Avatar */}
//             <div className="flex flex-col justify-center items-center md:col-span-1 gap-3">
//               <div
//                 className="w-28 h-28 rounded-full overflow-hidden"
//                 style={{
//                   border: "4px solid var(--dashboard-blue)",
//                   boxShadow: "0 0 0 4px var(--color-white)",
//                 }}
//               >
//                 {profileImage && (
//                   <img
//                     src={profileImage}
//                     alt="profile"
//                     className="w-full h-full object-cover"
//                   />
//                 )}
//               </div>
//               <label
//                 className="cursor-pointer px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 transition-colors"
//                 style={{
//                   backgroundColor: "var(--dashboard-blue)",
//                   color: "var(--color-white)",
//                 }}
//               >
//                 <Upload size={16} />
//                 Upload Photo
//                 <input
//                   type="file"
//                   accept="image/*"
//                   onChange={handleImageUpload}
//                   className="hidden"
//                 />
//               </label>
//             </div>

//             {/* Fields */}
//             <div className="md:col-span-5 grid grid-cols-1 md:grid-cols-2 gap-4">
//               {/* Full Name */}
//               <div>
//                 <input
//                   type="text"
//                   placeholder="Full Name *"
//                   {...register("fullName", {
//                     required: "Full name is required",
//                   })}
//                   className="w-full px-4 py-3 rounded-lg focus:outline-none"
//                   style={{
//                     borderWidth: "2px",
//                     borderColor: "var(--dashboard-border)",
//                     color: "var(--fourground-color)",
//                   }}
//                 />
//                 {errors.fullName && (
//                   <p className="text-red-500 text-sm mt-1">
//                     {errors.fullName.message}
//                   </p>
//                 )}
//               </div>

//               {/* Date of Birth */}
//               <div>
//                 <input
//                   type="date"
//                   {...register("dob", {
//                     required: "Date of birth is required",
//                   })}
//                   className="w-full px-4 py-3 rounded-lg focus:outline-none"
//                   style={{
//                     borderWidth: "2px",
//                     borderColor: "var(--dashboard-border)",
//                     color: "var(--fourground-color)",
//                   }}
//                 />
//                 {errors.dob && (
//                   <p className="text-red-500 text-sm mt-1">
//                     {errors.dob.message}
//                   </p>
//                 )}
//               </div>

//               {/* Gender */}
//               <div>
//                 <select
//                   {...register("gender", { required: "Gender is required" })}
//                   className="w-full px-4 py-3 rounded-lg focus:outline-none"
//                   style={{
//                     borderWidth: "2px",
//                     borderColor: "var(--dashboard-border)",
//                     // backgroundColor: "var(--color-white)",
//                     color: "var(--fourground-color)",
//                   }}
//                 >
//                   <option value="">Select Gender *</option>
//                   <option value="Female">Female</option>
//                   <option value="Male">Male</option>
//                 </select>
//                 {errors.gender && (
//                   <p className="text-red-500 text-sm mt-1">
//                     {errors.gender.message}
//                   </p>
//                 )}
//               </div>

//               {/* Mobile Number */}
//               <div>
//                 <input
//                   type="tel"
//                   placeholder="Mobile Number *"
//                   maxLength={11}
//                   {...register("mobile", {
//                     required: "Mobile number is required",
//                   })}
//                   className="w-full px-4 py-3 rounded-lg focus:outline-none"
//                   style={{
//                     borderWidth: "2px",
//                     borderColor: "var(--dashboard-border)",
//                     color: "var(--fourground-color)",
//                   }}
//                 />
//                 {errors.mobile && (
//                   <p className="text-red-500 text-sm mt-1">
//                     {errors.mobile.message}
//                   </p>
//                 )}
//               </div>

//               {/* WhatsApp */}
//               <div>
//                 <input
//                   type="tel"
//                   placeholder="WhatsApp *"
//                   maxLength={11}
//                   {...register("whatsapp", {
//                     required: "WhatsApp number is required",
//                   })}
//                   className="w-full px-4 py-3 rounded-lg focus:outline-none"
//                   style={{
//                     borderWidth: "2px",
//                     borderColor: "var(--dashboard-border)",
//                     color: "var(--fourground-color)",
//                   }}
//                 />
//                 {errors.whatsapp && (
//                   <p className="text-red-500 text-sm mt-1">
//                     {errors.whatsapp.message}
//                   </p>
//                 )}
//               </div>

//               {/* Email */}
//               <div>
//                 <input
//                   type="email"
//                   placeholder="Email Address *"
//                   {...register("email", { required: "Email is required" })}
//                   className="w-full px-4 py-3 rounded-lg focus:outline-none"
//                   style={{
//                     borderWidth: "2px",
//                     borderColor: "var(--dashboard-border)",
//                     color: "var(--fourground-color)",
//                   }}
//                 />
//                 {errors.email && (
//                   <p className="text-red-500 text-sm mt-1">
//                     {errors.email.message}
//                   </p>
//                 )}
//               </div>

//               {/* Marital Status */}
//               <div>
//                 <select
//                   {...register("maritalStatus", {
//                     required: "Marital status is required",
//                   })}
//                   className="w-full px-4 py-3 rounded-lg focus:outline-none"
//                   style={{
//                     borderWidth: "2px",
//                     borderColor: "var(--dashboard-border)",
//                     color: "var(--fourground-color)",
//                   }}
//                 >
//                   <option value="">Marital Status *</option>
//                   <option value="Married">Married</option>
//                   <option value="Unmarried">Unmarried</option>
//                   <option value="Engaged">Engaged</option>
//                 </select>
//                 {errors.maritalStatus && (
//                   <p className="text-red-500 text-sm mt-1">
//                     {errors.maritalStatus.message}
//                   </p>
//                 )}
//               </div>

//               {/* Residential Status */}
//               <div>
//                 <select
//                   {...register("residentialStatus", {
//                     required: "Residential status is required",
//                   })}
//                   className="w-full px-4 py-3 rounded-lg focus:outline-none"
//                   style={{
//                     borderWidth: "2px",
//                     borderColor: "var(--dashboard-border)",
//                     color: "var(--fourground-color)",
//                   }}
//                 >
//                   <option value="">Residential Status *</option>
//                   <option value="Residence">Residence</option>
//                   <option value="Non-Residence">Non-Residence</option>
//                 </select>
//                 {errors.residentialStatus && (
//                   <p className="text-red-500 text-sm mt-1">
//                     {errors.residentialStatus.message}
//                   </p>
//                 )}
//               </div>

//               {/* Nationality */}
//               <div>
//                 <input
//                   type="text"
//                   placeholder="Nationality *"
//                   {...register("nationality", {
//                     required: "Nationality is required",
//                   })}
//                   className="w-full px-4 py-3 rounded-lg focus:outline-none"
//                   style={{
//                     borderWidth: "2px",
//                     borderColor: "var(--dashboard-border)",
//                     color: "var(--fourground-color)",
//                   }}
//                 />
//                 {errors.nationality && (
//                   <p className="text-red-500 text-sm mt-1">
//                     {errors.nationality.message}
//                   </p>
//                 )}
//               </div>

//               {/* National ID */}
//               {/* <div>
//                                 <input
//                                     type="text"
//                                     placeholder="National ID No. *"
//                                     {...register("nid", { required: "National ID is required" })}
//                                     className="w-full px-4 py-3 rounded-lg focus:outline-none"
//                                     style={{
//                                         borderWidth: "2px",
//                                         borderColor: "var(--dashboard-border)",
//                                         color: "var(--fourground-color)",
//                                     }}
//                                 />
//                                 {errors.nid && (
//                                     <p className="text-red-500 text-sm mt-1">{errors.nid.message}</p>
//                                 )}
//                             </div> */}

//               {/* Present Address */}
//               <div>
//                 <input
//                   type="text"
//                   placeholder="Present Address *"
//                   {...register("presentAddress", {
//                     required: "Present address is required",
//                   })}
//                   className="w-full px-4 py-3 rounded-lg focus:outline-none"
//                   style={{
//                     borderWidth: "2px",
//                     borderColor: "var(--dashboard-border)",
//                     color: "var(--fourground-color)",
//                   }}
//                 />
//                 {errors.presentAddress && (
//                   <p className="text-red-500 text-sm mt-1">
//                     {errors.presentAddress.message}
//                   </p>
//                 )}
//               </div>

//               {/* Permanent Address */}
//               <div>
//                 <input
//                   type="text"
//                   placeholder="Permanent Address *"
//                   {...register("permanentAddress", {
//                     required: "Permanent address is required",
//                   })}
//                   className="w-full px-4 py-3 rounded-lg focus:outline-none"
//                   style={{
//                     borderWidth: "2px",
//                     borderColor: "var(--dashboard-border)",
//                     color: "var(--fourground-color)",
//                   }}
//                 />
//                 {errors.permanentAddress && (
//                   <p className="text-red-500 text-sm mt-1">
//                     {errors.permanentAddress.message}
//                   </p>
//                 )}
//               </div>
//             </div>
//           </div>
//         </section>
//         {/* Education */}
//         <section>
//           <h2
//             className="text-xl md:text-2xl font-semibold text-center mb-6"
//             style={{ color: "var(--dashboard-blue)" }}
//           >
//             Educational Qualification
//           </h2>

//           <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//             {/* Degree Name */}
//             <div>
//               <input
//                 type="text"
//                 placeholder="Degree Name *"
//                 {...register("degreeName", {
//                   required: "Degree name is required",
//                 })}
//                 className="w-full px-4 py-3 rounded-lg focus:outline-none"
//                 style={{
//                   borderWidth: "2px",
//                   borderColor: "var(--dashboard-border)",
//                   color: "var(--fourground-color)",
//                 }}
//               />
//               {errors.degreeName && (
//                 <p className="text-red-500 text-sm mt-1">
//                   {errors.degreeName.message}
//                 </p>
//               )}
//             </div>

//             {/* Post Graduate */}
//             <div>
//               <input
//                 type="text"
//                 placeholder="Post Graduate *"
//                 {...register("postGraduate", {
//                   required: "Post graduate info is required",
//                 })}
//                 className="w-full px-4 py-3 rounded-lg focus:outline-none"
//                 style={{
//                   borderWidth: "2px",
//                   borderColor: "var(--dashboard-border)",
//                   color: "var(--fourground-color)",
//                 }}
//               />
//               {errors.postGraduate && (
//                 <p className="text-red-500 text-sm mt-1">
//                   {errors.postGraduate.message}
//                 </p>
//               )}
//             </div>

//             {/* Graduation Year */}
//             <div>
//               <input
//                 type="text"
//                 placeholder="Graduation Year *"
//                 {...register("graduationYear", {
//                   required: "Graduation year is required",
//                   pattern: {
//                     value: /^[0-9]{4}$/,
//                     message: "Enter a valid year (e.g., 2020)",
//                   },
//                 })}
//                 className="w-full px-4 py-3 rounded-lg focus:outline-none"
//                 style={{
//                   borderWidth: "2px",
//                   borderColor: "var(--dashboard-border)",
//                   color: "var(--fourground-color)",
//                 }}
//               />
//               {errors.graduationYear && (
//                 <p className="text-red-500 text-sm mt-1">
//                   {errors.graduationYear.message}
//                 </p>
//               )}
//             </div>

//             {/* Specialization */}
//             <div>
//               <input
//                 type="text"
//                 placeholder="Specialization *"
//                 {...register("specialization", {
//                   required: "Specialization is required",
//                 })}
//                 className="w-full px-4 py-3 rounded-lg focus:outline-none"
//                 style={{
//                   borderWidth: "2px",
//                   borderColor: "var(--dashboard-border)",
//                   color: "var(--fourground-color)",
//                 }}
//               />
//               {errors.specialization && (
//                 <p className="text-red-500 text-sm mt-1">
//                   {errors.specialization.message}
//                 </p>
//               )}
//             </div>

//             {/* University Name */}
//             <div>
//               <input
//                 type="text"
//                 placeholder="University Name *"
//                 {...register("universityName", {
//                   required: "University name is required",
//                 })}
//                 className="w-full px-4 py-3 rounded-lg focus:outline-none"
//                 style={{
//                   borderWidth: "2px",
//                   borderColor: "var(--dashboard-border)",
//                   color: "var(--fourground-color)",
//                 }}
//               />
//               {errors.universityName && (
//                 <p className="text-red-500 text-sm mt-1">
//                   {errors.universityName.message}
//                 </p>
//               )}
//             </div>
//           </div>
//         </section>

//         {/* Work Experience */}
//         <section>
//           <h2
//             className="text-xl md:text-2xl font-semibold text-center mb-6"
//             style={{ color: "var(--dashboard-blue)" }}
//           >
//             Work Experience
//           </h2>

//           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//             {/* Previous */}
//             <div
//               className="p-6 rounded-xl shadow-sm"
//               style={{
//                 borderWidth: "2px",
//                 borderColor: "var(--dashboard-border)",
//                 backgroundColor: "var(--gray-color)",
//               }}
//             >
//               <h3
//                 className="font-semibold mb-4 text-lg"
//                 style={{ color: "var(--fourground-color)" }}
//               >
//                 Previous
//               </h3>

//               {/* Hospital Name */}
//               <div>
//                 <input
//                   type="text"
//                   placeholder="Hospital Name *"
//                   {...register("previousHospital", {
//                     required: "Previous hospital name is required",
//                   })}
//                   className="w-full px-4 py-3 rounded-lg focus:outline-none mb-3"
//                   style={{
//                     borderWidth: "2px",
//                     borderColor: "var(--dashboard-border)",
//                     color: "var(--fourground-color)",
//                   }}
//                 />
//                 {errors.previousHospital && (
//                   <p className="text-red-500 text-sm mt-1">
//                     {errors.previousHospital.message}
//                   </p>
//                 )}
//               </div>

//               {/* Position */}
//               <div>
//                 <input
//                   type="text"
//                   placeholder="Position *"
//                   {...register("previousPosition", {
//                     required: "Previous position is required",
//                   })}
//                   className="w-full px-4 py-3 rounded-lg focus:outline-none mb-3"
//                   style={{
//                     borderWidth: "2px",
//                     borderColor: "var(--dashboard-border)",
//                     color: "var(--fourground-color)",
//                   }}
//                 />
//                 {errors.previousPosition && (
//                   <p className="text-red-500 text-sm mt-1">
//                     {errors.previousPosition.message}
//                   </p>
//                 )}
//               </div>

//               {/* From & To */}
//               <div className="flex gap-3">
//                 <div className="flex-1">
//                   <input
//                     type="text"
//                     placeholder="From *"
//                     {...register("previousFrom", {
//                       required: "Start year is required",
//                     })}
//                     className="w-full px-4 py-3 rounded-lg focus:outline-none"
//                     style={{
//                       borderWidth: "2px",
//                       borderColor: "var(--dashboard-border)",
//                       color: "var(--fourground-color)",
//                     }}
//                   />
//                   {errors.previousFrom && (
//                     <p className="text-red-500 text-sm mt-1">
//                       {errors.previousFrom.message}
//                     </p>
//                   )}
//                 </div>
//                 <div className="flex-1">
//                   <input
//                     type="text"
//                     placeholder="To *"
//                     {...register("previousTo", {
//                       required: "End year is required",
//                     })}
//                     className="w-full px-4 py-3 rounded-lg focus:outline-none"
//                     style={{
//                       borderWidth: "2px",
//                       borderColor: "var(--dashboard-border)",
//                       color: "var(--fourground-color)",
//                     }}
//                   />
//                   {errors.previousTo && (
//                     <p className="text-red-500 text-sm mt-1">
//                       {errors.previousTo.message}
//                     </p>
//                   )}
//                 </div>
//               </div>
//             </div>

//             {/* Current */}
//             <div
//               className="p-6 rounded-xl shadow-sm"
//               style={{
//                 borderWidth: "2px",
//                 borderColor: "var(--dashboard-blue)",
//                 backgroundColor: "var(--gray-color)",
//               }}
//             >
//               <h3
//                 className="font-semibold mb-4 text-lg"
//                 style={{ color: "var(--fourground-color)" }}
//               >
//                 Current
//               </h3>

//               {/* Hospital Name */}
//               <div>
//                 <input
//                   type="text"
//                   placeholder="Hospital Name *"
//                   {...register("currentHospital", {
//                     required: "Current hospital name is required",
//                   })}
//                   className="w-full px-4 py-3 rounded-lg focus:outline-none mb-3"
//                   style={{
//                     borderWidth: "2px",
//                     borderColor: "var(--dashboard-border)",
//                     color: "var(--fourground-color)",
//                   }}
//                 />
//                 {errors.currentHospital && (
//                   <p className="text-red-500 text-sm mt-1">
//                     {errors.currentHospital.message}
//                   </p>
//                 )}
//               </div>

//               {/* Position */}
//               <div>
//                 <input
//                   type="text"
//                   placeholder="Position *"
//                   {...register("currentPosition", {
//                     required: "Current position is required",
//                   })}
//                   className="w-full px-4 py-3 rounded-lg focus:outline-none mb-3"
//                   style={{
//                     borderWidth: "2px",
//                     borderColor: "var(--dashboard-border)",
//                     color: "var(--fourground-color)",
//                   }}
//                 />
//                 {errors.currentPosition && (
//                   <p className="text-red-500 text-sm mt-1">
//                     {errors.currentPosition.message}
//                   </p>
//                 )}
//               </div>

//               {/* From & To */}
//               <div className="flex gap-3">
//                 <div className="flex-1">
//                   <input
//                     type="text"
//                     placeholder="From *"
//                     {...register("currentFrom", {
//                       required: "Start year is required",
//                     })}
//                     className="w-full px-4 py-3 rounded-lg focus:outline-none"
//                     style={{
//                       borderWidth: "2px",
//                       borderColor: "var(--dashboard-border)",
//                       color: "var(--fourground-color)",
//                     }}
//                   />
//                   {errors.currentFrom && (
//                     <p className="text-red-500 text-sm mt-1">
//                       {errors.currentFrom.message}
//                     </p>
//                   )}
//                 </div>
//                 <div className="flex-1">
//                   <input
//                     type="text"
//                     placeholder="To *"
//                     {...register("currentTo", {
//                       required: "End year is required",
//                     })}
//                     className="w-full px-4 py-3 rounded-lg focus:outline-none"
//                     style={{
//                       borderWidth: "2px",
//                       borderColor: "var(--dashboard-border)",
//                       color: "var(--fourground-color)",
//                     }}
//                   />
//                   {errors.currentTo && (
//                     <p className="text-red-500 text-sm mt-1">
//                       {errors.currentTo.message}
//                     </p>
//                   )}
//                 </div>
//               </div>
//             </div>
//           </div>
//         </section>

//         {/* Available Time */}
//         <section className="flex flex-col">
//           <h2
//             className="text-xl md:text-2xl font-semibold text-center mb-6"
//             style={{ color: "var(--dashboard-blue)" }}
//           >
//             Available Days & Time
//           </h2>
//           <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
//             {weekDays?.map((day) => (
//               <div key={day.value}>
//                 <div
//                   className="flex items-center p-3 mb-4 rounded-xl transition-all duration-300"
//                   style={{
//                     backgroundColor: "var(--gray-color)",
//                     borderWidth: "2px",
//                     borderColor: "var(--dashboard-border)",
//                   }}
//                 >
//                   <input
//                     id={`${day.name.toLowerCase()}-checkbox`}
//                     type="checkbox"
//                     value={day.value}
//                     name="day-checkbox"
//                     onChange={(e) => handleAvailableWeekDays(e)}
//                     className="w-4 h-4 rounded focus:ring-2"
//                     style={{ accentColor: "var(--dashboard-blue)" }}
//                   />
//                   <label
//                     htmlFor={`${day.name.toLowerCase()}-checkbox`}
//                     className="ml-2 text-sm font-medium cursor-pointer"
//                     style={{ color: "var(--fourground-color)" }}
//                   >
//                     {day.name}
//                   </label>
//                 </div>

//                 <div className="flex gap-2">
//                   {doctorAvailableDays.includes(day.value) && (
//                     <div className="flex gap-2">
//                       <div>
//                         <label
//                           htmlFor={`from-${day.value}`}
//                           className="text-sm"
//                           style={{ color: "var(--fourground-color)" }}
//                         >
//                           From :{" "}
//                         </label>
//                         <input
//                           type="time"
//                           id={`from-${day.value}`}
//                           required
//                           onChange={(e) => setTimeFrom(e.target.value)}
//                           className="w-full p-3 rounded-xl focus:outline-none focus:ring-2 transition-all duration-300"
//                           style={{
//                             color: "var(--fourground-color)",
//                             backgroundColor: "var(--color-white)",
//                             borderWidth: "2px",
//                             borderColor: "var(--dashboard-border)",
//                           }}
//                         />
//                       </div>

//                       <div>
//                         <label
//                           htmlFor={`to-${day.value}`}
//                           className="text-sm"
//                           style={{ color: "var(--fourground-color)" }}
//                         >
//                           To :
//                         </label>
//                         <input
//                           type="time"
//                           id={`to-${day.value}`}
//                           required
//                           onChange={(e) =>
//                             captureAvailableSlot(
//                               day.value,
//                               timeFrom,
//                               e.target.value
//                             )
//                           }
//                           className="w-full p-3 rounded-xl focus:outline-none focus:ring-2 transition-all duration-300"
//                           style={{
//                             color: "var(--fourground-color)",
//                             backgroundColor: "var(--color-white)",
//                             borderWidth: "2px",
//                             borderColor: "var(--dashboard-border)",
//                           }}
//                         />
//                       </div>
//                     </div>
//                   )}
//                 </div>
//               </div>
//             ))}
//           </div>

//           <div className="flex flex-col gap-4 p-3 rounded-md  shadow">
//             {/* Consultation Type */}
//             <div className="flex flex-col ">
//               <label
//                 htmlFor="consultation"
//                 className="font-medium mb-1 text-[var(--fourground-color)]"
//               >
//                 Consultation Type
//               </label>
//               <select
//                 id="consultation"
//                 {...register("consultation", { required: true })}
//                 className="border rounded px-3 py-2 text-[var(--fourground-color)] bg-[var(--gray-color)] focus:outline-none focus:ring-2 focus:ring-blue-500"
//               >
//                 <option value="">Select...</option>
//                 <option value="online">Online</option>
//                 <option value="offline">Offline</option>
//                 <option value="both">Both</option>
//               </select>
//             </div>

//             {/* Hospital Name */}
//             <div className="flex flex-col text-[var(--fourground-color)]">
//               <label htmlFor="hospital" className="font-medium mb-1">
//                 Hospital Name
//               </label>
//               <input
//                 id="hospital"
//                 type="text"
//                 placeholder="Enter hospital name"
//                 {...register("hospital", { required: true })}
//                 className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
//               />
//             </div>

//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4 ">
//               <div>
//                 <label
//                   htmlFor="offline-fee"
//                   className="font-medium mb-1 block"
//                   style={{ color: "var(--fourground-color)" }}
//                 >
//                   Offline Fee
//                 </label>
//                 <input
//                   type="number"
//                   id="offline-fee"
//                   placeholder="Offline Fee"
//                   {...register("offlineFee", { required: true })}
//                   className="w-full px-4 py-3 rounded-lg focus:outline-none"
//                   style={{
//                     borderWidth: "2px",
//                     borderColor: "var(--dashboard-border)",
//                     color: "var(--fourground-color)",
//                   }}
//                 />
//               </div>

//               <div>
//                 <label
//                   htmlFor="online-fee"
//                   className="font-medium mb-1 block"
//                   style={{ color: "var(--fourground-color)" }}
//                 >
//                   Online Fee
//                 </label>
//                 <input
//                   type="number"
//                   id="online-fee"
//                   placeholder="Online Fee"
//                   {...register("onlineFee", { required: true })}
//                   className="w-full px-4 py-3 rounded-lg focus:outline-none"
//                   style={{
//                     borderWidth: "2px",
//                     borderColor: "var(--dashboard-border)",
//                     color: "var(--fourground-color)",
//                   }}
//                 />
//               </div>
//             </div>
//             <div className="flex md:flex-row gap-6 justify-center items-center">
//               {lanaguages?.map((lang) => (
//                 <div key={lang.value}>
//                   <div
//                     className="flex items-center p-3 mb-4 rounded-xl transition-all duration-300"
//                     style={{
//                       backgroundColor: "var(--gray-color)",
//                       borderWidth: "2px",
//                       borderColor: "var(--dashboard-border)",
//                     }}
//                   >
//                     <input
//                       id={`${lang.name.toLowerCase()}-checkbox`}
//                       type="checkbox"
//                       value={lang.value}
//                       name="day-checkbox"
//                       onChange={(e) => handleSpokenLanguage(e)}
//                       className="w-4 h-4 rounded focus:ring-2"
//                       style={{ accentColor: "var(--dashboard-blue)" }}
//                     />
//                     <label
//                       htmlFor={`${lang.name.toLowerCase()}-checkbox`}
//                       className="ml-2 text-sm font-medium cursor-pointer"
//                       style={{ color: "var(--fourground-color)" }}
//                     >
//                       {lang.name}
//                     </label>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </section>

//         {/* Certification And License */}
//         <section>
//           <div className="mb-6">
//             <h2
//               className="text-xl md:text-2xl font-semibold text-center mb-6"
//               style={{ color: "var(--dashboard-blue)" }}
//             >
//               Certification And License
//             </h2>
//             <p
//               className="text-sm opacity-60"
//               style={{ color: "var(--fourground-color)" }}
//             >
//               Provide your medical license and identification details
//             </p>
//           </div>

//           <div className="space-y-6">
//             {/* Medical License Number */}
//             <div>
//               <label
//                 htmlFor="medicalLicenseNumber"
//                 className="block mb-2 text-sm font-medium"
//                 style={{ color: "var(--fourground-color)" }}
//               >
//                 Medical License Number{" "}
//                 <span style={{ color: "#ef4444" }}>*</span>
//               </label>
//               <input
//                 type="text"
//                 id="medicalLicenseNumber"
//                 placeholder="Enter your medical license number"
//                 {...register("medicalLicenseNumber", {
//                   required: "Medical license number is required",
//                 })}
//                 className="w-full p-3 rounded-xl focus:outline-none focus:ring-2 transition-all duration-300"
//                 style={{
//                   color: "var(--fourground-color)",
//                   borderWidth: "2px",
//                   borderColor: "var(--dashboard-border)",
//                 }}
//               />
//               {errors.medicalLicenseNumber && (
//                 <p className="text-red-500 text-sm mt-1">
//                   {errors.medicalLicenseNumber.message}
//                 </p>
//               )}
//             </div>

//             {/* Issuing Authority */}
//             <div>
//               <label
//                 htmlFor="issuingAuthority"
//                 className="block mb-2 text-sm font-medium"
//                 style={{ color: "var(--fourground-color)" }}
//               >
//                 Issuing Authority <span style={{ color: "#ef4444" }}>*</span>
//               </label>
//               <input
//                 type="text"
//                 id="issuingAuthority"
//                 placeholder="e.g., Medical Council of Bangladesh"
//                 {...register("issuingAuthority", {
//                   required: "Issuing authority is required",
//                 })}
//                 className="w-full p-3 rounded-xl focus:outline-none focus:ring-2 transition-all duration-300"
//                 style={{
//                   color: "var(--fourground-color)",
//                   borderWidth: "2px",
//                   borderColor: "var(--dashboard-border)",
//                 }}
//               />
//               {errors.issuingAuthority && (
//                 <p className="text-red-500 text-sm mt-1">
//                   {errors.issuingAuthority.message}
//                 </p>
//               )}
//             </div>

//             {/* Expiry Date */}
//             <div>
//               <label
//                 htmlFor="expiryDate"
//                 className="block mb-2 text-sm font-medium"
//                 style={{ color: "var(--fourground-color)" }}
//               >
//                 Expiry Date <span style={{ color: "#ef4444" }}>*</span>
//               </label>
//               <input
//                 type="date"
//                 id="expiryDate"
//                 {...register("expiryDate", {
//                   required: "Expiry date is required",
//                 })}
//                 className="w-full p-3 rounded-xl focus:outline-none focus:ring-2 transition-all duration-300"
//                 style={{
//                   color: "var(--fourground-color)",
//                   borderWidth: "2px",
//                   borderColor: "var(--dashboard-border)",
//                 }}
//               />
//               {errors.expiryDate && (
//                 <p className="text-red-500 text-sm mt-1">
//                   {errors.expiryDate.message}
//                 </p>
//               )}
//             </div>

//             {/* License Certificate PDF */}
//             <div>
//               <label
//                 htmlFor="licenseCertificate"
//                 className="block mb-2 text-sm font-medium"
//                 style={{ color: "var(--fourground-color)" }}
//               >
//                 License Certificate (PDF){" "}
//                 <span style={{ color: "#ef4444" }}>*</span>
//               </label>
//               <input
//                 type="file"
//                 id="licenseCertificate"
//                 accept=".pdf"
//                 {...register("licenseCertificate", {
//                   required: "License certificate PDF is required",
//                 })}
//                 onChange={(e) => handlePdfUpload(e, setLicenseCertificate)}
//                 className="w-full p-3 rounded-xl focus:outline-none focus:ring-2 transition-all duration-300"
//                 style={{
//                   color: "var(--fourground-color)",
//                   borderWidth: "2px",
//                   borderColor: "var(--dashboard-border)",
//                 }}
//               />
//               {errors.licenseCertificate && (
//                 <p className="text-red-500 text-sm mt-1">
//                   {errors.licenseCertificate.message}
//                 </p>
//               )}
//             </div>

//             {/* Government ID PDF */}
//             <div>
//               <label
//                 htmlFor="govtId"
//                 className="block mb-2 text-sm font-medium"
//                 style={{ color: "var(--fourground-color)" }}
//               >
//                 Government ID (PDF) <span style={{ color: "#ef4444" }}>*</span>
//               </label>
//               <input
//                 type="file"
//                 id="govtId"
//                 accept=".pdf"
//                 {...register("govtId", {
//                   required: "Government ID PDF is required",
//                 })}
//                 onChange={(e) => handlePdfUpload(e, setGovernmentIdPdf)}
//                 className="w-full p-3 rounded-xl focus:outline-none focus:ring-2 transition-all duration-300"
//                 style={{
//                   color: "var(--fourground-color)",
//                   borderWidth: "2px",
//                   borderColor: "var(--dashboard-border)",
//                 }}
//               />
//               {errors.govtId && (
//                 <p className="text-red-500 text-sm mt-1">
//                   {errors.govtId.message}
//                 </p>
//               )}
//             </div>
//           </div>
//         </section>
//         {/* Submit */}
//         <div className="flex justify-center">
//           <button
//             type="submit"
//             className="px-12 py-4 text-lg font-semibold rounded-lg shadow-lg transform hover:scale-105 transition-all duration-200"
//             style={{
//               background:
//                 "linear-gradient(to right, var(--color-light-green), var(--color-light-green))",
//               color: "var(--fourground-color)",
//             }}
//           >
//             Submit Registration
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default Page;



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

    console.log("doctor selected", doctorHospital)

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

    //     const onSubmit = async (data) => {

    //         const formData = {
    //             _id: { "$oid": `${user?.uid}` },
    //             personalInfo: {
    //                 fullName: data?.fullName,
    //                 dateOfBirth: data?.dob,
    //                 gender: data?.gender,
    //                 contactNumber: {
    //                     mobile: data?.mobile,
    //                     whatsapp: data?.whatsapp
    //                 },
    //                 email: user?.email,
    //                 address: {
    //                     current: data?.presentAddress,
    //                     permanent: data?.permanentAddress
    //                 }
    //             },
    //             educationAndCredentials: {
    //                 medicalDegree: data?.degreeName,
    //                 postGraduate: data?.postGraduate,
    //                 university: {
    //                     name: data?.universityName,
    //                     graduationYear: data?.graduationYear
    //                 },
    //                 specialization: data?.specialization,
    //                 workExperience: [
    //                     {
    //                         hospitalName: data?.previousHospital,
    //                         position: data?.previousPosition,
    //                         years: `${data?.previousFrom}-${data?.previousTo}`
    //                     },
    //                     {
    //                         hospitalName: data?.currentHospital,
    //                         position: data?.currentPosition,
    //                         years: `${data?.currentFrom}-${data?.currentTo}`
    //                     }
    //                 ],
    //             },
    //             licenseAndVerification: {
    //                 medicalLicenseNumber: data?.medicalLicenseNumber,
    //                 expiryDate: data?.expiryDate,
    //                 documents: {
    //                     licenseCertificate: licenseCertificatePdf,
    //                     govtId: governmentIdPdf
    //                 }
    //             },
    //             practiceInfo: {
    //                 consultationType: data?.consultation,
    //                 workingHours: slots,
    //                 patientLimit: patientLimit,
    //                 consultationFees: {
    //                     online: data?.onlineFee,
    //                     inPerson: data?.offlineFee
    //                 },
    //                 languagesSpoken: spokenLanguage,
    //                 profilePhoto: profileImage,
    //                 clinicAddress: doctorHospital
    //             },
    //             status: {
    //                 isVerified: false,
    //                 adminRemarks: "",
    //                 submittedAt: new Date().toISOString(),
    //                 approvedAt: null
    //             }
    //         };

    //         try {
    //             const res = await axios.post("/api/approved-doctor", formData, {
    //                 headers: {
    //                     "Content-Type": "application/json",
    //                 },
    //             });

    //             Swal.fire({
    //                 title: "✅ Successfully Submitted!",
    //                 text: "Your approval request has been submitted.",
    //                 icon: "success",
    //                 confirmButtonText: "OK",
    //             });

    //             await fetch("/api/send-notification", {
    //                 method: "POST",
    //                 headers: { "Content-Type": "application/json" },
    //                 body: JSON.stringify({
    //                     targetRole: "admin",
    //                     title: "New Doctor Application Received",
    //                     body: `${ data?.fullName } has applied for doctor approval.`,
    //             }),
    //         });

    //     } catch (err) {
    //         Swal.fire({
    //             title: "❌ Submission Failed",
    //             text: err.response?.data?.message || err.message || "Something went wrong.",
    //             icon: "error",
    //             confirmButtonText: "Try Again",
    //         });
    //     }
    // };


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