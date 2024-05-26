// Navbar.js
import React from "react";
import { Link, useLocation } from "react-router-dom";

const Navbar = ({ userName }) => {
  const location = useLocation();
  return (
    <header className="self-stretch bg-white shadow-[0px_4px_50px_rgba(0,_0,_0,_0.05)] flex flex-row items-start justify-between py-3 px-6 box-border gap-[20px] top-[0] z-[9999] sticky max-w-full text-left text-xs text-dark font-poppins">
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
      <div className="flex flex-col items-start justify-start py-0 pr-3.5 pl-0 box-border max-w-full">
        <div className="flex flex-row items-start justify-start gap-[8px] z-[2]">
          {/* Dashboard Link */}
          <Link
            to="/dashboard"
            className={`text-black flex items-center ${
              location.pathname === "/dashboard"
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
          {/* Profile Link */}
          <Link
            to="/profile"
            className={`text-black flex items-center ${
              location.pathname === "/profile"
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
          {/* Activities Link */}
          <Link
            to="/activites"
            className={`text-black flex items-center gap-[8px] ${
              location.pathname === "/activites"
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

          {/* EEIO Link */}
          {/* <div className="rounded-lg flex flex-col items-center justify-center py-2.5 px-6 box-border min-w-[145px] max-w-[145px]">
            <div className="flex flex-row items-center justify-center py-0 px-[9px] gap-[8px]">
              <img
                className="h-5 w-5 relative min-h-[20px]"
                alt=""
                src="/icons-3.svg"
              />
              <div className="flex flex-row items-center justify-start gap-[16px]">
                <div className="relative font-medium">EEIO</div>
                <img
                  className="h-1 w-2 relative"
                  alt=""
                  src="/vectorr-frame.svg"
                />
              </div>
            </div>
          </div> */}
        </div>
      </div>
      {/* Profile and Notification Icons */}
      <div className="flex flex-row items-start justify-start gap-[12px]">
        <img
          className="h-10 w-10 relative min-h-[40px] z-[1]"
          loading="eager"
          alt=""
          src="/messages.svg"
        />
        <img
          className="h-10 w-10 relative min-h-[40px] z-[1]"
          loading="eager"
          alt=""
          src="/notification.svg"
        />
        {/* Profile Link */}
        <Link to="/account">
          <div className="h-10 w-10 relative rounded-81xl object-contain min-h-[40px] z-[1] bg-gray-100 flex items-center justify-center text-black font-semibold">
            {userName ? userName.charAt(0).toUpperCase() : "A"}
          </div>
        </Link>
      </div>
    </header>
  );
};

export default Navbar;
