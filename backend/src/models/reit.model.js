import { DataTypes } from "sequelize";
import { sequelize } from "./../database/connectDb.js";

const Reit = sequelize.define(
  "Reit",
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    code: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    country: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    stateOrRegion: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    assetClass: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    year: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    unitOfMeasurement: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    greenHouseGasEmissionFactor: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
  },
  {
    timestamps: false,
    tableName: "reits",
  }
);

export { Reit };
