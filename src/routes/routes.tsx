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
import { userPaths } from "./user.routes";
import About from "../pages/about/About";
import NotFoundPage from "../pages/error/NotFoundPage";
import Review from "../pages/review/Review";
import WhyChooseMe from "../pages/whyChooseMe/WhyChooseMe";
import HowToRent from "../pages/home/howToRent/HowToRent";

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
        path: "bikes",
        element: <Bikes />,
      },
      {
        path: "reviews",
        element: <Review />,
      },
      {
        path: "why-us",
        element: <WhyChooseMe />,
      },
      {
        path: "rental-guide",
        element: <HowToRent />,
      },
      {
        path: "bikes/:id",
        element: <BikeDesc />,
      },
      {
        path: "booking/:id",
        element: (
          <ProtectedRoutes role={["admin", "user"]}>
            <Booking />
          </ProtectedRoutes>
        ),
      },
      {
        path: "contact",
        element: <ContactPage />,
      },
      {
        path: "about",
        element: <About />,
      },

      {
        path: "sign-up-success",
        element: <SignupSuccess />,
      },
    ],
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
    path: "*",
    element: <NotFoundPage />,
  },

  {
    path: "/admin",
    element: (
      <ProtectedRoutes role={["admin"]}>
        <DashboardLayout />
      </ProtectedRoutes>
    ),
    children: routeGenerator(adminPaths),
  },
  {
    path: "/user",
    element: (
      <ProtectedRoutes role={["user"]}>
        <DashboardLayout />
      </ProtectedRoutes>
    ),
    children: routeGenerator(userPaths),
  },
]);

export default router;
