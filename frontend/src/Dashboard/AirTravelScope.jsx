import ApexChart from "./ApexChart";
import ApexChart1 from "./ApexChart1";
import Circule from "./Circule";
import TC_PieChartWithPaddingAngle from "../components/TC_PieChartWithPaddingAngle.jsx";
import { useState, useEffect, useContext } from "react";
import { getBearerToken } from "./../utils/auth.utils.js";
import TC_RadialBarChart from "../components/TC_RadialBarChart.jsx";
import { UserContext } from "../contexts/UserContext.jsx";

const AirTravelScope = () => {
  const { user } = useContext(UserContext);
  const [companyData, setCompanyData] = useState([]);
  const [totalCO2e, setTotalCO2e] = useState(0);
  const [totalScope1CO2e, setTotalScope1CO2e] = useState(0);
  const [totalScope2CO2e, setTotalScope2CO2e] = useState(0);
  const [totalScope3CO2e, setTotalScope3CO2e] = useState(0);
  const [scope3CategoriesCO2e, set3ScopeCategoriesCO2e] = useState([
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  ]);

  const fetchCompanyData = async (userId) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/companiesdata/${userId}`,
        {
          headers: {
            authorization: getBearerToken(),
          },
        }
      );
      if (!response.ok) {
        throw new Error(`Failed to fetch data:`);
      }
      const jsonData = await response.json();
      return jsonData;
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const calculateTotalC02e = () => {
    const totalCO2e = companyData.reduce(
      (accumulator, obj) => accumulator + obj.co2e,
      0
    );
    return totalCO2e / 1000; // kg CO2e
  };

  const calculateTotalC02eOfGivenScope = (scope) => {
    const totalC02eOfGivenScope = companyData.reduce((accumulator, obj) => {
      if (obj.scope === scope) {
        return accumulator + obj.co2e;
      }
      return accumulator;
    }, 0);
    return totalC02eOfGivenScope / 1000; // kg CO2e of given scope
  };

  const calculateC02ePercentageOfGivenScope = (scopeCO2e) => {
    if (totalCO2e === 0) {
      return 0;
    }

    return (((scopeCO2e * 1000) / (totalCO2e * 1000)) * 100).toFixed(2);
  };

  const calculateC02ePercentageOfGivenScopeCategory = (scopeCategory) => {
    const totalC02eOfGivenScopeCategory = companyData?.reduce(
      (accumulator, obj) => {
        if (obj.fuel_category === scopeCategory) {
          return accumulator + obj.co2e;
        }
        return accumulator;
      },
      0
    );

    if (totalC02eOfGivenScopeCategory === 0) {
      return totalC02eOfGivenScopeCategory;
    } else {
      return (
        (totalC02eOfGivenScopeCategory / (totalCO2e * 1000)) *
        100
      ).toFixed(2);
    }
  };

  const calculateTotalC02eOfScope2 = () => {
    const totalC02eOfScope2 = companyData.reduce((accumulator, obj) => {
      // Here we are excluding marketBased data(Scope 2)
      if (obj.scope === "Scope 2" && obj.level5 !== "marketBased") {
        return accumulator + obj.co2e;
      }
      return accumulator;
    }, 0);
    return totalC02eOfScope2 / 1000; // kg CO2e of given scope
  };

  const calculateC02ePercentageOfScope2 = () => {
    if (totalCO2e === 0) {
      return 0;
    }

    return (((totalScope2CO2e * 1000) / (totalCO2e * 1000)) * 100).toFixed(2);
  };

  const calculateC02ePercentageOfLocationBasedScopeCategory = (
    scopeCategory
  ) => {
    const totalC02eOfGivenScopeCategory = companyData.reduce(
      (accumulator, obj) => {
        // Here we are excluding marketBased data(Scope 2)
        if (
          obj.fuel_category === scopeCategory &&
          obj.level5 !== "marketBased"
        ) {
          return accumulator + obj.co2e;
        }
        return accumulator;
      },
      0
    );

    if (totalC02eOfGivenScopeCategory === 0) {
      return totalC02eOfGivenScopeCategory;
    } else {
      return (
        (totalC02eOfGivenScopeCategory / (totalCO2e * 1000)) *
        100
      ).toFixed(2);
    }
  };

  const calculateC02ePercentageOfMarketBasedScopeCategory = (scopeCategory) => {
    const totalC02eOfGivenScopeCategory = companyData.reduce(
      (accumulator, obj) => {
        if (
          obj.fuel_category === scopeCategory &&
          obj.level5 === "marketBased"
        ) {
          return accumulator + obj.co2e;
        }
        return accumulator;
      },
      0
    );

    if (totalC02eOfGivenScopeCategory === 0) {
      return totalC02eOfGivenScopeCategory;
    } else {
      return (
        (totalC02eOfGivenScopeCategory / (totalCO2e * 1000)) *
        100
      ).toFixed(2);
    }
  };

  const scope3Categories = [
    "Purchased goods and services",
    "Capital goods", // TODO : This scope category is not available in database
    "Fuel- and energy- related activities",
    "Upstream transportation and distribution",
    "Waste generated in operations",
    "Business travel",
    "Employee commuting",
    "Upstream leased assets", // TODO : This scope category is not available in database
    "Downstream transportation and distribution",
    "Processing of sold products", // TODO : This scope category is not available in database
    "Use of sold products",
    "End-of-life treatment of sold products",
    "Downstream leased assets",
    "Franchises", // TODO : This scope category is not available in database
    "Investments", // TODO : This scope category is not available in database
  ];

  const scope3CategoriesColors = [
    "bg-tc-blue",
    "bg-corn-flower-blue",
    "bg-medium-slate-blue",
    "bg-indian-red-100",
    "bg-medium-aqua-marine",
    "bg-green-1",
    "bg-sky-blue",
    "bg-medium-orchid",
    "bg-violet",
    "bg-golden-rod",
    "bg-forest-green",
    "bg-dark-cyan",
    "bg-tc-green",
    "bg-gold",
    "bg-orange",
  ];

  useEffect(() => {
    if (user.id) {
      fetchCompanyData(user.id).then((companyData) =>
        setCompanyData(companyData)
      );
    }
  }, [user.id]);

  useEffect(() => {
    if (companyData.length > 0) {
      const totalCO2e = calculateTotalC02e();
      setTotalCO2e(totalCO2e);
    }
  }, [companyData]);

  useEffect(() => {
    if (totalCO2e) {
      const totalScope1CO2e = calculateTotalC02eOfGivenScope("Scope 1");
      const totalScope2CO2e = calculateTotalC02eOfScope2();
      const totalScope3CO2e = calculateTotalC02eOfGivenScope("Scope 3");
      const scope3CategoriesCO2ePercentages = scope3Categories.map(
        (scopeCategory) =>
          calculateC02ePercentageOfGivenScopeCategory(scopeCategory)
      );

      setTotalScope1CO2e(totalScope1CO2e);
      setTotalScope2CO2e(totalScope2CO2e);
      setTotalScope3CO2e(totalScope3CO2e);
      set3ScopeCategoriesCO2e(scope3CategoriesCO2ePercentages);
    }
  }, [totalCO2e]);

  return (
    <div className="grid grid-cols-1 mqMin850:grid-cols-2 xl:grid-cols-3 px-3 gap-3 mt-4">
      {/* Card total emissions */}
      <div className="border rounded-md border-slate-500 p-3">
        <div className="font-medium text-[20px]">Total GHG Emissions</div>
        <div className="text-[2rem]">{totalCO2e.toFixed(2)}</div>
        <div className="font-medium text-gray-400">
          Metric Tonnes CO<span className="text-[10px]">2</span>e
        </div>
        <hr className="border-t-[1px] border-slate-500 h-0" />
        <div className="flex flex-col-reverse gap-y-1 xs:flex-row xs:items-center">
          <div className="flex-1 flex flex-col gap-y-3">
            {/* Scope 1 */}
            <div className="flex items-center justify-between gap-x-2">
              <div className="flex items-center gap-x-1">
                <span className="h-4 w-4 rounded-[50%] bg-tc-blue"></span>
                <div className="text-nowrap">Scope 1</div>
              </div>
              <div>{calculateC02ePercentageOfGivenScope(totalScope1CO2e)}%</div>
            </div>
            {/* Scope 2 */}
            <div className="flex items-center justify-between gap-x-2">
              <div className="flex items-center gap-x-1">
                <div className="h-4 w-4 rounded-[50%] bg-orange" />
                <div className="text-nowrap">Scope 2</div>
              </div>
              <div>{calculateC02ePercentageOfScope2()}%</div>
            </div>
            {/* Scope 3 */}
            <div className="flex items-center justify-between gap-x-2">
              <div className="flex items-center gap-x-1">
                <div className="h-4 w-4 rounded-[50%] bg-tc-green" />
                <div className="text-nowrap">Scope 3</div>
              </div>
              <div>{calculateC02ePercentageOfGivenScope(totalScope3CO2e)}%</div>
            </div>
          </div>
          <div className="flex-1 h-36 min-w-[144px] flex items-center justify-center">
            <TC_RadialBarChart
              data={[
                calculateC02ePercentageOfGivenScope(totalScope1CO2e),
                calculateC02ePercentageOfGivenScope(totalScope2CO2e),
                calculateC02ePercentageOfGivenScope(totalScope3CO2e),
              ]}
            />
          </div>
        </div>
      </div>

      {/* Card scope 1*/}
      <div className="border rounded-md border-slate-500 p-3">
        <div className="font-medium text-[20px]">Scope 1 Emissions</div>
        <div className="text-[2rem]">{totalScope1CO2e.toFixed(2)}</div>
        <div className="font-medium text-gray-400">
          Metric Tonnes CO<span className="text-[10px]">2</span>e
        </div>
        <hr className="border-t-[1px] border-slate-500 h-0" />
        <div className="flex flex-col-reverse gap-y-1 xs:flex-row xs:items-center">
          <div className="flex-1 flex flex-col gap-y-3">
            {/* Stationary Combustion */}
            <div className="flex items-center justify-between gap-x-2">
              <div className="flex items-center gap-x-1">
                <span className="h-4 w-4 rounded-[50%] bg-tc-blue"></span>
                <div className="text-nowrap">Stationary Combustion</div>
              </div>
              <div>
                {calculateC02ePercentageOfGivenScopeCategory(
                  "Stationary combustion"
                )}
                %
              </div>
            </div>
            {/* Mobile Combustion */}
            <div className="flex items-center justify-between gap-x-2">
              <div className="flex items-center gap-x-1">
                <span className="h-4 w-4 rounded-[50%] bg-orange"></span>
                <div className="text-nowrap">Mobile Combustion</div>
              </div>
              <div>
                {calculateC02ePercentageOfGivenScopeCategory(
                  "Mobile combustion"
                )}
                %
              </div>
            </div>
            {/* Fugitive Emissions */}
            <div className="flex items-center justify-between  gap-x-2">
              <div className="flex items-center gap-x-1">
                <div className="h-4 w-4 rounded-[50%] bg-tc-green" />
                <div className="text-nowrap">Fugitive Emissions</div>
              </div>
              <div>
                {calculateC02ePercentageOfGivenScopeCategory(
                  "Fugitive emissions"
                )}
                %
              </div>
            </div>
          </div>
          <div className="flex-1 h-36 min-w-[144px] flex items-center justify-center">
            <TC_RadialBarChart
              data={[
                calculateC02ePercentageOfGivenScopeCategory(
                  "Stationary combustion"
                ),
                calculateC02ePercentageOfGivenScopeCategory(
                  "Mobile combustion"
                ),
                calculateC02ePercentageOfGivenScopeCategory(
                  "Fugitive emissions"
                ),
              ]}
            />
          </div>
        </div>
      </div>

      {/* Card scope 3 */}
      <div className="xl:row-span-2 border rounded-md border-slate-500 p-3">
        <div className="font-medium text-[20px]">Scope 3 Emissions</div>
        <div className="text-[2rem]">{totalScope3CO2e.toFixed(2)}</div>
        <div className="font-medium text-gray-400">
          Metric Tonnes CO<span className="text-[10px]">2</span>e
        </div>
        <hr className="border-t-[1px] border-slate-500 h-0" />
        <div className="flex flex-col gap-y-3">
          <div className="flex items-center justify-center">
            <TC_PieChartWithPaddingAngle data={scope3CategoriesCO2e} />
          </div>
          {scope3Categories.map((category, index) => {
            return (
              <>
                <div className="flex items-center justify-between gap-x-2">
                  <div className="flex items-center gap-x-1">
                    <span
                      className={
                        "h-4 w-4 rounded-[50%] " + scope3CategoriesColors[index]
                      }
                    ></span>
                    <div className="capitalize">{category}</div>
                  </div>
                  <div>{scope3CategoriesCO2e[index]}%</div>
                </div>
              </>
            );
          })}
        </div>
      </div>

      {/* Card scope 2 */}
      <div className="row-start-3 mqMin850:row-start-2 xl:col-span-2 border rounded-md border-slate-500 p-3">
        <div className="font-medium text-[20px]">Scope 2 Emissions</div>
        <div className="text-[2rem]">{totalScope2CO2e.toFixed(2)}</div>
        <div className="font-medium text-gray-400">
          Metric Tonnes CO<span className="text-[10px]">2</span>e
        </div>
        <hr className="border-t-[1px] border-slate-500 h-0" />
        <div className="flex flex-col xl:flex-row xl:justify-between">
          {/* Location based */}
          <div>
            <div className="font-medium">Location based</div>
            <div className="flex flex-col-reverse gap-y-1 xs:flex-row xs:items-center">
              <div className="flex-1 flex flex-col gap-y-3">
                {/* Purchased Electricity */}
                <div className="flex items-center justify-between gap-x-2">
                  <div className="flex items-center gap-x-1">
                    <span className="h-4 w-4 rounded-[50%] bg-tc-blue"></span>
                    <div className="text-nowrap">Purchased Electricity</div>
                  </div>
                  <div>
                    {calculateC02ePercentageOfLocationBasedScopeCategory(
                      "Purchased electricity"
                    )}
                    %
                  </div>
                </div>
                {/* Heat and Steam */}
                <div className="flex items-center justify-between gap-x-2">
                  <div className="flex items-center gap-x-1">
                    <span className="h-4 w-4 rounded-[50%] bg-orange"></span>
                    <div className="text-nowrap">Heat and Steam</div>
                  </div>
                  <div>
                    {calculateC02ePercentageOfLocationBasedScopeCategory(
                      "Heat and steam"
                    )}
                    %
                  </div>
                </div>
              </div>
              <div className="flex-1 h-36 min-w-[144px] flex items-center justify-center">
                <TC_RadialBarChart
                  data={[
                    // calculateC02ePercentageOfLocationBasedScopeCategory(
                    //   "Purchased electricity"
                    // ),
                    // calculateC02ePercentageOfLocationBasedScopeCategory(
                    //   "Heat and steam"
                    // ),
                    2, 6,
                  ]}
                />
              </div>
            </div>
          </div>
          <hr className="border-t-[1px] border-slate-500 h-0 w-full xl:hidden" />
          {/* Market based */}
          <div className="xl:border-s-[1px] xl:border-slate-500 xl:ps-9">
            <div className="font-medium">Market based</div>
            <div className="flex flex-col-reverse gap-y-1 xs:flex-row xs:items-center">
              <div className="flex-1 flex flex-col gap-y-3">
                {/* Electricity */}
                <div className="flex items-center justify-between gap-x-2">
                  <div className="flex items-center gap-x-1">
                    <span className="h-4 w-4 rounded-[50%] bg-tc-blue"></span>
                    <div className="text-nowrap">Electricity</div>
                  </div>
                  <div>
                    {calculateC02ePercentageOfMarketBasedScopeCategory(
                      "Electricity"
                    )}
                    %
                  </div>
                </div>
                {/* Heat and Steamn */}
                <div className="flex items-center justify-between gap-x-2">
                  <div className="flex items-center gap-x-1">
                    <span className="h-4 w-4 rounded-[50%] bg-orange"></span>
                    <div className="text-nowrap">Heat and Steam</div>
                  </div>
                  <div>
                    {calculateC02ePercentageOfMarketBasedScopeCategory(
                      "Heat and steam"
                    )}
                    %
                  </div>
                </div>
              </div>
              <div className="flex-1 h-36 min-w-[144px] flex items-center justify-center">
                <TC_RadialBarChart
                  data={[
                    calculateC02ePercentageOfMarketBasedScopeCategory(
                      "Electricity"
                    ),
                    calculateC02ePercentageOfMarketBasedScopeCategory(
                      "Heat and steam"
                    ),
                  ]}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AirTravelScope;
