"use client";
import Link from "next/link";
import React, { useState } from "react";

// একটি অ্যারেতে নেভিগেশন লিঙ্কগুলি সংজ্ঞায়িত করা হয়েছে
const navLinks = [
  { href: "/", label: "Home" },
  { href: "/appointment-booking", label: "Appointment" },
  { href: "/doctorspost", label: "Doctors Post" },
];

const HeroReact = () => {
  const [title, setTitle] = useState("We are always here to serve you.");
  const [toggle, setToggle] = useState(false);

  const toggleClass = () => {
    setToggle(!toggle);
  };


  return (
    <div className="min-h-screen relative flex flex-col bg-[url('https://www.tailwindtap.com/assets/components/hero/food-delivery/banner.jpg')] bg-no-repeat w-full bg-cover bg-left-bottom sm:bg-center">
      <div className="bg-black/60 h-full w-full absolute"></div>
      <div className="flex justify-between sm:justify-end gap-3.5 items-center pt-5 sm:pt-5 z-30">
        <div className="flex justify-between sm:justify-end sm:gap-5 items-center w-full px-8">
          <button
            className="w-12 h-12 relative focus:outline-none sm:hidden overscroll-none top-2.5"
            onClick={toggleClass}
          >
            <div className="block w-5 absolute left-5 top-1/3 transform -translate-x-1/2 -translate-y-1/2 z-50">
              <span
                className={`block absolute h-0.5 w-7 text-white bg-current transform transition duration-300 ease-in-out ${toggle ? "rotate-45" : "-translate-y-2"
                  }`}
              ></span>
              <span
                className={`block absolute h-0.5 w-7 text-white bg-current transform transition duration-300 ease-in-out ${toggle && "opacity-0"
                  }`}
              ></span>
              <span
                className={`block absolute h-0.5 w-7 text-white bg-current transform transition duration-300 ease-in-out ${toggle ? "-rotate-45" : "translate-y-2"
                  }`}
              ></span>
            </div>
          </button>

          {/* মোবাইল মেনু - ডাইনামিকভাবে navLinks অ্যারে থেকে তৈরি করা হয়েছে */}
          <div
            className={`border-[2px] z-30 border-orange-600 bg-[#050C24] rounded-xl absolute top-[70px] left-5 block sm:hidden p-0.5 ${toggle ? "visible" : "invisible"
              }`}
          >
            <div className="p-3 rounded-xl min-w-[180px] text-center flex justify-center items-center flex-col gap-3">
              {navLinks.map((link) => (
                <div
                  key={link.href}
                  className="text-white z-50 text-2xl font-normal font-hindVadodara leading-6 tracking-[0.01] cursor-pointer hover:text-orange-600"
                >
                  <Link href={link.href}>{link.label}</Link>
                </div>
              ))}
            </div>
          </div>

          {/* ডেস্কটপ মেনু - ডাইনামিকভাবে navLinks অ্যারে থেকে তৈরি করা হয়েছে */}
          <div className="sm:flex gap-5 items-center hidden">
            {navLinks.map((link) => (
              <div
                key={link.href}
                className="text-white z-50 text-2xl font-normal font-hindVadodara leading-6 tracking-[0.01] cursor-pointer hover:text-orange-600"
              >
                <Link href={link.href}>{link.label}</Link>
              </div>
            ))}
            <button className="bg-transparent border text-lg font-semibold border-orange-600 py-1.5 px-5 rounded-md h-max text-white hover:bg-orange-600">
              Login
            </button>
          </div>
          <Link href={'/cart'}>
            <svg
              className="w-10 h-10 hover:text-orange-600 text-white cursor-pointer hidden sm:block"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1"
                d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
              />
            </svg>
          </Link>
          <button className="block sm:hidden bg-transparent border border-orange-600 py-1.5 px-5 rounded-md h-max text-white hover:bg-orange-600">
            Login
          </button>
        </div>
      </div>
      <div className="min-h-[calc(100vh-69px)] sm:min-h-[calc(100vh-63px)] flex items-center justify-center px-1 z-10">
        <div className="flex flex-col gap-2.5 pb-3 sm:min-w-[448px] max-w-md">
          <h1 className="text-3xl sm:text-4xl text-orange-600 text-center font-semibold tracking-wider">
            Health & Wellness Platform
          </h1>
          <h1 className="text-xl sm:text-2xl text-white text-center w-fit mx-auto transition-all ease-in-out duration-500 mt-1">
            {title}
          </h1>
          <div className="flex justify-center mt-2 flex-col gap-5 sm:gap-7 items-center">

            <div className="flex justify-center min-w-[100px] sm:min-w-[360px] !max-w-[200px] sm:max-w-[360px]">
              <div className="flex bg-white py-2.5 pl-2 pr-1 rounded-l-lg items-center gap-1.5 w-full max-w-[280px] sm:max-w-xl">
                <svg
                  className="text-orange-600 min-w-[20px] min-h-[20px] fill-orange-600"
                  xmlns="http://www.w3.org/2000/svg"
                  width="10"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polygon points="3 11 22 2 13 21 11 13 3 11" />
                </svg>
                <input
                  type="text"
                  className="py-1 outline-none max-w-[156px] sm:max-w-none placeholder:text-xs sm:placeholder:text-sm"
                  placeholder="Street Address, City, State"
                />
              </div>
              <button
                className="bg-orange-600 px-6 py-1 text-base lg:text-lg font-semibold text-white rounded-r-lg shadow-md "
                type="submit"
              >
                Search
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroReact;