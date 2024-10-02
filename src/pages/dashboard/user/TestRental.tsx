import { Button, Table, Tabs, TabsProps } from "antd";
import { useGetMyProfileQuery } from "../../../redux/features/auth/authApi";
import { TUser } from "../../../types/user.type";
import { TTableProps } from "./MyRentals";
import DashboardSectionTitle from "../../../components/ui/dashboardSectionTitlte/DashboardSectionTitle";
import UnpaidRentals from "./UnpaidRentals";
import { TRental } from "../../../types/rental.type";
import { useGetRentAllBikeQuery } from "../../../redux/features/rent/rentApi";
import PaidRentals from "./PaidRentals";
import Spinner from "../../../components/ui/spinner/Spinner";

const TestRentals = () => {
  const { data, isLoading } = useGetRentAllBikeQuery([]);

  console.log("rentData", data?.data);
  // Filtering paid and unpaid rental data
  const paidData = data?.data?.filter(
    (item: TRental) => item?.paymentStatus === "Paid"
  );
  const unPaidData = data?.data?.filter(
    (item: TRental) => item?.paymentStatus === "Pending"
  );

  // Mapping rental data for displaying in tabs
  const paidRentalItems = paidData?.map(
    ({
      startTime,
      returnTime,
      totalCost,
      _id,
      bikeId,
      userEmail,
      paymentStatus,
    }: TTableProps) => ({
      key: _id,
      bikeName: bikeId.name,
      bikeId: bikeId._id,
      userEmail,
      startTime,
      returnTime,
      totalCost,
      paymentStatus,
    })
  );

  const unPaidRentalItems = unPaidData?.map(
    ({
      startTime,
      returnTime,
      totalCost,
      _id,
      bikeId,
      userEmail,
    }: TTableProps) => ({
      key: _id,
      bikeName: bikeId.name,
      userEmail,
      bikeId: bikeId._id,
      _id: _id,
      startTime,
      returnTime,
      totalCost,
    })
  );

  // tab props
  const items: TabsProps["items"] = [
    {
      key: "1",
      label: "Unpaid",
      children: (
        <UnpaidRentals loading={isLoading} options={unPaidRentalItems} />
      ),
    },
    {
      key: "2",
      label: "Paid",
      children: <PaidRentals loading={isLoading} options={paidRentalItems} />,
    },
  ];

  if (isLoading) {
    return <Spinner />;
  }
  return (
    <div>
      <DashboardSectionTitle heading="All you rented" />
      <Tabs defaultActiveKey="1" items={items} />
    </div>
  );
};

export default TestRentals;
