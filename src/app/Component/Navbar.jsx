"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import UseAuth from "../Hooks/UseAuth";
import ThemeToggle from "./ThemeToggle";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Doctors", href: "/doctors" },
  { label: "Wellness", href: "/wellness" },
  { label: "Fitness", href: "/fitness" },
  { label: "Hospitals", href: "/hospitals" },
  { label: "Blog", href: "/userInteractions" },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { user, signOutUser } = UseAuth();
  const pathname = usePathname();

  const handleLogout = () => {
    signOutUser()
      .then(() => setIsOpen(false))
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // ✅ Transparent only on Home page when not scrolled
  const isHome = pathname === "/";
  const bgColor = isHome && !scrolled ? "transparent" : "var(--color-secondary)";
  const textColor = isHome && !scrolled ? "var(--color-white)" : "var(--color-white)";
  const logoColor = isHome && !scrolled ? "var(--color-white)" : "var(--color-white)";

  return (
    <nav
      className={`fixed w-full z-50 transition-all duration-300 ${
        scrolled || !isHome ? "py-3 shadow-lg" : "py-4"
      }`}
      style={{
        backgroundColor: bgColor,
        fontFamily: "var(--font-primary)",
        backdropFilter: isHome && !scrolled ? "blur(4px)" : "none",
      }}
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex justify-between items-center h-14">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2 flex-shrink-0">
            <div className="flex items-center">
              <div
                className="w-10 h-10 rounded-full flex items-center justify-center"
                style={{ backgroundColor: "var(--color-primary)" }}
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
                className="ml-2 text-xl font-bold whitespace-nowrap"
                style={{
                  color: logoColor,
                  fontFamily: "var(--font-heading)",
                }}
              >
                CareHive
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center justify-end flex-grow ml-8">
            <div className="flex items-center space-x-1 lg:space-x-2 flex-nowrap">
              {navLinks.map((link, idx) => {
                const isActive =
                  pathname === link.href ||
                  (link.href !== "/" && pathname.startsWith(link.href));

                return (
                  <Link
                    key={idx}
                    href={link.href}
                    className="relative px-3 py-2 text-sm lg:text-base font-medium transition-all duration-300"
                    style={{
                      color: textColor,
                      fontWeight: isActive ? 600 : 500,
                    }}
                  >
                    {link.label}
                    {isActive && (
                      <span
                        className="absolute bottom-0 left-1/2 transform -translate-x-1/2 h-0.5 w-3/4"
                        style={{ backgroundColor: "var(--color-primary)" }}
                      ></span>
                    )}
                  </Link>
                );
              })}
            </div>

            {/* Auth Buttons */}
            <div className="flex items-center space-x-3 ml-6 flex-shrink-0">
              {user ? (
                <>
                  <Link
                    href="/dashboard"
                    className="font-medium px-4 py-2 rounded-xl text-sm lg:text-base transition-all duration-300"
                    style={{
                      color: textColor,
                      fontWeight: 500,
                    }}
                  >
                    Dashboard
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="font-medium py-2 px-4 lg:px-5 rounded-xl border-2 transition-all duration-300 hover:opacity-90"
                    style={{
                      backgroundColor: "var(--color-primary)",
                      color: "var(--color-white)",
                      borderColor: "var(--color-primary)",
                    }}
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link
                    href="/login"
                    className="font-medium px-4 py-2 rounded-xl text-sm lg:text-base border-2 transition-all duration-300 hover:opacity-80"
                    style={{
                      color: textColor,
                      borderColor: textColor,
                    }}
                  >
                    Login
                  </Link>
                  <Link
                    href="/signup"
                    className="font-medium py-2 px-4 lg:px-5 rounded-xl text-sm lg:text-base border-2 transition-all duration-300 hover:opacity-90"
                    style={{
                      backgroundColor: "var(--color-primary)",
                      color: "var(--color-white)",
                      borderColor: "var(--color-primary)",
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
          <div className="md:hidden flex items-center space-x-4 flex-shrink-0">
            <ThemeToggle />
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="outline-none p-2 rounded-lg transition-all duration-300 hover:bg-[var(--color-primary)] hover:bg-opacity-20"
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

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden mt-4 bg-white rounded-2xl shadow-2xl border border-[var(--dashboard-border)]">
            <div className="flex flex-col space-y-1 p-4">
              {navLinks.map((link, idx) => {
                const isActive =
                  pathname === link.href ||
                  (link.href !== "/" && pathname.startsWith(link.href));

                return (
                  <Link
                    key={idx}
                    href={link.href}
                    className={`py-3 px-4 rounded-xl font-medium transition-all duration-200 ${
                      isActive
                        ? "bg-[var(--color-primary)] bg-opacity-10 text-[var(--color-primary)]"
                        : "hover:bg-[var(--color-primary)] hover:bg-opacity-10 text-[var(--color-primary)]"
                    }`}
                    onClick={() => setIsOpen(false)}
                  >
                    {link.label}
                  </Link>
                );
              })}

              {/* Auth Section */}
              <div className="pt-4 mt-2 border-t border-[var(--dashboard-border)] flex flex-col space-y-3">
                {user ? (
                  <>
                    <Link
                      href="/dashboard"
                      className="block py-3 px-4 rounded-xl text-center font-medium text-[var(--color-primary)] hover:bg-[var(--color-primary)] hover:bg-opacity-10"
                      onClick={() => setIsOpen(false)}
                    >
                      Dashboard
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="w-full py-3 px-4 rounded-xl font-medium border-2 bg-[var(--color-primary)] text-white border-[var(--color-primary)]"
                    >
                      Logout
                    </button>
                  </>
                ) : (
                  <>
                    <Link
                      href="/login"
                      className="block py-3 px-4 rounded-xl border-2 text-center text-[var(--color-primary)] border-[var(--color-primary)]"
                      onClick={() => setIsOpen(false)}
                    >
                      Login
                    </Link>
                    <Link
                      href="/signup"
                      className="block py-3 px-4 rounded-xl text-center border-2 bg-[var(--color-primary)] text-white border-[var(--color-primary)]"
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
