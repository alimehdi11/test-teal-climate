import { useState, useEffect, useContext } from "react";
import Input from "../../components/ui/Input";
import { DataContext } from "../../contexts/DataContext";
import EeioSidebar from "./EeioSidebar";
import SidebarItem from "../../components/SidebarItem";
import { useDebounce } from "../../hooks/useDebounce";

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
  setIsScopeSelected,
}) => {
  const { toggleSidebar } = useContext(DataContext);
  const [level1, setLevel1] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const debouncedSearchQuery = useDebounce(searchQuery, 200);
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
    if (debouncedSearchQuery === "") {
      setLevel1(filterLevel1(selectedScope));
    } else {
      const filteredLevel1 = level1.filter((level) =>
        level.toLowerCase().includes(debouncedSearchQuery.toLowerCase())
      );
      setLevel1(
        filteredLevel1.length === 0
          ? filterLevel1(selectedScope)
          : filteredLevel1
      );
    }
  }, [debouncedSearchQuery]);
  return (
    <>
      <div className="flex flex-col gap-y-2 mt-2">
        {["Scope 1", "Scope 2", "Scope 3"].map((scope) => (
          <SidebarItem
            key={scope}
            className={
              scope === selectedScope ? "bg-tc-indigo-light text-tc-blue" : ""
            }
            onClick={(e) => {
              setIsReitSelected(false);
              setIsSpendBaseScope3Selected(false);
              setSelectedScope(e.target.innerText);
              setIsScopeSelected(true);
            }}
          >
            {scope}
          </SidebarItem>
        ))}
        <hr className="border-t-[2px]" />
        <SidebarItem
          className={
            isSpendBaseScope3Selected ? "bg-tc-indigo-light text-tc-blue" : ""
          }
          onClick={() => {
            setIsReitSelected(false);
            setSelectedScope("");
            setSelectedLevel("");
            setIsSpendBaseScope3Selected(true);
            setIsScopeSelected(false);
          }}
        >
          Spend Base Scope 3
        </SidebarItem>
        <SidebarItem
          className={isReitSelected ? "bg-tc-indigo-light text-tc-blue" : ""}
          onClick={() => {
            toggleSidebar();
            setSelectedScope("");
            setSelectedLevel("");
            setIsSpendBaseScope3Selected(false);
            setIsReitSelected(true);
            setIsScopeSelected(false);
          }}
        >
          Real State Scope 3
        </SidebarItem>
        <hr className="border-t-[2px]" />
      </div>
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
                  toggleSidebar();
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
