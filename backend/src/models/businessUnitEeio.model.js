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
    country: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    continent: {
      type: DataTypes.STRING,
      allowNull: false,
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
    sector: {
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
    exioBaseCode: {
      type: DataTypes.STRING,
      allowNull: false,
      // field: "exio_base_code",
    },
    greenHouseGas: {
      type: DataTypes.STRING,
      allowNull: false,
      // field: "green_house_gas",
    },
    productOrIndustry: {
      type: DataTypes.STRING,
      allowNull: false,
      // field: "product_or_industry",
    },
    reference: {
      type: DataTypes.STRING,
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
  },
  {
    // timestamps: false,
    // tableName: "business_units_eeios",
    tableName: "businessUnitsEeios",
  }
);

// await BusinessUnitEeio.sync();

export { BusinessUnitEeio };
