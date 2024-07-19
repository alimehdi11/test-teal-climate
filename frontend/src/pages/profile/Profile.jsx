import { useEffect, useContext } from "react";
import ProfileSidebar from "./ProfileSidebar.jsx";
import PortfolioForm from "./PortfolioForm.jsx";
import BasicForm from "./BasicForm.jsx";
import Navbar from "../../components/Navbar.jsx";
import ProfileTable from "./ProfileTable.jsx";
import { useState } from "react";
import { FaArrowLeftLong } from "react-icons/fa6";
import { UserContext } from "../../contexts/UserContext.jsx";
import { request } from "../../utils/request.js";
import Layout from "../../components/layout/Layout.jsx";

const Profile = () => {
  const [profileData, setProfileData] = useState([]);
  const [selectedForm, setSelectedForm] = useState("");
  const { user } = useContext(UserContext);

  const fetchProfileData = async () => {
    try {
      const response = await request(
        `${import.meta.env.VITE_API_BASE_URL}/companies/${user.id}`,
        "GET"
      );
      if (!response.ok) {
        console.log(response);
        throw new Error(`Failed to fetch data: ${response.statusText}`);
      }
      const jsonData = await response.json();
      setProfileData(jsonData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  // useEffect(() => {
  //   if (user.id) {
  //     fetchProfileData();
  //   }
  // }, [user.id]);

  /**
   * Above commented useEffect was previously used. It has [user.id] as dependency.
   * I change it to no dependency. I do not why developer who added this as a dependency.
   * For safety purpose I comment it so we can go back easily.
   */

  useEffect(() => {
    fetchProfileData();
  }, []);

  return (
    <>
      <Navbar />
      <Layout
        sidebarContent={
          <ProfileSidebar
            selectedForm={selectedForm}
            setSelectedForm={setSelectedForm}
          />
        }
        mainContent={
          selectedForm ? (
            (selectedForm === "Basic" && <BasicForm />) ||
            (selectedForm === "Portfolio" && (
              <PortfolioForm
                userId={user.id}
                profileData={profileData}
                fetchProfileData={fetchProfileData}
              />
            ))
          ) : (
            <div
              className="h-full bg-gray-200 flex justify-center items-center font-bold text-gray-500 rounded-lg"
              style={{ height: "calc(100vh - 64px - 16px)" }}
            >
              <FaArrowLeftLong className="text-[20px] me-2" />
              Please select option from the sidebar
            </div>
          )
        }
      />
      <ProfileTable
        profileData={profileData}
        fetchProfileData={fetchProfileData}
        userId={user.id}
        setSelectedForm={setSelectedForm}
      />
    </>
  );
};

export default Profile;
