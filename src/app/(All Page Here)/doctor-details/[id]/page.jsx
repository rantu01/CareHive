"use client"

import { useParams } from 'next/navigation';


const DoctorDetails = () => {
    const {id}=useParams()
    return (
        <div>
            Doctor Details Page {id}
        </div>
    );
};

export default DoctorDetails;