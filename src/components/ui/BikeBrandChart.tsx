import Chart from "react-apexcharts";

const BikeBrandsChart = ({
  brandCounts = {}, // Default to an empty object if brandCounts is undefined
  title,
}: {
  brandCounts?: Record<string, number>; // Make brandCounts optional
  title: string;
}) => {
  const postCategoryData = {
    series: Object.values(brandCounts), // Extract values safely
    labels: Object.keys(brandCounts), // Extract keys safely
  };

  const postCategoryOptions = {
    chart: {
      type: "pie",
      animations: {
        enabled: true,
        easing: "easeinout",
        speed: 800,
        animateGradually: {
          enabled: true,
          delay: 100,
        },
        dynamicAnimation: {
          enabled: true,
          speed: 400,
        },
      },
    },
    labels: postCategoryData.labels,
    title: {
      text: title,
      align: "center",
    },
    legend: {
      position: "bottom",
    },
    dataLabels: {
      enabled: true,
      formatter: (val: number) => `${val.toFixed(1)}%`,
    },
  };

  return (
    <div>
      <Chart
        options={postCategoryOptions as ApexCharts.ApexOptions}
        series={postCategoryData.series}
        type="pie"
      />
    </div>
  );
};

export default BikeBrandsChart;
