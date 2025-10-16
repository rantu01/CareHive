import React from 'react';
import { useFormContext } from 'react-hook-form';

const CertificationAndLicenceSection = ({ setGovernmentIdPdf,setLicenseCertificate }) => {
    const { register,formState: { errors } } = useFormContext();


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

    return (
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
                    style={{ color: "var(--text-color-all)" }}
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
                        style={{ color: "var(--text-color-all)" }}
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
                            color: "var(--text-color-all)",
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
                        style={{ color: "var(--text-color-all)" }}
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
                            color: "var(--text-color-all)",
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
                        style={{ color: "var(--text-color-all)" }}
                    >
                        Expiry Date <span style={{ color: "#ef4444" }}>*</span>
                    </label>
                    <input
                        type="date"
                        id="expiryDate"
                        {...register("expiryDate", { required: "Expiry date is required" })}
                        className="w-full p-3 rounded-xl focus:outline-none focus:ring-2 transition-all duration-300"
                        style={{
                            color: "var(--text-color-all)",
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
                        style={{ color: "var(--text-color-all)" }}
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
                            color: "var(--text-color-all)",
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
                        style={{ color: "var(--text-color-all)" }}
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
                            color: "var(--text-color-all)",
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
    );
};

export default CertificationAndLicenceSection;