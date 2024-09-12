import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import { Button, Dropdown, Layout, MenuProps } from "antd";
import { useEffect, useState } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";

import {
  CircleUserRound,
  Home,
  LogOut,
  Moon,
  SunMoon,
  User,
} from "lucide-react";

import { toast } from "sonner";
import { useAppDispatch, useAppSelector } from "../../redux/hook";
import { currentUser, logOut } from "../../redux/features/auth/authSlice";
import {
  changeTheme,
  useGetCurrentMode,
} from "../../redux/features/theme/themeSlice";
import Sidebar from "../ui/Sidebar";

const { Header, Content } = Layout;
const DashboardLayout = () => {
  const [collapsed, setCollapsed] = useState(false);
  useEffect(() => {
    if (window.innerWidth < 610) {
      setCollapsed(true);
    }
  }, []);
  const user = useAppSelector(currentUser);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const mode = useAppSelector(useGetCurrentMode);

  const handleLogout = () => {
    dispatch(logOut());
    toast.success("User logged out successfully!");
    return navigate("/login");
  };

  //header drop down options
  const items: MenuProps["items"] = [
    {
      label: (
        <div className="flex items-center gap-2">
          <User size={14} />
          <Link to={`/dashboard/${user?.role}`}>Profile</Link>
        </div>
      ),
      key: "0",
    },
    {
      label: (
        <div className="flex items-center gap-2">
          <Home size={14} />
          <Link to={"/"}>Home</Link>
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

  const handleChangeMode = () => {
    dispatch(changeTheme(mode === "light" ? "dark" : "light"));
  };

  return (
    <div className={`${mode === "dark" ? "dark-mode" : ""}`}>
      <Layout>
        <Sidebar collapsed={collapsed} />
        <Layout>
          <Header
            style={{ position: "sticky", top: "0", left: "0", zIndex: 0 }}
            className={`bg-white dark:bg-primaryColor pl-0 md:pr-10 pr-4 shadow-sm dashboardHeader border-b  dark:border-b-[#4d4d4d]`}
          >
            <div className="flex items-center justify-between">
              <Button
                type="text"
                icon={
                  collapsed ? (
                    <MenuUnfoldOutlined className="text-primaryColor dark:text-gray-300" />
                  ) : (
                    <MenuFoldOutlined className="text-primaryColor dark:text-gray-300" />
                  )
                }
                onClick={() => setCollapsed(!collapsed)}
                style={{
                  fontSize: "16px",
                  width: 64,
                  height: 64,
                }}
              />
              <div className="flex items-center gap-3">
                <div className="text-white">
                  <p
                    onClick={handleChangeMode}
                    className="border-2 border-white cursor-pointer bg-accentColor rounded-full p-5 flex items-center justify-center relative"
                  >
                    <Moon
                      className={`text-white ${
                        mode === "dark" ? "opacity-0" : "opacity-100"
                      } absolute left-0 top-[9px] w-full duration-300`}
                      size={22}
                    />
                    <SunMoon
                      className={`text-white ${
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
                  <a
                    className="rounded-full"
                    onClick={(e) => e.preventDefault()}
                  >
                    <p className="border-2 border-white cursor-pointer bg-accentColor rounded-full p-2">
                      <CircleUserRound className="text-white" size={22} />
                    </p>
                  </a>
                </Dropdown>
              </div>
            </div>
          </Header>
          <Content
            className="md:py-8 py-5 md:px-12 px-6 bg-[#fffcf8] dark:bg-darkPrimary"
            style={{
              minHeight: 280,
              // backgroundColor: "#fffcf8",
            }}
          >
            <Outlet />
          </Content>
        </Layout>
      </Layout>
    </div>
  );
};

export default DashboardLayout;
