import { PieChart, Pie, Cell } from "recharts";

// Component name is prefixed with company name initial letters (TC_) to avoid naming conflict
const TC_PieChart = ({ data }) => {
  const COLORS = [
    "#197ec6", // tc-blue
    "#a5a6f6", // corn-flower-blue
    "#5d5fef", // medium-slate-blue
    "#eb5757", // indian-red-100
    "#85e0ab", // medium-aqua-marine
    "#219653", // green-1
    "#56ccf2", // sky-blue
    "#bb6bd9", // medium-orchid
    "#fd8bff", // violet
    "#e6ba1f", // golden-rod
    "#32b950", // forest-green
    "#1f8a7d", // dark-cyan
    "#00cc9c", // tc-green
    "#ffca2a", // gold
    "#ffa400", // orange
  ];

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

  data = data.map((value, index) => {
    return {
      value: Number(value),
      name: scope3Categories[index],
    };
  });

  return (
    <PieChart width={160} height={160} fill="#EEEEEE">
      <Pie data={data} innerRadius={50} outerRadius={66} dataKey="value">
        {data.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={COLORS[index]} />
        ))}
      </Pie>
    </PieChart>
  );
};

export default TC_PieChart;
