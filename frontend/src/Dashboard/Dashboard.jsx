import GroupComponent from "./GroupComponent";
import AirTravelScope from "./AirTravelScope";
import ScopePurchasedServices from "./ScopePurchasedServices";
import Navbar from "../Header/Navbar";
import Top10EmissionsTable from "./Top10EmissionsTable.jsx";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { useRef } from "react";
import Map from "./Map";

const Dashboard = () => {
  const pdfRef = useRef();

  const downloadPDF = () => {
    const input = pdfRef.current; // Fixing the assignment syntax

    html2canvas(input).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4", true);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      const imgWidth = canvas.width;
      const imgHeight = canvas.height;
      const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight);
      const imgX = (pdfWidth - imgWidth * ratio) / 2;
      const imgY = 30;

      pdf.addImage(
        imgData,
        "PNG",
        imgX,
        imgY,
        imgWidth * ratio,
        imgHeight * ratio
      );
      pdf.save("invoice.pdf");
    });
  };

  return (
    <div ref={pdfRef}>
      <Navbar />
      <div className="w-[1326px] flex flex-row items-end justify-between py-0 px-5 box-border gap-[20px] max-w-full mq450:flex-wrap">
        {/* <div className="flex flex-col items-start justify-start pt-0 px-0 pb-[3px]"> */}
        <h2 className="m-0 h-9 relative text-inherit font-semibold font-inherit inline-block mq450:text-lgi">
          Dashboard
        </h2>
        {/* </div> */}
        <div className="rounded-lg bg-white flex flex-row items-center justify-start py-3 pr-[15px] pl-3.5 gap-[6px] whitespace-nowrap text-sm font-sf-pro-display">
          <img
            className="h-6 w-6 relative overflow-hidden shrink-0"
            loading="eager"
            alt=""
            src="/phcalendar.svg"
          />
          {/* <div className="relative tracking-[-0.25px]"> */}
          Jan 01, 2024 - Jan 11, 2024
          <button
            className="cursor-pointer py-2.5 pr-5 pl-[21px] bg-brand-color-01 flex-[0.8859] rounded-lg flex flex-row items-center justify-center box-border min-w-[220px] z-[1] hover:bg-mediumseagreen text-white"
            onClick={downloadPDF}
          >
            Download PDF
          </button>
          {/* </div> */}
        </div>
      </div>
      <AirTravelScope className="border-[1px] border-black border-solid" />
      <Map />
      <Top10EmissionsTable />

      {/* <div className="w-[1326px] flex flex-col items-start justify-start py-0 px-5 box-border gap-[16px] max-w-full"> */}
      {/* <section className="self-stretch flex flex-col items-start justify-start gap-[26px] max-w-full"> */}
      {/* <ScopeUnitedStateofAmerica /> */}
      {/* <ScopePurchasedServices /> */}
      {/* </section> */}
      {/* </div> */}
    </div>
    // {/* <div className="relative bg-gray-50 overflow-hidden flex flex-col items-center justify-start pt-0 px-0 pb-[123px] box-border gap-[24px] tracking-[normal] text-left text-[24px] text-dark font-poppins"> */}
    // </div>
  );
};

export default Dashboard;
