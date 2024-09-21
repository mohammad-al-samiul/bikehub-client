import Profile from "../pages/dashboard/user/Profile";
import UserDashboard from "../pages/dashboard/user/UserDashboard";

// export const userRoutes = [
//   {
//     index: true,
//     element: <Profile />,
//   },
//   {
//     path: "bikes",
//     element: <Bikes />,
//   },
// ];

export const userPaths = [
  {
    name: "Dashboard",
    path: "dashboard",
    element: <UserDashboard />,
  },
  {
    name: "Profile",
    path: "profile",
    element: <Profile />,
  },
];
