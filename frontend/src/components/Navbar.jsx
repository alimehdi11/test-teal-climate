import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Logo from "../components/ui/Logo";
import { IoMenu } from "react-icons/io5";
import { IoClose } from "react-icons/io5";
import dashboardNavLinkIconBlack from "../assets/dashboard-nav-link-icon-black.svg";
import dashboardNavLinkIconWhite from "../assets/dashboard-nav-link-icon-white.svg";
import profileNavLinkIconBlack from "../assets/profile-nav-link-icon-black.svg";
import profileNavLinkIconWhite from "../assets/profile-nav-link-icon-white.svg";
import activitiesNavLinkIconBlack from "../assets/dashboard-nav-link-icon-black.svg";
import activitiesNavLinkIconWhite from "../assets/dashboard-nav-link-icon-white.svg";
import { IoSettingsOutline } from "react-icons/io5";
import messagesIcon from "../assets/messages-icon.svg";
import notificationIcon from "../assets/notification-icon.svg";

const Navbar = () => {
  const [isNavVisible, setIsNavVisible] = useState(false);
  const location = useLocation();

  const toggleNavVisibility = () => {
    setIsNavVisible(!isNavVisible);
  };

  return (
    <nav className="bg-white flex justify-between items-center h-16 shadow-lg sticky top-0 px-4 z-[1000]">
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
                ? dashboardNavLinkIconWhite
                : dashboardNavLinkIconBlack
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
                ? profileNavLinkIconWhite
                : profileNavLinkIconBlack
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
                ? activitiesNavLinkIconWhite
                : activitiesNavLinkIconBlack
            }
          />
          <div>Activites</div>
        </Link>
      </div>

      {/* Profile and Notification Icons*/}
      <div className="hidden md:flex items-center gap-x-2">
        <img
          src={messagesIcon}
          className="border rounded-full border-slate-500"
        />
        <img
          src={notificationIcon}
          className="border rounded-full border-slate-500"
        />
        <Link
          to="/account"
          className="no-underline text-black bg-[#F7F8FA] rounded-full w-10 h-10 flex justify-center items-center border border-slate-500 text-[21px] hover:bg-tc-green"
        >
          <IoSettingsOutline />
        </Link>
      </div>

      {/* Toggle Button */}
      <IoMenu className="md:hidden text-[24px]" onClick={toggleNavVisibility} />

      {/* Mobile menu */}
      <div
        className={`fixed right-0 top-0 h-[100vh] md:hidden w-72 bg-white shadow-lg shadow-tc-blue ${isNavVisible ? "block" : "hidden"}`}
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
                  ? dashboardNavLinkIconWhite
                  : dashboardNavLinkIconBlack
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
                  ? profileNavLinkIconWhite
                  : profileNavLinkIconBlack
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
                  ? activitiesNavLinkIconWhite
                  : activitiesNavLinkIconBlack
              }
            />
            <div>Activites</div>
          </Link>
        </div>

        {/* Profile and Notification Icons*/}
        <div className="mt-3 flex justify-center items-center gap-x-2">
          <img
            src={messagesIcon}
            className="border rounded-full border-slate-500"
          />
          <img
            src={notificationIcon}
            className="border rounded-full border-slate-500"
          />
          <Link
            to="/account"
            className="no-underline text-black bg-[#F7F8FA] rounded-full w-10 h-10 flex justify-center items-center border border-slate-500 text-[21px] hover:bg-tc-green"
          >
            <IoSettingsOutline />
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
