import { Helmet } from "react-helmet-async";
import DashboardSideBar from "../Components/DashboardSideBar";
import SectionTitle from "../Components/SectionTitle";
import useCart from "../Hooks/useCart";
import { RiDeleteBin6Line } from "react-icons/ri";
import Swal from "sweetalert2";
import useAxiosSecure from "../Hooks/useAxiosSecure";
import { Link } from "react-router-dom";

const MyCart = () => {
  const [cart, refetch] = useCart();
  const axiosSecure = useAxiosSecure();

  const totalPrice = cart.reduce((total, item) => total + item.price, 0);

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it.",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.delete(`/cart/${id}`).then((res) => {
          if (res.data.deletedCount) {
            refetch();

            Swal.fire({
              title: "Success!",
              text: "Delete successfully",
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
        <title>Bistro Boss | My Cart</title>
      </Helmet>

      <div className="fixed z-50">
        <DashboardSideBar />
      </div>

      <div className="w-full px-4 md:pr-10 md:pl-[280px] lg:pr-40 lg:pl-[400px] pt-6 pb-12 md:py-12">
        <div>
          <SectionTitle subtitle={"---My Cart---"} title={"WANNA ADD MORE?"} />
          <div className="bg-white p-6 lg:p-12">
            <div className="relative grid grid-cols-3 items-center gap-2 lg:gap-6 text-lg lg:text-2xl font-bold text-dark1 font-cinzel">
              <h1 className="col-span-2 lg:col-span-1">
                Total Orders: {cart.length}
              </h1>
              <h1 className="col-span-2 lg:col-span-1">
                Total Price: ${totalPrice.toFixed(2)}
              </h1>
              <div className="absolute right-0 top-1/2 -translate-y-1/2">
                {cart.length ? (
                  <Link to="/dashboard/payment">
                    <button className="flex btn bg-brown4 hover:bg-brown4 border-none lg:text-xl text-white m-auto">
                      Pay
                    </button>
                  </Link>
                ) : (
                  <button
                    disabled
                    className="flex btn bg-brown4 hover:bg-brown4 border-none lg:text-xl text-white m-auto"
                  >
                    Pay
                  </button>
                )}
              </div>
            </div>

            {/* table */}

            <div className="overflow-x-auto mt-12">
              <table className="table table-md lg:table-lg">
                <thead className="text-base font-medium text-white rounded-t-lg">
                  <tr className="bg-brown4 uppercase">
                    <td></td>
                    <td>Item Image</td>
                    <td>Item Name</td>
                    <td>Price</td>
                    <td className="text-center">Action</td>
                  </tr>
                </thead>

                <tbody>
                  {cart.map((cart, idx) => (
                    <tr key={idx} className="text-dark3">
                      <th>{idx + 1}</th>
                      <td>
                        <img src={cart.image} className="h-16 w-24 mr-16" />
                      </td>
                      <td>{cart.name}</td>
                      <td>${cart.price.toFixed(2)}</td>
                      <td>
                        <button
                          onClick={() => handleDelete(cart._id)}
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

export default MyCart;
