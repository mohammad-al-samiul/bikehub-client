import React, { useContext } from "react";

import { Dropdown, Layout, MenuProps, theme } from "antd";
import { Link, Outlet, useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar";
import { CircleUserRound, Home, LogOut, User } from "lucide-react";
import { useAppDispatch, useAppSelector } from "../../redux/hook";
import { currentUser, logOut } from "../../redux/features/auth/authSlice";

import { toast } from "sonner";
import { ThemeContext } from "../../context/ThemeProvider";

const { Header, Content } = Layout;

const DashboardLayout: React.FC = () => {
  const { theme: mainTheme, toggleTheme } = useContext(ThemeContext);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const user: Record<string, any> | null = useAppSelector(currentUser);

  const handleLogout = () => {
    dispatch(logOut());
    toast.success("User logged out successfully!");
    return navigate("/login");
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
            <div className="text-accent mt-6">
              <p
                defaultChecked={mainTheme === "dark"}
                onChange={toggleTheme}
                className="mt-2"
              >
                <label className="swap swap-rotate">
                  <input type="checkbox" />

                  {/* sun icon */}
                  <svg
                    className="swap-on h-10 w-10 fill-current"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                  >
                    <path d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z" />
                  </svg>

                  {/* moon icon */}
                  <svg
                    className="swap-off h-10 w-10 fill-current"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                  >
                    <path d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z" />
                  </svg>
                </label>
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
