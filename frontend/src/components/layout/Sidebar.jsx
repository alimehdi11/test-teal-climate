import { useState } from "react";
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

const Sidebar = ({ children }) => {
  const [isSettingBtnHovered, setIsSettingBtnHovered] = useState(false);
  const [isAccountBtnHovered, setIsAccountBtnHovered] = useState(false);
  const [isLogoutBtnHovered, setIsLogoutBtnHovered] = useState(false);
  const [isDashboardBtnHovered, setIsDashboardBtnHovered] = useState(false);
  const [isProfileBtnHovered, setIsProfileBtnHovered] = useState(false);
  const [isActivitesBtnHovered, setIsActivitesBtnHovered] = useState(false);
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

  return (
    <div className="bg-white flex-1 p-5 pt-0 max-w-[300px] min-w-[300px] overflow-auto fixed top-0 left-0 bottom-0">
      <div className="bg-white pt-5 pb-1 sticky top-0">
        <Logo />
      </div>
      <div
        className="mt-4 flex flex-col justify-between"
        style={{
          height: "calc(100% - 40px - 16px)",
        }}
      >
        <div>
          <Link to="/dashboard">
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
          <Link to="/profile">
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
        <div>
          <Link to="/setting">
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
          <Link to="/account">
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
            onClick={handleLogout}
            onMouseEnter={() => {
              setIsLogoutBtnHovered(true);
            }}
            onMouseLeave={() => {
              setIsLogoutBtnHovered(false);
            }}
            className="mb-2"
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
    </div>
  );
};

export default Sidebar;
