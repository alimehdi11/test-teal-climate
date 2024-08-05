import { BusinessUnit } from "../models/businessUnit.model.js";

const isBusinessUnitOwner = async (req, res, next) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    const businessUnit = await BusinessUnit.findOne({
      where: { id },
    });

    if (!businessUnit) {
      return res.status(404).json({
        message: "BusinessUnit not found",
      });
    }

    if (businessUnit.userId !== userId) {
      return res.status(401).json({
        message: "You are not authorized",
      });
    }

    return next();
  } catch (error) {
    console.log("Could not isBusinessUnitActivityOwner");
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export { isBusinessUnitOwner };
