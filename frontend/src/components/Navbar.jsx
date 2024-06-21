import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Logo from "../components/ui/Logo";
import { IoMenu } from "react-icons/io5";
import { IoClose } from "react-icons/io5";

const Navbar = () => {
  const [isNavVisible, setIsNavVisible] = useState(false);
  const location = useLocation();

  const toggleNavVisibility = () => {
    setIsNavVisible(!isNavVisible);
  };

  return (
    <nav className="bg-white flex justify-between items-center h-14 shadow-lg sticky top-0 px-3 z-[1]">
      <Logo />

      {/* Navigation Links */}
      <div className="hidden md:flex items-center gap-x-2 ">
        <Link
          to="/dashboard"
          className={`text-black flex items-center gap-x-1 p-2 rounded ${
            location.pathname === "/dashboard" ? "bg-tc-green text-white" : ""
          }`}
          style={{ textDecoration: "none" }}
        >
          <img
            src={
              location.pathname === "/dashboard"
                ? "/src/assets/dashboard-nav-link-icon-white.svg"
                : "/src/assets/icons.svg"
            }
          />
          <div>Dashboard</div>
        </Link>
        <Link
          to="/profile"
          className={`text-black flex items-center gap-x-1 p-2 rounded ${
            location.pathname === "/profile" ? "bg-tc-green text-white" : ""
          }`}
          style={{ textDecoration: "none" }}
        >
          <img
            src={
              location.pathname === "/profile"
                ? "/src/assets/profile-nav-link-icon-white.svg"
                : "/src/assets/icons-1.svg"
            }
          />
          <div>Profile</div>
        </Link>
        <Link
          to="/activities"
          className={`text-black flex items-center gap-x-1 p-2 rounded ${
            location.pathname === "/activities" ? "bg-tc-green text-white" : ""
          }`}
          style={{ textDecoration: "none" }}
        >
          <img
            src={
              location.pathname === "/activities"
                ? "/src/assets/activities-nav-link-icon-white.svg"
                : "/src/assets/icons-2.svg"
            }
          />
          <div>Activites</div>
        </Link>
      </div>

      {/* Profile and Notification Icons*/}
      <div className="hidden md:flex items-center gap-x-2">
        <img
          src="/src/assets/messages.svg"
          className="border rounded-full border-slate-500"
        />
        <img
          src="/src/assets/notification.svg"
          className="border rounded-full border-slate-500"
        />
        <Link
          to="/account"
          className="no-underline text-black bg-[#F7F8FA] rounded-full w-10 h-10 flex justify-center items-center border border-slate-500"
        >
          A
        </Link>
      </div>

      {/* Toggle Button */}
      <IoMenu className="md:hidden text-[24px]" onClick={toggleNavVisibility} />

      {/* Mobile menu */}
      <div
        className={`fixed right-0 top-0 h-[100vh] md:hidden w-72 bg-white shadow-lg ${isNavVisible ? "block" : "hidden"}`}
      >
        {/* Close menu */}
        <IoClose
          className="relative top-2 left-2 text-[26px]"
          onClick={toggleNavVisibility}
        />
        {/* Navigation Links */}
        <div className="mt-3 flex flex-col gap-y-3 px-3">
          <Link
            to="/dashboard"
            className={`text-black flex items-center gap-x-1 p-2 rounded ${
              location.pathname === "/dashboard" ? "bg-tc-green text-white" : ""
            }`}
            style={{ textDecoration: "none" }}
          >
            <img
              src={
                location.pathname === "/dashboard"
                  ? "/src/assets/dashboard-nav-link-icon-white.svg"
                  : "/src/assets/icons.svg"
              }
            />
            <div>Dashboard</div>
          </Link>
          <Link
            to="/profile"
            className={`text-black flex items-center gap-x-1 p-2 rounded ${
              location.pathname === "/profile" ? "bg-tc-green text-white" : ""
            }`}
            style={{ textDecoration: "none" }}
          >
            <img
              src={
                location.pathname === "/profile"
                  ? "/src/assets/profile-nav-link-icon-white.svg"
                  : "/src/assets/icons-1.svg"
              }
            />
            <div>Profile</div>
          </Link>
          <Link
            to="/activities"
            className={`text-black flex items-center gap-x-1 p-2 rounded ${
              location.pathname === "/activities"
                ? "bg-tc-green text-white"
                : ""
            }`}
            style={{ textDecoration: "none" }}
          >
            <img
              src={
                location.pathname === "/activities"
                  ? "/src/assets/activities-nav-link-icon-white.svg"
                  : "/src/assets/icons-2.svg"
              }
            />
            <div>Activites</div>
          </Link>
        </div>

        {/* Profile and Notification Icons*/}
        <div className="mt-3 flex justify-center items-center gap-x-2">
          <img
            src="/src/assets/messages.svg"
            className="border rounded-full border-slate-500"
          />
          <img
            src="/src/assets/notification.svg"
            className="border rounded-full border-slate-500"
          />
          <Link
            to="/account"
            className="no-underline text-black bg-[#F7F8FA] rounded-full w-10 h-10 flex justify-center items-center border border-slate-500"
          >
            A
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
