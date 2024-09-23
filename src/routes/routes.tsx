import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import HomePage from "../pages/home/Home";
import ContactPage from "../pages/contact/Contact";
import LoginPage from "../pages/login/Login";

import Bikes from "../pages/bikes/Bikes";
import BikeDesc from "../pages/bikes/BikeDesc";
import Booking from "../pages/booking/Booking";
import Signup from "../pages/signup/Signup";
import SignupSuccess from "../pages/signup/SignupSuccess";

import DashboardLayout from "../components/layouts/DashboardLayout";

import { routeGenerator } from "../utils/routesGenerator";
import { adminPaths } from "./admin.routes";
import ProtectedRoutes from "../components/layouts/ProtectedRoutes";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "home",
        element: <HomePage />,
      },
      {
        path: "bikes",
        element: <Bikes />,
      },
      {
        path: "bikes/:id",
        element: <BikeDesc />,
      },
      {
        path: "booking/:id",
        element: (
          <ProtectedRoutes role="user | admin">
            <Booking />
          </ProtectedRoutes>
        ),
      },
      {
        path: "contact",
        element: <ContactPage />,
      },
      {
        path: "login",
        element: <LoginPage />,
      },
      {
        path: "signup",
        element: <Signup />,
      },
      {
        path: "sign-up-success",
        element: <SignupSuccess />,
      },
    ],
  },
  {
    path: "/admin",
    element: (
      <ProtectedRoutes role="admin">
        <DashboardLayout />
      </ProtectedRoutes>
    ),
    children: routeGenerator(adminPaths),
  },
]);

export default router;
