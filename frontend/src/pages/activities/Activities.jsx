import { useState, useEffect, useContext } from "react";
import ActivitesForm from "./ActivitesForm.jsx";
import ActivitiesTable from "./ActivitiesTable.jsx";
import ActivitiesSidebar from "./ActivitiesSidebar.jsx";
// import { useParams } from "react-router-dom";
import { FaArrowLeftLong } from "react-icons/fa6";
import { UserContext } from "../../contexts/UserContext.jsx";
import { request } from "../../utils/request.js";
import Layout from "../../components/layout/Layout.jsx";

const Activities = () => {
  const [selectedScope, setSelectedScope] = useState(null);
  const [selectedLevel, setSelectedLevel] = useState(null);
  const [userBusinessUnitsActivities, setUserBusinessUnitsActivities] =
    useState([]);
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
          />
        }
        mainContent={
          selectedScope && selectedLevel ? (
            <ActivitesForm
              selectedScope={selectedScope}
              selectedLevel={selectedLevel}
              fetchUserBusinessUnitsActivities={
                fetchUserBusinessUnitsActivities
              }
              setSelectedScope={setSelectedScope}
              setSelectedLevel={setSelectedLevel}
            />
          ) : (
            <div
              className="bg-gray-200 flex justify-center items-center font-bold text-gray-500 rounded-lg"
              style={{ height: "calc(100vh - 64px - 16px)" }}
            >
              <FaArrowLeftLong className="text-[20px] me-2" /> Please select
              scope and activity from the sidebar
            </div>
          )
        }
      />
      <ActivitiesTable
        userBusinessUnitsActivities={userBusinessUnitsActivities}
        fetchUserBusinessUnitsActivities={fetchUserBusinessUnitsActivities}
        setSelectedScope={setSelectedScope}
        setSelectedLevel={setSelectedLevel}
      />
    </>
  );
};

export default Activities;
