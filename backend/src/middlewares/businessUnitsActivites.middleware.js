import { BusinessUnit } from "../models/businessUnit.model.js";
import { BusinessUnitActivity } from "../models/businessUnitActivity.model.js";

const isBusinessUnitActivityOwner = async (req, res, next) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    const activity = await BusinessUnitActivity.findOne({
      where: { id },
    });

    if (!activity) {
      return res.status(404).json({
        message: "Activity not found",
      });
    }

    if (activity.userId !== userId) {
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

const isbusinessUnitIdBelongsToUser = async (req, res, next) => {
  // Verify that the businessUnitId belongs to the user making the request
  try {
    const { businessUnitId } = req.body;

    const businessUnit = await BusinessUnit.findOne({
      where: {
        id: businessUnitId,
        userId: req.user.id,
      },
    });

    if (!businessUnit) {
      return res.status(400).json({
        error: `Business unit with ID ${businessUnitId} not found or does not belong to you`,
      });
    }

    return next();
  } catch (error) {
    console.log("Could not isbusinessUnitIdBelongsToUser");
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export { isBusinessUnitActivityOwner, isbusinessUnitIdBelongsToUser };
