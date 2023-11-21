import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../Hooks/useAxiosSecure";
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid } from "recharts";

const AdminBarChart = () => {
  const axiosSecure = useAxiosSecure();

  const { data: chartData = [] } = useQuery({
    queryKey: ["orderStates"],
    queryFn: async () => {
      const res = await axiosSecure.get("/orderStates");
      return res.data;
    },
  });

  const colors = ["#2677b5", "#f68010", "#34a02c", "#d62728", "#121212"];

  const getPath = (x, y, width, height) => {
    return `M${x},${y + height}C${x + width / 3},${y + height} ${
      x + width / 2
    },${y + height / 3}
    ${x + width / 2}, ${y}
    C${x + width / 2},${y + height / 3} ${x + (2 * width) / 3},${y + height} ${
      x + width
    }, ${y + height}
    Z`;
  };

  const TriangleBar = (props) => {
    const { fill, x, y, width, height } = props;

    return <path d={getPath(x, y, width, height)} stroke="none" fill={fill} />;
  };

  return (
    <div className="overflow-auto">
      <BarChart
        width={540}
        height={400}
        data={chartData}
        margin={{
          top: 0,
          right: 4,
          left: -16,
          bottom: 0,
        }}
      >
        <CartesianGrid strokeDasharray="" />
        <XAxis dataKey="category" />
        <YAxis />
        <Bar
          dataKey="quantity"
          fill="#8884d8"
          shape={<TriangleBar />}
          label={{ position: "top" }}
        >
          {chartData.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={colors[index % 5]} />
          ))}
        </Bar>
      </BarChart>
    </div>
  );
};

export default AdminBarChart;
