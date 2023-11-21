import { useContext } from "react";
import { AuthContext } from "../Provider/AuthProvider";
import Swal from "sweetalert2";
import useAxiosSecure from "../Hooks/useAxiosSecure";
import useCart from "../Hooks/useCart";

const OrderTabItem = ({ item }) => {
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();
  const [, refetch] = useCart();

  const { _id, image, name, price, recipe } = item;

  const handleAddToCart = () => {
    const cartItem = {
      menuId: _id,
      email: user.email,
      name,
      price,
      image,
    };

    axiosSecure.post("/cart", cartItem).then((res) => {
      console.log(res.data);

      if (res.data.insertedId) {
        Swal.fire({
          position: "center",
          icon: "success",
          title: `${name} added to the cart successfully.`,
          showConfirmButton: false,
          timer: 2000,
        });

        refetch();
      }
    });
  };

  return (
    <div className="relative flex flex-col md:flex-row lg:flex-col">
      <img src={image} />
      <p className="absolute top-3 right-3 text-xs bg-black1 text-white px-4 py-1">
        ${price}
      </p>
      <div className="relative text-center text-dark1 bg-dark7 h-56       md:h-auto lg:h-[268px] p-6 lg:p-8">
        <div>
          <h3 className="text-xl font-semibold">{name}</h3>
          <p className="text-sm md:text-base pt-2 pb-6">{recipe}</p>
        </div>
        <div className="absolute bottom-6 lg:bottom-8 left-1/2 -translate-x-1/2">
          <button
            onClick={handleAddToCart}
            className="btn text-lg font-medium text-brown2 bg-dark6 hover:bg-black2 border-0 border-b-2 border-brown1    duration-300 lg:px-6"
          >
            add to cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderTabItem;
