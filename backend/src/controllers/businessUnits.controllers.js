import { BusinessUnit } from "./../models/businessUnit.model.js";

const createBusinessUnit = async (req, res) => {
  try {
    const {
      // userId, // This is not needed to create businessunit because userId will be get from "req" object the user who is loggedIn
      title, // Correct frontend property to match this property name (unit -> businessUnitName)
      continent,
      country,
      region,
      noOfEmployees, // Correct frontend property to match this property name (employees -> noOfEmployees)
      production,
      revenue,
      partnership,
      notes,
    } = req.body;
    await BusinessUnit.create({
      userId: req.user.id,
      title,
      country,
      continent,
      region,
      noOfEmployees,
      production,
      revenue,
      notes,
      partnership,
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
      // userId, // This is not needed to update businessunit because userId will never change
      businessUnitName, // Correct frontend property to match this property name (unit -> businessUnitName)
      continent,
      country,
      region,
      noOfEmployees, // Correct frontend property to match this property name (employees -> noOfEmployees)
      production,
      revenue,
      partnership,
      notes,
    } = req.body;
    await BusinessUnit.update(
      {
        // userId, // Do not send from frontend -> This is not needed to update businessunit because userId will never change
        businessUnitName,
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
