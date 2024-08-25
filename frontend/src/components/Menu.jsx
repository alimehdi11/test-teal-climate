// import { useState } from "react";
// import { Link, useLocation } from "react-router-dom";
// import Logo from "./ui/Logo";
// import { IoMenu } from "react-icons/io5";
// import { IoClose } from "react-icons/io5";
// import dashboardNavLinkIconBlack from "../assets/dashboard-nav-link-icon-black.svg";
// import dashboardNavLinkIconWhite from "../assets/dashboard-nav-link-icon-white.svg";
// import profileNavLinkIconBlack from "../assets/profile-nav-link-icon-black.svg";
// import profileNavLinkIconWhite from "../assets/profile-nav-link-icon-white.svg";
// import activitiesNavLinkIconBlack from "../assets/dashboard-nav-link-icon-black.svg";
// import activitiesNavLinkIconWhite from "../assets/dashboard-nav-link-icon-white.svg";
// // import eeioNavLinkIconBlack from "../assets/eeio-nav-link-icon-black.svg";
// // import eeioNavLinkIconWhite from "../assets/eeio-nav-link-icon-white.svg";
// import { IoSettingsOutline } from "react-icons/io5";
// // import messagesIcon from "../assets/messages-icon.svg";
// import notificationIcon from "../assets/notification-icon.svg";
// import Button from "./ui/Button";

// const Menu = () => {
//   // const [isNavVisible, setIsNavVisible] = useState(false);
//   const [isDashboardBtnHovered, setIsDashboardBtnHovered] = useState(false);
//   const [isProfileBtnHovered, setIsProfileBtnHovered] = useState(false);
//   const [isActivitesBtnHovered, setIsActivitesBtnHovered] = useState(false);
//   const location = useLocation();

//   // const toggleNavVisibility = () => {
//   //   setIsNavVisible(!isNavVisible);
//   // };

//   const paths = {
//     isDashboardPath: location.pathname === "/dashboard",
//     isProfilePath:
//       location.pathname === "/profile" ||
//       !!location.pathname.match(/^\/profile(\/\d+\/edit)?$/),
//     isActivitiesPath:
//       location.pathname === "/activities" ||
//       !!location.pathname.match(/^\/activities(\/\d+\/edit)?$/),
//     // isSettingsPath: location.pathname.startsWith("/settings"),
//     // isEeioPath:
//     //   location.pathname === "/eeio" ||
//     //   !!location.pathname.match(/^\/eeio(\/\d+\/\d+\/edit)?$/),
//   };

