import GroupComponent from "./GroupComponent";
import AirTravelScope from "./AirTravelScope";
import ScopePurchasedServices from "./ScopePurchasedServices";
import Navbar from "../components/ui/Navbar.jsx";
import Top10EmissionsTable from "./Top10EmissionsTable.jsx";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { useRef } from "react";
import Map from "./Map";
import Button from "../components/ui/Button.jsx";

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
    <div ref={pdfRef} className="">
      <Navbar />
      <div className="flex flex-col xsm:flex-row gap-y-2 justify-between px-3 mt-4">
        <div className="flex justify-center items-center">
          <img
            className="h-6 w-6 relative overflow-hidden shrink-0"
            loading="eager"
            alt=""
            src="/phcalendar.svg"
          />
          <span>Jan 01, 2024 - Jan 11, 2024</span>
        </div>
        <Button
          className="bg-tc-green text-white text-base"
          onClick={downloadPDF}
        >
          Download PDF
        </Button>
      </div>
      <AirTravelScope />
      {/* <Map />
      <Top10EmissionsTable /> */}
    </div>
  );
};

export default Dashboard;
