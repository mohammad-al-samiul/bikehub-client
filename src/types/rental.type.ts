import { TBike } from "./bike.type";
import { TUser } from "./user.type";

export type TRental = {
  bikeId: TBike;
  isPaid: boolean;
  isReturned: boolean;
  returnTime: string;
  startTime: string;
  totalCost: number;
  userId: TUser;
  paymentStatus: string;
  _id: string;
};
