import { DateRangePicker } from "react-date-range";
import { addDays } from "date-fns";
import { useState } from "react";
import OrderSummary from "./OrderSummary";
import { useSelector } from "react-redux";
import { currentUser } from "../../redux/features/auth/authSlice";

import { useParams } from "react-router-dom";
import { useGetSingleBikeQuery } from "../../redux/features/bike/bikeApi";
import Spinner from "../../components/ui/spinner/Spinner";
import { formateTheDate } from "../dateFuntionality/formatTheDate";
import { calculateRentCost } from "../dateFuntionality/calculateRentCost";

export type TRental = {
  userEmail: string;
  bikeId: string;
  startTime: string;
  returnTime: string;
  totalCost: number;
  isReturned: boolean;
};

const Booking = () => {
  const { id } = useParams();
  const { data, isLoading } = useGetSingleBikeQuery(id);
  const bike = data?.data;

  const user: Record<string, any> | null = useSelector(currentUser);

  if (!user && isLoading) {
    <Spinner />;
  }

  const [state, setState] = useState([
    {
      startDate: new Date(),
      endDate: addDays(new Date(), 7),
      key: "selection",
    },
  ]);

  const startTime = formateTheDate(state[0].startDate);
  const returnTime = formateTheDate(state[0].endDate);

  const totalCost = calculateRentCost(
    state[0]?.startDate,
    state[0]?.endDate,
    bike?.pricePerHour
  );

  //console.log("cost", totalCost);

  const rentInfo: TRental = {
    userEmail: user?.email,
    bikeId: id!,
    startTime,
    returnTime,
    totalCost,
    isReturned: false,
  };

  return (
    <div className="flex justify-between">
      <DateRangePicker
        onChange={(item: any) => setState([item?.selection])}
        moveRangeOnFirstSelection={false}
        months={2}
        ranges={state!}
        direction="horizontal"
      />
      <OrderSummary rentInfo={rentInfo} />
    </div>
  );
};

export default Booking;
