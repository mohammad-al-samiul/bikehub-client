import BikeTable from "../pages/dashboard/user/BikeTable";
import Profile from "../pages/dashboard/user/Profile";
import MyRentals from "../pages/dashboard/user/MyRentals";
import PaymentHistory from "../pages/dashboard/PaymentHistory";

import UserRentalAnalytics from "../pages/dashboard/user/UserRentalAnalytics";

export const userPaths = [
  {
    name: "Rental Analytics",
    path: "rental-analytics",
    element: <UserRentalAnalytics />,
  },
  {
    name: "Profile",
    path: "profile",
    element: <Profile />,
  },
  {
    name: "Bikes",
    path: "bikes",
    element: <BikeTable />,
  },
  {
    name: "My Rentals",
    path: "my-rentals",
    element: <MyRentals />,
  },
  {
    name: "Payment History",
    path: "my-payments",
    element: <PaymentHistory />,
  },
];
