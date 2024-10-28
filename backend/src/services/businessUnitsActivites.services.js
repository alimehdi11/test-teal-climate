import { Eeio } from "../models/eeio.model.js";
import { CountryMask } from "../models/countryMask.model.js";
import { BusinessUnitActivity } from "../models/businessUnitActivity.model.js";
import { BusinessUnit } from "../models/businessUnit.model.js";
import { Reit } from "../models/reit.model.js";
import { Activity } from "../models/activity.model.js";
import { ElectricVehicle } from "../models/electricVehicle.model.js";
import { Period } from "../models/period.model.js";

const calculateActivityGHGEmissions = (
  records,
  payload,
  totalElectricityConsumption
) => {
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
      if (totalElectricityConsumption) {
        CO2e = record.greenHouseGasEmissionFactor * totalElectricityConsumption;
      } else {
        CO2e = record.greenHouseGasEmissionFactor * payload.quantity;
      }
    } else if (record.greenHouseGas === greenHouseGasValues[1]) {
      if (totalElectricityConsumption) {
        CO2e_of_CO2 =
          record.greenHouseGasEmissionFactor * totalElectricityConsumption;
      } else {
        CO2e_of_CO2 = record.greenHouseGasEmissionFactor * payload.quantity;
      }
    } else if (record.greenHouseGas === greenHouseGasValues[2]) {
      if (totalElectricityConsumption) {
        CO2e_of_CH4 =
          record.greenHouseGasEmissionFactor * totalElectricityConsumption;
      } else {
        CO2e_of_CH4 = record.greenHouseGasEmissionFactor * payload.quantity;
      }
    } else if (record.greenHouseGas === greenHouseGasValues[3]) {
      if (totalElectricityConsumption) {
        CO2e_of_N2O =
          record.greenHouseGasEmissionFactor * totalElectricityConsumption;
      } else {
        CO2e_of_N2O = record.greenHouseGasEmissionFactor * payload.quantity;
      }
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

const handleScope2MarketBased = async (payload, res) => {
  let activityRecord;
  let CO2e;
  let businessUnitRecord;
  let country;
  let region;
  let emissionFactor;
  let locationBasedQuantity = payload.quantity;
  let marketBasedQuantity = payload.marketBasedQuantity;
  let marketBasedEmissionFactor = payload.marketBasedEmissionFactor;
  const { scope, level1, level2, level3, level4, unitOfMeasurement } = payload;
  switch (level1) {
    case "Heat and steam":
      activityRecord = await Activity.findOne({
        where: {
          scope,
          level1,
          level2,
          ...(level1 === "Heat and steam" && { level3 }),
          ...(level1 === "Heat and steam" && { level4 }),
          // level5, ==> removing delibratly
          // unitOfMeasurement, ==> removing delibratly
        },
      });
      if (!activityRecord) {
        return res
          .status(404)
          .json({ success: false, error: "No data found for marketBased" });
      }
      // Market based emissions = ((Location based quantity - Market based quantity) x Emission factor) + (Market based quantity x Market based emission factor)
      emissionFactor = activityRecord.greenHouseGasEmissionFactor;
      CO2e =
        (locationBasedQuantity - marketBasedQuantity) * emissionFactor +
        marketBasedQuantity * marketBasedEmissionFactor;
      break;
    case "Electricity":
      businessUnitRecord = await BusinessUnit.findOne({
        where: { id: payload.businessUnitId },
      });
      country = businessUnitRecord.country;
      region = businessUnitRecord.region;
      activityRecord = await Activity.findOne({
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
      if (!activityRecord) {
        return res.status(404).json({
          success: false,
          error: "No electricity emission factor found for the country/region",
        });
      }
      emissionFactor = activityRecord.greenHouseGasEmissionFactor;
      CO2e =
        (locationBasedQuantity - marketBasedQuantity) * emissionFactor +
        marketBasedQuantity * marketBasedEmissionFactor;
      break;
    case "Passenger Evs":
    case "Delivery Evs":
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
      businessUnitRecord = await BusinessUnit.findOne({
        where: { id: payload.businessUnitId },
      });
      country = businessUnitRecord.country;
      region = businessUnitRecord.region;
      activityRecord = await Activity.findOne({
        where: {
          scope,
          level1: "Electricity",
          level2: "Electricity generated",
          level3: country,
          level4: region,
          // level5, ==> excluding deliberately
          unitOfMeasurement: "kWh",
        },
      });
      if (!activityRecord) {
        return res.status(404).json({
          success: false,
          error: "No electricity emission factor found for the country/region",
        });
      }
      emissionFactor = activityRecord.greenHouseGasEmissionFactor;
      const locationBasedEVConsumption =
        locationBasedQuantity *
        electricVehicleRecord.electricityConsumptionPerUnit;
      const marketBasedEVConsumption =
        marketBasedQuantity *
        electricVehicleRecord.electricityConsumptionPerUnit;
      // Market based emissions = ((Location based consumption - Market based consumption) x Emission factor)+ (Market based consumption x Market based emission factor)
      CO2e =
        (locationBasedEVConsumption - marketBasedEVConsumption) *
          emissionFactor +
        marketBasedEVConsumption * marketBasedEmissionFactor;
      break;
  }
  await BusinessUnitActivity.create({ ...payload, CO2e });
  return res.status(200).json({ message: "Activity created sucessfully" });
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
      marketBasedQuantity, // This will only availabe for "Scope 2"-"marketBased"
      marketBasedEmissionFactor, // This will only availabe for "Scope 2"-"marketBased"
      marketBasedUnitOfEmissionFactor, // This will only availabe for "Scope 2"-"marketBased"
    } = req.body;
    // console.log({
    //   scope,
    //   level1,
    //   month,
    //   businessUnitId,
    //   level1Category,
    //   level2,
    //   level3,
    //   level4,
    //   level5,
    //   unitOfMeasurement,
    //   quantity,
    //   marketBasedQuantity,
    //   marketBasedEmissionFactor,
    //   marketBasedUnitOfEmissionFactor,
    // });
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
      marketBasedQuantity,
      marketBasedEmissionFactor,
      marketBasedUnitOfEmissionFactor,
    };
    if (scope === "Scope 2" && level5 === "marketBased") {
      return handleScope2MarketBased(payload, res);
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
      const totalElectricityConsumption =
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
          // level5, ==> excluding deliberately
          unitOfMeasurement: "kWh",
        },
      });
      payload = calculateActivityGHGEmissions(
        activityRecords,
        payload,
        totalElectricityConsumption
      );
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
      // return res.status(200).json(payload);
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
    } else if (
      scope === "Scope 3" &&
      (level1 === "Electricity TandD for passenger EVs" ||
        level1 === "Electricity TandD for delivery Evs")
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
      if (!electricVehicleRecord) {
        return res
          .status(404)
          .json({ error: "Electric vehicle record not found" });
      }
      const totalElectricityConsumption =
        payload.quantity * electricVehicleRecord.electricityConsumptionPerUnit;
      const businessUnitRecord = await BusinessUnit.findOne({
        where: { id: businessUnitId },
      });
      const { country, region } = businessUnitRecord;
      const activityRecords = await Activity.findAll({
        where: {
          scope,
          level1: "Electricity",
          level2: "Electricity T&D",
          level3: country,
          level4: region,
          // level5, ==> excluding deliberately
          unitOfMeasurement: "kWh",
        },
      });
      payload = calculateActivityGHGEmissions(
        activityRecords,
        payload,
        totalElectricityConsumption
      );
    } else {
      const activityRecords = await Activity.findAll({
        where: {
          scope,
          level1,
          level2,
          level3,
          level4,
          // level5, ==> removing delibratly
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
      marketBasedQuantity, // This will only availabe for "Scope 2"-"marketBased"
      marketBasedEmissionFactor, // This will only availabe for "Scope 2"-"marketBased"
      marketBasedUnitOfEmissionFactor, // This will only availabe for "Scope 2"-"marketBased"
    } = req.body;
    // console.log({
    //   scope,
    //   level1,
    //   month,
    //   businessUnitId,
    //   level1Category,
    //   level2,
    //   level3,
    //   level4,
    //   level5,
    //   unitOfMeasurement,
    //   quantity,
    //   marketBasedQuantity,
    //   marketBasedEmissionFactor,
    //   marketBasedUnitOfEmissionFactor,
    // });
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
      marketBasedQuantity,
      marketBasedEmissionFactor,
    };
    if (scope === "Scope 2" && level5 === "marketBased") {
      const activityRecord = await Activity.findOne({
        where: {
          scope,
          level1,
          level2,
          level3,
          level4,
          // level5, ==> removing delibratly
          // unitOfMeasurement, ==> removing delibratly
        },
      });
      if (!activityRecord) {
        return res
          .status(400)
          .json({ success: false, error: "No data found for marketBased" });
      }
      // Market based emissions = ((Location based quantity - Market based quantity) x Location based emission factor) + (Market based quantity x Market based emission factor)
      const CO2e =
        (quantity - marketBasedQuantity) *
          activityRecord.greenHouseGasEmissionFactor +
        marketBasedQuantity * marketBasedEmissionFactor;
      payload.unitOfMeasurement = marketBasedUnitOfEmissionFactor;
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
          // level5, ==> removing delibratly
          unitOfMeasurement,
        },
      });
      payload = calculateActivityGHGEmissions(activityRecords, payload);
      console.log(payload);
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
      month,
      businessUnitId,
      level1,
      sector,
      quantity,
    } = req.body;
    const businessUnit = await BusinessUnit.findByPk(businessUnitId);
    const payload = {
      userId: req.user.id,
      scope: "Scope 3",
      productOrIndustry,
      level1,
      businessUnitId,
      sector,
      quantity,
      month,
    };
    payload.continent = businessUnit.continent;
    payload.country = businessUnit.country;
    // return res.status(200).json(payload);
    let eeioRecords;
    eeioRecords = await Eeio.findAll({
      where: {
        productOrIndustry,
        level1,
        sector,
        continent: payload.continent,
        country: payload.country,
      },
    });
    // return res.status(200).json(eeioRecords);

    // If eeio records not found for given continent and country
    if (eeioRecords.length === 0) {
      const countryMaskRecord = await CountryMask.findOne({
        where: {
          continent: payload.continent,
          country: payload.country,
        },
      });
      // return res.status(200).json(countryMaskRecord);
      // Find eeio records for given countryMask
      eeioRecords = await Eeio.findAll({
        where: {
          productOrIndustry,
          level1,
          sector,
          continent: countryMaskRecord.continent,
          country: countryMaskRecord.countryMask,
        },
      });
      if (eeioRecords.length === 0) {
        return res
          .status(404)
          .json({ error: "Eeio record not found for given data" });
      }
      // return res.status(200).json({
      //   productOrIndustry,
      //   level1,
      //   sector,
      //   continent: countryMaskRecord.continent,
      //   country: countryMaskRecord.countryMask,
      // });
    }
    let CO2e = 0;
    let CO2e_of_CO2 = 0;
    let CO2e_of_CH4 = 0;
    let CO2e_of_N2O = 0;
    let CO2e_of_other = 0;
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
    payload.CO2e = CO2e;
    payload.CO2e_of_CO2 = CO2e_of_CO2;
    payload.CO2e_of_CH4 = CO2e_of_CH4;
    payload.CO2e_of_N2O = CO2e_of_N2O;
    payload.CO2e_of_other = CO2e_of_other;
    payload.unitOfMeasurement = ""; // TODO : Ask sir or sohail about it.
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
      sector,
      quantity,
      month,
    } = req.body;
    const businessUnit = await BusinessUnit.findByPk(businessUnitId);
    const payload = {
      userId: req.user.id,
      scope: "Scope 3",
      productOrIndustry,
      level1,
      businessUnitId,
      sector,
      quantity,
      month,
    };
    payload.continent = businessUnit.continent;
    payload.country = businessUnit.country;
    let eeioRecords = await Eeio.findAll({
      where: {
        productOrIndustry,
        level1,
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
          sector,
          continent: countryMaskRecord.continent,
          country: countryMaskRecord.countryMask,
        },
      });
    }
    let CO2e = 0;
    let CO2e_of_CO2 = 0;
    let CO2e_of_CH4 = 0;
    let CO2e_of_N2O = 0;
    let CO2e_of_other = 0;
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
    return res.status(200).json({ message: "Activity updated sucessfully" });
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
      country,
      stateOrRegion,
      assetClass,
      year,
      unitOfMeasurement,
      quantity,
    } = req.body;
    const reitRecord = await Reit.findOne({
      where: {
        country,
        stateOrRegion,
        assetClass,
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
      level1Category: "Investments",
      unitOfMeasurement,
      quantity: Number(quantity),
      country,
      stateOrRegion,
      assetClass,
      year,
      unitOfMeasurement,
      reit: true,
    };
    const businessUnit = await BusinessUnit.findByPk(businessUnitId, {
      include: {
        model: Period,
        as: "period",
      },
    });
    const { period } = businessUnit.period;
    const [startPeriodDate, endPeriodDate] = period.split(" - ");
    const startDate = new Date(startPeriodDate);
    const endDate = new Date(endPeriodDate);
    const differenceInTime = endDate - startDate;
    const millisecondsPerDay = 1000 * 60 * 60 * 24;
    const differenceInDays = differenceInTime / millisecondsPerDay;
    // REIT emission = (emission factor / 365) x (period end date - period start date) x quantity in m2
    const CO2e =
      (reitRecord.greenHouseGasEmissionFactor / 365) *
      differenceInDays *
      payload.quantity;
    payload.CO2e = CO2e;
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
      country,
      stateOrRegion,
      assetClass,
      year,
      unitOfMeasurement,
      quantity,
    } = req.body;
    const reitRecord = await Reit.findOne({
      where: {
        country,
        stateOrRegion,
        assetClass,
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
      country,
      stateOrRegion,
      assetClass,
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
