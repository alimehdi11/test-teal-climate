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
      unique: true,
    },
    country: {
      type: DataTypes.STRING,
      allowNull: false,
      // references: {
      //   model: Country,
      //   key: "name",
      //   deferrable: Deferrable.INITIALLY_IMMEDIATE,
      // },
    },
    continent: {
      type: DataTypes.STRING,
      allowNull: false,
      // references: {
      //   model: Country,
      //   key: "continent",
      //   deferrable: Deferrable.INITIALLY_IMMEDIATE,
      // },
    },
    region: {
      type: DataTypes.STRING,
      allowNull: false,
      // references: {
      //   model: Country,
      //   key: "region",
      //   deferrable: Deferrable.INITIALLY_IMMEDIATE,
      // },
    },
    noOfEmployees: {
      type: DataTypes.STRING,
      // field: "no_of_employees",
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
    // timestamps: false,
    // tableName: "business_units",
    tableName: "businessUnits",
  }
);

// await BusinessUnit.sync();

export { BusinessUnit };
