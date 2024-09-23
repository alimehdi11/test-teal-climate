import { BusinessUnit } from "../models/businessUnit.model.js";
import { BusinessUnitActivity } from "../models/businessUnitActivity.model.js";
import {
  createActivity,
  createEeioActivity,
  updateEeioActivityById,
  updateActivityById,
  createReitActivity,
  updateReitActivityById,
} from "../services/businessUnitsActivites.services.js";

const createBusinessUnitActivity = async (req, res) => {
  if (req.query.eeio === "true") {
    await createEeioActivity(req, res);
  } else if (req.query.reit === "true") {
    await createReitActivity(req, res);
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
  if (req.query.eeio === "true") {
    await updateEeioActivityById(req, res);
  } else if (req.query.reit === "true") {
    await updateReitActivityById(req, res);
  } else {
    await updateActivityById(req, res);
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
