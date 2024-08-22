import { useState, useEffect, useContext } from "react";
import EeioSidebar from "./EeioSidebar.jsx";
import EeioTable from "./EeioTable.jsx";
import EeioForm from "./EeioForm.jsx";
import { FaArrowLeftLong } from "react-icons/fa6";
import { request } from "../../utils/request.js";
import { UserContext } from "../../contexts/UserContext.jsx";
import Layout from "../../components/layout/Layout.jsx";

const Eeio = () => {
  const [productOrIndustry, setProductOrIndustry] = useState("");
  const [selectedLevel1, setSelectedLevel1] = useState("");

  const [userBusinessUnitsActivities, setUserBusinessUnitsActivities] =
    useState([]);

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

  useEffect(() => {
    if (productOrIndustry === "") {
      setSelectedLevel1("");
    }
  }, [productOrIndustry]);

  return (
    <>
      <Layout
        sidebarContent={
          <EeioSidebar
            productOrIndustry={productOrIndustry}
            setProductOrIndustry={setProductOrIndustry}
            selectedLevel1={selectedLevel1}
            setSelectedLevel1={setSelectedLevel1}
          />
        }
        mainContent={
          productOrIndustry && selectedLevel1 ? (
            <EeioForm
              productOrIndustry={productOrIndustry}
              selectedLevel1={selectedLevel1}
              fetchUserBusinessUnitsActivities={
                fetchUserBusinessUnitsActivities
              }
            />
          ) : (
            <div
              className="bg-gray-200 flex justify-center items-center font-bold text-gray-500 rounded-lg"
              style={{ height: "calc(100vh - 64px - 16px)" }}
            >
              <FaArrowLeftLong className="text-[20px] me-2" /> Please select
              option from the EeioSidebar
            </div>
          )
        }
      />
      <EeioTable
        userBusinessUnitsActivities={userBusinessUnitsActivities}
        fetchUserBusinessUnitsActivities={fetchUserBusinessUnitsActivities}
        setProductOrIndustry={setProductOrIndustry}
        setSelectedLevel1={setSelectedLevel1}
      />
    </>
  );
};

export default Eeio;
