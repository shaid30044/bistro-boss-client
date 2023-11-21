import { Helmet } from "react-helmet-async";
import DashboardSideBar from "../Components/DashboardSideBar";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "../Components/CheckoutForm";

const stripePromise = loadStripe(import.meta.env.VITE_PAYMENT_GETAWAY_PK);

const Payment = () => {
  return (
    <div className="font-inter justify-between">
      <Helmet>
        <title>Bistro Boss | My Cart</title>
      </Helmet>

      <div className="fixed z-50">
        <DashboardSideBar />
      </div>

      <div className="flex justify-center items-center text-center w-full h-screen px-4 md:pr-10 md:pl-[280px] lg:pr-40 lg:pl-[400px] pt-6 pb-12 md:py-12">
        <div>
          <h1 className="pb-16">
            <span className="text-2xl md:text-3xl lg:text-4xl text-dark1 px-8 lg:px-16">
              PAYMENT
            </span>
          </h1>

          <div className="w-[320px] md:w-96 lg:w-[600px]">
            <Elements stripe={stripePromise}>
              <CheckoutForm />
            </Elements>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payment;
