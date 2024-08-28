import { useEffect, useContext } from "react";
import ProfileSidebar from "./ProfileSidebar.jsx";
import PortfolioForm from "./PortfolioForm.jsx";
import ProfileTable from "./ProfileTable.jsx";
import { useState } from "react";
import { UserContext } from "../../contexts/UserContext.jsx";
import { request } from "../../utils/request.js";
import Sidebar from "../../components/layout/Sidebar.jsx";
import Main from "../../components/layout/Main.jsx";

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
      <Sidebar>
        <ProfileSidebar />
      </Sidebar>
      <Main>
        <>
          <div className="my-5 font-extrabold text-2xl">Profile</div>
          <PortfolioForm
            userBusinessUnits={userBusinessUnits}
            fetchUserBusinessUnits={fetchUserBusinessUnits}
          />
          <ProfileTable
            userBusinessUnits={userBusinessUnits}
            fetchUserBusinessUnits={fetchUserBusinessUnits}
          />
        </>
      </Main>
    </>
  );
};

export default Profile;
