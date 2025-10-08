"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import UseAuth from "../Hooks/UseAuth";
import ThemeToggle from "./ThemeToggle";
import WhatsAppButton from "./ContactWithAdmin/WhatsAppButton";

// Navigation links configuration
const navLinks = [
  { label: "Home", href: "/" },
  { label: "Doctors", href: "/doctors" },
  { label: "Wellness", href: "/wellness" },
  { label: "Hospitals", href: "/hospitals" },
  { label: "Health Tips", href: "/health-tips" },
  { label: "Doctor's Blog", href: "/userInteractions" },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { user, signOutUser } = UseAuth();

  const handleLogout = () => {
    signOutUser()
      .then(() => {
        console.log("Signout successfully");
        setIsOpen(false); // Close mobile menu on successful logout
      })
      .catch((error) => console.log(error));
  };

  // Effect to handle scroll-based styling
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    // Cleanup listener on component unmount
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Define colors based on scroll state
  const textColor = scrolled ? "var(--color-calm-blue)" : "var(--color-white)";
  const bgColor = scrolled ? "white" : "var(--color-calm-blue)";
  const logoColor = scrolled ? "var(--color-black)" : "var(--color-white)";

  return (
    <nav
      className={`fixed w-full z-50 transition-all duration-300 ${
        scrolled ? "py-2 shadow-md" : "py-4"
      }`}
      style={{
        backgroundColor: bgColor,
        fontFamily: "var(--font-primary)",
      }}
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex justify-between items-center h-14">
          {/* Logo - kept simple and fixed size */}
          <Link href="/" className="flex items-center space-x-2 flex-shrink-0">
            <div className="flex items-center">
              <div
                className="w-10 h-10 rounded-full flex items-center justify-center"
                style={{ backgroundColor: "var(--color-light-green)" }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  style={{ color: "var(--color-white)" }}
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
                className={`ml-2 text-xl font-bold whitespace-nowrap`}
                style={{
                  color: logoColor,
                  fontFamily: "var(--font-heading)",
                }}
              >
                CareHive
              </span>
            </div>
          </Link>

          {/* Desktop Navigation & Auth - The main fix is here */}
          {/* Added flex-grow to the middle content container (Nav Links) to consume space */}
          {/* Adjusted spacing to better manage link width */}
          <div className="hidden md:flex items-center justify-end flex-grow ml-4">
            
            {/* Nav Links - Allow this section to take up available space, while remaining flex-nowrap */}
            <div className="flex items-center space-x-4 lg:space-x-6 flex-nowrap overflow-x-auto justify-end">
              {navLinks.map((link, idx) => (
                <Link
                  key={idx}
                  href={link.href}
                  className="font-medium transition-colors duration-200 hover:text-green-600 whitespace-nowrap text-sm lg:text-base"
                  style={{
                    color: textColor,
                    fontWeight: 500,
                    fontFamily: "var(--font-primary)",
                  }}
                >
                  {link.label}
                </Link>
              ))}
            </div>

            {/* Auth Buttons & Theme Toggle - fixed width, pushed to the right */}
            <div className="flex items-center space-x-4 ml-6 flex-shrink-0">
              {user ? (
                <>
                  <Link
                    href="/dashboard"
                    className="font-medium transition-colors duration-200 hover:text-green-600 whitespace-nowrap text-sm lg:text-base"
                    style={{
                      color: textColor,
                      fontWeight: 500,
                      fontFamily: "var(--font-primary)",
                    }}
                  >
                    Dashboard
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="font-medium py-2 px-3 lg:px-4 rounded-full transition duration-300 cursor-pointer hover:bg-green-600 whitespace-nowrap text-sm lg:text-base"
                    style={{
                      backgroundColor: "var(--color-light-green)",
                      color: "var(--color-white)",
                      fontWeight: 500,
                      fontFamily: "var(--font-primary)",
                    }}
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link
                    href="/login"
                    className="font-medium transition-colors duration-200 hover:text-green-600 whitespace-nowrap text-sm lg:text-base"
                    style={{
                      color: textColor,
                      fontWeight: 500,
                      fontFamily: "var(--font-primary)",
                    }}
                  >
                    Login
                  </Link>
                  <Link
                    href="/signup"
                    className="font-medium py-2 px-3 lg:px-4 rounded-full transition duration-300 hover:bg-green-600 whitespace-nowrap text-sm lg:text-base"
                    style={{
                      backgroundColor: "var(--color-light-green)",
                      color: "var(--color-white)",
                      fontWeight: 500,
                      fontFamily: "var(--font-primary)",
                    }}
                  >
                    Sign Up
                  </Link>
                </>
              )}
              <ThemeToggle />
            </div>
          </div>

          {/* Mobile Menu Button & Theme Toggle (for mobile) */}
          <div className="md:hidden flex items-center space-x-4 flex-shrink-0">
            <ThemeToggle />
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="outline-none"
              aria-label="Toggle Menu"
              style={{ color: textColor }}
            >
              {!isOpen ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16m-7 6h7"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Panel */}
        {isOpen && (
          <div
            className="md:hidden mt-2 bg-white rounded-lg shadow-xl"
            style={{ fontFamily: "var(--font-primary)" }}
          >
            <div className="flex flex-col space-y-1 p-4">
              {navLinks.map((link, idx) => (
                <Link
                  key={idx}
                  href={link.href}
                  className="font-medium py-2 px-4 rounded transition-colors duration-200 hover:bg-gray-100 whitespace-nowrap"
                  style={{
                    color: "var(--color-calm-blue)",
                    fontWeight: 500,
                  }}
                  onClick={() => setIsOpen(false)}
                >
                  {link.label}
                </Link>
              ))}

              {/* Mobile Auth Links */}
              <div className="pt-4 mt-2 border-t border-gray-200 flex flex-col space-y-2">
                {user ? (
                  <>
                    <Link
                      href="/dashboard"
                      className="block font-medium py-2 px-4 rounded transition-colors duration-200 hover:bg-gray-100 whitespace-nowrap"
                      style={{
                        color: "var(--color-calm-blue)",
                        fontWeight: 500,
                      }}
                      onClick={() => setIsOpen(false)}
                    >
                      Dashboard
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="w-full font-medium py-2 px-4 rounded-full transition duration-300 cursor-pointer hover:bg-green-600"
                      style={{
                        backgroundColor: "var(--color-light-green)",
                        color: "var(--color-white)",
                        fontWeight: 500,
                      }}
                    >
                      Logout
                    </button>
                  </>
                ) : (
                  <>
                    <Link
                      href="/login"
                      className="block font-medium py-2 px-4 rounded transition-colors duration-200 hover:bg-gray-100 whitespace-nowrap"
                      style={{
                        color: "var(--color-calm-blue)",
                        fontWeight: 500,
                      }}
                      onClick={() => setIsOpen(false)}
                    >
                      Login
                    </Link>
                    <Link
                      href="/signup"
                      className="block font-medium py-2 px-4 rounded-full text-center transition duration-300 hover:bg-green-600 whitespace-nowrap"
                      style={{
                        backgroundColor: "var(--color-light-green)",
                        color: "var(--color-white)",
                        fontWeight: 500,
                      }}
                      onClick={() => setIsOpen(false)}
                    >
                      Sign Up
                    </Link>
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;