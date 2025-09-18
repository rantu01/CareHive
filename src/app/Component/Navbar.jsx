"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import UseAuth from "../Hooks/UseAuth";
import ThemeToggle from "./ThemeToggle";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const { user, signOutUser } = UseAuth();

  const handleLogout = () => {
    signOutUser()
      .then(() => {
        console.log("Signout successfully");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      setScrolled(isScrolled);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed w-full z-50 transition-all duration-300 ${
        scrolled ? "py-2 bg-white shadow-md" : "py-4"
      }`}
      style={{ backgroundColor: scrolled ? "white" : "var(--color-calm-blue)" }}
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
                }}
              >
                CareHive
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {["Home", "Doctors", "Wellness", "Hospitals", "Health Tips"].map(
              (item, idx) => (
                <Link
                  key={idx}
                  href={`/${item === "Home" ? "" : item.toLowerCase()}`}
                  className="font-medium"
                  style={{
                    color: scrolled
                      ? "var(--color-calm-blue)"
                      : "var(--color-white)",
                  }}
                >
                  {item}
                </Link>
              )
            )}

            <div className="flex items-center space-x-4">
              {user ? (
                <>
                  <Link
                    href="/user"
                    className="font-medium"
                    style={{
                      color: scrolled
                        ? "var(--color-calm-blue)"
                        : "var(--color-white)",
                    }}
                  >
                    Dashboard
                  </Link>

                  <button
                    onClick={handleLogout}
                    className="font-medium py-2 px-4 rounded-full transition duration-300 cursor-pointer"
                    style={{
                      backgroundColor: "var(--color-light-green)",
                      color: "var(--color-white)",
                    }}
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link
                    href="/login"
                    className="font-medium"
                    style={{
                      color: scrolled
                        ? "var(--color-calm-blue)"
                        : "var(--color-white)",
                    }}
                  >
                    Login
                  </Link>
                  <Link
                    href="/signup"
                    className="font-medium py-2 px-4 rounded-full transition duration-300"
                    style={{
                      backgroundColor: "var(--color-light-green)",
                      color: "var(--color-white)",
                    }}
                  >
                    Sign Up
                  </Link>
                </>
              )}
              <ThemeToggle />
            </div>
          </div>

          {/* Mobile menu button */}
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
          <div className="md:hidden mt-4 pb-4 bg-white rounded-lg shadow-lg">
            <div className="flex flex-col space-y-3 px-4 pt-4">
              {["Home", "Doctors", "Wellness", "Hospitals", "Health Tips"].map(
                (item, idx) => (
                  <Link
                    key={idx}
                    href={`/${item === "Home" ? "" : item.toLowerCase()}`}
                    className="font-medium py-2 px-4 rounded"
                    style={{
                      color: "var(--color-calm-blue)",
                    }}
                    onClick={() => setIsOpen(false)}
                  >
                    {item}
                  </Link>
                )
              )}
              <div className="pt-4 border-t border-gray-200">
                {user ? (
                  <button
                    onClick={handleLogout}
                    className="font-medium py-2 px-4 rounded-full transition duration-300 cursor-pointer"
                    style={{
                      backgroundColor: "var(--color-light-green)",
                      color: "var(--color-white)",
                    }}
                  >
                    Logout
                  </button>
                ) : (
                  <>
                    <Link
                      href="/login"
                      className="block font-medium py-2 px-4 rounded"
                      style={{ color: "var(--color-calm-blue)" }}
                      onClick={() => setIsOpen(false)}
                    >
                      Login
                    </Link>
                    <Link
                      href="/signup"
                      className="block mt-2 font-medium py-2 px-4 rounded-full text-center transition duration-300"
                      style={{
                        backgroundColor: "var(--color-light-green)",
                        color: "var(--color-white)",
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
