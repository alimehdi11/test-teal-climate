import React from "react";
import ReactApexChart from "react-apexcharts";

const ApexChart = ({ scopes }) => {
  // Calculate percentages
  const percentages = scopes.map((scope) => scope);

  // Series data for the chart
  const series = percentages;

  // Options for the chart
  const options = {
    chart: {
      height: 170,
      width: 170,
      type: "radialBar",
    },
    plotOptions: {
      radialBar: {
        hollow: {
          margin: 15,
          size: "20%",
          borderRadius: "5px", // Set border radius for the inner circle
        },
        track: {
          strokeWidth: "100%", // Set the stroke width of the track
          strokeLinecap: "round", // Set the line cap for the track
          borderRadius: "10px", // Set border radius for the outer circle
        },
        dataLabels: {
          show: false, // Hide series values
        },
      },
    },
    tooltip: {
      enabled: false, // Disable tooltip
    },
    // Custom SVG for endpoint
    stroke: {
      lineCap: "round", // Set the line cap for the stroke
      width: 10, // Set the width of the stroke
    },
  };

  return (
    <div className="w-40 h-40 rounded-full overflow-hidden">
      <ReactApexChart
        options={options}
        series={series}
        type="radialBar"
        height={170}
        width={170}
      />
    </div>
  );
};

export default ApexChart;
