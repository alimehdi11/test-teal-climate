import { useState, useEffect, useContext } from "react";
import ActivitesForm from "./ActivitesForm.jsx";
import ActivitiesTable from "./ActivitiesTable.jsx";
import ActivitiesSidebar from "./ActivitiesSidebar.jsx";
import { UserContext } from "../../contexts/UserContext.jsx";
import { request } from "../../utils/request.js";
import Sidebar from "../../components/layout/Sidebar.jsx";
import Main from "../../components/layout/Main.jsx";
import EeioForm from "./EeioForm.jsx";
import ReitForm from "./ReitForm.jsx";
import PeriodSelector from "../../components/PeriodSelector.jsx";
import { usePeriod } from "../../contexts/PeriodProvider.jsx";

const Activities = () => {
  const [selectedScope, setSelectedScope] = useState("Scope 1");
  const [selectedLevel, setSelectedLevel] = useState("Fuels");
  const [userBusinessUnitsActivities, setUserBusinessUnitsActivities] =
    useState([]);
  const [isSpendBaseScope3Selected, setIsSpendBaseScope3Selected] =
    useState(false);
  const [productOrIndustry, setProductOrIndustry] = useState("Industry");
  const { user } = useContext(UserContext);
  const { selectedPeriod } = usePeriod();
  const [isReitSelected, setIsReitSelected] = useState(false);

  const fetchUserBusinessUnitsActivities = async () => {
    try {
      const userBusinessUnitsActivitiesResponse = await request(
        `${import.meta.env.VITE_API_BASE_URL}/users/${user.id}/businessUnitsActivities`,
        "GET"
      );
      if (!userBusinessUnitsActivitiesResponse.ok) {
        throw new Error(
          `${JSON.stringify(await userBusinessUnitsActivitiesResponse.json())}`
        );
      }
      let userBusinessUnitsActivities =
        await userBusinessUnitsActivitiesResponse.json();
      console.log(userBusinessUnitsActivities);
      userBusinessUnitsActivities = userBusinessUnitsActivities.filter(
        (userBusinessUnitsActivity) => {
          return (
            userBusinessUnitsActivity.businessUnit.period.id ===
            Number(selectedPeriod)
          );
        }
      );
      setUserBusinessUnitsActivities(userBusinessUnitsActivities);
    } catch (error) {
      const errorMessage = JSON.parse(error.message).error;
      console.error("Error fetching data:", error);
      console.error(errorMessage);
    }
  };

  useEffect(() => {
    fetchUserBusinessUnitsActivities();
  }, [selectedPeriod]);

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
        />
      </Sidebar>
      <Main>
        <>
          {selectedScope && selectedLevel ? (
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
                fetchUserBusinessUnitsActivities={
                  fetchUserBusinessUnitsActivities
                }
                setSelectedScope={setSelectedScope}
                setSelectedLevel={setSelectedLevel}
              />
            </>
          ) : isSpendBaseScope3Selected && productOrIndustry ? (
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
                setIsSpendBaseScope3Selected={setIsSpendBaseScope3Selected}
                fetchUserBusinessUnitsActivities={
                  fetchUserBusinessUnitsActivities
                }
              />
            </>
          ) : (
            isReitSelected && (
              <>
                <div className="my-5 flex justify-between">
                  <span className=" font-extrabold text-2xl">{"REIT"}</span>
                  <PeriodSelector />
                </div>
                <ReitForm
                  fetchUserBusinessUnitsActivities={
                    fetchUserBusinessUnitsActivities
                  }
                />
              </>
            )
          )}
          <ActivitiesTable
            userBusinessUnitsActivities={userBusinessUnitsActivities}
            fetchUserBusinessUnitsActivities={fetchUserBusinessUnitsActivities}
            setSelectedScope={setSelectedScope}
            setSelectedLevel={setSelectedLevel}
            setIsSpendBaseScope3Selected={setIsSpendBaseScope3Selected}
            setProductOrIndustry={setProductOrIndustry}
            setIsReitSelected={setIsReitSelected}
          />
        </>
      </Main>
    </>
  );
};

export default Activities;
