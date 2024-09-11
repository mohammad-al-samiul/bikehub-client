import { useEffect } from "react";

import { useGetSingleBikeQuery } from "../../redux/features/bike/bikeApi";
import { useRentBikeMutation } from "../../redux/features/rent/rentApi";
import { TRental } from "./Booking";

const OrderSummary = ({ rentInfo }: { rentInfo: TRental }) => {
  // console.log('rentInfo', rentInfo);
  const [rent] = useRentBikeMutation();
  const { data: bike, refetch } = useGetSingleBikeQuery(rentInfo.bikeId);

  useEffect(() => {
    refetch();
  }, [bike]);

  const handlePayment = async () => {
    try {
      const res = await rent(rentInfo).unwrap();
      window.location.href = res?.data?.payment_url;
      // window.open(res?.data?.payment_url, "_blank");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div id="summary" className="lg:w-1/4 px-2 py-10">
      <h1 className="font-semibold text-2xl border-b pb-8">Order Summary</h1>

      <div className=" mt-8">
        <div className="flex font-semibold justify-between py-6 text-sm uppercase">
          <span className="font-bold">Start Time :</span>
          <span>{rentInfo?.startTime.slice(0, 10)} </span>
        </div>
        <div className="flex font-semibold justify-between py-6 text-sm uppercase">
          <span className="font-bold">Return Time :</span>
          <span>{rentInfo?.returnTime.slice(0, 10)} </span>
        </div>
        <div className="flex font-semibold justify-between py-6 text-sm uppercase">
          <span className="font-bold">Total cost :</span>
          <span>${rentInfo?.totalCost} </span>
        </div>
        {bike?.data?.isAvailable ? (
          <button
            onClick={handlePayment}
            className="btn btn-accent text-white w-full"
          >
            Checkout
          </button>
        ) : (
          <button
            className="btn btn-accent text-white btn-disabled w-full"
            disabled
          >
            Checkout
          </button>
        )}
      </div>
    </div>
  );
};

export default OrderSummary;
