import { Link, useParams } from "react-router-dom";
import { useGetSingleBikeQuery } from "../../redux/features/bike/bikeApi";
import { TBikeProps } from "./Bikes";
import { Button } from "antd";
import { useState } from "react";
import BookingModal from "../booking/BookingModal";

const BikeDesc = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { id } = useParams();
  const { data } = useGetSingleBikeQuery(id);
  const bike: TBikeProps = data?.data;

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

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

          {bike?.isAvailable ? (
            <>
              <button
                className="btn btn-sm text-white bg-accent hover:bg-accent hover:text-white border-none"
                onClick={showModal}
              >
                Book Now
              </button>
              <BookingModal
                bikeId={bike?._id}
                isModalOpen={isModalOpen}
                handleOk={handleOk}
                handleCancel={handleCancel}
              />
            </>
          ) : (
            <button className="btn btn-sm" disabled>
              Book Now
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default BikeDesc;
