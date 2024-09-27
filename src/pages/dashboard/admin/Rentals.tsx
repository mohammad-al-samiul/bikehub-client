import { Button, Table } from "antd";
import DashboardSectionTitle from "../../../components/ui/dashboardSectionTitlte/DashboardSectionTitle";
import CalculateRentalCostModal from "./CalculateRentalCostModal";
import { TBike } from "../../../types/bike.type";
import { TUser } from "../../../types/user.type";
import { useState } from "react";
import { useGetRentAllBikeQuery } from "../../../redux/features/rent/rentApi";
import Spinner from "../../../components/ui/spinner/Spinner";

export type TTableProps = {
  startTime: string;
  _id: string;
  bikeId: TBike;
  userId: TUser;
  name: string;
  totalCost: string;
};

const Rentals = () => {
  const [rentalId, setRentalId] = useState("");
  const [isCalculationModalOpen, setIsCalculationModalOpen] = useState(false);
  const { data, isFetching, isLoading } = useGetRentAllBikeQuery([
    { name: "isPaid", value: false },
    { name: "totalCost", value: 0 },
  ]);

  if (isLoading) {
    return <Spinner />;
  }

  const rentData = data?.data;
  console.log(rentData);
  const rentalTableData = rentData.map((bike: TTableProps) => ({
    startTime: bike.startTime,
    key: bike?._id,
    name: bike?.name,
    pricePerHour: bike?.totalCost,
  }));

  // manage cost calculation

  const showCalculationModal = (id: string) => {
    setRentalId(id);
    setIsCalculationModalOpen(true);
  };

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Price(hourly)",
      dataIndex: "pricePerHour",
      key: "pricePerHour",
    },
    {
      title: "Tenant",
      dataIndex: "tenantName",
      key: "tenantName",
    },
    {
      title: "Actions",
      render: ({ key }: { key: string }) => (
        <div>
          <Button onClick={() => showCalculationModal(key)}>Calculate</Button>
        </div>
      ),
      key: "address",
    },
  ];
  return (
    <div>
      <div className="flex justify-between items-center">
        <DashboardSectionTitle heading="All Rentals" />
      </div>
      <Table
        dataSource={rentalTableData}
        loading={isFetching}
        columns={columns}
        scroll={{ x: 800 }}
      />
      <CalculateRentalCostModal
        rentalId={rentalId}
        isModalOpen={isCalculationModalOpen}
        setIsModalOpen={setIsCalculationModalOpen}
      />
    </div>
  );
};

export default Rentals;
