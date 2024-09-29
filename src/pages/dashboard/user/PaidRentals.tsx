import { Table } from "antd";
import { TTableProps } from "./UnpaidRentals";

const PaidRentals = ({
  loading,
  options,
}: {
  options: TTableProps[];
  loading: boolean;
}) => {
  const columns = [
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
      dataIndex: "returnTime",
      key: "returnTime",
    },
    {
      title: "Total Cost",
      dataIndex: "totalCost",
      key: "totalCost",
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

export default PaidRentals;
