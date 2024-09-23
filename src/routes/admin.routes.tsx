import BikesManagement from "../pages/dashboard/admin/BikesManagement";
import MangageUser from "../pages/dashboard/admin/ManageUser";

import Users from "../pages/dashboard/admin/Users";
import Profile from "../pages/dashboard/user/Profile";
import Rentals from "../pages/dashboard/user/Rentals";
import Coupons from "../pages/dashboard/admin/Coupons";

export const adminPaths = [
  {
    name: "Profile",
    path: "profile",
    element: <Profile />,
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
        name: "Manage User",
        path: "manage-user",
        element: <MangageUser />,
      },
      {
        name: "Rentals",
        path: "rentals",
        element: <Rentals />,
      },
      {
        name: "All Users",
        path: "users",
        element: <Users />,
      },
      {
        name: "Coupons",
        path: "coupons",
        element: <Coupons />,
      },
    ],
  },
];
