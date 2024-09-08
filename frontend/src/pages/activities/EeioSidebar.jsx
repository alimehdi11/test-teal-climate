import SidebarItem from "../../components/SidebarItem";

const EeioSidebar = ({ productOrIndustry, setProductOrIndustry }) => {
  return (
    <div className="flex flex-col gap-y-2 mt-2 ml-8 border-l">
      <SidebarItem
        className={
          productOrIndustry === "Industry"
            ? "bg-tc-indigo-light text-tc-blue"
            : ""
        }
        onClick={() =>
          setProductOrIndustry((previousValue) =>
            previousValue === "Industry" ? "" : "Industry"
          )
        }
      >
        Industry
      </SidebarItem>
      <SidebarItem
        className={
          productOrIndustry === "Product"
            ? "bg-tc-indigo-light text-tc-blue"
            : ""
        }
        onClick={() =>
          setProductOrIndustry((previousValue) =>
            previousValue === "Product" ? "" : "Product"
          )
        }
      >
        Product
      </SidebarItem>
    </div>
  );
};

export default EeioSidebar;
