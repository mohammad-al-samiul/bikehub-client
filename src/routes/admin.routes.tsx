import BikesManagement from "../pages/dashboard/admin/BikesManagement";

import Users from "../pages/dashboard/admin/Users";
import Profile from "../pages/dashboard/user/Profile";

import ReturnBikeList from "../pages/dashboard/admin/ReturnBike";
import RentalAnalytics from "../pages/dashboard/admin/RentalAnalytics";
import Settings from "../pages/dashboard/Setting";

export const adminPaths = [
  {
    name: "Profile",
    path: "profile",
    element: <Profile />,
  },
  {
    name: "Setting",
    path: "setting",
    element: <Settings />,
  },
  {
    name: "Rental Analytics",
    path: "rental-analytics",
    element: <RentalAnalytics />,
  },
  {
    name: "Manage Bike",
    path: "manage-bike",
    element: <BikesManagement />,
  },
  {
    name: "User Management",
    children: [
      {
        name: "Return Bike",
        path: "return-bike",
        element: <ReturnBikeList />,
      },
      {
        name: "All Users",
        path: "users",
        element: <Users />,
      },
    ],
  },
];
