import { DataTypes } from "sequelize";
import { sequelize } from "../database/connectDb.js";

const CountryMask = sequelize.define(
  "CountryMask",
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    continent: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    country: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    region: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    countryMask: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    tableName: "countriesMasks",
  }
);

export { CountryMask };
