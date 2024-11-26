import { Link } from "react-router-dom";
import { TBikeProps } from "./Bikes";

const BikeCard = ({ bike }: { bike: TBikeProps }) => {
  return (
    <div className="h-[400px] w-full card card-compact bg-base-100 shadow-xl mx-5">
      <figure>
        <img src={bike.bikeImage} alt={bike.brand} />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{bike?.name}</h2>
        <p>{bike?.description}</p>
        <div className="card-actions justify-end">
          <div className="badge badge-outline">{bike?.model}</div>
          <div
            className={`badge  ${
              bike?.isAvailable
                ? "badge-accent text-white"
                : "badge-error text-white"
            }`}
          >
            {bike?.isAvailable ? "Available" : "Not Available"}
          </div>
        </div>
        <div className="card-actions justify-end">
          <Link to={`${bike._id}`} className="btn btn-sm btn-accent text-white">
            Buy Now
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BikeCard;
