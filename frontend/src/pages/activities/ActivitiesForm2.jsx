import { useEffect, useState } from "react";
import FormControl from "../../components/FormControl";
import Label from "../../components/ui/Label";
import SearchableSelect from "../../components/ui/SearchableSelect";
import Select from "../../components/ui/Select";
import { usePeriod } from "../../contexts/PeriodProvider";
import { api } from "../../../api/index.js";
import Input from "./../../components/ui/Input";
const ActivitiesForm2 = ({ businessUnits, selectedLevel, selectedScope }) => {
  const [businessUnitId, setBusinessUnitId] = useState("");
  const [level1CategoriesOptions, setlevel1CategoriesOptions] = useState([]);
  const [level2Options, setLevel2Options] = useState([]);
  const [level3Options, setLevel3Options] = useState([]);
  const [level4Options, setLevel4Options] = useState([]);
  const [level5Options, setLevel5Options] = useState([]);
  const [unitOfMeasurementOptions, setUnitOfMeasurementOptions] = useState([]);

  const [level1Category, setLevel1Category] = useState();
  const [level2, setLevel2] = useState();
  const [level3, setLevel3] = useState();
  const [level4, setLevel4] = useState();
  const [level5, setLevel5] = useState();
  const [unitOfMeasurement, setUnitOfMeasurement] = useState();
  const [quantity, setQuantity] = useState("");
  const [month, setMonth] = useState();

  const { getPeriodMonths } = usePeriod();

  // Automatically set businessUnitId if there's only one business unit
  useEffect(() => {
    if (businessUnits.length === 1) {
      setBusinessUnitId(businessUnits[0].id);
    }
  }, [businessUnits]);

  // Reusable fetch function for activities
  const fetchActivities = async (
    callback,
    setOptions,
    previousInputValue,
    setCurrentInputValue,
    queryParams = {}
  ) => {
    if (previousInputValue === undefined) return;
    try {
      const queryString = "?" + new URLSearchParams(queryParams).toString();
      const options = await callback(queryString);
      if (options.length === 0) {
        setOptions(options);
        setCurrentInputValue("");
      } else if (options.length > 0) {
        setOptions(options.map((item) => Object.values(item)[0]));
      }
    } catch (error) {
      console.error("Failed to fetch activities:", error);
    }
  };

  // Fetch "Level 1 Category" when business unit is selected
  useEffect(() => {
    fetchActivities(
      () => api.level1Categories.getAllLevel1Categories(selectedLevel),
      setlevel1CategoriesOptions,
      businessUnitId
    );
  }, [businessUnitId]);

  // Fetch level2 options when "Level 1 Category" is selected
  useEffect(() => {
    fetchActivities(
      api.activities.getAllActivities,
      setLevel2Options,
      level1Category,
      null,
      {
        scope: selectedScope,
        level1: selectedLevel,
        column: "level2",
        distinct: "true",
      }
    );
  }, [level1Category]);

  // Fetch level3 options based on level2 when level2 is selected
  useEffect(() => {
    fetchActivities(
      api.activities.getAllActivities,
      setLevel3Options,
      level2,
      null,
      {
        scope: selectedScope,
        level1: selectedLevel,
        level2: level2,
        column: "level3",
        distinct: "true",
      }
    );
  }, [level2]);

  // Fetch level4 options based on level3 when level3 is selected
  useEffect(() => {
    fetchActivities(
      api.activities.getAllActivities,
      setLevel4Options,
      level3,
      setLevel4,
      {
        scope: selectedScope,
        level1: selectedLevel,
        level2: level2,
        level3: level3,
        column: "level4",
        distinct: "true",
      }
    );
  }, [level3]);

  // Fetch level5 options based on level4 when level4 is selected
  useEffect(() => {
    fetchActivities(
      api.activities.getAllActivities,
      setLevel5Options,
      level4,
      setLevel5,
      {
        scope: selectedScope,
        level1: selectedLevel,
        level2: level2,
        level3: level3,
        level4: level4,
        column: "level5",
        distinct: "true",
      }
    );
  }, [level4]);

  // Fetch unitOfMeasurementOptions based on level5 when level5 is selected
  useEffect(() => {
    fetchActivities(
      api.activities.getAllActivities,
      setUnitOfMeasurementOptions,
      level5,
      null,
      {
        scope: selectedScope,
        level1: selectedLevel,
        level2: level2,
        level3: level3,
        level4: level4,
        level5: level5,
        column: "unitOfMeasurement",
        distinct: "true",
      }
    );
  }, [level5]);

  return (
    <form className="flex flex-col gap-y-3 bg-white rounded-md p-6">
      <h3 className="m-0 font-extrabold text-2xl">Insert activity data here</h3>
      <div className="grid gap-4">
        <FormControl className="flex-1 relative">
          <Label>Month</Label>
          <SearchableSelect
            data={getPeriodMonths()}
            item={month}
            setItem={setMonth}
            text={"Select month"}
            placeholder={"Search month"}
          />
        </FormControl>
        <FormControl className="flex-1 relative">
          <Label>Business Unit</Label>
          <Select
            value={businessUnitId}
            onChange={(e) => setBusinessUnitId(e.target.value)}
          >
            <option value="">Select Option</option>
            {businessUnits.length > 0 ? (
              businessUnits.map((options, index) => (
                <option value={options.id} key={index}>
                  {options.title}
                </option>
              ))
            ) : (
              <option disabled>
                'Profile not found, create profile first'
              </option>
            )}
          </Select>
        </FormControl>
        <FormControl className="flex-1 relative">
          <Label>Level 1 Category</Label>
          <SearchableSelect
            data={level1CategoriesOptions}
            item={level1Category}
            setItem={setLevel1Category}
            text={"Select Level 1 Category"}
            placeholder={"Search Level 1 Category"}
          />
        </FormControl>
        <FormControl className="flex-1 relative">
          <Label>Level 2</Label>
          <SearchableSelect
            data={level2Options}
            item={level2}
            setItem={setLevel2}
            text={"Select Level 2 Category"}
            placeholder={"Search Level 2 Category"}
          />
        </FormControl>
        <FormControl className="flex-1 relative">
          <Label>Level 3</Label>
          <SearchableSelect
            data={level3Options}
            item={level3}
            setItem={setLevel3}
            text={"Select Level 3 Category"}
            placeholder={"Search Level 3 Category"}
          />
        </FormControl>
        {level4Options.length > 0 && (
          <FormControl className="flex-1 relative">
            <Label>Level 4</Label>
            <SearchableSelect
              data={level4Options}
              item={level4}
              setItem={setLevel4}
              text={"Select Level 4 Category"}
              placeholder={"Search Level 4 Category"}
            />
          </FormControl>
        )}
        {level5Options.length > 0 && (
          <FormControl className="flex-1 relative">
            <Label>Level 5</Label>
            <SearchableSelect
              data={level5Options}
              item={level5}
              setItem={setLevel5}
              text={"Select Level 5 Category"}
              placeholder={"Search Level 5 Category"}
            />
          </FormControl>
        )}
        <FormControl className="flex-1 relative">
          <Label>Unit Of Measurement</Label>
          <SearchableSelect
            data={unitOfMeasurementOptions}
            item={unitOfMeasurement}
            setItem={setUnitOfMeasurement}
            text={"Select Unit Of Measurement"}
            placeholder={"Select Unit Of Measurement"}
          />
        </FormControl>

        <FormControl className="flex-1 relative">
          <Label>Quantity</Label>
          <Input
            type="text"
            value={quantity}
            onChange={(e) => {
              const value = e.target.value;
              if (value === "0") {
                setQuantity("");
              } else if (!isNaN(Number(value))) {
                setQuantity(value);
              }
            }}
            placeholder="Enter Quantity"
          />
        </FormControl>
      </div>
    </form>
  );
};

export default ActivitiesForm2;
