import { Helmet } from "react-helmet-async";
import DashboardSideBar from "../Components/DashboardSideBar";
import SectionTitle from "../Components/SectionTitle";
import { ImSpoonKnife } from "react-icons/im";
import { useForm } from "react-hook-form";
import useAxiosPublic from "../Hooks/useAxiosPublic";
import useAxiosSecure from "../Hooks/useAxiosSecure";
import Swal from "sweetalert2";

const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const AddItems = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const axiosPublic = useAxiosPublic();
  const axiosSecure = useAxiosSecure();

  const onSubmit = async (data) => {
    console.log(data);

    const imageFile = { image: data.image[0] };
    const res = await axiosPublic.post(image_hosting_api, imageFile, {
      headers: {
        "content-type": "multipart/form-data",
      },
    });

    if (res.data.success) {
      const menuItem = {
        name: data.recipeName,
        recipe: data.details,
        image: res.data.data.display_url,
        category: data.category,
        price: parseFloat(data.price),
      };

      const menuRes = await axiosSecure.post("/menu", menuItem);
      console.log(menuRes.data);

      if (menuRes.data.insertedId) {
        reset();
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Item added successfully.",
          showConfirmButton: false,
          timer: 1500,
        });
      }
    }
  };

  return (
    <div className=" justify-between">
      <Helmet>
        <title>Bistro Boss | Add Items</title>
      </Helmet>

      <div className="fixed z-50">
        <DashboardSideBar />
      </div>

      <div className="w-full px-4 md:pr-10 md:pl-[280px] lg:pr-40 lg:pl-[400px] pt-6 pb-12 md:py-12">
        <div>
          <SectionTitle subtitle={"---What's new?---"} title={"ADD AN ITEM"} />
        </div>

        <div className="bg-dark7 p-6 md:p-10 lg:p-20">
          <form onSubmit={handleSubmit(onSubmit)}>
            {/* recipe name */}

            <p className="text-xl font-semibold text-dark2 pb-4">
              Recipe Name*
            </p>
            <input
              type="text"
              {...register("recipeName", { required: true })}
              placeholder="Recipe Name"
              className="rounded-md w-full px-6 py-3"
            />
            {errors.recipeName && (
              <span className="text-red">Recipe Name is required</span>
            )}

            <div className="grid lg:grid-cols-2 gap-6 pt-6">
              {/* category */}

              <div>
                <p className="text-xl font-semibold text-dark2 pb-4">
                  Category*
                </p>
                <select
                  {...register("category", { required: true })}
                  defaultValue="default"
                  className="text-dark4 rounded-md w-full px-6 py-3"
                >
                  <option disabled value="default">
                    Category
                  </option>
                  <option value="salad">Salad</option>
                  <option value="pizza">Pizza</option>
                  <option value="dessert">Dessert</option>
                  <option value="soup">Soup</option>
                  <option value="drinks">Drinks</option>
                </select>
                {errors.category && (
                  <span className="text-red">Category is required</span>
                )}
              </div>

              {/* price */}

              <div>
                <p className="text-xl font-semibold text-dark2 pb-4">Price*</p>
                <input
                  type="text"
                  {...register("price", { required: true })}
                  placeholder="Price"
                  className="rounded-md w-full px-6 py-3"
                />
                {errors.price && (
                  <span className="text-red">Price is required</span>
                )}
              </div>
            </div>

            {/* message */}

            <p className="text-xl font-semibold text-dark2 pt-6 pb-4">
              Recipe Details*
            </p>
            <textarea
              {...register("details", { required: true })}
              rows="10"
              placeholder="Recipe Details"
              className="rounded-md w-full px-6 py-3"
            />
            {errors.details && (
              <span className="text-red">Recipe Details is required</span>
            )}

            {/* file input */}

            <input
              type="file"
              {...register("image", { required: true })}
              className="file-input w-full rounded-none file-input-[#fff] bg-transparent mt-6"
            />
            {errors.image && (
              <span className="text-red">Recipe Image is required</span>
            )}

            {/* button */}

            <div className="flex items-center text-xl font-semibold text-white mt-8">
              <input
                type="submit"
                value="Add Item"
                className="btn normal-case text-xl font-semibold text-white rounded-none bg-gradient-to-r from-[#835D23] to-[#B58130] pl-6 pr-10"
              />
              <ImSpoonKnife className="-ml-8" />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddItems;
