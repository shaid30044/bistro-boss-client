import { Helmet } from "react-helmet-async";
import DashboardSideBar from "../Components/DashboardSideBar";
import SectionTitle from "../Components/SectionTitle";
import { RiDeleteBin6Line } from "react-icons/ri";
import { HiMiniUserGroup } from "react-icons/hi2";
import Swal from "sweetalert2";
import useAxiosSecure from "../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";

const AllUsers = () => {
  const { data: users = [], refetch } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await axiosSecure.get("/users");
      return res.data;
    },
  });

  const axiosSecure = useAxiosSecure();

  const handleMakeAdmin = (user) => {
    Swal.fire({
      title: "Are you sure?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes.",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.patch(`/users/admin/${user._id}`).then((res) => {
          console.log(res.data);
          if (res.data.modifiedCount > 0) {
            refetch();
            Swal.fire({
              position: "center",
              icon: "success",
              title: `${user.name} is an Admin now.`,
              showConfirmButton: false,
              timer: 1500,
            });
          }
        });
      }
    });
  };

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete user.",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.delete(`/users/${id}`).then((res) => {
          if (res.data.deletedCount) {
            refetch();

            Swal.fire({
              title: "Success!",
              text: "Deleted successfully",
              icon: "success",
              confirmButtonText: "Close",
            });
          }
        });
      }
    });
  };

  return (
    <div className=" justify-between bg-dark9">
      <Helmet>
        <title>Bistro Boss | All Users</title>
      </Helmet>

      <div className="fixed z-50">
        <DashboardSideBar />
      </div>

      <div className="w-full px-4 md:pr-10 md:pl-[280px] lg:pr-40 lg:pl-[400px] pt-6 pb-12 md:py-12">
        <div>
          <SectionTitle
            subtitle={"---How many??---"}
            title={"MANAGE ALL USERS"}
          />
          <div className="bg-white p-6 lg:p-12">
            <div className="relative grid grid-cols-3 items-center gap-2 lg:gap-6 text-lg lg:text-2xl font-bold text-dark1 font-cinzel">
              <h1 className="col-span-2 lg:col-span-1">
                Total Users: {users.length}
              </h1>
            </div>

            {/* table */}

            <div className="overflow-x-auto mt-12">
              <table className="table table-md lg:table-lg">
                <thead className="text-base font-medium text-white rounded-t-lg">
                  <tr className="bg-brown4 uppercase">
                    <td></td>
                    <td>Name</td>
                    <td>Email</td>
                    <td className="text-center">Role</td>
                    <td className="text-center">Action</td>
                  </tr>
                </thead>

                <tbody>
                  {users.map((user, idx) => (
                    <tr key={idx} className="text-dark3">
                      <th>{idx + 1}</th>
                      <td>{user.name}</td>
                      <td>{user.email}</td>
                      <td className="text-center">
                        {user?.role === "admin" ? (
                          "Admin"
                        ) : (
                          <button
                            onClick={() => handleMakeAdmin(user)}
                            className="flex btn text-xl text-white bg-brown4 hover:bg-brown4 border-none rounded-md text-center px-3 m-auto"
                          >
                            <HiMiniUserGroup />
                          </button>
                        )}
                      </td>
                      <td>
                        <button
                          onClick={() => handleDelete(user._id)}
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

export default AllUsers;
