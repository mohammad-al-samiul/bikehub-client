/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from "react";
import {
  Button,
  ConfigProvider,
  Space,
  Table,
  Tooltip,
  Popconfirm,
  message,
} from "antd";
import { QuestionCircleOutlined } from "@ant-design/icons";
import { Edit, Trash } from "lucide-react";
import {
  useDeleteBikeMutation,
  useGetBikesQuery,
} from "../../../redux/features/bike/bikeApi";
import Spinner from "../../../components/ui/spinner/Spinner";
import DashboardSectionTitle from "../../../components/ui/dashboardSectionTitlte/DashboardSectionTitle";
import CreateBikeModal from "./CreateBikeModal";
import UpdateBikeModal from "./UpdateBikeModal";
import { toast } from "sonner";
import type { TableColumnsType, TableProps } from "antd";

type OnChange = NonNullable<TableProps<DataType>["onChange"]>;
type Filters = Parameters<OnChange>[1];

type DataType = {
  key: string;
  _id: string;
  name: string;
  brand: string;
  model: string;
  pricePerHour: number;
  isAvailable: boolean;
  status?: string;
  year: number;
};
type SortState = {
  order?: "ascend" | "descend" | null;
  columnKey?: React.Key;
};

const BikesManagement: React.FC = () => {
  const [filteredInfo, setFilteredInfo] = useState<Filters>({});
  const [sortedInfo, setSortedInfo] = useState<SortState>({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [selectedBikeId, setSelectedBikeId] = useState<string | null>(null);

  const { data: BikesData, isLoading } = useGetBikesQuery([]);
  const [deleteBike] = useDeleteBikeMutation();

  if (isLoading) return <Spinner />;

  const bikes = BikesData?.data || [];

  const handleDelete = async (bikeId: string) => {
    try {
      const res = await deleteBike(bikeId).unwrap();
      if (res.success) toast.success("Bike deleted successfully!");
    } catch (error: any) {
      message.error("An error occurred while deleting the bike.");
    }
  };

  const data: DataType[] = bikes.map((bike: DataType) => ({
    key: bike._id,
    _id: bike._id,
    name: bike.name,
    brand: bike.brand,
    model: bike.model,
    status: bike.isAvailable ? "Available" : "Not Available",
    year: bike.year,
    pricePerHour: bike.pricePerHour,
  }));

  const columns: TableColumnsType<DataType> = [
    { title: "Name", dataIndex: "name", key: "name", ellipsis: true },
    {
      title: "Brand",
      dataIndex: "brand",
      key: "brand",
      filters: [...new Set(data.map((bike) => bike.brand))].map((brand) => ({
        text: brand,
        value: brand,
      })),
      filteredValue: filteredInfo.brand || null,
      onFilter: (value, record) => record.brand.includes(value as string),
      sorter: (a, b) => a.brand.localeCompare(b.brand),
      sortOrder: sortedInfo.columnKey === "brand" ? sortedInfo.order : null,
      ellipsis: true,
    },
    {
      title: "Price Per Hour",
      dataIndex: "pricePerHour",
      key: "pricePerHour",
      sorter: (a, b) => a.pricePerHour - b.pricePerHour,
      sortOrder:
        sortedInfo.columnKey === "pricePerHour" ? sortedInfo.order : null,
      ellipsis: true,
    },
    { title: "Year", dataIndex: "year", key: "year", ellipsis: true },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      sorter: (a, b) => a.status!.localeCompare(b.status!),
      sortOrder: sortedInfo.columnKey === "status" ? sortedInfo.order : null,
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <Tooltip title="Edit Bike">
            <Edit
              onClick={() => updateShowModal(record._id)}
              className="text-yellow-500"
            />
          </Tooltip>
          <Tooltip title="Delete Bike">
            <Popconfirm
              title="Delete the Bike"
              description="Are you sure to delete this bike?"
              icon={<QuestionCircleOutlined style={{ color: "red" }} />}
              onConfirm={() => handleDelete(record._id)}
              okText="Yes"
              cancelText="No"
            >
              <Trash className="text-red-500" />
            </Popconfirm>
          </Tooltip>
        </Space>
      ),
    },
  ];

  const handleChange: OnChange = (_, filters, sorter) => {
    setFilteredInfo(filters);

    if (Array.isArray(sorter)) {
      setSortedInfo(sorter[0]);
    } else {
      setSortedInfo(sorter);
    }
  };
  const clearFilters = () => setFilteredInfo({});
  const clearAll = () => {
    setFilteredInfo({});
    setSortedInfo({});
  };
  const setPriceSort = () =>
    setSortedInfo({ order: "descend", columnKey: "pricePerHour" });

  
  const updateShowModal = (bikeId: string) => {
    setSelectedBikeId(bikeId);
    setIsUpdateModalOpen(true);
  };

  return (
    <div className="p-2 sm:p-6">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
        <DashboardSectionTitle heading="All Bikes" align="left" />
        <ConfigProvider>
          <Button className="mb-2" onClick={createShowModal}>
            Create Bike
          </Button>
        </ConfigProvider>
      </div>

      <Space style={{ marginBottom: 16 }} wrap>
        <Button onClick={setPriceSort}>Sort Price</Button>
        <Button onClick={clearFilters}>Clear filters</Button>
        <Button onClick={clearAll}>Clear filters and sorters</Button>
      </Space>

      <Table<DataType>
        columns={columns}
        dataSource={data}
        onChange={handleChange}
        scroll={{ x: "max-content" }}
      />

      <CreateBikeModal
        handleCancel={() => setIsModalOpen(false)}
        handleOk={() => setIsModalOpen(false)}
        isModalOpen={isModalOpen}
      />

      <UpdateBikeModal
        bikeId={selectedBikeId!}
        handleCancel={() => setIsUpdateModalOpen(false)}
        handleOk={() => setIsUpdateModalOpen(false)}
        isModalOpen={isUpdateModalOpen}
      />
    </div>
  );
};

export default BikesManagement;
