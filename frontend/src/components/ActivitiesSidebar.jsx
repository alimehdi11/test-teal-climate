import { useState, useEffect } from "react";
import { request } from "../utils/request.js";
import Button from "./ui/Button.jsx";
import Input from "./ui/Input.jsx";

const ActivitiesSidebar = ({
  selectedScope,
  selectedLevel,
  setSelectedScope,
  setSelectedLevel,
}) => {
  const [scopesData, setScopesData] = useState([]);
  const [level1Data, setLevel1Data] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredScopes, setFilteredScopes] = useState([]);

  const fetchScopes = async () => {
    try {
      const response = await request(
        `${import.meta.env.VITE_API_BASE_URL}/activitydata`,
        "GET"
      );

      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      const jsonData = await response.json();
      const uniqueScopes = [
        ...new Set(jsonData.datas.map((item) => item.scope)),
      ];

      const sortedFirstThreeScopes = uniqueScopes.slice(0, 3).sort();
      const remainingScopes = uniqueScopes.slice(3);
      const sortedScopes = [...sortedFirstThreeScopes, ...remainingScopes];

      return sortedScopes;
    } catch (error) {
      console.log("ERROR FETCHING ACTIVITY DATA");
      console.error("Error fetching data:", error);
    }
  };

  const fetchLevel1Data = async (scope) => {
    try {
      const response = await request(
        `${import.meta.env.VITE_API_BASE_URL}/activitydata?scope=${scope}`,
        "GET"
      );
      if (!response.ok) {
        throw new Error(`Failed to fetch level1 data for ${scope}`);
      }
      const jsonData = await response.json();

      // Extract level1 data for the selected scope
      const level1Items = jsonData.datas
        .filter((item) => item.scope === scope)
        .map((item) => item.level1);

      const uniqueLevel1Items = [...new Set(level1Items)];

      return uniqueLevel1Items;
    } catch (error) {
      console.error("Error fetching level1 data:", error);
    }
  };

  useEffect(() => {
    fetchScopes().then((uniqueScopes) => {
      setScopesData(uniqueScopes);
    });
  }, []);

  useEffect(() => {
    if (level1Data) {
      if (searchQuery === "") {
        setFilteredScopes(level1Data);
      } else {
        setFilteredScopes(
          level1Data.filter((level) =>
            level.toLowerCase().includes(searchQuery.toLowerCase())
          )
        );
      }
    }
  }, [level1Data, searchQuery]);

  useEffect(() => {
    // selectedScope can be null when user unselect the selectedScope
    if (selectedScope !== null) {
      fetchLevel1Data(selectedScope).then((uniqueLevel1Items) => {
        setLevel1Data(uniqueLevel1Items);
      });
    } else {
      setLevel1Data([]);
    }
  }, [selectedScope]);

  return (
    <>
      <h2 className="m-0 mb-4 text-center font-extrabold text-2xl">
        Select Scope
      </h2>
      <div className="flex flex-col gap-y-4">
        {scopesData?.map((scope) => (
          <Button
            key={scope}
            className={
              "py-3" +
              (scope === selectedScope
                ? " bg-tc-green text-white hover:bg-opacity-90"
                : "")
            }
            onClick={(e) => {
              if (e.target.innerText === selectedScope) {
                // parent
                setSelectedScope(null);
              } else {
                // parent
                setSelectedScope(scope);
              }
            }}
          >
            {scope}
          </Button>
        ))}
      </div>

      <hr className="w-full h-[1px] bg-slate-500 my-2" />

      <Button className="py-3 w-full">Spend Base Scope 3</Button>

      <div className="mt-4">
        <h2 className="m-0 mb-4 text-center  font-extrabold text-2xl">
          Select Activity
        </h2>
        <div className="relative">
          <Input
            type="text"
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {/* List */}
      <ul className="list-none m-0 my-4 md:mb-0 p-0 flex flex-col gap-y-4">
        {filteredScopes.map((level, index) => (
          <li
            key={index}
            className={
              "bg-gray-200 hover:bg-tc-blue hover:text-white rounded-lg p-2" +
              (level === selectedLevel
                ? " bg-tc-blue text-white hover:bg-opacity-90"
                : "")
            }
            onClick={(e) => {
              if (e.target.innerText === selectedLevel) {
                // parent
                setSelectedLevel(null);
              } else {
                // parent
                setSelectedLevel(level);
              }
            }}
          >
            {level}
          </li>
        ))}
      </ul>
    </>
  );
};

export default ActivitiesSidebar;
