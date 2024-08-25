import React, { useState } from "react";
import Button from "./ui/Button";

const DropdownMenu = ({ children, selectedScope }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
      <Button
        onClick={toggleDropdown}
        className="flex justify-between items-center bg-tc-indigo-light text-tc-blue"
      >
        {selectedScope || "Scopes"}
        <svg
          width="12"
          height="8"
          viewBox="0 0 12 8"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={isOpen ? "rotate-180" : ""}
        >
          <path
            d="M5.29289 6.29289L1.70711 2.70711C1.07714 2.07714 1.52331 1 2.41421 1H9.58579C10.4767 1 10.9229 2.07714 10.2929 2.70711L6.70711 6.29289C6.31658 6.68342 5.68342 6.68342 5.29289 6.29289Z"
            fill="#197EC6"
            stroke="#197EC6"
            strokeLinejoin="round"
          />
        </svg>
      </Button>
      {isOpen && (
        <div className="mt-2 flex flex-col gap-y-2 ml-4 border-l">
          {children}
        </div>
      )}
    </div>
  );
};

export default DropdownMenu;
