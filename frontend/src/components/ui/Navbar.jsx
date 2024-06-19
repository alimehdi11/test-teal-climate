import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Logo from "./Logo";
import { IoMenu } from "react-icons/io5";
import { IoClose } from "react-icons/io5";

const Navbar = () => {
  const [isNavVisible, setIsNavVisible] = useState(false);
  const location = useLocation();

  const toggleNavVisibility = () => {
    setIsNavVisible(!isNavVisible);
  };

  return (
    <nav className="flex justify-between items-center h-14 shadow-md sticky top-0 px-3">
      <Logo />

      {/* Navigation Links */}
      <div className="hidden md:flex items-center gap-x-2 ">
        <Link
          to="/dashboard"
          className={`text-black flex items-center gap-x-1 p-2 rounded-md ${
            location.pathname === "/dashboard" ? "bg-tc-green text-white" : ""
          }`}
          style={{ textDecoration: "none" }}
        >
          <img
            className={`${
              location.pathname === "/dashboard" ? "text-white" : ""
            }`}
            loading="eager"
            src="/icons.svg"
          />
          <div>Dashboard</div>
        </Link>
        <Link
          to="/profile"
          className={`text-black flex items-center gap-x-1 p-2 rounded-md ${
            location.pathname === "/profile" ? "bg-tc-green text-white" : ""
          }`}
          style={{ textDecoration: "none" }}
        >
          <img
            className={`${
              location.pathname === "/profile" ? "text-white" : ""
            }`}
            loading="eager"
            src="/icons-1.svg"
          />
          <div>Profile</div>
        </Link>
        <Link
          to="/activites"
          className={`text-black flex items-center gap-x-1 p-2 rounded-md ${
            location.pathname === "/activites" ? "bg-tc-green text-white" : ""
          }`}
          style={{ textDecoration: "none" }}
        >
          <img
            className={`${
              location.pathname === "/activites" ? "text-white" : ""
            }`}
            loading="eager"
            src="/icons-2.svg"
          />
          <div>Activites</div>
        </Link>
      </div>

      {/* Profile and Notification Icons*/}
      <div className="hidden md:flex items-center gap-x-2">
        <img alt="Messages" src="/messages.svg" />
        <img alt="Notification" src="/notification.svg" />
        <Link
          to="/account"
          className="no-underline text-black bg-[#F7F8FA] rounded-full w-10 h-10 flex justify-center items-center"
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
            className={`text-black flex items-center gap-x-1 p-2 rounded-md ${
              location.pathname === "/dashboard" ? "bg-tc-green text-white" : ""
            }`}
            style={{ textDecoration: "none" }}
          >
            <img
              className={`${
                location.pathname === "/dashboard" ? "text-white" : ""
              }`}
              loading="eager"
              src="/icons.svg"
            />
            <div>Dashboard</div>
          </Link>
          <Link
            to="/profile"
            className={`text-black flex items-center gap-x-1 p-2 rounded-md ${
              location.pathname === "/profile" ? "bg-tc-green text-white" : ""
            }`}
            style={{ textDecoration: "none" }}
          >
            <img
              className={`${
                location.pathname === "/profile" ? "text-white" : ""
              }`}
              loading="eager"
              src="/icons-1.svg"
            />
            <div>Profile</div>
          </Link>
          <Link
            to="/activites"
            className={`text-black flex items-center gap-x-1 p-2 rounded-md ${
              location.pathname === "/activites" ? "bg-tc-green text-white" : ""
            }`}
            style={{ textDecoration: "none" }}
          >
            <img
              className={`${
                location.pathname === "/activites" ? "text-white" : ""
              }`}
              loading="eager"
              src="/icons-2.svg"
            />
            <div>Activites</div>
          </Link>
        </div>
        {/* Profile and Notification Icons*/}
        <div className="mt-3 flex justify-center items-center gap-x-2">
          <img alt="Messages" src="/messages.svg" />
          <img alt="Notification" src="/notification.svg" />
          <Link
            to="/account"
            className="no-underline text-black bg-[#F7F8FA] rounded-full w-10 h-10 flex justify-center items-center"
          >
            A
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
