import { Eeio } from "../models/eeio.model.js";
import { CountryMask } from "../models/countryMask.model.js";
import { BusinessUnitActivity } from "../models/businessUnitActivity.model.js";
import { BusinessUnit } from "../models/businessUnit.model.js";
import { Reit } from "../models/reit.model.js";
import { Activity } from "../models/activity.model.js";
import { ElectricVehicle } from "../models/electricVehicle.model.js";

const calculateActivityGHGEmissions = (records, payload) => {
  let CO2e = 0;
  let CO2e_of_CO2 = 0;
  let CO2e_of_CH4 = 0;
  let CO2e_of_N2O = 0;
  const greenHouseGasValues = [
    "kg CO2e",
    "kg CO2e of CO2",
    "kg CO2e of CH4",
    "kg CO2e of N2O",
  ];
  records.forEach((record) => {
    if (record.greenHouseGas === greenHouseGasValues[0]) {
      CO2e = record.greenHouseGasEmissionFactor * payload.quantity;
    } else if (record.greenHouseGas === greenHouseGasValues[1]) {
      CO2e_of_CO2 = record.greenHouseGasEmissionFactor * payload.quantity;
    } else if (record.greenHouseGas === greenHouseGasValues[2]) {
      CO2e_of_CH4 = record.greenHouseGasEmissionFactor * payload.quantity;
    } else if (record.greenHouseGas === greenHouseGasValues[3]) {
      CO2e_of_N2O = record.greenHouseGasEmissionFactor * payload.quantity;
    }
  });
  return {
    ...payload,
    CO2e,
    CO2e_of_CO2,
    CO2e_of_CH4,
    CO2e_of_N2O,
  };
};

