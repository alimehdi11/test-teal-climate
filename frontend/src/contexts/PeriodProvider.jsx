import { createContext, useState, useContext, useEffect } from "react";
import { DataContext } from "./DataContext.jsx";

const PeriodContext = createContext();

const PeriodProvider = ({ children }) => {
  const { allPeriods } = useContext(DataContext).data;
  const [periods, setPeriods] = useState([]);
  const [selectedPeriod, setSelectedPeriod] = useState("");
  const getPeriodMonths = () => {
    const currentPeriod = periods.filter((period) => {
      return Number(selectedPeriod) === period.id;
    })[0];
    if (!currentPeriod) {
      return [];
    }
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
    const [periodStartData, periodEndData] = currentPeriod.period.split("-");
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
  };

  useEffect(() => {
    if (allPeriods) {
      setPeriods(allPeriods);
    }
  }, []);

  useEffect(() => {
    if (periods.length > 0) {
      if (selectedPeriod) {
        setSelectedPeriod(selectedPeriod);
      } else {
        // Select first period initially
        setSelectedPeriod(periods[0].id);
      }
    }
  }, [periods]);

  return (
    <PeriodContext.Provider
      value={{
        periods,
        setPeriods,
        selectedPeriod,
        setSelectedPeriod,
        getPeriodMonths,
      }}
    >
      {children}
    </PeriodContext.Provider>
  );
};

export { PeriodProvider };
export const usePeriod = () => {
  return useContext(PeriodContext);
};