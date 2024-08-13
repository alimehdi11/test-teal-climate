import { useState, useEffect, useContext } from "react";
import { toast } from "react-toastify";
import { useParams, useNavigate } from "react-router-dom";
import { request } from "../../utils/request.js";
import Button from "../../components/ui/Button.jsx";
import FormControl from "../../components/FormControl.jsx";
import Input from "../../components/ui/Input.jsx";
import Label from "../../components/ui/Label.jsx";
import Select from "../../components/ui/Select.jsx";
import { DataContext } from "../../contexts/DataContext.jsx";
import { UserContext } from "../../contexts/UserContext.jsx";

const ActivitesForm = ({
  selectedScope,
  selectedLevel,
  fetchUserBusinessUnitsActivities,
}) => {
  const [scopeCategoryValue, setScopeCategoryValue] = useState("");
  const [fuelTypeValue, setFuelTypeValue] = useState(""); // level2
  const [businessUnitValue, setBusinessUnitValue] = useState("");
  const [unitOfMeasurementValue, setUnitOfMeasurementValue] = useState("");
  const [fuelNameValue, setFuelNameValue] = useState(""); // level3
  const [quantityValue, setQuantityValue] = useState("");
  const [level4Value, setLevel4Value] = useState("");
  const [level5Value, setLevel5Value] = useState("");

  const [businessUnits, setBusinessUnits] = useState([]);

  const [unitOfMeasurements, setUnitOfMeasurements] = useState([]);
  const [scopeCategories, setScopeCategories] = useState([]);
  const [fuelTypes, setFuelTypes] = useState([]);
  const [fuelNames, setFuelNames] = useState([]);
  const [level4Options, setLevel4Options] = useState([]);
  const [level5Options, setLevel5Options] = useState([]);

  const [showFuelNamesField, setShowFuelNamesField] = useState(false);
  const [showLevel4Field, setShowLevel4Field] = useState(false);
  const [showLevel5Field, setShowLevel5Field] = useState(false);

  /**
   * For Scope 2 market based
   */
  const [marketBased, setMarketBased] = useState(false);
  const [emissionFactor, setEmissionFactor] = useState("");
  const [quantityPurchased, setQuantityPurchased] = useState("");
  const [unitOfEmissionFactor, setUnitOfEmissionFactor] = useState("");

  const [airports, setAirports] = useState([]);

  const { id } = useParams();
  const navigate = useNavigate();

  const data = useContext(DataContext);
  const { user } = useContext(UserContext);

  const activities = data.activities;
  const level1Categories = data.level1Categories;

  const fetchUserBusinessUnits = async () => {
    try {
      const response = await request(
        `${import.meta.env.VITE_API_BASE_URL}/users/${user.id}/businessUnits`,
        "GET"
      );
      if (!response.ok) {
        throw new Error(`${JSON.stringify(await response.json())}`);
      }
      return await response.json();
    } catch (error) {
      const errorMessage = JSON.parse(error.message).error;
      toast.error(errorMessage);
      console.error("Error fetching businessUnits : ", errorMessage);
    }
  };

  const fetchAirports = async () => {
    try {
      const response = await request(
        `${import.meta.env.VITE_API_BASE_URL}/airports`,
        "GET"
      );

      if (!response.ok) {
        throw new Error("Failed to fetch airports");
      }
      const jsonData = await response.json();
      return jsonData;
    } catch (error) {
      console.error("Error fetching airports data:", error);
    }
  };

  const filterScopeCategories = () => {
    let level2 = [];
    level1Categories?.forEach((item) => {
      if (item.level1 === selectedLevel) {
        level2.push(item.category);
      }
    });
    level2 = [...new Set(level2)];
    return level2;
  };

  const filterUnitOfMeasurements = () => {
    let unitsOfMeasurements = [];
    activities?.forEach((item) => {
      if (
        item.scope === selectedScope &&
        item.level1 === selectedLevel &&
        item.level2 === fuelTypeValue
        // &&
        // item.level3 === fuelNameValue
      ) {
        unitsOfMeasurements.push(item.unitOfMeasurement);
      }
    });
    unitsOfMeasurements = [...new Set(unitsOfMeasurements)];
    return unitsOfMeasurements;
  };

  const filterFuelTypes = () => {
    let fuelTypes = [];
    activities?.forEach((item) => {
      if (item.scope === selectedScope && item.level1 === selectedLevel) {
        fuelTypes.push(item.level2);
      }
    });
    fuelTypes = [...new Set(fuelTypes)];
    return fuelTypes;
  };

  const filterFuelNames = () => {
    let fuelNames = [];
    activities?.forEach((item) => {
      if (
        item.level2 === fuelTypeValue &&
        item.level1 === selectedLevel &&
        item.scope === selectedScope &&
        item.level3
      ) {
        fuelNames.push(item.level3);
      }
    });
    fuelNames = [...new Set(fuelNames)];
    return fuelNames;
  };

  const filterGHGEmissions = (condition) => {
    let CO2e = null;
    let CO2e_of_CO2 = null;
    let CO2e_of_CH4 = null;
    let CO2e_of_N2O = null;

    const greenHouseGasValues = [
      "kg CO2e",
      // "kg CO2e of CO2 per unit",
      "kg CO2e of CO2",
      // "kg CO2e of CH4 per unit",
      "kg CO2e of CH4",
      // "kg CO2e of N2O per unit",
      "kg CO2e of N2O",
    ];

    for (let i = 0; i < activities.length; i++) {
      const activity = activities[i];

      if (condition(activity)) {
        if (activity.greenHouseGas === greenHouseGasValues[0]) {
          CO2e = activity.greenHouseGasEmissionFactor;
        } else if (activity.greenHouseGas === greenHouseGasValues[1]) {
          CO2e_of_CO2 = activity.greenHouseGasEmissionFactor;
        } else if (activity.greenHouseGas === greenHouseGasValues[2]) {
          CO2e_of_CH4 = activity.greenHouseGasEmissionFactor;
        } else if (activity.greenHouseGas === greenHouseGasValues[3]) {
          CO2e_of_N2O = activity.greenHouseGasEmissionFactor;
        }
      }

      if (CO2e && CO2e_of_CO2 && CO2e_of_CH4 && CO2e_of_N2O) {
        // If all 4 values are found not need to loop any more
        break;
      }
    }

    return {
      CO2e,
      CO2e_of_CO2,
      CO2e_of_CH4,
      CO2e_of_N2O,
    };
  };

  const filterConversionGHG = () => {
    const condition = (activity) => {
      return (
        activity.scope === selectedScope &&
        activity.level1 === selectedLevel &&
        activity.level2 === fuelTypeValue &&
        activity.level3 === fuelNameValue &&
        activity.unitOfMeasurement === unitOfMeasurementValue &&
        (selectedLevel === "Material use" || selectedLevel === "Waste disposal"
          ? activity.level5 === level5Value
          : true)
      );
    };
    return filterGHGEmissions(condition);
  };

  const filterConversionGHGForElectricity = (payload) => {
    const condition = (activity) => {
      return (
        activity.scope === selectedScope &&
        activity.level1 === selectedLevel &&
        activity.level2 === payload.level2 &&
        activity.level3 === payload.level3 &&
        (activity.level4 === payload.level4 || activity.level4 === "null") &&
        activity.unitOfMeasurement === unitOfMeasurementValue
      );
    };
    return filterGHGEmissions(condition);
  };

  const filterConversionGHGFor____ = (payload) => {
    const condition = (activity) => {
      return (
        activity.scope === selectedScope &&
        activity.level1 === selectedLevel &&
        activity.level2 === payload.level2 &&
        activity.level3 === payload.level3 &&
        activity.level5 === payload.level5 &&
        activity.unitOfMeasurement === unitOfMeasurementValue
      );
    };

    return filterGHGEmissions(condition);
  };

  const filterConversionGHGForBusinessTravelAirOrWTTBusinessTravelAir = (
    payload
  ) => {
    const condition = (activity) => {
      return (
        activity.scope === selectedScope &&
        activity.level1 === selectedLevel &&
        // In database level4(fuelNameValue) is at level3 (should be consistent)
        activity.level3 === payload.level4 &&
        // In database level5 is at level4 (should be consistent)
        activity.level4 === payload.level5 &&
        activity.unitOfMeasurement === unitOfMeasurementValue
      );
    };
    return filterGHGEmissions(condition);
  };

  const resetForm = () => {
    setScopeCategoryValue("");
    setFuelTypeValue("");
    setUnitOfMeasurementValue("");
    setBusinessUnitValue("");
    setFuelNameValue("");
    setQuantityValue("");
    setLevel4Value("");
    setLevel5Value("");

    // setUnitOfMeasurements([]);
    // setScopeCategories([]);
    // setFuelTypes([]);
    // setFuelNames([]);
    // setLevel4Options([]);
    // setLevel5Options([]);

    // setShowFuelNamesField(false);
    // setShowLevel4Field(false);
    // setShowLevel5Field(false);

    // setSelectedScope(selectedScope || null);
    // setSelectedLevel(selectedLevel || null);

    /**
     * For electricity(level1) market based
     */
    setMarketBased(false);
    setEmissionFactor("");
    setQuantityPurchased("");
    setUnitOfEmissionFactor("");
  };

  const fetchActivityById = async () => {
    try {
      const response = await request(
        `${import.meta.env.VITE_API_BASE_URL}/businessUnitsActivities/${id}`,
        "GET"
      );
      if (!response.ok) {
        throw new Error(`${JSON.stringify(await response.json())}`);
      }
      const activity = await response.json();
      return activity;
    } catch (error) {
      const errorMessage = JSON.parse(error.message).error;
      toast.error(errorMessage);
      console.error(errorMessage);
      console.error("Error fetchActivityById:", error);
    }
  };

  const filterLevel5BasedOnScopeAndLevel1 = () => {
    let level5 = [];
    activities?.forEach((item) => {
      if (
        item.scope === selectedScope &&
        // here selectedLevel === Electricity
        item.level1 === selectedLevel
      ) {
        level5.push(item.level5);
      }
    });
    level5 = [...new Set(level5)];
    return level5;
  };

  const fetchElectricVehicle = async (payload) => {
    try {
      const url = `${import.meta.env.VITE_API_BASE_URL}/electricVehicles?level1=${payload.level1}&level2=${payload.level2}&level3=${payload.level3}&level4=${payload.level4}&unitOfMeasurement=${payload.unitOfMeasurement}`;
      const response = await request(url, "GET");
      if (!response.ok) {
        throw new Error(`${JSON.stringify(await response.json())}`);
      }
      const electricVehicle = await response.json();
      return electricVehicle;
    } catch (error) {
      const errorMessage = JSON.parse(error.message).error;
      toast.error(errorMessage);
      console.error("Error fetching electricVehicle : ", errorMessage);
      console.log(error);
    }
  };

  const fetchCompanyDataAndFilterCountryAndRegion = async () => {
    try {
      const response = await request(
        `${import.meta.env.VITE_API_BASE_URL}/businessUnits/${businessUnitValue /* :id -> businessUnitId */}`,
        "GET"
      );
      if (!response.ok) {
        throw new Error(`${JSON.stringify(await response.json())}`);
      }
      const businessUnit = await response.json();
      const { country, region } = businessUnit;
      return { country, region };
    } catch (error) {
      const errorMessage = JSON.parse(error.message).error;
      toast.error(errorMessage);
      console.error("Error fetching businessUnits : ", errorMessage);
    }
  };

  const filterLevel2 = (payload) => {
    for (let index = 0; index < activities.length; index++) {
      const item = activities[index];
      if (
        item.scope === selectedScope &&
        item.level1 === selectedLevel &&
        item.level2
      ) {
        return item.level2;
      }
    }
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    // console.table([
    //   userId,
    //   selectedScope,
    //   selectedLevel,
    //   scopeCategoryValue,
    //   businessUnitValue,
    //   fuelTypes,
    //   fuelTypeValue,
    //   fuelNames,
    //   fuelNameValue,
    //   level4Options,
    //   level4Value,
    //   level5Options,
    //   level5Value,
    //   unitOfMeasurementValue,
    //   quantityValue,
    // ]);
    // console.log(
    //   !userId ||
    //     !selectedScope ||
    //     !selectedLevel ||
    //     !scopeCategoryValue ||
    //     !businessUnitValue ||
    //     (fuelTypes.length > 0 && !fuelTypeValue) ||
    //     (fuelNames.length > 0 && !fuelNameValue) ||
    //     (level4Options.length > 0 && !level4Value) ||
    //     (level5Options.length > 0 && !level5Value) ||
    //     !unitOfMeasurementValue ||
    //     !quantityValue
    // );
    // all value should be false
    if (
      // !userId ||
      !selectedScope ||
      !selectedLevel ||
      !scopeCategoryValue ||
      !businessUnitValue ||
      (fuelTypes.length > 0 && !fuelTypeValue) ||
      (fuelNames.length > 0 && !fuelNameValue) ||
      (level4Options.length > 0 && !level4Value) ||
      (level5Options.length > 0 && !level5Value) ||
      !unitOfMeasurementValue ||
      !quantityValue
    ) {
      toast.warn("Please fill all fields");
      return;
    }

    /**
     * For Scope 2 market based
     */
    if (marketBased) {
      if (!emissionFactor || !quantityPurchased || !unitOfEmissionFactor) {
        toast.warn("Please fill all fields");
        return;
      }
    }

    let payload, ghgconversions, marketBasedPayload;

    if (
      selectedLevel === "Electricity" ||
      selectedLevel === "Electricity TandD" ||
      selectedLevel === "WTT- electricity (generation)" ||
      selectedLevel === "WTT- electricity (TandD)" ||
      selectedLevel === "WTT- electricity" ||
      selectedLevel === "Water supply" ||
      selectedLevel === "Water treatment" ||
      selectedLevel === "Managed assets- electricity" ||
      selectedLevel === "WTT- electricity (T&D)" ||
      selectedLevel === "Electricity T&D"
    ) {
      //  fetching companies data and filtering country from that based on business unit is selected

      payload = {
        unitOfMeasurement: unitOfMeasurementValue,
        businessUnitId: businessUnitValue,
        quantity: quantityValue,
        level1Category: scopeCategoryValue,
        scope: selectedScope,
        level1: selectedLevel,
        level2: fuelTypeValue || null,
        level3: null,
        level4: null,
        level5: null,
      };

      // for Water supply and Water treatment we do not have to fetch country and region based on businessunit
      if (
        selectedLevel !== "Water supply" &&
        selectedLevel !== "Water treatment"
      ) {
        // find country and region and then calculate ghgconversions and then update payload
        const { country, region } =
          await fetchCompanyDataAndFilterCountryAndRegion();
        // payload.level2 = "Electricity generated";
        payload.level3 = country;
        payload.level4 = region;
        if (selectedLevel !== "WTT- electricity") {
          payload.level2 = filterLevel2(payload);
        }
      } else {
        // level 4 and 5 are null for "Water supply" and "Water treatment"
        payload.level2 = selectedLevel;
        payload.level3 = selectedLevel;
      }
      ghgconversions = filterConversionGHGForElectricity(payload);
      payload = { ...payload, ...ghgconversions };
      // console.table(payload);
      // return;
    } else if (
      selectedLevel === "Heat and steam" ||
      selectedLevel === "Electricity TandD for delivery Evs" ||
      selectedLevel === "District heat and steam TandD" ||
      selectedLevel === "WTT- heat and steam" ||
      selectedLevel === "WTT- district heat and steam distribution" ||
      selectedLevel === "Hotel stay"
      // || selectedLevel === "Business travel- air"
      // || selectedLevel === "WTT- business travel- air"
    ) {
      payload = {
        unitOfMeasurement: unitOfMeasurementValue,
        businessUnitId: businessUnitValue,
        quantity: quantityValue,
        level1Category: scopeCategoryValue,
        scope: selectedScope,
        level1: selectedLevel,
        level2: null, // filter out
        level3: fuelNameValue || null, // from form / not available
        level4: level4Value || null, // from form / not available
        level5: null, // filter out
      };
      // find level2 and level5 and then calculate ghgconversions and then update payload
      payload.level2 = filterFuelTypes()[0];

      if (selectedLevel === "WTT- district heat and steam distribution") {
        payload.level3 = ((payload) => {
          let level3 = [];
          activities.forEach((item) => {
            if (
              item.scope === payload.scope &&
              item.level1 === payload.level1 &&
              item.level2 === payload.level2 &&
              item.level3
            ) {
              level3.push(item.level3);
            }
          });
          level3 = [...new Set(level3)];
          return level3;
        })(payload)[0];
      }

      if (
        selectedLevel !== "District heat and steam TandD" ||
        selectedLevel !== "WTT- heat and steam" ||
        selectedLevel !== "WTT- district heat and steam distribution" ||
        selectedLevel !== "Hotel stay" ||
        selectedLevel !== "Business travel- air" ||
        selectedLevel !== "WTT- business travel- air"
      ) {
        payload.level5 = filterLevel5BasedOnScopeAndLevel1()[0];
      }
      // "filterConversionGHGFor____" this function can be named better
      ghgconversions = filterConversionGHGFor____(payload);
      payload = { ...payload, ...ghgconversions };
      // console.table(payload);
      // return;
    } else if (
      selectedLevel === "Passenger Evs" ||
      selectedLevel === "Delivery Evs"
    ) {
      payload = {
        unitOfMeasurement: unitOfMeasurementValue,
        businessUnitId: businessUnitValue,
        quantity: quantityValue,
        level1Category: scopeCategoryValue,
        level1: selectedLevel,
        level2: fuelTypeValue || "Vans", // We only have 1 option for "Delivery Evs" so hard coding here
        level3: fuelNameValue,
        scope: selectedScope,
        level4: level4Value || null,
        level5: level5Value || "Battery Electric Vehicle", // We only have 1 option for "Delivery Evs" so hard coding here
      };

      /** TODO : "activities" table column values should be corrected.
       * "level5" data should be in level4. And level5 should be null.
       */
      payload.level4 = payload.level5;
      payload.level5 = null;

      /**
       * Formula:
       * Distance travelled in km/miles (quantityValue)
       *  x Electricity consumption per km/miles (fetch from electricVehicle table)
       *  x Electricity emission factor of the country/region
       *  (fetch country/region from businessUnits table based on businessUnitValue
       *   after that filter emission factors from activities
       *   based on Electricity and country/region)
       *
       */
      const electricVehicle = await fetchElectricVehicle(payload);
      let electricityConsumptionPerUnit =
        electricVehicle.electricityConsumptionPerUnit;

      const { country, region } =
        await fetchCompanyDataAndFilterCountryAndRegion();

      const { CO2e, CO2e_of_CO2, CO2e_of_CH4, CO2e_of_N2O } =
        filterElectricityEmissionsBasedOnContryAndRegion(country, region);

      payload.CO2e = !CO2e ? null : CO2e * electricityConsumptionPerUnit;
      payload.CO2e_of_CO2 = !CO2e_of_CO2
        ? null
        : CO2e_of_CO2 * electricityConsumptionPerUnit;
      payload.CO2e_of_CH4 = !CO2e_of_CH4
        ? null
        : CO2e_of_CH4 * electricityConsumptionPerUnit;
      payload.CO2e_of_N2O = !CO2e_of_N2O
        ? null
        : CO2e_of_N2O * electricityConsumptionPerUnit;
    } else {
      payload = {
        unitOfMeasurement: unitOfMeasurementValue,
        businessUnitId: businessUnitValue,
        quantity: quantityValue,
        level1Category: scopeCategoryValue,
        level1: selectedLevel,
        level2: fuelTypeValue,
        level3: fuelNameValue,
        scope: selectedScope,
        level4: level4Value || "",
        level5: level5Value || "",
        // ...ghgconversions,
      };

      if (
        selectedLevel === "Business travel- air" ||
        selectedLevel === "WTT- business travel- air"
      ) {
        ghgconversions =
          filterConversionGHGForBusinessTravelAirOrWTTBusinessTravelAir(
            payload
          );
      } else {
        ghgconversions = filterConversionGHG();
      }

      payload = { ...payload, ...ghgconversions };
    }

    // Multiplying emissionFactors by quantity/distance
    payload.CO2e = payload.CO2e * payload.quantity;
    payload.CO2e_of_CH4 = payload.CO2e_of_CH4 * payload.quantity;
    payload.CO2e_of_CO2 = payload.CO2e_of_CO2 * payload.quantity;
    payload.CO2e_of_N2O = payload.CO2e_of_N2O * payload.quantity;

    /**
     * For Scope 2 market based
     */
    if (selectedScope === "Scope 2") {
      // explicitly setting market based here
      payload.level5 = "locationBased";
    }

    if (selectedScope === "Scope 2" && marketBased) {
      marketBasedPayload = { ...payload };
      marketBasedPayload.level5 = "marketBased";
      marketBasedPayload.quantity = quantityPurchased;
      marketBasedPayload.CO2e = Number(emissionFactor);
      marketBasedPayload.unitOfMeasurement = unitOfEmissionFactor;
      marketBasedPayload.CO2e_of_CO2 = undefined;
      marketBasedPayload.CO2e_of_CH4 = undefined;
      marketBasedPayload.CO2e_of_N2O = undefined;
    }

    // console.table(payload);
    // console.table(marketBasedPayload);
    // return;
    request(
      `${import.meta.env.VITE_API_BASE_URL}/businessUnitsActivities`,
      "POST",
      payload
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error();
        }
        // Note : This if block is for omptimization purpose below i am fetching userBusinessUnitsActivities again
        if (!marketBased) {
          toast.success("Data submitted successfully");
          resetForm();
        }
      })
      .then(() => {
        if (!marketBased) {
          fetchUserBusinessUnitsActivities();
        }
      })
      .catch((error) => {
        toast.error("Error adding data");
        console.error("Couldn't submit data", error);
      });

    /**
     * For Scope 2 market based
     */
    if (selectedScope === "Scope 2" && marketBased) {
      request(
        `${import.meta.env.VITE_API_BASE_URL}/businessUnitsActivities`,
        "POST",
        marketBasedPayload
      )
        .then((response) => {
          if (!response.ok) {
            throw new Error();
          }
          toast.success("Data submitted successfully");
          resetForm();
        })
        .then(() => {
          fetchUserBusinessUnitsActivities();
        })
        .catch((error) => {
          toast.error("Error adding data");
          console.error("Couldn't submit data", error);
        });
    }
  };

  const handleUpdateData = async () => {
    if (
      !selectedScope ||
      !selectedLevel ||
      !scopeCategoryValue ||
      !businessUnitValue ||
      (fuelTypes.length > 0 && !fuelTypeValue) ||
      (fuelNames.length > 0 && !fuelNameValue) ||
      (level4Options.length > 0 && !level4Value) ||
      (level5Options.length > 0 && !level5Value) ||
      !unitOfMeasurementValue ||
      !quantityValue
    ) {
      toast.warn("Please fill all fields");
      return;
    }

    /**
     * For Scope 2 market based
     */
    if (marketBased) {
      if (!emissionFactor || !quantityPurchased || !unitOfEmissionFactor) {
        toast.warn("Please fill all fields");
        return;
      }
    }

    let payload, ghgconversions, marketBasedPayload;

    if (
      selectedLevel === "Electricity" ||
      selectedLevel === "Electricity TandD" ||
      selectedLevel === "WTT- electricity (generation)" ||
      selectedLevel === "WTT- electricity (TandD)" ||
      selectedLevel === "WTT- electricity" ||
      selectedLevel === "Water supply" ||
      selectedLevel === "Water treatment" ||
      selectedLevel === "Managed assets- electricity" ||
      selectedLevel === "WTT- electricity (T&D)" ||
      selectedLevel === "Electricity T&D"
    ) {
      //  fetching companies data and filtering country from that based on business unit is selected

      payload = {
        unitOfMeasurement: unitOfMeasurementValue,
        businessUnitId: businessUnitValue,
        quantity: quantityValue,
        level1Category: scopeCategoryValue,
        scope: selectedScope,
        level1: selectedLevel,
        level2: fuelTypeValue || null,
        level3: null,
        level4: null,
        level5: null,
      };

      // for Water supply and Water treatment we do not have to fetch country and region based on businessunit
      if (
        selectedLevel !== "Water supply" &&
        selectedLevel !== "Water treatment"
      ) {
        // find country and region and then calculate ghgconversions and then update payload
        const { country, region } =
          await fetchCompanyDataAndFilterCountryAndRegion();
        // payload.level2 = "Electricity generated";
        payload.level3 = country;
        payload.level4 = region;
        if (selectedLevel !== "WTT- electricity") {
          payload.level2 = filterLevel2(payload);
        }
      } else {
        // level 4 and 5 are null for "Water supply" and "Water treatment"
        payload.level2 = selectedLevel;
        payload.level3 = selectedLevel;
      }
      ghgconversions = filterConversionGHGForElectricity(payload);
      payload = { ...payload, ...ghgconversions };
      // console.table(payload);
      // return;
    } else if (
      selectedLevel === "Heat and steam" ||
      selectedLevel === "Electricity TandD for delivery Evs" ||
      selectedLevel === "District heat and steam TandD" ||
      selectedLevel === "WTT- heat and steam" ||
      selectedLevel === "WTT- district heat and steam distribution" ||
      selectedLevel === "Hotel stay"
      // || selectedLevel === "Business travel- air"
      // || selectedLevel === "WTT- business travel- air"
    ) {
      payload = {
        unitOfMeasurement: unitOfMeasurementValue,
        businessUnitId: businessUnitValue,
        quantity: quantityValue,
        level1Category: scopeCategoryValue,
        scope: selectedScope,
        level1: selectedLevel,
        level2: null, // filter out
        level3: fuelNameValue || null, // from form / not available
        level4: level4Value || null, // from form / not available
        level5: null, // filter out
      };
      // find level2 and level5 and then calculate ghgconversions and then update payload
      payload.level2 = filterFuelTypes()[0];

      if (selectedLevel === "WTT- district heat and steam distribution") {
        payload.level3 = ((payload) => {
          let level3 = [];
          activities.forEach((item) => {
            if (
              item.scope === payload.scope &&
              item.level1 === payload.level1 &&
              item.level2 === payload.level2 &&
              item.level3
            ) {
              level3.push(item.level3);
            }
          });
          level3 = [...new Set(level3)];
          return level3;
        })(payload)[0];
      }

      if (
        selectedLevel !== "District heat and steam TandD" ||
        selectedLevel !== "WTT- heat and steam" ||
        selectedLevel !== "WTT- district heat and steam distribution" ||
        selectedLevel !== "Hotel stay" ||
        selectedLevel !== "Business travel- air" ||
        selectedLevel !== "WTT- business travel- air"
      ) {
        payload.level5 = filterLevel5BasedOnScopeAndLevel1()[0];
      }
      // "filterConversionGHGFor____" this function can be named better
      ghgconversions = filterConversionGHGFor____(payload);
      payload = { ...payload, ...ghgconversions };
      // console.table(payload);
      // return;
    } else if (
      selectedLevel === "Passenger Evs" ||
      selectedLevel === "Delivery Evs"
    ) {
      payload = {
        unitOfMeasurement: unitOfMeasurementValue,
        businessUnitId: businessUnitValue,
        quantity: quantityValue,
        level1Category: scopeCategoryValue,
        level1: selectedLevel,
        level2: fuelTypeValue || "Vans", // We only have 1 option for "Delivery Evs" so hard coding here
        level3: fuelNameValue,
        scope: selectedScope,
        level4: level4Value || null,
        level5: level5Value || "Battery Electric Vehicle", // We only have 1 option for "Delivery Evs" so hard coding here
      };

      /** TODO : "activities" table column values should be corrected.
       * "level5" data should be in level4. And level5 should be null.
       */
      payload.level4 = payload.level5;
      payload.level5 = null;

      /**
       * Formula:
       * Distance travelled in km/miles (quantityValue)
       *  x Electricity consumption per km/miles (fetch from electricVehicle table)
       *  x Electricity emission factor of the country/region
       *  (fetch country/region from businessUnits table based on businessUnitValue
       *   after that filter emission factors from activities
       *   based on Electricity and country/region)
       *
       */
      const electricVehicle = await fetchElectricVehicle(payload);
      let electricityConsumptionPerUnit =
        electricVehicle.electricityConsumptionPerUnit;

      const { country, region } =
        await fetchCompanyDataAndFilterCountryAndRegion();

      const { CO2e, CO2e_of_CO2, CO2e_of_CH4, CO2e_of_N2O } =
        filterElectricityEmissionsBasedOnContryAndRegion(country, region);

      payload.CO2e = !CO2e ? null : CO2e * electricityConsumptionPerUnit;
      payload.CO2e_of_CO2 = !CO2e_of_CO2
        ? null
        : CO2e_of_CO2 * electricityConsumptionPerUnit;
      payload.CO2e_of_CH4 = !CO2e_of_CH4
        ? null
        : CO2e_of_CH4 * electricityConsumptionPerUnit;
      payload.CO2e_of_N2O = !CO2e_of_N2O
        ? null
        : CO2e_of_N2O * electricityConsumptionPerUnit;
    } else {
      payload = {
        unitOfMeasurement: unitOfMeasurementValue,
        businessUnitId: businessUnitValue,
        quantity: quantityValue,
        level1Category: scopeCategoryValue,
        level1: selectedLevel,
        level2: fuelTypeValue,
        level3: fuelNameValue,
        scope: selectedScope,
        level4: level4Value || "",
        level5: level5Value || "",
        // ...ghgconversions,
      };

      if (
        selectedLevel === "Business travel- air" ||
        selectedLevel === "WTT- business travel- air"
      ) {
        ghgconversions =
          filterConversionGHGForBusinessTravelAirOrWTTBusinessTravelAir(
            payload
          );
      } else {
        ghgconversions = filterConversionGHG();
      }

      payload = { ...payload, ...ghgconversions };
    }

    // Multiplying emissionFactors by quantity/distance
    payload.CO2e = payload.CO2e * payload.quantity;
    payload.CO2e_of_CH4 = payload.CO2e_of_CH4 * payload.quantity;
    payload.CO2e_of_CO2 = payload.CO2e_of_CO2 * payload.quantity;
    payload.CO2e_of_N2O = payload.CO2e_of_N2O * payload.quantity;

    /**
     * For Scope 2 market based
     */
    if (selectedScope === "Scope 2") {
      // explicitly setting market based here
      payload.level5 = "locationBased";
    }

    if (selectedScope === "Scope 2" && marketBased) {
      marketBasedPayload = { ...payload };
      marketBasedPayload.level5 = "marketBased";
      marketBasedPayload.quantity = quantityPurchased;
      marketBasedPayload.CO2e = Number(emissionFactor);
      marketBasedPayload.unitOfMeasurement = unitOfEmissionFactor;
      marketBasedPayload.CO2e_of_CO2 = undefined;
      marketBasedPayload.CO2e_of_CH4 = undefined;
      marketBasedPayload.CO2e_of_N2O = undefined;
    }

    // console.table(payload);
    // console.table(marketBasedPayload);
    // return;
    request(
      `${import.meta.env.VITE_API_BASE_URL}/businessUnitsActivities/${id}`,
      "PUT",
      payload
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error();
        }
        // Note : This if block is for omptimization purpose below i am fetching userBusinessUnitsActivities again
        if (!marketBased) {
          toast.success("Data submitted successfully");
          resetForm();
        }
      })
      .then(() => {
        if (!marketBased) {
          fetchUserBusinessUnitsActivities();
        }
      })
      .catch((error) => {
        toast.error("Error adding data");
        console.error("Couldn't submit data", error);
      });

    /**
     * For Scope 2 market based
     */
    if (selectedScope === "Scope 2" && marketBased) {
      request(
        `${import.meta.env.VITE_API_BASE_URL}/businessUnitsActivities/${id}`,
        "PUT",
        marketBasedPayload
      )
        .then((response) => {
          if (!response.ok) {
            throw new Error();
          }
          toast.success("Data updated successfully");
          navigate("/activities");
        })
        .then(() => {
          fetchUserBusinessUnitsActivities();
        })
        .catch((error) => {
          toast.error("Error updating data");
          console.log(error);
        });
    }
  };

  const handleCancel = () => {
    resetForm();
    navigate("/activities");
  };

  const filterLevel4Options = () => {
    let level4Options = [];
    activities?.forEach((item) => {
      if (
        item.scope === selectedScope &&
        item.level1 === selectedLevel &&
        item.level2 === fuelTypeValue &&
        item.level3 === fuelNameValue &&
        item.level4 !== "null" &&
        item.level4
      ) {
        level4Options.push(item.level4);
      }
    });
    level4Options = [...new Set(level4Options)];
    return level4Options;
  };

  const filterLevel5Options = () => {
    let level5 = [];
    activities?.forEach((item) => {
      if (
        item.scope === selectedScope &&
        item.level1 === selectedLevel &&
        item.level2 === fuelTypeValue &&
        item.level3 === fuelNameValue &&
        item.level5 !== "null" &&
        item.level5
      ) {
        level5.push(item.level5);
      }
    });
    level5 = [...new Set(level5)];
    return level5;
  };

  const isFuelNamesAvaialble = () => {
    // let fuelNames = [];
    for (let i = 0; i < activities.length; i++) {
      const item = activities[i];
      if (
        item.scope === selectedScope &&
        item.level1 === selectedLevel &&
        // item.level2 &&
        // item.level2 !== "null"
        item.level3 &&
        item.level3 !== "null"
      ) {
        // fuelNames.push(item.level3);
        return true;
      }
    }
    // fuelNames = [...new Set(fuelNames)];
    // return fuelNames.length > 0 ? true : false;
    return false;
  };

  const isLevel4Available = () => {
    for (let i = 0; i < activities.length; i++) {
      const item = activities[i];
      if (
        item.scope === selectedScope &&
        item.level1 === selectedLevel &&
        item.level4 &&
        item.level4 !== "null"
      ) {
        return true;
      }
    }

    return false;
  };

  const isLevel5Available = () => {
    for (let i = 0; i < activities.length; i++) {
      const item = activities[i];
      if (
        item.scope === selectedScope &&
        item.level1 === selectedLevel &&
        item.level5 &&
        item.level5 !== "null"
      ) {
        return true;
      }
    }
    return false;
  };

  const filterUnitOfMeasurementsBasedOnScopeAndLevel1 = () => {
    let unitsOfMeasurement = [];
    activities?.forEach((item) => {
      if (item.scope === selectedScope && item.level1 === selectedLevel) {
        unitsOfMeasurement.push(item.unitOfMeasurement);
      }
    });
    unitsOfMeasurement = [...new Set(unitsOfMeasurement)];
    return unitsOfMeasurement;
  };

  const filterLevel3BasedOnScopeAndLevel1 = () => {
    let level3 = [];
    activities?.forEach((item) => {
      if (
        item.scope === selectedScope &&
        // here selectedLevel === Electricity
        item.level1 === selectedLevel
      ) {
        level3.push(item.level3);
      }
    });
    level3 = [...new Set(level3)];
    return level3;
  };

  const filterAirportsName = (airports) => {
    const airportsName = airports.map((item) => {
      return item.airports;
    });
    return airportsName;
  };

  const getLatAndLonOfGivenAirport = (givenAirportName) => {
    const filteredAirport = airports.filter(
      (airport) => airport.airports === givenAirportName
    )[0];

    return {
      latitude: filteredAirport.latitude,
      longitude: filteredAirport.longitude,
    };
  };

  const filterElectricityEmissionsBasedOnContryAndRegion = (
    country,
    region
  ) => {
    const condition = (item) => {
      return (
        item.scope === "Scope 2" &&
        item.level1 === "Electricity" &&
        item.level2 === "Electricity generated" &&
        item.level3 === country &&
        item.level4 === region &&
        // item.level5 === null &&
        item.unitOfMeasurement === "kWh"
      );
    };
    return filterGHGEmissions(condition);
  };

  const possibleFuelTypeLabels = {
    "Refrigerant and other": "Refrigerant and other gas category",
    "Passenger vehicles": "Passenger Vehicle Category",
    "Delivery vehicles": "Delivery Vehicle Category",
    "Passenger Evs": "Passenger EV Category",
    "Delivery Evs": "Delivery Vehicle Category",
    "WTT- fuels": "Fuel Type",
    "WTT- bioenergy": "Bioenergy Type",
    "Electricity TandD for passenger EVs": "Passenger EV Category",
    "Business travel- land": "Passenger Vehicle Category",
    "Material use": "Material Type",
    "Waste disposal": "Waste Type",
    "Business travel- sea": "Boat / Ship Type",
    "WTT- business travel- sea": "Boat / Ship Type",
    "WTT- pass vehs and travel- land": "Passenger Vehicle Category",
    "Freighting goods": "Freighting medium",
    "WTT- delivery vehs and freight": "Freighting medium",
    "Managed assets- vehicles": "Vehicle Category",
    "Business travel- air": "Airport From",
    "WTT- business travel- air": "Airport From",
  };

  const possibleFuelNameLabels = {
    Bioenergy: "Bioenergy Fuel Name",
    "Refrigerant and other": "Refrigerant and other gas name",
    "Passenger vehicles": "Passenger Vehicle Segment / Size",
    "Delivery vehicles": "Delivery Vehicle Class / Category",
    "Passenger Evs": "Passenger EV Segment / Size",
    "Delivery Evs": "Delivery Vehicle Segment / Size",
    "Heat and steam": "Onsite / Offsite",
    "WTT- fuels": "Fuel Name",
    "WTT- bioenergy": "Bioenergy Fuel Name",
    "Electricity TandD for passenger EVs": "Passenger EV Segment / Size",
    "Business travel- land": "Passenger Vehicle Segment / Size",
    "WTT- heat and steam": "Onsite / Offsite",
    "Material use": "Material Name",
    "Waste disposal": "Waste Name",
    "Business travel- sea": "Passenger Type",
    "WTT- business travel- sea": "Passenger Type",
    "WTT- pass vehs and travel- land": "Passenger Vehicle Segment / Size",
    "Freighting goods": "Class / Type / Haul",
    "WTT- delivery vehs and freight": "Class / Type / Haul",
    "Hotel stay": "Name of Country",
    "Managed assets- vehicles": "Vehicle Segment / Size",
    "Business travel- air": "Airport To",
    "WTT- business travel- air": "Airport To",
  };

  useEffect(() => {
    fetchUserBusinessUnits().then((businessUnits) => {
      if (businessUnits.length === 0) {
        toast.info("Please add business unit first");
        return;
      }
      setBusinessUnits(businessUnits);
    });
  }, []);

  useEffect(() => {
    // if (!id) {
    setScopeCategoryValue("");
    setShowFuelNamesField(false);
    setShowLevel4Field(false);
    setShowLevel5Field(false);
    setUnitOfMeasurementValue("");
    setUnitOfMeasurements([]);
    // }
    // initialialy blocking not to filter if level1Categories or activities or businessUnits is empty
    if (
      level1Categories !== null &&
      activities !== null &&
      businessUnits.length > 0
    ) {
      const scopeCategories = filterScopeCategories();
      setScopeCategories(scopeCategories);
      // show fields that are available
      if (
        selectedLevel !== "Electricity" &&
        selectedLevel !== "Electricity TandD" &&
        selectedLevel !== "WTT- electricity (generation)" &&
        selectedLevel !== "WTT- electricity (TandD)" &&
        selectedLevel !== "WTT- electricity" &&
        selectedLevel !== "Water supply" &&
        selectedLevel !== "Water treatment" &&
        selectedLevel !== "WTT- district heat and steam distribution" &&
        selectedLevel !== "Managed assets- electricity" &&
        selectedLevel !== "WTT- electricity (T&D)" &&
        selectedLevel !== "Electricity T&D"
      ) {
        // This is only to show inputs. There options will be filtered when its previous value input is selected
        setShowFuelNamesField(isFuelNamesAvaialble());
        if (
          selectedLevel !== "Delivery Evs" &&
          selectedLevel !== "Heat and steam" &&
          selectedLevel !== "Electricity TandD for delivery Evs" &&
          selectedLevel !== "WTT- heat and steam" &&
          selectedLevel !== "Hotel stay"
        ) {
          if (
            selectedLevel !== "Business travel- air" &&
            selectedLevel !== "WTT- business travel- air"
          ) {
            setShowLevel4Field(isLevel4Available());
          }
          setShowLevel5Field(
            selectedLevel === "Business travel- air" ||
              selectedLevel === "WTT- business travel- air"
              ? true
              : isLevel5Available()
          );
        }
      }

      if (
        selectedLevel === "Electricity" ||
        selectedLevel === "Electricity TandD" ||
        selectedLevel === "WTT- electricity (generation)" ||
        selectedLevel === "WTT- electricity (TandD)" ||
        selectedLevel === "WTT- electricity" ||
        selectedLevel === "Water supply" ||
        selectedLevel === "Water treatment" ||
        selectedLevel === "District heat and steam TandD" ||
        selectedLevel === "WTT- district heat and steam distribution" ||
        selectedLevel === "Managed assets- electricity" ||
        selectedLevel === "WTT- electricity (T&D)" ||
        selectedLevel === "Electricity T&D" ||
        selectedLevel === "Delivery Evs" ||
        selectedLevel === "Heat and steam" ||
        selectedLevel === "Electricity TandD for delivery Evs" ||
        selectedLevel === "WTT- heat and steam" ||
        selectedLevel === "Hotel stay" ||
        selectedLevel === "Business travel- air" ||
        selectedLevel === "WTT- business travel- air"
      ) {
        const unitOfMeasurements =
          filterUnitOfMeasurementsBasedOnScopeAndLevel1();
        setUnitOfMeasurements(unitOfMeasurements);
      }

      if (
        selectedLevel === "Delivery Evs" ||
        selectedLevel === "Heat and steam" ||
        selectedLevel === "Electricity TandD for delivery Evs" ||
        selectedLevel === "WTT- heat and steam" ||
        selectedLevel === "Hotel stay" ||
        selectedLevel === "Business travel- air" ||
        selectedLevel === "WTT- business travel- air"
      ) {
        if (
          selectedLevel !== "Business travel- air" &&
          selectedLevel !== "WTT- business travel- air"
        ) {
          const level3 = filterLevel3BasedOnScopeAndLevel1();
          setFuelNames(level3);
        }

        // if (
        // selectedLevel === "Business travel- air" ||
        // selectedLevel === "WTT- business travel- air"
        // ) {
        const level4Options = (() => {
          let level4Options = [];
          activities?.forEach((item) => {
            if (
              item.scope === selectedScope &&
              item.level1 === selectedLevel &&
              item.level4 !== "null" &&
              item.level4
            ) {
              level4Options.push(item.level4);
            }
          });
          level4Options = [...new Set(level4Options)];
          return level4Options;
        })();
        setLevel4Options(level4Options);
        // }
      }
    }
  }, [selectedLevel, /*level1Categories, activities,*/ businessUnits]);

  /**
   * level2
   */
  useEffect(() => {
    // if (
    //   !id &&
    //   selectedLevel !== "Business travel- air" &&
    //   selectedLevel !== "WTT- business travel- air"
    // ) {
    setFuelTypes([]);
    setFuelTypeValue("");
    setUnitOfMeasurementValue("");
    setFuelNameValue("");
    // }

    if (
      scopeCategoryValue !== "" &&
      selectedLevel !== "Electricity" &&
      selectedLevel !== "Electricity TandD" &&
      selectedLevel !== "WTT- electricity (generation)" &&
      selectedLevel !== "WTT- electricity (TandD)" &&
      selectedLevel !== "Water supply" &&
      selectedLevel !== "Water treatment" &&
      selectedLevel !== "Delivery Evs" &&
      selectedLevel !== "Heat and steam" &&
      selectedLevel !== "District heat and steam TandD" &&
      selectedLevel !== "Electricity TandD for delivery Evs" &&
      selectedLevel !== "WTT- heat and steam" &&
      selectedLevel !== "WTT- district heat and steam distribution" &&
      selectedLevel !== "Hotel stay" &&
      selectedLevel !== "Managed assets- electricity" &&
      selectedLevel !== "Business travel- air" &&
      selectedLevel !== "WTT- business travel- air" &&
      selectedLevel !== "WTT- electricity (T&D)" &&
      selectedLevel !== "Electricity T&D"
    ) {
      const fuelTypes = filterFuelTypes();
      setFuelTypes(fuelTypes);
    }
  }, [scopeCategoryValue]);

  /**
   * level3
   */
  useEffect(() => {
    // if (!id) {
    setFuelNameValue("");
    setFuelNames([]);
    setUnitOfMeasurementValue("");
    setUnitOfMeasurements([]);
    // }

    if (
      fuelTypeValue !== "" &&
      selectedLevel !== "Business travel- air" &&
      selectedLevel !== "WTT- business travel- air"
    ) {
      const unitsOfMeasurement = filterUnitOfMeasurements();
      setUnitOfMeasurements(unitsOfMeasurement);
      if (
        selectedLevel !== "Electricity" &&
        selectedLevel !== "Electricity TandD" &&
        selectedLevel !== "WTT- electricity (generation)" &&
        selectedLevel !== "WTT- electricity (TandD)" &&
        selectedLevel !== "WTT- electricity" &&
        selectedLevel !== "Water supply" &&
        selectedLevel !== "Water treatment"
      ) {
        const fuelNames = filterFuelNames();
        setFuelNames(fuelNames);
      }
    }

    if (
      selectedLevel === "Business travel- air" ||
      selectedLevel === "WTT- business travel- air"
    ) {
      const airportsName = filterAirportsName(airports);
      const airportsNameExceptSelectedInLevel2 = airportsName.filter(
        (airportName) => {
          return airportName !== fuelTypeValue;
        }
      );
      setFuelNames(airportsNameExceptSelectedInLevel2);
    }
  }, [fuelTypeValue]);

  /**
   * level4 & level5
   */
  useEffect(() => {
    // if (!id) {
    if (
      selectedLevel !== "Business travel- air" &&
      selectedLevel !== "WTT- business travel- air"
    ) {
      setLevel4Options([]);
    }
    setLevel4Value("");
    setLevel5Value("");
    setLevel5Options([]);
    // }

    if (
      fuelNameValue !== "" &&
      selectedLevel !== "Business travel- air" &&
      selectedLevel !== "WTT- business travel- air"
    ) {
      const level4Options = filterLevel4Options();
      setLevel4Options(level4Options);
      const level5Options = filterLevel5Options();
      setLevel5Options(level5Options);
    }

    if (
      selectedLevel === "Business travel- air" ||
      selectedLevel === "WTT- business travel- air"
    ) {
      // Filtering level5 options
      let level5 = [];
      activities?.forEach((item) => {
        if (
          item.scope === selectedScope &&
          item.level1 === selectedLevel &&
          /**
           * For "Business travel- air" & "WTT- business travel- air"
           * there will be no airport value
           * for level2 and level3 in activitydata table.
           * We are fetching from airport table and assigning them.
           */
          // item.level2 === fuelTypeValue &&
          // item.level3 === fuelNameValue &&
          item.level4 !== "null" &&
          item.level4
        ) {
          level5.push(item.level4);
        }
      });
      level5 = [...new Set(level5)];
      setLevel5Options(level5);
      if (fuelNameValue) {
        // Calculating distance between airports
        const { latitude: lat1, longitude: lon1 } =
          getLatAndLonOfGivenAirport(fuelTypeValue);
        const { latitude: lat2, longitude: lon2 } =
          getLatAndLonOfGivenAirport(fuelNameValue);
        const EARTH_RADIUS_IN_MILES = 3963.19;
        let distanceInMiles =
          EARTH_RADIUS_IN_MILES *
          Math.acos(
            Math.sin(lat1) * Math.sin(lat2) +
              Math.cos(lat1) * Math.cos(lat2) * Math.cos(lon2 - lon1)
          );
        distanceInMiles = Number(distanceInMiles.toFixed(2));

        setQuantityValue(distanceInMiles);

        // Determining level4
        if (distanceInMiles < 300) {
          setLevel4Value("Air Travel - Short Haul");
        } else if (distanceInMiles >= 300 && distanceInMiles < 2300) {
          setLevel4Value("Air Travel - Medium Haul");
        } else if (distanceInMiles >= 2300) {
          setLevel4Value("Air Travel - Long Haul");
        }
      }
    }
  }, [fuelNameValue]);

  /**
   * Business travel- air & "WTT- business travel- air"
   */
  useEffect(() => {
    if (
      selectedLevel === "Business travel- air" ||
      selectedLevel === "WTT- business travel- air"
    ) {
      fetchAirports()
        .then((airports) => {
          setAirports(airports);
          return filterAirportsName(airports);
        })
        .then((airportsName) => setFuelTypes(airportsName))
        .catch((error) => console.log(error));
    }
  }, []);

  /**
   * "Business travel- air" & "WTT- business travel- air"
   */
  useEffect(() => {
    if (
      unitOfMeasurementValue &&
      (selectedLevel === "Business travel- air" ||
        selectedLevel === "WTT- business travel- air")
    ) {
      // If selected in km then update it otherwise it will default in miles
      if (unitOfMeasurementValue === "passenger.km") {
        setQuantityValue(Number((quantityValue * 1.609344).toFixed(2)));
      }
    }
  }, [unitOfMeasurementValue]);

  useEffect(() => {
    if (id) {
      fetchActivityById()
        .then((activity) => {
          console.group(activity);
          setScopeCategoryValue(activity.level1Category);
          setBusinessUnitValue(activity.businessUnit.id);
          if (selectedLevel !== "District heat and steam TandD") {
            setFuelTypeValue(activity.level2);
          }
          setFuelNameValue(activity.level3);
          setUnitOfMeasurementValue(activity.unitOfMeasurement);
          setQuantityValue(activity.quantity);
          setLevel4Value(activity.level4 || "");
          setLevel5Value(activity.level5 || "");
        })
        .catch((error) => {
          console.error("Failed to get company data", error);
        });
    }
  }, [id]);

  return (
    <form onSubmit={handleFormSubmit} className="flex flex-col gap-y-3">
      <h3 className="m-0 font-extrabold text-2xl">Insert activity data here</h3>
      <div className="grid lg:grid-cols-2 gap-4">
        {/* TODO: Location Based bar should be in all Scope 2 levels or only in Scope 2(Electricity) */}
        {/* {selectedLevel === "Electricity" && (  */}
        {selectedScope === "Scope 2" && (
          <h4 className="bg-gray-200 col-span-full p-2 rounded">
            Location based
          </h4>
        )}

        {/* Scope Category */}
        <FormControl>
          <Label>Scope Category</Label>
          <Select
            value={scopeCategoryValue}
            onChange={(e) => setScopeCategoryValue(e.target.value)}
          >
            <option value="">Select Option</option>
            {scopeCategories.map((option, index) => {
              return (
                <option key={index} value={option}>
                  {option}
                </option>
              );
            })}
          </Select>
        </FormControl>

        {/* Business Unit */}
        <FormControl>
          <Label>Business Unit</Label>
          <Select
            value={businessUnitValue}
            onChange={(e) => setBusinessUnitValue(e.target.value)}
          >
            <option value="">Select Option</option>
            {businessUnits &&
              businessUnits.map((businessUnit, index) => {
                return (
                  <option key={index} value={businessUnit.id}>
                    {businessUnit.title}
                  </option>
                );
              })}
          </Select>
        </FormControl>

        {/* Fuel Type (level2) */}
        {
          /* Not operator here ==>*/ ![
            // "WTT- electricity",
            "Electricity",
            "Electricity TandD",
            "WTT- electricity (generation)",
            "WTT- electricity (TandD)",
            "Water supply",
            "Water treatment",
            "Delivery Evs",
            "Heat and steam",
            "District heat and steam TandD",
            "Electricity TandD for delivery Evs",
            "WTT- heat and steam",
            "WTT- district heat and steam distribution",
            "Hotel stay",
            "Managed assets- electricity",
            // "Business travel- air",
            // "WTT- business travel- air",
            "WTT- electricity (T&D)",
            "Electricity T&D",
          ].includes(selectedLevel) && (
            <FormControl>
              <Label>
                {(selectedLevel && possibleFuelTypeLabels[selectedLevel]) ||
                  `${selectedLevel} Type`}
              </Label>
              <Select
                value={fuelTypeValue}
                onChange={(e) => setFuelTypeValue(e.target.value)}
              >
                <option value="">Select Option</option>
                {fuelTypes.map((option, index) => {
                  return (
                    <option key={index} value={option}>
                      {option}
                    </option>
                  );
                })}
              </Select>
            </FormControl>
          )
        }

        {/* Fuel Name (level3) */}
        {showFuelNamesField && (
          <FormControl>
            <Label>
              {(selectedLevel && possibleFuelNameLabels[selectedLevel]) ||
                `${selectedLevel} Name`}
            </Label>
            <Select
              value={fuelNameValue}
              onChange={(e) => setFuelNameValue(e.target.value)}
            >
              <option value="">Select Option</option>
              {fuelNames.map((option, index) => {
                return (
                  <option key={index} value={option}>
                    {option}
                  </option>
                );
              })}
            </Select>
          </FormControl>
        )}

        {/* level4 */}
        {showLevel4Field && (
          <FormControl>
            <Label>
              {selectedLevel
                ? selectedLevel === "Freighting goods"
                  ? "Capacity"
                  : selectedLevel === "WTT- delivery vehs and freight"
                    ? "Capacity"
                    : // : selectedLevel === "Business travel- air"
                      // ? "Class"
                      // selectedLevel === "WTT- business travel- air"
                      // ? "Class"
                      "Level 4"
                : "Level 4"}
            </Label>
            <Select
              onChange={(e) => setLevel4Value(e.target.value)}
              value={level4Value}
            >
              <option value="">Select Option</option>
              {level4Options.map((option, index) => {
                return (
                  <option key={index} value={option}>
                    {option}
                  </option>
                );
              })}
            </Select>
          </FormControl>
        )}

        {/* level5 */}
        {showLevel5Field && (
          <FormControl>
            <Label>
              {selectedLevel && selectedLevel === "Passenger vehicles"
                ? "Fuel Type"
                : selectedLevel === "Delivery vehicles"
                  ? "Fuel Type / Laden Percent"
                  : selectedLevel === "Passenger Evs"
                    ? "EV Type"
                    : selectedLevel === "Delivery Evs"
                      ? "Fuel Type"
                      : selectedLevel === "Electricity TandD for passenger EVs"
                        ? "EV Type"
                        : selectedLevel === "Business travel- land"
                          ? "Fuel Type"
                          : selectedLevel === "Material use"
                            ? "Source of material"
                            : selectedLevel === "Waste disposal"
                              ? "Waste Treatment Type"
                              : selectedLevel ===
                                  "WTT- pass vehs and travel- land"
                                ? "Fuel Type"
                                : selectedLevel === "Freighting goods"
                                  ? "Fuel / Laden"
                                  : selectedLevel ===
                                      "WTT- delivery vehs and freight"
                                    ? "Fuel / Laden"
                                    : selectedLevel ===
                                        "Managed assets- vehicles"
                                      ? "Fuel Type / Laden"
                                      : selectedLevel === "Business travel- air"
                                        ? "Class"
                                        : selectedLevel ===
                                            "WTT- business travel- air"
                                          ? "Class"
                                          : "Level 5"}
            </Label>
            <Select
              value={level5Value}
              onChange={(e) => setLevel5Value(e.target.value)}
            >
              <option value="">Select Option</option>
              {level5Options.map((option, index) => {
                return (
                  <option key={index} value={option}>
                    {option}
                  </option>
                );
              })}
            </Select>
          </FormControl>
        )}

        {/*  Unit of Measurement  */}
        <FormControl>
          <Label>Unit of measurement</Label>
          <Select
            value={unitOfMeasurementValue}
            onChange={(e) => setUnitOfMeasurementValue(e.target.value)}
          >
            <option value="">Select Option</option>
            {unitOfMeasurements.map((option, index) => {
              return (
                <option key={index} value={option}>
                  {option}
                </option>
              );
            })}
          </Select>
        </FormControl>

        {/* Quantity */}
        {selectedLevel !== "Business travel- air" &&
          selectedLevel !== "WTT- business travel- air" && (
            <FormControl>
              <Label>
                {selectedLevel
                  ? selectedLevel === "Passenger vehicles" ||
                    selectedLevel === "Delivery vehicles" ||
                    selectedLevel === "Passenger Evs" ||
                    selectedLevel === "Delivery Evs" ||
                    selectedLevel === "Electricity TandD for passenger EVs" ||
                    selectedLevel === "Business travel- land" ||
                    selectedLevel === "Business travel- sea" ||
                    selectedLevel === "WTT- business travel- sea" ||
                    selectedLevel === "WTT- pass vehs and travel- land" ||
                    selectedLevel === "Managed assets- vehicles" ||
                    selectedLevel === "Business travel- air" ||
                    selectedLevel === "WTT- business travel- air"
                    ? "Distance Travelled"
                    : selectedLevel === "Hotel stay"
                      ? "Number of Nights"
                      : "Quantity"
                  : "Quantity"}
              </Label>
              <Input
                type="number"
                value={quantityValue}
                onChange={(e) => setQuantityValue(e.target.value)}
                placeholder="Enter Quantity"
              />
            </FormControl>
          )}
      </div>

      {/* ------------------------------------------------- */}

      {/* For Scope 2 market based */}
      {selectedScope === "Scope 2" && (
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
      )}

      {/* ------------------------------------------------- */}

      {/* Market based form */}
      {marketBased && (
        <div className="grid lg:grid-cols-2 gap-4">
          <h4 className="bg-gray-200 col-span-full p-2 rounded">
            Market based
          </h4>
          <FormControl>
            <Label>Quantity Purchased</Label>
            <Input
              type="number"
              value={quantityPurchased}
              onChange={(event) => {
                setQuantityPurchased(event.target.value);
              }}
              placeholder="Enter Purchased Quantity"
            />
          </FormControl>
          <FormControl>
            <Label>Emission Factor</Label>
            <Input
              type="number"
              value={emissionFactor}
              onChange={(event) => {
                setEmissionFactor(event.target.value);
              }}
              placeholder="Enter Quantity"
            />
          </FormControl>
          <FormControl>
            <Label>Unit of Emission Factor</Label>
            <Select
              value={unitOfEmissionFactor}
              onChange={(e) => setUnitOfEmissionFactor(e.target.value)}
            >
              <option value="">Select Option</option>
              <option value="kgco2e/kwh">kgco2e / kwh</option>
            </Select>
          </FormControl>
        </div>
      )}

      {/* ------------------------------------------------- */}

      {/* Add, Edit, Cancel Buttons */}
      {id ? (
        <div className="flex flex-col gap-4 md:flex-row">
          <Button
            type="button"
            className="flex-1 text-white bg-tc-green hover:bg-opacity-90"
            onClick={handleCancel}
          >
            Cancel
          </Button>
          <Button
            type="button"
            className="flex-1 text-white bg-tc-green hover:bg-opacity-90"
            onClick={handleUpdateData}
          >
            Edit
          </Button>
        </div>
      ) : (
        <Button
          type="submit"
          className="text-white bg-tc-green hover:bg-opacity-90"
        >
          Add
        </Button>
      )}
    </form>
  );
};

export default ActivitesForm;
