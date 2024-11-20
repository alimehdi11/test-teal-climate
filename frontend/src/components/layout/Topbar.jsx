import React, { useState } from "react";
import PeriodSelector from "../PeriodSelector";
import SidebarToggleBtn from "../ui/SidebarToggleBtn";
import { useLocation, useNavigate } from "react-router-dom";
import Button from "../ui/Button";
import { useEmissionContext } from "../../contexts/EmissionsContext";
const Topbar = ({ title, comp }) => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { captureMapImage } = useEmissionContext();
  let showPdfButton = pathname === "/dashboard";
  const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
  const handlePdfDownloader = async () => {
    setIsLoading(true);
    await captureMapImage();
    await delay(1000); // Wait for 1 second
    await navigate("/generatingreport");
    await delay(1000); // Wait for another 1 secon
    await navigate("/report");
  };

  return (
    <div className="mb-5 flex justify-between items-center flex-wrap-reverse gap-3">
      <div className="flex gap-3">
        <SidebarToggleBtn />
        {title && (
          <span className="font-extrabold text-lg lg:text-2xl">{title}</span>
        )}
        {showPdfButton && (
          <Button
            onClick={handlePdfDownloader}
            className={`mt-4 mb-2 w-full flex justify-center items-center gap-2 ${isLoading ? "bg-[#00b38c]" : "bg-[#00cc9c]"}`}
            disabled={isLoading}
          >
            <span className="flex items-center gap-2">
              {isLoading ? (
                <>
                  <div className="w-4 h-4 border-2 border-t-transparent border-white rounded-full animate-spin"></div>
                  Generating PDF...
                </>
              ) : (
                "Download PDF"
              )}
            </span>
          </Button>

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
