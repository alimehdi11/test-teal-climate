import { useEffect } from "react";
import PortfolioForm from "./PortfolioForm.jsx";
import ProfileTable from "./ProfileTable.jsx";
import { useState } from "react";
import Sidebar from "../../components/layout/Sidebar.jsx";
import Main from "../../components/layout/Main.jsx";
import { usePeriod } from "../../contexts/PeriodProvider.jsx";
import PeriodForm from "./PeriodForm.jsx";
import Button from "../../components/ui/Button.jsx";
import { api } from "../../../api/index.js";
import { toast } from "react-toastify";
import Topbar from "../../components/layout/Topbar.jsx";
import { useEmissionContext } from "../../contexts/EmissionsContext.jsx";

const Profile = () => {
  const { emissionStates:{businessUnits, setBusinessUnits}} = useEmissionContext();
  const { selectedPeriod } = usePeriod();
  const [showPeriodForm, setShowPeriodForm] = useState(false);
  useEffect(() => {
    if (selectedPeriod) {
      (async () => {
        const { data, success, message } =
          await api.businessUnits.getAllBusinessUnits(selectedPeriod);
        if (success) {
          setBusinessUnits(data);
        } else {
          toast.error(message);
        }
      })();
      setShowPeriodForm(false);
    } else {
      setShowPeriodForm(true);
    }
  }, [selectedPeriod]);

  return (
    <>
      <Sidebar />
      <Main>
        <>
          <Topbar
            title="Profile"
            comp={
              <Button
                className="max-lg:min-w-32 "
                onClick={() => {
                  setShowPeriodForm(true);
                }}
              >
                Add period
              </Button>
            }
          />

          {showPeriodForm && (
            <PeriodForm setShowPeriodForm={setShowPeriodForm} />
          )}
          <PortfolioForm setBusinessUnits={setBusinessUnits} />
          <ProfileTable
            businessUnits={businessUnits}
            setBusinessUnits={setBusinessUnits}
          />
        </>
      </Main>
    </>
  );
};

export default Profile;
