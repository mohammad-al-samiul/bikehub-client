import { Layout, Menu } from "antd";
import { jwtDecode } from "jwt-decode";
import { Navigate, NavLink } from "react-router-dom";
import { useAppSelector } from "../../redux/hook";
import { currentToken } from "../../redux/features/auth/authSlice";
import { TJwtPayload } from "../../types/global.type";
import { userMenuItems } from "../../constant/userMenuItems.constant";
import { adminMenuItems } from "../../constant/adminMenuItems";
const { Sider } = Layout;

const Sidebar = ({ collapsed }: { collapsed: boolean }) => {
  const token = useAppSelector(currentToken);
  if (!token) {
    return <Navigate to={"/login"} replace />;
  }
  const user = jwtDecode(token!) as TJwtPayload;
  let menuItems;
  if (user?.role === "user") {
    menuItems = userMenuItems;
  } else if (user?.role === "admin") {
    menuItems = adminMenuItems;
  }

  return (
    <div>
      <Sider
        className="dashboardSidebar dark:dashboardSidebarDark"
        style={{
          position: "sticky",
          top: "0",
          left: "0",
          height: "100vh",
          zIndex: 99,
        }}
        trigger={null}
        collapsible
        collapsed={collapsed}
      >
        <div className="p-4">
          <NavLink to={`/dashboard/${user?.role}`} className="inline-block">
            <h3 className="md:text-2xl text-xl font-bold uppercase text-primaryColor">
              <span className="text-accentColor">Ride</span>
              <span
                className={`${
                  collapsed ? "opacity-0" : "opacity-100"
                } dark:text-gray-300`}
              >
                flow
              </span>
            </h3>
          </NavLink>
        </div>
        <Menu
          className="bg-white dark:bg-primaryColor dark:dark-mode px-3 dashMenuItems"
          mode="inline"
          defaultSelectedKeys={["1"]}
          items={menuItems}
        />
      </Sider>
    </div>
  );
};

export default Sidebar;
