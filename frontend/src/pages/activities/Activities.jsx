import { useState, useEffect, useContext } from "react";
import ActivitiesTable from "./ActivitiesTable.jsx";
import ActivitiesSidebar from "./ActivitiesSidebar.jsx";
import Sidebar from "../../components/layout/Sidebar.jsx";
import Main from "../../components/layout/Main.jsx";
import EeioForm from "./EeioForm.jsx";
import ReitForm from "./ReitForm.jsx";
import PeriodSelector from "../../components/PeriodSelector.jsx";
import { usePeriod } from "../../contexts/PeriodProvider.jsx";
import { api } from "../../../api/index.js";
import { filterBusinessUnitsActivitiesForSelectedPeriod } from "../../utils/helper.js";
import { useSearchParams, useParams } from "react-router-dom";
import ActivitesForm from "./ActivitiesForm2.jsx";

const Activities = () => {
  const [selectedScope, setSelectedScope] = useState("Scope 1");
  const [selectedLevel, setSelectedLevel] = useState("");
  const [businessUnitsActivities, setBusinessUnitsActivities] = useState([]);
  const [isSpendBaseScope3Selected, setIsSpendBaseScope3Selected] =
    useState(false);
  const [productOrIndustry, setProductOrIndustry] = useState("Industry");
  const { selectedPeriod } = usePeriod();
  const [isReitSelected, setIsReitSelected] = useState(false);
  const [businessUnits, setBusinessUnits] = useState([]);
  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const [isScopeSelected, setIsScopeSelected] = useState(true);

  useEffect(() => {
    (async () => {
      const { data, success, message } =
        await api.businessUnitsActivities.getAllBusinessUnitsActivities();
      if (success) {
        setBusinessUnitsActivities(
          filterBusinessUnitsActivitiesForSelectedPeriod(data, selectedPeriod)
        );
      } else {
        toast.error(message);
      }
    })();
    (async () => {
      const { data, success, message } =
        await api.businessUnits.getAllBusinessUnits(selectedPeriod);
      if (success) {
        setBusinessUnits(data);
      } else {
        toast.error(message);
      }
    })();
  }, [selectedPeriod]);

  useEffect(() => {
    if (id) {
      if (searchParams.get("eeio")) {
        setSelectedScope("");
        setSelectedLevel("");
        setIsReitSelected(false);
        setIsSpendBaseScope3Selected(true);
        setIsScopeSelected(false);
      } else if (searchParams.get("reit")) {
        setSelectedScope("");
        setSelectedLevel("");
        setIsReitSelected(true);
        setIsSpendBaseScope3Selected(false);
        setIsScopeSelected(false);
      } else {
        setIsSpendBaseScope3Selected(false);
        setIsReitSelected(false);
        setIsScopeSelected(true);
      }
    }
  }, [id]);

  return (
    <>
      <Sidebar>
        <ActivitiesSidebar
          selectedScope={selectedScope}
          selectedLevel={selectedLevel}
          setSelectedScope={setSelectedScope}
          setSelectedLevel={setSelectedLevel}
          isSpendBaseScope3Selected={isSpendBaseScope3Selected}
          setIsSpendBaseScope3Selected={setIsSpendBaseScope3Selected}
          productOrIndustry={productOrIndustry}
          setProductOrIndustry={setProductOrIndustry}
          setIsReitSelected={setIsReitSelected}
          isReitSelected={isReitSelected}
          setIsScopeSelected={setIsScopeSelected}
        />
      </Sidebar>
      <Main>
        <>
          {isScopeSelected && (
            <>
              <div className="my-5 flex justify-between">
                <span className=" font-extrabold text-2xl">
                  {selectedLevel}
                </span>
                <PeriodSelector />
              </div>
              <ActivitesForm
                selectedScope={selectedScope}
                selectedLevel={selectedLevel}
                setBusinessUnitsActivities={setBusinessUnitsActivities}
                setSelectedScope={setSelectedScope}
                setSelectedLevel={setSelectedLevel}
                businessUnits={businessUnits}
              />
            </>
          )}
          {isSpendBaseScope3Selected && (
            <>
              <div className="my-5 flex justify-between">
                <span className=" font-extrabold text-2xl">
                  {productOrIndustry}
                </span>
                <PeriodSelector />
              </div>
              <EeioForm
                productOrIndustry={productOrIndustry}
                setProductOrIndustry={setProductOrIndustry}
                setBusinessUnitsActivities={setBusinessUnitsActivities}
                businessUnits={businessUnits}
              />
            </>
          )}
          {isReitSelected && (
            <>
              <div className="my-5 flex justify-between">
                <span className=" font-extrabold text-2xl">{"REIT"}</span>
                <PeriodSelector />
              </div>
              <ReitForm
                setBusinessUnitsActivities={setBusinessUnitsActivities}
                businessUnits={businessUnits}
              />
            </>
          )}
          <ActivitiesTable
            businessUnitsActivities={businessUnitsActivities}
            setBusinessUnitsActivities={setBusinessUnitsActivities}
            selectedPeriod={selectedPeriod}
          />
        </>
      </Main>
    </>
  );
};

export default Activities;
