import { TRental } from "./Booking";

const OrderSummary = ({ rentInfo }: { rentInfo: TRental }) => {
  return (
    <div id="summary" className="lg:w-1/4 px-2 py-10">
      <h1 className="font-semibold text-2xl border-b pb-8">Order Summary</h1>

      <div className=" mt-8">
        <div className="flex font-semibold justify-between py-6 text-sm uppercase">
          <span className="font-bold">Start Time :</span>
          <span>{rentInfo?.startTime} </span>
        </div>
        <div className="flex font-semibold justify-between py-6 text-sm uppercase">
          <span className="font-bold">Return Time :</span>
          <span>{rentInfo?.returnTime} </span>
        </div>
        <div className="flex font-semibold justify-between py-6 text-sm uppercase">
          <span className="font-bold">Total cost :</span>
          <span>${rentInfo?.totalCost} </span>
        </div>
        <button className="bg-indigo-500 font-semibold hover:bg-indigo-600 py-3 text-sm text-white uppercase w-full">
          Checkout
        </button>
      </div>
    </div>
  );
};

export default OrderSummary;
