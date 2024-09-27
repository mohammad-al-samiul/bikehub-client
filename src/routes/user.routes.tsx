import BikeTable from "../pages/dashboard/user/BikeTable";
import Profile from "../pages/dashboard/user/Profile";
import MyRentals from "../pages/dashboard/user/MyRentals";

export const userPaths = [
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
];
