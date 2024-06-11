import { useState } from "react";
import rightAngleArror from "./../assets/right-angle-icon.svg";

const Sidebar = ({ children }) => {
  const [sidebarVisible, setSidebarVisible] = useState(false);

  return (
    <div
      className={(
        "bg-blue w-[30vw] min-w-[250px] h-[100vh] absolute top-0 left-0 -translate-x-full transition-transform duration-400 ease-out md:translate-x-0 md:static md:transition-none " +
        (sidebarVisible ? "translate-x-0" : "")
      ).trim()}
    >
      {children}
      <button
        className="absolute w-[50px] top-[30px] right-[-50px] md:hidden rounded-r-lg"
        type="button"
        onClick={() => {
          setSidebarVisible((prev) => !prev);
        }}
      >
        <img src={rightAngleArror} className="w-7" />
      </button>
      sidebar
    </div>
  );
};

export default Sidebar;
