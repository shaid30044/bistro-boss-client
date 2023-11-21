import { Link, NavLink } from "react-router-dom";
import { BiSolidHome } from "react-icons/bi";
import { FaCalendarAlt, FaCalendarCheck, FaBook } from "react-icons/fa";
import { GiWallet } from "react-icons/gi";
import { RiShoppingCart2Fill } from "react-icons/ri";
import { MdReviews, MdShoppingBag, MdEmail } from "react-icons/md";
import { IoMenu } from "react-icons/io5";
import { FaArrowRight, FaArrowLeft, FaListUl } from "react-icons/fa6";
import { HiMiniUserGroup } from "react-icons/hi2";
import { ImSpoonKnife } from "react-icons/im";
import { useState } from "react";
import useCart from "../Hooks/useCart";
import useAdmin from "../Hooks/useAdmin";

const DashboardSideBar = () => {
  const [cart] = useCart();

  const [toggle, setToggle] = useState(false);

  const handleToggle = () => {
    setToggle(!toggle);
  };

  const [isAdmin] = useAdmin();

  const admins = [
    {
      name: "admin home",
      path: "/dashboard/adminHome",
      icon: BiSolidHome,
    },
    {
      name: "add items",
      path: "/dashboard/addItems",
      icon: ImSpoonKnife,
    },
    {
      name: "manage items",
      path: "/dashboard/manageItems",
      icon: FaListUl,
    },
    {
      name: "manage bookings",
      path: "/dashboard/manageBookings",
      icon: FaBook,
    },
    {
      name: "all users",
      path: "/dashboard/allUsers",
      icon: HiMiniUserGroup,
    },
  ];

  const users = [
    {
      name: "user home",
      path: "/dashboard/userHome",
      icon: BiSolidHome,
    },
    {
      name: "reservation",
      path: "/dashboard/reservation",
      icon: FaCalendarAlt,
    },
    {
      name: "payment history",
      path: "/dashboard/paymentHistory",
      icon: GiWallet,
    },
    {
      name: "my cart",
      path: "/dashboard/myCart",
      icon: RiShoppingCart2Fill,
      count: cart.length,
    },
    {
      name: "add review",
      path: "/dashboard/addReview",
      icon: MdReviews,
    },
    {
      name: "my booking",
      path: "/dashboard/myBooking",
      icon: FaCalendarCheck,
    },
  ];

  const pages = [
    {
      name: "home",
      path: "/",
      icon: BiSolidHome,
    },
    {
      name: "menu",
      path: "/ourMenu",
      icon: IoMenu,
    },
    {
      name: "shop",
      path: "/ourShop/salad",
      icon: MdShoppingBag,
    },
    {
      name: "contact",
      path: "/contactUs",
      icon: MdEmail,
    },
  ];

  return (
    <div>
      {/* small device */}

      <div className="md:hidden">
        {!toggle ? (
          <div className="overflow-auto font-cinzel bg-brown4 w-64 h-screen px-4 md:px-6 lg:px-8 py-12">
            {/* dashboard slide button */}

            <button
              onClick={handleToggle}
              className="absolute top-7 left-3 text-dark1 text-lg"
            >
              <FaArrowLeft />
            </button>

            {/* dashboard */}

            {/* brand name */}

            <div className="text-dark1 text-xl tracking-[2px] font-black py-1 md:py-0">
              <span>
                <Link to="/">
                  <h3 className="text-center">
                    BISTRO BOSS
                    <br />
                    <span className="lg:text-base font-bold tracking-[3px] lg:tracking-[6px]">
                      RESTAURANT
                    </span>
                  </h3>
                </Link>
              </span>
            </div>

            {/* user and admin panel */}

            <div className="space-y-6 font-medium border-b-2 border-white pt-8 md:pt-10 lg:pt-16 pb-8 mb-8">
              {isAdmin ? (
                // admin panel

                <>
                  {admins.map((admin, idx) => (
                    <div key={idx}>
                      <NavLink
                        to={admin.path}
                        className={({ isActive, isPending }) =>
                          isPending
                            ? "pending"
                            : isActive
                            ? "text-white"
                            : "text-dark1"
                        }
                      >
                        <p className="flex items-center gap-2">
                          {<admin.icon />} {admin.name}{" "}
                        </p>
                      </NavLink>
                    </div>
                  ))}
                </>
              ) : (
                // user panel

                <>
                  {users.map((user, idx) => (
                    <div key={idx}>
                      <NavLink
                        to={user.path}
                        className={({ isActive, isPending }) =>
                          isPending
                            ? "pending"
                            : isActive
                            ? "text-white"
                            : "text-dark1"
                        }
                      >
                        <p className="flex items-center gap-2">
                          {<user.icon />} {user.name}{" "}
                          {user.count ? <span>({user?.count})</span> : ""}
                        </p>
                      </NavLink>
                    </div>
                  ))}
                </>
              )}
            </div>

            {/* pages */}

            <div className="space-y-6 font-medium">
              {pages.map((page, idx) => (
                <div key={idx}>
                  <NavLink
                    to={page.path}
                    className={({ isActive, isPending }) =>
                      isPending
                        ? "pending"
                        : isActive
                        ? "text-white"
                        : "text-dark1"
                    }
                  >
                    <p className="flex items-center gap-2">
                      {<page.icon />} {page.name}
                    </p>
                  </NavLink>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <button
            onClick={handleToggle}
            className="bg-brown4 hover:bg-brown4 rounded-r-xl text-lg text-dark1 px-3 py-3 mt-4"
          >
            <FaArrowRight />
          </button>
        )}
      </div>

      {/* medium and large device */}

      <div className="hidden md:block overflow-auto font-cinzel bg-brown4 w-64 h-screen px-4 md:px-6 lg:px-8 py-12">
        {/* brand name */}

        <div className="text-dark1 text-xl tracking-[2px] font-black py-1 md:py-0">
          <span>
            <Link to="/">
              <h3 className="text-center">
                BISTRO BOSS
                <br />
                <span className="lg:text-base font-bold tracking-[3px] lg:tracking-[6px]">
                  RESTAURANT
                </span>
              </h3>
            </Link>
          </span>
        </div>

        {/* user and admin panel */}

        <div className="space-y-6 font-medium border-b-2 border-white pt-8 md:pt-10 lg:pt-16 pb-8 mb-8">
          {isAdmin ? (
            // admin panel

            <>
              {admins.map((admin, idx) => (
                <div key={idx}>
                  <NavLink
                    to={admin.path}
                    className={({ isActive, isPending }) =>
                      isPending
                        ? "pending"
                        : isActive
                        ? "text-white"
                        : "text-dark1"
                    }
                  >
                    <p className="flex items-center gap-2">
                      {<admin.icon />} {admin.name}{" "}
                    </p>
                  </NavLink>
                </div>
              ))}
            </>
          ) : (
            // user panel

            <>
              {users.map((user, idx) => (
                <div key={idx}>
                  <NavLink
                    to={user.path}
                    className={({ isActive, isPending }) =>
                      isPending
                        ? "pending"
                        : isActive
                        ? "text-white"
                        : "text-dark1"
                    }
                  >
                    <p className="flex items-center gap-2">
                      {<user.icon />} {user.name}{" "}
                      {user.count ? <span>({user?.count})</span> : ""}
                    </p>
                  </NavLink>
                </div>
              ))}
            </>
          )}
        </div>

        {/* pages */}

        <div className="space-y-6 font-medium">
          {pages.map((page, idx) => (
            <div key={idx}>
              <NavLink
                to={page.path}
                className={({ isActive, isPending }) =>
                  isPending ? "pending" : isActive ? "text-white" : "text-dark1"
                }
              >
                <p className="flex items-center gap-2">
                  {<page.icon />} {page.name}
                </p>
              </NavLink>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DashboardSideBar;
