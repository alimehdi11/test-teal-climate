import React, { useContext } from "react";
import { DataContext } from "../../contexts/DataContext";

const SidebarToggleBtn = () => {
  const { toggleSidebar, isSidebarOpen } = useContext(DataContext);
  return (
    <button
      onClick={toggleSidebar}
      className="flex gap-1 flex-col justify-center items-center md:hidden focus:outline-none"
    >
      <div
        className={`h-1 w-7 bg-gray-800 transition-transform duration-300 ${
          isSidebarOpen ? "rotate-45 translate-y-2" : ""
        }`}
      />
      <div
        className={`h-1 w-7 bg-gray-800 transition-opacity duration-300 ${
          isSidebarOpen ? "opacity-0" : "opacity-100"
        }`}
      />
      <div
        className={`h-1 w-7 bg-gray-800 transition-transform duration-300 ${
          isSidebarOpen ? "-rotate-45 -translate-y-2" : ""
        }`}
      />
    </button>
  );
};

export default SidebarToggleBtn;
