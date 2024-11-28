import BikeUsageChart from "../../../components/ui/BikeBrandChart";
import ExpenseChart from "../../../components/ui/ExpenseChart";
import Spinner from "../../../components/ui/spinner/Spinner";
import { useGetRentAllBikeQuery } from "../../../redux/features/rent/rentApi";
import UserStats from "./UserStats";

const UserRentalAnalytics = () => {
  const { data, isLoading } = useGetRentAllBikeQuery([]);

  if (isLoading) {
    return (
      <div>
        <Spinner />
      </div>
    );
  }

  const rentalData = data?.data;

  const brands = rentalData?.map((rental: any) => rental.bikeId?.brand);
  const brandCounts = brands?.reduce(
    (acc: Record<string, number>, brand: string) => {
      acc[brand] = (acc[brand] || 0) + 1;
      return acc;
    },
    {}
  );

  return (
    <main>
      <section>
        <UserStats rentalData={rentalData} />
        <div className="flex flex-col lg:flex-row gap-8 mt-16">
          <div className="lg:w-[60%]">
            <ExpenseChart rentalData={rentalData} />
          </div>
          <div className="lg:w-[40%]">
            <BikeUsageChart
              title="Bike Usage by Brand"
              brandCounts={brandCounts}
            />
          </div>
        </div>
        {/* <div className="mt-16">
          <RentalTable rentalData={rentalData} />
        </div> */}
      </section>
    </main>
  );
};

export default UserRentalAnalytics;
