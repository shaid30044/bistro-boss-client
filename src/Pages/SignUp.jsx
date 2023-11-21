/* eslint-disable no-useless-escape */
import { Link, useNavigate } from "react-router-dom";
import img1 from "../assets/others/authentication.png";
import img2 from "../assets/others/authentication2.png";
import { FaFacebookF, FaGoogle, FaGithub } from "react-icons/fa";
import { useContext, useState } from "react";
import { AuthContext } from "../Provider/AuthProvider";
import Swal from "sweetalert2";
import { updateProfile } from "firebase/auth";
import { Helmet } from "react-helmet-async";
import useAxiosPublic from "../Hooks/useAxiosPublic";
import { useForm } from "react-hook-form";

const SignUp = () => {
  const { createUser, googleLogin } = useContext(AuthContext);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const axiosPublic = useAxiosPublic();

  const [registerError, setRegisterError] = useState("");

  const backgroundImageStyle = {
    backgroundImage: `url(${img1})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
  };

  const onSubmit = (data) => {
    console.log(data);

    createUser(data.email, data.password).then((result) => {
      const loggedUser = result.user;
      console.log(loggedUser);

      updateProfile(data.name, data.photoURL)
        .then(() => {
          const userInfo = {
            name: data.name,
            email: data.email,
            photo: data.photoURL,
          };
          axiosPublic.post("/users", userInfo).then((res) => {
            if (res.data.insertedId) {
              console.log("user added to the database");
              reset();
              Swal.fire({
                position: "center",
                icon: "success",
                title: "Sign Up successfully.",
                showConfirmButton: false,
                timer: 1500,
              });
              navigate("/");
            }
          });
        })
        .catch((error) => {
          setRegisterError(error.message);
        });
    });
  };

  const handleGoogleLogin = () => {
    googleLogin()
      .then((res) => {
        const userInfo = {
          name: res.user?.displayName,
          email: res.user?.email,
          photo: res.user?.photoURL,
        };
        axiosPublic
          .post("/users", userInfo, { withCredentials: true })
          .then((res) => {
            reset();
            console.log(res.user);
            Swal.fire({
              position: "center",
              icon: "success",
              title: "User created successfully.",
              showConfirmButton: false,
              timer: 1500,
            });
            navigate("/");
          });
      })
      .catch((error) => {
        setRegisterError(error.message);
      });
  };

  return (
    <div
      style={backgroundImageStyle}
      className="font-inter bg-fixed px-4 md:px-10 lg:px-40 py-20"
    >
      <Helmet>
        <title>Bistro Boss | Sign Up</title>
      </Helmet>
      <div
        style={backgroundImageStyle}
        className="grid lg:grid-cols-2 items-center gap-6 shadow-2xl bg-fixed px-4 md:px-10 lg:px-20 py-10"
      >
        <img
          src={img2}
          className="flex justify-center items-center lg:order-last"
        />
        <div>
          <h1 className="text-4xl font-bold text-center text-dark1 pb-5">
            Sign Up
          </h1>

          {/* form */}

          <form onSubmit={handleSubmit(onSubmit)}>
            {/* name */}

            <p className="text-xl font-semibold text-dark2 pb-4">Name</p>
            <input
              type="text"
              {...register("name", { required: true })}
              placeholder="Type here"
              className="border-2 border-dark5 rounded-lg w-full px-6 py-3"
            />
            {errors.name && <span className="text-red">Name is required</span>}

            {/* email */}

            <p className="text-xl font-semibold text-dark2 pt-6 pb-4">Email</p>
            <input
              type="email"
              {...register("email", { required: true })}
              placeholder="Type here"
              className="border-2 border-dark5 rounded-lg w-full px-6 py-3"
            />
            {errors.email && (
              <span className="text-red">Email is required</span>
            )}

            {/* password */}

            <p className="text-xl font-semibold text-dark2 pt-6 pb-4">
              Password
            </p>
            <input
              type="password"
              {...register("password", {
                required: true,
                minLength: 6,
                maxLength: 20,
                pattern:
                  /(?=.*[A-Z])(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?~\\-])(?=.*[0-9])(?=.*[a-z])/,
              })}
              placeholder="Enter your password"
              className="border-2 border-dark5 rounded-lg w-full px-6 py-3"
            />
            {errors.password?.type === "required" && (
              <span className="text-red">Password is required</span>
            )}
            {errors.password?.type === "minLength" && (
              <span className="text-red">Password must be 6 characters</span>
            )}
            {errors.password?.type === "maxLength" && (
              <span className="text-red">
                Password must be less than 20 characters
              </span>
            )}
            {errors.password?.type === "pattern" && (
              <p className="text-red">
                Password must have one uppercase, one lower case, one number and
                one special character.
              </p>
            )}

            {/* photo */}

            <p className="text-xl font-semibold text-dark2 pt-6 pb-4">
              Photo URL
            </p>
            <input
              type="Text"
              {...register("photoURL", { required: true })}
              placeholder="Enter your photo url"
              className="border-2 border-dark5 rounded-lg w-full px-6 py-3"
            />
            {errors.photoURL && (
              <span className="text-red">Photo URL is required</span>
            )}

            {/* Login error */}

            <div className="text-center -mb-4">
              {registerError && (
                <p className="text-sm text-red-600">{registerError}</p>
              )}
            </div>

            {/* sign in */}

            <input
              type="submit"
              value="Sign Up"
              className="btn normal-case text-xl font-semibold text-white bg-brown1/60 hover:bg-brown1/60 border-none w-full mt-16 mb-8"
            />
          </form>

          <div className="text-lg font-medium text-center text-brown1">
            <p>
              Already registered?
              <span className="font-bold">
                <Link to="/login"> Go to log in</Link>
              </span>
            </p>
          </div>

          <div>
            <p className="text-lg font-medium text-center text-dark2 pt-6 pb-5">
              Or sign up with
            </p>
            <div className="text-xl text-dark2 flex justify-center gap-12">
              {/* facebook */}

              <div className="border border-dark2 cursor-pointer rounded-full p-3">
                <FaFacebookF />
              </div>

              {/* google */}

              <div
                onClick={handleGoogleLogin}
                className="border border-dark2 cursor-pointer rounded-full p-3"
              >
                <FaGoogle />
              </div>

              {/* github */}

              <div className="border border-dark2 cursor-pointer rounded-full p-3">
                <FaGithub />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
