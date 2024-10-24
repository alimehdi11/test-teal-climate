import React from "react";
import PeriodSelector from "../PeriodSelector";
import SidebarToggleBtn from "../ui/SidebarToggleBtn";
import { useLocation } from "react-router-dom";
import Report from "../../pages/report/Report";
import Button from "../ui/Button";
const Topbar = ({ title, comp }) => {
  const { pathname } = useLocation();
  let showPdfButton = pathname === "/dashboard";
  return (
    <div className="mb-5 flex justify-between items-center flex-wrap-reverse gap-3">
      <div className="flex gap-3">
        <SidebarToggleBtn />
        {title && (
          <span className="font-extrabold text-lg lg:text-2xl">{title}</span>
        )}
      </div>
      <div className="flex items-center flex-wrap gap-2">
        {comp && comp}
        <PeriodSelector />
      </div>
    </div>
  );
};

export default Topbar;
