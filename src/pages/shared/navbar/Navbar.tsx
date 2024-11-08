import { Link, NavLink, useNavigate } from "react-router-dom";
import logoImage from "../../../assets/images/logov2.png";
import "./Navbar.css";
import { useSelector } from "react-redux";
import { currentUser, logOut } from "../../../redux/features/auth/authSlice";
import { useAppDispatch } from "../../../redux/hook";
import { toast } from "sonner";
import { CircleUserRound, Home, LogOut, User } from "lucide-react";
import { Dropdown, MenuProps } from "antd";

import { useContext } from "react";
import { ThemeContext } from "../../../context/ThemeProvider";

const Navbar = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const user: Record<string, any> | null = useSelector(currentUser);

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
  const navItems = [
    {
      label: "Home",
      path: "",
    },
    {
      label: "Bikes",
      path: "bikes",
    },
    {
      label: "Contact",
      path: "contact",
    },
    {
      label: "About Us",
      path: "about",
    },
  ];

  return (
    <div className="navbar bg-base-100 shadow-lg">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[10] mt-3 w-52 p-2 shadow"
          >
            {navItems.map((item) => (
              <li key={item.label}>
                <NavLink to={`/${item.path}`}>{item.label}</NavLink>
              </li>
            ))}
          </ul>
        </div>
        <Link to={"/"}>
          <img width={100} src={logoImage} alt="bike-logo" />
        </Link>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          {navItems.map((item) => (
            <li key={item.label}>
              <NavLink to={`/${item.path}`}>{item.label}</NavLink>
            </li>
          ))}
        </ul>
      </div>

      <div className="navbar-end">
        {user && user?.email ? (
          <>
            <div className="flex items-center justify-end gap-3 mr-4 h-16">
              <div className="text-accent">
                <p
                  defaultChecked={theme === "dark"}
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
                  <p className="border-2 border-accent cursor-pointer  rounded-full p-2">
                    <CircleUserRound className="text-accent" size={22} />
                  </p>
                </a>
              </Dropdown>
            </div>
          </>
        ) : (
          <>
            <button className="btn btn-sm btn-accent text-white mr-3">
              <Link to={"/login"}>Login</Link>
            </button>
            <button className="btn btn-sm btn-secondary text-white mr-3">
              <Link to="/signup">Sign up</Link>
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default Navbar;
