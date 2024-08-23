import { useState } from "react";
import rightAngleIcon from "../../assets/right-angle-icon.svg";
import Logo from "../ui/Logo";
import Navbar from "../Navbar";

const Sidebar = ({ children }) => {
  const [sidebarVisible, setSidebarVisible] = useState(false);

  return (
    <div
      // className={(
      //   "w-[25vw] min-w-[250px] fixed top-[64px] left-0 bottom-0 -translate-x-full transition-transform duration-400 ease-out md:translate-x-0 md:static md:transition-none z-[900] pt-4 shadow-lg shadow-tc-blue md:shadow-none md:pt-0 " +
      //   (sidebarVisible ? "translate-x-0" : "")
      // ).trim()}
      className="bg-white flex-1 py-4 px-6 max-w-[300px]"
    >
      <Logo />
      {/* Menu */}
      <div className="mt-4">
        <div className="text-tc-sidebar-heading px-4">Menu</div>
        <Navbar />
        {children}
      </div>
      {/* <div
        className="h-full overflow-y-auto hide-scroll px-4 md:px-0"
        style={{
          height: "calc(100vh - 64px - 16px)",
        }}
      >
        {children}
      </div> */}

      {/* Toggle sidebar */}
      {/* <div
        className="bg-tc-blue hover:bg-tc-green absolute w-[50px] h-[50px] top-4 right-[-50px] flex items-center justify-center md:hidden rounded-r-full"
        onClick={() => {
          setSidebarVisible((prev) => !prev);
        }}
      >
        <img
          src={rightAngleIcon}
          className={(
            "w-[80%] mb-[1px] " +
            (sidebarVisible ? "rotate-180 -translate-x-1 mt-1" : "")
          ).trim()}
        />
      </div> */}
    </div>
  );
};

export default Sidebar;
