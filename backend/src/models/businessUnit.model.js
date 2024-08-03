import { DataTypes, Deferrable } from "sequelize";
import { sequelize } from "../database/connectDb.js";
import { User } from "./user.model.js";
import { Country } from "./country.model.js";

const BusinessUnit = sequelize.define(
  "BusinessUnit",
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: "userId",
      references: {
        model: User,
        key: "id",
        deferrable: Deferrable.INITIALLY_IMMEDIATE,
      },
    },
    businessUnitName: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    country: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    continent: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    region: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    noOfEmployees: {
      type: DataTypes.STRING,
    },
    production: {
      type: DataTypes.STRING,
    },
    revenue: {
      type: DataTypes.INTEGER,
    },
    notes: {
      type: DataTypes.STRING,
    },
    partnership: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    tableName: "businessUnits",
  }
);

export { BusinessUnit };
