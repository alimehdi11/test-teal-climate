import React, { useState, useEffect } from "react";
import { Slide, ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useParams, useNavigate } from "react-router-dom";
import { getBearerToken } from "./../utils/auth.utils.js";

const FrameComponent1 = ({
  selectedScope,
  selectedLevel,
  setSelectedScope,
  setSelectedLevel,
  userId,
  setCompanyData,
}) => {
  const [scopeCategoryValue, setScopeCategoryValue] = useState("");
  const [fuelTypeValue, setFuelTypeValue] = useState("");
  const [businessUnitValue, setBusinessUnitValue] = useState("");
  const [unitOfMeasurementValue, setUnitOfMeasurementValue] = useState("");
  const [fuelNameValue, setFuelNameValue] = useState("");
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

  // Onlly for electricity (Level 1)
  const [electricityBasedUpon, setElectricityBasedUpon] =
    useState("locationBased");
  const [emissionFactor, setEmissionFactor] = useState("");
  const [quantityPurchased, setQuantityPurchased] = useState("");
  const [unitOfEmissionFactor, setUnitOfEmissionFactor] = useState("");

  const { id } = useParams();
  const navigation = useNavigate();

  const fetchBusinessUnit = async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_BASE_URL}/companies/${userId}?column=unitname`,
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
        `${process.env.REACT_APP_API_BASE_URL}/activitydata`,
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
        `${process.env.REACT_APP_API_BASE_URL}/categories`,
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
    setElectricityBasedUpon("locationBased");
    setEmissionFactor("");
    setQuantityPurchased("");
    setUnitOfEmissionFactor("");
  };

  const fetchCompanyData = async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_BASE_URL}/companiesdata/${userId}`,
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
        `${process.env.REACT_APP_API_BASE_URL}/companiesdata/activites/${id}`,
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

  const handleFormSubmit = async () => {
    // console.log(
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
    //   quantityValue
    // );
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
     * For electricity(level1) market based
     */
    if (electricityBasedUpon === "marketBased") {
      if (!emissionFactor || !quantityPurchased || !unitOfEmissionFactor) {
        toast.warn("Please fill all fields");
        return;
      }
    }

    let payload, ghgconversions, marketBasedElectricityPayload;

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
            `${process.env.REACT_APP_API_BASE_URL}/companies/${userId}`,
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
      selectedLevel === "Hotel stay" ||
      selectedLevel === "Business travel- air" ||
      selectedLevel === "WTT- business travel- air"
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
      ghgconversions = calculateConversionGHG();

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
        ...ghgconversions,
      };
    }

    /**
     * For electricity(level1) market based
     */
    if (
      selectedLevel === "Electricity" &&
      electricityBasedUpon === "marketBased"
    ) {
      marketBasedElectricityPayload = { ...payload };
      marketBasedElectricityPayload.level5 = electricityBasedUpon;
      marketBasedElectricityPayload.quantity = quantityPurchased;
      marketBasedElectricityPayload.co2e = Number(emissionFactor);
      marketBasedElectricityPayload.uom = unitOfEmissionFactor;
    }

    // console.table(payload);
    // console.table(marketBasedElectricityPayload);
    // return;
    fetch(`${process.env.REACT_APP_API_BASE_URL}/companiesdata`, {
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
        if (electricityBasedUpon !== "marketBased") {
          toast.success("Data submitted successfully");
          resetForm();
        }
      })
      .then(() => {
        // Note : This if block is for omptimization purpose below i am fetching company data again
        if (electricityBasedUpon !== "marketBased") {
          fetchCompanyData();
        }
      })
      .catch((error) => {
        toast.error("Error adding data");
        console.error("Couldn't submit data", error);
      });

    /**
     * For electricity(level1) market based
     */
    if (
      selectedLevel === "Electricity" &&
      electricityBasedUpon === "marketBased"
    ) {
      fetch(`${process.env.REACT_APP_API_BASE_URL}/companiesdata`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization: getBearerToken(),
        },
        body: JSON.stringify(marketBasedElectricityPayload),
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
    fetch(`${process.env.REACT_APP_API_BASE_URL}/companiesdata/${id}`, {
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
        navigation("/activites");
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
    navigation("/activites");
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
      if (
        item.scope === selectedScope &&
        // here selectedLevel === Electricity
        item.level1 === selectedLevel
      ) {
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

  useEffect(() => {
    // data comes on second render because userId is coming from parent component
    if (userId) {
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
    }
  }, [userId]);

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
          setShowLevel4Field(isLevel4Available());
          setShowLevel5Field(isLevel5Available());
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
        selectedLevel === "Electricity T&D"
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
        const unitOfMeasurements =
          filterUnitOfMeasurementsBasedOnScopeAndLevel1();
        setUnitOfMeasurements(unitOfMeasurements);
        const level3 = filterLevel3BasedOnScopeAndLevel1();
        setFuelNames(level3);

        if (
          selectedLevel === "Business travel- air" ||
          selectedLevel === "WTT- business travel- air"
        ) {
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
        }
      }
    }
  }, [selectedLevel, scopeCategoriesData, activitesData, businessUnits]);

  useEffect(() => {
    if (!id) {
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

  useEffect(() => {
    if (!id) {
      setFuelNameValue("");
      setFuelNames([]);
      setUnitOfMeasurementValue("");
      setUnitOfMeasurements([]);
    }
    if (fuelTypeValue !== "") {
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
  }, [fuelTypeValue]);

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
  }, [fuelNameValue]);

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
      <div className="flex-1 rounded-lg bg-white shadow-[0px_4px_60px_rgba(0,_0,_0,_0.02)] flex flex-col items-end justify-start py-[18px] pr-[18px] pl-6 box-border gap-[216px] min-w-[585px] max-w-full text-left text-5xl text-dark font-poppins mq450:gap-[216px] mq800:min-w-full mq1125:gap-[216px]">
        <div className="self-stretch flex flex-col items-start justify-start gap-[32px] max-w-full mq450:gap-[32px]">
          <h1 className="m-0 h-9 relative text-inherit font-semibold font-inherit inline-block z-[1] mq450:text-lgi">
            Insert activity data here
          </h1>

          <div className="w-full grid grid-cols-2 text-base gap-5">
            {selectedLevel === "Electricity" && (
              <h3 className="text-base m-0 bg-gray-5 w-full p-2 col-span-2">
                Location based
              </h3>
            )}
            {/* Scope Category */}
            <div className="self-stretch flex flex-col items-start justify-start gap-[12px]">
              <h3 className="m-0 relative text-inherit capitalize font-medium font-inherit z-[1]">
                Scope Category
              </h3>
              <select
                className="w-full bg-not-white self-stretch h-10 rounded-lg overflow-hidden shrink-0 flex flex-row items-center justify-start pt-2.5 px-3 pb-[9px] box-border font-poppins text-sm min-w-[248px] z-[1] border-[1px] border-solid border-slate-600"
                onChange={(e) => setScopeCategoryValue(e.target.value)}
                value={scopeCategoryValue}
              >
                <option value="">Select Option</option>
                {scopeCategories.map((option, index) => {
                  return (
                    <option key={index} value={option}>
                      {option}
                    </option>
                  );
                })}
              </select>
            </div>

            {/* Business Unit */}
            <div className="self-stretch flex flex-col items-start justify-start gap-[12px]">
              <h3 className="m-0 relative text-inherit capitalize font-medium font-inherit z-[1]">
                Business Unit
              </h3>
              <select
                className="w-full bg-not-white self-stretch h-10 rounded-lg overflow-hidden shrink-0 flex flex-row items-center justify-start pt-2.5 px-3 pb-[9px] box-border font-poppins text-sm min-w-[248px] z-[1] border-[1px] border-solid border-slate-600"
                onChange={(e) => setBusinessUnitValue(e.target.value)}
                value={businessUnitValue}
              >
                <option value="">Select option</option>
                {businessUnits &&
                  businessUnits.map((option, index) => {
                    return (
                      <option key={index} value={option}>
                        {option}
                      </option>
                    );
                  })}
              </select>
            </div>

            {/* Fuel Type */}
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
              selectedLevel !== "Business travel- air" &&
              selectedLevel !== "WTT- business travel- air" &&
              selectedLevel !== "WTT- electricity (T&D)" &&
              selectedLevel !== "Electricity T&D" && (
                <div className="self-stretch flex flex-col items-start justify-start gap-[12px]">
                  <h3 className="m-0 relative text-inherit capitalize font-medium font-inherit z-[1]">
                    {selectedLevel
                      ? selectedLevel === "Refrigerant and other"
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
                        : selectedLevel === "Business travel- sea"
                        ? "Boat / Ship Type"
                        : selectedLevel === "WTT- business travel- sea"
                        ? "Boat / Ship Type"
                        : selectedLevel === "WTT- pass vehs and travel- land"
                        ? "Passenger Vehicle Category"
                        : selectedLevel === "Freighting goods"
                        ? "Freighting medium"
                        : selectedLevel === "WTT- delivery vehs and freight"
                        ? "Freighting medium"
                        : selectedLevel === "Managed assets- vehicles"
                        ? "Vehicle Category"
                        : `${selectedLevel} Type`
                      : "Fuel Type"}
                  </h3>
                  <select
                    className="w-full bg-not-white self-stretch h-10 rounded-lg overflow-hidden shrink-0 flex flex-row items-center justify-start pt-2.5 px-3 pb-[9px] box-border font-poppins text-sm min-w-[248px] z-[1] border-[1px] border-solid border-slate-600"
                    onChange={(e) => setFuelTypeValue(e.target.value)}
                    value={fuelTypeValue}
                  >
                    <option value="">Select Option</option>
                    {fuelTypes.map((option, index) => {
                      return (
                        <option key={index} value={option}>
                          {option}
                        </option>
                      );
                    })}
                  </select>
                </div>
              )}

            {/* Fuel Name */}
            {showFuelNamesField && (
              <div className="self-stretch flex flex-col items-start justify-start gap-[12px]">
                <h3 className="m-0 relative text-inherit capitalize font-medium font-inherit z-[1]">
                  {selectedLevel
                    ? selectedLevel === "Bioenergy"
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
                      : selectedLevel === "Electricity TandD for passenger EVs"
                      ? "Passenger EV Segment /Size"
                      : selectedLevel === "Business travel- land"
                      ? "Passenger Vehicle Segment /Size"
                      : selectedLevel === "WTT- heat and steam"
                      ? "Onsite / Offsite"
                      : selectedLevel === "Material use"
                      ? "Material Name"
                      : selectedLevel === "Waste disposal"
                      ? "Waste Name"
                      : selectedLevel === "Business travel- sea"
                      ? "Passenger Type"
                      : selectedLevel === "WTT- business travel- sea"
                      ? "Passenger Type"
                      : selectedLevel === "WTT- pass vehs and travel- land"
                      ? "Passenger Vehicle Segment / Size"
                      : selectedLevel === "Freighting goods"
                      ? "Class / Type / Haul"
                      : selectedLevel === "WTT- delivery vehs and freight"
                      ? "Class / Type / Haul"
                      : selectedLevel === "Hotel stay"
                      ? "Name of Country"
                      : selectedLevel === "Managed assets- vehicles"
                      ? "Vehicle Segment / Size"
                      : selectedLevel === "Business travel- air"
                      ? "Distance type"
                      : selectedLevel === "WTT- business travel- air"
                      ? "Distance type"
                      : `${selectedLevel} Name`
                    : "Fuel Name"}
                </h3>
                <select
                  className="w-full bg-not-white self-stretch h-10 rounded-lg overflow-hidden shrink-0 flex flex-row items-center justify-start pt-2.5 px-3 pb-[9px] box-border font-poppins text-sm min-w-[248px] z-[1] border-[1px] border-solid border-slate-600"
                  onChange={(e) => setFuelNameValue(e.target.value)}
                  value={fuelNameValue}
                >
                  <option value="">Select Option</option>
                  {fuelNames.map((option, index) => {
                    return (
                      <option key={index} value={option}>
                        {option}
                      </option>
                    );
                  })}
                </select>
              </div>
            )}

            {/* level4 */}
            {showLevel4Field && (
              <div className="self-stretch flex flex-col items-start justify-start gap-[12px]">
                <h3 className="m-0 relative text-inherit capitalize font-medium font-inherit z-[1]">
                  {selectedLevel
                    ? selectedLevel === "Freighting goods"
                      ? "Capacity"
                      : selectedLevel === "WTT- delivery vehs and freight"
                      ? "Capacity"
                      : selectedLevel === "Business travel- air"
                      ? "Class"
                      : selectedLevel === "WTT- business travel- air"
                      ? "Class"
                      : "Level 4"
                    : "Level 4"}
                </h3>
                <select
                  className="w-full bg-not-white self-stretch h-10 rounded-lg overflow-hidden shrink-0 flex flex-row items-center justify-start pt-2.5 px-3 pb-[9px] box-border font-poppins text-sm min-w-[248px] z-[1] border-[1px] border-solid border-slate-600"
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
                </select>
              </div>
            )}

            {/* level5 */}
            {showLevel5Field && (
              <div className="self-stretch flex flex-col items-start justify-start gap-[12px]">
                <h3 className="m-0 relative text-inherit capitalize font-medium font-inherit z-[1]">
                  {selectedLevel
                    ? selectedLevel === "Passenger vehicles"
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
                      : selectedLevel === "WTT- pass vehs and travel- land"
                      ? "Fuel Type"
                      : selectedLevel === "Freighting goods"
                      ? "Fuel / Laden"
                      : selectedLevel === "WTT- delivery vehs and freight"
                      ? "Fuel / Laden"
                      : selectedLevel === "Managed assets- vehicles"
                      ? "Fuel Type / Laden"
                      : "Level 5"
                    : "Level 5"}
                </h3>
                <select
                  className="w-full bg-not-white self-stretch h-10 rounded-lg overflow-hidden shrink-0 flex flex-row items-center justify-start pt-2.5 px-3 pb-[9px] box-border font-poppins text-sm min-w-[248px] z-[1] border-[1px] border-solid border-slate-600"
                  onChange={(e) => setLevel5Value(e.target.value)}
                  value={level5Value}
                >
                  <option value="">Select Option</option>
                  {level5Options.map((option, index) => {
                    return (
                      <option key={index} value={option}>
                        {option}
                      </option>
                    );
                  })}
                </select>
              </div>
            )}

            {/*  Unit of Measurement  */}
            <div className="self-stretch flex flex-col items-start justify-start gap-[12px]">
              <h3 className="m-0 relative text-inherit capitalize font-medium font-inherit z-[1]">
                Unit of measurement
              </h3>
              <select
                className="w-full bg-not-white self-stretch h-10 rounded-lg overflow-hidden shrink-0 flex flex-row items-center justify-start pt-2.5 px-3 pb-[9px] box-border font-poppins text-sm min-w-[248px] z-[1] border-[1px] border-solid border-slate-600"
                onChange={(e) => setUnitOfMeasurementValue(e.target.value)}
                value={unitOfMeasurementValue}
              >
                <option value="">Select Option</option>
                {unitOfMeasurements.map((option, index) => {
                  return (
                    <option key={index} value={option}>
                      {option}
                    </option>
                  );
                })}
              </select>
            </div>

            {/* Quantity */}
            <div className="self-stretch flex flex-col items-start justify-start gap-[12px]">
              <h3 className="m-0 relative text-inherit capitalize font-medium font-inherit z-[1]">
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
              </h3>
              <input
                type="number"
                className="w-full bg-not-white self-stretch h-10 rounded-lg overflow-hidden shrink-0 flex flex-row items-center justify-start pt-2.5 px-3 pb-[9px] box-border font-poppins text-sm min-w-[248px] z-[1] border-[1px] border-solid border-slate-600 placeholder-dark"
                value={quantityValue}
                onChange={(e) => setQuantityValue(e.target.value)}
                placeholder="Enter Quantity"
              />
            </div>
          </div>

          {/* Location based or Market based only for Electricity(Level1) */}
          {selectedLevel === "Electricity" && (
            <>
              {/* Radio buttons */}
              <div>
                <p className="text-base m-0">
                  Was a market based instrument purchases for this electricity
                  use?
                </p>
                <div className="inline ms-[-6px] me-1">
                  <input
                    type="radio"
                    id="locationBased"
                    name="electricityBased"
                    value="locationBased"
                    checked={electricityBasedUpon === "locationBased"}
                    onChange={(event) => {
                      setElectricityBasedUpon(event.target.value);
                    }}
                  />
                  <label
                    htmlFor="locationBased"
                    className="text-base font-medium"
                  >
                    {/* Location Based */}
                    No
                  </label>
                </div>
                <div className="inline">
                  <input
                    type="radio"
                    id="marketBased"
                    name="electricityBased"
                    value="marketBased"
                    checked={electricityBasedUpon === "marketBased"}
                    onChange={(event) => {
                      setElectricityBasedUpon(event.target.value);
                    }}
                  />
                  <label
                    htmlFor="marketBased"
                    className="text-base font-medium"
                  >
                    {/* Market Based */}
                    Yes
                  </label>
                </div>
              </div>
              {/* Market based form */}
              {electricityBasedUpon === "marketBased" && (
                <div className="w-full grid grid-cols-2 gap-5">
                  <h3 className="text-base m-0 bg-gray-5 w-full p-2 col-span-2">
                    Market based
                  </h3>
                  <div className="self-stretch flex flex-col items-start justify-start gap-[12px]">
                    <h3 className="text-base m-0 font-medium">
                      Quantity Purchased
                    </h3>
                    <input
                      type="number"
                      className="w-full bg-not-white self-stretch h-10 rounded-lg overflow-hidden shrink-0 flex flex-row items-center justify-start pt-2.5 px-3 pb-[9px] box-border font-poppins text-sm min-w-[248px] z-[1] border-[1px] border-solid border-slate-600 placeholder-dark"
                      placeholder="Enter Purchased Quantity"
                      value={quantityPurchased}
                      onChange={(event) => {
                        setQuantityPurchased(event.target.value);
                      }}
                    />
                  </div>
                  <div className="self-stretch flex flex-col items-start justify-start gap-[12px]">
                    <h3 className="text-base m-0 font-medium">
                      Emission Factor
                    </h3>
                    <input
                      type="number"
                      className="w-full bg-not-white self-stretch h-10 rounded-lg overflow-hidden shrink-0 flex flex-row items-center justify-start pt-2.5 px-3 pb-[9px] box-border font-poppins text-sm min-w-[248px] z-[1] border-[1px] border-solid border-slate-600 placeholder-dark"
                      placeholder="Enter Quantity"
                      value={emissionFactor}
                      onChange={(event) => {
                        setEmissionFactor(event.target.value);
                      }}
                    />
                  </div>
                  <div className="self-stretch flex flex-col items-start justify-start gap-[12px]">
                    <h3 className="text-base m-0 font-medium">
                      Unit of Emission Factor
                    </h3>
                    <select
                      className="w-full bg-not-white self-stretch h-10 rounded-lg overflow-hidden shrink-0 flex flex-row items-center justify-start pt-2.5 px-3 pb-[9px] box-border font-poppins text-sm min-w-[248px] z-[1] border-[1px] border-solid border-slate-600"
                      value={unitOfEmissionFactor}
                      onChange={(e) => setUnitOfEmissionFactor(e.target.value)}
                    >
                      <option value="">Select Option</option>
                      <option value="kgco2e/kwh">kgco2e / kwh</option>
                    </select>
                  </div>
                </div>
              )}
            </>
          )}

          {/* Add, Edit, Cancel Buttons */}
          <div className="flex flex-row items-start justify-start gap-[8px] max-w-full mq450:flex-wrap ms-auto">
            {id ? (
              <>
                <button
                  className="cursor-pointer py-2.5 pr-5 pl-[21px] bg-brand-color-2 flex-[0.8859] rounded-lg flex flex-row items-center justify-center box-border min-w-[220px] z-[1] hover:bg-mediumseagreen"
                  onClick={handleCancel}
                >
                  <div className="h-6 relative text-base capitalize font-medium font-poppins text-white text-center inline-block z-[2]">
                    Cancel
                  </div>
                </button>
                <button
                  className="cursor-pointer py-2.5 pr-5 pl-[21px] bg-brand-color-2 flex-[0.8859] rounded-lg flex flex-row items-center justify-center box-border min-w-[220px] z-[1] hover:bg-mediumseagreen"
                  onClick={handleUpdateData}
                >
                  <div className="h-6 relative text-base capitalize font-medium font-poppins text-white text-center inline-block z-[2]">
                    Edit
                  </div>
                </button>
              </>
            ) : (
              <button
                className="cursor-pointer py-2.5 pr-5 pl-[21px] bg-brand-color-01 flex-[0.8859] rounded-lg flex flex-row items-center justify-center box-border min-w-[220px] z-[1] hover:bg-mediumseagreen"
                onClick={handleFormSubmit}
              >
                <div className="h-6 relative text-base capitalize font-medium font-poppins text-white text-center inline-block z-[2]">
                  Add
                </div>
              </button>
            )}
          </div>
        </div>
      </div>
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

export default FrameComponent1;
