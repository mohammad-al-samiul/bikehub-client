import { DateRangePicker } from "react-date-range";
import { addDays } from "date-fns";
import { useState } from "react";
import OrderSummary from "./OrderSummary";

const Booking = () => {
  const [state, setState] = useState([
    {
      startDate: new Date(),
      endDate: addDays(new Date(), 7),
      key: "selection",
    },
  ]);
  console.log(state[0]);
  return (
    <div className="flex justify-between">
      <DateRangePicker
        onChange={(item: any) => setState([item?.selection])}
        moveRangeOnFirstSelection={false}
        months={2}
        ranges={state!}
        direction="horizontal"
      />
      <OrderSummary />
    </div>
  );
};

export default Booking;
