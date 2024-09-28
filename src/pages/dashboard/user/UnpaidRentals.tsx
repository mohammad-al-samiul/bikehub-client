import { Button, Table } from "antd";
import { TBike } from "../../../types/bike.type";

import { useGetMyProfileQuery } from "../../../redux/features/auth/authApi";
import { TUser } from "../../../types/user.type";

export type TTableProps = {
  startTime: string;
  returnTime: string;
  totalCost: number;
  _id: string;
  bikeId: TBike;
};

const UnpaidRentals = ({
  loading,
  options,
}: {
  options: TTableProps[];
  loading: boolean;
}) => {
  const { data } = useGetMyProfileQuery(undefined);
  const usreData = data?.data as TUser;
  console.log("userData", usreData);
  const handlePayment = (totalCost: number, name: string, id: string) => {
    const paymentInfo = {
      total_amount: totalCost,
      currency: "BDT",
      product_name: name,
      product_category: "bike",
      cus_name: usreData?.name,
      cus_email: usreData?.email,
      cus_add1: usreData?.address,
      cus_postcode: usreData?.address,
      cus_country: "Bangladesh",
      cus_phone: usreData?.phone,
    };
  };

  const columns = [
    {
      title: "Bike Name",
      dataIndex: "name",
      key: "name",
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
        <p>{returnTime === null ? "Not returned yet" : returnTime}</p>
      ),
      key: "returnTime",
    },
    {
      title: "Total Cost",
      render: ({ totalCost }: { totalCost: number }) => (
        <p>{totalCost === 0 ? "Not calculated yet" : totalCost}</p>
      ),
      key: "totalCost",
    },
    {
      title: "Payment",
      render: ({
        totalCost,
        name,
        key,
      }: {
        totalCost: number;
        name: string;
        key: string;
      }) => (
        // <RButtonSmall onClick={() => handlePayment(totalCost, name, key)}>
        //   Pay Now
        // </RButtonSmall>
        <Button onClick={() => handlePayment(totalCost, name, key)}>
          Pay Now
        </Button>
      ),
      key: "address",
    },
  ];

  return (
    <div>
      <Table
        loading={loading}
        dataSource={options}
        columns={columns}
        scroll={{ x: 800 }}
      />
    </div>
  );
};

export default UnpaidRentals;
