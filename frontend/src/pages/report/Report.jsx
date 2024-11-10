import { Document, PDFViewer } from "@react-pdf/renderer";
import ReportIntro from "./ReportIntro";
import ReportPage2 from "./ReportPage2";
import ReportPage3 from "./ReportPage3";
import { useEmissionContext } from "../../contexts/EmissionsContext";
import { usePeriod } from "../../contexts/PeriodProvider";
import { useEffect, useState } from "react";
import { api } from "../../../api";
const Report = () => {
  const [top10Emissions, setTop10Emissions] = useState([]);
  const { mapImage, charts } = useEmissionContext();
  const { selectedPeriod, periods } = usePeriod();
  const currentPeriod = periods.find(
    (item) => item.id === Number(selectedPeriod)
  );
  const reportIntroData = {
    currentPeriod,
  };
  useEffect(() => {
    (async () => {
      const {
        data: { data },
      } = await api.businessUnitsActivities.fetchTop10Emissions();

      // Map the API data into the desired structure
      let top10Emissions = data.map((top10Emission) => {
        return {
          scope: top10Emission.scope,
          businessUnit: top10Emission.businessUnit.title,
          level1Category: top10Emission.level1Category,
          unitOfMeasurement: top10Emission.unitOfMeasurement,
          CO2e: top10Emission.CO2e,
        };
      });

      // Fill the array to ensure it has exactly 10 entries
      while (top10Emissions.length < 10) {
        top10Emissions.push({
          scope: "-",
          businessUnit: "-",
          level1Category: "-",
          unitOfMeasurement: "-",
          CO2e: "-",
        });
      }

      setTop10Emissions(top10Emissions);
    })();
    (async () => {
      const {
        data: { data },
      } = await api.businessUnitsActivities.fetchTop5BusinessUnitsEmissions();
      console.log(data);
      // bussinessUnit
      // total emiisions
      // // Map the API data into the desired structure
      // let top10Emissions = data.map((top10Emission) => {
      //   return {
      //     scope: top10Emission.scope,
      //     businessUnit: top10Emission.businessUnit.title,
      //     level1Category: top10Emission.level1Category,
      //     unitOfMeasurement: top10Emission.unitOfMeasurement,
      //     CO2e: top10Emission.CO2e,
      //   };
      // });
    })();
  }, []);

  return (
    <PDFViewer style={{ width: "100%", height: "100vh" }}>
      <Document>
        {/* <ReportIntro reportIntroData={reportIntroData} /> */}
        {/* <ReportPage2 charts={ charts} /> */}
        <ReportPage3 mapImage={mapImage} top10Emissions={top10Emissions} />
      </Document>
    </PDFViewer>
  );
};

export default Report;
