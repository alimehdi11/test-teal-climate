import Sidebar from "./Sidebar";
import Main from "./Main";

const Layout = ({ sidebarContent, mainContent, className = "" }) => {
  return (
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
  );
};

export default Layout;
