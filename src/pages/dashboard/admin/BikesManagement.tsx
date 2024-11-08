import {
  Button,
  ConfigProvider,
  message,
  Popconfirm,
  Space,
  Table,
  TableColumnsType,
  TableProps,
  Tooltip,
} from "antd";
import { QuestionCircleOutlined } from "@ant-design/icons";
import React, { useState } from "react";
import {
  useDeleteBikeMutation,
  useGetBikesQuery,
} from "../../../redux/features/bike/bikeApi";
import Spinner from "../../../components/ui/spinner/Spinner";
import { Edit, Trash } from "lucide-react";
import DashboardSectionTitle from "../../../components/ui/dashboardSectionTitlte/DashboardSectionTitle";
import CreateBikeModal from "./CreateBikeModal";
import UpdateBikeModal from "./UpdateBikeModal";
import { toast } from "sonner";

type OnChange = NonNullable<TableProps<DataType>["onChange"]>;
type Filters = Parameters<OnChange>[1];

type GetSingle<T> = T extends (infer U)[] ? U : never;
type Sorts = GetSingle<Parameters<OnChange>[2]>;

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

const BikesManagement: React.FC = () => {
  const [filteredInfo, setFilteredInfo] = useState<Filters>({});
  const [sortedInfo, setSortedInfo] = useState<Sorts>({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [selectedBikeId, setSelectedBikeId] = useState<string | null>();

  const { data: BikesData, isLoading } = useGetBikesQuery([]);

  const [deleteBike] = useDeleteBikeMutation();

  if (isLoading) {
    return <Spinner />;
  }

  const bikes = BikesData?.data;

  const handleDelete = async (bikeId: string) => {
    try {
      const res = await deleteBike(bikeId).unwrap();
      // console.log(res);
      if (res.success) {
        toast.success("Bike deleted successfully!");
      }
    } catch (error) {
      message.error("An error occurred while deleting the bike.");
    }
  };

  const data: DataType[] = bikes?.map((bike: DataType) => ({
    key: bike?._id,
    _id: bike?._id,
    name: bike?.name,
    brand: bike?.brand,
    model: bike?.model,
    status: bike?.isAvailable ? "Available" : "Not Available",
    year: bike?.year,
    pricePerHour: bike?.pricePerHour,
  }));

  const columns: TableColumnsType<DataType> = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      ellipsis: true,
    },
    {
      title: "Brand",
      dataIndex: "brand",
      key: "brand",
      filters: Array.from(new Set(data?.map((bike) => bike?.brand))).map(
        (brand) => ({
          text: brand,
          value: brand,
        })
      ),
      filteredValue: filteredInfo.brand || null,
      onFilter: (value, record) => record.brand.includes(value as string),
      sorter: (a, b) => a.brand.length - b.brand.length,
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
    {
      title: "Year",
      dataIndex: "year",
      key: "year",
      ellipsis: true,
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      sorter: (a, b) => a.status?.length! - b.status?.length!,
      sortOrder: sortedInfo.columnKey === "status" ? sortedInfo.order : null,
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <a>
            <Tooltip title="Edit Bike">
              <Edit
                onClick={() => updateShowModal(record?._id)}
                className="text-yellow-500"
              />
            </Tooltip>
          </a>
          <a>
            <Tooltip title="Delete Bike">
              <Popconfirm
                title="Delete the Bike"
                description="Are you sure to delete this bike?"
                icon={<QuestionCircleOutlined style={{ color: "red" }} />}
                onConfirm={() => handleDelete(record?._id)} // Deleting bike
                okText="Yes"
                cancelText="No"
              >
                <Trash className="text-red-500" />
              </Popconfirm>
            </Tooltip>
          </a>
        </Space>
      ),
    },
  ];

  const handleChange: OnChange = (pagination, filters, sorter) => {
    console.log("Various parameters", pagination, filters, sorter);
    setFilteredInfo(filters);
    setSortedInfo(sorter as Sorts);
  };

  const clearFilters = () => {
    setFilteredInfo({});
  };

  const clearAll = () => {
    setFilteredInfo({});
    setSortedInfo({});
  };

  const setPriceSort = () => {
    setSortedInfo({
      order: "descend",
      columnKey: "pricePerHour",
    });
  };

  const createShowModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const updateShowModal = (bikeId: string) => {
    setSelectedBikeId(bikeId);
    setIsUpdateModalOpen(true);
  };

  const handleUpdateOk = () => {
    setIsUpdateModalOpen(false);
  };

  const handleUpdateCancel = () => {
    setIsUpdateModalOpen(false);
  };

  const customTheme = {
    token: {
      colorPrimary: "#0d9488", // Change this to your primary color
    },
  };

  return (
    <div>
      <div className="flex justify-between items-center">
        <DashboardSectionTitle heading="All Bikes" align="left" />
        <div>
          <ConfigProvider theme={customTheme}>
            <Button onClick={createShowModal}>Create Bike</Button>
          </ConfigProvider>
          <CreateBikeModal
            handleCancel={handleCancel}
            handleOk={handleOk}
            isModalOpen={isModalOpen}
          />
        </div>
      </div>
      <>
        <Space style={{ marginBottom: 16 }}>
          <Button onClick={setPriceSort}>Sort Price</Button>
          <Button onClick={clearFilters}>Clear filters</Button>
          <Button onClick={clearAll}>Clear filters and sorters</Button>
        </Space>
        <Table<DataType>
          columns={columns}
          dataSource={data}
          onChange={handleChange}
        />
        <UpdateBikeModal
          bikeId={selectedBikeId!}
          handleCancel={handleUpdateCancel}
          handleOk={handleUpdateOk}
          isModalOpen={isUpdateModalOpen}
        />
      </>
    </div>
  );
};

export default BikesManagement;
