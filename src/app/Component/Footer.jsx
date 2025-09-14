const Footer = () => {
  return (
    <footer className="bg-[var(--color-calm-blue)] text-black pt-16 pb-8 ">
      <div className="container mx-auto px-4 md:px-6">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Brand Column */}
          <div className="lg:col-span-1">
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 rounded-full bg-[var(--color-light-green)] flex items-center justify-center mr-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                  />
                </svg>
              </div>
              <span className="text-2xl font-bold">CareHive</span>
            </div>
            <p className="mb-6">
              Your all-in-one digital health platform connecting patients,
              doctors, and wellness professionals in a single ecosystem.
            </p>
            <div className="flex space-x-4">
              <a
                href="#"
                className="bg-[var(--color-light-green)] hover:bg-black p-2 rounded-full transition duration-300"
              >
                {/* Facebook */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-white"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M20 10C20 4.477 15.523 0 10 0S0 4.477 0 10c0 4.991 3.657 9.128 8.438 9.879V12.89h-2.54V10h2.54V7.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V10h2.773l-.443 2.89h-2.33v6.989C16.343 19.128 20 14.991 20 10z"
                    clipRule="evenodd"
                  />
                </svg>
              </a>
              {/* You can repeat the same structure for Twitter, GitHub, LinkedIn with text-white inside */}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-6 relative inline-block">
              Quick Links
              <span className="absolute bottom-0 left-0 w-1/2 h-0.5 bg-[var(--color-light-green)]"></span>
            </h3>
            <ul className="space-y-3">
              <li>
                <a
                  href="#"
                  className="hover:text-white transition duration-300"
                >
                  Find a Doctor
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-white transition duration-300"
                >
                  Book Appointment
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-white transition duration-300"
                >
                  Wellness Programs
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-white transition duration-300"
                >
                  Health Tips
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-white transition duration-300"
                >
                  BMI Calculator
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-white transition duration-300"
                >
                  Emergency Services
                </a>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-lg font-semibold mb-6 relative inline-block">
              Our Services
              <span className="absolute bottom-0 left-0 w-1/2 h-0.5 bg-[var(--color-light-green)]"></span>
            </h3>
            <ul className="space-y-3">
              <li>
                <a href="#" className="hover:text-white transition duration-300">
                  Online Consultations
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition duration-300">
                  Health Tracking
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition duration-300">
                  Yoga & Meditation
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition duration-300">
                  Diet Plans
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition duration-300">
                  Fitness Programs
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition duration-300">
                  Mental Wellness
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-6 relative inline-block">
              Contact Us
              <span className="absolute bottom-0 left-0 w-1/2 h-0.5 bg-[var(--color-light-green)]"></span>
            </h3>
            <ul className="space-y-4">
              <li className="flex items-start">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-[var(--color-light-green)] mr-3 mt-1"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
                <span>123 Health Avenue, Wellness City, 10001</span>
              </li>
              <li className="flex items-start">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-[var(--color-light-green)] mr-3 mt-1"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                  />
                </svg>
                <span>+1 (800) 123-4567</span>
              </li>
              <li className="flex items-start">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-[var(--color-light-green)] mr-3 mt-1"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
                <span>support@carehive.com</span>
              </li>
            </ul>

            {/* Newsletter */}
            <div className="mt-6">
              <h4 className="text-md font-medium mb-3">
                Subscribe to our newsletter
              </h4>
              <div className="flex">
                <input
                  type="email"
                  placeholder="Your email address"
                  className="px-4 py-2 rounded-l-lg focus:outline-none text-gray-800 w-full"
                />
                <button className="bg-[var(--color-light-green)] hover:bg-black px-4 py-2 rounded-r-lg transition duration-300">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M14 5l7 7m0 0l-7 7m7-7H3"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="border-t border-[var(--color-light-green)] pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm mb-4 md:mb-0">
            © {new Date().getFullYear()} CareHive. All rights reserved.
          </p>
          <div className="flex space-x-6">
            <a href="#" className="hover:text-white text-sm transition duration-300">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-white text-sm transition duration-300">
              Terms of Service
            </a>
            <a href="#" className="hover:text-white text-sm transition duration-300">
              Cookie Policy
            </a>
            <a href="#" className="hover:text-white text-sm transition duration-300">
              Disclaimer
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
