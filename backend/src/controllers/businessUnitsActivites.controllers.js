import { BusinessUnit } from "../models/businessUnit.model.js";
import { BusinessUnitActivity } from "../models/businessUnitActivity.model.js";

const createBusinessUnitActivity = async (req, res) => {
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
