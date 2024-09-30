import { useSelector } from "react-redux";
import Spinner from "../../../components/ui/spinner/Spinner";
import { useGetRentAllBikeQuery } from "../../../redux/features/rent/rentApi";
import { currentUser } from "../../../redux/features/auth/authSlice";
import { useEffect } from "react";
import { TRental } from "../../../types/rental.type";
import { Tabs, TabsProps } from "antd";

import DashboardSectionTitle from "../../../components/ui/dashboardSectionTitlte/DashboardSectionTitle";
import UnpaidRentals from "./UnpaidRentals";
import PaidRentals from "./PaidRentals";
import { TBike } from "../../../types/bike.type";
import { TUser } from "../../../types/user.type";

export type TTableProps = {
  startTime: string;
  _id: string;
  bikeName: string;
  bikeId: TBike;
  userId: TUser;
  userEmail: string;
  name: string;
  returnTime: string;
  totalCost: string;
  paymentStatus: string;
};

const MyRentals = () => {
  const user = useSelector(currentUser);
  const { data, isLoading, refetch } = useGetRentAllBikeQuery([]);

  useEffect(() => {
    if (user) {
      refetch();
    }
  }, [user, refetch]);

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

  if (isLoading) {
    return <Spinner />;
  }
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