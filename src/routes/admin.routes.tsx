import BikesManagement from "../pages/dashboard/admin/BikesManagement";
import MangageUser from "../pages/dashboard/admin/ManageUser";

import Users from "../pages/dashboard/admin/Users";
import Profile from "../pages/dashboard/user/Profile";

import ReturnBike from "../pages/dashboard/admin/ReturnBike";

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
        name: "Return Bike",
        path: "return-bike",
        element: <ReturnBike />,
      },
      {
        name: "All Users",
        path: "users",
        element: <Users />,
      },
    ],
  },
];
