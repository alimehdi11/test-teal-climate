import { useEffect } from "react";
import Button from "../../components/ui/Button";

const Sidebar = ({
  selectedForm,
  setSelectedForm,
  level1Options,
  selectedlevel1,
  setSelectedlevel1,
}) => {
  useEffect(() => {
    setSelectedlevel1("");
  }, [selectedForm]);

  return (
    <>
      <h2 className="m-0 mb-4 text-center font-extrabold text-2xl">
        Select one
      </h2>
      <div className="flex flex-col gap-y-4">
        <Button
          className={
            selectedForm === "Industry" ? "bg-tc-green text-white" : ""
          }
          onClick={() =>
            setSelectedForm((previousValue) =>
              previousValue === "Industry" ? "" : "Industry"
            )
          }
        >
          Industry
        </Button>
        <Button
          className={selectedForm === "Product" ? "bg-tc-green text-white" : ""}
          onClick={() =>
            setSelectedForm((previousValue) =>
              previousValue === "Product" ? "" : "Product"
            )
          }
        >
          Product
        </Button>
      </div>

      <h2 className="m-0 my-4 text-center font-extrabold text-2xl">
        Select Category
      </h2>

      {/* List */}
      <ul className="list-none m-0 my-4 md:mb-0 p-0 flex flex-col gap-y-4">
        {level1Options.map((item, index) => (
          <li
            key={index}
            className={
              "bg-gray-200 hover:bg-tc-blue hover:text-white rounded-lg p-2" +
              (item.level1 === selectedlevel1
                ? " bg-tc-blue text-white hover:bg-opacity-90"
                : "")
            }
            onClick={() => {
              if (item.level1 === selectedlevel1) {
                setSelectedlevel1(null);
              } else {
                setSelectedlevel1(item.level1);
              }
            }}
          >
            {item.level1}
          </li>
        ))}
      </ul>
    </>
  );
};

export default Sidebar;
