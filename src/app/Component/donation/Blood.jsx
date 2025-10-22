import { Sparkles } from "lucide-react";
import React, { useState } from "react";
import { 
  AiOutlineCheckCircle, 
  AiOutlineClockCircle, 
  AiOutlinePhone, 
  AiOutlineMail 
} from "react-icons/ai";
import Swal from "sweetalert2";

const Blood = () => {
  const initialDonors = [
    {
      id: 1,
      name: "Rantu Mondal",
      bloodGroup: "A+",
      location: "Dhaka, Bangladesh",
      contact: "+880 1234 567 890",
      email: "rantu@example.com",
      img: "https://i.ibb.co/H58DH5C/rantu.jpg",
      verified: true,
    },
    {
      id: 2,
      name: "Umme Sadia Sayti",
      bloodGroup: "B+",
      location: "Chittagong, Bangladesh",
      contact: "+880 1987 654 321",
      email: "umme@example.com",
      img: "https://i.ibb.co/nN5XN7N0/sayti.jpg",
      verified: false,
    },
    {
      id: 3,
      name: "Tasnia Rahman",
      bloodGroup: "O+",
      location: "Khulna, Bangladesh",
      contact: "+880 1765 111 222",
      email: "tasnia@example.com",
      img: "https://i.ibb.co/svrQxqbR/tasnia.jpg",
      verified: true,
    },
    {
      id: 4,
      name: "Pinki Biswas",
      bloodGroup: "AB-",
      location: "Sylhet, Bangladesh",
      contact: "+880 1944 333 999",
      email: "pinki@example.com",
      img: "https://i.ibb.co/JRxTD2X9/pinky.jpg",
      verified: false,
    },
    {
      id: 5,
      name: "Rafi Hasan",
      bloodGroup: "A-",
      location: "Rajshahi, Bangladesh",
      contact: "+880 1555 888 444",
      email: "rafi@example.com",
      img: "https://i.ibb.co/20WsDvy1/rafi.jpg",
      verified: true,
    },
    {
      id: 6,
      name: "Dip Chakraborty",
      bloodGroup: "O-",
      location: "Barisal, Bangladesh",
      contact: "+880 1622 999 777",
      email: "dip@example.com",
      img: "https://i.ibb.co/BVqH3nfh/dip.jpg",
      verified: false,
    },
  ];

  const [donors, setDonors] = useState(initialDonors);

  const toggleVerify = (id) => {
    setDonors((prev) =>
      prev.map((donor) => {
        if (donor.id === id) {
          const newVerified = !donor.verified;

          Swal.fire({
            icon: "success",
            title: `${newVerified ? "Verified" : "Canceled"}!`,
            text: `Donor has been successfully ${newVerified ? "verified" : "canceled"}.`,
            confirmButtonColor: "var(--color-primary)",
            confirmButtonText: "OK",
          });

          return { ...donor, verified: newVerified };
        }
        return donor;
      })
    );
  };

  return (
    <div style={{ backgroundColor: "var(--bg-color-all)", color: "var(--text-color-all)" }}>
      
      {/* HERO SECTION */}
      <section
        className="flex flex-col md:flex-row items-center justify-between px-6 md:px-16 py-24 bg-cover bg-center relative"
        style={{
          backgroundImage: "url('https://i.ibb.co/x8YccY9P/blood.jpg')",
        }}
      >
        {/* Left Text */}
        <div className="md:w-1/2 text-left space-y-6 max-w-lg z-10">
          <h1
            className="text-4xl md:text-5xl font-extrabold leading-tight drop-shadow-lg"
            style={{ color: "var(--color-secondary)" }}
          >
            Be a Blood Donor <br /> Save a Life Today
          </h1>
          <p className="text-base md:text-lg leading-relaxed drop-shadow" style={{ color: "var(--text-color-all)" }}>
            Join our community of life savers. Register as a donor and help
            patients in need of blood during critical situations. Every drop counts!
          </p>
          <button
            className="px-8 py-3 rounded-full font-semibold shadow-lg hover:scale-105 transition"
            style={{ backgroundColor: "var(--color-primary)", color: "#fff" }}
          >
            Join as Donor
          </button>
        </div>

        {/* Right Image */}
        <div className="md:w-1/2 mt-10 md:mt-0 flex justify-center relative z-10">
          <img
            src="https://i.ibb.co/s9w0rb5h/donar.jpg"
            alt="Blood Donor"
            className="w-[280px] sm:w-[320px] md:w-[400px] lg:w-[500px] object-cover rounded-lg shadow-xl"
          />
        </div>

        {/* Optional overlay for better text visibility */}
        <div className="absolute inset-0 bg-black/25 md:bg-transparent"></div>
      </section>

      {/* DONOR CARDS */}
      <section className="py-20 px-6 md:px-16">
        <h2
  className="text-3xl md:text-4xl font-bold text-center mb-12 flex items-center justify-center"
  style={{ color: "var(--color-secondary)" }}
>
  Our Registered Donors
  <Sparkles className="w-7 h-7 ml-3" style={{ color: "var(--color-secondary)" }} />
</h2>


        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {donors.map((donor) => (
            <div
              key={donor.id}
              className="relative shadow-xl rounded-xl overflow-hidden p-5 hover:scale-105 transition-transform duration-300"
              style={{
                background: "linear-gradient(to bottom right, var(--bg-color-all), var(--color-primary))",
              }}
            >
              {/* Profile */}
              <div className="flex items-center space-x-4 mb-4">
                <img
                  src={donor.img}
                  alt={donor.name}
                  className="w-16 h-16 rounded-full border-4 border-white shadow-md object-cover"
                />
                <div>
                  <h3 className="text-xl font-semibold" style={{ color: "var(--color-secondary)" }}>
                    {donor.name}
                  </h3>
                  <p className="text-sm" style={{ color: "var(--text-color-all)" }}>
                    Blood Group: <strong>{donor.bloodGroup}</strong>
                  </p>
                </div>
              </div>

              {/* Info */}
              <div className="text-sm space-y-1" style={{ color: "var(--text-color-all)" }}>
                <p className="flex items-center gap-2">
                  <AiOutlinePhone className="text-blue-500" />
                  <strong>Contact:</strong> {donor.contact}
                </p>
                <p className="flex items-center gap-2">
                  <AiOutlineMail className="text-blue-500" />
                  <strong>Email:</strong> {donor.email}
                </p>
                <p>
                  <strong>Location:</strong> {donor.location}
                </p>
                <p className="flex items-center gap-2">
                  <strong>Status:</strong>{" "}
                  {donor.verified ? (
                    <span className="text-green-600 font-semibold flex items-center gap-1">
                      <AiOutlineCheckCircle /> Verified
                    </span>
                  ) : (
                    <span className="font-semibold flex items-center gap-1" style={{ color: "var(--color-primary)" }}>
                      <AiOutlineClockCircle /> Pending
                    </span>
                  )}
                </p>
              </div>

              {/* Toggle Verify / Cancel Button */}
              <button
                onClick={() => toggleVerify(donor.id)}
                className="mt-4 w-full py-2 rounded-lg font-semibold shadow transition-colors hover:opacity-90"
                style={{
                  backgroundColor: "var(--color-primary)",
                  color: "#fff",
                }}
              >
                {donor.verified ? "Cancel Verification" : "Verify Donor"}
              </button>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Blood;
