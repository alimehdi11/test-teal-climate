import { useEffect, useState } from "react";
import FormControl from "../../components/FormControl";
import Label from "../../components/ui/Label";
import SearchableSelect from "../../components/ui/SearchableSelect";
import Select from "../../components/ui/Select";
import { usePeriod } from "../../contexts/PeriodProvider";
import { api } from "../../../api/index.js";
import Input from "./../../components/ui/Input";
import Button from "../../components/ui/Button.jsx";
import { toast } from "react-toastify";
import { filterBusinessUnitsActivitiesForSelectedPeriod } from "../../utils/helper.js";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";

const ActivitiesForm2 = ({
  selectedScope,
  selectedLevel,
  setBusinessUnitsActivities,
  setSelectedScope,
  setSelectedLevel,
  businessUnits,
}) => {
  const [month, setMonth] = useState();
  const [businessUnitId, setBusinessUnitId] = useState("");
  const [level1Category, setLevel1Category] = useState();
  const [level2, setLevel2] = useState();
  const [level3, setLevel3] = useState();
  const [level4, setLevel4] = useState();
  const [level5, setLevel5] = useState();
  const [unitOfMeasurement, setUnitOfMeasurement] = useState();
  const [quantity, setQuantity] = useState("");

  const [monthOptions, setMonthOptions] = useState([]);
  const [level1CategoriesOptions, setlevel1CategoriesOptions] = useState([]);
  const [level2Options, setLevel2Options] = useState([]);
  const [level3Options, setLevel3Options] = useState([]);
  const [level4Options, setLevel4Options] = useState([]);
  const [level5Options, setLevel5Options] = useState([]);
  const [unitOfMeasurementOptions, setUnitOfMeasurementOptions] = useState([]);
  const [airports, setAirports] = useState([]);

  const { getPeriodMonths, selectedPeriod, setSelectedPeriod } = usePeriod();

  const [marketBased, setMarketBased] = useState(false);
  const [marketBasedQuantity, setMarketBasedQuantity] = useState("");
  const [marketBasedEmissionFactor, setMarketBasedEmissionFactor] =
    useState("");
  const [marketBasedUnitOfEmissionFactor, setMarketBasedUnitOfEmissionFactor] =
    useState("kg CO2e/kWh");
  const [airportsDistance, setAirportsDistance] = useState(0);
  const [isFormInitializing, setIsFormInitializing] = useState(false);

  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const possibleLevel2Labels = {
    "Refrigerant and other": "Refrigerant and other gas category",
    "Passenger vehicles": "Passenger vehicle category",
    "Delivery vehicles": "Delivery vehicle category",
    "Passenger Evs": "Passenger ev category",
    "Delivery Evs": "Delivery ev category",
    "WTT- fuels": "Fuel type",
    "WTT- bioenergy": "Bioenergy type",
    "Electricity TandD for passenger EVs": "Passenger ev category",
    "Business travel- land": "Passenger vehicle category",
    "Material use": "Material type",
    "Waste disposal": "Waste type",
    "Business travel- sea": "Boat / ship type",
    "WTT- business travel- sea": "Boat / ship type",
    "WTT- pass vehs and travel- land": "Passenger vehicle category",
    "Freighting goods": "Freighting medium",
    "WTT- delivery vehs and freight": "Freighting medium",
    "Managed assets- vehicles": "Vehicle category",
    "Business travel- air": "Airport from",
    "WTT- business travel- air": "Airport from",
    Electricity: "Electricity type",
  };

  const possibleLevel3Labels = {
    Bioenergy: "Bioenergy fuel name",
    "Refrigerant and other": "Refrigerant and other gas name",
    "Passenger vehicles": "Passenger vehicle segment / size",
    "Delivery vehicles": "Delivery vehicle class / category",
    "Passenger Evs": "Passenger ev segment / size",
    "Delivery Evs": "Delivery vehicle segment / size",
    "Heat and steam": "Onsite / offsite",
    "WTT- fuels": "Fuel name",
    "WTT- bioenergy": "Bioenergy fuel name",
    "Electricity TandD for passenger EVs": "Passenger ev segment / size",
    "Business travel- land": "Passenger vehicle segment / size",
    "WTT- heat and steam": "Onsite / offsite",
    "Material use": "Material name",
    "Waste disposal": "Waste name",
    "Business travel- sea": "Passenger type",
    "WTT- business travel- sea": "Passenger type",
    "WTT- pass vehs and travel- land": "Passenger vehicle segment / size",
    "Freighting goods": "Class / type / haul",
    "WTT- delivery vehs and freight": "Class / type / haul",
    "Hotel stay": "Name of country",
    "Managed assets- vehicles": "Vehicle segment / size",
    "Business travel- air": "Airport to",
    "WTT- business travel- air": "Airport to",
  };

  const specialLevel = [
    "Electricity",
    "Electricity TandD",
    "WTT- electricity (generation)",
    "WTT- electricity (TandD)",
    "WTT- electricity",
    "Managed assets- electricity",
    "WTT- electricity (T&D)",
    "Electricity T&D",
  ];

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
      console.log(options);
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

  const resetForm = () => {
    // Reset form fields
    // setLevel1Category(undefined);
    setLevel2(undefined);
    setLevel3(undefined);
    setLevel4(undefined);
    setLevel5(undefined);
    setUnitOfMeasurement(undefined);
    setQuantity("");
    // Reset options arrays
    // setLevel2Options([]);
    setLevel3Options([]);
    setLevel4Options([]);
    setLevel5Options([]);
    setUnitOfMeasurementOptions([]);

    setMarketBased(false);
    setMarketBasedEmissionFactor("");
    setMarketBasedQuantity("");

    setAirportsDistance(0);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.table({
    //   scope: selectedScope,
    //   level1: selectedLevel,
    //   businessUnitId,
    //   level1Category,
    //   level2,
    //   level3,
    //   level4,
    //   level5,
    //   unitOfMeasurement,
    //   quantity,
    //   month,
    //   marketBasedQuantity,
    //   marketBasedEmissionFactor,
    //   marketBasedUnitOfEmissionFactor,
    // });
    // return;
    if (
      !month ||
      !businessUnitId ||
      !level1Category ||
      !level2 ||
      level3 === undefined ||
      level4 === undefined ||
      level5 === undefined ||
      !unitOfMeasurement ||
      !quantity
    ) {
      return toast.warn("Please fill all fields");
    }
    /**
     * For Scope 2  && marketBased
     */
    if (marketBased) {
      if (
        !marketBasedQuantity ||
        !marketBasedEmissionFactor ||
        !marketBasedUnitOfEmissionFactor
      ) {
        return toast.warn("Please fill all fields");
      }
    }
    const payload = {
      scope: selectedScope,
      level1: selectedLevel,
      businessUnitId,
      level1Category,
      level2,
      level3,
      level4,
      level5,
      unitOfMeasurement,
      quantity,
      month,
    };
    // return console.table(payload);
    if (id) {
      if (!marketBased) {
        const { success, message } =
          await api.businessUnitsActivities.updateBusinessUnitActivityById(
            id,
            selectedScope == "Scope 2"
              ? { ...payload, level5: "locationBased" }
              : payload
          );
        if (success) {
          toast.success(message);
          navigate("/activities");
        } else {
          toast.error(message);
        }
      }
      if (selectedScope === "Scope 2" && marketBased) {
        const payload2 = { ...payload };
        payload2.unitOfMeasurement = marketBasedUnitOfEmissionFactor;
        payload2.quantity = marketBasedQuantity;
        payload2.marketBasedEmissionFactor = marketBasedEmissionFactor;
        payload2.level5 = "marketBased";
        const { success, message } =
          await api.businessUnitsActivities.updateBusinessUnitActivityById(
            id,
            payload2
          );
        if (success) {
          toast.success(message);
          navigate("/activities");
        } else {
          toast.error(message);
        }
      }
    } else {
      const { success, message } =
        await api.businessUnitsActivities.createBusinessUnitActivity(
          selectedScope == "Scope 2"
            ? { ...payload, level5: "locationBased" }
            : payload
        );
      if (success) {
        toast.success(message);
      } else {
        toast.error(message);
      }

      if (selectedScope === "Scope 2" && marketBased) {
        const payload2 = { ...payload };
        payload2.unitOfMeasurement = marketBasedUnitOfEmissionFactor;
        payload2.quantity = marketBasedQuantity;
        payload2.marketBasedEmissionFactor = marketBasedEmissionFactor;
        payload2.level5 = "marketBased";
        const { success, message } =
          await api.businessUnitsActivities.createBusinessUnitActivity(
            payload2
          );
        if (success) {
          toast.success(message);
        } else {
          toast.error(message);
        }
      }
    }
    resetForm();
    const { data } =
      await api.businessUnitsActivities.getAllBusinessUnitsActivities();
    setBusinessUnitsActivities(
      filterBusinessUnitsActivitiesForSelectedPeriod(data, selectedPeriod)
    );
  };

  const handleCancel = () => {
    resetForm();
    navigate("/activities");
  };

  const getAirportCoordinates = (airports, airportName) => {
    const airport = airports.filter(
      (airport) => airport.name === airportName
    )[0];
    return {
      latitude: airport.latitude,
      longitude: airport.longitude,
    };
  };

  const calculateDistanceBetweenAirports = (lat1, lon1, lat2, lon2) => {
    const EARTH_RADIUS_IN_MILES = 3963.19;
    let distanceInMiles =
      EARTH_RADIUS_IN_MILES *
      Math.acos(
        Math.sin(lat1) * Math.sin(lat2) +
          Math.cos(lat1) * Math.cos(lat2) * Math.cos(lon2 - lon1)
      );
    distanceInMiles = Number(distanceInMiles.toFixed(2));
    return distanceInMiles;
  };

  // Automatically set month if there's only one month
  useEffect(() => {
    setMonth(undefined);
    if (selectedPeriod) {
      setMonthOptions(getPeriodMonths());
    }
  }, [selectedPeriod]);

  // Automatically set businessUnitId if there's only one business unit
  useEffect(() => {
    setBusinessUnitId("");
    if (businessUnits.length === 1) {
      setBusinessUnitId(businessUnits[0].id);
    }
  }, [businessUnits]);

  // Fetch "Level 1 Category" when business unit is selected
  useEffect(() => {
    if (!isFormInitializing) {
      setLevel1Category(undefined);
      setLevel2(undefined);
      setLevel3(undefined);
      setLevel4(undefined);
      setLevel5(undefined);
      setUnitOfMeasurement(undefined);
      setQuantity("");
      setLevel2Options([]);
      setLevel3Options([]);
      setLevel4Options([]);
      setLevel5Options([]);
      setUnitOfMeasurementOptions([]);
      fetchActivities(
        () => api.level1Categories.getAllLevel1Categories(selectedLevel),
        setlevel1CategoriesOptions,
        selectedLevel
      );
    }
  }, [selectedLevel]);

  // Fetch level2 options when "Level 1 Category" is selected
  useEffect(() => {
    if (!isFormInitializing) {
      setLevel2(undefined);
      setLevel3(undefined);
      setLevel4(undefined);
      setLevel5(undefined);
      setUnitOfMeasurement(undefined);
      setQuantity("");
      setLevel3Options([]);
      setLevel4Options([]);
      setLevel5Options([]);
      setUnitOfMeasurementOptions([]);
    }
    if (
      selectedLevel === "Business travel- air" ||
      selectedLevel === "WTT- business travel- air"
    ) {
      if (level1Category) {
        const getAirports = async () => {
          const airports = await api.airports.getAllAirports();
          setLevel2Options(airports.map((item) => item.name));
          setAirports(airports);
        };
        getAirports();
      }
    } else {
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
    }
  }, [level1Category]);

  // Fetch level3 options based on level2 when level2 is selected
  useEffect(() => {
    if (!isFormInitializing) {
      setLevel3(undefined);
      setLevel4(undefined);
      setLevel5(undefined);
      setUnitOfMeasurement(undefined);
      setQuantity("");
      setLevel4Options([]);
      setLevel5Options([]);
      setUnitOfMeasurementOptions([]);
    }
    if (
      level2 &&
      (selectedLevel == "Business travel- air" ||
        selectedLevel == "WTT- business travel- air")
    ) {
      setLevel3Options(level2Options.filter((item) => item != level2));
    } else if (level2 && specialLevel.includes(selectedLevel)) {
      setLevel3("");
    } else {
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
    }
  }, [level2]);

  // Fetch level4 options based on level3 when level3 is selected
  useEffect(() => {
    if (!isFormInitializing) {
      setLevel4(undefined);
      setLevel5(undefined);
      setUnitOfMeasurement(undefined);
      setQuantity("");
      setLevel5Options([]);
      setUnitOfMeasurementOptions([]);
    }

    if (
      level3 &&
      (selectedLevel === "Business travel- air" ||
        selectedLevel === "WTT- business travel- air")
    ) {
      const { latitude: lat1, longitude: lon1 } = getAirportCoordinates(
        airports,
        level2
      );
      const { latitude: lat2, longitude: lon2 } = getAirportCoordinates(
        airports,
        level3
      );
      const distanceInMiles = calculateDistanceBetweenAirports(
        lat1,
        lon1,
        lat2,
        lon2
      );
      // Determining level4
      if (distanceInMiles < 300) {
        setLevel4Options(["Air Travel - Short Haul"]);
      } else if (distanceInMiles >= 300 && distanceInMiles < 2300) {
        setLevel4Options(["Air Travel - Medium Haul"]);
      } else if (distanceInMiles >= 2300) {
        setLevel4Options(["Air Travel - Long Haul"]);
      }
      setAirportsDistance(distanceInMiles);
    } else if (level3 !== undefined && specialLevel.includes(selectedLevel)) {
      setLevel4("");
    } else {
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
    }
  }, [level3]);

  // Fetch level5 options based on level4 when level4 is selected
  useEffect(() => {
    if (!isFormInitializing) {
      setLevel5(undefined);
      setUnitOfMeasurement(undefined);
      setQuantity("");
      setUnitOfMeasurementOptions([]);
    }
    if (
      level4 &&
      (selectedLevel == "Business travel- air" ||
        selectedLevel == "WTT- business travel- air")
    ) {
      setLevel5Options([
        "First class",
        "Economy class",
        "Business class",
        "Premium economy class",
      ]);
    } else if (level4 !== undefined && specialLevel.includes(selectedLevel)) {
      setLevel5("");
    } else {
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
    }
  }, [level4]);

  // Fetch unitOfMeasurementOptions based on level5 when level5 is selected
  useEffect(() => {
    if (!isFormInitializing) {
      setUnitOfMeasurement(undefined);
      setQuantity("");
    }
    if (
      selectedLevel == "Business travel- air" ||
      selectedLevel == "WTT- business travel- air"
    ) {
      if (level5) {
        setUnitOfMeasurementOptions(["passenger-mile", "passenger.km"]);
        setQuantity(airportsDistance);
      }
    } else {
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
    }
  }, [level5]);

  useEffect(() => {
    if (id && !searchParams.get("eeio") && !searchParams.get("reit")) {
      setIsFormInitializing(true);
      api.businessUnitsActivities
        .getBusinessUnitActivityById(id)
        .then(({ data: bussinessUnitActivity }) => {
          setSelectedScope(bussinessUnitActivity.scope);
          setSelectedLevel(bussinessUnitActivity.level1);
          setMonth(bussinessUnitActivity.month);
          setBusinessUnitId(bussinessUnitActivity.businessUnit.id);
          setLevel1Category(bussinessUnitActivity.level1Category);
          setLevel2(bussinessUnitActivity.level2);
          setLevel3(bussinessUnitActivity.level3);
          setLevel4(bussinessUnitActivity.level4);
          setLevel5(bussinessUnitActivity.level5);
          setUnitOfMeasurement(bussinessUnitActivity.unitOfMeasurement);
          setQuantity(bussinessUnitActivity.quantity);
          setSelectedPeriod(bussinessUnitActivity.businessUnit.period.id);
          if (bussinessUnitActivity.level5 === "marketBased") {
            setMarketBased(true);
            setMarketBasedUnitOfEmissionFactor(
              bussinessUnitActivity.unitOfMeasurement
            );
            setMarketBasedQuantity(bussinessUnitActivity.quantity);
          }
        });
    }
  }, [id]);

  useEffect(() => {
    if (
      id &&
      selectedScope &&
      selectedLevel &&
      month &&
      businessUnitId &&
      level1Category !== undefined &&
      level2 !== undefined &&
      level3 !== undefined &&
      level4 !== undefined &&
      level5 !== undefined &&
      unitOfMeasurement !== undefined &&
      quantity &&
      marketBasedQuantity &&
      marketBasedEmissionFactor &&
      marketBasedUnitOfEmissionFactor
    ) {
      setIsFormInitializing(false);
    }
  }, [
    businessUnitId,
    level1Category,
    level2,
    level3,
    level4,
    level5,
    quantity,
    unitOfMeasurement,
    month,
    marketBasedQuantity,
    marketBasedEmissionFactor,
    marketBasedUnitOfEmissionFactor,
  ]);

  /**
   *  If user is in "Scope 2" and user select marketBased to true.
   *  If user switch to any other scope.
   *  We have to make sure that marketBased gets to false in other scopes
   */
  useEffect(() => {
    if (selectedScope === "Scope 1" || selectedScope === "Scope 3") {
      setMarketBased(false);
    }
  }, [selectedScope]);

  return (
    <form
      className="flex flex-col gap-y-3 bg-white rounded-md p-6"
      onSubmit={handleSubmit}
    >
      <h3 className="m-0 font-extrabold text-2xl">Insert activity data here</h3>
      {selectedScope === "Scope 2" && (
        <h4 className="bg-tc-blue text-white col-span-full p-2 rounded-md">
          Location based
        </h4>
      )}
      <div className="grid gap-4">
        <FormControl className="flex-1 relative">
          <Label>Month</Label>
          <SearchableSelect
            data={monthOptions}
            item={month}
            setItem={setMonth}
            text={"Select month"}
            placeholder={"Search month"}
          />
        </FormControl>
        <FormControl className="flex-1 relative">
          <Label>Business unit</Label>
          <Select
            value={businessUnitId}
            onChange={(e) => setBusinessUnitId(e.target.value)}
          >
            <option value="">Select option</option>
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
          <Label>Level 1 category</Label>
          <SearchableSelect
            data={level1CategoriesOptions}
            item={level1Category}
            setItem={setLevel1Category}
            text={"Select level 1 category"}
            placeholder={"Search level 1 category"}
          />
        </FormControl>
        <FormControl className="flex-1 relative">
          <Label>{possibleLevel2Labels[selectedLevel] || "Fuel type"}</Label>
          <SearchableSelect
            data={level2Options}
            item={level2}
            setItem={setLevel2}
            text={"Select level 2 category"}
            placeholder={"Search Level 2 category"}
          />
        </FormControl>
        {!specialLevel.includes(selectedLevel) && (
          <FormControl className="flex-1 relative">
            <Label>{possibleLevel3Labels[selectedLevel] || "Fuel name"}</Label>
            <SearchableSelect
              data={level3Options}
              item={level3}
              setItem={setLevel3}
              text={"Select level 3 category"}
              placeholder={"Search level 3 category"}
            />
          </FormControl>
        )}
        {level4Options.length > 0 && (
          <FormControl className="flex-1 relative">
            <Label>Level 4</Label>
            <SearchableSelect
              data={level4Options}
              item={level4}
              setItem={setLevel4}
              text={"Select level 4 category"}
              placeholder={"Search level 4 category"}
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
              text={"Select level 5 category"}
              placeholder={"Search level 5 category"}
            />
          </FormControl>
        )}
        <FormControl className="flex-1 relative">
          <Label>Unit of measurement</Label>
          <SearchableSelect
            data={unitOfMeasurementOptions}
            item={unitOfMeasurement}
            setItem={setUnitOfMeasurement}
            text={"Select unit of measurement"}
            placeholder={"Select unit of measurement"}
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
            placeholder="Enter quantity"
            readOnly={airportsDistance !== 0}
          />
        </FormControl>
      </div>
      {selectedScope === "Scope 2" &&
        (id && !marketBased ? null : (
          <div>
            {/* Radio buttons */}
            <p>
              Was a market based instrument purchases for this electricity use?
            </p>
            <div className="flex gap-x-3">
              <span className="flex items-center gap-x-1">
                <input
                  type="radio"
                  id="locationBased"
                  name="electricityBased"
                  value="0" // False
                  checked={!marketBased}
                  onChange={(event) => {
                    setMarketBased(Boolean(Number(event.target.value)));
                  }}
                />
                <Label htmlFor="locationBased">
                  {/* Location Based */}
                  No
                </Label>
              </span>
              <span className="flex items-center gap-x-1">
                <input
                  type="radio"
                  id="marketBased"
                  name="electricityBased"
                  value="1"
                  checked={marketBased}
                  onChange={(event) => {
                    setMarketBased(Boolean(Number(event.target.value)));
                  }}
                />
                <Label htmlFor="marketBased">
                  {/* Market Based */}
                  Yes
                </Label>
              </span>
            </div>
          </div>
        ))}
      {/* Market based form */}
      {marketBased && (
        <div className="grid lg:grid-cols-2 gap-4">
          <h4 className="bg-tc-blue text-white col-span-full p-2 rounded-md">
            Market based
          </h4>
          <FormControl>
            <Label>Quantity purchased</Label>
            <Input
              type="number"
              value={marketBasedQuantity}
              onChange={(event) => {
                setMarketBasedQuantity(event.target.value);
              }}
              placeholder="Enter purchased quantity"
            />
          </FormControl>
          <FormControl>
            <Label>Emission factor</Label>
            <Input
              type="number"
              value={marketBasedEmissionFactor}
              onChange={(event) => {
                setMarketBasedEmissionFactor(event.target.value);
              }}
              placeholder="Enter quantity"
            />
          </FormControl>
          <FormControl>
            <Label>Unit of emission factor</Label>
            <Select
              value={marketBasedUnitOfEmissionFactor}
              onChange={(e) =>
                setMarketBasedUnitOfEmissionFactor(e.target.value)
              }
            >
              <option value="kg CO2e/kWh">kg CO2e/kWh</option>
            </Select>
          </FormControl>
        </div>
      )}
      <div className="flex justify-end gap-4">
        {id && (
          <Button type="button" onClick={handleCancel}>
            Cancel
          </Button>
        )}
        <Button type="submit">{id ? "Edit" : "Add"}</Button>
      </div>
    </form>
    // Give me 5
  );
};

export default ActivitiesForm2;
