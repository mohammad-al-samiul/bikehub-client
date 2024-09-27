import { currentToken, logOut } from "../../redux/features/auth/authSlice";
import { Navigate } from "react-router-dom";
import { ReactNode } from "react";
import { verifyToken } from "../../utils/verifyToken";
import { useAppDispatch, useAppSelector } from "../../redux/hook";

type TProtectedRoute = {
  children: ReactNode;
  role?: Array<"user" | "admin"> | undefined;
};
const ProtectedRoutes = ({ children, role }: TProtectedRoute) => {
  const token = useAppSelector(currentToken);

  let user;

  if (token) {
    user = verifyToken(token);
  }

  const dispatch = useAppDispatch();

  if (
    role !== undefined &&
    (!user?.role || !role.includes(user.role as "user" | "admin"))
  ) {
    dispatch(logOut());
    return <Navigate to="/login" replace={true} />;
  }
  if (!token) {
    return <Navigate to="/login" replace={true} />;
  }

  return children;
};

export default ProtectedRoutes;
