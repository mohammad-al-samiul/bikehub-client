import { Button, Table } from "antd";
import { useMemo } from "react";
import { TBike } from "../../../types/bike.type";

import { useCreatePaymentMutation } from "../../../redux/features/payment/paymentApi";

export type TTableProps = {
  startTime: string;
  returnTime: string;
  bikeName: string;
  totalCost: number;
  _id: string;
  paymentStatus: string;
  userEmail: string;
  bikeId: TBike;
};

const UnpaidRentals = ({
  loading,
  options,
}: {
  options: TTableProps[];
  loading: boolean;
}) => {
  const [createPayment] = useCreatePaymentMutation();

  const handlePayment = async (item: TTableProps) => {
    const paymentInfo = {
      clientEmail: item?.userEmail,
      bikeName: item?.bikeName,
      bikeId: item?.bikeId,
      totalCost: item?.totalCost,
      startTime: item?.startTime,
      returnTime: item?.returnTime,
    };

    // console.log("paymentInfo", paymentInfo);

    try {
      const res = await createPayment(paymentInfo).unwrap();
      //   window.location.href = res?.payment_url;
      window.open(res?.payment_url, "_blank");
    } catch (error) {
      console.log(error);
    }
  };

  const columns = useMemo(
    () => [
      {
        title: "Bike Name",
        dataIndex: "bikeName",
        key: "bikeName",
      },
      {
        title: "Client Email",
        dataIndex: "userEmail",
        key: "userEmail",
      },
      {
        title: "Start Time",
        dataIndex: "startTime",
        key: "startTime",
      },
      {
        title: "Return Time",
        render: ({ returnTime }: { returnTime: string }) => (
          <p>{returnTime || "Not returned yet"}</p>
        ),
        key: "returnTime",
      },
      {
        title: "Total Cost",
        render: ({ totalCost }: { totalCost: number }) => (
          <p>{totalCost > 0 ? totalCost : "Not calculated yet"}</p>
        ),
        key: "totalCost",
      },
      {
        title: "Payment",
        render: ({ ...unpaidItem }: TTableProps) => (
          <Button onClick={() => handlePayment(unpaidItem)}>Pay Now</Button>
        ),
        key: "payment",
      },
    ],
    []
  );

  return (
    <Table
      loading={loading}
      dataSource={options}
      columns={columns}
      scroll={{ x: 800 }}
      rowKey="_id"
    />
  );
};

export default UnpaidRentals;