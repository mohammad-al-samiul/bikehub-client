import BikeTable from "../pages/dashboard/user/BikeTable";
import Profile from "../pages/dashboard/user/Profile";
import MyRentals from "../pages/dashboard/user/MyRentals";
import PaymentHistory from "../pages/dashboard/PaymentHistory";
import FavouriteBikes from "../pages/dashboard/user/FavouriteBikes";
import Settings from "../pages/dashboard/Setting";
import RentalAnalytics from "../pages/dashboard/admin/RentalAnalytics";

export const userPaths = [
  {
    name: "Profile",
    path: "profile",
    element: <Profile />,
  },
  {
    name: "Rental Analytics",
    path: "rental-analytics",
    element: <RentalAnalytics />,
  },
  {
    name: "Setting",
    path: "setting",
    element: <Settings />,
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
    name: "Favourite Bikes",
    path: "favourite-bikes",
    element: <FavouriteBikes />,
  },
  {
    name: "Payment History",
    path: "my-payments",
    element: <PaymentHistory />,
  },
];
