import { Spiral as Hamburger } from "hamburger-react";
import { useContext, useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { Link, NavLink } from "react-router-dom";
import { BiLogInCircle } from "react-icons/bi";
import { MdShoppingCart } from "react-icons/md";
import { AuthContext } from "../Provider/AuthProvider";
import Swal from "sweetalert2";
import useCart from "../Hooks/useCart";
import useAdmin from "../Hooks/useAdmin";

const Navbar = () => {
  const { user, logOut } = useContext(AuthContext);
  const [cart] = useCart();
  const [isAdmin] = useAdmin();

  const [showUserInfo, setShowUserInfo] = useState(false);
  const [toggle, setToggle] = useState(false);

  const pages = [
    {
      name: "HOME",
      path: "/",
    },
    {
      name: "CONTACT US",
      path: "/contactUs",
    },
    {
      name: "DASHBOARD",
      path: isAdmin ? "/dashboard/adminHome" : "/dashboard/userHome",
    },
    {
      name: "OUR MENU",
      path: "/ourMenu",
    },
    {
      name: "OUR SHOP",
      path: "/ourShop/salads",
    },
  ];

  const others = [
    {
      id: 1,
      name: "Profile",
      path: "/profile",
    },
  ];

  const handleUserInfoClick = () => {
    setShowUserInfo(!showUserInfo);
  };

  const handleLogout = () => {
    Swal.fire({
      title: "Are you sure?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Sign Out!",
    }).then((result) => {
      if (result.isConfirmed) {
        logOut().then(() => {
          Swal.fire({
            title: "Success!",
            text: "Sign Out successfully",
            icon: "success",
            confirmButtonText: "Close",
          });
        });
      }
    });
  };

  const handleToggle = () => {
    setToggle(!toggle);
  };

  useEffect(() => {
    AOS.init({
      duration: 1000,
    });
  }, []);

  return (
    <div className="relative flex justify-between items-center font-inter bg-black4 px-4 md:px-10 lg:px-20 md:py-2 lg:py-3">
      {/* brand logo */}

      <div className="text-white text-[10px] md:text-sm lg:text-xl font-black font-cinzel py-1 md:py-0">
        <span>
          <Link to="/">
            <h3 className="text-center">
              BISTRO BOSS
              <br />
              <span className="lg:text-base font-semibold tracking-[1px] lg:tracking-[5.5px]">
                RESTAURANT
              </span>
            </h3>
          </Link>
        </span>
      </div>

      {/* pages */}

      {/*for sm and md device */}

      <div className="relative flex justify-center gap-5 md:gap-8 lg:gap-12">
        <div className="lg:hidden">
          <Hamburger onToggle={handleToggle} rounded size={22} color="white" />
          {toggle ? (
            <div data-aos="fade-in" className="relative">
              <div className="absolute top-2 md:top-4 right-0 flex flex-col items-center rounded-xl bg-black3 font-medium">
                {pages.map((page, idx) => (
                  <div
                    key={idx}
                    className="hover:bg-black4 text-center cursor-pointer duration-300 w-full"
                  >
                    <NavLink
                      to={page.path}
                      className={({ isActive, isPending }) =>
                        isPending
                          ? "pending"
                          : isActive
                          ? "text-yellow"
                          : "text-white"
                      }
                    >
                      <button className="w-64 py-4">{page.name}</button>
                    </NavLink>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            ""
          )}
        </div>
        {/* for lg device */}

        <div className="hidden lg:flex justify-end items-center gap-12 font-bold">
          {pages.map((page, idx) => (
            <div key={idx}>
              <NavLink
                to={page.path}
                className={({ isActive, isPending }) =>
                  isPending
                    ? "pending"
                    : isActive
                    ? "text-yellow"
                    : "text-white"
                }
              >
                {page.name}
              </NavLink>
            </div>
          ))}
        </div>

        {/* cart */}

        <div className="pt-3">
          <Link to="/dashboard/myCart" className="text-2xl text-white">
            <p className="flex">
              <MdShoppingCart />
              <sup className="text-base font-medium text-yellow rounded-full">
                {cart.length}
              </sup>
            </p>
          </Link>
        </div>

        {/* login */}

        <div className="relative">
          {user ? (
            <button
              onClick={handleUserInfoClick}
              className="cursor-pointer pt-2"
            >
              <img
                src={user?.photoURL}
                alt={`${user.displayName}'s profile`}
                className="w-8 h-8 rounded-full"
              />
            </button>
          ) : (
            <Link to="/login">
              <button className="md:hidden text-2xl text-white mt-3">
                <BiLogInCircle />
              </button>
              <button className="hidden md:block btn lg:text-lg font-medium text-white bg-transparent hover:bg-transparent border-0 border-b-2 border-white hover:border-white">
                Log In
              </button>
            </Link>
          )}

          {showUserInfo && user && (
            <div data-aos="fade-in" className="relative">
              <div className="absolute top-3.5 md:top-4 lg:top-5 right-4 md:right-0 flex flex-col items-center rounded-xl bg-black3 text-white font-medium">
                {/* user name and email */}
                <div className="border-b-2 border-blue1 mb-2 w-52">
                  <p className="text-center py-4">{user.displayName}</p>
                  <p className="text-center pb-4">{user.email}</p>
                </div>

                {/* profile and dashboard */}

                {others.map((other) => (
                  <div
                    key={other.id}
                    className="hover:bg-blue2 text-center cursor-pointer duration-300 w-full"
                  >
                    <Link to={other.path}>
                      <button className="w-60 py-4">{other.name}</button>
                    </Link>
                  </div>
                ))}

                {/* log out */}

                <button
                  onClick={handleLogout}
                  className="hover:bg-blue2 hover:rounded-b-xl text-white duration-300 w-full py-4"
                >
                  Log Out
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
