import Button from "../../components/ui/Button";

const EeioSidebar = ({
  productOrIndustry,
  setProductOrIndustry,
  selectedLevel1,
  setSelectedLevel1,
}) => {
  const level1Options = [
    "Activities of households",
    "Public administration and defence; compulsory social security",
    "Financial intermediation",
    "Manufacturing",
    "Construction",
    "Real estate, renting and business activities",
    "Hotels and restaurants",
    "Wholesale and retail trade; repair of motor vehicles, motorcycles and personal and household goods",
    "Electricity, gas and water supply",
    "Agriculture, hunting and forestry",
    "Mining and quarrying",
    "Other community, social and personal service activities",
    "Fishing",
    "Health and social work",
    "Transport, storage and communication",
    "Extra-territorial organizations and bodies",
    "Education",
  ];

  return (
    <>
      <h2 className="m-0 mb-4 text-center font-extrabold text-2xl">
        Select one
      </h2>
      <div className="flex flex-col gap-y-4">
        <Button
          className={
            productOrIndustry === "Industry" ? "bg-tc-green text-white" : ""
          }
          onClick={() =>
            setProductOrIndustry((previousValue) =>
              previousValue === "Industry" ? "" : "Industry"
            )
          }
        >
          Industry
        </Button>
        <Button
          className={
            productOrIndustry === "Product" ? "bg-tc-green text-white" : ""
          }
          onClick={() =>
            setProductOrIndustry((previousValue) =>
              previousValue === "Product" ? "" : "Product"
            )
          }
        >
          Product
        </Button>
      </div>
      {productOrIndustry && (
        <>
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
                  (item === selectedLevel1
                    ? " bg-tc-blue text-white hover:bg-opacity-90"
                    : "")
                }
                onClick={() => {
                  if (item === selectedLevel1) {
                    setSelectedLevel1(null);
                  } else {
                    setSelectedLevel1(item);
                  }
                }}
              >
                {item}
              </li>
            ))}
          </ul>
        </>
      )}
    </>
  );
};

export default EeioSidebar;
