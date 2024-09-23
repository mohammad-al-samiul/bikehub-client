import Bike from "../pages/dashboard/user/Bike";
import Profile from "../pages/dashboard/user/Profile";
import Rentals from "../pages/dashboard/user/Rentals";

export const userPaths = [
  {
    name: "Profile",
    path: "profile",
    element: <Profile />,
  },
  {
    name: "Bikes",
    path: "bikes",
    element: <Bike />,
  },
  {
    name: "My Rentals",
    path: "my-rentals",
    element: <Rentals />,
  },
];
