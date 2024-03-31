import { useState, useEffect } from "react";

const Sidebar = ({ setSelectedForm }) => {
  const [selectedOption, setSelectedOption] = useState("");

  useEffect(() => {
    setSelectedForm(selectedOption);
  }, [selectedOption]);

  return (
    <div className="font-poppins bg-white absolute w-[300px] max-h-[656px] top-[1px] left-[40px] rounded-[8px] overflow-hidden">
      <h1 className="text-2xl self-stretch rounded-lg">Select one</h1>
      <div className="m-4">
        <button
          className={`w-[100px] p-3 self-stretch rounded-lg bg-gray-200 text-gray-700 block mb-3 hover:bg-brand-color-01 hover:text-white${
            selectedOption === "Basic" ? " bg-[#00CC9C] text-white" : ""
          }`}
          onClick={() =>
            setSelectedOption((previousValue) =>
              previousValue === "Basic" ? "" : "Basic"
            )
          }
        >
          Basic
        </button>
        <button
          className={`w-[100px] p-3 self-stretch rounded-lg bg-gray-200 text-gray-700 block hover:bg-brand-color-01 hover:text-white${
            selectedOption === "Portfolio" ? " bg-[#00CC9C] text-white" : ""
          }`}
          onClick={() =>
            setSelectedOption((previousValue) =>
              previousValue === "Portfolio" ? "" : "Portfolio"
            )
          }
        >
          Portfolio
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
