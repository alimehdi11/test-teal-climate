import ApexChart from "./ApexChart";
import ApexChart1 from "./ApexChart1";
import Circule from "./Circule";
import { useState, useEffect } from "react";
import { getBearerToken } from "./../utils/auth.utils.js";

const AirTravelScope = () => {
  const [userId, setUserId] = useState("");
  const [companyData, setCompanyData] = useState([]);
  const [totalCO2e, setTotalCO2e] = useState(0);
  const [totalScope1CO2e, setTotalScope1CO2e] = useState(0);
  const [totalScope2CO2e, setTotalScope2CO2e] = useState(0);
  const [totalScope3CO2e, setTotalScope3CO2e] = useState(0);
  const [scopeCategoriesCO2e, setScopeCategoriesCO2e] = useState([
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  ]);

  const fetchCompanyData = async (userId) => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_BASE_URL}/companiesdata/${userId}`,
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
      console.table(jsonData);
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
    const totalC02eOfGivenScopeCategory = companyData.reduce(
      (accumulator, obj) => {
        if (obj.fuel_category === scopeCategory) {
          return accumulator + obj.co2e;
          ``;
        }
        return accumulator;
      },
      0
    );

    if (scopeCategory === "Heat and steam") {
      console.log("Heat and steam", totalC02eOfGivenScopeCategory);
    }

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
        // Here we are excluding marketBased data(Scope 2)
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

  const scopeCategories = [
    "Purchased Goods And Services",
    "Capital Goods",
    "Fuel & Energy Related Activities",
    "Upstream Transportation And Distribution",
    "Waste Generated In Operations",
    "Business Travel",
    "Employee Commuting",
    "Upstream Leased Assets",
    "Downstream Transportation And Distribution",
    "Processing Of Sold Products",
    "Use Of Sold Products",
    "End-Of-Life Treatment Of Sold Products",
    "Downstream Leased Assets",
    "Franchises",
    "Investments",
  ];

  useEffect(() => {
    // Fetch userId from localStorage
    const storedUserID = localStorage.getItem("userId");
    if (storedUserID) {
      setUserId(storedUserID);
    }
  }, []);

  useEffect(() => {
    if (userId) {
      fetchCompanyData(userId).then((companyData) =>
        setCompanyData(companyData)
      );
    }
  }, [userId]);

  useEffect(() => {
    if (companyData.length > 0) {
      const totalCO2e = calculateTotalC02e();
      const totalScope1CO2e = calculateTotalC02eOfGivenScope("Scope 1");
      const totalScope2CO2e = calculateTotalC02eOfScope2();
      const totalScope3CO2e = calculateTotalC02eOfGivenScope("Scope 3");
      const scopeCategoriesCO2ePercentages = scopeCategories.map(
        (scopeCategory) =>
          calculateC02ePercentageOfGivenScopeCategory(scopeCategory)
      );
      setTotalCO2e(totalCO2e);
      setTotalScope1CO2e(totalScope1CO2e);
      setTotalScope2CO2e(totalScope2CO2e);
      setTotalScope3CO2e(totalScope3CO2e);
      setScopeCategoriesCO2e(scopeCategoriesCO2ePercentages);
    }
  }, [companyData]);

  // const scopes1 = [49, 85, 40];
  const scopes2 = [85, 50];

  // const labels1 = ["Scope 1", "Scope 2", "Scope 3"];
  // const labels2 = [
  //   "Stationary Combustion",
  //   "Mobile Combustion",
  //   "Fugitive Emissions",
  // ];
  // const labels3 = ["Purchased Electricity", "Heat & Steam"];
  // const labels4 = ["Electricity", "Heat & Steam"];

  // const [scope1, scope2, scope3] = scopes1;
  // const [PurchasedElectricity, HeaSteam] = scopes2;
  // const total = scope1 + scope2 + scope3;

  // const seriesData = [
  //   { value: 10 },
  //   { value: 20 },
  //   { value: 30 },
  //   { value: 40 },
  //   { value: 40 },
  //   { value: 10 },
  // ];

  return (
    <section className="self-stretch flex flex-row items-start justify-start gap-[16px] max-w-full text-left text-base text-dark font-poppins lg:flex-wrap ">
      <div className="flex-1 flex flex-col items-start justify-start gap-[16px] max-w-full mq750:min-w-full">
        <div className="self-stretch flex flex-row items-start justify-start gap-[16px] max-w-full mq750:flex-wrap">
          <div className="flex-1 rounded-lg bg-white shadow-[0px_4px_60px_rgba(0,_0,_0,_0.02)] flex flex-col items-center justify-start pt-[18px] px-0 pb-4 box-border gap-[17px] min-w-[272px] max-w-full">
            <div className="self-stretch h-[284px] relative rounded-lg bg-white shadow-[0px_4px_60px_rgba(0,_0,_0,_0.02)] hidden" />
            <div className="self-stretch flex flex-col items-start justify-start py-0 px-6 gap-[6px] z-[1]">
              <div className="self-stretch flex flex-row items-center justify-between gap-[20px]">
                <div className="flex flex-row items-center justify-start gap-[8px]">
                  <div className="h-6 relative capitalize font-medium inline-block">
                    Total GHG Emissions
                  </div>
                  {/* <div className="rounded-81xl bg-green-1 overflow-hidden flex flex-row items-center justify-center py-0.5 px-1 whitespace-nowrap text-right text-3xs text-white">
                    <div className="relative capitalize font-semibold">
                      <span>{total}</span>
                      <span className="text-7xs">{` `}</span>
                      <span>%</span>
                    </div>
                  </div> */}
                </div>
                <div className="h-5 w-5 relative">
                  <div className="absolute h-full w-full top-[0%] right-[0%] bottom-[0%] left-[0%] rounded-[50%] bg-gray-6" />
                  <div className="absolute h-[56.5%] w-[12.5%] top-[25%] right-[44%] bottom-[18.5%] left-[43.5%] z-[1]">
                    <div className="absolute h-[66.37%] w-full top-[33.63%] right-[0%] bottom-[0%] left-[0%] rounded-5xs-5 bg-gray-4" />
                    <div className="absolute h-[22.12%] w-full top-[0%] right-[0%] bottom-[77.88%] left-[0%] rounded-5xs-5 bg-gray-4" />
                  </div>
                </div>
              </div>
              <div className="flex flex-col items-start justify-start text-13xl font-sf-pro-display">
                <div className="h-[38px] relative font-medium inline-block mq450:text-lgi mq1050:text-7xl">
                  {totalCO2e.toFixed(2)}
                </div>
                <div className="relative capitalize font-medium font-poppins text-gray-3 text-xs">
                  <span>Metric Tonnes CO</span>
                  <span className="text-6xs">2</span>e
                </div>
              </div>
            </div>
            <div className="self-stretch h-px relative box-border z-[1] border-t-[1px] border-solid border-gray-5" />
            <div className="self-stretch flex flex-row items-center justify-start py-0 px-6 gap-[28px] text-3xs mq450:flex-wrap">
              <div className="flex-1 flex flex-col items-start justify-start py-5 px-0 box-border gap-[10px] min-w-[208px]">
                <div className="self-stretch flex flex-row items-end justify-start gap-[6px] z-[1]">
                  <div className="h-3 w-3 relative rounded-[50%] bg-brand-color-2" />
                  <div className="flex-1 flex flex-col items-start justify-start">
                    <div className="relative capitalize font-medium">
                      Scope 1
                    </div>
                  </div>
                  <div className="relative capitalize font-medium text-right">
                    {calculateC02ePercentageOfGivenScope(totalScope1CO2e)}%
                  </div>
                </div>
                <div className="self-stretch flex flex-row items-end justify-start gap-[6px] z-[1]">
                  <div className="h-3 w-3 relative rounded-[50%] bg-orange" />
                  <div className="flex-1 flex flex-col items-start justify-start">
                    <div className="relative capitalize font-medium">
                      Scope 2
                    </div>
                  </div>
                  <div className="relative capitalize font-medium text-right">
                    {calculateC02ePercentageOfScope2()}%
                  </div>
                </div>
                <div className="self-stretch flex flex-row items-end justify-start gap-[6px] z-[1]">
                  <div className="h-3 w-3 relative rounded-[50%] bg-brand-color-01" />
                  <div className="flex-1 flex flex-col items-start justify-start">
                    <div className="relative capitalize font-medium">
                      Scope 3
                    </div>
                  </div>
                  <div className="relative capitalize font-medium text-right">
                    {calculateC02ePercentageOfGivenScope(totalScope3CO2e)}%
                  </div>
                </div>
              </div>
              <div className="h-[130px] w-[130px] relative z-[1] mq450:flex-1">
                <ApexChart
                  scopes={[
                    calculateC02ePercentageOfGivenScope(totalScope1CO2e),
                    calculateC02ePercentageOfGivenScope(totalScope2CO2e),
                    calculateC02ePercentageOfGivenScope(totalScope3CO2e),
                  ]}
                />
              </div>
            </div>
          </div>
          <div className="flex-1 rounded-lg bg-white shadow-[0px_4px_60px_rgba(0,_0,_0,_0.02)] flex flex-col items-center justify-start pt-[18px] px-0 pb-4 box-border gap-[17px] min-w-[272px] max-w-full">
            <div className="self-stretch h-[284px] relative rounded-lg bg-white shadow-[0px_4px_60px_rgba(0,_0,_0,_0.02)] hidden" />
            <div className="self-stretch flex flex-col items-start justify-start py-0 px-6 gap-[6px] z-[1]">
              <div className="self-stretch flex flex-row items-center justify-between gap-[20px]">
                <div className="flex flex-row items-center justify-start gap-[8px]">
                  <div className="relative capitalize font-medium">
                    Scope 1 Emissions
                  </div>
                  <div className="rounded-81xl bg-brand-color-2 overflow-hidden flex flex-row items-center justify-center py-0.5 px-1 whitespace-nowrap text-right text-3xs text-white">
                    <div className="relative capitalize font-semibold">
                      <span>
                        {calculateC02ePercentageOfGivenScope(totalScope1CO2e)}
                      </span>
                      <span className="text-7xs">{` `}</span>
                      <span>%</span>
                    </div>
                  </div>
                </div>
                <div className="h-5 w-5 relative">
                  <div className="absolute h-full w-full top-[0%] right-[0%] bottom-[0%] left-[0%] rounded-[50%] bg-gray-6" />
                  <div className="absolute h-[56.5%] w-[12.5%] top-[25%] right-[44%] bottom-[18.5%] left-[43.5%] z-[1]">
                    <div className="absolute h-[66.37%] w-full top-[33.63%] right-[0%] bottom-[0%] left-[0%] rounded-5xs-5 bg-gray-4" />
                    <div className="absolute h-[22.12%] w-full top-[0%] right-[0%] bottom-[77.88%] left-[0%] rounded-5xs-5 bg-gray-4" />
                  </div>
                </div>
              </div>
              <div className="flex flex-col items-start justify-start text-13xl font-sf-pro-display">
                <div className="h-[38px] relative font-medium inline-block mq450:text-lgi mq1050:text-7xl">
                  {totalScope1CO2e.toFixed(2)}
                </div>
                <div className="relative capitalize font-medium font-poppins text-gray-3 text-xs">
                  <span>Metric Tonnes CO</span>
                  <span className="text-6xs">2</span>e
                </div>
              </div>
            </div>
            <div className="self-stretch h-px relative box-border z-[1] border-t-[1px] border-solid border-gray-5" />
            <div className="self-stretch flex flex-row items-center justify-start py-0 px-6 gap-[29px] text-3xs mq450:flex-wrap">
              <div className="flex-1 flex flex-col items-start justify-start py-5 pr-[29px] pl-0 box-border gap-[10px] min-w-[107px]">
                <div className="flex flex-row items-end justify-start gap-[6px]">
                  <div className="h-3 w-3 relative rounded-[50%] bg-brand-color-2 z-[1]" />
                  <div className="relative capitalize font-medium z-[1] text-nowrap">
                    Stationary Combustion
                  </div>
                </div>
                <div className="flex flex-row items-end justify-start gap-[6px]">
                  <div className="h-3 w-3 relative rounded-[50%] bg-orange z-[1]" />
                  <div className="relative capitalize font-medium z-[1] text-nowrap">
                    Mobile Combustion
                  </div>
                </div>
                <div className="flex flex-row items-end justify-start gap-[6px]">
                  <div className="h-3 w-3 relative rounded-[50%] bg-brand-color-01 z-[1]" />
                  <div className="relative capitalize font-medium z-[1] text-nowrap">
                    Fugitive Emissions
                  </div>
                </div>
              </div>
              <div className="flex flex-col items-start justify-start py-5 px-0 gap-[10px] text-right">
                <div className="relative capitalize font-medium z-[1]">
                  {calculateC02ePercentageOfGivenScopeCategory(
                    "Stationary combustion"
                  )}
                  %
                </div>
                <div className="relative capitalize font-medium z-[1]">
                  {calculateC02ePercentageOfGivenScopeCategory(
                    "Mobile combustion"
                  )}
                  %
                </div>
                <div className="relative capitalize font-medium z-[1]">
                  {calculateC02ePercentageOfGivenScopeCategory(
                    "Fugitive emissions"
                  )}
                  %
                </div>
              </div>
              <div className="h-[130px] w-[130px] relative z-[1] mq450:flex-1">
                <ApexChart
                  scopes={[
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
        </div>
        <div className="self-stretch rounded-lg bg-white shadow-[0px_4px_60px_rgba(0,_0,_0,_0.02)] flex flex-col items-center justify-start pt-4 px-0 pb-0 gap-[18px]">
          <div className="self-stretch h-[282px] relative rounded-lg bg-white shadow-[0px_4px_60px_rgba(0,_0,_0,_0.02)] hidden" />
          <div className="self-stretch flex flex-col items-start justify-start py-0 px-6 gap-[6px] z-[1]">
            <div className="self-stretch flex flex-row items-center justify-between gap-[20px]">
              <div className="flex flex-row items-center justify-start gap-[8px]">
                <div className="relative capitalize font-medium">
                  Scope 2 Emissions
                </div>
                <div className="rounded-81xl bg-orange overflow-hidden flex flex-row items-center justify-center py-0.5 px-1 whitespace-nowrap text-right text-3xs text-white">
                  <div className="relative capitalize font-semibold">
                    <span>
                      {calculateC02ePercentageOfScope2(totalScope2CO2e)}
                    </span>
                    <span className="text-7xs">{` `}</span>
                    <span>%</span>
                  </div>
                </div>
              </div>
              <div className="h-5 w-5 relative">
                <div className="absolute h-full w-full top-[0%] right-[0%] bottom-[0%] left-[0%] rounded-[50%] bg-gray-6" />
                <div className="absolute h-[56.5%] w-[12.5%] top-[25%] right-[44%] bottom-[18.5%] left-[43.5%] z-[1]">
                  <div className="absolute h-[66.37%] w-full top-[32.74%] right-[0%] bottom-[0.88%] left-[0%] rounded-5xs-5 bg-gray-4" />
                  <div className="absolute h-[22.12%] w-full top-[0%] right-[0%] bottom-[77.88%] left-[0%] rounded-5xs-5 bg-gray-4" />
                </div>
              </div>
            </div>
            <div className="flex flex-col items-start justify-start text-13xl font-sf-pro-display">
              <div className="h-[38px] relative font-medium inline-block mq450:text-lgi mq1050:text-7xl">
                {totalScope2CO2e.toFixed(2)}
              </div>
              <div className="relative capitalize font-medium font-poppins text-gray-3 text-xs">
                <span>Metric Tonnes CO</span>
                <span className="text-6xs">2</span>e
              </div>
            </div>
          </div>
          <div className="self-stretch flex flex-col items-center justify-start text-sm">
            <div className="self-stretch h-px relative box-border z-[1] border-t-[1px] border-solid border-gray-5" />
            <div className="self-stretch flex flex-row items-center justify-start py-0 px-6 gap-[30px] shrink-0 mq750:flex-wrap">
              <div className="flex-1 flex flex-col items-start justify-start py-5 px-0 box-border gap-[24px] min-w-[138px]">
                <div className="h-[21px] relative capitalize font-medium inline-block z-[1]">
                  Location Based
                </div>
                <div className="self-stretch flex flex-col items-start justify-start gap-[10px] text-3xs">
                  <div className="self-stretch flex flex-row items-end justify-start gap-[6px] z-[1]">
                    <div className="h-3 w-3 relative rounded-[50%] bg-brand-color-2" />
                    <div className="flex-1 flex flex-col items-start justify-start">
                      <div className="relative capitalize font-medium">
                        Purchased Electricity
                      </div>
                    </div>
                    <div className="relative capitalize font-medium text-right">
                      {calculateC02ePercentageOfLocationBasedScopeCategory(
                        "Purchased electricity"
                      )}
                      %
                    </div>
                  </div>
                  <div className="self-stretch flex flex-row items-end justify-start gap-[6px] z-[1]">
                    <div className="h-3 w-3 relative rounded-[50%] bg-orange" />
                    <div className="flex-1 flex flex-col items-start justify-start">
                      <div className="relative capitalize font-medium">
                        Heat & Steam
                      </div>
                    </div>
                    <div className="relative capitalize font-medium text-right">
                      {calculateC02ePercentageOfLocationBasedScopeCategory(
                        "Heat and steam"
                      )}
                      %
                    </div>
                  </div>
                </div>
              </div>
              <div className="h-[130px] w-[130px] relative z-[1] mq450:flex-1">
                <ApexChart1
                  scopes={[
                    calculateC02ePercentageOfLocationBasedScopeCategory(
                      "Purchased electricity"
                    ),
                    calculateC02ePercentageOfLocationBasedScopeCategory(
                      "Heat & steam"
                    ),
                  ]}
                />
              </div>
              <div className="h-[162px] w-px relative box-border z-[1] border-r-[1px] border-solid border-gray-5 mq750:w-full mq750:h-px" />
              <div className="flex-1 flex flex-col items-start justify-start py-5 px-0 box-border gap-[24px] min-w-[138px]">
                <div className="h-[21px] relative capitalize font-medium inline-block z-[1]">
                  Market Based
                </div>
                <div className="self-stretch flex flex-col items-start justify-start gap-[10px] text-3xs">
                  <div className="self-stretch flex flex-row items-end justify-start gap-[6px] z-[1]">
                    <div className="h-3 w-3 relative rounded-[50%] bg-brand-color-2" />
                    <div className="flex-1 flex flex-col items-start justify-start">
                      <div className="relative capitalize font-medium">
                        Electricity
                      </div>
                    </div>
                    <div className="relative capitalize font-medium text-right">
                      {calculateC02ePercentageOfMarketBasedScopeCategory(
                        "Electricity"
                      )}
                      %
                    </div>
                  </div>
                  <div className="self-stretch flex flex-row items-end justify-start gap-[6px] z-[1]">
                    <div className="h-3 w-3 relative rounded-[50%] bg-orange" />
                    <div className="flex-1 flex flex-col items-start justify-start">
                      <div className="relative capitalize font-medium">
                        Heat & Steam
                      </div>
                    </div>
                    <div className="relative capitalize font-medium text-right">
                      {calculateC02ePercentageOfMarketBasedScopeCategory(
                        "Heat and steam"
                      )}
                      %
                    </div>
                  </div>
                </div>
              </div>
              <div className="h-[130px] w-[130px] relative z-[1] mq450:flex-1">
                <ApexChart1
                  scopes={[
                    calculateC02ePercentageOfMarketBasedScopeCategory(
                      "Electricity"
                    ),
                    calculateC02ePercentageOfMarketBasedScopeCategory(
                      "Heat & steam"
                    ),
                  ]}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="w-[418px] rounded-lg bg-white shadow-[0px_4px_60px_rgba(0,_0,_0,_0.02)] flex flex-col items-center justify-start pt-[18px] px-0 pb-4 box-border gap-[4px] min-w-[418px] max-w-full text-3xs lg:flex-1 mq750:min-w-full">
        <div className="self-stretch h-[582px] relative rounded-lg bg-white shadow-[0px_4px_60px_rgba(0,_0,_0,_0.02)] hidden" />
        <div className="self-stretch flex flex-row items-center justify-between py-0 px-6 gap-[20px] text-base">
          <div className="flex flex-row items-center justify-start gap-[8px]">
            <div className="relative capitalize font-medium z-[1]">
              Scope 3 Emissions
            </div>
            <div className="rounded-81xl bg-brand-color-01 overflow-hidden flex flex-row items-center justify-center py-0.5 pr-1.5 pl-1.5 whitespace-nowrap z-[1] text-right text-3xs text-white">
              <div className="relative capitalize font-semibold">
                <span>
                  {calculateC02ePercentageOfGivenScope(totalScope3CO2e)}
                </span>
                <span className="text-7xs">{` `}</span>
                <span>%</span>
              </div>
            </div>
          </div>
          <div className="h-5 w-5 relative z-[1]">
            <div className="absolute h-full w-full top-[0%] right-[0%] bottom-[0%] left-[0%] rounded-[50%] bg-gray-6" />
            <div className="absolute top-[8.8px] left-[8.8px] rounded-5xs-5 bg-gray-4 w-[2.5px] h-[7.5px] z-[1]" />
            <div className="absolute top-[5px] left-[8.8px] rounded-5xs-5 bg-gray-4 w-[2.5px] h-[2.5px] z-[1]" />
          </div>
        </div>
        <div className="self-stretch flex flex-row items-start justify-between pt-0 px-6 pb-[7px] gap-[20px] text-13xl font-sf-pro-display mq450:flex-wrap">
          <div className="flex flex-col items-start justify-start">
            <div className="h-[38px] relative font-medium inline-block z-[1] mq450:text-lgi mq1050:text-7xl">
              {totalScope3CO2e.toFixed(2)}
            </div>
            <div className="relative capitalize font-medium font-poppins text-gray-3 z-[2] text-xs">
              <span>Metric Tonnes CO</span>
              <span className="text-6xs">2</span>e
            </div>
          </div>
          <Circule
            data={scopeCategoriesCO2e}
            // data={seriesData}
          />
        </div>
        <div className="self-stretch h-3 flex flex-row items-start justify-start pt-0 px-0 pb-3 box-border max-w-full">
          <div className="h-px flex-1 relative box-border max-w-full z-[1] border-t-[1px] border-solid border-gray-5" />
        </div>
        <div className="self-stretch flex flex-row items-start justify-start pt-0 px-6 pb-[5px] box-border max-w-full">
          <div className="flex-1 flex flex-row items-end justify-start gap-[6px] max-w-full z-[1] mq450:flex-wrap">
            <div className="h-3 w-3 relative rounded-[50%] bg-brand-color-2 mq450:w-full" />
            <div className="flex-1 flex flex-col items-start justify-start min-w-[213px] max-w-full">
              <div className="relative capitalize font-medium">
                Purchased Goods and Services
              </div>
            </div>
            <div className="relative capitalize font-medium text-right mq450:w-full mq450:h-[18px]">
              {scopeCategoriesCO2e[0]}%
            </div>
          </div>
        </div>
        <div className="self-stretch flex flex-row items-start justify-start pt-0 px-6 pb-[5px] box-border max-w-full">
          <div className="flex-1 flex flex-row items-end justify-start gap-[6px] max-w-full z-[1] mq450:flex-wrap">
            <div className="h-3 w-3 relative rounded-[50%] bg-cornflowerblue mq450:w-full" />
            <div className="flex-1 flex flex-col items-start justify-start min-w-[213px] max-w-full">
              <div className="relative capitalize font-medium">
                Capital Goods
              </div>
            </div>
            <div className="relative capitalize font-medium text-right mq450:w-full mq450:h-[18px]">
              {scopeCategoriesCO2e[1]}%
            </div>
          </div>
        </div>
        <div className="self-stretch flex flex-row items-start justify-start pt-0 px-6 pb-[5px] box-border max-w-full">
          <div className="flex-1 flex flex-row items-end justify-start gap-[6px] max-w-full z-[1] mq450:flex-wrap">
            <div className="h-3 w-3 relative rounded-[50%] bg-mediumslateblue mq450:w-full" />
            <div className="flex-1 flex flex-col items-start justify-start min-w-[213px] max-w-full">
              <div className="relative capitalize font-medium">
                Fuel & Energy Related Activities
              </div>
            </div>
            <div className="relative capitalize font-medium text-right mq450:w-full mq450:h-[18px]">
              {scopeCategoriesCO2e[2]}%
            </div>
          </div>
        </div>
        <div className="self-stretch flex flex-row items-start justify-start pt-0 px-6 pb-[5px] box-border max-w-full">
          <div className="flex-1 flex flex-row items-start justify-between gap-[20px] max-w-full z-[1]">
            <div className="flex flex-row items-end justify-start gap-[6px]">
              <div className="h-3 w-3 relative rounded-[50%] bg-indianred-100" />
              <div className="relative capitalize font-medium">
                Upstream Transportation and Distribution
              </div>
            </div>
            <div className="relative capitalize font-medium text-right">
              {scopeCategoriesCO2e[3]}%
            </div>
          </div>
        </div>
        <div className="self-stretch flex flex-row items-start justify-start pt-0 px-6 pb-[5px] box-border max-w-full">
          <div className="flex-1 flex flex-row items-end justify-start gap-[6px] max-w-full z-[1] mq450:flex-wrap">
            <div className="h-3 w-3 relative rounded-[50%] bg-mediumaquamarine mq450:w-full" />
            <div className="flex-1 flex flex-col items-start justify-start min-w-[213px] max-w-full">
              <div className="relative capitalize font-medium">
                Waste Generated in Operations
              </div>
            </div>
            <div className="relative capitalize font-medium text-right mq450:w-full mq450:h-[18px]">
              {scopeCategoriesCO2e[4]}%
            </div>
          </div>
        </div>
        <div className="self-stretch flex flex-row items-start justify-start pt-0 px-6 pb-[5px] box-border max-w-full">
          <div className="flex-1 flex flex-row items-end justify-start gap-[6px] max-w-full z-[1] mq450:flex-wrap">
            <div className="h-3 w-3 relative rounded-[50%] bg-green-1 mq450:w-full" />
            <div className="flex-1 flex flex-col items-start justify-start min-w-[213px] max-w-full">
              <div className="relative capitalize font-medium">
                Business Travel
              </div>
            </div>
            <div className="relative capitalize font-medium text-right mq450:w-full mq450:h-[18px]">
              {scopeCategoriesCO2e[5]}%
            </div>
          </div>
        </div>
        <div className="self-stretch flex flex-row items-start justify-start pt-0 px-6 pb-[5px] box-border max-w-full">
          <div className="flex-1 flex flex-row items-end justify-start gap-[6px] max-w-full z-[1] mq450:flex-wrap">
            <div className="h-3 w-3 relative rounded-[50%] bg-skyblue mq450:w-full" />
            <div className="flex-1 flex flex-col items-start justify-start min-w-[213px] max-w-full">
              <div className="relative capitalize font-medium">
                Employee Commuting
              </div>
            </div>
            <div className="relative capitalize font-medium text-right mq450:w-full mq450:h-[18px]">
              {scopeCategoriesCO2e[6]}%
            </div>
          </div>
        </div>
        <div className="self-stretch flex flex-row items-start justify-start pt-0 px-6 pb-[5px] box-border max-w-full">
          <div className="flex-1 flex flex-row items-end justify-start gap-[6px] max-w-full z-[1] mq450:flex-wrap">
            <div className="h-3 w-3 relative rounded-[50%] bg-mediumorchid mq450:w-full" />
            <div className="flex-1 flex flex-col items-start justify-start min-w-[213px] max-w-full">
              <div className="relative capitalize font-medium">
                Upstream Leased Assets
              </div>
            </div>
            <div className="relative capitalize font-medium text-right mq450:w-full mq450:h-[18px]">
              {scopeCategoriesCO2e[7]}%
            </div>
          </div>
        </div>
        <div className="self-stretch flex flex-row items-start justify-start pt-0 px-6 pb-[5px] box-border max-w-full">
          <div className="flex-1 flex flex-row items-start justify-between gap-[20px] max-w-full z-[1]">
            <div className="flex flex-row items-end justify-start gap-[6px]">
              <div className="h-3 w-3 relative rounded-[50%] bg-violet" />
              <div className="relative capitalize font-medium">
                Downstream Transportation and Distribution
              </div>
            </div>
            <div className="relative capitalize font-medium text-right">
              {scopeCategoriesCO2e[8]}%
            </div>
          </div>
        </div>
        <div className="self-stretch flex flex-row items-start justify-start pt-0 px-6 pb-[5px] box-border max-w-full">
          <div className="flex-1 flex flex-row items-end justify-start gap-[6px] max-w-full z-[1] mq450:flex-wrap">
            <div className="h-3 w-3 relative rounded-[50%] bg-goldenrod mq450:w-full" />
            <div className="flex-1 flex flex-col items-start justify-start min-w-[213px] max-w-full">
              <div className="relative capitalize font-medium">
                Processing of Sold Products
              </div>
            </div>
            <div className="relative capitalize font-medium text-right mq450:w-full mq450:h-[18px]">
              {scopeCategoriesCO2e[9]}%
            </div>
          </div>
        </div>
        <div className="self-stretch flex flex-row items-start justify-start pt-0 px-6 pb-[5px] box-border max-w-full">
          <div className="flex-1 flex flex-row items-end justify-start gap-[6px] max-w-full z-[1] mq450:flex-wrap">
            <div className="h-3 w-3 relative rounded-[50%] bg-forestgreen mq450:w-full" />
            <div className="flex-1 flex flex-col items-start justify-start min-w-[213px] max-w-full">
              <div className="relative capitalize font-medium">
                Use of Sold Products
              </div>
            </div>
            <div className="relative capitalize font-medium text-right mq450:w-full mq450:h-[18px]">
              {scopeCategoriesCO2e[10]}%
            </div>
          </div>
        </div>
        <div className="self-stretch flex flex-row items-start justify-start pt-0 px-6 pb-[5px] box-border max-w-full">
          <div className="flex-1 flex flex-row items-start justify-between gap-[20px] max-w-full z-[1]">
            <div className="flex flex-row items-end justify-start gap-[6px]">
              <div className="h-3 w-3 relative rounded-[50%] bg-darkcyan" />
              <div className="relative capitalize font-medium">
                End-of-Life Treatment of Sold Products
              </div>
            </div>
            <div className="relative capitalize font-medium text-right">
              {scopeCategoriesCO2e[11]}%
            </div>
          </div>
        </div>
        <div className="self-stretch flex flex-row items-start justify-start pt-0 px-6 pb-[5px] box-border max-w-full">
          <div className="flex-1 flex flex-row items-end justify-start gap-[6px] max-w-full z-[1] mq450:flex-wrap">
            <div className="h-3 w-3 relative rounded-[50%] bg-brand-color-01 mq450:w-full" />
            <div className="flex-1 flex flex-col items-start justify-start min-w-[213px] max-w-full">
              <div className="relative capitalize font-medium">
                Downstream Leased Assets
              </div>
            </div>
            <div className="relative capitalize font-medium text-right mq450:w-full mq450:h-[18px]">
              {scopeCategoriesCO2e[12]}%
            </div>
          </div>
        </div>
        <div className="self-stretch flex flex-row items-start justify-start pt-0 px-6 pb-[5px] box-border max-w-full">
          <div className="flex-1 flex flex-row items-end justify-start gap-[6px] max-w-full z-[1] mq450:flex-wrap">
            <div className="h-3 w-3 relative rounded-[50%] bg-gold mq450:w-full" />
            <div className="flex-1 flex flex-col items-start justify-start min-w-[213px] max-w-full">
              <div className="relative capitalize font-medium">Franchises</div>
            </div>
            <div className="relative capitalize font-medium text-right mq450:w-full mq450:h-[18px]">
              {scopeCategoriesCO2e[13]}%
            </div>
          </div>
        </div>
        <div className="self-stretch flex flex-row items-start justify-start py-0 px-6 box-border gap-[6px] max-w-full z-[1] mq450:flex-wrap">
          <div className="h-3 w-3 relative rounded-[50%] bg-orange mq450:w-full" />
          <div className="flex-1 flex flex-col items-start justify-start min-w-[213px] max-w-full">
            <div className="relative capitalize font-medium">Investments</div>
          </div>
          <div className="relative capitalize font-medium text-right mq450:w-full mq450:h-[18px]">
            {scopeCategoriesCO2e[14]}%
          </div>
        </div>
      </div>
    </section>
  );
};

export default AirTravelScope;
