import { Activity } from "../models/activity.model.js";

const getAllActivities = async (req, res) => {
  try {
    const allActivities = await Activity.findAll({
      attributes: [
        "scope",
        "level1",
        "level2",
        "level3",
        "level4",
        "level5",
        "unitOfMeasurement",
        "greenHouseGas",
      ],
    });
    return res.status(200).json(allActivities);
  } catch (error) {
    console.log("Could not getAllActivites");
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export { getAllActivities };
