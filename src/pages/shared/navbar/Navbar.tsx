import { Link, NavLink, useNavigate } from "react-router-dom";
import logoImage from "../../../assets/images/logoModified.png";
import "./Navbar.css";

import { useSelector } from "react-redux";

import { currentUser, logOut } from "../../../redux/features/auth/authSlice";
import { useAppDispatch } from "../../../redux/hook";
import { toast } from "sonner";

const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const user: Record<string, any> | null = useSelector(currentUser);

  const handleLogout = () => {
    dispatch(logOut());
    toast.success("Logged out successful");
    navigate("/");
  };

  console.log(user);
  const navItems = [
    {
      label: "Home",
      path: "home",
    },
    {
      label: "Bikes",
      path: "bikes",
    },
    {
      label: "Contact",
      path: "contact",
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
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
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
            <div className="dropdown dropdown-end">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-circle avatar"
              >
                <div className="w-10 rounded-full">
                  <img
                    alt="Tailwind CSS Navbar component"
                    src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                  />
                </div>
              </div>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
              >
                <li>
                  <NavLink to={"/"} className="justify-between">
                    Profile
                  </NavLink>
                </li>
                <li>
                  <NavLink to={"/dashboard"}>Dashboard</NavLink>
                </li>
                <li onClick={handleLogout}>
                  <button className="text-red-500 font-bold">Logout</button>
                </li>
              </ul>
            </div>
          </>
        ) : (
          <>
            <button className="btn btn-sm btn-neutral">
              <Link to={"/login"}>Login</Link>
            </button>
            <button className="btn btn-sm btn-secondary">
              <Link to={"/signup"}>Sign up</Link>
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default Navbar;
