import React, { useState } from "react";

const Sidebar = () => {
  const [selectedOption, setSelectedOption] = useState("");

  return (
    <div className="font-poppins bg-white absolute w-[300px] max-h-[656px] top-[1px] left-[40px] rounded-[8px] overflow-hidden">
      <h1 className="text-2xl self-stretch rounded-lg">Select one</h1>
      <div className="m-4">
        {/* Static buttons */}
        <div style={{ marginBottom: "10px" }}>
          <button
            className={`p-4 self-stretch rounded-lg ${
              selectedOption === "WTT - Fules"
                ? "bg-brand-color-01 text-white"
                : "bg-gray-200 text-gray-700"
            }`}
            onClick={() => setSelectedOption("WTT - Fules")}
          >
            Basic
          </button>
        </div>
        <div style={{ marginBottom: "10px" }}>
          <button
            className={`p-4 self-stretch rounded-lg ${
              selectedOption === "WTT - Bioenergy"
                ? "bg-brand-color-01 text-white"
                : "bg-gray-200 text-gray-700"
            }`}
            onClick={() => setSelectedOption("WTT - Bioenergy")}
          >
            Portfolio
          </button>
        </div>
        {/* Add more static buttons if needed */}
      </div>
    </div>
  );
};

export default Sidebar;
