import DStatCard from "../../../components/ui/DStatCard";
import { TRental } from "../../../types/rental.type";

import { BookPlus, CircleDollarSign } from "lucide-react";

const UserStats = ({ rentalData }: { rentalData: TRental[] }) => {
  const totalRentals = rentalData?.length || 0;
  const totalExpenses = rentalData
    ?.map((rental) => rental.totalCost)
    ?.reduce((sum, cost) => sum + cost, 0)
    ?.toFixed(2);

  const stats = [
    {
      title: "Total Rentals",
      number: totalRentals,
      icon: <BookPlus size={30} className="text-[#fec022]" />,
      color: "#fff6e6",
    },
    {
      title: "Total Expenses",
      number: `$${totalExpenses}`,
      icon: <CircleDollarSign size={30} className="text-[#5A66F1]" />,
      color: "#EEEFFE",
    },
  ];

  return (
    <div className="grid sm:grid-cols-2 gap-6">
      {stats.map((stat) => (
        <DStatCard key={stat.title} {...stat} />
      ))}
    </div>
  );
};

export default UserStats;
