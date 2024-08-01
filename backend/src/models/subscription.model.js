import { DataTypes } from "sequelize";
import { sequelize } from "../database/connectDb.js";

const Subscription = sequelize.define(
  "Subscription",
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    companyName: {
      type: DataTypes.STRING,
      field: "company_name",
    },
    country: {
      type: DataTypes.STRING,
    },
    primaryIndustry: {
      type: DataTypes.STRING,
      field: "primary_industry",
    },
    secondaryIndustry: {
      type: DataTypes.STRING,
      field: "secondary_industry",
    },
    sustainabilityManager: {
      type: DataTypes.STRING,
      field: "sustainability_manager",
    },
    phoneNumber: {
      type: DataTypes.STRING,
      field: "phone_number",
    },
  },
  {
    timestamps: false,
    tableName: "subscriptions",
  }
);

await Subscription.sync();

export { Subscription };
