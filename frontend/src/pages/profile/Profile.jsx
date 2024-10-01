import { useEffect } from "react";
import PortfolioForm from "./PortfolioForm.jsx";
import ProfileTable from "./ProfileTable.jsx";
import { useState } from "react";
import Sidebar from "../../components/layout/Sidebar.jsx";
import Main from "../../components/layout/Main.jsx";
import PeriodSelector from "../../components/PeriodSelector.jsx";
import { usePeriod } from "../../contexts/PeriodProvider.jsx";
import PeriodForm from "./PeriodForm.jsx";
import Button from "../../components/ui/Button.jsx";
import { api } from "../../../api/index.js";
import { toast } from "react-toastify";

const Profile = () => {
  const [businessUnits, setBusinessUnits] = useState([]);
  const { selectedPeriod } = usePeriod();
  const [addPeriod, setAddPeriod] = useState(false);

  const fetchBusinessUnits = async () => {
    const { data, success, message } =
      await api.businessUnits.getAllBusinessUnits(selectedPeriod);
    if (success) {
      setBusinessUnits(data);
    } else {
      toast.error(message);
    }
  };

  useEffect(() => {
    if (selectedPeriod) {
      fetchBusinessUnits();
    }
  }, [selectedPeriod]);

  return (
    <>
      <Sidebar />
      <Main>
        <>
          <div className="my-5 flex justify-between">
            <span className=" font-extrabold text-2xl">Profile</span>
            <div className="flex gap-4">
              <Button
                onClick={() => {
                  setAddPeriod(true);
                }}
              >
                Add period
              </Button>
              <PeriodSelector />
            </div>
          </div>
          {addPeriod && <PeriodForm setAddPeriod={setAddPeriod} />}
          <PortfolioForm
            businessUnits={businessUnits}
            fetchBusinessUnits={fetchBusinessUnits}
          />
          <ProfileTable
            businessUnits={businessUnits}
            fetchBusinessUnits={fetchBusinessUnits}
          />
        </>
      </Main>
    </>
  );
};

export default Profile;
