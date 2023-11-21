import { Helmet } from "react-helmet-async";
import DashboardSideBar from "../Components/DashboardSideBar";
import SectionTitle from "../Components/SectionTitle";
import { RiDeleteBin6Line } from "react-icons/ri";
import { LiaEditSolid } from "react-icons/lia";
import Swal from "sweetalert2";
import useAxiosSecure from "../Hooks/useAxiosSecure";
import useMenu from "../Hooks/useMenu";
import { Link } from "react-router-dom";

const ManageItems = () => {
  const [menu, refetch] = useMenu();
  const axiosSecure = useAxiosSecure();

  const handleDelete = (item) => {
    Swal.fire({
      title: "Are you sure?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete item.",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const res = await axiosSecure.delete(`/menu/${item._id}`);

        if (res.data.deletedCount) {
          refetch();

          Swal.fire({
            title: "Success!",
            text: `${item.name} has been deleted.`,
            icon: "success",
            confirmButtonText: "Close",
          });
        }
      }
    });
  };

  return (
    <div className=" justify-between bg-dark9">
      <Helmet>
        <title>Bistro Boss | Manage Items</title>
      </Helmet>

      <div className="fixed z-50">
        <DashboardSideBar />
      </div>

      <div className="w-full px-4 md:pr-10 md:pl-[280px] lg:pr-40 lg:pl-[400px] pt-6 pb-12 md:py-12">
        <div>
          <SectionTitle
            subtitle={"---Hurry Up!---"}
            title={"MANAGE ALL ITEMS"}
          />
          <div className="bg-white p-6 lg:p-12">
            <div className="relative grid grid-cols-3 items-center gap-2 lg:gap-6 text-lg lg:text-2xl font-bold text-dark1 font-cinzel">
              <h1 className="col-span-2 lg:col-span-1">
                Total Items: {menu.length}
              </h1>
            </div>

            {/* table */}

            <div className="overflow-x-auto mt-12">
              <table className="table table-md lg:table-lg">
                <thead className="text-base font-medium text-white rounded-t-lg">
                  <tr className="bg-brown4 uppercase">
                    <td></td>
                    <td>Item Image</td>
                    <td>Item Name</td>
                    <td className="text-center">Price</td>
                    <td className="text-center">Action</td>
                    <td className="text-center">Action</td>
                  </tr>
                </thead>

                <tbody>
                  {menu.map((item, idx) => (
                    <tr key={idx} className="text-dark3">
                      <th>{idx + 1}</th>
                      <td>
                        <img src={item.image} className="h-16 w-24 mr-16" />
                      </td>
                      <td>{item.name}</td>
                      <td>${item.price}</td>
                      <td>
                        <Link
                          to={`/dashboard/manageItems/updateItem/${item._id}`}
                        >
                          <button className="flex btn text-xl text-white bg-brown4 hover:bg-brown4 border-none rounded-md text-center px-3 m-auto">
                            <LiaEditSolid />
                          </button>
                        </Link>
                      </td>
                      <td>
                        <button
                          onClick={() => handleDelete(item)}
                          className="flex btn text-xl text-white bg-red hover:bg-red border-none rounded-md text-center px-3 m-auto"
                        >
                          <RiDeleteBin6Line />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManageItems;
