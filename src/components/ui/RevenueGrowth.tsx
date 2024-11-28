import { TRental } from "../../types/rental.type";
import Chart from "react-apexcharts";

const RevenueGrowth = ({ rentalData }: { rentalData: TRental[] }) => {
  // Slice last 10 rentals and extract revenue values, ensuring proper number formatting
  const revenues = rentalData
    ?.slice(rentalData.length - 10, rentalData.length)
    ?.map((item) => Number(item.totalCost.toFixed(1)));

  // Function to get ordinal suffix for x-axis labels (1st, 2nd, 3rd, etc.)
  const getOrdinalSuffix = (n: number) => {
    const suffix = ["th", "st", "nd", "rd"];
    const val = n % 100;
    return `${n}${suffix[(val - 20) % 10] || suffix[val] || suffix[0]}`;
  };

  // Prepare categories for the x-axis
  const categories = revenues?.map((_, i) => getOrdinalSuffix(i + 1));

  const RevenueGrowthData = {
    series: [
      {
        name: "Revenue",
        data: revenues, // Data for revenue (total cost per rental)
      },
    ],
  };

  const RevenueGrowthOptions = {
    chart: {
      type: "line",
      height: 350,
      animations: {
        enabled: true, // Enable animations
        easing: "easeinout", // Easing function for the animation
        speed: 800, // Animation duration in milliseconds
        animateGradually: {
          enabled: true,
          delay: 150, // Delay between each data point's animation
        },
        dynamicAnimation: {
          enabled: true,
          speed: 350, // Speed for dynamic animation when updating the chart
        },
      },
    },
    xaxis: {
      categories: categories, // Use ordinal labels for the x-axis
    },
    title: {
      text: "Revenue of the Last 10 Rentals",
    },
    stroke: {
      curve: "smooth", // Smooth line curve for better presentation
    },
    dataLabels: {
      enabled: false, // Disable data labels for cleaner appearance
    },
    yaxis: {
      title: {
        text: "Revenue ($)",
      },
    },
  };

  return (
    <div>
      <Chart
        options={RevenueGrowthOptions as ApexCharts.ApexOptions}
        series={RevenueGrowthData.series}
        type="line"
        height={350}
      />
    </div>
  );
};

export default RevenueGrowth;
