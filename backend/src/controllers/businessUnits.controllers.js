import { Period } from "../models/period.model.js";
import { BusinessUnit } from "./../models/businessUnit.model.js";

const createBusinessUnit = async (req, res) => {
  try {
    const {
      title,
      continent,
      country,
      region,
      revenue,
      noOfEmployees,
      production,
      partnership,
      notes,
      periodId,
    } = req.body;
    if (!periodId) {
      return res.status(400).json({ error: "Please add period first" })
    }
    await BusinessUnit.create({
      userId: req.user.id,
      title,
      continent,
      country,
      region,
      revenue: Number(revenue),
      noOfEmployees: Number(noOfEmployees),
      production: Number(production),
      partnership,
      notes,
      periodId,
    });
    return res
      .status(200)
      .json({ message: "Business unit created successfully" });
  } catch (error) {
    if (error.name === "SequelizeUniqueConstraintError") {
      if (
        error.parent.constraint === "businessUnits_userId_title_periodId_key"
      ) {
        return res.status(400).json({
          error: "Businessunits title must be unique within period",
        });
      }
    }
    console.log("Could not createBusinessUnit");
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const getBusinessUnitById = async (req, res) => {
  try {
    const { id } = req.params;
    const businessUnit = await BusinessUnit.findByPk(id);
    return res.status(200).json(businessUnit);
  } catch (error) {
    console.log("Could not getBusinessUnitById");
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const updateBusinessUnitById = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      title,
      continent,
      country,
      region,
      noOfEmployees,
      production,
      revenue,
      partnership,
      notes,
      period,
    } = req.body;
    await BusinessUnit.update(
      {
        title,
        country,
        continent,
        region,
        noOfEmployees,
        production,
        revenue,
        notes,
        partnership,
        period,
      },
      {
        where: {
          id,
        },
      }
    );
    return res
      .status(200)
      .json({ message: "Businessunit updated successfully" });
  } catch (error) {
    if (error.name === "SequelizeUniqueConstraintError") {
      if (error.parent.constraint === "businessUnits_userId_title_period_key") {
        return res.status(400).json({
          error: "Businessunits title must be unique for each period.",
        });
      }
    }
    console.log("Could not updateBusinessUnitById");
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const deleteBusinessUnitById = async (req, res) => {
  try {
    const { id } = req.params;
    await BusinessUnit.destroy({
      where: {
        id,
      },
    });
    return res
      .status(200)
      .json({ message: "Businessunit deleted successfully" });
  } catch (error) {
    console.log("Could not deleteBusinessUnitById");
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const getAllBusinessUnits = async (req, res) => {
  try {
    const userId = req.user.id;
    const { periodId } = req.query;
    const query = {
      where: {
        userId,
        ...(periodId && { periodId }),
      },
      include: [
        {
          model: Period,
          as: "period",
        },
      ],
      attributes: { exclude: ["periodId"] },
    };
    const businessUnits = await BusinessUnit.findAll(query);
    return res.status(200).json({
      data: businessUnits,
    });
  } catch (error) {
    console.log("Could not getAllBusinessUnits");
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export {
  createBusinessUnit,
  getBusinessUnitById,
  updateBusinessUnitById,
  deleteBusinessUnitById,
  getAllBusinessUnits,
};
