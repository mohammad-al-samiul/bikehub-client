import { Layout, Menu } from "antd";

import { sidebarItemsGenerator } from "../../utils/sidebarItemGenerator";
import { adminPaths } from "../../routes/admin.routes";
import { userPaths } from "../../routes/user.routes";
import { useAppSelector } from "../../redux/hook";
import { currentToken } from "../../redux/features/auth/authSlice";
import { verifyToken } from "../../utils/verifyToken";
import { TUser } from "../../types/user.type";
import React from "react";
import { Link } from "react-router-dom";

const { Sider } = Layout;

const userRole = {
  ADMIN: "admin",
  USER: "user",
};

type TSidebarProps = {
  toggleTheme?: "dark" | "light";
};

const Sidebar: React.FC<TSidebarProps> = ({ toggleTheme = "dark" }) => {
  const token = useAppSelector(currentToken);

  let user;

  if (token) {
    user = verifyToken(token);
  }

  let sidebarItems;

  switch ((user as TUser)!.role) {
    case userRole.ADMIN:
      sidebarItems = sidebarItemsGenerator(adminPaths, userRole.ADMIN);
      break;

    case userRole.USER:
      sidebarItems = sidebarItemsGenerator(userPaths, userRole.USER);
      break;

    default:
      break;
  }

  return (
    <Sider
      theme={toggleTheme}
      breakpoint="lg"
      collapsedWidth="0"
      style={{ height: "100vh", position: "sticky", top: "0", left: "0" }}
    >
      <div
        style={{
          color: "white",
          height: "4rem",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Link to={"/"}>
          <h1 className="font-bold text-teal-500 text-xl">Bike Hub</h1>
        </Link>
      </div>
      <Menu
        theme={toggleTheme}
        mode="inline"
        defaultSelectedKeys={["4"]}
        items={sidebarItems}
      />
    </Sider>
  );
};

export default Sidebar;
