// src/components/ReturnBikeList.tsx
import React, { useEffect, useState } from "react";
import { Table, Space, TableColumnsType, Button } from "antd";
import { useGetRentAllBikeQuery } from "../../../redux/features/rent/rentApi";
import CalculateRentalCostModal from "./CalculateRentalCostModal";
import Spinner from "../../../components/ui/spinner/Spinner";
import { useSelector } from "react-redux";
import { currentUser } from "../../../redux/features/auth/authSlice";

type DataType = {
  key: string;
  _id?: string;
  bikeId: {
    _id: string;
    name: string;
  };
  userEmail: string;
  startTime: string;
  isReturned: boolean;
  totalCost: number;
  returnTime: string | null;
};

const ReturnBikeList: React.FC = () => {
  const [rentalId, setRentalId] = useState("");
  const [isCalculationModalOpen, setIsCalculationModalOpen] = useState(false);
  const user = useSelector(currentUser);
  const { data: rentalData, isLoading, refetch } = useGetRentAllBikeQuery([]);

  useEffect(() => {
    if (user) {
      refetch();
    }
  }, [user, refetch]);

  if (isLoading) {
    return <Spinner />;
  }

  const rentals = rentalData?.data;
  // console.log("rentals", rentals);

  const data: DataType[] = rentals?.map((rental: DataType) => ({
    key: rental?.bikeId?._id,
    _id: rental?._id,
    bikeId: rental?.bikeId?.name,
    userEmail: rental?.userEmail,
    startTime: rental?.startTime,
    isReturned: rental?.isReturned || null,
    totalCost: rental?.totalCost ? rental?.totalCost : "Not yet calculate",
    returnTime: rental?.returnTime ? rental.returnTime : "Not yet Return",
  }));

  const showCalculationModal = (id: string) => {
    setRentalId(id);
    setIsCalculationModalOpen(true);
  };

  const columns: TableColumnsType<DataType> = [
    {
      title: "Bike Name",
      dataIndex: "bikeId",
      key: "bikeId",
      ellipsis: true,
    },
    {
      title: "Client Email",
      dataIndex: "userEmail",
      key: "userEmail",
      ellipsis: true,
    },
    {
      title: "Start Time",
      dataIndex: "startTime",
      key: "startTime",
      render: (time: string) => time.toLocaleString(),
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
            <Button onClick={() => showCalculationModal(record?._id as string)}>
              Return Bike
            </Button>
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
