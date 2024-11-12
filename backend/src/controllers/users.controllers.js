import { User } from "../models/user.model.js";

const updateUserbyId = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      firstName,
      lastName,
      companyName,
      country,
      primaryIndustry,
      secondaryIndustry,
      sustainabilityManager,
      phoneNumber,
    } = req.body;
    const user = await User.findOne({ where: { id } });
    if (user) {
      user.firstName = firstName;
      user.lastName = lastName;
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

export { updateUserbyId, getUserbyId };
