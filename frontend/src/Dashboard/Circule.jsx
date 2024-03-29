import React from "react";
import ReactApexChart from "react-apexcharts";

const Circule = ({ data }) => {
  let seriesData = data.filter((item) => {
    return item !== 0;
  });
  // Extracting series data from the provided data array
  seriesData = seriesData.map((item) => ({ value: item }));

  // Options for the chart
  const options = {
    series: seriesData,
    chart: {
      width: 142,
      type: "donut",
    },
    dataLabels: {
      enabled: false, // Disabling default data labels
    },
    responsive: [
      {
        breakpoint: 480,
        options: {
          chart: {
            width: 142,
          },
          legend: {
            show: false, // Hide legend
          },
        },
      },
    ],
    legend: {
      show: false, // Hide legend by default
    },
    tooltip: {
      enabled: true, // Disable tooltip
    },
  };

  // Render a gradient donut chart if no data is provided
  if (seriesData.length === 0) {
    return (
      <ReactApexChart
        options={options}
        series={[1, 1, 1, 1, 1]} // Provide a dummy series to render the chart initially
        type="donut"
        height={150}
        width={150}
      />
    );
  }

  // Render the chart with actual data
  return (
    <ReactApexChart
      options={options}
      series={seriesData}
      type="donut"
      height={150}
      width={150}
    />
  );
};

export default Circule;
