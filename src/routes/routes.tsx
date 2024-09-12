import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import HomePage from "../pages/home/Home";
import ContactPage from "../pages/contact/Contact";
import LoginPage from "../pages/login/Login";
import ProtectedRoutes from "./ProtectedRoutes";
import Dashboard from "../pages/dashboard/Dashboard";
import Bikes from "../pages/bikes/Bikes";
import BikeDesc from "../pages/bikes/BikeDesc";
import Booking from "../pages/booking/Booking";
import Signup from "../pages/signup/Signup";
import SignupSuccess from "../pages/signup/SignupSuccess";

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
        element: <Booking />,
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

      {
        path: "dashboard",
        element: (
          <ProtectedRoutes>
            <Dashboard />
          </ProtectedRoutes>
        ),
      },
    ],
  },
]);

export default router;
