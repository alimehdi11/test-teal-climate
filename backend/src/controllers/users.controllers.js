import { BusinessUnit } from "../models/businessUnit.model.js";
import { BusinessUnitActivity } from "../models/businessUnitActivity.model.js";
import { User } from "../models/user.model.js";

const getBusinessUnitsByUserId = async (req, res) => {
  try {
    const { userId } = req.params;
    const userBusinessUnits = await BusinessUnit.findAll({
      where: {
        userId,
      },
    });
    return res.status(200).json(userBusinessUnits);
  } catch (error) {
    console.log("Could not getBusinessUnitsByUserId");
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const getBusinessUnitsActivitiesByUserId = async (req, res) => {
  try {
    const { userId } = req.params;

    const { sortOrder = "ASC", limit, sortByColumn = "createdAt" } = req.query;

    const queryOptions = {
      where: {
        userId,
      },
      include: [
        {
          model: BusinessUnit,
          as: "businessUnit",
        },
      ],
      order: [[sortByColumn, sortOrder]],
    };

    if (limit) {
      queryOptions.limit = parseInt(limit, 10);
    }

    let userBusinessUnitsActivities =
      await BusinessUnitActivity.findAll(queryOptions);
    userBusinessUnitsActivities = userBusinessUnitsActivities.map(
      (userBusinessUnitActivity) => {
        userBusinessUnitActivity = userBusinessUnitActivity.toJSON();
        // Removing businessUnitId field which is extra
        delete userBusinessUnitActivity.businessUnitId;
        return userBusinessUnitActivity;
      }
    );
    return res.status(200).json(userBusinessUnitsActivities);
  } catch (error) {
    console.log("Could not getBusinessUnitsActivitiesByUserId");
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const updateUserbyId = async (req, res) => {
  try {
    console.log("updateUserById");
    const { id } = req.params;
    const {
      companyName,
      country,
      primaryIndustry,
      secondaryIndustry,
      sustainabilityManager,
      phoneNumber,
    } = req.body;
    const user = await User.findOne({ where: { id } });
    if (user) {
      user.companyName = companyName;
      user.country = country;
      user.primaryIndustry = primaryIndustry;
      user.secondaryIndustry = secondaryIndustry;
      user.sustainabilityManager = sustainabilityManager;
      user.phoneNumber = phoneNumber;
      await user.save();
      return res.status(200).json({ message: "User updated successfully" });
    } else {
      return res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    console.log("Could not updateUserbyId");
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const getUserbyId = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findOne({
      where: { id },
      attributes: [
        "email",
        "country",
        "companyName",
        "phoneNumber",
        "primaryIndustry",
        "secondaryIndustry",
        "sustainabilityManager",
      ],
    });
    if (user) {
      return res.status(200).json(user);
    } else {
      return res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    console.log("Could not getUserbyId");
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export {
  getBusinessUnitsByUserId,
  getBusinessUnitsActivitiesByUserId,
  updateUserbyId,
  getUserbyId,
};
