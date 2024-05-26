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
      enabled: true, // Enabled tooltip
    },
  };

  // Render a gradient donut chart if no data is provided
  if (seriesData.length === 0) {
    // default color
    options.colors = ["#E9E9E9"];
    options.tooltip = {
      enabled: false, // Disable tooltip
    };

    return (
      <ReactApexChart
        options={options}
        series={[1]} // Provide a dummy series to render the chart initially
        type="donut"
        height={150}
        width={150}
      />
    );
  } else {
    // color representing data
    options.colors = [
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
    ];
    options.labels = [
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
    return (
      <ReactApexChart
        options={options}
        series={seriesData} // Render the chart with actual data
        type="donut"
        height={150}
        width={150}
      />
    );
  }
};

export default Circule;
