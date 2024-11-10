import { Document, PDFViewer, pdf } from "@react-pdf/renderer";
import ReportIntro from "./ReportIntro";
import ReportPage2 from "./ReportPage2";
import ReportPage3 from "./ReportPage3";
import { useEmissionContext } from "../../contexts/EmissionsContext";
import { usePeriod } from "../../contexts/PeriodProvider";
import { useEffect, useState } from "react";
import { api } from "../../../api";
import Loader from "../../components/ui/Loader";
import { useNavigate } from "react-router-dom";

const Report = () => {
  const [top10Emissions, setTop10Emissions] = useState([]);
  const [top5BusinessUnitEmissions, setTop5BusinessUnitEmissions] = useState(
    []
  );
  const navigate = useNavigate();
  const { mapImage, charts, emissionStates, emissionsCalculationsFunctions } =
    useEmissionContext();
  const {
    scope3CategoriesCO2e,
    totalCO2e,
    totalScope1CO2e,
    totalScope2CO2e,
    totalScope3CO2e,
    emissions,
    companyName,
  } = emissionStates;
  const { selectedPeriod, periods } = usePeriod();
  const currentPeriod = periods.find(
    (item) => item.id === Number(selectedPeriod)
  );

  const reportIntroData = { currentPeriod, companyName };

  useEffect(() => {
    (async () => {
      const {
        data: { data },
      } = await api.businessUnitsActivities.fetchTop10Emissions();
      let top10Emissions = data.map((top10Emission) => ({
        scope: top10Emission.scope,
        businessUnit: top10Emission.businessUnit.title,
        level1Category: top10Emission.level1Category,
        unitOfMeasurement: top10Emission.unitOfMeasurement,
        CO2e: top10Emission.CO2e,
      }));
      while (top10Emissions.length < 10) {
        top10Emissions.push({
          scope: "",
          businessUnit: "",
          level1Category: "",
          unitOfMeasurement: "",
          CO2e: "",
        });
      }
      setTop10Emissions(top10Emissions);
    })();

    (async () => {
      const {
        data: { data },
      } = await api.businessUnitsActivities.fetchTop5BusinessUnitsEmissions();
      let top5BusinessUnitsEmissions = data.map(
        (top5BusinessUnitsEmissions) => ({
          businessUnitTitle: top5BusinessUnitsEmissions.businessUnit.title,
          totalEmissions: top5BusinessUnitsEmissions.totalEmissions.toFixed(2),
        })
      );
      while (top5BusinessUnitsEmissions.length < 5) {
        top5BusinessUnitsEmissions.push({
          totalEmissions: "",
          businessUnitTitle: "",
        });
      }
      setTop5BusinessUnitEmissions(top5BusinessUnitsEmissions);
    })();
  }, []);

  useEffect(() => {
    // Trigger the PDF download automatically when the component is mounted
    if (top10Emissions.length > 0 && top5BusinessUnitEmissions.length > 0) {
      downloadPDF();
      navigate("/dashboard");
    }
  }, [top10Emissions, top5BusinessUnitEmissions]);
  // Function to handle PDF download
  const downloadPDF = async () => {
    const doc = (
      <Document>
        <ReportIntro reportIntroData={reportIntroData} />
        <ReportPage2
          charts={charts}
          reportIntroData={reportIntroData}
          scope3CategoriesCO2e={scope3CategoriesCO2e}
          totalCO2e={totalCO2e}
          totalScope1CO2e={totalScope1CO2e}
          totalScope2CO2e={totalScope2CO2e}
          totalScope3CO2e={totalScope3CO2e}
          emissionsCalculationsFunctions={emissionsCalculationsFunctions}
          emissions={emissions}
        />
        <ReportPage3
          mapImage={mapImage}
          top10Emissions={top10Emissions}
          top5BusinessUnitEmissions={top5BusinessUnitEmissions}
          companyName={companyName}
        />
      </Document>
    );

    const blob = await pdf(doc).toBlob();

    // Format the current date (e.g., "05112024")
    const currentDate = new Date();
    const formattedDate = `${currentDate.getDate().toString().padStart(2, "0")}${(currentDate.getMonth() + 1).toString().padStart(2, "0")}${currentDate.getFullYear()}`;

    // Create a link for download with the desired filename
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `Teal_GHG_Accounting_Report_${formattedDate}.pdf`; // Set default name with the formatted date
    link.click();
  };

  return (
    <>
      <Loader />
    </>
  );
};

export default Report;
