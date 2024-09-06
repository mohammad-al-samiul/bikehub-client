import { useParams } from "react-router-dom";
import { useGetSingleBikeQuery } from "../../redux/features/bike/bikeApi";
import { TBikeProps } from "./Bikes";
import Modals from "../modals/Modals";

const BikeDesc = () => {
  const { id } = useParams();
  const { data } = useGetSingleBikeQuery(id);
  const bike: TBikeProps = data?.data;
  console.log(bike);

  return (
    <div className="hero flex justify-start  w-full shadow-xl rounded-lg ">
      <div className="hero-content flex-col lg:flex-row ">
        <img src={bike?.bikeImage} className="w-96 rounded-lg shadow-2xl" />
        <div>
          <h1 className="text-5xl font-bold">{bike?.name}</h1>
          <p className="py-2">{bike?.description}</p>
          <p className="py-2">
            <span className="font-bold">Brand :</span> {bike?.brand}
          </p>
          <p className="py-2">
            <span className="font-bold">Model :</span> {bike?.model}
          </p>
          <p className="py-2">
            <span className="font-bold">CC :</span> {bike?.cc}
          </p>
          <p className="py-2">
            <span className="font-bold">Year :</span> {bike?.year}
          </p>
          <p className="py-2">
            <span className="font-bold">Price Per Hour :</span>$
            {bike?.pricePerHour}
          </p>

          <button
            className="btn btn-accent text-white"
            onClick={() =>
              (
                document.getElementById(bike?._id) as HTMLDialogElement
              )?.showModal()
            }
          >
            Booked Now
          </button>
          <Modals id={bike?._id} />
        </div>
      </div>
    </div>
  );
};

export default BikeDesc;
