import { BusinessUnit } from "../models/businessUnit.model.js";
import { BusinessUnitActivity } from "../models/businessUnitActivity.model.js";
import { CountryMask } from "../models/countryMask.model.js";
import { Eeio } from "../models/eeio.model.js";
import {
  createActivity,
  createEeioActivity,
} from "../services/businessUnitsActivites.services.js";

const createBusinessUnitActivity = async (req, res) => {
  if (req.query.eeio === "true") {
    await createEeioActivity(req, res);
  } else {
    await createActivity(req, res);
  }
};

const getBusinessUnitActivityById = async (req, res) => {
  try {
    const { id } = req.params;
    let businessUnitActivity = await BusinessUnitActivity.findOne({
      where: {
        id,
      },
      include: [
        {
          model: BusinessUnit,
          as: "businessUnit",
        },
      ],
    });
    businessUnitActivity = businessUnitActivity.toJSON();
    // Removing businessUnitId field which is extra
    delete businessUnitActivity.businessUnitId;
    return res.status(200).json(businessUnitActivity);
  } catch (error) {
    console.log("Could not getBusinessUnitActivityById");
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const updateBusinessUnitActivityById = async (req, res) => {
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
    console.log("Could not updateBusinessUnitActivityById");
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const deleteBusinessUnitActivityById = async (req, res) => {
  try {
    const { id } = req.params;
    await BusinessUnitActivity.destroy({
      where: {
        id,
      },
    });
    return res.status(200).json({ message: "Activity deleted successfully" });
  } catch (error) {
    console.log("Could not deleteBusinessUnitActivityById");
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export {
  createBusinessUnitActivity,
  getBusinessUnitActivityById,
  updateBusinessUnitActivityById,
  deleteBusinessUnitActivityById,
};
