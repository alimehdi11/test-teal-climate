import { useState } from "react";
import rightAngleIcon from "../../assets/right-angle-icon.svg";

const Sidebar = ({ children }) => {
  const [sidebarVisible, setSidebarVisible] = useState(false);

  return (
    <div
      className={(
        "w-[25vw] min-w-[250px] fixed top-[64px] left-0 bottom-0 -translate-x-full transition-transform duration-400 ease-out md:translate-x-0 md:static md:transition-none z-[900] bg-white pt-4 shadow-lg shadow-tc-blue md:shadow-none md:pt-0 " +
        (sidebarVisible ? "translate-x-0" : "")
      ).trim()}
    >
      <div className="h-full overflow-y-auto hide-scroll px-4 pb-16 md:px-0 md:pb-0">
        {children}
      </div>

      {/* Toggle sidebar */}
      <div
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
      </div>
    </div>
  );
};

export default Sidebar;
