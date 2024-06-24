import { PureComponent } from "react";
import { RadialBarChart, RadialBar, ResponsiveContainer } from "recharts";

export default class Example extends PureComponent {
  render() {
    const COLORS = ["#197EC6", "#FFA400", "#00CC9C"];

    let data = this.props.scopes;
    data = data.map((scope, index) => {
      return {
        value: data.length - index,
        fill: COLORS[index],
        // value: scope,
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
  }
}
