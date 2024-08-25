import Button from "../../components/ui/Button";

const EeioSidebar = ({
  productOrIndustry,
  setProductOrIndustry,
  selectedLevel,
  setSelectedLevel,
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
      {/* <h2 className="m-0 mb-4 text-center font-extrabold text-2xl">
        Select one
      </h2> */}
      <div className="flex flex-col gap-y-2 mt-2 ml-8 border-l">
        <Button
          className={
            productOrIndustry === "Industry"
              ? "bg-tc-indigo-light text-tc-blue"
              : ""
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
            productOrIndustry === "Product"
              ? "bg-tc-indigo-light text-tc-blue"
              : ""
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
      {/* {productOrIndustry && (
        <>
          <h2 className="m-0 my-4 text-center font-extrabold text-2xl">
            Select Category
          </h2>
          List
          <div className="flex flex-col gap-y-2 mt-2">
            {level1Options.map((item, index) => (
              <Button
                key={index}
                className={
                  item === selectedLevel
                    ? " bg-tc-indigo-light text-tc-blue"
                    : ""
                }
                onClick={() => {
                  if (item === selectedLevel) {
                    setSelectedLevel(null);
                  } else {
                    setSelectedLevel(item);
                  }
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-5 min-w-5 min-h-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m16.49 12 3.75 3.75m0 0-3.75 3.75m3.75-3.75H3.74V4.499"
                  />
                </svg>
                {item}
              </Button>
            ))}
          </div>
        </>
      )} */}
    </>
  );
};

export default EeioSidebar;
