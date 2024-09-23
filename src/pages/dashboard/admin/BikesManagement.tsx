import { Popconfirm, Table, TableProps, Tooltip } from "antd";
import UpdateBikeModal from "../../../components/UpdateBikeModel";
import { useState } from "react";
import { TQueryParams } from "../../../types/global.type";
import {
  useDeleteBikeMutation,
  useGetBikesQuery,
} from "../../../redux/features/bike/bikeApi";
import handleMutation from "../../../utils/handleMutation";
import { TBike } from "../../../types/bike.type";
import { Edit, Trash } from "lucide-react";
import DashboardTitle from "../../../components/ui/DashboardTitle";
import BSmallButton from "../../../components/form/BSmallButton";
import CreateBikeModal from "../../../components/CreateBikeModel";

const BikesManagement = () => {
  const [bikeId, setBikeId] = useState("");

  // load bike data
  const { data, isFetching } = useGetBikesQuery(undefined);

  const bikeData = data?.data;

  // manage create bike modal
  const [isCreateBikeModalOpen, setIsCreateBikeModalOpen] = useState(false);
  const showCreateBikeModal = () => {
    setIsCreateBikeModalOpen(true);
  };

  // manage update bike modal
  const [isUpdateBikeModalOpen, setIsUpdateBikeModalOpen] = useState(false);
  const showUpdateBikeModal = (bikeId: string) => {
    setBikeId(bikeId);
    setIsUpdateBikeModalOpen(true);
  };

  // manage delete bike
  const [deleteBike] = useDeleteBikeMutation();
  const handleDeleteBike = (id: string) => {
    handleMutation(id, deleteBike, "Bike is being deleted...");
  };

  const tableData = bikeData?.map(
    ({ name, isAvailable, brand, pricePerHour, _id, model }: TBike) => ({
      key: _id,
      name,
      brand,
      model,
      isAvailable,
      pricePerHour,
    })
  );

  const brandFilterItems = bikeData?.map((item: TBike) => ({
    text: item.brand,
    value: item.brand,
  }));
  const modelFilterItems = bikeData?.map((item: TBike) => ({
    text: item.model,
    value: item.model,
  }));

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Availability",
      render: ({ isAvailable }: { isAvailable: boolean }) => (
        <p>{isAvailable ? "Available" : "Unavailable"}</p>
      ),
      key: "isAvailable",
    },
    {
      title: "Brand",
      dataIndex: "brand",
      key: "brand",
      filters: brandFilterItems,
      filterSearch: true,
    },
    {
      title: "Model",
      dataIndex: "model",
      key: "model",
      filters: modelFilterItems,
      filterSearch: true,
    },
    {
      title: "Price(Hourly)",
      dataIndex: "pricePerHour",
      key: "pricePerHour",
    },
    {
      title: "Actions",
      render: ({ key }: { key: string }) => (
        <div className="flex items-center gap-3">
          <Tooltip title="Update bike">
            <Edit
              onClick={() => showUpdateBikeModal(key)}
              size={20}
              className="cursor-pointer text-accentColor"
            />
          </Tooltip>
          <Popconfirm
            placement="bottom"
            title="Delete the bike"
            description="Are you sure to delete this bike?"
            onConfirm={() => handleDeleteBike(key)}
            okText="Yes"
            cancelText="No"
          >
            <Tooltip title="Delete bike">
              <Trash size={20} className="cursor-pointer text-red-500" />
            </Tooltip>
          </Popconfirm>
        </div>
      ),
      key: "acsdf",
    },
  ];

  return (
    <div>
      <div className="flex justify-between items-center">
        <DashboardTitle heading="All Bikes" align="left" />
        <div>
          <BSmallButton onClick={showCreateBikeModal}>Create Bike</BSmallButton>
        </div>
      </div>
      <Table
        loading={isFetching}
        dataSource={tableData}
        columns={columns}
        scroll={{ x: 800 }}
      />
      <CreateBikeModal
        isModalOpen={isCreateBikeModalOpen}
        setIsModalOpen={setIsCreateBikeModalOpen}
      />
      <UpdateBikeModal
        bikeId={bikeId}
        isModalOpen={isUpdateBikeModalOpen}
        setIsModalOpen={setIsUpdateBikeModalOpen}
      />
    </div>
  );
};

export default BikesManagement;
