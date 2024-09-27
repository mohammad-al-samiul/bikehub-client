import { useState } from "react";
import { TQueryParams } from "../../../types/global.type";
import { useGetBikesQuery } from "../../../redux/features/bike/bikeApi";

import {
  Button,
  Space,
  Table,
  TableColumnsType,
  TableProps,
  Tooltip,
} from "antd";

import { Edit, Eye, FileText, Info, Trash } from "lucide-react";
import DashboardSectionTitle from "../../../components/ui/dashboardSectionTitlte/DashboardSectionTitle";
import Spinner from "../../../components/ui/spinner/Spinner";
import { Link } from "react-router-dom";

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
  bikeImage: string;
  year: number;
};

const BikeTable = () => {
  const [filteredInfo, setFilteredInfo] = useState<Filters>({});
  const [sortedInfo, setSortedInfo] = useState<Sorts>({});
  const [params, setParams] = useState<TQueryParams[] | []>([]);
  const { data: bikeData, isFetching } = useGetBikesQuery([]);

  if (isFetching) {
    return <Spinner />;
  }
  const bikes = bikeData?.data;
  console.log("bikeData", bikeData);

  const data: DataType[] = bikes?.map((bike: DataType) => ({
    key: bike?._id,
    _id: bike?._id,
    name: bike?.name,
    brand: bike?.brand,
    model: bike?.model,
    status: bike?.isAvailable ? "Available" : "Not Available",
    bikeImage: bike?.bikeImage,
    pricePerHour: bike?.pricePerHour,
  }));

  const columns: TableColumnsType<DataType> = [
    {
      title: "Image",
      render: ({ bikeImage }: { bikeImage: string }) => (
        <img className="w-[80px]" src={bikeImage} alt="" />
      ),
      key: "bikeImage",
    },
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
          <Link to={`/bikes/${record?._id}`}>
            <Tooltip title="Details">
              <Eye />
            </Tooltip>
          </Link>
        </Space>
      ),
    },
  ];

  const handleChange: OnChange = (pagination, filters, sorter) => {
    // console.log("Various parameters", pagination, filters, sorter);
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

  return (
    <div>
      <DashboardSectionTitle heading="All Bikes" align="left" />
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
      </>
    </div>
  );
};

export default BikeTable;
