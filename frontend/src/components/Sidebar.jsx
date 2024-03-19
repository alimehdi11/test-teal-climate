import React, { useState, useEffect } from "react";

const Sidebar = ({
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
      const response = await fetch("http://localhost:5000/activitydata");

      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      const jsonData = await response.json();
      const uniqueScopes = [
        ...new Set(jsonData.datas.map((item) => item.scope)),
      ];
      return uniqueScopes;
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const fetchLevel1Data = async (scope) => {
    try {
      const response = await fetch(
        `http://localhost:5000/activitydata?scope=${scope}`
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
      console.log("level1Data available");
      if (searchQuery === "") {
        setFilteredScopes(level1Data);
      } else {
        setFilteredScopes(
          level1Data.filter((level) =>
            level.toLowerCase().includes(searchQuery.toLowerCase())
          )
        );
      }
    } else {
      console.log("level1Data NOT available");
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
    <div className="bg-white absolute w-[300px] max-h-[656px] top-[1px] left-[40px] rounded-[8px] font-poppins">
      <h1 className="text-2xl self-stretch rounded-lg ">Select Scope</h1>
      {scopesData.map((scope) => (
        <div
          key={scope}
          className="self-stretch rounded-lg bg-white  flex flex-row items-end justify-between py-4 gap-[20px] whitespace-nowrap z-[1] text-sm text-gray-200"
        >
          {/* Buttons */}
          <div className="flex gap-5 justify-center">
            <button
              className={`px-4 py-2 rounded-md ${
                scope === selectedScope
                  ? "bg-brand-color-01 rounded-lg text-white"
                  : "bg-gray-200 text-gray-700"
              }`}
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
            </button>
          </div>
        </div>
      ))}

      <div className="mt-[20px]">
        <h1 className="text-2xl self-stretch rounded-lg">Select Activity</h1>
        <div className="relative">
          <i className="absolute top-2 left-2 text-gray-400 fas fa-search"></i>
          <input
            type="text"
            placeholder="Search..."
            className="bg-gray-50 mt-[18px] pl-8 pr-4 py-2 w-[240px] h-[40px] rounded-[8px] border border-gray-300 focus:outline-none focus:border-blue-500"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {/* List */}
      <div className="flex flex-col gap-6 py-4">
        <ul
          className="w-[280px] rounded-lg p-8 space-y-6 overflow-y-auto"
          style={{ listStyleType: "none", padding: 0, overflowY: "hidden" }}
        >
          {filteredScopes.map((level, index) => (
            <li
              key={index}
              className={`p-[4px] h-[20px] hover:bg-blue-400 hover:text-white rounded-md transition-colors ${
                level === selectedLevel && "bg-blue-500 text-white "
              }`}
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
      </div>
    </div>
  );
};

export default Sidebar;
