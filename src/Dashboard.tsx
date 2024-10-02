import { useGetCurrentMode } from "./redux/features/theme/themeSlice";
import { useAppSelector } from "./redux/hook";
import ProtectedRoutes from "./components/layouts/ProtectedRoutes";
import DashboardLayout from "./components/layouts/DashboardLayout";

const Dashboard = () => {
  const mode = useAppSelector(useGetCurrentMode);
  return (
    <div className={`${mode || "light"} bg-white `}>
      <ProtectedRoutes role={undefined}>
        <DashboardLayout />
      </ProtectedRoutes>
    </div>
  );
};

export default Dashboard;
