import { Link, NavLink, useNavigate } from "react-router-dom";
import logoImage from "../../../assets/images/logov2.png";
import "./Navbar.css";
import { useSelector } from "react-redux";
import { currentUser, logOut } from "../../../redux/features/auth/authSlice";
import { useAppDispatch } from "../../../redux/hook";
import { toast } from "sonner";
import { CircleUserRound, Home, LogOut, User } from "lucide-react";
import { Dropdown, MenuProps } from "antd";

// import { useContext } from "react";
// import { ThemeContext } from "../../../context/ThemeProvider";

const Navbar = () => {
  // const { theme, toggleTheme } = useContext(ThemeContext);
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
            <Link to={"/login"}>
              <button className="btn btn-sm btn-accent text-white mr-3">
                Login
              </button>
            </Link>
            <Link to={"/signup"}>
              <button className="btn btn-sm btn-secondary text-white mr-3">
                Sign up
              </button>
            </Link>
          </>
        )}
      </div>
    </div>
  );
};

export default Navbar;
