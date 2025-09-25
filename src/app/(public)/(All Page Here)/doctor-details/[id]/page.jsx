"use client"

import { useParams } from 'next/navigation';


const DoctorDetails = () => {
    const { id } = useParams()
    return (
        <div>
            <div>
                <img src="https://www.shutterstock.com/image-photo/portrait-handsome-male-doctor-stethoscope-600nw-2480850611.jpg" alt="doctor-image" />
            </div>
            <div>
                <p>Doctor Name</p>
                <p>Degree Name</p>
            </div>
            <div>
                <p>Appointment</p>
                <div>
                    map (appointment)
                </div>
            </div>
        </div>
    );
};

export default DoctorDetails;