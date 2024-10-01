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
    assetType: {
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
    greenHouseGas: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    greenHouseGasEmissionFactor: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    averageTemprature: {
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
