import { createContext, useState, useContext, useEffect } from "react";
import { DataContext } from "./DataContext.jsx";

const PeriodContext = createContext();

const PeriodProvider = ({ children }) => {
  const { businessUnitsPeriod, fetchBusinessUnitsPeriod } =
    useContext(DataContext).data;
  const [periods, setPeriods] = useState([]);
  const [selectedPeriod, setSelectedPeriod] = useState("");

  useEffect(() => {
    if (businessUnitsPeriod) {
      setPeriods(businessUnitsPeriod);
    }
  }, [businessUnitsPeriod]);

  useEffect(() => {
    if (periods.length > 0) {
      if (periods.includes(selectedPeriod)) {
        setSelectedPeriod(selectedPeriod);
      } else {
        setSelectedPeriod(periods[0]);
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
        fetchBusinessUnitsPeriod,
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
