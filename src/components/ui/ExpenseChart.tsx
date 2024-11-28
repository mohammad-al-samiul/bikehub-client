import Chart from "react-apexcharts";
import { TRental } from "../../types/rental.type";

const ExpenseChart = ({ rentalData }: { rentalData: TRental[] }) => {
  const expenses = rentalData
    ?.slice(Math.max(rentalData.length - 10, 0)) // Get the last 10 rentals safely
    ?.map((rental) => {
      const startDate = rental.startTime
        ? new Date(rental.startTime).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
          })
        : "Unknown Start";
      const endDate = rental.returnTime
        ? new Date(rental.returnTime).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
          })
        : "Unknown End";

      return {
        dateRange: `${startDate} - ${endDate}`, // Concatenate the date range
        cost: rental.totalCost ? Number(rental.totalCost.toFixed(2)) : 0, // Ensure proper formatting
      };
    });

  const ExpenseChartData = {
    series: [
      {
        name: "Expenses",
        data: expenses?.map((item) => item.cost) || [], // Map expenses
      },
    ],
  };

  const ExpenseChartOptions = {
    chart: {
      type: "bar", // Bar chart for expenses
      height: 350,
      animations: {
        enabled: true,
        easing: "easeinout",
        speed: 800,
        animateGradually: {
          enabled: true,
          delay: 150,
        },
        dynamicAnimation: {
          enabled: true,
          speed: 350,
        },
      },
    },
    xaxis: {
      categories: expenses?.map((item) => item.dateRange) || [], // Use date ranges as categories
      title: {
        text: "Rental Periods",
      },
    },
    title: {
      text: "Expenses Over the Last 10 Rentals",
      align: "center",
    },
    colors: ["#60A5FA"], // Blue color for bars
    dataLabels: {
      enabled: true,
      formatter: (val: number) => `$${val.toFixed(2)}`, // Format data labels
    },
    yaxis: {
      title: {
        text: "Amount ($)",
      },
    },
    tooltip: {
      y: {
        formatter: (val: number) => `$${val.toFixed(2)}`, // Format tooltip values
      },
    },
    grid: {
      borderColor: "#f1f1f1",
    },
  };

  return (
    <div>
      <Chart
        options={ExpenseChartOptions as ApexCharts.ApexOptions}
        series={ExpenseChartData.series}
        type="bar"
        height={350}
      />
    </div>
  );
};

export default ExpenseChart;
