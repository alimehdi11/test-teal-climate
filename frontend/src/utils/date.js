const formatDate = (dateStr) => {
  const options = { year: "numeric", month: "short", day: "2-digit" };
  const date = new Date(dateStr);
  const formattedDate = date.toLocaleDateString("en-US", options);
  return formattedDate;
};

export { formatDate };
