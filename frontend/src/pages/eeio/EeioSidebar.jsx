import { useEffect, useState } from "react";
import Button from "../../components/ui/Button";
import { request } from "../../utils/request";

const EeioSidebar = ({
  productOrIndustry,
  setProductOrIndustry,
  selectedLevel1,
  setSelectedLevel1,
}) => {
  const [level1Options, setLevel1Options] = useState([]);

  const fetchEeioLevel1 = async () => {
    try {
      const url = `${import.meta.env.VITE_API_BASE_URL}/eeios?productOrIndustry=${productOrIndustry}&column=level1&distinct=true`;
      const response = await request(url, "GET");
      if (!response.ok) {
        throw new Error(`Failed to fetch data:`);
      }
      const jsonData = await response.json();
      setLevel1Options(jsonData);
    } catch (error) {
      setLevel1Options([]);
    }
  };

  useEffect(() => {
    if (productOrIndustry) {
      fetchEeioLevel1();
    }
  }, [productOrIndustry]);
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
                  (item.level1 === selectedLevel1
                    ? " bg-tc-blue text-white hover:bg-opacity-90"
                    : "")
                }
                onClick={() => {
                  if (item.level1 === selectedLevel1) {
                    setSelectedLevel1(null);
                  } else {
                    setSelectedLevel1(item.level1);
                  }
                }}
              >
                {item.level1}
              </li>
            ))}
          </ul>
        </>
      )}
    </>
  );
};

export default EeioSidebar;
