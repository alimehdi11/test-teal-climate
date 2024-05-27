import React from "react";
import { Link, useLocation } from "react-router-dom";

const Nav = () => {
  const location = useLocation();

  return (
    <header className="self-stretch bg-white shadow-[0px_4px_50px_rgba(0,_0,_0,_0.05)] flex flex-row items-center justify-between py-3 px-6 box-border gap-[20px] top-[0] z-[99] sticky max-w-full text-left text-xs text-dark font-poppins">
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
      <div className="flex flex-row items-center justify-center py-0 pr-3.5 pl-0 box-border max-w-full">
        <div className="flex flex-row items-center justify-center gap-[8px] z-[2]">
          {/* Dashboard Link */}
          <Link
            to="/"
            className={`flex items-center ${location.pathname === "/" ? "bg-brand-color-01 rounded-lg text-white" : ""}`}
            style={{ textDecoration: "none" }}
          >
            <div className="rounded-lg flex flex-col items-center justify-center py-2.5 px-6 box-border min-w-[145px] max-w-[145px]">
              <div className="flex flex-row items-center justify-start py-0 pr-px pl-0 gap-[8px]">
                <div className="relative font-medium">Login</div>
              </div>
            </div>
          </Link>
          {/* Profile Link */}

          <Link
            to="/signup"
            className={`flex items-center ${location.pathname === "/signup" ? "bg-brand-color-01 rounded-lg text-white" : ""}`}
            style={{ textDecoration: "none" }}
          >
            <div className="rounded-lg flex flex-col items-center justify-center py-2.5 px-6 box-border min-w-[145px] max-w-[145px]">
              <div className="flex flex-row items-center justify-start py-0 pr-px pl-0 gap-[8px]">
                <div className="relative font-medium">Sign up</div>
              </div>
            </div>
          </Link>
        </div>
      </div>
      {/* Profile and Notification Icons */}
    </header>
  );
};

export default Nav;
