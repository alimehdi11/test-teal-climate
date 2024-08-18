import { DataTypes, Deferrable } from "sequelize";
import { sequelize } from "./../database/connectDb.js";
import { User } from "./user.model.js";

const ResetPasswordToken = sequelize.define(
  "ResetPasswordToken",
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
    token: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    tableName: "resetPasswordTokens",
  }
);

export { ResetPasswordToken };
