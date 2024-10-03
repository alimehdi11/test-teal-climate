import { useState, useEffect, useContext } from "react";
import Input from "../../components/ui/Input";
import { DataContext } from "../../contexts/DataContext";
import EeioSidebar from "./EeioSidebar";
import DropdownMenu from "../../components/DropdownMenu";
import SidebarItem from "../../components/SidebarItem";

const ActivitiesSidebar = ({
  selectedScope,
  selectedLevel,
  setSelectedScope,
  setSelectedLevel,
  isSpendBaseScope3Selected,
  setIsSpendBaseScope3Selected,
  productOrIndustry,
  setProductOrIndustry,
  setIsReitSelected,
  isReitSelected,
}) => {
  const [level1, setLevel1] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  const { activities } = useContext(DataContext).data;

  const filterLevel1 = (selectedScope) => {
    let level1 = activities
      ?.filter((item) => item.scope === selectedScope)
      .map((item) => item.level1);
    level1 = [...new Set(level1)];
    return level1;
  };

  useEffect(() => {
    if (selectedScope) {
      setLevel1(filterLevel1(selectedScope));
    }
  }, [selectedScope]);

  useEffect(() => {
    if (selectedScope && level1.length > 0) {
      // Always select first level1 initially or when selectedScope changes
      setSelectedLevel(level1[0]);
    }
  }, [level1]);

  useEffect(() => {
    if (searchQuery === "") {
      setLevel1(filterLevel1(selectedScope));
    } else {
      const filteredLevel1 = level1.filter((level) =>
        level.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setLevel1(
        filteredLevel1.length === 0
          ? filterLevel1(selectedScope)
          : filteredLevel1
      );
    }
  }, [searchQuery]);

  useEffect(() => {
    console.log("selectedScope inside sidebar", selectedScope);
  }, [selectedScope]);

  return (
    <>
      <DropdownMenu
        children={
          <>
            {["Scope 1", "Scope 2", "Scope 3"].map((scope) => (
              <SidebarItem
                key={scope}
                className={
                  scope === selectedScope
                    ? "bg-tc-indigo-light text-tc-blue"
                    : ""
                }
                onClick={(e) => {
                  setIsReitSelected(false);
                  setIsSpendBaseScope3Selected(false);
                  setSelectedScope(e.target.innerText);
                }}
              >
                {scope}
              </SidebarItem>
            ))}
            <hr className="border-t-[2px]" />
            <SidebarItem
              className={
                isSpendBaseScope3Selected
                  ? "bg-tc-indigo-light text-tc-blue"
                  : ""
              }
              onClick={() => {
                setIsReitSelected(false);
                setSelectedScope("");
                setSelectedLevel("");
                setIsSpendBaseScope3Selected(true);
              }}
            >
              Spend Base Scope 3
            </SidebarItem>
            <SidebarItem
              className={
                isReitSelected ? "bg-tc-indigo-light text-tc-blue" : ""
              }
              onClick={() => {
                setSelectedScope("");
                setSelectedLevel("");
                setIsSpendBaseScope3Selected(false);
                setIsReitSelected(true);
              }}
            >
              Real State Scope 3
            </SidebarItem>
            <hr className="border-t-[2px]" />
          </>
        }
      />
      {selectedScope && level1.length > 0 && (
        <div className="my-2">
          {/* Search query input */}
          <div className="mt-2">
            <Input
              type="text"
              className="placeholder:text-gray-400 pl-4 border-2 bg-white"
              placeholder="Search Level 1"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          {/* List */}
          <div className="flex flex-col gap-y-2 mt-2">
            {level1.map((level, index) => (
              <SidebarItem
                key={index}
                className={
                  "" +
                  (level === selectedLevel
                    ? " bg-tc-indigo-light text-tc-blue"
                    : "")
                }
                onClick={(e) => {
                  setSelectedLevel(e.target.innerText);
                }}
              >
                {level}
              </SidebarItem>
            ))}
          </div>
        </div>
      )}
      {isSpendBaseScope3Selected && (
        <EeioSidebar
          productOrIndustry={productOrIndustry}
          setProductOrIndustry={setProductOrIndustry}
        />
      )}
    </>
  );
};

export default ActivitiesSidebar;
