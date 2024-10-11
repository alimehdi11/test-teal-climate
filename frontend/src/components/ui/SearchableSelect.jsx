import { useEffect, useRef, useState } from "react";
import { LiaAngleDownSolid } from "react-icons/lia";
import Input from "./Input";

const SearchableSelect = ({ data = [], item, setItem, text, placeholder }) => {
  const [showOptions, setShowOptions] = useState(false);
  const [filteredItems, setFilteredItems] = useState([]);
  const [filterBy, setFilterBy] = useState("");
  const selectRef = useRef(null);

  useEffect(() => {
    if (filterBy === "") {
      setFilteredItems(data);
    } else {
      setFilteredItems(
        data.filter((item) => {
          return item.toLowerCase().includes(filterBy.toLowerCase());
        })
      );
    }
  }, [filterBy]);

  useEffect(() => {
    setFilterBy("");
    setShowOptions(false);
    setFilteredItems(
      data?.filter((item) => {
        return item.toLowerCase().includes(filterBy.toLowerCase());
      })
    );
    // Automatically select the only available item if there's just one
    if (data.length === 1) {
      setItem(data[0]);
    }
  }, [data]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (selectRef.current && !selectRef.current.contains(event.target)) {
        setShowOptions(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div ref={selectRef}>
      <button
        type="button"
        className="relative w-full z-0 h-11 p-3 bg-tc-input-background hover:text-black rounded-md flex justify-between items-center"
        onClick={(e) => {
          setShowOptions((prev) => !prev);
        }}
      >
        {item || text}
        <LiaAngleDownSolid
          className="text-[0.6rem] -me-[10px]"
          strokeWidth={2}
        />
      </button>
      {showOptions &&
        (data.length > 0 ? (
          <ul className="absolute bg-white w-full top-[105%] border border-slate-500 overflow-y-auto max-h-60 shadow shadow-black z-10">
            <li>
              <Input
                placeholder={placeholder}
                value={filterBy}
                onChange={(e) => setFilterBy(e.target.value)}
                className="block my-[4px] mx-auto w-[calc(100%-10px)] border border-black"
              />
            </li>
            {filteredItems.length > 0 ? (
              filteredItems.map((item) => (
                <li
                  key={item}
                  onClick={() => {
                    setItem(item);
                    setShowOptions(false);
                  }}
                  className="hover:bg-gray-500 hover:text-white px-3 p-1 cursor-pointer"
                >
                  {item}
                </li>
              ))
            ) : (
              <li className="px-3 p-1">No match found</li>
            )}
          </ul>
        ) : (
          <div className="absolute bg-gray-500 text-white w-full top-[105%] px-3 p-1 z-10">
            {text}
          </div>
        ))}
    </div>
  );
};

export default SearchableSelect;
