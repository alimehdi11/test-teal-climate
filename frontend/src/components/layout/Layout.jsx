import Sidebar from "./Sidebar";
import Main from "./Main";

const Layout = ({ sidebarContent, mainContent, className }) => {
  return (
    <div
      className={(
        "layout flex flex-nowrap w-full relative pt-4 px-4 gap-x-4 " + className
      ).trim()}
    >
      <Sidebar>{sidebarContent}</Sidebar>
      <Main>{mainContent}</Main>
    </div>
  );
};

export default Layout;
