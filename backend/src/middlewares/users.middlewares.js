import { User } from "../models/user.model.js";

const isUserExists = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const userExists = await User.findByPk(userId);
    if (!userExists) {
      return res.status(404).json({ message: "User not found" });
    }
    return next();
  } catch (error) {
    console.log("Could not isUserExists");
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export { isUserExists };
