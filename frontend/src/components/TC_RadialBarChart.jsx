import { RadialBarChart, RadialBar, ResponsiveContainer } from "recharts";

// Component name is prefixed with company name initial letters (TC_) to avoid naming conflict
const TC_RadialBarChart = ({ data }) => {
  const COLORS = ["#197EC6", "#00CC9C", "#FFA400"];

  data = data.map((value, index) => {
    return {
      fill: COLORS[index],
      value: Number(value),
    };
  });

  /**
   *  Making sure data array has 3 elements so it can render 3 radials.
   *  If data argument array is passed with less then 3 elements.
   */
  while (data.length < 3) {
    data.push(0);
  }

  data.reverse();

  return (
    <ResponsiveContainer width="100%" height="100%" className="-mx-6">
      <RadialBarChart
        innerRadius="50%"
        outerRadius="120%"
        barSize={9}
        data={data}
      >
        <RadialBar minAngle={15} background clockWise dataKey="value" />
      </RadialBarChart>
    </ResponsiveContainer>
  );
};

export default TC_RadialBarChart;
