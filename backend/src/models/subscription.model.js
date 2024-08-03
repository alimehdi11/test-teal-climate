import { DataTypes, Deferrable } from "sequelize";
import { sequelize } from "./../database/connectDb.js";
import { User } from "./../models/user.model.js";
import { defaultValueSchemable } from "sequelize/lib/utils";

const Subscription = sequelize.define(
  "Subscription",
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
      field: "userId",
      references: {
        model: User,
        key: "id",
        deferrable: Deferrable.INITIALLY_IMMEDIATE,
      },
    },
    customerId: {
      type: DataTypes.STRING,
    },
    subscriptionId: {
      type: DataTypes.STRING,
    },
    paymenIntenId: {
      type: DataTypes.STRING,
    },
    clientSecret: {
      type: DataTypes.STRING,
    },
  },
  {
    tableName: "subscriptions",
  }
);

export { Subscription };
