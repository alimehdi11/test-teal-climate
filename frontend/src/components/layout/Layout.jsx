import Sidebar from "./Sidebar";
import Main from "./Main";
import Navbar from "../Navbar";
import { Slide, ToastContainer } from "react-toastify";

const Layout = ({ sidebarContent, mainContent, className = "" }) => {
  return (
    <>
      {console.log("Layout")}
      <Navbar />
      <div
        className={(
          "flex flex-nowrap w-full relative pt-4 px-4 gap-x-4 " + className
        ).trim()}
        style={{
          minHeight: "calc(100vh - 64px)",
        }}
      >
        <Sidebar>{sidebarContent}</Sidebar>
        <Main>{mainContent}</Main>
      </div>
      <ToastContainer
        theme={"colored"}
        hideProgressBar={true}
        transition={Slide}
        autoClose={1500}
        pauseOnFocusLoss={false}
        style={{
          "--toastify-font-family": "Poppins",
          "--toastify-color-success": "#00CC9CFF",
          "--toastify-color-warning": "#e74c3c",
        }}
      />
    </>
  );
};

export default Layout;
