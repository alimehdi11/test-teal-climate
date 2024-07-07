import { useState, useEffect, useContext } from "react";
import ActivitesForm from "../components/ActivitesForm.jsx";
import ActivitiesTable from "../components/ActivitiesTable.jsx";
import ActivitiesSidebar from "../components/ActivitiesSidebar.jsx";
import Navbar from "../components/Navbar.jsx";
import { useParams } from "react-router-dom";
import { FaArrowLeftLong } from "react-icons/fa6";
import { UserContext } from "../contexts/UserContext.jsx";
import { request } from "../utils/request.js";
import Layout from "../components/layout/Layout.jsx";

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

  // useEffect(() => {
  //   if (user.id) {
  //     fetchCompanyData();
  //   }
  // }, [user.id]);

  /**
   * Above commented useEffect was previously used. It has [user.id] as dependency.
   * I change it to no dependency. I do not why developer who added this as a dependency.
   * For safety purpose I comment it so we can go back easily.
   */
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
      <Navbar />
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
              setCompanyData={setCompanyData}
            />
          ) : (
            <div className="h-full bg-gray-200 flex justify-center items-center font-bold text-gray-500 rounded-lg">
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
