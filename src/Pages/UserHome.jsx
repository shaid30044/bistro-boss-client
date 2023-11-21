import { Helmet } from "react-helmet-async";
import DashboardSideBar from "../Components/DashboardSideBar";
import { useContext } from "react";
import { AuthContext } from "../Provider/AuthProvider";

const UserHome = () => {
  const { user } = useContext(AuthContext);

  return (
    <div className=" justify-between">
      <Helmet>
        <title>Bistro Boss | User Home</title>
      </Helmet>

      <div className="fixed z-50">
        <DashboardSideBar />
      </div>

      <div className="w-full px-4 md:pr-10 md:pl-[280px] lg:pr-40 lg:pl-[400px] pt-6 pb-12 md:py-12">
        <div className="text-2xl md:text-3xl font-semibold text-dark1 font-cinzel pt-12 md:pt-0 pb-16 lg:pb-24">
          Hi, Welcome {user.displayName ? user.displayName : "Back"}!
        </div>
      </div>
    </div>
  );
};

export default UserHome;
