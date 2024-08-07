import TC_PieChartWithPaddingAngle from "../../components/TC_PieChartWithPaddingAngle.jsx";
import { useState, useEffect, useContext } from "react";
import TC_RadialBarChart from "../../components/TC_RadialBarChart.jsx";
import { UserContext } from "../../contexts/UserContext.jsx";
import { request } from "../../utils/request.js";

const CarbonEmissionsAnalytics = () => {
  const { user } = useContext(UserContext);
  const [userBusinessUnitsActivities, setUserBusinessUnitsActivities] =
    useState([]);
  const [totalCO2e, setTotalCO2e] = useState(0);
  const [totalScope1CO2e, setTotalScope1CO2e] = useState(0);
  const [totalScope2CO2e, setTotalScope2CO2e] = useState(0);
  const [totalScope3CO2e, setTotalScope3CO2e] = useState(0);
  const [scope3CategoriesCO2e, set3ScopeCategoriesCO2e] = useState([
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  ]);

  const fetchUserBusinessUnitsActivities = async () => {
    try {
      const userBusinessUnitsActivitiesResponse = await request(
        `${import.meta.env.VITE_API_BASE_URL}/users/${user.id}/businessUnitsActivities`,
        "GET"
      );
      if (!userBusinessUnitsActivitiesResponse.ok) {
        throw new Error(`Failed to fetch data:`);
      }
      const userBusinessUnitsActivities =
        await userBusinessUnitsActivitiesResponse.json();
      setUserBusinessUnitsActivities(userBusinessUnitsActivities);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const calculateTotalC02e = () => {
    const totalCO2e = userBusinessUnitsActivities.reduce(
      (accumulator, obj) => accumulator + obj.CO2e,
      0
    );
    return totalCO2e / 1000; // kg CO2e
  };

  const calculateTotalC02eOfGivenScope = (scope) => {
    const totalC02eOfGivenScope = userBusinessUnitsActivities.reduce(
      (accumulator, obj) => {
        if (obj.scope === scope) {
          return accumulator + obj.CO2e;
        }
        return accumulator;
      },
      0
    );
    return totalC02eOfGivenScope / 1000; // kg CO2e of given scope
  };

  const calculateC02ePercentageOfGivenScope = (scopeCO2e) => {
    if (totalCO2e === 0) {
      return 0;
    }

    return (((scopeCO2e * 1000) / (totalCO2e * 1000)) * 100).toFixed(2);
  };

  const calculateC02ePercentageOfGivenScopeCategory = (scopeCategory) => {
    const totalC02eOfGivenScopeCategory = userBusinessUnitsActivities.reduce(
      (accumulator, obj) => {
        if (obj.level1Category === scopeCategory) {
          return accumulator + obj.CO2e;
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
    const totalC02eOfScope2 = userBusinessUnitsActivities.reduce(
      (accumulator, obj) => {
        // Here we are excluding marketBased data(Scope 2)
        if (obj.scope === "Scope 2" && obj.level5 !== "marketBased") {
          return accumulator + obj.CO2e;
        }
        return accumulator;
      },
      0
    );
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
    const totalC02eOfGivenScopeCategory = userBusinessUnitsActivities.reduce(
      (accumulator, obj) => {
        // Here we are excluding marketBased data(Scope 2)
        if (
          obj.level1Category === scopeCategory &&
          obj.level5 !== "marketBased"
        ) {
          return accumulator + obj.CO2e;
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
    const totalC02eOfGivenScopeCategory = userBusinessUnitsActivities.reduce(
      (accumulator, obj) => {
        if (
          obj.level1Category === scopeCategory &&
          obj.level5 === "marketBased"
        ) {
          return accumulator + obj.CO2e;
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
    fetchUserBusinessUnitsActivities();
  }, []);

  useEffect(() => {
    if (userBusinessUnitsActivities.length > 0) {
      const totalCO2e = calculateTotalC02e();
      setTotalCO2e(totalCO2e);
    }
  }, [userBusinessUnitsActivities]);

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
    <div className="grid grid-cols-1 mqMin850:grid-cols-2 xl:grid-cols-3 px-4 gap-4 mt-4">
      {/* Card total emissions */}
      <div className="bg-white rounded-lg shadow-card p-6">
        <div className="font-medium text-[1rem] text-[#111111]">
          Total GHG Emissions
        </div>
        <div className="text-[2rem] font-medium text-[#111111]">
          {totalCO2e.toFixed(2)}
        </div>
        <div className="font-medium text-[12px] text-[#828282]">
          Metric Tonnes CO<span className="text-[10px]">2</span>e
        </div>
        <hr className="border-t-[1px] border-slate-500 h-0 my-4 -mx-6" />
        <div className="flex flex-col-reverse gap-5 xs:flex-row xs:items-center">
          <div className="flex-1 flex flex-col gap-y-3">
            {/* Scope 1 */}
            <div className="flex items-center justify-between gap-x-2">
              <div className="flex items-center gap-x-1">
                <span className="h-3 w-3 rounded-[50%] bg-tc-blue"></span>
                <div className="text-nowrap font-medium text-[10px] text-[#111111]">
                  Scope 1
                </div>
              </div>
              <div className="font-medium text-[10px] text-[#111111]">
                {calculateC02ePercentageOfGivenScope(totalScope1CO2e)}%
              </div>
            </div>
            {/* Scope 2 */}
            <div className="flex items-center justify-between gap-x-2">
              <div className="flex items-center gap-x-1">
                <div className="h-3 w-3 rounded-[50%] bg-tc-green" />
                <div className="text-nowrap font-medium text-[10px] text-[#111111]">
                  Scope 2
                </div>
              </div>
              <div className="font-medium text-[10px] text-[#111111]">
                {calculateC02ePercentageOfScope2()}%
              </div>
            </div>
            {/* Scope 3 */}
            <div className="flex items-center justify-between gap-x-2">
              <div className="flex items-center gap-x-1">
                <div className="h-3 w-3 rounded-[50%] bg-orange" />
                <div className="text-nowrap font-medium text-[10px] text-[#111111]">
                  Scope 3
                </div>
              </div>
              <div className="font-medium text-[10px] text-[#111111]">
                {calculateC02ePercentageOfGivenScope(totalScope3CO2e)}%
              </div>
            </div>
          </div>
          <div className="h-36 min-w-[144px] flex items-center justify-center">
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
      <div className="bg-white rounded-lg shadow-card p-6">
        <div className="font-medium text-[1rem] text-[#111111]">
          Scope 1 Emissions
        </div>
        <div className="text-[2rem] font-medium text-[#111111]">
          {totalScope1CO2e.toFixed(2)}
        </div>
        <div className="font-medium text-[12px] text-[#828282]">
          Metric Tonnes CO<span className="text-[10px]">2</span>e
        </div>
        <hr className="border-t-[1px] border-slate-500 h-0 my-4 -mx-6" />
        <div className="flex flex-col-reverse gap-5 xs:flex-row xs:items-center">
          <div className="flex-1 flex flex-col gap-y-3">
            {/* Stationary Combustion */}
            <div className="flex items-center justify-between gap-x-2">
              <div className="flex items-center gap-x-1">
                <span className="h-3 w-3 rounded-[50%] bg-tc-blue"></span>
                <div className="text-nowrap font-medium text-[10px] text-[#111111]">
                  Stationary Combustion
                </div>
              </div>
              <div className="font-medium text-[10px] text-[#111111]">
                {calculateC02ePercentageOfGivenScopeCategory(
                  "Stationary combustion"
                )}
                %
              </div>
            </div>
            {/* Mobile Combustion */}
            <div className="flex items-center justify-between gap-x-2">
              <div className="flex items-center gap-x-1">
                <span className="h-3 w-3 rounded-[50%] bg-tc-green"></span>
                <div className="text-nowrap font-medium text-[10px] text-[#111111]">
                  Mobile Combustion
                </div>
              </div>
              <div className="font-medium text-[10px] text-[#111111]">
                {calculateC02ePercentageOfGivenScopeCategory(
                  "Mobile combustion"
                )}
                %
              </div>
            </div>
            {/* Fugitive Emissions */}
            <div className="flex items-center justify-between  gap-x-2">
              <div className="flex items-center gap-x-1">
                <div className="h-3 w-3 rounded-[50%] bg-orange" />
                <div className="text-nowrap font-medium text-[10px] text-[#111111]">
                  Fugitive Emissions
                </div>
              </div>
              <div className="font-medium text-[10px] text-[#111111]">
                {calculateC02ePercentageOfGivenScopeCategory(
                  "Fugitive emissions"
                )}
                %
              </div>
            </div>
          </div>
          <div className="h-36 min-w-[144px] flex items-center justify-center">
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
      <div className="xl:row-span-2 bg-white rounded-lg shadow-card p-6">
        <div className="flex justify-between">
          <div className="self-start">
            <div className="font-medium text-[1rem] text-[#111111]">
              Scope 3 Emissions
            </div>
            <div className="text-[2rem] font-medium text-[#111111]">
              {totalScope3CO2e.toFixed(2)}
            </div>
            <div className="font-medium text-[12px] text-[#828282]">
              Metric Tonnes CO<span className="text-[10px]">2</span>e
            </div>
          </div>
          <div className="self-end mt-6 flex items-center justify-center -rotate-90">
            <TC_PieChartWithPaddingAngle data={scope3CategoriesCO2e} />
          </div>
        </div>
        <hr className="border-t-[1px] border-slate-500 h-0 my-4 -mx-6" />
        <div className="flex flex-col gap-y-3">
          {scope3Categories.map((category, index) => {
            return (
              <div
                key={category}
                className="flex items-center justify-between gap-x-2"
              >
                <div className="flex items-center gap-x-1">
                  <span
                    className={
                      "h-3 w-3 rounded-[50%] " + scope3CategoriesColors[index]
                    }
                  ></span>
                  <div className="capitalize font-medium text-[10px] text-[#111111]">
                    {category}
                  </div>
                </div>
                <div className="font-medium text-[10px] text-[#111111]">
                  {scope3CategoriesCO2e[index]}%
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Card scope 2 */}
      <div className="row-start-3 mqMin850:row-start-2 mqMin850:self-start xl:self-stretch xl:col-span-2 bg-white rounded-lg shadow-card p-6">
        <div className="font-medium text-[1rem] text-[#111111]">
          Scope 2 Emissions
        </div>
        <div className="text-[2rem] font-medium text-[#111111]">
          {totalScope2CO2e.toFixed(2)}
        </div>
        <div className="font-medium text-[12px] text-[#828282]">
          Metric Tonnes CO<span className="text-[10px]">2</span>e
        </div>
        <hr className="border-t-[1px] border-slate-500 h-0 my-4 -mx-6" />
        <div className="flex flex-col gap-7 xl:flex-row">
          {/* Location based */}
          <div className="flex-1">
            <div className="font-medium ">Location based</div>
            <div className="flex flex-col-reverse gap-5 xs:flex-row xs:items-center">
              <div className="flex-1 flex flex-col gap-y-3">
                {/* Purchased Electricity */}
                <div className="flex items-center justify-between gap-x-2">
                  <div className="flex items-center gap-x-1">
                    <span className="h-3 w-3 rounded-[50%] bg-tc-blue"></span>
                    <div className="text-nowrap font-medium text-[10px] text-[#111111]">
                      Purchased Electricity
                    </div>
                  </div>
                  <div className="font-medium text-[10px] text-[#111111]">
                    {calculateC02ePercentageOfLocationBasedScopeCategory(
                      "Purchased electricity"
                    )}
                    %
                  </div>
                </div>
                {/* Heat and Steam */}
                <div className="flex items-center justify-between gap-x-2">
                  <div className="flex items-center gap-x-1">
                    <span className="h-3 w-3 rounded-[50%] bg-tc-green"></span>
                    <div className="text-nowrap font-medium text-[10px] text-[#111111]">
                      Heat and Steam
                    </div>
                  </div>
                  <div className="font-medium text-[10px] text-[#111111]">
                    {calculateC02ePercentageOfLocationBasedScopeCategory(
                      "Heat and steam"
                    )}
                    %
                  </div>
                </div>
              </div>
              <div className="h-36 min-w-[144px] flex items-center justify-center">
                <TC_RadialBarChart
                  data={[
                    calculateC02ePercentageOfLocationBasedScopeCategory(
                      "Purchased electricity"
                    ),
                    calculateC02ePercentageOfLocationBasedScopeCategory(
                      "Heat and steam"
                    ),
                  ]}
                  innerRadius="78%"
                />
              </div>
            </div>
          </div>
          <div className="border-r-[1px] border-slate-500 -mt-4 -mb-6"></div>
          {/* Market based */}
          <div className="flex-1">
            <div className="font-medium ">Market based</div>
            <div className="flex flex-col-reverse gap-5 xs:flex-row xs:items-center">
              <div className="flex-1 flex flex-col gap-y-3">
                {/* Electricity */}
                <div className="flex items-center justify-between gap-x-2">
                  <div className="flex items-center gap-x-1">
                    <span className="h-3 w-3 rounded-[50%] bg-tc-blue"></span>
                    <div className="text-nowrap font-medium text-[10px] text-[#111111]">
                      Electricity
                    </div>
                  </div>
                  <div className="font-medium text-[10px] text-[#111111]">
                    {calculateC02ePercentageOfMarketBasedScopeCategory(
                      "Electricity"
                    )}
                    %
                  </div>
                </div>
                {/* Heat and Steamn */}
                <div className="flex items-center justify-between gap-x-2">
                  <div className="flex items-center gap-x-1">
                    <span className="h-3 w-3 rounded-[50%] bg-tc-green"></span>
                    <div className="text-nowrap font-medium text-[10px] text-[#111111]">
                      Heat and Steam
                    </div>
                  </div>
                  <div className="font-medium text-[10px] text-[#111111]">
                    {calculateC02ePercentageOfMarketBasedScopeCategory(
                      "Heat and steam"
                    )}
                    %
                  </div>
                </div>
              </div>
              <div className="h-36 min-w-[144px] flex items-center justify-center">
                <TC_RadialBarChart
                  data={[
                    calculateC02ePercentageOfMarketBasedScopeCategory(
                      "Electricity"
                    ),
                    calculateC02ePercentageOfMarketBasedScopeCategory(
                      "Heat and steam"
                    ),
                  ]}
                  innerRadius="78%"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CarbonEmissionsAnalytics;
