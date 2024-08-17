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
    } = req.body;
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
    });
    return res
      .status(200)
      .json({ message: "Businessunit created successfully" });
  } catch (error) {
    if (error.name === "SequelizeUniqueConstraintError") {
      if (error.parent.constraint === "businessUnits_userId_title_key") {
        return res.status(400).json({
          error: "Businessunits title must be unique",
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
      if (error.parent.constraint === "businessUnits_userId_title_key") {
        return res.status(400).json({
          error: "Businessunits title must be unique",
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

export {
  createBusinessUnit,
  getBusinessUnitById,
  updateBusinessUnitById,
  deleteBusinessUnitById,
};
