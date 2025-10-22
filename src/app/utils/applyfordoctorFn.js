export const handleImageUpload = async (imageData, urlSeter) => {

    console.log("the image data is", imageData)
    const response = await fetch(`https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_IMAGE_CLOUD}/auto/upload`,
        {
            method: "POST",
            body: imageData
        }
    )

    const uploadImageURL = await response.json()
    console.log("we got the image url", uploadImageURL)
    return uploadImageURL?.url

};


export const generateFormData = (data, imageUrl, user, licenseCertificatePdf, governmentIdPdf, spokenLanguage, doctorHospital, doctorHospitalId) => {
    return {
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
            workingHours: {},
            patientLimit: {},
            totalCapacity: {},
            consultationFees: {
                online: 0,
                inPerson: 0
            },
            languagesSpoken: spokenLanguage,
            profilePhoto: imageUrl,
            clinicAddress: doctorHospital,
            clinicId: doctorHospitalId
        },
        status: {
            isVerified: false,
            adminRemarks: "",
            submittedAt: new Date().toISOString(),
            approvedAt: null
        }
    };
}