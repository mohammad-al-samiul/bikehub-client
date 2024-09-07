export function calculateRentCost(
  startDate: any,
  endDate: any,
  costPerHour: any
) {
  const date1 = new Date(startDate);
  const date2 = new Date(endDate);

  // Convert dates to milliseconds
  const milliseconds1 = date1.getTime();
  const milliseconds2 = date2.getTime();

  // Calculate the difference in milliseconds
  const differenceInMilliseconds = milliseconds2 - milliseconds1;

  // Convert milliseconds to hours
  const hours = differenceInMilliseconds / (1000 * 60 * 60);

  // Calculate the total cost
  const totalCost = hours * parseInt(costPerHour);
  return totalCost;
}
