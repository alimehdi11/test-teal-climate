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
}) => {
  const [level1, setLevel1] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  const { activities } = useContext(DataContext);

  const filterLevel1 = (selectedScope) => {
    let level1 = activities
      .filter((item) => item.scope === selectedScope)
      .map((item) => item.level1);

    level1 = [...new Set(level1)];
    return level1;
  };

  useEffect(() => {
    if (selectedScope) {
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
    } else {
      setLevel1([]);
    }
  }, [selectedScope, searchQuery]);

  return (
    <>
      <DropdownMenu
        children={
          <>
            {["Scope 1", "Scope 2", "Scope 3"]?.map((scope) => (
              <SidebarItem
                key={scope}
                className={
                  scope === selectedScope
                    ? "bg-tc-indigo-light text-tc-blue"
                    : ""
                }
                onClick={(e) => {
                  if (e.target.innerText === selectedScope) {
                    setSelectedScope(null);
                  } else {
                    setIsSpendBaseScope3Selected(false);
                    setSelectedScope(e.target.innerText);
                  }
                }}
              >
                <>
                  {scope === selectedScope ? (
                    <svg
                      width="22"
                      height="22"
                      viewBox="0 0 22 22"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <circle cx="11" cy="11" r="8" fill="#197EC6" />
                      <path
                        d="M0.604114 11.6514H2.44361C2.76082 15.8486 6.13205 19.2229 10.3278 19.5395V21.3486C10.3278 21.7105 10.6088 22 10.9713 22C11.3428 22 11.6238 21.7105 11.6238 21.3486V19.5395C15.8195 19.2229 19.1908 15.8486 19.508 11.651H21.3475C21.4332 11.6514 21.5183 11.6348 21.5976 11.6023C21.6769 11.5697 21.749 11.5218 21.8097 11.4613C21.8703 11.4007 21.9184 11.3288 21.9511 11.2496C21.9837 11.1705 22.0004 11.0856 22 11C22 10.6382 21.7099 10.3577 21.3475 10.3577H19.508C19.1908 6.16039 15.8195 2.78614 11.6238 2.4695V0.651357C11.6238 0.289536 11.3424 0 10.9713 0C10.6088 0 10.3278 0.289536 10.3278 0.651357V2.4695C6.13205 2.78614 2.76082 6.16039 2.44361 10.3581H0.604114C0.241646 10.3577 0 10.6378 0 11C0 11.3622 0.241646 11.6514 0.604114 11.6514ZM10.9713 7.42696C11.3428 7.42696 11.6238 7.13743 11.6238 6.77561V3.94429C15.0312 4.2515 17.6771 6.92018 17.9766 10.3577H15.2123C14.8502 10.3577 14.5597 10.6382 14.5597 11C14.5597 11.3618 14.8498 11.6514 15.2123 11.6514H17.9766C17.6775 15.0798 15.0312 17.7485 11.6238 18.0561V15.2244C11.6238 14.863 11.3428 14.5821 10.9713 14.5821C10.6088 14.5821 10.3278 14.8626 10.3278 15.2244V18.0561C6.92036 17.7485 4.27445 15.0798 3.97535 11.6514H6.73932C7.10139 11.6514 7.39184 11.3618 7.39184 11C7.39184 10.6382 7.10179 10.3577 6.73932 10.3577H3.97495C4.27406 6.92018 6.91996 4.2515 10.3274 3.94429V6.77561C10.3274 7.13704 10.6088 7.42696 10.9713 7.42696Z"
                        fill="white"
                      />
                    </svg>
                  ) : (
                    <svg
                      width="22"
                      height="22"
                      viewBox="0 0 22 22"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M0.604114 11.6514H2.44361C2.76082 15.8486 6.13205 19.2229 10.3278 19.5395V21.3486C10.3278 21.7105 10.6088 22 10.9713 22C11.3428 22 11.6238 21.7105 11.6238 21.3486V19.5395C15.8195 19.2229 19.1908 15.8486 19.508 11.651H21.3475C21.4332 11.6514 21.5183 11.6348 21.5976 11.6023C21.6769 11.5697 21.749 11.5218 21.8097 11.4613C21.8703 11.4007 21.9184 11.3288 21.9511 11.2496C21.9837 11.1705 22.0004 11.0856 22 11C22 10.6382 21.7099 10.3577 21.3475 10.3577H19.508C19.1908 6.16039 15.8195 2.78614 11.6238 2.4695V0.651357C11.6238 0.289536 11.3424 0 10.9713 0C10.6088 0 10.3278 0.289536 10.3278 0.651357V2.4695C6.13205 2.78614 2.76082 6.16039 2.44361 10.3581H0.604114C0.241646 10.3577 0 10.6378 0 11C0 11.3622 0.241646 11.6514 0.604114 11.6514ZM10.9713 7.42696C11.3428 7.42696 11.6238 7.13743 11.6238 6.77561V3.94429C15.0312 4.2515 17.6771 6.92018 17.9766 10.3577H15.2123C14.8502 10.3577 14.5597 10.6382 14.5597 11C14.5597 11.3618 14.8498 11.6514 15.2123 11.6514H17.9766C17.6775 15.0798 15.0312 17.7485 11.6238 18.0561V15.2244C11.6238 14.863 11.3428 14.5821 10.9713 14.5821C10.6088 14.5821 10.3278 14.8626 10.3278 15.2244V18.0561C6.92036 17.7485 4.27445 15.0798 3.97535 11.6514H6.73932C7.10139 11.6514 7.39184 11.3618 7.39184 11C7.39184 10.6382 7.10179 10.3577 6.73932 10.3577H3.97495C4.27406 6.92018 6.91996 4.2515 10.3274 3.94429V6.77561C10.3274 7.13704 10.6088 7.42696 10.9713 7.42696Z"
                        fill="#C7C7D2"
                      />
                    </svg>
                  )}
                  {scope}
                </>
              </SidebarItem>
            ))}
            <SidebarItem
              className={
                isSpendBaseScope3Selected
                  ? "bg-tc-indigo-light text-tc-blue"
                  : ""
              }
              onClick={() => {
                setSelectedScope(null);
                setIsSpendBaseScope3Selected((prev) => !prev);
              }}
            >
              {isSpendBaseScope3Selected ? (
                <svg
                  width="22"
                  height="22"
                  viewBox="0 0 22 22"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="min-w-[22px] min-h-[22px]"
                >
                  <circle cx="11" cy="11" r="8" fill="#197EC6" />
                  <path
                    d="M0.604114 11.6514H2.44361C2.76082 15.8486 6.13205 19.2229 10.3278 19.5395V21.3486C10.3278 21.7105 10.6088 22 10.9713 22C11.3428 22 11.6238 21.7105 11.6238 21.3486V19.5395C15.8195 19.2229 19.1908 15.8486 19.508 11.651H21.3475C21.4332 11.6514 21.5183 11.6348 21.5976 11.6023C21.6769 11.5697 21.749 11.5218 21.8097 11.4613C21.8703 11.4007 21.9184 11.3288 21.9511 11.2496C21.9837 11.1705 22.0004 11.0856 22 11C22 10.6382 21.7099 10.3577 21.3475 10.3577H19.508C19.1908 6.16039 15.8195 2.78614 11.6238 2.4695V0.651357C11.6238 0.289536 11.3424 0 10.9713 0C10.6088 0 10.3278 0.289536 10.3278 0.651357V2.4695C6.13205 2.78614 2.76082 6.16039 2.44361 10.3581H0.604114C0.241646 10.3577 0 10.6378 0 11C0 11.3622 0.241646 11.6514 0.604114 11.6514ZM10.9713 7.42696C11.3428 7.42696 11.6238 7.13743 11.6238 6.77561V3.94429C15.0312 4.2515 17.6771 6.92018 17.9766 10.3577H15.2123C14.8502 10.3577 14.5597 10.6382 14.5597 11C14.5597 11.3618 14.8498 11.6514 15.2123 11.6514H17.9766C17.6775 15.0798 15.0312 17.7485 11.6238 18.0561V15.2244C11.6238 14.863 11.3428 14.5821 10.9713 14.5821C10.6088 14.5821 10.3278 14.8626 10.3278 15.2244V18.0561C6.92036 17.7485 4.27445 15.0798 3.97535 11.6514H6.73932C7.10139 11.6514 7.39184 11.3618 7.39184 11C7.39184 10.6382 7.10179 10.3577 6.73932 10.3577H3.97495C4.27406 6.92018 6.91996 4.2515 10.3274 3.94429V6.77561C10.3274 7.13704 10.6088 7.42696 10.9713 7.42696Z"
                    fill="white"
                  />
                </svg>
              ) : (
                <svg
                  width="22"
                  height="22"
                  viewBox="0 0 22 22"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="min-w-[22px] min-h-[22px]"
                >
                  <path
                    d="M0.604114 11.6514H2.44361C2.76082 15.8486 6.13205 19.2229 10.3278 19.5395V21.3486C10.3278 21.7105 10.6088 22 10.9713 22C11.3428 22 11.6238 21.7105 11.6238 21.3486V19.5395C15.8195 19.2229 19.1908 15.8486 19.508 11.651H21.3475C21.4332 11.6514 21.5183 11.6348 21.5976 11.6023C21.6769 11.5697 21.749 11.5218 21.8097 11.4613C21.8703 11.4007 21.9184 11.3288 21.9511 11.2496C21.9837 11.1705 22.0004 11.0856 22 11C22 10.6382 21.7099 10.3577 21.3475 10.3577H19.508C19.1908 6.16039 15.8195 2.78614 11.6238 2.4695V0.651357C11.6238 0.289536 11.3424 0 10.9713 0C10.6088 0 10.3278 0.289536 10.3278 0.651357V2.4695C6.13205 2.78614 2.76082 6.16039 2.44361 10.3581H0.604114C0.241646 10.3577 0 10.6378 0 11C0 11.3622 0.241646 11.6514 0.604114 11.6514ZM10.9713 7.42696C11.3428 7.42696 11.6238 7.13743 11.6238 6.77561V3.94429C15.0312 4.2515 17.6771 6.92018 17.9766 10.3577H15.2123C14.8502 10.3577 14.5597 10.6382 14.5597 11C14.5597 11.3618 14.8498 11.6514 15.2123 11.6514H17.9766C17.6775 15.0798 15.0312 17.7485 11.6238 18.0561V15.2244C11.6238 14.863 11.3428 14.5821 10.9713 14.5821C10.6088 14.5821 10.3278 14.8626 10.3278 15.2244V18.0561C6.92036 17.7485 4.27445 15.0798 3.97535 11.6514H6.73932C7.10139 11.6514 7.39184 11.3618 7.39184 11C7.39184 10.6382 7.10179 10.3577 6.73932 10.3577H3.97495C4.27406 6.92018 6.91996 4.2515 10.3274 3.94429V6.77561C10.3274 7.13704 10.6088 7.42696 10.9713 7.42696Z"
                    fill="#C7C7D2"
                  />
                </svg>
              )}
              Spend Base Scope 3
            </SidebarItem>
          </>
        }
        selectedScope={selectedScope}
      />
      {level1.length > 0 && (
        <div className="ml-8 border-l my-2">
          {/* Search query input */}
          <div className="mt-2">
            <Input
              type="text"
              className="placeholder:text-gray-400 min-w-52"
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
                  if (e.target.innerText === selectedLevel) {
                    setSelectedLevel(null);
                  } else {
                    setSelectedLevel(e.target.innerText);
                  }
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="#CACAD5"
                  width="24"
                  height="24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m16.49 12 3.75 3.75m0 0-3.75 3.75m3.75-3.75H3.74V4.499"
                  />
                </svg>
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
          selectedLevel={selectedLevel}
          setSelectedLevel={setSelectedLevel}
        />
      )}
    </>
  );
};

export default ActivitiesSidebar;
