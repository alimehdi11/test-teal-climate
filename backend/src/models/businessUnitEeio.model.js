import { DataTypes, Deferrable } from "sequelize";
import { sequelize } from "../database/connectDb.js";
import { User } from "./user.model.js";
import { BusinessUnit } from "./businessUnit.model.js";

const BusinessUnitEeio = sequelize.define(
  "BusinessUnitEeio",
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
      references: {
        model: User,
        key: "id",
        deferrable: Deferrable.INITIALLY_IMMEDIATE,
      },
    },
    businessUnitId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: BusinessUnit,
        key: "id",
        deferrable: Deferrable.INITIALLY_IMMEDIATE,
      },
    },
    scope: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    level1: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    level2: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    level3: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    level4: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    level5: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    unitOfMeasurement: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    CO2e: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    CO2e_of_CO2: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    CO2e_of_CH4: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    CO2e_of_N2O: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    CO2e_of_other: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    exioBaseCode: {
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
    sector: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    greenHouseGas: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    productOrIndustry: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    reference: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    tableName: "businessUnitsEeios",
  }
);

export { BusinessUnitEeio };
