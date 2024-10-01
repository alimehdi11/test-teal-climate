import Select from "../components/ui/Select";
import calendarIcon from "../assets/calendar-icon.svg";
import { usePeriod } from "../contexts/PeriodProvider";

const PeriodSelector = () => {
  const { periods, selectedPeriod, setSelectedPeriod } = usePeriod();
  return (
    <div className="flex bg-white rounded-lg px-2 items-center min-w-72">
      <img src={calendarIcon} className="size-8" />
      <Select
        className="bg-white"
        value={selectedPeriod}
        onChange={(e) => {
          setSelectedPeriod(e.target.value);
        }}
      >
        {periods.length > 0 ? (
          periods.map((period) => {
            return (
              <option key={period.id} value={period.id}>
                {period.period}
              </option>
            );
          })
        ) : (
          <option value="">No period avaiable</option>
        )}
      </Select>
    </div>
  );
};

export default PeriodSelector;
