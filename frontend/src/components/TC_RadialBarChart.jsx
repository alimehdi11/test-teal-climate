import { RadialBarChart, RadialBar, ResponsiveContainer } from "recharts";

// Component name is prefixed with company name initial letters (TC_) to avoid naming conflict
const TC_RadialBarChart = ({ data }) => {
  const COLORS = ["#197EC6", "#FFA400", "#00CC9C"];

  data = data.map((value, index) => {
    return {
      fill: COLORS[index],
      value: Number(value),
    };
  });

  return (
    <ResponsiveContainer width="100%" height="100%">
      <RadialBarChart
        innerRadius="120%"
        outerRadius="32%"
        barSize={12}
        data={data}
      >
        <RadialBar minAngle={15} background clockWise dataKey="value" />
      </RadialBarChart>
    </ResponsiveContainer>
  );
};

export default TC_RadialBarChart;
