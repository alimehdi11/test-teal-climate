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
      defaultValue: "",
    },
    level2: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "",
    },
    level3: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "",
    },
    level4: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "",
      defaultValue: "",
    },
    level5: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "",
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
      defaultValue: "",
    },
    CO2e_of_other: {
      type: DataTypes.FLOAT,
      allowNull: false,
      defaultValue: 0,
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
    eeio: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    month: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "",
    },
    reit: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    continent: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "",
    },
    country: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "",
    },
    region: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "",
    },
    assetClass: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "",
    },
    year: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "",
    },
    marketBasedQuantity: {
      type: DataTypes.FLOAT,
      allowNull: false,
      defaultValue: 0,
    },
    marketBasedEmissionFactor: {
      type: DataTypes.FLOAT,
      allowNull: false,
      defaultValue: 0,
    },
    marketBasedUnitOfEmissionFactor: {
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
  onDelete: "CASCADE",
});
// BusinessUnitActivity.sync({ alter: true });
export { BusinessUnitActivity };
