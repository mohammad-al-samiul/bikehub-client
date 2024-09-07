export function formateTheDate(dateInfo: any) {
  const date = new Date(dateInfo);

  // Convert to UTC and format to ISO string
  const formattedDate = new Date(
    date.getTime() - date.getTimezoneOffset() * 60000
  ).toISOString();

  return formattedDate;
}
