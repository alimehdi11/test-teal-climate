import { useContext } from "react";
import SidebarItem from "../../components/SidebarItem";
import { DataContext } from "../../contexts/DataContext";

const EeioSidebar = ({ productOrIndustry, setProductOrIndustry }) => {
  const { toggleSidebar } = useContext(DataContext);
  return (
    <div className="flex flex-col gap-y-2 mt-2">
      <SidebarItem
        className={
          productOrIndustry === "Industry"
            ? "bg-tc-indigo-light text-tc-blue"
            : ""
        }
        onClick={() => {
          toggleSidebar();
          setProductOrIndustry("Industry");
        } }
      >
        Industry
      </SidebarItem>
      <SidebarItem
        className={
          productOrIndustry === "Product"
            ? "bg-tc-indigo-light text-tc-blue"
            : ""
        }
        onClick={() => {
          toggleSidebar();
          setProductOrIndustry("Product")
        
        }}
      >
        Product
      </SidebarItem>
    </div>
  );
};

export default EeioSidebar;
