import { useEffect, useContext } from "react";
import PortfolioForm from "./PortfolioForm.jsx";
import ProfileTable from "./ProfileTable.jsx";
import { useState } from "react";
import { UserContext } from "../../contexts/UserContext.jsx";
import { request } from "../../utils/request.js";
import Sidebar from "../../components/layout/Sidebar.jsx";
import Main from "../../components/layout/Main.jsx";
import PeriodSelector from "../../components/PeriodSelector.jsx";
import { usePeriod } from "../../contexts/PeriodProvider.jsx";

const Profile = () => {
  const [userBusinessUnits, setUserBusinessUnits] = useState([]);
  const { user } = useContext(UserContext);
  const { selectedPeriod } = usePeriod();

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
      let businessUnits = await response.json();
      businessUnits = businessUnits.filter((businessUnit) => {
        return businessUnit.period === selectedPeriod;
      });
      setUserBusinessUnits(businessUnits);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    if (selectedPeriod) {
      fetchUserBusinessUnits();
    }
  }, [selectedPeriod]);

  return (
    <>
      <Sidebar />
      <Main>
        <>
          <div className="my-5 flex justify-between">
            <span className=" font-extrabold text-2xl">Profile</span>
            <PeriodSelector />
          </div>
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
