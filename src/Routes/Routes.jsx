import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../Layouts/MainLayout";
import Home from "../Pages/Home";
import OurMenu from "../Pages/OurMenu";
import OurShop from "../Pages/OurShop";
import Login from "../Pages/Login";
import SignUp from "../Pages/SignUp";
import Contact from "../Pages/Contact";
import PrivateRoutes from "./PrivateRoutes";
import Dashboard from "../Pages/Dashboard";
import UserHome from "../Pages/UserHome";
import Reservation from "../Pages/Reservation";
import PaymentHistory from "../Pages/PaymentHistory";
import AddReview from "../Pages/AddReview";
import MyBooking from "../Pages/MyBooking";
import MyCart from "../Pages/MyCart";
import ErrorPage from "../Pages/ErrorPage";
import AllUsers from "../Pages/AllUsers";
import AdminRoute from "./AdminRoute";
import AddItems from "../Pages/AddItems";
import ManageItems from "../Pages/ManageItems";
import UpdateItem from "../Pages/UpdateItem";
import Payment from "../Pages/Payment";
import AdminHome from "../Pages/AdminHome";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/ourMenu",
        element: <OurMenu />,
      },
      {
        path: "/ourShop/:category",
        element: <OurShop />,
      },
      {
        path: "/contactUs",
        element: <Contact />,
      },
      {
        path: "/dashboard/adminHome",
        element: (
          <AdminRoute>
            <AdminHome />
          </AdminRoute>
        ),
      },
      {
        path: "/dashboard/addItems",
        element: (
          <AdminRoute>
            <AddItems />
          </AdminRoute>
        ),
      },
      {
        path: "/dashboard/manageItems",
        element: (
          <AdminRoute>
            <ManageItems />
          </AdminRoute>
        ),
      },
      {
        path: "/dashboard/manageItems/updateItem/:id",
        element: (
          <AdminRoute>
            <UpdateItem />
          </AdminRoute>
        ),
        loader: ({ params }) =>
          fetch(
            `https://bistro-boss-server-ten-mu.vercel.app/menu/${params.id}`
          ),
      },
      {
        path: "/dashboard/allUsers",
        element: (
          <AdminRoute>
            <AllUsers />
          </AdminRoute>
        ),
      },
      {
        path: "/dashboard",
        element: (
          <PrivateRoutes>
            <Dashboard />
          </PrivateRoutes>
        ),
      },
      {
        path: "/dashboard/userHome",
        element: (
          <PrivateRoutes>
            <UserHome />
          </PrivateRoutes>
        ),
      },
      {
        path: "/dashboard/reservation",
        element: (
          <PrivateRoutes>
            <Reservation />
          </PrivateRoutes>
        ),
      },
      {
        path: "/dashboard/payment",
        element: (
          <PrivateRoutes>
            <Payment />
          </PrivateRoutes>
        ),
      },
      {
        path: "/dashboard/paymentHistory",
        element: (
          <PrivateRoutes>
            <PaymentHistory />
          </PrivateRoutes>
        ),
      },
      {
        path: "/dashboard/myCart",
        element: (
          <PrivateRoutes>
            <MyCart />
          </PrivateRoutes>
        ),
      },
      {
        path: "/dashboard/addReview",
        element: (
          <PrivateRoutes>
            <AddReview />
          </PrivateRoutes>
        ),
      },
      {
        path: "/dashboard/myBooking",
        element: (
          <PrivateRoutes>
            <MyBooking />
          </PrivateRoutes>
        ),
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/signUp",
        element: <SignUp />,
      },
    ],
  },
]);

export default router;
