import DashboardLayout from "./components/ui/DashboardLayout";
import { useGetCurrentMode } from "./redux/features/theme/themeSlice";
import { useAppSelector } from "./redux/hook";
import ProtectedRoutes from "./components/layouts/ProtectedRoutes";

const Dashboard = () => {
  const mode = useAppSelector(useGetCurrentMode);
  return (
    <div className={`${mode || "light"} bg-white dark:bg-primaryColor`}>
      <ProtectedRoutes role={undefined}>
        <DashboardLayout />
      </ProtectedRoutes>
    </div>
  );
};

export default Dashboard;
