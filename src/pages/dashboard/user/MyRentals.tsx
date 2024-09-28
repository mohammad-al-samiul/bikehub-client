import { useSelector } from "react-redux";
import Spinner from "../../../components/ui/spinner/Spinner";
import { useGetRentAllBikeQuery } from "../../../redux/features/rent/rentApi";
import { currentUser } from "../../../redux/features/auth/authSlice";
import { useEffect } from "react";
import { TRental } from "../../../types/rental.type";
import { Tabs, TabsProps } from "antd";

import { TTableProps } from "../admin/Rentals";

import DashboardSectionTitle from "../../../components/ui/dashboardSectionTitlte/DashboardSectionTitle";
import UnpaidRentals from "./UnpaidRentals";
import PaidRentals from "./PaidRentals";

const MyRentals = () => {
  const user = useSelector(currentUser);
  const { data, isLoading, refetch } = useGetRentAllBikeQuery([]);

  useEffect(() => {
    if (user) {
      refetch();
    }
  }, [user, refetch]);
  if (isLoading) {
    return <Spinner />;
  }
  console.log("rentData", data?.data);

  const paidData = data?.data?.filter(
    (item: TRental) => item?.paymentStatus === "Paid"
  );
  const unPaidData = data?.data?.filter(
    (item: TRental) => item?.paymentStatus === "Pending"
  );

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
      name: bikeId.name,
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
      name: bikeId.name,
      userEmail,
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

  return (
    <div>
      <DashboardSectionTitle heading="All you rented" />
      <Tabs defaultActiveKey="1" items={items} />
    </div>
  );
};

export default MyRentals;
