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

const getPeriodMonths = (period) => {
  if (period) {
    const months = [
      "january",
      "february",
      "march",
      "april",
      "may",
      "june",
      "july",
      "august",
      "september",
      "october",
      "november",
      "december",
    ];
    const [periodStartData, periodEndData] = period.split("-");
    const periodStartMonthIndex = new Date(periodStartData.trim()).getMonth();
    const periodEndMonthIndex = new Date(periodEndData.trim()).getMonth();
    let monthsFromPeriod = [];
    if (periodStartMonthIndex <= periodEndMonthIndex) {
      monthsFromPeriod = months.slice(
        periodStartMonthIndex,
        periodEndMonthIndex + 1
      );
    } else {
      monthsFromPeriod = [
        ...months.slice(periodStartMonthIndex),
        ...months.slice(0, periodEndMonthIndex + 1),
      ];
    }
    return monthsFromPeriod;
  }
  return [];
};

export { formatDate, getPeriodMonths };
