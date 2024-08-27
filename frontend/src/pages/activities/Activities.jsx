import { useState, useEffect, useContext } from "react";
import ActivitesForm from "./ActivitesForm.jsx";
import ActivitiesTable from "./ActivitiesTable.jsx";
import ActivitiesSidebar from "./ActivitiesSidebar.jsx";
// import { useParams } from "react-router-dom";
// import { FaArrowLeftLong } from "react-icons/fa6";
import { UserContext } from "../../contexts/UserContext.jsx";
import { request } from "../../utils/request.js";
import Layout from "../../components/layout/Layout.jsx";
import EeioForm from "../../pages/eeio/EeioForm.jsx";

const Activities = () => {
  const [selectedScope, setSelectedScope] = useState(null);
  const [selectedLevel, setSelectedLevel] = useState(null);
  const [userBusinessUnitsActivities, setUserBusinessUnitsActivities] =
    useState([]);
  const [isSpendBaseScope3Selected, setIsSpendBaseScope3Selected] =
    useState(false);
  const [productOrIndustry, setProductOrIndustry] = useState("");
  // const { id } = useParams();
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

  // useEffect(() => {
  //   if (!id) {
  //     setSelectedLevel(null);
  //   }
  // }, [selectedScope]);

  return (
    <>
      <Layout
        sidebarContent={
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
        }
        mainContent={
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
                    // selectedLevel={selectedLevel}
                    // setSelectedLevel={setSelectedLevel}
                    fetchUserBusinessUnitsActivities={
                      fetchUserBusinessUnitsActivities
                    }
                  />
                </>
              )
            )}
            <ActivitiesTable
              userBusinessUnitsActivities={userBusinessUnitsActivities}
              fetchUserBusinessUnitsActivities={
                fetchUserBusinessUnitsActivities
              }
              setSelectedScope={setSelectedScope}
              setSelectedLevel={setSelectedLevel}
              setIsSpendBaseScope3Selected={setIsSpendBaseScope3Selected}
              setProductOrIndustry={setProductOrIndustry}
            />
          </>
        }
      />
    </>
  );
};

export default Activities;
