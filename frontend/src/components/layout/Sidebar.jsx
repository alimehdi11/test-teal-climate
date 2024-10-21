import { useContext, useState } from "react";
import Logo from "../ui/Logo";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { deleteToken } from "../../utils/auth.js";
import SidebarItem from "../SidebarItem.jsx";
import dashboardIcon from "../../assets/icons/dashboard.svg";
import dashboardSelectedOrHoverIcon from "../../assets/icons/dashboardSelectedOrHover.svg";
import activitiesIcon from "../../assets/icons/activities.svg";
import activitiesSelectedOrHoverIcon from "../../assets/icons/activitiesSelectedOrHover.svg";
import logoutIcon from "../../assets/icons/logout.svg";
import logoutHoverIcon from "../../assets/icons/logoutHover.svg";
import settingIcon from "../../assets/icons/setting.svg";
import settingSelectedOrHoverIcon from "../../assets/icons/settingSelectedOrHover.svg";
import accountIcon from "../../assets/icons/account.svg";
import accountSelectedOrHoverIcon from "../../assets/icons/accountSelectedOrHover.svg";
import profileIcon from "../../assets/icons/profile.svg";
import profileSelectedOrHoverIcon from "../../assets/icons/profileSelectedOrHover.svg";
import Modal from "../../components/ui/Modal.jsx";
import SidebarToggleBtn from "../ui/SidebarToggleBtn.jsx";
import { DataContext } from "../../contexts/DataContext.jsx";

const Sidebar = ({ children }) => {
  const { toggleSidebar } = useContext(DataContext);
  const { isSidebarOpen } = useContext(DataContext);
  const [isSettingBtnHovered, setIsSettingBtnHovered] = useState(false);
  const [isAccountBtnHovered, setIsAccountBtnHovered] = useState(false);
  const [isLogoutBtnHovered, setIsLogoutBtnHovered] = useState(false);
  const [isDashboardBtnHovered, setIsDashboardBtnHovered] = useState(false);
  const [isProfileBtnHovered, setIsProfileBtnHovered] = useState(false);
  const [isActivitesBtnHovered, setIsActivitesBtnHovered] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isConfirm, setIsConfirm] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const paths = {
    isDashboardPath: location.pathname === "/dashboard",
    isProfilePath:
      location.pathname === "/profile" ||
      !!location.pathname.match(/^\/profile(\/\d+\/edit)?$/),
    isActivitiesPath:
      location.pathname === "/activities" ||
      !!location.pathname.match(/^\/activities(\/\d+\/edit)?$/),
  };

  const handleLogout = () => {
    deleteToken();
    navigate("/");
  };

  if (isConfirm) {
    handleLogout();
  }

  return (
    <div
      className={`z-[99] bg-white flex-1 p-5 pt-0 w-[300px]  overflow-auto fixed top-0 left-0 bottom-0 ${!isSidebarOpen && "max-md:-left-full"} duration-300`}
    >
      <div className="bg-white pt-5 sticky top-0 flex justify-between items-center">
        <Logo />
        <SidebarToggleBtn />
      </div>
      <div className="mt-5 flex flex-col justify-between min-h-[calc(100%-20px-40px-20px)]">
        <div>
          <Link to="/dashboard" onClick={toggleSidebar}>
            <SidebarItem
              className={
                paths.isDashboardPath ? "bg-tc-indigo-light text-tc-blue" : ""
              }
              onMouseEnter={() => {
                setIsDashboardBtnHovered(true);
              }}
              onMouseLeave={() => {
                setIsDashboardBtnHovered(false);
              }}
            >
              {paths.isDashboardPath || isDashboardBtnHovered ? (
                <img src={dashboardSelectedOrHoverIcon} />
              ) : (
                <img src={dashboardIcon} />
              )}
              Dashboard
            </SidebarItem>
          </Link>
          <Link to="/profile" onClick={toggleSidebar}>
            <SidebarItem
              className={
                "my-2" +
                (paths.isProfilePath ? " bg-tc-indigo-light text-tc-blue" : "")
              }
              onMouseEnter={() => {
                setIsProfileBtnHovered(true);
              }}
              onMouseLeave={() => {
                setIsProfileBtnHovered(false);
              }}
            >
              {paths.isProfilePath || isProfileBtnHovered ? (
                <img src={profileSelectedOrHoverIcon} />
              ) : (
                <img src={profileIcon} />
              )}
              Profile
            </SidebarItem>
          </Link>
          <Link to="/activities">
            <SidebarItem
              className={
                paths.isActivitiesPath ? "bg-tc-indigo-light text-tc-blue" : ""
              }
              onMouseEnter={() => {
                setIsActivitesBtnHovered(true);
              }}
              onMouseLeave={() => {
                setIsActivitesBtnHovered(false);
              }}
            >
              {paths.isActivitiesPath || isActivitesBtnHovered ? (
                <img src={activitiesSelectedOrHoverIcon} />
              ) : (
                <img src={activitiesIcon} />
              )}
              Activites
            </SidebarItem>
          </Link>
          {children}
        </div>
        <div className="pt-2">
          <Link to="/setting" onClick={toggleSidebar}>
            <SidebarItem
              className={
                location.pathname.startsWith("/setting")
                  ? "bg-tc-indigo-light text-tc-blue"
                  : ""
              }
              onMouseEnter={() => {
                setIsSettingBtnHovered(true);
              }}
              onMouseLeave={() => {
                setIsSettingBtnHovered(false);
              }}
            >
              {location.pathname.startsWith("/setting") ||
              isSettingBtnHovered ? (
                <img src={settingSelectedOrHoverIcon} />
              ) : (
                <img src={settingIcon} />
              )}
              Setting
            </SidebarItem>
          </Link>
          <Link to="/account" onClick={toggleSidebar}>
            <SidebarItem
              className={
                "my-2" +
                (location.pathname.startsWith("/account")
                  ? " bg-tc-indigo-light text-tc-blue"
                  : "")
              }
              onMouseEnter={() => {
                setIsAccountBtnHovered(true);
              }}
              onMouseLeave={() => {
                setIsAccountBtnHovered(false);
              }}
            >
              {location.pathname.startsWith("/account") ||
              isAccountBtnHovered ? (
                <img src={accountSelectedOrHoverIcon} />
              ) : (
                <img src={accountIcon} />
              )}
              Account
            </SidebarItem>
          </Link>
          <SidebarItem
            onClick={() => {
              toggleSidebar();
              setIsModalOpen(true);
            }}
            onMouseEnter={() => {
              setIsLogoutBtnHovered(true);
            }}
            onMouseLeave={() => {
              setIsLogoutBtnHovered(false);
            }}
          >
            {isLogoutBtnHovered ? (
              <img src={logoutHoverIcon} />
            ) : (
              <img src={logoutIcon} />
            )}
            Log out
          </SidebarItem>
        </div>
      </div>
      <Modal
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        setIsConfirm={setIsConfirm}
        message="Are you sure you want to logout?"
      />
    </div>
  );
};

export default Sidebar;
