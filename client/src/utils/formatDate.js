export function formatDate(dateString) {
  const displayDate = new Date(dateString).toLocaleString("en-US", {
    zone: "America/New_York",
  });
  // eslint-disable-next-line
  const [date, time] = displayDate.split(",");

  return date;
}
