import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useContext, useEffect, useState } from "react";
import useAxiosSecure from "../Hooks/useAxiosSecure";
import useCart from "../Hooks/useCart";
import { AuthContext } from "../Provider/AuthProvider";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();
  const [cart, refetch] = useCart();
  const axiosSecure = useAxiosSecure();
  const { user } = useContext(AuthContext);

  const [error, setError] = useState("");
  const [clientSecret, setClientSecret] = useState("");
  const [transactionId, setTransactionId] = useState("");

  const totalPrice = cart.reduce((total, item) => total + item.price, 0);

  useEffect(() => {
    if (totalPrice) {
      axiosSecure
        .post("/create-payment-intent", {
          price: totalPrice,
        })
        .then((res) => {
          setClientSecret(res.data.clientSecret);
        });
    }
  }, [axiosSecure, totalPrice]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const card = elements.getElement(CardElement);

    if (card === null) {
      return;
    }

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (error) {
      setError(error.message);
    } else {
      console.log("Payment method:", paymentMethod);

      setError("");
    }

    const { paymentIntent, error: confirmError } =
      await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: card,
          billing_details: {
            email: user?.email || "anonymous",
            name: user?.displayName || "anonymous",
          },
        },
      });

    if (confirmError) {
      console.log("confirm error:", confirmError);
    } else {
      console.log("payment intent:", paymentIntent);

      if (paymentIntent.status === "succeeded") {
        setTransactionId(paymentIntent.id);

        const date = new Date();
        const formattedNewDate = new Intl.DateTimeFormat("en-US", {
          weekday: "long",
          year: "numeric",
          month: "long",
          day: "numeric",
          hour: "numeric",
          minute: "numeric",
          second: "numeric",
        }).format(date);

        const payment = {
          email: user.email,
          price: totalPrice,
          transactionId: paymentIntent.id,
          date: formattedNewDate,
          cartIds: cart.map((item) => item._id),
          menuIds: cart.map((item) => item.menuId),
          status: "pending",
        };

        const res = await axiosSecure.post("/payments", payment);
        console.log("Payment saved", res.data);

        refetch();

        if (res.data?.paymentResult?.insertedId) {
          Swal.fire({
            title: "Success!",
            text: `Your Transaction Id is: ${transactionId.id}`,
            icon: "success",
            confirmButtonText: "Close",
          });

          navigate(-1);
        }
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <CardElement
        options={{
          style: {
            base: {
              fontSize: "18px",
              color: "#424770",
              "::placeholder": {
                color: "#a1a1a1",
              },
            },
            invalid: {
              color: "#9e2146",
            },
          },
        }}
        className=""
      />

      <div className="text-center text-red pt-8 pb-8">{error}</div>

      <button
        type="submit"
        disabled={!stripe || !clientSecret}
        className="flex btn normal-case bg-blue hover:bg-blue text-white font-inter text-xl font-bold w-full md:w-80 m-auto"
      >
        Pay
      </button>
    </form>
  );
};

export default CheckoutForm;