//   return (
//     <div className="mt-4">
//       {/* <div className="text-tc-sidebar-heading px-4">Menu</div> */}
//       <nav className="flex flex-col gap-2">
//         <Link
//           to="/dashboard"
//           onMouseEnter={() => {
//             setIsDashboardBtnHovered(true);
//           }}
//           onMouseLeave={() => {
//             setIsDashboardBtnHovered(false);
//           }}
//         >
//           <Button
//             className={
//               paths.isDashboardPath ? "bg-tc-indigo-light text-tc-blue" : ""
//             }
//           >
//             {paths.isDashboardPath || isDashboardBtnHovered ? (
//               <svg
//                 width="16"
//                 height="16"
//                 viewBox="0 0 16 16"
//                 fill="none"
//                 xmlns="http://www.w3.org/2000/svg"
//               >
//                 <path
//                   d="M14.2222 1.77778V3.55556H10.6667V1.77778H14.2222ZM5.33333 1.77778V7.11111H1.77778V1.77778H5.33333ZM14.2222 8.88889V14.2222H10.6667V8.88889H14.2222ZM5.33333 12.4444V14.2222H1.77778V12.4444H5.33333ZM16 0H8.88889V5.33333H16V0ZM7.11111 0H0V8.88889H7.11111V0ZM16 7.11111H8.88889V16H16V7.11111ZM7.11111 10.6667H0V16H7.11111V10.6667Z"
//                   fill="#197EC6"
//                 />
//                 <rect
//                   x="1.33334"
//                   y="1.33337"
//                   width="4"
//                   height="6"
//                   fill="#197EC6"
//                 />
//                 <rect
//                   x="10.6667"
//                   y="8.66663"
//                   width="4"
//                   height="6"
//                   fill="#197EC6"
//                 />
//                 <rect
//                   x="10.6667"
//                   y="1.33337"
//                   width="4"
//                   height="2.66667"
//                   fill="#197EC6"
//                 />
//                 <rect
//                   x="1.33334"
//                   y="12"
//                   width="4"
//                   height="2.66667"
//                   fill="#197EC6"
//                 />
//               </svg>
//             ) : (
//               <svg
//                 width="16"
//                 height="16"
//                 viewBox="0 0 16 16"
//                 fill="none"
//                 xmlns="http://www.w3.org/2000/svg"
//               >
//                 <path
//                   d="M14.2222 1.77778V3.55556H10.6667V1.77778H14.2222ZM5.33333 1.77778V7.11111H1.77778V1.77778H5.33333ZM14.2222 8.88889V14.2222H10.6667V8.88889H14.2222ZM5.33333 12.4444V14.2222H1.77778V12.4444H5.33333ZM16 0H8.88889V5.33333H16V0ZM7.11111 0H0V8.88889H7.11111V0ZM16 7.11111H8.88889V16H16V7.11111ZM7.11111 10.6667H0V16H7.11111V10.6667Z"
//                   fill="#C7C7D2"
//                 />
//               </svg>
//             )}
//             <div>Dashboard</div>
//           </Button>
//         </Link>
//         <Link
//           to="/profile"
//           className={`text-tc-black font-medium flex items-center gap-x-3 py-3 px-4 rounded-md hover:bg-tc-indigo-light hover:text-tc-blue${
//             paths.isProfilePath ? " bg-tc-indigo-light text-tc-blue" : ""
//           }`}
//           onMouseEnter={() => {
//             setIsProfileBtnHovered(true);
//           }}
//           onMouseLeave={() => {
//             setIsProfileBtnHovered(false);
//           }}
//         >
//           {paths.isProfilePath || isProfileBtnHovered ? (
//             <svg
//               width="16"
//               height="16"
//               viewBox="0 0 16 16"
//               fill="none"
//               xmlns="http://www.w3.org/2000/svg"
//             >
//               <path
//                 d="M14.2222 1.77778V3.55556H10.6667V1.77778H14.2222ZM5.33333 1.77778V7.11111H1.77778V1.77778H5.33333ZM14.2222 8.88889V14.2222H10.6667V8.88889H14.2222ZM5.33333 12.4444V14.2222H1.77778V12.4444H5.33333ZM16 0H8.88889V5.33333H16V0ZM7.11111 0H0V8.88889H7.11111V0ZM16 7.11111H8.88889V16H16V7.11111ZM7.11111 10.6667H0V16H7.11111V10.6667Z"
//                 fill="#197EC6"
//               />
//               <rect
//                 x="1.33334"
//                 y="1.33337"
//                 width="4"
//                 height="6"
//                 fill="#197EC6"
//               />
//               <rect
//                 x="10.6667"
//                 y="8.66663"
//                 width="4"
//                 height="6"
//                 fill="#197EC6"
//               />
//               <rect
//                 x="10.6667"
//                 y="1.33337"
//                 width="4"
//                 height="2.66667"
//                 fill="#197EC6"
//               />
//               <rect
//                 x="1.33334"
//                 y="12"
//                 width="4"
//                 height="2.66667"
//                 fill="#197EC6"
//               />
//             </svg>
//           ) : (
//             <svg
//               width="16"
//               height="16"
//               viewBox="0 0 16 16"
//               fill="none"
//               xmlns="http://www.w3.org/2000/svg"
//             >
//               <path
//                 d="M14.2222 1.77778V3.55556H10.6667V1.77778H14.2222ZM5.33333 1.77778V7.11111H1.77778V1.77778H5.33333ZM14.2222 8.88889V14.2222H10.6667V8.88889H14.2222ZM5.33333 12.4444V14.2222H1.77778V12.4444H5.33333ZM16 0H8.88889V5.33333H16V0ZM7.11111 0H0V8.88889H7.11111V0ZM16 7.11111H8.88889V16H16V7.11111ZM7.11111 10.6667H0V16H7.11111V10.6667Z"
//                 fill="#C7C7D2"
//               />
//             </svg>
//           )}
//           <div>Profile</div>
//         </Link>
//         <Link
//           to="/activities"
//           className={`text-tc-black font-medium flex items-center gap-x-3 py-3 px-4 rounded-md hover:bg-tc-indigo-light hover:text-tc-blue${
//             paths.isActivitiesPath ? " bg-tc-indigo-light text-tc-blue" : ""
//           }`}
//           onMouseEnter={() => {
//             setIsActivitesBtnHovered(true);
//           }}
//           onMouseLeave={() => {
//             setIsActivitesBtnHovered(false);
//           }}
//         >
//           {paths.isActivitiesPath || isActivitesBtnHovered ? (
//             <svg
//               width="17"
//               height="17"
//               viewBox="0 0 17 17"
//               fill="none"
//               xmlns="http://www.w3.org/2000/svg"
//             >
//               <path
//                 d="M5.25 15H9.75C13.5 15 15 13.5 15 9.75V5.25C15 1.5 13.5 0 9.75 0H5.25C1.5 0 0 1.5 0 5.25V9.75C0 13.5 1.5 15 5.25 15Z"
//                 fill="#197EC6"
//               />
//               <path
//                 d="M3.99756 9.36757L5.78256 7.05007C6.03756 6.72007 6.51006 6.66007 6.84006 6.91507L8.21256 7.99507C8.54256 8.25007 9.01506 8.19007 9.27006 7.86757L11.0026 5.63257"
//                 stroke="white"
//                 strokeWidth="1.5"
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//               />
//             </svg>
//           ) : (
//             <svg
//               width="17"
//               height="17"
//               viewBox="0 0 17 17"
//               fill="none"
//               xmlns="http://www.w3.org/2000/svg"
//             >
//               <path
//                 d="M6.25 16H10.75C14.5 16 16 14.5 16 10.75V6.25C16 2.5 14.5 1 10.75 1H6.25C2.5 1 1 2.5 1 6.25V10.75C1 14.5 2.5 16 6.25 16Z"
//                 stroke="#C7C7D2"
//                 strokeWidth="1.5"
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//               />
//               <path
//                 d="M4.99756 10.3676L6.78256 8.05007C7.03756 7.72007 7.51006 7.66007 7.84006 7.91507L9.21256 8.99507C9.54256 9.25007 10.0151 9.19007 10.2701 8.86757L12.0026 6.63257"
//                 stroke="#C7C7D2"
//                 strokeWidth="1.5"
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//               />
//             </svg>
//           )}
//           <div>Activites</div>
//         </Link>
//         {/* <Link
//           to="/eeio"
//           className={`text-black flex items-center gap-x-1 p-2 rounded-lg border border-white hover:border-tc-green ${
//             paths.isEeioPath ? "bg-tc-green text-white" : ""
//           }`}
//           style={{ textDecoration: "none" }}
//         >
//           <img
//             src={paths.isEeioPath ? eeioNavLinkIconWhite : eeioNavLinkIconBlack}
//           />
//           <div>Eeio</div>
//         </Link> */}

