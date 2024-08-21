import { DataTypes, Deferrable } from "sequelize";
import { sequelize } from "../database/connectDb.js";
import { User } from "./user.model.js";
import { BusinessUnit } from "./businessUnit.model.js";

const BusinessUnitActivity = sequelize.define(
  "BusinessUnitActivity",
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
      type: DataTypes.FLOAT, // Airports distance can be in FLOAT
      allowNull: false,
    },
    CO2e: {
      type: DataTypes.FLOAT,
      allowNull: false,
      defaultValue: 0,
    },
    CO2e_of_CO2: {
      type: DataTypes.FLOAT,
      allowNull: false,
      defaultValue: 0,
    },
    CO2e_of_CH4: {
      type: DataTypes.FLOAT,
      allowNull: false,
      defaultValue: 0,
    },
    CO2e_of_N2O: {
      type: DataTypes.FLOAT,
      allowNull: false,
      defaultValue: 0,
    },
    level1Category: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 0,
    },
    CO2e_of_other: {
      type: DataTypes.FLOAT,
      allowNull: false,
      defaultValue: 0,
    },
    exioBaseCode: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "",
    },
    country: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "",
    },
    continent: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "",
    },
    sector: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "",
    },
    productOrIndustry: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "",
    },
    reference: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "",
    },
  },
  {
    tableName: "businessUnitsActivities",
  }
);

BusinessUnitActivity.belongsTo(BusinessUnit, {
  foreignKey: "businessUnitId",
  as: "businessUnit",
});

export { BusinessUnitActivity };
