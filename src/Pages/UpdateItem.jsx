import { Helmet } from "react-helmet-async";
import DashboardSideBar from "../Components/DashboardSideBar";
import { useForm } from "react-hook-form";
import useAxiosSecure from "../Hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { useLoaderData, useNavigate } from "react-router-dom";
import useAxiosPublic from "../Hooks/useAxiosPublic";

const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const UpdateItem = () => {
  const item = useLoaderData();
  const { register, handleSubmit } = useForm();
  const axiosSecure = useAxiosSecure();
  const axiosPublic = useAxiosPublic();
  const navigate = useNavigate();

  const { _id, name, category, price, recipe } = item;

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

      const menuRes = await axiosSecure.patch(`/menu/${_id}`, menuItem);
      console.log(menuRes.data);

      if (menuRes.data.modifiedCount) {
        Swal.fire({
          position: "center",
          icon: "success",
          title: `${data.name} ${name} is updated successfully.`,
          showConfirmButton: false,
          timer: 1500,
        });

        navigate(-1);
      }
    }
  };

  return (
    <div className=" justify-between">
      <Helmet>
        <title>Bistro Boss | Update Item</title>
      </Helmet>

      <div className="fixed z-50">
        <DashboardSideBar />
      </div>

      <div className="w-full px-4 md:pr-10 md:pl-[280px] lg:pr-40 lg:pl-[400px] pt-6 pb-12 md:py-12">
        <div>
          <h1 className="text-center font-inter pb-16 lg:pb-24">
            <span className="text-2xl md:text-3xl lg:text-4xl text-dark1 px-8 lg:px-16 py-4">
              UPDATE ITEM
            </span>
          </h1>
        </div>

        <div className="bg-dark7 p-6 md:p-10 lg:p-20">
          <form onSubmit={handleSubmit(onSubmit)}>
            {/* recipe name */}

            <p className="text-xl font-semibold text-dark2 pb-4">Recipe Name</p>
            <input
              type="text"
              {...register("recipeName")}
              defaultValue={name}
              placeholder="Recipe Name"
              className="rounded-md w-full px-6 py-3"
            />

            <div className="grid lg:grid-cols-2 gap-6 pt-6">
              {/* category */}

              <div>
                <p className="text-xl font-semibold text-dark2 pb-4">
                  Category
                </p>
                <select
                  {...register("category")}
                  defaultValue={category}
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
              </div>

              {/* price */}

              <div>
                <p className="text-xl font-semibold text-dark2 pb-4">Price</p>
                <input
                  type="text"
                  {...register("price")}
                  defaultValue={price}
                  placeholder="Price"
                  className="rounded-md w-full px-6 py-3"
                />
              </div>
            </div>

            {/* message */}

            <p className="text-xl font-semibold text-dark2 pt-6 pb-4">
              Recipe Details
            </p>
            <textarea
              {...register("details")}
              defaultValue={recipe}
              rows="10"
              placeholder="Recipe Details"
              className="rounded-md w-full px-6 py-3"
            />

            {/* file input */}

            <input
              type="file"
              {...register("image")}
              className="file-input w-full rounded-none file-input-[#fff] bg-transparent mt-6"
            />

            {/* button */}

            <div className="flex items-center text-xl font-semibold text-white mt-8">
              <input
                type="submit"
                value="Update Recipe Details"
                className="btn normal-case text-xl font-semibold text-white rounded-none bg-gradient-to-r from-[#835D23] to-[#B58130] px-6"
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UpdateItem;
