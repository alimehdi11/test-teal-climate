import { Period } from "../models/period.model.js";
import { formatDate } from "../services/periods.services.js";

const createPeriod = async (req, res) => {
  try {
    const { startPeriodDate, endPeriodDate } = req.body;
    const userId = req.user.id;
    const payload = {
      period: formatDate(startPeriodDate) + " - " + formatDate(endPeriodDate),
      userId,
    };
    const period = await Period.create(payload);
    return res.status(200).json({
      message: "Period created successfully",
      data: { id: period.id, period: period.period },
    });
  } catch (error) {
    if (error.name === "SequelizeUniqueConstraintError") {
      if (error.parent.constraint === "periods_period_userId_key") {
        return res.status(400).json({
          error: "Period already exists",
        });
      }
    }
    console.log("Could not createPeriod");
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const getAllPeriods = async (req, res) => {
  try {
    const userId = req.user.id;
    const query = {
      where: { userId },
      attributes: ["id", "period"],
    };
    const periods = await Period.findAll(query);
    return res.status(200).json({
      data: periods,
    });
  } catch (error) {
    console.log("Could not getAllPeriods");
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export { createPeriod, getAllPeriods };
