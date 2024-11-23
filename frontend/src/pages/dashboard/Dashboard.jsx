import CarbonEmissionsAnalytics from "./CarbonEmissionsAnalytics.jsx";
import Top10EmissionsTable from "./Top10EmissionsTable.jsx";
import WorldMap from "./WorldMap.jsx";
import Sidebar from "../../components/layout/Sidebar.jsx";
import Main from "../../components/layout/Main.jsx";
import Topbar from "../../components/layout/Topbar.jsx";

const Dashboard = () => {

  return (
    <>
      <Sidebar></Sidebar>
      <Main>
          <Topbar />
          <CarbonEmissionsAnalytics />
          <WorldMap />
          <Top10EmissionsTable />
      </Main>
    </>
  );
};

export default Dashboard;
