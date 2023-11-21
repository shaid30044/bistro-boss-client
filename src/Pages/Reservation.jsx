import DashboardSideBar from "../Components/DashboardSideBar";

const Reservation = () => {
  return (
    <div className="md:flex">
      <DashboardSideBar />
      <div className="px-4 md:px-10 lg:px-40 pt-6 pb-12 md:py-12">
        <h1>User Home</h1>
      </div>
    </div>
  );
};

export default Reservation;
