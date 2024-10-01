import FormControl from "../../components/FormControl";
import Input from "../../components/ui/Input";
import Label from "../../components/ui/Label";
import Button from "../../components/ui/Button";
import { toast } from "react-toastify";
import { api } from "../../../api/index.js";
import { usePeriod } from "../../contexts/PeriodProvider.jsx";

const PeriodForm = ({ setAddPeriod }) => {
  const { setPeriods } = usePeriod();

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
      setAddPeriod(false);
      setPeriods((previousPeriods) => [...previousPeriods, data]);
    } else {
      toast.error(message);
    }
  };
  const handleCancel = () => {
    setAddPeriod(false);
  };
  const handleUpdate = (event) => {
    event.preventDefault();
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-y-3 bg-white rounded-md p-6"
    >
      <h3 className="m-0 mb-4 font-extrabold text-2xl">Add Period</h3>
      <div className="flex gap-4">
        <FormControl className="flex-1">
          <Label>Start period date</Label>
          <Input type="date" name="startPeriodDate" />
        </FormControl>
        <FormControl className="flex-1">
          <Label>End period date</Label>
          <Input type="date" name="endPeriodDate" />
        </FormControl>
      </div>
      {/* Buttons */}
      <div className="flex flex-col mt-4 gap-4 md:flex-row self-end">
        <Button type="button" className="flex-1" onClick={handleCancel}>
          Cancel
        </Button>
        <Button type="submit" className="flex-1">
          Add
        </Button>
      </div>
    </form>
  );
};

export default PeriodForm;
