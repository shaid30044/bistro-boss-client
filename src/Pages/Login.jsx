import { Link, useLocation, useNavigate } from "react-router-dom";
import img1 from "../assets/others/authentication.png";
import img2 from "../assets/others/authentication2.png";
import { FaFacebookF, FaGoogle, FaGithub } from "react-icons/fa";
import {
  loadCaptchaEnginge,
  LoadCanvasTemplate,
  validateCaptcha,
} from "react-simple-captcha";
import { useContext, useEffect, useRef, useState } from "react";
import { AuthContext } from "../Provider/AuthProvider";
import Swal from "sweetalert2";
import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import useAxiosPublic from "../Hooks/useAxiosPublic";

const Login = () => {
  const captchaRef = useRef(null);
  const { login, googleLogin } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const { reset } = useForm();
  const axiosPublic = useAxiosPublic();

  const [disabled, setDisabled] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const [loginError, setLoginError] = useState("");

  const backgroundImageStyle = {
    backgroundImage: `url(${img1})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
  };

  const handleLogin = (e) => {
    e.preventDefault();

    const form = new FormData(e.currentTarget);
    const email = form.get("email");
    const password = form.get("password");

    login(email, password)
      .then(() => {
        setTimeout(() => {
          navigate(location?.state ? location.state : "/");
        }, 1000);
        Swal.fire({
          title: "Success!",
          text: "Sign In successfully",
          icon: "success",
          confirmButtonText: "Close",
        });
      })
      .catch((error) => {
        if (error.message === "Invalid email") {
          Swal.fire({
            title: "Error!",
            text: "Invalid email. Please check your email address",
            icon: "error",
            confirmButtonText: "Close",
          });
        } else if (error.message === "Invalid password") {
          Swal.fire({
            title: "Error!",
            text: "Invalid password. Please check your password",
            icon: "error",
            confirmButtonText: "Close",
          });
        } else {
          Swal.fire({
            title: "Error!",
            text: "Sign In failed. Please check your credentials.",
            icon: "error",
            confirmButtonText: "Close",
          });
        }
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
              title: "Log In successfully.",
              showConfirmButton: false,
              timer: 1500,
            });
            navigate(location?.state ? location.state : "/");
          });
      })
      .catch((error) => {
        setLoginError(error.message);
      });
  };

  useEffect(() => {
    loadCaptchaEnginge(6);
  }, []);

  const handleValidateCaptcha = () => {
    const user_captcha_value = captchaRef.current.value;

    if (user_captcha_value.length === 6) {
      if (validateCaptcha(user_captcha_value)) {
        setDisabled(false);
        setErrorMessage("");
      } else {
        setDisabled(true);
        setErrorMessage("Captcha does not match. Please try again.");
      }
    }
  };

  return (
    <div
      style={backgroundImageStyle}
      className="font-inter bg-fixed px-4 md:px-10 lg:px-40 py-20"
    >
      <Helmet>
        <title>Bistro Boss | Login</title>
      </Helmet>
      <div
        style={backgroundImageStyle}
        className="grid lg:grid-cols-2 items-center gap-6 shadow-2xl bg-fixed px-4 md:px-10 lg:px-20 py-10"
      >
        <img src={img2} className="flex justify-center items-center" />
        <div>
          <h1 className="text-4xl font-bold text-center text-dark1 pb-5">
            Login
          </h1>

          {/* form */}

          <form onSubmit={handleLogin}>
            {/* email */}

            <p className="text-xl font-semibold text-dark2 pb-4">Email</p>
            <input
              type="email"
              name="email"
              placeholder="Type here"
              className="border-2 border-dark5 rounded-lg w-full px-6 py-3"
            />

            {/* password */}

            <p className="text-xl font-semibold text-dark2 pt-6 pb-4">
              Password
            </p>
            <input
              type="password"
              name="password"
              placeholder="Enter your password"
              className="border-2 border-dark5 rounded-lg w-full px-6 py-3 mb-8"
            />

            <div className="flex items-center gap-4 md:gap-10">
              {/* captcha */}

              <span className="font-semibold text-[#5D5FEF]">
                <LoadCanvasTemplate />
              </span>

              {/* type captcha */}

              <input
                type="text"
                ref={captchaRef}
                onChange={handleValidateCaptcha}
                name="type_captcha"
                placeholder="Type captcha here"
                className="border-2 border-dark5 rounded-lg w-full px-6 py-3"
              />
            </div>

            {/* Show error message */}

            {errorMessage && (
              <p className="text-red-500 text-sm mt-2">{errorMessage}</p>
            )}

            {/* Login error */}

            <div className="text-center -mb-4">
              {loginError && (
                <p className="text-sm text-red-600">{loginError}</p>
              )}
            </div>

            {/* sign in */}

            <input
              type="submit"
              value="Sign In"
              disabled={disabled}
              className="btn normal-case text-xl font-semibold text-white bg-brown1/60 hover:bg-brown1/60 border-none w-full my-8"
            />
          </form>

          <div className="text-lg font-medium text-center text-brown1">
            <p>
              New here?
              <span className="font-bold">
                <Link to="/signUp"> Create a New Account</Link>
              </span>
            </p>
          </div>

          <div>
            <p className="text-lg font-medium text-center text-dark2 pt-6 pb-5">
              Or sign in with
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

export default Login;
