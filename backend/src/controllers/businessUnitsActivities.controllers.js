import { sequelize } from "../database/connectDb.js";
import { BusinessUnit } from "../models/businessUnit.model.js";
import { BusinessUnitActivity } from "../models/businessUnitActivity.model.js";
import { Period } from "../models/period.model.js";
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
          include: [
            {
              model: Period,
              as: "period",
            },
          ],
          attributes: { exclude: ["periodId"] },
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

const getAllBusinessUnitsActivities = async (req, res) => {
  try {
    const userId = req.user.id;
    const { sortOrder = "ASC", limit, sortByColumn = "createdAt" } = req.query;
    const query = {
      where: {
        userId,
      },
      include: [
        {
          model: BusinessUnit,
          as: "businessUnit",
          include: [
            {
              model: Period,
              as: "period",
            },
          ],
          attributes: { exclude: ["periodId"] },
        },
      ],
      attributes: { exclude: ["businessUnitId"] },
      order: [[sortByColumn, sortOrder]],
    };
    if (limit) {
      query.limit = parseInt(limit, 10);
    }
    let businessUnitsActivities = await BusinessUnitActivity.findAll(query);
    return res.status(200).json({ data: businessUnitsActivities });
  } catch (error) {
    console.log("Could not getAllBusinessUnitsActivities");
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const getTop5BusinessUnitsEmissions = async (req, res) => {
  try {
    const userId = req.user.id;
    const { periodId } = req.query;
    const query = {
      where: {
        userId,
        ...(periodId && { "$businessUnit.period.id$": periodId }),
      },
      attributes: [
        "businessUnitId",
        [sequelize.fn("SUM", sequelize.col("CO2e")), "totalEmissions"],
      ],
      include: [
        {
          model: BusinessUnit,
          as: "businessUnit",
          include: [
            {
              model: Period,
              as: "period",
            },
          ],
        },
      ],
      group: [
        "businessUnitId",
        "businessUnit.id",
        "businessUnit.userId",
        "businessUnit.title",
        "businessUnit.country",
        "businessUnit.continent",
        "businessUnit.region",
        "businessUnit.noOfEmployees",
        "businessUnit.production",
        "businessUnit.revenue",
        "businessUnit.notes",
        "businessUnit.partnership",
        "businessUnit.periodId",
        "businessUnit.createdAt",
        "businessUnit.updatedAt",
        "businessUnit->period.id",
        "businessUnit->period.period",
        "businessUnit->period.userId",
        "businessUnit->period.createdAt",
        "businessUnit->period.updatedAt",
      ],
      order: [[sequelize.col("totalEmissions"), "DESC"]],
      limit: 5, // Top 5 business units by total emissions
    };
    const businessUnitsActivities = await BusinessUnitActivity.findAll(query);
    return res.status(200).json({ data: businessUnitsActivities });
  } catch (error) {
    console.log("Could not getTop5BusinessUnitsEmissions");
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export {
  createBusinessUnitActivity,
  getBusinessUnitActivityById,
  updateBusinessUnitActivityById,
  deleteBusinessUnitActivityById,
  getAllBusinessUnitsActivities,
  getTop5BusinessUnitsEmissions,
};
