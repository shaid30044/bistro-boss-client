import { Helmet } from "react-helmet-async";
import DashboardSideBar from "../Components/DashboardSideBar";
import { useContext } from "react";
import { AuthContext } from "../Provider/AuthProvider";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../Hooks/useAxiosSecure";
import { IoIosWallet } from "react-icons/io";
import { HiMiniUserGroup } from "react-icons/hi2";
import { LuChefHat } from "react-icons/lu";
import { FaTruck } from "react-icons/fa6";
import { BsFillSuitDiamondFill } from "react-icons/bs";
import AdminBarChart from "../Components/AdminBarChart";
import AdminPieChart from "../Components/AdminPieChart";

const AdminHome = () => {
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();

  const { data: analysis = {} } = useQuery({
    queryKey: ["adminAnalysis"],
    queryFn: async () => {
      const res = await axiosSecure.get("/adminAnalysis");
      return res.data;
    },
  });

  const { data: chartData = [] } = useQuery({
    queryKey: ["orderStates"],
    queryFn: async () => {
      const res = await axiosSecure.get("/orderStates");
      return res.data;
    },
  });

  const cards = [
    {
      icon: IoIosWallet,
      title: "Revenue",
      value: analysis?.revenue,
      fixed: 2,
      color1: "#BB34F5",
      color2: "#FCDBFF",
    },
    {
      icon: HiMiniUserGroup,
      title: "Customers",
      value: analysis?.users,
      fixed: 0,
      color1: "#D3A256",
      color2: "#FDE8C0",
    },
    {
      icon: LuChefHat,
      title: "Products",
      value: analysis?.products,
      fixed: 0,
      color1: "#FE4880",
      color2: "#FECDE9",
    },
    {
      icon: FaTruck,
      title: "Orders",
      value: analysis?.orders,
      fixed: 0,
      color1: "#6AAEFF",
      color2: "#B6F7FF",
    },
  ];

  const colors = ["#2e87fe", "#42c49f", "#f9bb27", "#f68143", "#333333"];

  return (
    <div className=" justify-between">
      <Helmet>
        <title>Bistro Boss | Admin Home</title>
      </Helmet>

      <div className="fixed z-50">
        <DashboardSideBar />
      </div>

      <div className="bg-dark7 w-full px-4 md:pr-10 md:pl-[280px] lg:pr-16 lg:pl-[320px] pt-6 pb-12 md:py-12">
        <div className="text-2xl md:text-3xl font-semibold text-dark1 font-cinzel pt-12 md:pt-0">
          Hi, Welcome {user.displayName ? user.displayName : "Back"}!
        </div>
        <div>
          <div className="lg:grid grid-cols-2 justify-center gap-6 font-inter py-8">
            {cards.map((card, index) => (
              <div
                key={index}
                style={{
                  background: `linear-gradient(45deg, ${card.color1}, ${card.color2})`,
                }}
                className="flex justify-center items-center gap-8 from-primary-500 to-primary-300 text-white rounded-xl p-5 mb-4 lg:mb-0"
              >
                <p className="text-6xl">{<card.icon />}</p>
                <div>
                  <p className="text-4xl font-extrabold">{card?.value}</p>
                  <p className="text-2xl">{card.title}</p>
                </div>
              </div>
            ))}
          </div>

          {/* charts */}

          <div className="grid lg:grid-cols-2 justify-center items-center gap-6 bg-white px-4 pt-16 lg:pt-8 mt-20">
            <AdminBarChart />

            <div className="flex justify-center pt-20">
              <div>
                <div className="grid grid-cols-3 lg:grid-cols-5 justify-center items-center gap-4 px-4">
                  {chartData.map((data, idx) => (
                    <div
                      key={idx}
                      style={{ color: colors[idx % colors.length] }}
                      className="flex items-center gap-1 uppercase"
                    >
                      <BsFillSuitDiamondFill className="text-xl" />
                      <p>{data.category}</p>
                    </div>
                  ))}
                </div>

                <AdminPieChart />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminHome;
