import { Eeio } from "../models/eeio.model.js";
import { CountryMask } from "../models/countryMask.model.js";
import { BusinessUnitActivity } from "../models/businessUnitActivity.model.js";
import { BusinessUnit } from "../models/businessUnit.model.js";
import { Reit } from "../models/reit.model.js";
import { Activity } from "../models/activity.model.js";

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
    } = req.body;
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
    const payload = {
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
    };
    let CO2e = "";
    let CO2e_of_CO2 = "";
    let CO2e_of_CH4 = "";
    let CO2e_of_N2O = "";
    const greenHouseGasValues = [
      "kg CO2e",
      "kg CO2e of CO2",
      "kg CO2e of CH4",
      "kg CO2e of N2O",
    ];
    activityRecords.forEach((activityRecord) => {
      if (activityRecord.greenHouseGas === greenHouseGasValues[0]) {
        CO2e = activityRecord.greenHouseGasEmissionFactor * quantity;
      } else if (activityRecord.greenHouseGas === greenHouseGasValues[1]) {
        CO2e_of_CO2 = activityRecord.greenHouseGasEmissionFactor * quantity;
      } else if (activityRecord.greenHouseGas === greenHouseGasValues[2]) {
        CO2e_of_CH4 = activityRecord.greenHouseGasEmissionFactor * quantity;
      } else if (activityRecord.greenHouseGas === greenHouseGasValues[3]) {
        CO2e_of_N2O = activityRecord.greenHouseGasEmissionFactor * quantity;
      }
    });
    payload.CO2e = CO2e;
    payload.CO2e_of_CO2 = CO2e_of_CO2;
    payload.CO2e_of_CH4 = CO2e_of_CH4;
    payload.CO2e_of_N2O = CO2e_of_N2O;
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
      unitOfMeasurement,
      businessUnitId,
      quantity,
      scope,
      level1Category,
      level1,
      level2,
      level3,
      level4,
      level5,
      CO2e,
      CO2e_of_CO2,
      CO2e_of_CH4,
      CO2e_of_N2O,
      month,
      // year,
    } = req.body;
    await BusinessUnitActivity.update(
      {
        unitOfMeasurement,
        businessUnitId,
        quantity,
        scope,
        level1Category,
        level1,
        level2,
        level3,
        level4,
        level5,
        CO2e,
        CO2e_of_CO2,
        CO2e_of_CH4,
        CO2e_of_N2O,
        month,
        // year,
      },
      {
        where: {
          id,
        },
      }
    );
    return res.status(200).json({ message: "Activity created sucessfully" });
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
    const paylaod = {
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
    paylaod.continent = businessUnit.continent;
    paylaod.country = businessUnit.country;
    let eeioRecords = await Eeio.findAll({
      where: {
        productOrIndustry,
        level1,
        level2,
        level3,
        level4,
        level5,
        sector,
        continent: paylaod.continent,
        country: paylaod.country,
      },
    });
    // If eeio records not found for given continent and country
    if (eeioRecords.length === 0) {
      const countryMaskRecord = await CountryMask.findOne({
        where: {
          continent: paylaod.continent,
          country: paylaod.country,
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
    paylaod.exioBaseCode = eeioRecords[0].exioBaseCode;
    paylaod.reference = eeioRecords[0].reference;
    paylaod.CO2e = CO2e;
    paylaod.CO2e_of_CO2 = CO2e_of_CO2;
    paylaod.CO2e_of_CH4 = CO2e_of_CH4;
    paylaod.CO2e_of_N2O = CO2e_of_N2O;
    paylaod.CO2e_of_other = CO2e_of_other;
    paylaod.eeio = true;
    await BusinessUnitActivity.create(paylaod);
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
    const paylaod = {
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
    paylaod.continent = businessUnit.continent;
    paylaod.country = businessUnit.country;
    let eeioRecords = await Eeio.findAll({
      where: {
        productOrIndustry,
        level1,
        level2,
        level3,
        level4,
        level5,
        sector,
        continent: paylaod.continent,
        country: paylaod.country,
      },
    });
    // If eeio records not found for given continent and country
    if (eeioRecords.length === 0) {
      const countryMaskRecord = await CountryMask.findOne({
        where: {
          continent: paylaod.continent,
          country: paylaod.country,
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
    paylaod.exioBaseCode = eeioRecords[0].exioBaseCode;
    paylaod.reference = eeioRecords[0].reference;
    paylaod.CO2e = CO2e;
    paylaod.CO2e_of_CO2 = CO2e_of_CO2;
    paylaod.CO2e_of_CH4 = CO2e_of_CH4;
    paylaod.CO2e_of_N2O = CO2e_of_N2O;
    paylaod.CO2e_of_other = CO2e_of_other;
    await BusinessUnitActivity.update(paylaod, {
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
    const paylaod = {
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
    await BusinessUnitActivity.create(paylaod);
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
    const paylaod = {
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
    await BusinessUnitActivity.update(paylaod, { where: { id } });
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
