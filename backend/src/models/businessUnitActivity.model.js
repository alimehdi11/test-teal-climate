import { DataTypes, Deferrable } from "sequelize";
import { sequelize } from "../database/connectDb.js";
// import { Level1Category } from "./level1Category.model.js";
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
      // field: "user_id",
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
      // field: "business_unit_name",
      field: "businessUnitName",
      references: {
        model: BusinessUnit,
        key: "businessUnitName",
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
      // field: "unit_of_measurment",
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
    level1Category: {
      type: DataTypes.STRING,
      allowNull: false,
      // field: "level1_category",
      // references: {
      //   model: Level1Category,
      //   key: "category",
      //   deferrable: Deferrable.INITIALLY_IMMEDIATE,
      // },
    },
  },
  {
    // timestamps: false,
    // tableName: "business_units_activities",
    tableName: "businessUnitsActivities",
  }
);

// await BusinessUnitActivity.sync();

export { BusinessUnitActivity };
