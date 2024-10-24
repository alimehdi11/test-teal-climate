import React from "react";
import reportImage from "./ReportAssets/report-image.png";
import tealClimateLogo1 from "../../assets/teal-climate-logo-1.svg";
import tealClimateLogo2 from "../../assets/teal-climate-logo-2.svg";
import reportLogoSvg from "./ReportAssets/reportLogo.svg";
const ReportPage1 = () => {
  return (
    <>
      <img src={reportImage} alt="" className="h-[90vh] w-full object-cover" />
      <div className="pl-20 py-16 min-h-[50vh] flex flex-col justify-between">
        <div>
          <h1 className="font-bold text-6xl">Choco Lux Ltd.</h1>
          <p className="mt-4 mb-5 text-xl text-gray-500">
            CARBON ACCOUNTING REPORT 2023
          </p>
          <div className="h-2 w-[300px] bg-tc-green rounded-md"></div>
        </div>
        <div className="relative">
          <div className="flex items-center gap-2">
            <img src={tealClimateLogo1} className="w-20" />
            <img src={tealClimateLogo2} className="w-40" />
          </div>
          <div className=" absolute right-0 -bottom-20">
            <img src={reportLogoSvg} alt="" />
          </div>
        </div>
      </div>
    </>
  );
};

export default ReportPage1;
