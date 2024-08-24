import Sidebar from "./Sidebar";
import Main from "./Main";

const Layout = ({ sidebarContent, mainContent }) => {
  return (
    <>
      <div>
        <Sidebar>{sidebarContent}</Sidebar>
        <Main>{mainContent}</Main>
      </div>
    </>
  );
};

export default Layout;