const createActivity = async (req, res) => {
  try {
    const {
      scope,
      level1,
      month,
      businessUnitId,
      level1Category,
      level2,
      level3,
      level4,
      level5,
      unitOfMeasurement,
      quantity,
      marketBasedEmissionFactor, // This will only availabe for "Scope 2"-"marketBased"
    } = req.body;
    let payload = {
      userId: req.user.id,
      scope,
      level1,
      month,
      businessUnitId,
      level1Category,
      level2,
      level3,
      level4,
      level5,
      unitOfMeasurement,
      quantity,
      marketBasedEmissionFactor,
    };
    if (scope === "Scope 2" && level5 === "marketBased") {
      const CO2e = payload.quantity * payload.marketBasedEmissionFactor;
      delete payload.marketBasedEmissionFactor;
      await BusinessUnitActivity.create({ ...payload, CO2e });
      return res.status(200).json({ message: "Activity created sucessfully" });
    } else if (
      scope === "Scope 2" &&
      (level1 === "Passenger Evs" || level1 === "Delivery Evs")
    ) {
      /**
       *  Formula:
       *  Distance travelled in km/miles (quantity)
       *  x Electricity consumption per km/miles (fetch from electricVehicle table)
       *  x Electricity emission factor of the country & region (fetch country/region from businessUnits table based on businessUnitId after that filter emission factors from activities based on Electricity and country/region)
       */
      const electricVehicleRecord = await ElectricVehicle.findOne({
        where: {
          scope,
          level1,
          level2,
          level3,
          level4,
          // level5, ==> excluding deliberately
          unitOfMeasurement,
        },
      });
      payload.quantity =
        payload.quantity * electricVehicleRecord.electricityConsumptionPerUnit;
      const businessUnitRecord = await BusinessUnit.findOne({
        where: { id: businessUnitId },
      });
      const { country, region } = businessUnitRecord;
      const activityRecords = await Activity.findAll({
        where: {
          scope,
          level1: "Electricity",
          level2: "Electricity generated",
          level3: country,
          level4: region,
          level5,
          unitOfMeasurement,
        },
      });
      payload = calculateActivityGHGEmissions(activityRecords, payload);
    } else if (
      scope === "Scope 3" &&
      (level1 === "Business travel- air" ||
        level1 === "WTT- business travel- air")
    ) {
      // Deal with airports data
      const activityRecords = await Activity.findAll({
        where: {
          scope,
          level1,
          // level2, ==> excluding deliberately
          // level3, ==> excluding deliberately
          level4,
          level5,
          unitOfMeasurement,
        },
      });
      // convert distance to "km" if "unitOfMeasurement" is "passenger.km"
      if (payload.unitOfMeasurement === "passenger.km") {
        // distanceInKm = distanceInMiles * 1.60934
        payload.quantity = Number((payload.quantity * 1.60934).toFixed(4));
      }
      payload = calculateActivityGHGEmissions(activityRecords, payload);
    } else if (
      [
        "Electricity",
        "Electricity TandD",
        "WTT- electricity (generation)",
        "WTT- electricity (TandD)",
        "WTT- electricity",
        "Managed assets- electricity",
        "WTT- electricity (T&D)",
        "Electricity T&D",
      ].includes(payload.level1)
    ) {
      // Handle special level1
      const businessUnitRecord = await BusinessUnit.findOne({
        where: { id: businessUnitId },
      });
      const { country, region } = businessUnitRecord;
      const activityRecords = await Activity.findAll({
        where: {
          scope,
          level1,
          level2,
          level3: country,
          level4: region,
          // level5, ==> excluding deliberately
          unitOfMeasurement,
        },
      });
      if (activityRecords.length === 0) {
        return res.status(200).json({
          message:
            "No electricity emission factor found for the country/region",
        });
      } else if (activityRecords.length > 0) {
        let emissionFactorAvailable = true;
        activityRecords.forEach((record) => {
          if (
            record.greenHouseGas === "kg CO2e" &&
            record.greenHouseGasEmissionFactor === 0
          ) {
            emissionFactorAvailable = false;
          }
        });
        if (!emissionFactorAvailable) {
          return res.status(200).json({
            message:
              "No electricity emission factor found for the country/region",
          });
        }
      }
      payload = calculateActivityGHGEmissions(activityRecords, payload);
    } else {
      const activityRecords = await Activity.findAll({
        where: {
          scope,
          level1,
          level2,
          level3,
          level4,
          level5,
          unitOfMeasurement,
        },
      });
      payload = calculateActivityGHGEmissions(activityRecords, payload);
    }
    await BusinessUnitActivity.create(payload);
    return res.status(200).json({ message: "Activity created sucessfully" });
  } catch (error) {
    console.log("Could not createBusinessUnitActivity -> createActivity");
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const updateActivityById = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      scope,
      level1,
      month,
      businessUnitId,
      level1Category,
      level2,
      level3,
      level4,
      level5,
      unitOfMeasurement,
      quantity,
      marketBasedEmissionFactor, // This will only availabe for "Scope 2"-"marketBased"
    } = req.body;
    let payload = {
      userId: req.user.id,
      scope,
      level1,
      month,
      businessUnitId,
      level1Category,
      level2,
      level3,
      level4,
      level5,
      unitOfMeasurement,
      quantity,
      marketBasedEmissionFactor,
    };
    if (scope === "Scope 2" && level5 === "marketBased") {
      const CO2e = payload.quantity * payload.marketBasedEmissionFactor;
      delete payload.marketBasedEmissionFactor;
      await BusinessUnitActivity.update(
        { ...payload, CO2e },
        {
          where: {
            id,
          },
        }
      );
      return res.status(200).json({ message: "Activity created sucessfully" });
    } else if (
      scope === "Scope 2" &&
      (level1 === "Passenger Evs" || level1 === "Delivery Evs")
    ) {
      /**
       *  Formula:
       *  Distance travelled in km/miles (quantity)
       *  x Electricity consumption per km/miles (fetch from electricVehicle table)
       *  x Electricity emission factor of the country & region (fetch country/region from businessUnits table based on businessUnitId after that filter emission factors from activities based on Electricity and country/region)
       */
      const electricVehicleRecord = await ElectricVehicle.findOne({
        where: {
          scope,
          level1,
          level2,
          level3,
          level4,
          // level5, ==> excluding deliberately
          unitOfMeasurement,
        },
      });
      payload.quantity =
        payload.quantity * electricVehicleRecord.electricityConsumptionPerUnit;
      const businessUnitRecord = await BusinessUnit.findOne({
        where: { id: businessUnitId },
      });
      const { country, region } = businessUnitRecord;
      const activityRecords = await Activity.findAll({
        where: {
          scope,
          level1: "Electricity",
          level2: "Electricity generated",
          level3: country,
          level4: region,
          level5,
          unitOfMeasurement,
        },
      });
      payload = calculateActivityGHGEmissions(activityRecords, payload);
    } else if (
      scope === "Scope 3" &&
      (level1 === "Business travel- air" ||
        level1 === "WTT- business travel- air")
    ) {
      // Deal with airports data
      const activityRecords = await Activity.findAll({
        where: {
          scope,
          level1,
          // level2, ==> excluding deliberately
          // level3, ==> excluding deliberately
          level4,
          level5,
          unitOfMeasurement,
        },
      });
      // convert distance to "km" if "unitOfMeasurement" is "passenger.km"
      if (payload.unitOfMeasurement === "passenger.km") {
        // distanceInKm = distanceInMiles * 1.60934
        payload.quantity = Number((payload.quantity * 1.60934).toFixed(4));
      }
      payload = calculateActivityGHGEmissions(activityRecords, payload);
    } else if (
      [
        "Electricity",
        "Electricity TandD",
        "WTT- electricity (generation)",
        "WTT- electricity (TandD)",
        "WTT- electricity",
        "Managed assets- electricity",
        "WTT- electricity (T&D)",
        "Electricity T&D",
      ].includes(payload.level1)
    ) {
      // Handle special level1
      const businessUnitRecord = await BusinessUnit.findOne({
        where: { id: businessUnitId },
      });
      const { country, region } = businessUnitRecord;
      const activityRecords = await Activity.findAll({
        where: {
          scope,
          level1,
          level2,
          level3: country,
          level4: region,
          // level5, ==> excluding deliberately
          unitOfMeasurement,
        },
      });
      if (activityRecords.length === 0) {
        return res.status(200).json({
          message:
            "No electricity emission factor found for the country/region",
        });
      } else if (activityRecords.length > 0) {
        let emissionFactorAvailable = true;
        activityRecords.forEach((record) => {
          if (
            record.greenHouseGas === "kg CO2e" &&
            record.greenHouseGasEmissionFactor === 0
          ) {
            emissionFactorAvailable = false;
          }
        });
        if (!emissionFactorAvailable) {
          return res.status(200).json({
            message:
              "No electricity emission factor found for the country/region",
          });
        }
      }
      payload = calculateActivityGHGEmissions(activityRecords, payload);
    } else {
      const activityRecords = await Activity.findAll({
        where: {
          scope,
          level1,
          level2,
          level3,
          level4,
          level5,
          unitOfMeasurement,
        },
      });
      payload = calculateActivityGHGEmissions(activityRecords, payload);
    }
    await BusinessUnitActivity.update(payload, {
      where: {
        id,
      },
    });
    return res.status(200).json({ message: "Activity updated sucessfully" });
  } catch (error) {
    console.log("Could not updateBusinessUnitActivity -> updateActivityById");
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const createEeioActivity = async (req, res) => {
  try {
    const {
      productOrIndustry,
      level1,
      businessUnitId,
      level2,
      level3,
      level4,
      level5,
      sector,
      unitOfMeasurement,
      quantity,
      month,
      // year,
    } = req.body;
    const businessUnit = await BusinessUnit.findByPk(businessUnitId);
    const payload = {
      userId: req.user.id,
      scope: "Scope 3",
      productOrIndustry,
      level1,
      businessUnitId,
      level2,
      level3,
      level4,
      level5,
      sector,
      unitOfMeasurement,
      quantity,
      month,
      // year,
    };
    payload.continent = businessUnit.continent;
    payload.country = businessUnit.country;
    let eeioRecords = await Eeio.findAll({
      where: {
        productOrIndustry,
        level1,
        level2,
        level3,
        level4,
        level5,
        sector,
        continent: payload.continent,
        country: payload.country,
      },
    });
    // If eeio records not found for given continent and country
    if (eeioRecords.length === 0) {
      const countryMaskRecord = await CountryMask.findOne({
        where: {
          continent: payload.continent,
          country: payload.country,
        },
      });
      // Find eeio records for given countryMask
      eeioRecords = await Eeio.findAll({
        where: {
          productOrIndustry,
          level1,
          level2,
          level3,
          level4,
          level5,
          sector,
          continent: countryMaskRecord.continent,
          country: countryMaskRecord.countryMask,
        },
      });
    }
    let CO2e = "";
    let CO2e_of_CO2 = "";
    let CO2e_of_CH4 = "";
    let CO2e_of_N2O = "";
    let CO2e_of_other = "";
    const greenHouseGasValues = [
      "kg CO2e",
      "kg CO2e of CO2",
      "kg CO2e of CH4",
      "kg CO2e of N2O",
      "kg CO2e of Other",
    ];
    eeioRecords.forEach((eeioRecord) => {
      if (eeioRecord.greenHouseGas === greenHouseGasValues[0]) {
        CO2e = eeioRecord.greenHouseGasEmissionFactor * quantity;
      } else if (eeioRecord.greenHouseGas === greenHouseGasValues[1]) {
        CO2e_of_CO2 = eeioRecord.greenHouseGasEmissionFactor * quantity;
      } else if (eeioRecord.greenHouseGas === greenHouseGasValues[2]) {
        CO2e_of_CH4 = eeioRecord.greenHouseGasEmissionFactor * quantity;
      } else if (eeioRecord.greenHouseGas === greenHouseGasValues[3]) {
        CO2e_of_N2O = eeioRecord.greenHouseGasEmissionFactor * quantity;
      } else if (eeioRecord.greenHouseGas === greenHouseGasValues[4]) {
        CO2e_of_other = eeioRecord.greenHouseGasEmissionFactor * quantity;
      }
    });
    payload.exioBaseCode = eeioRecords[0].exioBaseCode;
    payload.reference = eeioRecords[0].reference;
    payload.CO2e = CO2e;
    payload.CO2e_of_CO2 = CO2e_of_CO2;
    payload.CO2e_of_CH4 = CO2e_of_CH4;
    payload.CO2e_of_N2O = CO2e_of_N2O;
    payload.CO2e_of_other = CO2e_of_other;
    payload.eeio = true;
    await BusinessUnitActivity.create(payload);
    return res.status(200).json({ message: "Activity created sucessfully" });
  } catch (error) {
    console.log("Could not createBusinessUnitActivity -> createEeioActivity");
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const updateEeioActivityById = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      productOrIndustry,
      level1,
      businessUnitId,
      level2,
      level3,
      level4,
      level5,
      sector,
      unitOfMeasurement,
      quantity,
      month,
      // year,
    } = req.body;
    const businessUnit = await BusinessUnit.findByPk(businessUnitId);
    const payload = {
      userId: req.user.id,
      scope: "Scope 3",
      productOrIndustry,
      level1,
      businessUnitId,
      level2,
      level3,
      level4,
      level5,
      sector,
      unitOfMeasurement,
      quantity,
      month,
      // year,
    };
    payload.continent = businessUnit.continent;
    payload.country = businessUnit.country;
    let eeioRecords = await Eeio.findAll({
      where: {
        productOrIndustry,
        level1,
        level2,
        level3,
        level4,
        level5,
        sector,
        continent: payload.continent,
        country: payload.country,
      },
    });
    // If eeio records not found for given continent and country
    if (eeioRecords.length === 0) {
      const countryMaskRecord = await CountryMask.findOne({
        where: {
          continent: payload.continent,
          country: payload.country,
        },
      });
      // Find eeio records for given countryMask
      eeioRecords = await Eeio.findAll({
        where: {
          productOrIndustry,
          level1,
          level2,
          level3,
          level4,
          level5,
          sector,
          continent: countryMaskRecord.continent,
          country: countryMaskRecord.countryMask,
        },
      });
    }
    let CO2e = "";
    let CO2e_of_CO2 = "";
    let CO2e_of_CH4 = "";
    let CO2e_of_N2O = "";
    let CO2e_of_other = "";
    const greenHouseGasValues = [
      "kg CO2e",
      "kg CO2e of CO2",
      "kg CO2e of CH4",
      "kg CO2e of N2O",
      "kg CO2e of Other",
    ];
    eeioRecords.forEach((eeioRecord) => {
      if (eeioRecord.greenHouseGas === greenHouseGasValues[0]) {
        CO2e = eeioRecord.greenHouseGasEmissionFactor * quantity;
      } else if (eeioRecord.greenHouseGas === greenHouseGasValues[1]) {
        CO2e_of_CO2 = eeioRecord.greenHouseGasEmissionFactor * quantity;
      } else if (eeioRecord.greenHouseGas === greenHouseGasValues[2]) {
        CO2e_of_CH4 = eeioRecord.greenHouseGasEmissionFactor * quantity;
      } else if (eeioRecord.greenHouseGas === greenHouseGasValues[3]) {
        CO2e_of_N2O = eeioRecord.greenHouseGasEmissionFactor * quantity;
      } else if (eeioRecord.greenHouseGas === greenHouseGasValues[4]) {
        CO2e_of_other = eeioRecord.greenHouseGasEmissionFactor * quantity;
      }
    });
    payload.exioBaseCode = eeioRecords[0].exioBaseCode;
    payload.reference = eeioRecords[0].reference;
    payload.CO2e = CO2e;
    payload.CO2e_of_CO2 = CO2e_of_CO2;
    payload.CO2e_of_CH4 = CO2e_of_CH4;
    payload.CO2e_of_N2O = CO2e_of_N2O;
    payload.CO2e_of_other = CO2e_of_other;
    await BusinessUnitActivity.update(payload, {
      where: {
        id,
      },
    });
    return res.status(200).json({ message: "Activity created sucessfully" });
  } catch (error) {
    console.log(
      "Could not updateBusinessUnitActivity -> updateEeioActivityById"
    );
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const createReitActivity = async (req, res) => {
  try {
    const {
      businessUnitId,
      continent,
      country,
      region,
      assetType,
      year,
      unitOfMeasurement,
      quantity,
    } = req.body;
    const reitRecord = await Reit.findOne({
      where: {
        continent,
        country,
        region,
        assetType,
        year,
        unitOfMeasurement,
      },
    });
    if (reitRecord === null) {
      return res
        .status(404)
        .json({ error: "Reit record not found for given data" });
    }
    const payload = {
      userId: req.user.id,
      businessUnitId,
      scope: "Scope 3",
      unitOfMeasurement,
      quantity,
      continent,
      country,
      region,
      assetType,
      year,
      unitOfMeasurement,
      CO2e: reitRecord.greenHouseGasEmissionFactor * quantity,
      reit: true,
    };
    await BusinessUnitActivity.create(payload);
    return res
      .status(200)
      .json({ message: "Reit activity created sucessfully" });
  } catch (error) {
    console.log("Could not createReit");
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const updateReitActivityById = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      businessUnitId,
      continent,
      country,
      region,
      assetType,
      year,
      unitOfMeasurement,
      quantity,
    } = req.body;
    const reitRecord = await Reit.findOne({
      where: {
        continent,
        country,
        region,
        assetType,
        year,
        unitOfMeasurement,
      },
    });
    if (reitRecord === null) {
      return res
        .status(404)
        .json({ error: "Reit record not found for given data" });
    }
    const payload = {
      userId: req.user.id,
      businessUnitId,
      scope: "Scope 3",
      unitOfMeasurement,
      quantity,
      continent,
      country,
      region,
      assetType,
      year,
      unitOfMeasurement,
      CO2e: reitRecord.greenHouseGasEmissionFactor * quantity,
      reit: true,
    };
    await BusinessUnitActivity.update(payload, { where: { id } });
    return res
      .status(200)
      .json({ message: "Reit activity updated sucessfully" });
  } catch (error) {
    console.log("Could not updateReitActivityById");
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export {
  createActivity,
  createEeioActivity,
  updateEeioActivityById,
  updateActivityById,
  createReitActivity,
  updateReitActivityById,
};
