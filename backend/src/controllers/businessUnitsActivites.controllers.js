import { BusinessUnit } from "../models/businessUnit.model.js";
import { BusinessUnitActivity } from "../models/businessUnitActivity.model.js";
import { Eeio } from "../models/eeio.model.js";

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
    const eeioRecords = await Eeio.findAll({
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
        CO2e = eeioRecord.perEuro * quantity;
      } else if (eeioRecord.greenHouseGas === greenHouseGasValues[1]) {
        CO2e_of_CO2 = eeioRecord.perEuro * quantity;
      } else if (eeioRecord.greenHouseGas === greenHouseGasValues[2]) {
        CO2e_of_CH4 = eeioRecord.perEuro * quantity;
      } else if (eeioRecord.greenHouseGas === greenHouseGasValues[3]) {
        CO2e_of_N2O = eeioRecord.perEuro * quantity;
      } else if (eeioRecord.greenHouseGas === greenHouseGasValues[4]) {
        CO2e_of_other = eeioRecord.perEuro * quantity;
      }
    });
    paylaod.exioBaseCode = eeioRecords[0].exioBaseCode;
    paylaod.reference = eeioRecords[0].reference;
    await BusinessUnitActivity.create(paylaod);
    return res.status(200).json({ message: "Activity created sucessfully" });
  } catch (error) {
    console.log("Could not createEeioActivity");
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const createBusinessUnitActivity = async (req, res) => {
  if (req.query.eeio === "true") {
    await createEeioActivity(req, res);
  } else {
    try {
      const {
        businessUnitId,
        scope,
        level1,
        level2,
        level3,
        level4,
        level5,
        unitOfMeasurement,
        quantity,
        CO2e,
        CO2e_of_CO2,
        CO2e_of_CH4,
        CO2e_of_N2O,
        level1Category,
      } = req.body;

      await BusinessUnitActivity.create({
        userId: req.user.id,
        businessUnitId,
        scope,
        level1,
        level2,
        level3,
        level4,
        level5,
        unitOfMeasurement,
        quantity,
        CO2e,
        CO2e_of_CO2,
        CO2e_of_CH4,
        CO2e_of_N2O,
        level1Category,
      });
      res.status(200).json({ message: "Activity created sucessfully" });
    } catch (error) {
      console.log("Could not createBusinessUnitActivity");
      console.log(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
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
      businessUnitId,
      scope,
      level1,
      level2,
      level3,
      level4,
      level5,
      unitOfMeasurement,
      quantity,
      CO2e,
      CO2e_of_CO2,
      CO2e_of_CH4,
      CO2e_of_N2O,
      level1Category,
    } = req.body;

    await BusinessUnitActivity.update(
      {
        businessUnitId,
        scope,
        level1,
        level2,
        level3,
        level4,
        level5,
        unitOfMeasurement,
        quantity,
        CO2e,
        CO2e_of_CO2,
        CO2e_of_CH4,
        CO2e_of_N2O,
        level1Category,
      },
      { where: { id } }
    );
    res.status(200).json({ message: "Activity updated sucessfully" });
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
