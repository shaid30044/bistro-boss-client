import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../Hooks/useAxiosSecure";
import { PieChart, Pie, Cell } from "recharts";

const AdminPieChart = () => {
  const axiosSecure = useAxiosSecure();

  const { data: chartData = [] } = useQuery({
    queryKey: ["orderStates"],
    queryFn: async () => {
      const res = await axiosSecure.get("/orderStates");
      return res.data;
    },
  });

  const data = chartData.map((data) => {
    return {
      name: data.category,
      value: data.revenue,
    };
  });

  const colors = ["#2e87fe", "#42c49f", "#f9bb27", "#f68143", "#333333"];

  const RADIAN = Math.PI / 180;
  const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
  }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text
        x={x}
        y={y}
        fill="white"
        textAnchor={x > cx ? "start" : "end"}
        dominantBaseline="central"
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  return (
    <div>
      <PieChart width={400} height={400}>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          labelLine={false}
          label={renderCustomizedLabel}
          outerRadius={140}
          fill="#8884d8"
          dataKey="value"
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
          ))}
        </Pie>
      </PieChart>
    </div>
  );
};

export default AdminPieChart;
