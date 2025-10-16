"use client";
import Link from "next/link";


const Footer = () => {
  return (
    <footer
      className="pt-16 pb-8"
      style={{
        backgroundColor: "var(--color-secondary)",
        color: "var(--color-white)",
        fontFamily: "var(--font-primary)",
      }}
    >
      <div className="container mx-auto px-4 md:px-6">
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Brand */}
          <div>
            <div className="flex items-center mb-6">
              <div
                className="w-10 h-10 rounded-full flex items-center justify-center mr-3"
                style={{ backgroundColor: "var(--color-primary)" }}
              >
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
              <span
                className="text-2xl font-bold"
                style={{ fontFamily: "var(--font-heading)" }}
              >
                CareHive
              </span>
            </div>
            <p className="mb-6">
              Your all-in-one digital health platform connecting patients,
              doctors, and wellness professionals in a single ecosystem.
            </p>
            <div className="flex space-x-3">
              <a
                href="#"
                className="bg-[var(--color-primary)] hover:bg-white p-2 rounded-full transition duration-300"
              >
                {/* Example Social Icon */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-white hover:text-[var(--color-primary)]"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M24 4.557a9.828 9.828 0 01-2.828.775A4.932 4.932 0 0023.337 3a9.864 9.864 0 01-3.127 1.195 4.924 4.924 0 00-8.391 4.482A13.978 13.978 0 011.671 3.149a4.922 4.922 0 001.524 6.574 4.903 4.903 0 01-2.229-.616c-.054 2.28 1.581 4.415 3.949 4.89a4.935 4.935 0 01-2.224.085 4.927 4.927 0 004.6 3.417A9.867 9.867 0 010 19.54a13.93 13.93 0 007.548 2.212c9.057 0 14.009-7.496 14.009-13.986 0-.213-.004-.425-.014-.636A10.012 10.012 0 0024 4.557z" />
                </svg>
              </a>
              {/* Add more social icons as needed */}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-6 relative inline-block">
              Quick Links
              <span className="absolute bottom-0 left-0 w-1/2 h-0.5 bg-[var(--color-primary)]"></span>
            </h3>
            <ul className="space-y-2">
              {[
                { label: "Home", href: "/" },
                { label: "Doctors", href: "/doctors" },
                { label: "Wellness", href: "/wellness" },
                { label: "Hospitals", href: "/hospitals" },
                { label: "Blog", href: "/userInteractions" },
              ].map((item, idx) => (
                <li key={idx}>
                  <Link
                    href={item.href}
                    className="hover:text-[var(--color-primary)] transition duration-300"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-lg font-semibold mb-6 relative inline-block">
              Our Services
              <span className="absolute bottom-0 left-0 w-1/2 h-0.5 bg-[var(--color-primary)]"></span>
            </h3>
            <ul className="space-y-2">
              {[
                "Online Consultations",
                "Health Tracking",
                "Yoga & Meditation",
                "Diet Plans",
                "Fitness Programs",
                "Mental Wellness",
              ].map((service, idx) => (
                <li key={idx}>
                  <a
                    href="#"
                    className="hover:text-[var(--color-primary)] transition duration-300"
                  >
                    {service}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-semibold mb-6 relative inline-block">
              Contact Us
              <span className="absolute bottom-0 left-0 w-1/2 h-0.5 bg-[var(--color-primary)]"></span>
            </h3>
            <ul className="space-y-3 text-sm">
              <li>123 Health Avenue, Wellness City, 10001</li>
              <li>+1 (800) 123-4567</li>
              <li>support@carehive.com</li>
            </ul>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="border-t border-[var(--color-primary)] pt-6 flex flex-col md:flex-row justify-between items-center text-sm">
          <p className="mb-3 md:mb-0">
            © {new Date().getFullYear()} CareHive. All rights reserved.
          </p>
          <div className="flex space-x-4">
            {[
              "Privacy Policy",
              "Terms of Service",
              "Cookie Policy",
              "Disclaimer",
            ].map((item, idx) => (
              <a
                key={idx}
                href="#"
                className="hover:text-[var(--color-primary)] transition duration-300"
              >
                {item}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
