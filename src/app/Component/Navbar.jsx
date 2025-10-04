"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import UseAuth from "../Hooks/UseAuth";
import ThemeToggle from "./ThemeToggle";

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
      .then(() => console.log("Signout successfully"))
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed w-full z-50 transition-all duration-300 font-sans ${
        scrolled ? "py-2 bg-white shadow-md" : "py-4"
      }`}
      style={{ 
        backgroundColor: scrolled ? "white" : "var(--color-calm-blue)",
        fontFamily: "'Inter', 'sans-serif'" // ফন্ট অ্যাড করুন
      }}
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
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
                className={`ml-2 text-xl font-bold ${
                  scrolled ? "" : "text-white"
                }`}
                style={{
                  color: scrolled ? "var(--color-black)" : "var(--color-white)",
                  fontFamily: "'Inter', 'sans-serif'" // লোগো টেক্সটে ফন্ট
                }}
              >
                CareHive
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link, idx) => (
              <Link
                key={idx}
                href={link.href}
                className="font-medium transition-colors duration-200 hover:text-green-600"
                style={{
                  color: scrolled
                    ? "var(--color-calm-blue)"
                    : "var(--color-white)",
                  fontFamily: "'Inter', 'sans-serif'", // নেভ লিংকগুলিতে ফন্ট
                  fontWeight: 500
                }}
              >
                {link.label}
              </Link>
            ))}

            <div className="flex items-center space-x-4">
              {user ? (
                <>
                  <Link
                    href="/dashboard"
                    className="font-medium transition-colors duration-200 hover:text-green-600"
                    style={{
                      color: scrolled
                        ? "var(--color-calm-blue)"
                        : "var(--color-white)",
                      fontFamily: "'Inter', 'sans-serif'",
                      fontWeight: 500
                    }}
                  >
                    Dashboard
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="font-medium py-2 px-4 rounded-full transition duration-300 cursor-pointer hover:bg-green-600"
                    style={{
                      backgroundColor: "var(--color-light-green)",
                      color: "var(--color-white)",
                      fontFamily: "'Inter', 'sans-serif'",
                      fontWeight: 500
                    }}
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link
                    href="/login"
                    className="font-medium transition-colors duration-200 hover:text-green-600"
                    style={{
                      color: scrolled
                        ? "var(--color-calm-blue)"
                        : "var(--color-white)",
                      fontFamily: "'Inter', 'sans-serif'",
                      fontWeight: 500
                    }}
                  >
                    Login
                  </Link>
                  <Link
                    href="/signup"
                    className="font-medium py-2 px-4 rounded-full transition duration-300 hover:bg-green-600"
                    style={{
                      backgroundColor: "var(--color-light-green)",
                      color: "var(--color-white)",
                      fontFamily: "'Inter', 'sans-serif'",
                      fontWeight: 500
                    }}
                  >
                    Sign Up
                  </Link>
                </>
              )}
              <ThemeToggle />
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="outline-none"
              style={{
                color: scrolled
                  ? "var(--color-calm-blue)"
                  : "var(--color-white)",
              }}
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

        {/* Mobile Navigation */}
        {isOpen && (
          <div 
            className="md:hidden mt-4 pb-4 bg-white rounded-lg shadow-lg"
            style={{ fontFamily: "'Inter', 'sans-serif'" }}
          >
            <div className="flex flex-col space-y-3 px-4 pt-4">
              {navLinks.map((link, idx) => (
                <Link
                  key={idx}
                  href={link.href}
                  className="font-medium py-2 px-4 rounded transition-colors duration-200 hover:bg-gray-100"
                  style={{ 
                    color: "var(--color-calm-blue)",
                    fontWeight: 500
                  }}
                  onClick={() => setIsOpen(false)}
                >
                  {link.label}
                </Link>
              ))}

              <ThemeToggle />

              <div className="pt-4 border-t border-gray-200">
                {user ? (
                  <>
                    <Link
                      href="/dashboard"
                      className="block font-medium py-2 px-4 rounded transition-colors duration-200 hover:bg-gray-100"
                      style={{ 
                        color: "var(--color-calm-blue)",
                        fontWeight: 500
                      }}
                      onClick={() => setIsOpen(false)}
                    >
                      Dashboard
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="w-full font-medium py-2 px-4 rounded-full transition duration-300 cursor-pointer mt-2 hover:bg-green-600"
                      style={{
                        backgroundColor: "var(--color-light-green)",
                        color: "var(--color-white)",
                        fontWeight: 500
                      }}
                    >
                      Logout
                    </button>
                  </>
                ) : (
                  <>
                    <Link
                      href="/login"
                      className="block font-medium py-2 px-4 rounded transition-colors duration-200 hover:bg-gray-100"
                      style={{ 
                        color: "var(--color-calm-blue)",
                        fontWeight: 500
                      }}
                      onClick={() => setIsOpen(false)}
                    >
                      Login
                    </Link>
                    <Link
                      href="/signup"
                      className="block mt-2 font-medium py-2 px-4 rounded-full text-center transition duration-300 hover:bg-green-600"
                      style={{
                        backgroundColor: "var(--color-light-green)",
                        color: "var(--color-white)",
                        fontWeight: 500
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