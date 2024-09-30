import React from "react";

import { Dropdown, Layout, MenuProps, theme } from "antd";
import { Link, Outlet, useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar";
import {
  CircleUserRound,
  Home,
  LogOut,
  Moon,
  SunMoon,
  User,
} from "lucide-react";
import { useAppDispatch, useAppSelector } from "../../redux/hook";
import { currentUser, logOut } from "../../redux/features/auth/authSlice";
import {
  changeTheme,
  useGetCurrentMode,
} from "../../redux/features/theme/themeSlice";
import { toast } from "sonner";

const { Header, Content } = Layout;

const DashboardLayout: React.FC = () => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const user: Record<string, any> | null = useAppSelector(currentUser);
  const mode = useAppSelector(useGetCurrentMode);

  const handleLogout = () => {
    dispatch(logOut());
    toast.success("User logged out successfully!");
    return navigate("/login");
  };

  const handleChangeMode = () => {
    dispatch(changeTheme(mode === "light" ? "dark" : "light"));
  };

  const items: MenuProps["items"] = [
    {
      label: (
        <div>
          <Link
            to={`/${user?.role}/profile`}
            className="flex items-center gap-2 hover:text-accent"
          >
            <span>
              <User size={14} />
            </span>
            Profile
          </Link>
        </div>
      ),
      key: "0",
    },
    {
      label: (
        <div className="">
          <Link to={"/"} className="hover:text-accent flex items-center gap-2">
            <span>
              <Home size={14} />
            </span>
            Home
          </Link>
        </div>
      ),

      key: "1",
    },
    {
      type: "divider",
    },
    {
      label: (
        <div onClick={handleLogout} className="flex items-center gap-2">
          <LogOut size={14} />
          <button>Log Out</button>
        </div>
      ),

      key: "3",
    },
  ];

  return (
    <Layout style={{ height: "100" }}>
      <Sidebar toggleTheme="light" />
      <Layout>
        <Header
          style={{
            top: "0",
            left: "0",
            zIndex: 0,
            padding: 0,
            background: colorBgContainer,
          }}
        >
          <div className="flex items-center justify-end gap-3 mr-4 h-16">
            <div className="text-teal-600">
              <p
                onClick={handleChangeMode}
                className="border-2 border-teal-600 cursor-pointer rounded-full p-5 flex items-center justify-center relative"
              >
                <Moon
                  className={`text-teal-600 ${
                    mode === "dark" ? "opacity-0" : "opacity-100"
                  } absolute left-0 top-[9px] w-full duration-300`}
                  size={22}
                />
                <SunMoon
                  className={`text-teal-600 ${
                    mode === "dark" ? "opacity-100" : "opacity-0"
                  } absolute left-0 top-[9px] w-full duration-300`}
                  size={22}
                />
              </p>
            </div>
            <Dropdown
              placement="bottomRight"
              menu={{ items }}
              trigger={["click"]}
            >
              <a className="rounded-full" onClick={(e) => e.preventDefault()}>
                <p className="border-2 border-teal-600 cursor-pointer bg-accentColor rounded-full p-2">
                  <CircleUserRound className="text-teal-600" size={22} />
                </p>
              </a>
            </Dropdown>
          </div>
        </Header>

        <Content style={{ margin: "24px 16px 0" }}>
          <div
            style={{
              padding: 24,
              minHeight: 360,
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
            <Outlet />
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default DashboardLayout;
