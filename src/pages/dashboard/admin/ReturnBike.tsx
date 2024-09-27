// src/components/ReturnBikeList.tsx
import React, { useState } from "react";
import { Table, message, Space, TableColumnsType, Button } from "antd";
import { TableProps } from "antd/es/table";
import {
  useGetRentAllBikeQuery,
  useReturnBikeMutation,
} from "../../../redux/features/rent/rentApi";

type OnChange = NonNullable<TableProps<DataType>["onChange"]>;
type Filters = Parameters<OnChange>[1];

type GetSingle<T> = T extends (infer U)[] ? U : never;
type Sorts = GetSingle<Parameters<OnChange>[2]>;

type DataType = {
  key: string;
  _id: string;
  userEmail: string;
  startTime: string;
  returnTime: string | null;
  totalCost: number;
  isReturned: string;
  paymentStatus: string;
};

const ReturnBikeList: React.FC = () => {
  const [filteredInfo, setFilteredInfo] = useState<Filters>({});
  const [sortedInfo, setSortedInfo] = useState<Sorts>({});
  const { data: rentalData, isLoading } = useGetRentAllBikeQuery([]);

  const [returnBike] = useReturnBikeMutation();

  const rentals = rentalData?.data;
  console.log("rentals", rentals);

  const handleReturn = async (rentalId: string) => {
    try {
      await returnBike(rentalId).unwrap();
      message.success("Bike returned successfully");
    } catch (error) {
      message.error("Failed to return bike");
    }
  };

  const data: DataType[] = rentals?.map((rental: DataType) => ({
    key: rental?._id,
    _id: rental?._id,
    userEmail: rental?.userEmail,
    startTime: rental?.startTime,
    returnTime: rental?.returnTime || "Not Returned",
    totalCost: rental?.totalCost,
    isReturned: rental?.isReturned ? "Yes" : "No",
    paymentStatus: rental?.paymentStatus ? "Paid" : "Unpaid",
  }));

  const columns: TableColumnsType<DataType> = [
    {
      title: "User Email",
      dataIndex: "userEmail",
      key: "userEmail",
      ellipsis: true,
    },
    {
      title: "Start Time",
      dataIndex: "startTime",
      key: "startTime",
      render: (time: string) => new Date(time).toLocaleString(),
      ellipsis: true,
    },
    {
      title: "Return Time",
      dataIndex: "returnTime",
      key: "returnTime",
      render: (time: string) =>
        time === "Not Returned"
          ? "Not Returned"
          : new Date(time).toLocaleString(),
      ellipsis: true,
    },
    {
      title: "Total Cost",
      dataIndex: "totalCost",
      key: "totalCost",
      render: (cost: number) => `$${cost.toFixed(2)}`,
      sorter: (a, b) => a.totalCost - b.totalCost,
      sortOrder: sortedInfo.columnKey === "totalCost" ? sortedInfo.order : null,
      ellipsis: true,
    },
    {
      title: "Payment Status",
      dataIndex: "paymentStatus",
      key: "paymentStatus",
      filters: [
        { text: "Paid", value: "Paid" },
        { text: "Unpaid", value: "Unpaid" },
      ],
      filteredValue: filteredInfo?.paymentStatus || null,
      onFilter: (value, record) => {
        const status = record.paymentStatus || "Unpaid"; // Handle undefined
        return status.includes(value as string);
      },
      sorter: (a, b) => a?.paymentStatus.length - b?.paymentStatus.length,
      sortOrder:
        sortedInfo.columnKey === "paymentStatus" ? sortedInfo.order : null,
      ellipsis: true,
    },

    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          {!record.isReturned ? (
            <Button type="primary" onClick={() => handleReturn(record._id)}>
              Return Bike
            </Button>
          ) : (
            <span>Returned</span>
          )}
        </Space>
      ),
    },
  ];

  // Handle sort and filter change
  const handleChange: OnChange = (pagination, filters, sorter) => {
    setFilteredInfo(filters);
    setSortedInfo(sorter as Sorts);
  };

  // Clear filters
  const clearFilters = () => {
    setFilteredInfo({});
  };

  // Clear all filters and sort
  const clearAll = () => {
    setFilteredInfo({});
    setSortedInfo({});
  };

  // Set price sort
  const setPriceSort = () => {
    setSortedInfo({
      order: "descend",
      columnKey: "totalCost",
    });
  };
  return (
    <div>
      <Space style={{ marginBottom: 16 }}>
        <Button onClick={setPriceSort}>Sort Price</Button>
        <Button onClick={clearFilters}>Clear filters</Button>
        <Button onClick={clearAll}>Clear filters and sorters</Button>
      </Space>
      <Table
        dataSource={data}
        columns={columns}
        rowKey="_id"
        loading={isLoading}
        onChange={handleChange}
      />
    </div>
  );
};

export default ReturnBikeList;
