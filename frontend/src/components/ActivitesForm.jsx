import { useState, useEffect } from "react";
import { Slide, ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useParams, useNavigate, Form } from "react-router-dom";
import { getBearerToken } from "../utils/auth.js";
import { request } from "../utils/request.js";
import Button from "./ui/Button.jsx";
import FormControl from "./FormControl.jsx";
import Input from "./ui/Input.jsx";
import Label from "./ui/Label.jsx";
import Select from "./ui/Select.jsx";

const ActivitesForm = ({
  selectedScope,
  selectedLevel,
  setSelectedScope,
  setSelectedLevel,
  userId,
  setCompanyData,
}) => {
  const [scopeCategoryValue, setScopeCategoryValue] = useState("");
  const [fuelTypeValue, setFuelTypeValue] = useState(""); // level2
  const [businessUnitValue, setBusinessUnitValue] = useState("");
  const [unitOfMeasurementValue, setUnitOfMeasurementValue] = useState("");
  const [fuelNameValue, setFuelNameValue] = useState(""); // level3
  const [quantityValue, setQuantityValue] = useState("");
  const [level4Value, setLevel4Value] = useState("");
  const [level5Value, setLevel5Value] = useState("");

  const [activitesData, setActivitesData] = useState(null);

  const [businessUnits, setBusinessUnits] = useState([]);
  const [scopeCategoriesData, setScopeCategoriesData] = useState(null);

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

  const fetchBusinessUnit = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/companies/${userId}?column=unitname`,
        {
          headers: {
            authorization: getBearerToken(),
          },
        }
      );
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      return await response.json();
    } catch (error) {
      console.error("Error fetching companies businessunits:", error);
    }
  };

  const fetchActivitesData = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/activitydata`,
        {
          headers: {
            authorization: getBearerToken(),
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      const jsonData = await response.json();

      // const uniqueFuels = [
      //   ...new Set(jsonData.companiesdatas.map((item) => item.fuel_category)),
      // ];

      // const uniqueFuelTypes = [
      //   ...new Set(jsonData.datas.map((item) => item.level2)),
      // ];

      // const uniqueFuelNames = [
      //   ...new Set(jsonData.datas.map((item) => item.level3)),
      // ];

      // const uniqueUOM = [...new Set(jsonData.datas.map((item) => item.uom))];

      // const businessUnit = [
      //   ...new Set(jsonData.companiesdatas.map((item) => item.businessunit)),
      // ];

      return jsonData;
    } catch (error) {
      console.error("Error fetching Fuel Category:", error);
    }
  };

  const fetchScopeCategoriesData = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/categories`,
        {
          headers: {
            authorization: getBearerToken(),
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      const jsonData = await response.json();
      return jsonData;
    } catch (error) {
      console.error("Error fetching categories data:", error);
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
    scopeCategoriesData?.forEach((item) => {
      if (item.type === selectedLevel) {
        level2.push(item.categy);
      }
    });
    level2 = [...new Set(level2)];
    return level2;
  };

  const filterUnitOfMeasurements = () => {
    let unitsOfMeasurement = [];
    activitesData?.datas.forEach((item) => {
      if (
        item.scope === selectedScope &&
        item.level1 === selectedLevel &&
        item.level2 === fuelTypeValue
        // &&
        // item.level3 === fuelNameValue
      ) {
        unitsOfMeasurement.push(item.uom);
      }
    });
    unitsOfMeasurement = [...new Set(unitsOfMeasurement)];
    return unitsOfMeasurement;
  };

  const filterFuelTypes = () => {
    let fuelTypes = [];
    activitesData?.datas.forEach((item) => {
      if (item.scope === selectedScope && item.level1 === selectedLevel) {
        fuelTypes.push(item.level2);
      }
    });
    fuelTypes = [...new Set(fuelTypes)];
    return fuelTypes;
  };

  const filterFuelNames = () => {
    let fuelNames = [];
    activitesData?.datas.forEach((item) => {
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

  const calculateConversionGHG = () => {
    let co2e = null;
    let co2eofco2 = null;
    let co2eofch4 = null;
    let co2eofn2o = null;

    const ghgValues = [
      "kg CO2e",
      "kg CO2e of CO2 per unit",
      "kg CO2e of CH4 per unit",
      "kg CO2e of N2O per unit",
    ];

    for (let i = 0; i < activitesData?.datas.length; i++) {
      const item = activitesData?.datas[i];

      if (
        item.scope === selectedScope &&
        item.level1 === selectedLevel &&
        item.level2 === fuelTypeValue &&
        item.level3 === fuelNameValue &&
        item.uom === unitOfMeasurementValue
      ) {
        if (item.ghg === ghgValues[0]) {
          co2e = item.ghgconversion;
        } else if (item.ghg === ghgValues[1]) {
          co2eofco2 = item.ghgconversion;
        } else if (item.ghg === ghgValues[2]) {
          co2eofch4 = item.ghgconversion;
        } else if (item.ghg === ghgValues[3]) {
          co2eofn2o = item.ghgconversion;
        }
      }

      if (co2e && co2eofco2 && co2eofch4 && co2eofn2o) {
        // If all 4 values are found not need to loop any more
        break;
      }
    }

    // Now co2e, co2eofco2, co2eofch4, and co2eofn2o contain the respective values

    return {
      co2e,
      co2eofco2,
      co2eofch4,
      co2eofn2o,
    };
  };

  const calculateConversionGHGForElectricity = (payload) => {
    let co2e = null;
    let co2eofco2 = null;
    let co2eofch4 = null;
    let co2eofn2o = null;

    const ghgValues = [
      "kg CO2e",
      "kg CO2e of CO2 per unit",
      "kg CO2e of CH4 per unit",
      "kg CO2e of N2O per unit",
    ];

    for (let i = 0; i < activitesData?.datas.length; i++) {
      const item = activitesData?.datas[i];

      if (
        item.scope === selectedScope &&
        item.level1 === selectedLevel &&
        item.level2 === payload.level2 &&
        item.level3 === payload.level3 &&
        (item.level4 === payload.level4 || item.level4 === "null") &&
        item.uom === unitOfMeasurementValue
      ) {
        if (item.ghg === ghgValues[0]) {
          co2e = item.ghgconversion;
        } else if (item.ghg === ghgValues[1]) {
          co2eofco2 = item.ghgconversion;
        } else if (item.ghg === ghgValues[2]) {
          co2eofch4 = item.ghgconversion;
        } else if (item.ghg === ghgValues[3]) {
          co2eofn2o = item.ghgconversion;
        }
      }

      if (co2e && co2eofco2 && co2eofch4 && co2eofn2o) {
        // If all 4 values are found not need to loop any more
        break;
      }
    }

    return {
      co2e,
      co2eofco2,
      co2eofch4,
      co2eofn2o,
    };
  };

  const calculateConversionGHGForDeliveryEvs = (payload) => {
    let co2e = null;
    let co2eofco2 = null;
    let co2eofch4 = null;
    let co2eofn2o = null;

    const ghgValues = [
      "kg CO2e",
      "kg CO2e of CO2 per unit",
      "kg CO2e of CH4 per unit",
      "kg CO2e of N2O per unit",
    ];

    for (let i = 0; i < activitesData?.datas.length; i++) {
      const item = activitesData?.datas[i];

      if (
        item.scope === selectedScope &&
        item.level1 === selectedLevel &&
        item.level2 === payload.level2 &&
        item.level3 === payload.level3 &&
        item.level5 === payload.level5 &&
        item.uom === unitOfMeasurementValue
      ) {
        if (item.ghg === ghgValues[0]) {
          co2e = item.ghgconversion;
        } else if (item.ghg === ghgValues[1]) {
          co2eofco2 = item.ghgconversion;
        } else if (item.ghg === ghgValues[2]) {
          co2eofch4 = item.ghgconversion;
        } else if (item.ghg === ghgValues[3]) {
          co2eofn2o = item.ghgconversion;
        }
      }

      if (co2e && co2eofco2 && co2eofch4 && co2eofn2o) {
        // If all 4 values are found not need to loop any more
        break;
      }
    }

    return {
      co2e,
      co2eofco2,
      co2eofch4,
      co2eofn2o,
    };
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

  const fetchCompanyData = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/companiesdata/${userId}`,
        {
          headers: {
            authorization: getBearerToken(),
          },
        }
      );
      if (!response.ok) {
        throw new Error(`Failed to fetch data:`);
      }
      const jsonData = await response.json();
      setCompanyData(jsonData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const fetchCompanyDataOfGivenId = async (id) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/companiesdata/activites/${id}`,
        {
          headers: {
            authorization: getBearerToken(),
          },
        }
      );
      if (!response.ok) {
        throw new Error(`Failed to fetch data:`);
      }
      const jsonData = await response.json();
      return jsonData;
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const filterLevel5BasedOnScopeAndLevel1 = () => {
    let level5 = [];
    activitesData?.datas.forEach((item) => {
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

  const fetchElectricVehicle = async () => {
    const url = `${import.meta.env.VITE_API_BASE_URL}/electricVehicles?scope=${selectedScope}&level1=${selectedLevel}&level2=${fuelTypeValue}&level3=${fuelNameValue}&uom=${unitOfMeasurementValue}&unit=kWh`;
    const electricVehicle = await request(url, "GET");
    return electricVehicle;
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
      !userId ||
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
      const fetchCompanyDataAndFilterCountryAndRegion = async () => {
        try {
          const response = await fetch(
            `${import.meta.env.VITE_API_BASE_URL}/companies/${userId}`,
            {
              headers: {
                authorization: getBearerToken(),
              },
            }
          );
          if (!response.ok) {
            throw new Error(`Failed to fetch data: ${response.statusText}`);
          }
          const jsonData = await response.json();
          let country, region;
          for (let i = 0; i < jsonData.length; i++) {
            if (jsonData[i].unitname === businessUnitValue) {
              country = jsonData[i].countries;
              region = jsonData[i].region;
              break;
            }
          }
          return { country, region };
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      };

      const filterLevel2 = (payload) => {
        for (let index = 0; index < activitesData?.datas.length; index++) {
          const item = activitesData?.datas[index];
          if (
            item.scope === selectedScope &&
            item.level1 === selectedLevel &&
            // item.level3 === payload.level3 &&
            // item.level4 === payload.level4 &&
            item.level2
          ) {
            return item.level2;
          }
        }
        // let level2 = [];
        // activitesData?.datas.forEach((item) => {
        //   if (
        //     item.scope === selectedScope &&
        //     item.level1 === selectedLevel &&
        //     item.level3 === payload.country &&
        //     item.level4 === payload.region &&
        //     item.level2
        //   ) {
        // level2.push(item.level2);
        //     return item.level2;
        //   }
        // });
        // console.log(new Set(level2));
        // return [...new Set(level2)][0];
      };

      payload = {
        ids: userId,
        uom: unitOfMeasurementValue,
        businessunit: businessUnitValue,
        quantity: quantityValue,
        fuel_category: scopeCategoryValue,
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
      ghgconversions = calculateConversionGHGForElectricity(payload);
      payload = { ...payload, ...ghgconversions };
      // console.table(payload);
      // return;
    } else if (
      selectedLevel === "Delivery Evs" ||
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
        ids: userId,
        uom: unitOfMeasurementValue,
        businessunit: businessUnitValue,
        quantity: quantityValue,
        fuel_category: scopeCategoryValue,
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
          activitesData?.datas.forEach((item) => {
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
      ghgconversions = calculateConversionGHGForDeliveryEvs(payload);
      payload = { ...payload, ...ghgconversions };
      // console.table(payload);
      // return;
    } else {
      payload = {
        ids: userId,
        uom: unitOfMeasurementValue,
        businessunit: businessUnitValue,
        quantity: quantityValue,
        fuel_category: scopeCategoryValue,
        level1: selectedLevel,
        level2: fuelTypeValue,
        level3: fuelNameValue,
        scope: selectedScope,
        level4: level4Value || null,
        level5: level5Value || null,
        // ...ghgconversions,
      };

      if (
        selectedLevel !== "Business travel- air" &&
        selectedLevel !== "WTT- business travel- air"
      ) {
        ghgconversions = calculateConversionGHG();
      } else if (
        selectedLevel === "Business travel- air" ||
        selectedLevel === "WTT- business travel- air"
      ) {
        ghgconversions =
          calculateConversionGHGForBusinessTravelAirOrWTTBusinessTravelAir(
            payload
          );
      }

      payload = { ...payload, ...ghgconversions };

      /**
       * For "Passenger Evs", "Delivery Evs"
       */
      if (
        selectedLevel === "Passenger Evs" ||
        selectedLevel === "Delivery Evs"
      ) {
        const electricVehicle = await (await fetchElectricVehicle())
          .json()
          .catch((error) => console.log(error));

        let electricityConsumptionPerUnit =
          electricVehicle.electricityConsumptionPerUnit;
        payload.co2e = payload.co2e * electricityConsumptionPerUnit;

        /** TODO : "activitydata" table column values should be corrected.
         * "level5" data should be in level4. And level5 should be null.
         */
        payload.level4 = payload.level5;
      }
    }

    /**
     * For Scope 2 market based
     */
    if (selectedScope === "Scope 2") {
      // explicitly setting marketBased here
      payload.level5 = "locationBased";
    }

    if (selectedScope === "Scope 2" && marketBased) {
      marketBasedPayload = { ...payload };
      marketBasedPayload.level5 = "marketBased";
      marketBasedPayload.quantity = quantityPurchased;
      marketBasedPayload.co2e = Number(emissionFactor);
      marketBasedPayload.uom = unitOfEmissionFactor;
      marketBasedPayload.co2eofco2 = null;
      marketBasedPayload.co2eofch4 = null;
      marketBasedPayload.co2eofn2o = null;
    }

    // console.table(payload);
    // console.table(marketBasedPayload);
    // return;
    fetch(`${import.meta.env.VITE_API_BASE_URL}/companiesdata`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: getBearerToken(),
      },
      body: JSON.stringify(payload),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error();
        }
        // Note : This if block is for omptimization purpose below i am fetching company data again
        if (!marketBased) {
          toast.success("Data submitted successfully");
          resetForm();
        }
      })
      .then(() => {
        // Note : This if block is for omptimization purpose below i am fetching company data again
        if (!marketBased) {
          fetchCompanyData();
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
      fetch(`${import.meta.env.VITE_API_BASE_URL}/companiesdata`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization: getBearerToken(),
        },
        body: JSON.stringify(marketBasedPayload),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error();
          }
          toast.success("Data submitted successfully");
          resetForm();
        })
        .then(() => {
          fetchCompanyData();
        })
        .catch((error) => {
          toast.error("Error adding data");
          console.error("Couldn't submit data", error);
        });
    }
  };

  const handleUpdateData = () => {
    if (
      !userId ||
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

    let payload = {
      ids: userId,
      uom: unitOfMeasurementValue,
      businessunit: businessUnitValue,
      quantity: quantityValue,
      fuel_category: scopeCategoryValue,
      scope: selectedScope,
      level1: selectedLevel,
      level2: fuelTypeValue,
      level3: fuelNameValue,
      level4: level4Value || null,
      level5: level5Value || null,
    };

    if (
      selectedLevel === "Electricity" ||
      selectedLevel === "Electricity TandD" ||
      selectedLevel === "WTT- electricity (generation)" ||
      selectedLevel === "WTT- electricity (TandD)" ||
      selectedLevel === "WTT- electricity" ||
      selectedLevel === "Water supply" ||
      selectedLevel === "Water treatment"
    ) {
      const ghgconversions = calculateConversionGHGForElectricity(payload);
      payload = { ...payload, ...ghgconversions };
    } else {
      const ghgconversions = calculateConversionGHG();
      payload = { ...payload, ...ghgconversions };
    }

    // console.table(payload);
    // return;
    fetch(`${import.meta.env.VITE_API_BASE_URL}/companiesdata/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        accept: "application/json",
        authorization: getBearerToken(),
      },
      body: JSON.stringify(payload),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error();
        }
        toast.success("Data updated successfully");
        resetForm();
        navigate("/activities");
      })
      .then(() => {
        fetchCompanyData();
      })
      .catch((error) => {
        toast.error("Error updating data");
        console.log(error);
      });
  };

  const handleCancel = () => {
    resetForm();
    navigate("/activities");
  };

  const filterLevel4Options = () => {
    let level4Options = [];
    activitesData?.datas.forEach((item) => {
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
    activitesData?.datas.forEach((item) => {
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
    for (let i = 0; i < activitesData?.datas.length; i++) {
      const item = activitesData?.datas[i];
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
    for (let i = 0; i < activitesData?.datas.length; i++) {
      const item = activitesData?.datas[i];
      if (
        item.scope === selectedScope &&
        item.level1 === selectedLevel &&
        item.level4 &&
        item.level4 !== "null"
      ) {
        return true;
      }
    }
    // let level4 = [];
    // activitesData?.datas.forEach((item) => {
    //   if (
    //     item.scope === selectedScope &&
    //     item.level1 === selectedLevel
    //     // item.level2 === fuelTypeValue &&
    //     // &&
    //     // item.level3
    //   ) {
    //     if (item.level4 !== "null") {
    //       level4.push(item.level4);
    //     }
    //   }
    // });
    // level4 = [...new Set(level4)];
    // return level4.length > 0 ? true : false;
    return false;
  };

  const isLevel5Available = () => {
    for (let i = 0; i < activitesData?.datas.length; i++) {
      const item = activitesData?.datas[i];
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
    // let level5 = [];
    // activitesData?.datas.forEach((item) => {
    //   if (
    //     item.scope === selectedScope &&
    //     item.level1 === selectedLevel
    //     // item.level2 === fuelTypeValue &&
    //     // &&
    //     // item.level3
    //   ) {
    //     if (item.level5 !== "null") {
    //       level5.push(item.level5);
    //     }
    //   }
    // });
    // level5 = [...new Set(level5)];
    // return level5.length > 0 ? true : false;
  };

  const filterUnitOfMeasurementsBasedOnScopeAndLevel1 = () => {
    let unitsOfMeasurement = [];
    activitesData?.datas.forEach((item) => {
      if (item.scope === selectedScope && item.level1 === selectedLevel) {
        unitsOfMeasurement.push(item.uom);
      }
    });
    unitsOfMeasurement = [...new Set(unitsOfMeasurement)];
    return unitsOfMeasurement;
  };

  const filterLevel3BasedOnScopeAndLevel1 = () => {
    let level3 = [];
    activitesData?.datas.forEach((item) => {
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

  const calculateConversionGHGForBusinessTravelAirOrWTTBusinessTravelAir = (
    payload
  ) => {
    let co2e = null;
    let co2eofco2 = null;
    let co2eofch4 = null;
    let co2eofn2o = null;

    const ghgValues = [
      "kg CO2e",
      "kg CO2e of CO2 per unit",
      "kg CO2e of CH4 per unit",
      "kg CO2e of N2O per unit",
    ];

    for (let i = 0; i < activitesData?.datas.length; i++) {
      const item = activitesData?.datas[i];

      if (
        item.scope === selectedScope &&
        item.level1 === selectedLevel &&
        // In database level4(fuelNameValue) is at level3 (should be consistent)
        item.level3 === payload.level4 &&
        // In database level5 is at level4 (should be consistent)
        item.level4 === payload.level5 &&
        item.uom === unitOfMeasurementValue
      ) {
        if (item.ghg === ghgValues[0]) {
          co2e = item.ghgconversion;
        } else if (item.ghg === ghgValues[1]) {
          co2eofco2 = item.ghgconversion;
        } else if (item.ghg === ghgValues[2]) {
          co2eofch4 = item.ghgconversion;
        } else if (item.ghg === ghgValues[3]) {
          co2eofn2o = item.ghgconversion;
        }
      }
      if (co2e && co2eofco2 && co2eofch4 && co2eofn2o) {
        // If all 4 values are found not need to loop any more
        break;
      }
    }

    return {
      co2e,
      co2eofco2,
      co2eofch4,
      co2eofn2o,
    };
  };

  useEffect(() => {
    // data comes on second render because userId is coming from parent component
    // if (userId) {
    fetchActivitesData().then((activitiesData) => {
      setActivitesData(activitiesData);
    });
    fetchBusinessUnit().then((businessUnits) => {
      businessUnits = businessUnits.map((item) => item.unitname);
      setBusinessUnits(businessUnits);
    });
    fetchScopeCategoriesData().then((scopeCategoriesData) => {
      setScopeCategoriesData(scopeCategoriesData);
    });
    // }
    // }, [userId]);
  }, []);

  useEffect(() => {
    if (!id) {
      setScopeCategoryValue("");
      setShowFuelNamesField(false);
      setShowLevel4Field(false);
      setShowLevel5Field(false);
      setUnitOfMeasurementValue("");
      setUnitOfMeasurements([]);
    }
    // initialialy blocking not to filter if scopeCategoriesData is empty
    if (
      scopeCategoriesData !== null &&
      activitesData !== null &&
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
          activitesData?.datas.forEach((item) => {
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
  }, [selectedLevel, scopeCategoriesData, activitesData, businessUnits]);

  /**
   * level2
   */
  useEffect(() => {
    if (
      !id &&
      selectedLevel !== "Business travel- air" &&
      selectedLevel !== "WTT- business travel- air"
    ) {
      setFuelTypes([]);
      setFuelTypeValue("");
      setUnitOfMeasurementValue("");
      setFuelNameValue("");
    }

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
    if (!id) {
      setFuelNameValue("");
      setFuelNames([]);
      setUnitOfMeasurementValue("");
      // setUnitOfMeasurements([]);
    }

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
    if (!id) {
      if (
        selectedLevel !== "Business travel- air" &&
        selectedLevel !== "WTT- business travel- air"
      ) {
        setLevel4Options([]);
      }
      setLevel4Value("");
      setLevel5Value("");
      setLevel5Options([]);
    }

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
      activitesData?.datas.forEach((item) => {
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
    if (id && activitesData) {
      fetchCompanyDataOfGivenId(id)
        .then((companyDataOfGivenId) => {
          setSelectedScope(companyDataOfGivenId[0].scope);
          setSelectedLevel(companyDataOfGivenId[0].level1);
          setScopeCategoryValue(companyDataOfGivenId[0].fuel_category);
          setBusinessUnitValue(companyDataOfGivenId[0].businessunit);
          if (selectedLevel !== "District heat and steam TandD") {
            setFuelTypeValue(companyDataOfGivenId[0].level2);
          }
          setFuelNameValue(companyDataOfGivenId[0].level3);
          setUnitOfMeasurementValue(companyDataOfGivenId[0].uom);
          setQuantityValue(companyDataOfGivenId[0].quantity);
          setLevel4Value(companyDataOfGivenId[0].level4 || "");
          setLevel5Value(companyDataOfGivenId[0].level5 || "");
        })
        .catch((error) => {
          console.error("Failed to get company data", error);
        });
    }
  }, [id]);

  return (
    <>
      <form onSubmit={handleFormSubmit} className="flex flex-col gap-y-3">
        <h3 className="m-0 font-extrabold text-2xl">
          Insert activity data here
        </h3>
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
                businessUnits.map((option, index) => {
                  return (
                    <option key={index} value={option}>
                      {option}
                    </option>
                  );
                })}
            </Select>
          </FormControl>

          {/* Fuel Type (level2) */}
          {/* selectedLevel !== "WTT- electricity" && */}
          {selectedLevel !== "Electricity" &&
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
            // selectedLevel !== "Business travel- air" &&
            // selectedLevel !== "WTT- business travel- air" &&
            selectedLevel !== "WTT- electricity (T&D)" &&
            selectedLevel !== "Electricity T&D" && (
              <FormControl>
                <Label>
                  {selectedLevel && selectedLevel === "Refrigerant and other"
                    ? "Refrigerant and other gas category"
                    : selectedLevel === "Passenger vehicles"
                      ? "Passenger Vehicle Category"
                      : selectedLevel === "Delivery vehicles"
                        ? "Delivery Vehicle Category"
                        : selectedLevel === "Passenger Evs"
                          ? "Passenger EV Category"
                          : selectedLevel === "Delivery Evs"
                            ? "Delivery Vehicle Category"
                            : selectedLevel === "WTT- fuels"
                              ? "Fuel Type"
                              : selectedLevel === "WTT- bioenergy"
                                ? "Bioenergy Type"
                                : selectedLevel ===
                                    "Electricity TandD for passenger EVs"
                                  ? "Passenger EV Category"
                                  : selectedLevel === "Business travel- land"
                                    ? "Passenger Vehicle Category"
                                    : selectedLevel === "Material use"
                                      ? "Material Type"
                                      : selectedLevel === "Waste disposal"
                                        ? "Waste Type"
                                        : selectedLevel ===
                                            "Business travel- sea"
                                          ? "Boat / Ship Type"
                                          : selectedLevel ===
                                              "WTT- business travel- sea"
                                            ? "Boat / Ship Type"
                                            : selectedLevel ===
                                                "WTT- pass vehs and travel- land"
                                              ? "Passenger Vehicle Category"
                                              : selectedLevel ===
                                                  "Freighting goods"
                                                ? "Freighting medium"
                                                : selectedLevel ===
                                                    "WTT- delivery vehs and freight"
                                                  ? "Freighting medium"
                                                  : selectedLevel ===
                                                      "Managed assets- vehicles"
                                                    ? "Vehicle Category"
                                                    : selectedLevel ===
                                                        "Business travel- air"
                                                      ? "Airport From"
                                                      : selectedLevel ===
                                                          "WTT- business travel- air"
                                                        ? "Airport From"
                                                        : `${selectedLevel} Type`}
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
            )}
          {/* Fuel Name (level3) */}
          {showFuelNamesField && (
            <FormControl>
              <Label>
                {selectedLevel && selectedLevel === "Bioenergy"
                  ? "Bioenergy Fuel Name"
                  : selectedLevel === "Refrigerant and other"
                    ? "Refrigerant and other gas name"
                    : selectedLevel === "Passenger vehicles"
                      ? "Passenger Vehicle Segment / Size"
                      : selectedLevel === "Delivery vehicles"
                        ? "Delivery Vehicle Class / Category"
                        : selectedLevel === "Passenger Evs"
                          ? "Passenger EV Segment / Size"
                          : selectedLevel === "Delivery Evs"
                            ? "Delivery Vehicle Segment / Size"
                            : selectedLevel === "Heat and steam"
                              ? "Onsite / Offsite"
                              : selectedLevel === "WTT- fuels"
                                ? "Fuel Name"
                                : selectedLevel === "WTT- bioenergy"
                                  ? "Bioenergy Fuel Name"
                                  : selectedLevel ===
                                      "Electricity TandD for passenger EVs"
                                    ? "Passenger EV Segment /Size"
                                    : selectedLevel === "Business travel- land"
                                      ? "Passenger Vehicle Segment /Size"
                                      : selectedLevel === "WTT- heat and steam"
                                        ? "Onsite / Offsite"
                                        : selectedLevel === "Material use"
                                          ? "Material Name"
                                          : selectedLevel === "Waste disposal"
                                            ? "Waste Name"
                                            : selectedLevel ===
                                                "Business travel- sea"
                                              ? "Passenger Type"
                                              : selectedLevel ===
                                                  "WTT- business travel- sea"
                                                ? "Passenger Type"
                                                : selectedLevel ===
                                                    "WTT- pass vehs and travel- land"
                                                  ? "Passenger Vehicle Segment / Size"
                                                  : selectedLevel ===
                                                      "Freighting goods"
                                                    ? "Class / Type / Haul"
                                                    : selectedLevel ===
                                                        "WTT- delivery vehs and freight"
                                                      ? "Class / Type / Haul"
                                                      : selectedLevel ===
                                                          "Hotel stay"
                                                        ? "Name of Country"
                                                        : selectedLevel ===
                                                            "Managed assets- vehicles"
                                                          ? "Vehicle Segment / Size"
                                                          : selectedLevel ===
                                                              "Business travel- air"
                                                            ? "Airport To"
                                                            : selectedLevel ===
                                                                "WTT- business travel- air"
                                                              ? "Airport To"
                                                              : `${selectedLevel} Name`}
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
                        : selectedLevel ===
                            "Electricity TandD for passenger EVs"
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
                                        : selectedLevel ===
                                            "Business travel- air"
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
      <ToastContainer
        theme={"colored"}
        hideProgressBar={true}
        transition={Slide}
        autoClose={1500}
        pauseOnFocusLoss={false}
        style={{
          "--toastify-font-family": "Poppins",
          "--toastify-color-success": "#00CC9CFF",
          "--toastify-color-warning": "#e74c3c",
        }}
      />
    </>
  );
};

export default ActivitesForm;
