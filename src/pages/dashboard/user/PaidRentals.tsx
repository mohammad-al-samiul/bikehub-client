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
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Start Time",
      dataIndex: "startTime",
      key: "startTime",
    },
    {
      title: "Return Time",
      dataIndex: "endTime",
      key: "endTime",
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
