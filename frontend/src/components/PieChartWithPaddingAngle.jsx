import { PureComponent } from "react";
import { PieChart, Pie, Cell } from "recharts";

const data = [
  { name: "Group 1", value: 100 },
  { name: "Group 2", value: 200 },
  { name: "Group 3", value: 300 },
  { name: "Group 4", value: 400 },
  { name: "Group 5", value: 500 },
  { name: "Group 6", value: 600 },
  { name: "Group 7", value: 700 },
  { name: "Group 8", value: 800 },
  { name: "Group 9", value: 900 },
  { name: "Group 10", value: 1000 },
  { name: "Group 11", value: 1100 },
  { name: "Group 12", value: 1200 },
  { name: "Group 13", value: 1300 },
  { name: "Group 14", value: 1400 },
  { name: "Group 15", value: 1500 },
];

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

export default class Example extends PureComponent {
  render() {
    return (
      <PieChart
        width={160}
        height={160}
        fill="#EEEEEE"
        onMouseEnter={this.onPieEnter}
      >
        <Pie data={data} innerRadius={50} outerRadius={66} dataKey="value">
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index]} />
          ))}
        </Pie>
      </PieChart>
    );
  }
}
