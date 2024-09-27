// src/components/ReturnBikeList.tsx
import React, { useState } from "react";
import { Table, Space, TableColumnsType, Button, ConfigProvider } from "antd";

import { useGetRentAllBikeQuery } from "../../../redux/features/rent/rentApi";
import CalculateRentalCostModal from "./CalculateRentalCostModal";
import Spinner from "../../../components/ui/spinner/Spinner";

type DataType = {
  key: string;
  _id: string;
  bikeId: string;
  userEmail: string;
  startTime: string;
  isReturned: boolean;
  totalCost: number;
  returnTime: string | null;
};

const ReturnBikeList: React.FC = () => {
  const [rentalId, setRentalId] = useState("");
  const [isCalculationModalOpen, setIsCalculationModalOpen] = useState(false);

  const { data: rentalData, isLoading } = useGetRentAllBikeQuery([]);

  if (isLoading) {
    return <Spinner />;
  }

  const rentals = rentalData?.data;
  //console.log("rentals", rentals);

  const data: DataType[] = rentals?.map((rental: DataType) => ({
    key: rental?._id,
    _id: rental?._id,
    bikeId: rental?.bikeId,
    userEmail: rental?.userEmail,
    startTime: rental?.startTime,
    isReturned: rental?.isReturned || null,
    totalCost: rental?.totalCost || null,
    returnTime: rental?.returnTime,
  }));

  const showCalculationModal = (id: string) => {
    setRentalId(id);
    setIsCalculationModalOpen(true);
  };

  const customTheme = {
    token: {
      colorPrimary: "#0d9488", // Change this to your primary color
    },
  };

  const columns: TableColumnsType<DataType> = [
    {
      title: "Bike ID",
      dataIndex: "bikeId",
      key: "bikeId",
      ellipsis: true,
    },
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
      ellipsis: true,
    },
    {
      title: "Total Cost",
      dataIndex: "totalCost",
      key: "totalCost",
      ellipsis: true,
    },

    {
      title: "Action",
      key: "isReturned",
      render: (_, record) => (
        <Space size="middle">
          {record?.isReturned ? (
            <button>Returned</button>
          ) : (
            <ConfigProvider theme={customTheme}>
              <Button onClick={() => showCalculationModal(record?._id)}>
                Return Bike
              </Button>
            </ConfigProvider>
          )}
        </Space>
      ),
    },
  ];

  return (
    <div>
      <Table dataSource={data} columns={columns} rowKey="_id" />
      <CalculateRentalCostModal
        rentalId={rentalId}
        isModalOpen={isCalculationModalOpen}
        setIsModalOpen={setIsCalculationModalOpen}
      />
    </div>
  );
};

export default ReturnBikeList;
