import AdminStats from "../../../components/ui/AdminStats";
import BikeBrandsChart from "../../../components/ui/BikeBrandChart";
import RevenueGrowth from "../../../components/ui/RevenueGrowth";
import Spinner from "../../../components/ui/spinner/Spinner";
import { useGetRentAllBikeQuery } from "../../../redux/features/rent/rentApi";
import { TRental } from "../../../types/rental.type";

const RentalAnalytics = () => {
  const { data, isLoading } = useGetRentAllBikeQuery([
    { name: "limit", value: 10000 },
    { name: "isPaid", value: true },
  ]);

  if (isLoading) {
    return (
      <div>
        <Spinner />
      </div>
    );
  }
  const rentalData = data?.data;

  const brands = rentalData?.map((item: TRental) => item.bikeId.brand);
  const brandCounts = brands?.reduce(
    (acc: Record<string, number>, brand: string) => {
      acc[brand] = (acc[brand] || 0) + 1;
      return acc;
    },
    {} as Record<string, any>
  );
  return (
    <main>
      <section>
        <AdminStats rentalData={rentalData} />
        <div className="flex lg:flex-row flex-col justify-between items-center gap-8 mt-16">
          <div className="lg:w-[1000px] md:w-[450px] sm:w-[450px] w-[250px]">
            <RevenueGrowth rentalData={rentalData!} />
          </div>
          <div className="sm:w-[350px] w-[250px]">
            <BikeBrandsChart title="Bikes by brand" brandCounts={brandCounts} />
          </div>
        </div>
        {/* <div className="mt-14">
          <Rentals />
        </div> */}
      </section>
    </main>
  );
};

export default RentalAnalytics;
