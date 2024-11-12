import FormControl from "../../components/FormControl";
import Input from "../../components/ui/Input";
import Label from "../../components/ui/Label";
import Button from "../../components/ui/Button";
import { toast } from "react-toastify";
import { api } from "../../api/index.js";
import { usePeriod } from "../../contexts/PeriodProvider.jsx";
import { useState } from "react";

const PeriodForm = ({ setShowPeriodForm }) => {
  const { setPeriods } = usePeriod();
  const [startPeriodDate, setStartPeriodDate] = useState("");
  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    if (!formData.get("startPeriodDate") || !formData.get("endPeriodDate")) {
      return toast.error("Please fill all fields");
    }
    const payload = {};
    for (const [key, value] of formData.entries()) {
      payload[key] = value;
    }
    const { message, success, data } = await api.periods.createPeriod(payload);
    if (success) {
      toast.success(message);
      event.target.reset();
      setShowPeriodForm(false);
      setPeriods((previousPeriods) => [...previousPeriods, data]);
    } else {
      toast.error(message);
    }
  };
  const handleCancel = () => {
    setShowPeriodForm(false);
  };
  const handleStartDateChange = (event) => {
    setStartPeriodDate(event.target.value);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-y-3 bg-white rounded-md p-6"
    >
      <h3 className="m-0 mb-4 font-extrabold text-2xl">Add Period</h3>
      <div className="flex max-sm:flex-col gap-4">
        <FormControl className="flex-1">
          <Label>Start period date</Label>
          <Input
            type="date"
            name="startPeriodDate"
            value={startPeriodDate}
            onChange={handleStartDateChange}
          />
        </FormControl>
        <FormControl className="flex-1">
          <Label>End period date</Label>
          <Input
            type="date"
            name="endPeriodDate"
            min={startPeriodDate}
            disabled={!startPeriodDate}
          />
        </FormControl>
      </div>
      {/* Buttons */}
      <div className="flex gap-4 justify-end mt-4 ">
        <Button type="button" className="" onClick={handleCancel}>
          Cancel
        </Button>
        <Button type="submit" className="">
          Add
        </Button>
      </div>
    </form>
  );
};

export default PeriodForm;
