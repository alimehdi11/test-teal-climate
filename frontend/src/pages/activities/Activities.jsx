import { useState, useEffect, useContext } from "react";
import ActivitesForm from "./ActivitesForm.jsx";
import ActivitiesTable from "./ActivitiesTable.jsx";
import ActivitiesSidebar from "./ActivitiesSidebar.jsx";
import { UserContext } from "../../contexts/UserContext.jsx";
import { request } from "../../utils/request.js";
import Sidebar from "../../components/layout/Sidebar.jsx";
import Main from "../../components/layout/Main.jsx";
import EeioForm from "./EeioForm.jsx";

const Activities = () => {
  const [selectedScope, setSelectedScope] = useState(null);
  const [selectedLevel, setSelectedLevel] = useState(null);
  const [userBusinessUnitsActivities, setUserBusinessUnitsActivities] =
    useState([]);
  const [isSpendBaseScope3Selected, setIsSpendBaseScope3Selected] =
    useState(false);
  const [productOrIndustry, setProductOrIndustry] = useState("");
  const { user } = useContext(UserContext);

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
      const userBusinessUnitsActivities =
        await userBusinessUnitsActivitiesResponse.json();
      setUserBusinessUnitsActivities(userBusinessUnitsActivities);
    } catch (error) {
      const errorMessage = JSON.parse(error.message).error;
      console.error("Error fetching data:", error);
      console.error(errorMessage);
    }
  };

  useEffect(() => {
    fetchUserBusinessUnitsActivities();
  }, []);

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
        />
      </Sidebar>
      <Main>
        <>
          {selectedScope && selectedLevel ? (
            <>
              <div className="my-5 font-extrabold text-2xl">
                {selectedLevel}
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
          ) : (
            isSpendBaseScope3Selected &&
            productOrIndustry && (
              <>
                <div className="my-5 font-extrabold text-2xl">
                  {productOrIndustry}
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
            )
          )}
          <ActivitiesTable
            userBusinessUnitsActivities={userBusinessUnitsActivities}
            fetchUserBusinessUnitsActivities={fetchUserBusinessUnitsActivities}
            setSelectedScope={setSelectedScope}
            setSelectedLevel={setSelectedLevel}
            setIsSpendBaseScope3Selected={setIsSpendBaseScope3Selected}
            setProductOrIndustry={setProductOrIndustry}
          />
        </>
      </Main>
    </>
  );
};

export default Activities;
