import { useState, useEffect, useContext } from "react";
import ActivitesForm from "./ActivitesForm.jsx";
import ActivitiesTable from "./ActivitiesTable.jsx";
import ActivitiesSidebar from "./ActivitiesSidebar.jsx";
import { useParams } from "react-router-dom";
import { FaArrowLeftLong } from "react-icons/fa6";
import { UserContext } from "../../contexts/UserContext.jsx";
import { request } from "../../utils/request.js";
import Layout from "../../components/layout/Layout.jsx";

const Activities = () => {
  const [selectedScope, setSelectedScope] = useState(null);
  const [selectedLevel, setSelectedLevel] = useState(null);
  const [companyData, setCompanyData] = useState([]);
  const { id } = useParams();
  const { user } = useContext(UserContext);

  const fetchCompanyData = async () => {
    try {
      const response = await request(
        `${import.meta.env.VITE_API_BASE_URL}/companiesdata/${user.id}`,
        "GET"
      );
      if (!response.ok) {
        throw new Error(`Failed to fetch data:`);
      }
      const jsonData = await response.json();
      setCompanyData(jsonData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchCompanyData();
  }, []);

  useEffect(() => {
    if (!id) {
      setSelectedLevel(null);
    }
  }, [selectedScope]);

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
              setSelectedScope={setSelectedScope}
              setSelectedLevel={setSelectedLevel}
              userId={user.id}
              fetchCompanyData={fetchCompanyData}
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
        companyData={companyData}
        fetchCompanyData={fetchCompanyData}
      />
    </>
  );
};

export default Activities;
