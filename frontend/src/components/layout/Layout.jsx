import Sidebar from "./Sidebar";
import Main from "./Main";
import Navbar from "../Navbar";

const Layout = ({ sidebarContent, mainContent, className = "" }) => {
  return (
    <>
      {/* <Navbar /> */}
      <div
        className={("flex relative bg-green-400 " + className).trim()}
        style={{
          minHeight: "100vh",
        }}
      >
        <Sidebar>{sidebarContent}</Sidebar>
        <Main>{mainContent}</Main>
      </div>
    </>
  );
};

export default Layout;
