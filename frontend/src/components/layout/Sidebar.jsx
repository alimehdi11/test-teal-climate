import { useState } from "react";
// import rightAngleIcon from "../../assets/right-angle-icon.svg";
import Logo from "../ui/Logo";
// import Menu from "../Menu";
import Button from "../ui/Button";
import { Link, useLocation } from "react-router-dom";
import { deleteToken } from "../../utils/auth.js";
import { IoIosLogOut } from "react-icons/io";
import { IoLogOut } from "react-icons/io5";

const Sidebar = ({ children }) => {
  // const [sidebarVisible, setSidebarVisible] = useState(false);
  const [isSettingBtnHovered, setIsSettingBtnHovered] = useState(false);
  const [isAccountBtnHovered, setIsAccountBtnHovered] = useState(false);
  const [isLogoutBtnHovered, setIsLogoutBtnHovered] = useState(false);
  const [isDashboardBtnHovered, setIsDashboardBtnHovered] = useState(false);
  const [isProfileBtnHovered, setIsProfileBtnHovered] = useState(false);
  const [isActivitesBtnHovered, setIsActivitesBtnHovered] = useState(false);
  const location = useLocation();

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
    <div className="bg-white flex-1 p-5 max-w-[300px] min-w-[300px] overflow-auto fixed top-0 left-0 bottom-0">
      <Logo />
      <div
        className="mt-4 flex flex-col justify-between"
        style={{
          height: "calc(100% - 40px - 16px)",
        }}
      >
        <div>
          <Link
            to="/dashboard"
            onMouseEnter={() => {
              setIsDashboardBtnHovered(true);
            }}
            onMouseLeave={() => {
              setIsDashboardBtnHovered(false);
            }}
          >
            <Button
              className={
                paths.isDashboardPath ? "bg-tc-indigo-light text-tc-blue" : ""
              }
            >
              {paths.isDashboardPath || isDashboardBtnHovered ? (
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M14.2222 1.77778V3.55556H10.6667V1.77778H14.2222ZM5.33333 1.77778V7.11111H1.77778V1.77778H5.33333ZM14.2222 8.88889V14.2222H10.6667V8.88889H14.2222ZM5.33333 12.4444V14.2222H1.77778V12.4444H5.33333ZM16 0H8.88889V5.33333H16V0ZM7.11111 0H0V8.88889H7.11111V0ZM16 7.11111H8.88889V16H16V7.11111ZM7.11111 10.6667H0V16H7.11111V10.6667Z"
                    fill="#197EC6"
                  />
                  <rect
                    x="1.33334"
                    y="1.33337"
                    width="4"
                    height="6"
                    fill="#197EC6"
                  />
                  <rect
                    x="10.6667"
                    y="8.66663"
                    width="4"
                    height="6"
                    fill="#197EC6"
                  />
                  <rect
                    x="10.6667"
                    y="1.33337"
                    width="4"
                    height="2.66667"
                    fill="#197EC6"
                  />
                  <rect
                    x="1.33334"
                    y="12"
                    width="4"
                    height="2.66667"
                    fill="#197EC6"
                  />
                </svg>
              ) : (
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M14.2222 1.77778V3.55556H10.6667V1.77778H14.2222ZM5.33333 1.77778V7.11111H1.77778V1.77778H5.33333ZM14.2222 8.88889V14.2222H10.6667V8.88889H14.2222ZM5.33333 12.4444V14.2222H1.77778V12.4444H5.33333ZM16 0H8.88889V5.33333H16V0ZM7.11111 0H0V8.88889H7.11111V0ZM16 7.11111H8.88889V16H16V7.11111ZM7.11111 10.6667H0V16H7.11111V10.6667Z"
                    fill="#C7C7D2"
                  />
                </svg>
              )}
              <div>Dashboard</div>
            </Button>
          </Link>
          <Link
            to="/profile"
            className={`text-tc-black font-medium flex items-center gap-x-3 py-3 px-4 rounded-md hover:bg-tc-indigo-light hover:text-tc-blue my-2${
              paths.isProfilePath ? " bg-tc-indigo-light text-tc-blue" : ""
            }`}
            onMouseEnter={() => {
              setIsProfileBtnHovered(true);
            }}
            onMouseLeave={() => {
              setIsProfileBtnHovered(false);
            }}
          >
            {paths.isProfilePath || isProfileBtnHovered ? (
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M14.2222 1.77778V3.55556H10.6667V1.77778H14.2222ZM5.33333 1.77778V7.11111H1.77778V1.77778H5.33333ZM14.2222 8.88889V14.2222H10.6667V8.88889H14.2222ZM5.33333 12.4444V14.2222H1.77778V12.4444H5.33333ZM16 0H8.88889V5.33333H16V0ZM7.11111 0H0V8.88889H7.11111V0ZM16 7.11111H8.88889V16H16V7.11111ZM7.11111 10.6667H0V16H7.11111V10.6667Z"
                  fill="#197EC6"
                />
                <rect
                  x="1.33334"
                  y="1.33337"
                  width="4"
                  height="6"
                  fill="#197EC6"
                />
                <rect
                  x="10.6667"
                  y="8.66663"
                  width="4"
                  height="6"
                  fill="#197EC6"
                />
                <rect
                  x="10.6667"
                  y="1.33337"
                  width="4"
                  height="2.66667"
                  fill="#197EC6"
                />
                <rect
                  x="1.33334"
                  y="12"
                  width="4"
                  height="2.66667"
                  fill="#197EC6"
                />
              </svg>
            ) : (
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M14.2222 1.77778V3.55556H10.6667V1.77778H14.2222ZM5.33333 1.77778V7.11111H1.77778V1.77778H5.33333ZM14.2222 8.88889V14.2222H10.6667V8.88889H14.2222ZM5.33333 12.4444V14.2222H1.77778V12.4444H5.33333ZM16 0H8.88889V5.33333H16V0ZM7.11111 0H0V8.88889H7.11111V0ZM16 7.11111H8.88889V16H16V7.11111ZM7.11111 10.6667H0V16H7.11111V10.6667Z"
                  fill="#C7C7D2"
                />
              </svg>
            )}
            <div>Profile</div>
          </Link>
          <Link
            to="/activities"
            className={`text-tc-black font-medium flex items-center gap-x-3 py-3 px-4 rounded-md hover:bg-tc-indigo-light hover:text-tc-blue${
              paths.isActivitiesPath ? " bg-tc-indigo-light text-tc-blue" : ""
            }`}
            onMouseEnter={() => {
              setIsActivitesBtnHovered(true);
            }}
            onMouseLeave={() => {
              setIsActivitesBtnHovered(false);
            }}
          >
            {paths.isActivitiesPath || isActivitesBtnHovered ? (
              <svg
                width="17"
                height="17"
                viewBox="0 0 17 17"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M5.25 15H9.75C13.5 15 15 13.5 15 9.75V5.25C15 1.5 13.5 0 9.75 0H5.25C1.5 0 0 1.5 0 5.25V9.75C0 13.5 1.5 15 5.25 15Z"
                  fill="#197EC6"
                />
                <path
                  d="M3.99756 9.36757L5.78256 7.05007C6.03756 6.72007 6.51006 6.66007 6.84006 6.91507L8.21256 7.99507C8.54256 8.25007 9.01506 8.19007 9.27006 7.86757L11.0026 5.63257"
                  stroke="white"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            ) : (
              <svg
                width="17"
                height="17"
                viewBox="0 0 17 17"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M6.25 16H10.75C14.5 16 16 14.5 16 10.75V6.25C16 2.5 14.5 1 10.75 1H6.25C2.5 1 1 2.5 1 6.25V10.75C1 14.5 2.5 16 6.25 16Z"
                  stroke="#C7C7D2"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M4.99756 10.3676L6.78256 8.05007C7.03756 7.72007 7.51006 7.66007 7.84006 7.91507L9.21256 8.99507C9.54256 9.25007 10.0151 9.19007 10.2701 8.86757L12.0026 6.63257"
                  stroke="#C7C7D2"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            )}
            <div>Activites</div>
          </Link>
          {children}
        </div>
        <div>
          <Link
            to="/setting"
            onMouseEnter={() => {
              setIsSettingBtnHovered(true);
            }}
            onMouseLeave={() => {
              setIsSettingBtnHovered(false);
            }}
          >
            <Button
              className={
                location.pathname.startsWith("/setting")
                  ? "bg-tc-indigo-light text-tc-blue"
                  : ""
              }
            >
              {location.pathname.startsWith("/setting") ||
              isSettingBtnHovered ? (
                <svg
                  width="15"
                  height="17"
                  viewBox="0 0 15 17"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M7.50005 0C6.97142 0 6.51189 0.340323 5.59361 1.02178L4.21098 2.0476C4.06637 2.15511 3.99407 2.20846 3.91614 2.25373C3.83821 2.299 3.75546 2.33457 3.59077 2.40732L2.01693 3.09929C0.970917 3.56006 0.447911 3.78963 0.183596 4.2496C-0.0807183 4.70956 -0.0172505 5.28108 0.110488 6.42249L0.301695 8.14028C0.321779 8.31973 0.33142 8.40946 0.33142 8.5C0.33142 8.59054 0.321779 8.68027 0.301695 8.85972L0.110488 10.5775C-0.0164471 11.7189 -0.0799149 12.2896 0.183596 12.7504C0.448714 13.2112 0.970917 13.4408 2.01693 13.9007L3.59157 14.5927C3.75546 14.6654 3.83821 14.701 3.91614 14.7463C3.99326 14.7915 4.06637 14.8449 4.21098 14.9524L5.59281 15.9782C6.51269 16.6597 6.97223 17 7.50005 17C8.02788 17 8.48822 16.6597 9.40649 15.9782L10.7891 14.9524C10.9337 14.8449 11.006 14.7915 11.084 14.7463C11.1619 14.701 11.2446 14.6654 11.4093 14.5927L12.9832 13.9007C14.0292 13.4399 14.5522 13.2104 14.8165 12.7504C15.0808 12.2904 15.0174 11.7189 14.8888 10.5775L14.6984 8.85972C14.6783 8.68027 14.6679 8.59054 14.6679 8.5C14.6679 8.40946 14.6783 8.31973 14.6984 8.14028L14.8896 6.42249C15.0166 5.28108 15.08 4.71037 14.8165 4.2496C14.5514 3.78883 14.0292 3.55925 12.9832 3.09929L11.4085 2.40732C11.2976 2.36225 11.1892 2.31097 11.084 2.25373C10.9819 2.1906 10.8835 2.12178 10.7891 2.0476L9.4073 1.02178C8.48661 0.340323 8.02707 0 7.50005 0ZM7.50005 11.7335C8.35234 11.7335 9.16972 11.3928 9.77238 10.7864C10.375 10.18 10.7136 9.35757 10.7136 8.5C10.7136 7.64243 10.375 6.81998 9.77238 6.21359C9.16972 5.60719 8.35234 5.26652 7.50005 5.26652C6.64777 5.26652 5.83039 5.60719 5.22773 6.21359C4.62507 6.81998 4.2865 7.64243 4.2865 8.5C4.2865 9.35757 4.62507 10.18 5.22773 10.7864C5.83039 11.3928 6.64777 11.7335 7.50005 11.7335Z"
                    fill="#197EC6"
                  />
                </svg>
              ) : (
                <svg
                  width="15"
                  height="17"
                  viewBox="0 0 15 17"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M5.89154 1.42333L5.89158 1.42329C6.36005 1.07564 6.67771 0.841057 6.94241 0.688665C7.19581 0.542786 7.35522 0.5 7.50005 0.5C7.64383 0.5 7.80279 0.542602 8.05665 0.688702C8.32163 0.841198 8.63986 1.07582 9.10943 1.42337C9.10956 1.42347 9.1097 1.42357 9.10983 1.42367L10.4858 2.44512C10.5931 2.52915 10.705 2.60721 10.8209 2.67892L10.8328 2.6863L10.8451 2.693C10.9647 2.758 11.0877 2.81635 11.2136 2.8678L12.7819 3.55699C12.7819 3.55701 12.782 3.55702 12.782 3.55704C13.3157 3.79172 13.6763 3.95114 13.9399 4.10556C14.1917 4.25303 14.3092 4.37076 14.3828 4.49844C14.4557 4.62622 14.4984 4.78822 14.4995 5.08256C14.5006 5.39021 14.4574 5.78499 14.3927 6.36723L14.2015 8.08466C14.2015 8.08469 14.2015 8.08472 14.2015 8.08474C14.2002 8.09678 14.1988 8.10858 14.1975 8.12017C14.1807 8.26964 14.1679 8.38383 14.1679 8.5C14.1679 8.61617 14.1807 8.73037 14.1975 8.87983C14.1988 8.89128 14.2001 8.90293 14.2015 8.91481C14.2015 8.91484 14.2015 8.91487 14.2015 8.9149C14.2015 8.91505 14.2015 8.91519 14.2015 8.91534L14.3919 10.6326L14.392 10.6335C14.4575 11.2155 14.501 11.6104 14.5 11.9179C14.499 12.2126 14.456 12.3742 14.383 12.5013C14.31 12.6284 14.1928 12.7459 13.9403 12.8938C13.6765 13.0483 13.3156 13.2079 12.7819 13.443C12.7818 13.443 12.7817 13.4431 12.7816 13.4431L11.2081 14.135L11.2073 14.1353C11.192 14.1421 11.177 14.1487 11.1624 14.1551C11.0328 14.2122 10.9299 14.2575 10.8328 14.3139L11.084 14.7463L10.8328 14.3139C10.7278 14.3749 10.6329 14.4455 10.5007 14.5438L10.4912 14.5509L10.4908 14.5511L9.10857 15.5767L9.10852 15.5767C8.64016 15.9243 8.32225 16.1589 8.05745 16.3113C7.80383 16.4573 7.64442 16.5 7.50005 16.5C7.35575 16.5 7.19655 16.4573 6.94285 16.3113C6.67797 16.1589 6.35997 15.9243 5.89084 15.5768C5.89071 15.5767 5.89058 15.5766 5.89044 15.5765L4.5093 14.5511C4.50922 14.5511 4.50914 14.551 4.50905 14.551C4.50904 14.551 4.50903 14.5509 4.50902 14.5509C4.36987 14.4475 4.27418 14.3767 4.16924 14.3151L4.16729 14.3139C4.07149 14.2583 3.96968 14.2132 3.84285 14.1571C3.82711 14.1502 3.81098 14.143 3.79444 14.1357L3.79273 14.1349L2.21819 13.443C1.68443 13.2083 1.32378 13.0489 1.06016 12.8944C0.808472 12.747 0.690923 12.6293 0.61732 12.5016C0.54438 12.3738 0.501656 12.2118 0.500622 11.9174C0.499541 11.6098 0.542673 11.215 0.607419 10.6328C0.607421 10.6328 0.607423 10.6328 0.607425 10.6328L0.798592 8.91534L0.798626 8.91504L0.799586 8.90646C0.818201 8.74018 0.83142 8.62209 0.83142 8.5C0.83142 8.37791 0.818201 8.25983 0.799586 8.09354L0.798626 8.08496L0.798592 8.08466L0.607419 6.36718L0.607386 6.36688C0.542235 5.78472 0.498939 5.38983 0.500019 5.08225C0.501055 4.78747 0.544059 4.62585 0.617116 4.49872C0.690134 4.37165 0.807328 4.25405 1.05979 4.10621C1.32362 3.95171 1.68447 3.7921 2.21817 3.557C2.21828 3.55695 2.21838 3.55691 2.21849 3.55686L3.79201 2.86504L3.7928 2.86469C3.80812 2.85792 3.82306 2.85134 3.83767 2.84491C3.9673 2.7878 4.07018 2.74249 4.16729 2.68608C4.27228 2.62509 4.36727 2.55446 4.49944 2.45619L4.5089 2.44915L4.5093 2.44885L5.89154 1.42333ZM7.50005 12.2335C8.48595 12.2335 9.43084 11.8394 10.127 11.1389C10.8231 10.4385 11.2136 9.48919 11.2136 8.5C11.2136 7.51082 10.8231 6.56152 10.127 5.86113C9.43084 5.16063 8.48595 4.76652 7.50005 4.76652C6.51416 4.76652 5.56927 5.16063 4.87308 5.86113C4.177 6.56153 3.7865 7.51082 3.7865 8.5C3.7865 9.48919 4.177 10.4385 4.87308 11.1389C5.56927 11.8394 6.51416 12.2335 7.50005 12.2335Z"
                    stroke="#C7C7D2"
                  />
                </svg>
              )}
              Setting
            </Button>
          </Link>
          <Link
            to="/account"
            onMouseEnter={() => {
              setIsAccountBtnHovered(true);
            }}
            onMouseLeave={() => {
              setIsAccountBtnHovered(false);
            }}
          >
            <Button
              className={
                "my-2" +
                (location.pathname.startsWith("/account")
                  ? " bg-tc-indigo-light text-tc-blue"
                  : "")
              }
            >
              {location.pathname.startsWith("/account") ||
              isAccountBtnHovered ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="size-6"
                >
                  <path
                    fillRule="evenodd"
                    d="M18.685 19.097A9.723 9.723 0 0 0 21.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 0 0 3.065 7.097A9.716 9.716 0 0 0 12 21.75a9.716 9.716 0 0 0 6.685-2.653Zm-12.54-1.285A7.486 7.486 0 0 1 12 15a7.486 7.486 0 0 1 5.855 2.812A8.224 8.224 0 0 1 12 20.25a8.224 8.224 0 0 1-5.855-2.438ZM15.75 9a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z"
                    clipRule="evenodd"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="#C7C7D2"
                  className="size-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                  />
                </svg>
              )}
              Account
            </Button>
          </Link>
          <Button
            onClick={handleLogout}
            onMouseEnter={() => {
              setIsLogoutBtnHovered(true);
            }}
            onMouseLeave={() => {
              setIsLogoutBtnHovered(false);
            }}
          >
            {isLogoutBtnHovered ? (
              <IoLogOut className="size-5" />
            ) : (
              <IoIosLogOut className="size-5" />
            )}{" "}
            Log out
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
