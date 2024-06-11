import Sidebar from "./Sidebar";
import Main from "./Main";

const Layout = ({ sidebarContent, mainContent }) => {
  return (
    <div className="flex flex-nowrap w-full relative">
      <Sidebar>{sidebarContent}</Sidebar>
      <Main>{mainContent}</Main>
    </div>
  );
};

export default Layout;
