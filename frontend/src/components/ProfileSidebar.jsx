import { useState, useEffect } from "react";
import Button from "./ui/Button";

const ProfileSidebar = ({ setSelectedForm }) => {
  const [selectedOption, setSelectedOption] = useState("");

  useEffect(() => {
    setSelectedForm(selectedOption);
  }, [selectedOption]);

  return (
    <>
      <h2 className="m-0 mb-4 text-center">Select one</h2>
      <div className="flex flex-col gap-y-4">
        <Button
          className={
            "py-3" +
            (selectedOption === "Basic" ? " bg-tc-green text-white" : "")
          }
          onClick={() =>
            setSelectedOption((previousValue) =>
              previousValue === "Basic" ? "" : "Basic"
            )
          }
        >
          Basic
        </Button>
        <Button
          className={
            "py-3" +
            (selectedOption === "Portfolio" ? " bg-tc-green text-white" : "")
          }
          onClick={() =>
            setSelectedOption((previousValue) =>
              previousValue === "Portfolio" ? "" : "Portfolio"
            )
          }
        >
          Portfolio
        </Button>
      </div>
    </>
  );
};

export default ProfileSidebar;
