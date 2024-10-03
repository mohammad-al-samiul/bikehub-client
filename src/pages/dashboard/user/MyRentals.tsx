import Spinner from "../../../components/ui/spinner/Spinner";
import { useGetRentAllBikeQuery } from "../../../redux/features/rent/rentApi";

import { TRental } from "../../../types/rental.type";
import { Tabs, TabsProps } from "antd";
import DashboardSectionTitle from "../../../components/ui/dashboardSectionTitlte/DashboardSectionTitle";
import UnpaidRentals from "./UnpaidRentals";
import PaidRentals from "./PaidRentals";
import { TBike } from "../../../types/bike.type";
import { TUser } from "../../../types/user.type";
import { useGetPaymentByUserQuery } from "../../../redux/features/payment/paymentApi";
import { useEffect, useState } from "react";

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
  const { data, isLoading, refetch } = useGetRentAllBikeQuery(undefined);
  const { data: paymentData, isLoading: paymentLoading } =
    useGetPaymentByUserQuery([]);
  const [paymentDataState, setPaymentDataState] = useState([]);

  useEffect(() => {
    if (paymentData?.data) {
      setPaymentDataState(paymentData.data);
    }
  }, [paymentDataState]);

  // Refetch when paymentDataState or data.data changes
  useEffect(() => {
    refetch();
  }, [paymentDataState, data?.data, refetch]);

  if (isLoading || paymentLoading) {
    return <Spinner />;
  }
  console.log("paymentState", paymentDataState);

  //console.log("rentData", data?.data);

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

  // Tab properties for paid and unpaid rentals
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
