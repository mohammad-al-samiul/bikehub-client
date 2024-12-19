import { useState } from "react";
import { Input, Select, Pagination, Row, Col } from "antd";
import { useGetBikesWithPaginationQuery } from "../../redux/features/bike/bikeApi";
import BikeCard from "./BikeCard";
import Spinner from "../../components/ui/spinner/Spinner";
import { debounce } from "lodash";

const { Search } = Input;
const { Option } = Select;

export type TBikeProps = {
  bikeImage: string;
  brand: string;
  cc: number;
  description: string;
  isAvailable: boolean;
  model: string;
  name: string;
  pricePerHour: number;
  year: number;
  _id: string;
};

const Bikes = () => {
  const [searchTerm, setSearchTerm] = useState<string>(""); // Search term for bikes
  const [selectedCategory, setSelectedCategory] = useState<string>(""); // Filter by brand
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(8);

  // Get bikes query
  const { data, isLoading } = useGetBikesWithPaginationQuery({
    search: searchTerm,
    category: selectedCategory,
    page: currentPage,
    limit: pageSize,
  });

  const bikes = data?.data?.docs;
  const totalBikes = data?.data?.totalDocs;

  // Fetch unique brands from bike data
  const allBrands = bikes
    ? [...new Set(bikes.map((bike: TBikeProps) => bike.brand))]
    : [];

  // Debounced search handler
  const debouncedSearch = debounce((value: string) => {
    setSearchTerm(value);
  }, 100);

  // Handle search input change
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    debouncedSearch(e.target.value);
  };

  // Handle category (brand) change
  const handleCategoryChange = (value: string) => {
    setSelectedCategory(value);
  };

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <div className="mt-10">
      <h2 className="text-xl lg:text-3xl text-center font-bold">All Bikes</h2>

      {/* Search and Filter */}
      <div className="px-4">
        <Row className="w-full flex flex-row-reverse justify-between gap-2">
          <Col span={13} md={12} lg={6}>
            <Search
              placeholder="Search bikes..."
              onChange={handleSearchChange}
              enterButton
              style={{ width: "100%" }}
            />
          </Col>
          <Col span={10} md={12} lg={4}>
            <Select
              placeholder="Select Brand"
              value={selectedCategory}
              onChange={handleCategoryChange}
              style={{ width: "100%" }}
            >
              <Option value="">All Brands</Option>
              {allBrands.map((brand: any) => (
                <Option key={brand} value={brand}>
                  {brand}
                </Option>
              ))}
            </Select>
          </Col>
        </Row>
      </div>

      {/* Bikes Grid */}
      <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 justify-items-center px-4">
        {bikes &&
          bikes.map((bike: TBikeProps) => (
            <BikeCard key={bike._id} bike={bike} />
          ))}
      </div>

      {/* Pagination */}
      <div className="mt-8 flex justify-center">
        <Pagination
          current={currentPage}
          pageSize={pageSize}
          total={totalBikes}
          onChange={(page, size) => {
            setCurrentPage(page);
            setPageSize(size || pageSize);
          }}
        />
      </div>
    </div>
  );
};

export default Bikes;
