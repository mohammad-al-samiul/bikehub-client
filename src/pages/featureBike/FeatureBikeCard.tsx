import { Link } from "react-router-dom";
import { TBikeProps } from "../bikes/Bikes";

const FeatureBikeCard = ({ bike }: { bike: TBikeProps }) => {
  return (
    <div className="card card-compact bg-base-100 lg:w-96 shadow-xl">
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
        <div className="card-actions justify-center">
          <Link to={`bikes/${bike._id}`} className="btn btn-accent text-white">
            Buy Now
          </Link>
        </div>
      </div>
    </div>
  );
};

export default FeatureBikeCard;
