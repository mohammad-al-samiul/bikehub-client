import { useSelector } from "react-redux";
import { currentUser } from "../redux/features/auth/authSlice";
import { Navigate, useLocation } from "react-router-dom";
import { ReactNode } from "react";

const ProtectedRoutes = ({ children }: { children: ReactNode }) => {
  const location = useLocation();

  const user = useSelector(currentUser);

  if (!user) {
    return <Navigate to={"/login"} state={{ from: location }} replace />;
  }

  return children;
};

export default ProtectedRoutes;
