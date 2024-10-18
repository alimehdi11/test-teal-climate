import { DataTypes } from "sequelize";
import { sequelize } from "../database/connectDb.js";

const Eeio = sequelize.define(
  "Eeio",
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    countryCode: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    country: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    continent: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    productOrIndustry: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    level1: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    // level2: {
    //   type: DataTypes.STRING,
    //   allowNull: false,
    // },
    // level3: {
    //   type: DataTypes.STRING,
    //   allowNull: false,
    // },
    // level4: {
    //   type: DataTypes.STRING,
    //   allowNull: false,
    // },
    // level5: {
    //   type: DataTypes.STRING,
    //   allowNull: false,
    // },
    sector: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    uniqueCode: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    greenHouseGas: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    // perEuro: {
    //   type: DataTypes.FLOAT,
    //   allowNull: false,
    // },
    greenHouseGasEmissionFactor: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    // reference: {
    //   type: DataTypes.STRING,
    //   allowNull: false,
    // },
  },
  {
    timestamps: false,
    tableName: "eeios",
  }
);

export { Eeio };
