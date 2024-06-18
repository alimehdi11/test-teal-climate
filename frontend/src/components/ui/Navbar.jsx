import React, { useState } from "react";
import { Link } from "react-router-dom";

const Navbar = ({ userName, activePath }) => {
  const [isNavVisible, setIsNavVisible] = useState(false);

  const toggleNavVisibility = () => {
    setIsNavVisible(!isNavVisible);
  };

  return (
    <header className="self-stretch bg-white shadow-[0px_4px_50px_rgba(0,_0,_0,_0.05)] flex items-center justify-between py-3 px-6 box-border top-[0] z-[9999] sticky max-w-full text-left text-xs text-dark font-poppins">
      {/* Logo and Brand */}
      <div className="flex flex-row items-center justify-start gap-[4px]">
        <img
          className="h-10 w-[48.8px] relative overflow-hidden shrink-0 z-[1]"
          loading="eager"
          alt=""
          src="/logo.svg"
        />
        <img
          className="h-[13.8px] w-[104.9px] relative z-[1]"
          loading="eager"
          alt=""
          src="/teal-climate.svg"
        />
      </div>

      {/* Navigation Links */}
      <div
        className={`flex flex-col md:flex-row items-start md:items-center md:justify-start gap-[8px] z-[2] absolute md:relative top-full md:top-0 right-0 md:right-auto bg-white md:bg-transparent p-4 md:p-0 transition-all duration-300 ease-in-out transform ${isNavVisible ? "flex" : "hidden"} md:flex`}
      >
        <Link
          to="/dashboard"
          className={`text-black flex items-center ${
            activePath === "/dashboard"
              ? "bg-brand-color-01 rounded-lg text-white"
              : ""
          }`}
          style={{ textDecoration: "none" }}
        >
          <div className="rounded-lg flex flex-col items-center justify-center py-2.5 px-6 box-border min-w-[145px] max-w-[145px]">
            <div className="flex flex-row items-center justify-start py-0 pr-px pl-0 gap-[8px]">
              <img
                className="h-5 w-5 relative min-h-[20px]"
                loading="eager"
                alt=""
                src="/icons.svg"
              />
              <div className="relative font-medium">Dashboard</div>
            </div>
          </div>
        </Link>
        <Link
          to="/profile"
          className={`text-black flex items-center ${
            activePath === "/profile"
              ? "bg-brand-color-01 rounded-lg text-white"
              : ""
          }`}
          style={{ textDecoration: "none" }}
        >
          <div className="rounded-lg flex flex-col items-center justify-center py-2.5 px-6 box-border min-w-[145px] max-w-[145px]">
            <div className="flex flex-row items-center justify-start py-0 pr-[13px] pl-3 gap-[8px]">
              <img
                className="h-5 w-5 relative min-h-[20px]"
                alt=""
                src="/icons-1.svg"
              />
              <div className="relative font-medium">Profile</div>
            </div>
          </div>
        </Link>
        <Link
          to="/activities"
          className={`text-black flex items-center gap-[8px] ${
            activePath === "/activities"
              ? "bg-brand-color-01 rounded-lg text-white"
              : ""
          }`}
          style={{ textDecoration: "none" }}
        >
          <div className="rounded-lg flex flex-col items-center justify-center py-2.5 px-6 box-border min-w-[145px] max-w-[145px]">
            <div className="flex flex-row items-center justify-center py-0 px-1.5 gap-[8px]">
              <img
                className={`h-5 w-5 relative object-contain min-h-[20px] `}
                alt=""
                src="/icons-2.svg"
              />
              <div className="relative text-xs font-semibold">Activities</div>
            </div>
          </div>
        </Link>
      </div>

      {/* Profile and Notification Icons */}
      <div className="md:hidden flex-1 flex justify-center">
        <div className="flex flex-row items-center justify-start gap-[12px]">
          <img
            className="h-10 w-10 relative min-h-[40px] z-[1]"
            loading="eager"
            alt="Messages"
            src="/messages.svg"
          />
          <img
            className="h-10 w-10 relative min-h-[40px] z-[1]"
            loading="eager"
            alt="Notification"
            src="/notification.svg"
          />
          <Link to="/account">
            <div className="h-10 w-10 relative rounded-81xl object-contain min-h-[40px] z-[1] bg-gray-100 flex items-center justify-center text-black font-semibold">
              {userName ? userName.charAt(0).toUpperCase() : "A"}
            </div>
          </Link>
        </div>
      </div>

      <div className="hidden md:flex items-center justify-end gap-[12px]">
        <img
          className="h-10 w-10 relative min-h-[40px] z-[1]"
          loading="eager"
          alt="Messages"
          src="/messages.svg"
        />
        <img
          className="h-10 w-10 relative min-h-[40px] z-[1]"
          loading="eager"
          alt="Notification"
          src="/notification.svg"
        />
        <Link to="/account">
          <div className="h-10 w-10 relative rounded-81xl object-contain min-h-[40px] z-[1] bg-gray-100 flex items-center justify-center text-black font-semibold">
            {userName ? userName.charAt(0).toUpperCase() : "A"}
          </div>
        </Link>
      </div>

      {/* Toggle Button */}
      <button
        className="md:hidden p-2 bg-gray-200 rounded"
        onClick={toggleNavVisibility}
      >
        ☰
      </button>
    </header>
  );
};

export default Navbar;