//         {/* Profile and Notification Icons*/}
//         {/* <div className="hidden md:flex items-center gap-x-2"> */}
//         {/* <img src={messagesIcon} className="rounded-full" /> */}
//         {/* <img src={notificationIcon} className="rounded-full" /> */}
//         {/* <Link
//           to="/settings/account"
//           className={
//             "no-underline text-black hover:text-white bg-[#F7F8FA] rounded-full w-10 h-10 flex justify-center items-center text-[21px] hover:bg-tc-green" +
//             (paths.isSettingsPath ? " text-white bg-tc-green" : "")
//           }
//         >
//           <IoSettingsOutline />
//         </Link> */}
//         {/* </div> */}

//         {/* Toggle Button */}
//         {/* <IoMenu className="md:hidden text-[24px]" onClick={toggleNavVisibility} /> */}

//         {/* Mobile menu */}
//         {/* <div
//         className={`fixed right-0 top-0 h-[100vh] md:hidden w-72 bg-white shadow-lg shadow-tc-blue ${isNavVisible ? "block" : "hidden"}`}
//       > */}
//         {/* Close menu */}
//         {/* <IoClose
//           className="relative top-2 left-4 text-[26px] rounded-lg border border-white hover:border-tc-green"
//           onClick={toggleNavVisibility}
//         /> */}
//         {/* Navigation Links */}
//         {/* <div className="mt-4 flex flex-col gap-y-3 px-3"> */}
//         {/* <Link
//             to="/dashboard"
//             className={`text-black flex items-center gap-x-1 p-2 rounded-lg border border-white hover:border-tc-green ${
//               paths.isDashboardPath ? "bg-tc-green text-white" : ""
//             }`}
//             style={{ textDecoration: "none" }}
//           >
//             <img
//               src={
//                 paths.isDashboardPath
//                   ? dashboardNavLinkIconWhite
//                   : dashboardNavLinkIconBlack
//               }
//             />
//             <div>Dashboard</div>
//           </Link>
//           <Link
//             to="/profile"
//             className={`text-black flex items-center gap-x-1 p-2 rounded-lg border border-white hover:border-tc-green ${
//               paths.isProfilePath ? "bg-tc-green text-white" : ""
//             }`}
//             style={{ textDecoration: "none" }}
//           >
//             <img
//               src={
//                 paths.isProfilePath
//                   ? profileNavLinkIconWhite
//                   : profileNavLinkIconBlack
//               }
//             />
//             <div>Profile</div>
//           </Link>
//           <Link
//             to="/activities"
//             className={`text-black flex items-center gap-x-1 p-2 rounded-lg border border-white hover:border-tc-green ${
//               paths.isActivitiesPath ? "bg-tc-green text-white" : ""
//             }`}
//             style={{ textDecoration: "none" }}
//           >
//             <img
//               src={
//                 paths.isActivitiesPath
//                   ? activitiesNavLinkIconWhite
//                   : activitiesNavLinkIconBlack
//               }
//             />
//             <div>Activites</div>
//           </Link> */}
//         {/* <Link
//             to="/eeio"
//             className={`text-black flex items-center gap-x-1 p-2 rounded-lg border border-white hover:border-tc-green ${
//               paths.isEeioPath ? "bg-tc-green text-white" : ""
//             }`}
//             style={{ textDecoration: "none" }}
//           >
//             <img
//               src={
//                 paths.isEeioPath ? eeioNavLinkIconWhite : eeioNavLinkIconBlack
//               }
//             />
//             <div>Eeio</div>
//           </Link> */}
//         {/* </div> */}

//         {/* Profile and Notification Icons*/}
//         {/* <div className="mt-3 flex justify-center items-center gap-x-2"> */}
//         {/* <img src={messagesIcon} className="rounded-full" /> */}
//         {/* <img src={notificationIcon} className="rounded-full" /> */}
//         {/* <Link
//             to="/settings/account"
//             className={
//               "no-underline text-black hover:text-white bg-[#F7F8FA] rounded-full w-10 h-10 flex justify-center items-center text-[21px] hover:bg-tc-green" +
//               (paths.isSettingsPath ? " text-white bg-tc-green" : "")
//             }
//           >
//             <IoSettingsOutline />
//           </Link> */}
//         {/* </div>
//       </div> */}
//       </nav>
//     </div>
//   );
// };

// export default Menu;
