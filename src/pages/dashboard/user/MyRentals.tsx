import { useEffect, useMemo } from "react";
import { Tabs, TabsProps } from "antd";
import Spinner from "../../../components/ui/spinner/Spinner";
import { useGetRentAllBikeQuery } from "../../../redux/features/rent/rentApi";
import { useGetPaymentByUserQuery } from "../../../redux/features/payment/paymentApi";
import DashboardSectionTitle from "../../../components/ui/dashboardSectionTitlte/DashboardSectionTitle";
import UnpaidRentals from "./UnpaidRentals";
import PaidRentals from "./PaidRentals";

export type TTableProps = {
  startTime: string;
  _id: string;
  bikeName: string;
  bikeId: { _id: string; name: string };
  userEmail: string;
  returnTime: string;
  totalCost: string;
  paymentStatus: string;
};

const MyRentals = () => {
  // Fetch rental and payment data
  const {
    data: rentalData,
    isLoading: isRentLoading,
    isFetching,
    refetch,
  } = useGetRentAllBikeQuery(undefined);
  const { data: paymentData, refetch: refetchPaymentData } =
    useGetPaymentByUserQuery([]);

  // Effect to refetch rental data when payment data changes
  useEffect(() => {
    if (paymentData) refetch();
  }, [paymentData, refetch]);

  // Use memoization to filter and map rental data only when rentalData changes
  const paidRentalItems = useMemo(
    () =>
      rentalData?.data
        ?.filter((item: TTableProps) => item.paymentStatus === "Paid")
        .map(mapRentalData),
    [rentalData]
  );

  const unPaidRentalItems = useMemo(
    () =>
      rentalData?.data
        ?.filter((item: TTableProps) => item.paymentStatus === "Pending")
        .map(mapRentalData),
    [rentalData]
  );

  // Define tab properties
  const items: TabsProps["items"] = useMemo(
    () => [
      {
        key: "1",
        label: "Unpaid",
        children: (
          <UnpaidRentals loading={isFetching} options={unPaidRentalItems} />
        ),
      },
      {
        key: "2",
        label: "Paid",
        children: (
          <PaidRentals loading={isFetching} options={paidRentalItems} />
        ),
      },
    ],
    [unPaidRentalItems, paidRentalItems, isFetching, refetchPaymentData]
  );

  // If still loading initial data
  if (isRentLoading) return <Spinner />;

  return (
    <div>
      <DashboardSectionTitle heading="All you rented" />
      <Tabs defaultActiveKey="1" items={items} />
    </div>
  );
};

// Helper function to map rental data
const mapRentalData = (rental: TTableProps) => ({
  key: rental._id,
  bikeName: rental.bikeId.name,
  bikeId: rental.bikeId._id,
  userEmail: rental.userEmail,
  startTime: rental.startTime,
  returnTime: rental.returnTime,
  totalCost: rental.totalCost,
  paymentStatus: rental.paymentStatus,
});

export default MyRentals;
