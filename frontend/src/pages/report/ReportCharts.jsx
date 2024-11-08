import { toPng } from "html-to-image";
import React, { useEffect, useRef } from "react";
import { PieChart, Pie, Cell, BarChart, Bar } from "recharts";
import { useEmissionContext } from "../../contexts/EmissionsContext";
import Loader from "../../components/ui/Loader";

const COLORS = ["#197EC6", "#00CC9C", "#FFA400"];

const renderCustomBar = (props) => {
  const { x, y, width, height, fill } = props;

  return (
    <rect
      x={x}
      y={y}
      width={width}
      height={height}
      fill={fill}
      rx={8} 
      ry={8} 
    />
  );
};

const StackedBarChart = ({ colors, keys }) => {
  const data = [{ ...keys }];
  const bars = Object.keys(data[0]);

  return (
    <BarChart width={200} height={400} data={data} isAnimationActive={false}>
      {bars.map((key, index) => (
        <Bar
          key={key}
          dataKey={key}
          stackId="a"
          fill={colors[index]}
          isAnimationActive={false}
          shape={renderCustomBar} // Use the custom shape function
        />
      ))}
    </BarChart>
  );
};

const CircularPieChart = ({ data }) => (
  <PieChart width={300} height={300}>
    <Pie
      data={data}
      cx="50%"
      cy="50%"
      outerRadius={80}
      dataKey="value"
      isAnimationActive={false}
    >
      {data.map((_, index) => (
        <Cell key={`cell-${index}`} fill={COLORS[index]} />
      ))}
    </Pie>
  </PieChart>
);

const ReportCharts = () => {
  const { setCharts, emissionStates, emissionsCalculationsFunctions } =
    useEmissionContext();
  const {
    calculateC02ePercentageOfGivenScope,
    calculateC02ePercentageOfScope2,
    calculateC02ePercentageOfGivenScopeCategory,
    calculateC02ePercentageOfLocationBasedScopeCategory,
  } = emissionsCalculationsFunctions;
  const { totalScope1CO2e, totalScope3CO2e, scope3CategoriesCO2e } =
    emissionStates;

  const pieData = [
    {
      name: "Scope 1",
      value: +calculateC02ePercentageOfGivenScope(totalScope1CO2e),
    },
    { name: "Scope 2", value: +calculateC02ePercentageOfScope2() },
    {
      name: "Scope 3",
      value: +calculateC02ePercentageOfGivenScope(totalScope3CO2e),
    },
  ];

  const Emissions = [
    {
      name: "scope1Chart",
      colors: ["#197EC6", "#FFCA2A", "#EB5757"],
      keys: {
        stationaryCombustion: calculateC02ePercentageOfGivenScopeCategory(
          "Stationary combustion"
        ),
        mobileCombustion:
          calculateC02ePercentageOfGivenScopeCategory("Mobile combustion"),
        fugitiveEmissions:
          calculateC02ePercentageOfGivenScopeCategory("Fugitive emissions"),
      },
    },
    {
      name: "scope2Chart",
      colors: ["#0085FF", "#FFA400"],
      keys: {
        purchasedElectricity:
          calculateC02ePercentageOfLocationBasedScopeCategory(
            "Purchased electricity"
          ),
        heatAndSteam:
          calculateC02ePercentageOfLocationBasedScopeCategory("Heat and steam"),
      },
    },
    {
      name: "scope3Chart",
      colors: [
        "#197EC6",
        "#A5A6F6",
        "#5D5FEF",
        "#EB5757",
        "#85E0AB",
        "#219653",
        "#56CCF2",
        "#BB6BD9",
        "#FD8BFF",
        "#E6BA1F",
        "#32B950",
        "#1F8A7D",
        "#00CC9C",
        "#FFCA2A",
        "#FFA400",
      ],
      keys: {
        purchasedGoodsAndServices: scope3CategoriesCO2e[0],
        capitalGoods: scope3CategoriesCO2e[1],
        fuelAndEnergyRelatedActivites: scope3CategoriesCO2e[2],
        upstreamTransportationAndDistribution: scope3CategoriesCO2e[3],
        wasteGeneratedInOperations: scope3CategoriesCO2e[4],
        businessTravel: scope3CategoriesCO2e[5],
        employeeCommuting: scope3CategoriesCO2e[6],
        upstreamLeasedAssets: scope3CategoriesCO2e[7],
        downstreamTransportationAndDistribution: scope3CategoriesCO2e[8],
        processingOfSoldProducts: scope3CategoriesCO2e[9],
        useOfSoldProducts: scope3CategoriesCO2e[10],
        endOfLifeTreatmentOfSoldProducts: scope3CategoriesCO2e[11],
        downstreamLeasedAssets: scope3CategoriesCO2e[12],
        franchises: scope3CategoriesCO2e[13],
        investments: scope3CategoriesCO2e[14],
      },
    },
  ];

  const chartRefs = useRef({
    pieChart: useRef(),
    scope1Chart: useRef(),
    scope2Chart: useRef(),
    scope3Chart: useRef(),
  });
  const captureImage = async (chartName) => {
    if (chartRefs.current[chartName]?.current) {
      try {
        // Directly capture the image without any delay
        const dataUrl = await toPng(chartRefs.current[chartName].current, {
          pixelRatio: 3,
        });
        setCharts((prev) => ({ ...prev, [chartName]: dataUrl }));
      } catch (error) {
        console.error(`Error capturing image for ${chartName}:`, error);
      }
    }
  };

  useEffect(() => {
    const captureAllCharts = async () => {
      // Using Promise.all to capture images concurrently
      await Promise.all(
        Object.keys(chartRefs.current).map((chartName) =>
          captureImage(chartName)
        )
      );
    };

    captureAllCharts();
  }, [setCharts]);
  return (
    <>
      <Loader />
      <div className="inline-block">
        {/* Pie Chart */}
        <div className="inline-block" ref={chartRefs.current.pieChart}>
          <CircularPieChart data={pieData} />
        </div>

        {/* Stacked Bar Charts */}
        {Emissions.map((emission, index) => (
          <div key={index} ref={chartRefs.current[emission.name]}>
            <StackedBarChart colors={emission.colors} keys={emission.keys} />
          </div>
        ))}
      </div>
    </>
  );
};

export default ReportCharts;
