import { DataTypes } from "sequelize";
import { sequelize } from "../database/connectDb.js";

const Level1Category = sequelize.define(
  "Level1Category",
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    level1: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    category: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    timestamps: false,
    tableName: "level1Categories",
  }
);

export { Level1Category };
