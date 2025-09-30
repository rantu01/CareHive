"use client"
import { Hospital } from "lucide-react";
import { useForm } from "react-hook-form";

const Page = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
  };

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
            <div className="flex justify-center md:col-span-1">
              <div className="w-28 h-28 rounded-full ring-4 ring-blue-400 ring-offset-4 overflow-hidden">
                <img
                  src="https://img.daisyui.com/images/profile/demo/spiderperson@192.webp"
                  alt="profile"
                  className="w-full h-full object-cover"
                />
              </div>
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



        <section>
            
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