import DashboardLayout from "./components/layouts/DashboardLayout";
import { useGetCurrentMode } from "./redux/features/theme/themeSlice";
import { useAppSelector } from "./redux/hook";
import ProtectedRoutes from "./routes/ProtectedRoutes";

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
