import { Helmet } from "react-helmet-async";
import DashboardSideBar from "../Components/DashboardSideBar";
import SectionTitle from "../Components/SectionTitle";
import useAxiosSecure from "../Hooks/useAxiosSecure";
import { useContext } from "react";
import { AuthContext } from "../Provider/AuthProvider";
import { useQuery } from "@tanstack/react-query";

const PaymentHistory = () => {
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();

  const { data: payments = [] } = useQuery({
    queryKey: ["payments", user.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/paymentHistory/${user.email}`);
      return res.data;
    },
  });

  return (
    <div className=" justify-between bg-dark9">
      <Helmet>
        <title>Bistro Boss | Payment History</title>
      </Helmet>

      <div className="fixed z-50">
        <DashboardSideBar />
      </div>

      <div className="w-full h-full px-4 md:pr-10 md:pl-[280px] lg:pr-40 lg:pl-[400px] pt-6 pb-12 md:py-12">
        <div>
          <SectionTitle
            subtitle={"---At a Glance!---"}
            title={"PAYMENT HISTORY"}
          />
          <div className="bg-white p-6 lg:p-12">
            <div className="text-lg lg:text-2xl font-bold text-dark1 font-cinzel">
              <h1 className="col-span-2 lg:col-span-1">
                Total Payments: {payments.length}
              </h1>
            </div>

            {/* table */}

            <div className="overflow-x-auto mt-12">
              <table className="table table-md lg:table-lg">
                <thead className="text-base font-medium text-white rounded-t-lg">
                  <tr className="bg-brown4 uppercase">
                    <td></td>
                    <td>Email</td>
                    <td>Transaction Id</td>
                    <td className="text-center">Total Price</td>
                    <td className="text-center">Status</td>
                    <td>Payment Date</td>
                  </tr>
                </thead>

                <tbody>
                  {payments.map((payment, idx) => (
                    <tr key={idx} className="text-dark3">
                      <th>{idx + 1}</th>
                      <td>{payment.email}</td>
                      <td>{payment.transactionId}</td>
                      <td className="text-center">
                        ${payment.price.toFixed(2)}
                      </td>
                      <td className="text-center">{payment.status}</td>
                      <td>{payment.date}</td>
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

export default PaymentHistory;
