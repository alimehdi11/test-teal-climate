const filterBusinessUnitsActivitiesForSelectedPeriod = (
  data,
  selectedPeriod
) => {
  return data.filter((item) => {
    return item.businessUnit.period.id === Number(selectedPeriod);
  });
};

export { filterBusinessUnitsActivitiesForSelectedPeriod };
