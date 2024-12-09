import Spinner from "../../components/ui/spinner/Spinner";
import { useGetBikesQuery } from "../../redux/features/bike/bikeApi";
import BikeCard from "./BikeCard";

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
  const { data, isLoading } = useGetBikesQuery([]);

  const bikes = data?.data;
  if (isLoading) {
    return <Spinner />;
  }
  return (
    <div className="mt-10">
      <h2 className="text-xl lg:text-3xl text-center font-bold">All Bikes</h2>
      <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 h- justify-items-center">
        {bikes &&
          bikes?.map((bike: TBikeProps) => (
            <BikeCard key={bike._id} bike={bike} />
          ))}
      </div>
    </div>
  );
};

export default Bikes;
