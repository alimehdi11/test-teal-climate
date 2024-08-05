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
    let userBusinessUnitsActivities = await BusinessUnitActivity.findAll({
      where: {
        userId,
      },
      include: [
        {
          model: BusinessUnit,
          as: "businessUnit",
        },
      ],
    });
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

const getTop10EmissionsByUserId = async (req, res) => {
  try {
    const { userId } = req.params;
    const top10BusinessUnitsActivities = await BusinessUnitActivity.findAll({
      where: {
        userId,
      },
      order: [["CO2e", "DESC"]],
      limit: 10,
    });
    return res.status(200).json(top10BusinessUnitsActivities);
  } catch (error) {
    console.log("Could not getTop10EmissionsByUserId");
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const updateUserbyId = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      companyName,
      country,
      primaryIndustry,
      secondaryIndustry,
      sustainabilityManager,
      phoneNumber,
    } = req.body;
    await User.update(
      {
        companyName,
        country,
        primaryIndustry,
        secondaryIndustry,
        sustainabilityManager,
        phoneNumber,
      },
      { where: { id } }
    );
    return res.status(200).json({ message: "User updated successfully" });
  } catch (error) {
    console.log("Could not updateUserbyId");
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const getUserbyId = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findOne({ where: { id } });
    return res.status(200).json(user);
  } catch (error) {
    console.log("Could not getUserbyId");
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const getWorldHeatMapDataByUserId = async (req, res) => {
  try {
    const { userId } = req.params;
    const query = `SELECT cd.co2e, c.countries
    FROM companiesdata cd
    JOIN companies c ON cd.businessunit = c.unitname
    WHERE cd.ids = $1
    AND c.userId = $2;
    `;
    const values = [userId, userId];
    pool.query(query, values, (error, result) => {
      if (error) {
        console.error("Error :", error);
        res.status(500).json({ error: "Something went wrong" });
      } else {
        res.status(200).json(result.rows);
      }
    });
  } catch (error) {
    console.log("Could not getWorldHeatMapDataByUserId");
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export {
  getBusinessUnitsByUserId,
  getBusinessUnitsActivitiesByUserId,
  getTop10EmissionsByUserId,
  updateUserbyId,
  getUserbyId,
  getWorldHeatMapDataByUserId,
};
