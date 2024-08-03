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
    country: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    continent: {
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
    greenHouseGasEmissionFactor: {
      type: DataTypes.FLOAT,
      allowNull: false,
      // field: "green_house_gas_emission_factor",
    },
    productOrIndustry: {
      type: DataTypes.STRING,
      allowNull: false,
      // field: "product_or_industry",
    },
    perEuro: {
      type: DataTypes.FLOAT,
      allowNull: false,
      // field: "per_euro",
    },
    reference: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    timestamps: false,
    tableName: "eeios",
  }
);

// await Eeio.sync();

export { Eeio };
