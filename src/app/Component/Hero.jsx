import Image from "next/image";

const Hero = () => {
  return (
    <section className="relative bg-gradient-to-b from-[var(--color-calm-blue)] to-[var(--color-light-green)] min-h-screen flex items-center pt-16 pb-12">
      <div className="container mx-auto px-4 md:px-6 flex flex-col md:flex-row items-center">
        {/* Text Content */}
        <div className="md:w-1/2 text-center md:text-left mb-10 md:mb-0 md:pr-10">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[var(--color-white)] mb-4 leading-tight">
            Your Journey to Better Health Starts Here
          </h1>
          <p className="text-xl md:text-2xl text-[var(--color-white)] mb-8 opacity-90">
            Connect with healthcare professionals, track your wellness, and
            transform your life with CareHive.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
            <button className="bg-[var(--color-white)] text-[var(--color-black)] hover:bg-[#F8F8F8] font-bold py-4 px-8 rounded-full text-lg transition duration-300 shadow-lg">
              Book an Appointment
            </button>
            <button className="bg-transparent border-2 border-[var(--color-white)] text-[var(--color-white)] hover:bg-[var(--color-white)] hover:text-[var(--color-black)] font-bold py-4 px-8 rounded-full text-lg transition duration-300">
              Explore Wellness Programs
            </button>
          </div>

          {/* Stats Section */}
          <div className="flex flex-wrap justify-center md:justify-start mt-12 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-[var(--color-white)]">
                500+
              </div>
              <div className="text-[var(--color-white)] opacity-80">
                Verified Doctors
              </div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-[var(--color-white)]">
                10K+
              </div>
              <div className="text-[var(--color-white)] opacity-80">
                Happy Patients
              </div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-[var(--color-white)]">
                24/7
              </div>
              <div className="text-[var(--color-white)] opacity-80">
                Health Support
              </div>
            </div>
          </div>
        </div>

        {/* Image Content */}
        <div className="md:w-1/2 relative">
          <div className="relative rounded-2xl overflow-hidden shadow-2xl">
            <img
              src="https://i.ibb.co.com/LzmcW64n/front-view-young-female-with-carpet-exercises-blue-wall.jpghttps://i.ibb.co.com/7x0r29bf/front-view-young-female-with-carpet-exercises-blue-wall.webp"
              alt="Woman practicing wellness exercises"
              className="w-full h-auto object-cover rounded-2xl shadow-2xl"
            />
            {/* Overlay card */}
            <div className="absolute bottom-6 left-6 bg-[var(--color-white)] p-4 rounded-xl shadow-lg max-w-xs">
              <div className="flex items-center">
                <div className="bg-[var(--color-light-green)] p-2 rounded-full mr-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-[var(--color-white)]"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <div>
                  <h3 className="font-bold text-[var(--color-black)]">
                    Wellness Program
                  </h3>
                  <p className="text-sm text-gray-600">Personalized for you</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Floating elements */}
      {/* <div className="absolute top-20 left-10 animate-pulse">
        <div className="bg-[var(--color-white)] bg-opacity-30 rounded-full p-3">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 text-[var(--color-white)]"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
            />
          </svg>
        </div>
      </div> */}
    </section>
  );
};

export default Hero;
