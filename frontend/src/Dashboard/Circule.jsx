import React from 'react';
import ReactApexChart from 'react-apexcharts';

const Circule = ({ data }) => {
    // Extracting series data from the provided data array
    const seriesData = data.map(({ value }) => value);

    // Options for the chart
    const options = {
        series: seriesData,
        chart: {
            width: 142,
            type: 'donut',
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
            enabled: false, // Disable tooltip
        },
    };

    return <ReactApexChart options={options} series={seriesData} type="donut" height={150} width={150} />;
};

export default Circule;
