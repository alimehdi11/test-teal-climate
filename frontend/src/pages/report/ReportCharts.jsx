import { toPng } from "html-to-image";
import React, { useEffect, useRef, useState } from "react";
import { PieChart, Pie, Cell, BarChart, Bar } from "recharts";
import { useEmissionContext } from "../../contexts/EmissionsContext";
import Loader from "../../components/ui/Loader";

const COLORS = ["#FFA400", "#197EC6", "#00CC9C"];

const pieData = [
  { name: "Group A", value: 40 },
  { name: "Group B", value: 30 },
  { name: "Group C", value: 30 },
];

const Emissions = [
  {
    name: "scope1Chart",
    colors: ["#EB5757", "#FFCA2A", "#165DFF"],
    keys: {
      stationaryCombustion: 10,
      mobileCombustion: 10,
      fugitiveEmissions: 10,
    },
  },
  {
    name: "scope2Chart",
    colors: ["#FFA400", "#0085FF"],
    keys: {
      purchasedElectricity: 10,
      heatAndSteam: 10,
    },
  },
  {
    name: "scope3Chart",
    colors: [
      "#FFA400",
      "#FFCA2A",
      "#00CC9C",
      "#1F8A7D",
      "#32B950",
      "#E6BA1F",
      "#FD8BFF",
      "#BB6BD9",
      "#56CCF2",
      "#219653",
      "#85E0AB",
      "#EB5757",
      "#5D5FEF",
      "#A5A6F6",
      "#197EC6",
    ],
    keys: {
      purchasedGoodsAndServices: 10,
      capitalGoods: 10,
      upstreamTransportationAndDistribution: 10,
      wasteGeneratedInOperations: 10,
      businessTravel: 10,
      employeeCommuting: 10,
      upstreamLeasedAssets: 10,
      downstreamTransportationAndDistribution: 10,
      processingOfSoldProducts: 10,
      useOfSoldProducts: 10,
      endOfLifeTreatmentOfSoldProducts: 10,
      downstreamLeasedAssets: 10,
      franchises: 10,
      investments: 10,
    },
  },
];

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
        />
      ))}
    </BarChart>
  );
};

const CircularPieChart = () => (
  <PieChart width={300} height={300}>
    <Pie
      data={pieData}
      cx="50%"
      cy="50%"
      outerRadius={80}
      dataKey="value"
      isAnimationActive={false}
    >
      {pieData.map((_, index) => (
        <Cell key={`cell-${index}`} fill={COLORS[index]} />
      ))}
    </Pie>
  </PieChart>
);

const ReportCharts = () => {
  const { setCharts } = useEmissionContext();

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
          <CircularPieChart />
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
