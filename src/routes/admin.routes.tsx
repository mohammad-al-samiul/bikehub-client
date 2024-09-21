import AdminDashboard from "../pages/dashboard/admin/AdminDashboard";
import BikesManagement from "../pages/dashboard/admin/BikesManagement";
import UserManagement from "../pages/dashboard/admin/UserManagement";
import Profile from "../pages/dashboard/user/Profile";

// export const adminRoutes = [
//   {
//     index: true,
//     element: <Profile />,
//   },
//   {
//     path: "manage-bikes",
//     element: <BikesManagement />,
//   },
//   {
//     path: "manage-users",
//     element: <UserManagement />,
//   },
// ];

export const adminPaths = [
  {
    name: "Dashboard",
    path: "dashboard",
    element: <AdminDashboard />,
  },
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
    path: "manage-user",
    element: <UserManagement />,
  },
  // {
  //   name: "User Management",
  //   children: [
  //     {
  //       name: "Create Admin",
  //       path: "create-admin",
  //       element: <CreateAdmin />,
  //     },
  //     {
  //       name: "Create Faculty",
  //       path: "create-faculty",
  //       element: <CreateFaculty />,
  //     },
  //     {
  //       name: "Create Student",
  //       path: "create-student",
  //       element: <CreateStudent />,
  //     },
  //     {
  //       name: "Create Member",
  //       path: "create-member",
  //       element: <CreateStudent />,
  //     },
  //   ],
  // },
];
