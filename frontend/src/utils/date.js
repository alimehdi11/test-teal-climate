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
  const options = { year: "numeric", month: "short", day: "2-digit" };
  const [year, month, day] = dateStr.split("-").map(Number);
  const formattedDate = `${abbreviatedMonths[month - 1]} ${day}, ${year}`;
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
