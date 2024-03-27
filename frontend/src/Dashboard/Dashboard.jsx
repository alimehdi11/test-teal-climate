import GroupComponent from "./GroupComponent";
import AirTravelScope from "./AirTravelScope";
import ScopePurchasedServices from "./ScopePurchasedServices";
import Navbar from "../Header/Navbar";
import Top10EmissionsTable from "./Top10EmissionsTable.jsx";
import Map from "./Map";

const Dashboard = () => {
  return (
    <div className="relative bg-gray-50 overflow-hidden flex flex-col items-center justify-start pt-0 px-0 pb-[123px] box-border gap-[24px] tracking-[normal] text-left text-[24px] text-dark font-poppins">
      <Navbar />
      <div className="w-[1326px] flex flex-row items-end justify-between py-0 px-5 box-border gap-[20px] max-w-full mq450:flex-wrap">
        <div className="flex flex-col items-start justify-start pt-0 px-0 pb-[3px]">
          <h2 className="m-0 h-9 relative text-inherit font-semibold font-inherit inline-block mq450:text-lgi">
            Dashboard
          </h2>
        </div>
        <div className="rounded-lg bg-white flex flex-row items-center justify-start py-3 pr-[15px] pl-3.5 gap-[6px] whitespace-nowrap text-sm font-sf-pro-display">
          {/* <img
            className="h-6 w-6 relative overflow-hidden shrink-0"
            loading="eager"
            alt=""
            src="/phcalendar.svg"
          /> */}
          <div className="relative tracking-[-0.25px]">
            Jan 01, 2024 - Jan 11, 2024
          </div>
        </div>
      </div>
      <main className="w-[1326px] flex flex-col items-start justify-start py-0 px-5 box-border gap-[16px] max-w-full">
        <AirTravelScope />
        {/* <section className="self-stretch flex flex-col items-start justify-start gap-[26px] max-w-full"> */}
        {/* <ScopeUnitedStateofAmerica /> */}
        {/* <ScopePurchasedServices /> */}
        {/* </section> */}
      </main>
      <Top10EmissionsTable />
      <Map />
    </div>
  );
};

export default Dashboard;
