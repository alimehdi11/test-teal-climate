import CarbonEmissionsAnalytics from "./CarbonEmissionsAnalytics.jsx";
import Top10EmissionsTable from "./Top10EmissionsTable.jsx";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { useRef } from "react";
import WorldMap from "./WorldMap.jsx";
import Button from "../../components/ui/Button.jsx";
import calendarIcon from "../../assets/calendar-icon.svg";
import Sidebar from "../../components/layout/Sidebar.jsx";
import Main from "../../components/layout/Main.jsx";
import PeriodSelector from "../../components/PeriodSelector.jsx";
import Topbar from "../../components/layout/Topbar.jsx";

const Dashboard = () => {
  const pdfRef = useRef();

  const downloadPDF = () => {
    const content = pdfRef.current;

    html2canvas(content).then((canvas) => {
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
    <>
      <Sidebar></Sidebar>
      <Main>
        <div ref={pdfRef}>
          <Topbar />
          <CarbonEmissionsAnalytics />
          <WorldMap />
          <Top10EmissionsTable />
        </div>
      </Main>
    </>
  );
};

export default Dashboard;
