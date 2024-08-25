import { useEffect, useContext } from "react";
import ProfileSidebar from "./ProfileSidebar.jsx";
import PortfolioForm from "./PortfolioForm.jsx";
// import PortfolioFormEdit from "./PortfolioFormEdit.jsx";
// import BasicForm from "./BasicForm.jsx";
import ProfileTable from "./ProfileTable.jsx";
import { useState } from "react";
// import { FaArrowLeftLong } from "react-icons/fa6";
import { UserContext } from "../../contexts/UserContext.jsx";
import { request } from "../../utils/request.js";
import Layout from "../../components/layout/Layout.jsx";
// import { useParams } from "react-router-dom";

const Profile = () => {
  const [userBusinessUnits, setUserBusinessUnits] = useState([]);
  // const [selectedForm, setSelectedForm] = useState("");
  const { user } = useContext(UserContext);
  // const { id } = useParams();

  const fetchUserBusinessUnits = async () => {
    try {
      const response = await request(
        `${import.meta.env.VITE_API_BASE_URL}/users/${user.id}/businessUnits`,
        "GET"
      );
      if (!response.ok) {
        console.log(response);
        throw new Error(`Failed to fetch data: ${response.statusText}`);
      }
      const jsonData = await response.json();
      setUserBusinessUnits(jsonData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchUserBusinessUnits();
  }, []);

  return (
    <>
      <Layout
        sidebarContent={
          <ProfileSidebar
          // selectedForm={selectedForm}
          // setSelectedForm={setSelectedForm}
          />
        }
        mainContent={
          // id ? (
          //   <PortfolioFormEdit
          //     fetchUserBusinessUnits={fetchUserBusinessUnits}
          //   />
          // ) : (
          //   <PortfolioForm
          //     userBusinessUnits={userBusinessUnits}
          //     fetchUserBusinessUnits={fetchUserBusinessUnits}
          //   />
          // )
          // selectedForm ? (
          // (selectedForm === "Basic" && <BasicForm />) ||
          // selectedForm === "Portfolio" && (
          <>
            <div className="my-5 font-extrabold text-2xl">Profile</div>
            <PortfolioForm
              userBusinessUnits={userBusinessUnits}
              fetchUserBusinessUnits={fetchUserBusinessUnits}
            />
            <ProfileTable
              userBusinessUnits={userBusinessUnits}
              fetchUserBusinessUnits={fetchUserBusinessUnits}
              // setSelectedForm={setSelectedForm}
            />
          </>
          // ) : (
          //   // )
          //   <div
          //     className="h-full bg-gray-200 flex justify-center items-center font-bold text-gray-500 rounded-lg"
          //     style={{ height: "calc(100vh - 64px - 16px)" }}
          //   >
          //     <FaArrowLeftLong className="text-[20px] me-2" />
          //     Please select option from the sidebar
          //   </div>
          // )
        }
      />
    </>
  );
};

export default Profile;
