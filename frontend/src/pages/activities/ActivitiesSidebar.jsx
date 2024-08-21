import { useState, useEffect, useContext } from "react";
import Button from "../../components/ui/Button.jsx";
import Input from "../../components/ui/Input.jsx";
import { Link } from "react-router-dom";
import { DataContext } from "../../contexts/DataContext.jsx";

const ActivitiesSidebar = ({
  selectedScope,
  selectedLevel,
  setSelectedScope,
  setSelectedLevel,
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
      <h2 className="m-0 mb-4 text-center font-extrabold text-2xl">
        Select Scope
      </h2>
      <div className="flex flex-col gap-y-4">
        {["Scope 1", "Scope 2", "Scope 3"]?.map((scope) => (
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
                // Parent component re-render
                setSelectedScope(null);
              } else {
                // Parent component re-render
                setSelectedScope(e.target.innerText);
              }
            }}
          >
            {scope}
          </Button>
        ))}
      </div>

      <hr className="w-full h-[1px] bg-slate-500 my-2" />

      <Link to="/eeio" style={{ textDecoration: "none" }}>
        <Button className="py-3 w-full">Spend Base Scope 3</Button>
      </Link>

      {level1.length > 0 && (
        <>
          <div className="mt-4">
            <h2 className="m-0 mb-4 text-center font-extrabold text-2xl">
              Select Activity
            </h2>
            {/* Search query input */}
            <div>
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
            {level1.map((level, index) => (
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
                    // Parent component re-render
                    setSelectedLevel(null);
                  } else {
                    // Parent component re-render
                    setSelectedLevel(e.target.innerText);
                  }
                }}
              >
                {level}
              </li>
            ))}
          </ul>
        </>
      )}
    </>
  );
};

export default ActivitiesSidebar;
