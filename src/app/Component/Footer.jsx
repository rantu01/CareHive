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
              {/* X (Twitter) Icon */}
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[var(--color-primary)] hover:bg-white p-2 rounded-full transition duration-300"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 1200 1227"
                  className="h-5 w-5 text-white hover:text-[var(--color-primary)]"
                  fill="currentColor"
                >
                  <path d="M714.163 519.284L1160.89 0H1056.18L667.137 450.887L356.731 0H0L463.313 681.821L0 1226.8H104.715L515.67 751.183L843.269 1226.8H1200L714.137 519.284H714.163ZM569.98 686.313L521.795 616.827L142.127 79.6944H323.03L631.062 523.207L679.247 592.693L1058.92 1147.11H878.017L569.98 686.339V686.313Z" />
                </svg>
              </a>
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
                { label: "Organ Donation", href: "/organ-donation" },
                { label: "Donation", href: "/donation" },
                { label: "Wellness", href: "/wellness" },
                { label: "Fitness", href: "/fitness" },
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
              {/* Added your routes here */}
              <li>
                <Link
                  href="/hospitals"
                  className="hover:text-[var(--color-primary)] transition duration-300"
                >
                  Hospitals
                </Link>
              </li>
              <li>
                <Link
                  href="/doctors"
                  className="hover:text-[var(--color-primary)] transition duration-300"
                >
                  Doctors
                </Link>
              </li>
              <li>
                <Link
                  href="/userInteractions"
                  className="hover:text-[var(--color-primary)] transition duration-300"
                >
                  Blog
                </Link>
              </li>
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
              <li>
                <a
                  href="mailto:support@carehive.com"
                  className="hover:text-[var(--color-primary)] transition duration-300"
                >
                  support@carehive.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="border-t border-[var(--color-primary)] pt-6 flex flex-col md:flex-row justify-between items-center text-sm">
          <p className="mb-3 md:mb-0">
            © {new Date().getFullYear()} CareHive. All rights reserved.
          </p>
          {/* <div className="flex space-x-4">
            {[
              { label: "Privacy Policy", href: "/privacy" },
              { label: "Terms of Service", href: "/terms" },
              { label: "Cookie Policy", href: "/cookies" },
              { label: "Disclaimer", href: "/disclaimer" },
            ].map((item, idx) => (
              <Link
                key={idx}
                href={item.href}
                className="hover:text-[var(--color-primary)] transition duration-300"
              >
                {item.label}
              </Link>
            ))}
          </div> */}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
