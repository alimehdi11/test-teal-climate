import { createContext, useState, useContext, useEffect } from "react";
import { DataContext } from "./DataContext.jsx";

const PeriodContext = createContext();

const PeriodProvider = ({ children }) => {
  const { allPeriods } = useContext(DataContext).data;
  const [periods, setPeriods] = useState([]);
  const [selectedPeriod, setSelectedPeriod] = useState("");

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
