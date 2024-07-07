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

  const paths = {
    isDashboardPath: location.pathname === "/dashboard",
    isProfilePath:
      location.pathname === "/profile" ||
      !!location.pathname.match(/^\/profile(\/\d+\/edit)?$/),
    isActivitiesPath:
      location.pathname === "/activities" ||
      !!location.pathname.match(/^\/activities(\/\d+\/edit)?$/),
  };

  return (
    <nav className="bg-white flex justify-between items-center h-16 shadow-lg sticky top-0 px-4 z-[1000]">
      <Logo />

      {/* Navigation Links */}
      <div className="hidden md:flex items-center gap-x-2 ">
        <Link
          to="/dashboard"
          className={`text-black flex items-center gap-x-1 p-2 rounded-lg border border-white hover:border-tc-green ${
            paths.isDashboardPath ? "bg-tc-green text-white" : ""
          }`}
          style={{ textDecoration: "none" }}
        >
          <img
            src={
              paths.isDashboardPath
                ? dashboardNavLinkIconWhite
                : dashboardNavLinkIconBlack
            }
          />
          <div>Dashboard</div>
        </Link>
        <Link
          to="/profile"
          className={`text-black flex items-center gap-x-1 p-2 rounded-lg border border-white hover:border-tc-green ${
            paths.isProfilePath ? "bg-tc-green text-white" : ""
          }`}
          style={{ textDecoration: "none" }}
        >
          <img
            src={
              paths.isProfilePath
                ? profileNavLinkIconWhite
                : profileNavLinkIconBlack
            }
          />
          <div>Profile</div>
        </Link>
        <Link
          to="/activities"
          className={`text-black flex items-center gap-x-1 p-2 rounded-lg border border-white hover:border-tc-green ${
            paths.isActivitiesPath ? "bg-tc-green text-white" : ""
          }`}
          style={{ textDecoration: "none" }}
        >
          <img
            src={
              paths.isActivitiesPath
                ? activitiesNavLinkIconWhite
                : activitiesNavLinkIconBlack
            }
          />
          <div>Activites</div>
        </Link>
      </div>

      {/* Profile and Notification Icons*/}
      <div className="hidden md:flex items-center gap-x-2">
        <img src={messagesIcon} className="rounded-full" />
        <img src={notificationIcon} className="rounded-full" />
        <Link
          to="/account"
          className="no-underline text-black hover:text-white bg-[#F7F8FA] rounded-full w-10 h-10 flex justify-center items-center text-[21px] hover:bg-tc-green"
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
            className={`text-black flex items-center gap-x-1 p-2 rounded-lg ${
              paths.isDashboardPath ? "bg-tc-green text-white" : ""
            }`}
            style={{ textDecoration: "none" }}
          >
            <img
              src={
                paths.isDashboardPath
                  ? dashboardNavLinkIconWhite
                  : dashboardNavLinkIconBlack
              }
            />
            <div>Dashboard</div>
          </Link>
          <Link
            to="/profile"
            className={`text-black flex items-center gap-x-1 p-2 rounded-lg ${
              paths.isProfilePath ? "bg-tc-green text-white" : ""
            }`}
            style={{ textDecoration: "none" }}
          >
            <img
              src={
                paths.isProfilePath
                  ? profileNavLinkIconWhite
                  : profileNavLinkIconBlack
              }
            />
            <div>Profile</div>
          </Link>
          <Link
            to="/activities"
            className={`text-black flex items-center gap-x-1 p-2 rounded-lg ${
              paths.isActivitiesPath ? "bg-tc-green text-white" : ""
            }`}
            style={{ textDecoration: "none" }}
          >
            <img
              src={
                paths.isActivitiesPath
                  ? activitiesNavLinkIconWhite
                  : activitiesNavLinkIconBlack
              }
            />
            <div>Activites</div>
          </Link>
        </div>

        {/* Profile and Notification Icons*/}
        <div className="mt-3 flex justify-center items-center gap-x-2">
          <img src={messagesIcon} className="rounded-full" />
          <img src={notificationIcon} className="rounded-full" />
          <Link
            to="/account"
            className="no-underline text-black hover:text-white bg-[#F7F8FA] rounded-full w-10 h-10 flex justify-center items-center text-[21px] hover:bg-tc-green"
          >
            <IoSettingsOutline />
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
