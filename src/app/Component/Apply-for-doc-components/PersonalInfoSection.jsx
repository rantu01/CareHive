import { AuthContext } from '@/app/context/authContext';
import { Upload } from 'lucide-react';
import React, { use } from 'react';
import { useFormContext } from 'react-hook-form';

const PersonalInfoSection = ({profileImage,setProfileImage}) => {
    const { register,formState: { errors } } = useFormContext();
    const {user}=use(AuthContext)


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

    
    return (
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
                            border: "4px solid var(--color-primary)",
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
                            backgroundColor: "var(--color-primary)",
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
                        {errors?.fullName && (
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
                        {errors?.dob && (
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
                        {errors?.gender && (
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
                        {errors?.mobile && (
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
                        {errors?.whatsapp && (
                            <p className="text-red-500 text-sm mt-1">{errors.whatsapp.message}</p>
                        )}
                    </div>

                    {/* Email */}
                    <div>
                        <input
                            type="email"
                            placeholder="Email Address *"
                            value={user?.email}
                            disabled
                            className="w-full px-4 py-3 rounded-lg focus:outline-none"
                            style={{
                                borderWidth: "2px",
                                borderColor: "var(--dashboard-border)",
                                color: "var(--fourground-color)",
                            }}
                        />
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
                        {errors?.maritalStatus && (
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
                        {errors?.residentialStatus && (
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
                        {errors?.nationality && (
                            <p className="text-red-500 text-sm mt-1">{errors.nationality.message}</p>
                        )}
                    </div>
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
                        {errors?.presentAddress && (
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
                        {errors?.permanentAddress && (
                            <p className="text-red-500 text-sm mt-1">{errors.permanentAddress.message}</p>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default PersonalInfoSection;