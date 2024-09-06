import { useGetBikesQuery } from "../../redux/features/bike/bikeApi";
import Bike from "./Bike";

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
  const { data } = useGetBikesQuery([]);

  const bikes = data.data;
  return (
    <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 justify-items-center ">
      {bikes.map((bike: TBikeProps) => (
        <Bike key={bike._id} bike={bike} />
      ))}
    </div>
  );
};

export default Bikes;
