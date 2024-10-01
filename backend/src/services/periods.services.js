const formatDate = (dateStr) => {
  const abbreviatedMonths = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  let [year, month, day] = dateStr.split("-");
  month = abbreviatedMonths[Number(month) - 1];
  day = day.padStart(2, "0");
  const formattedDate = `${month} ${day}, ${year}`;
  return formattedDate;
};

export { formatDate };
