import { DataTypes, Deferrable } from "sequelize";
import { sequelize } from "./../database/connectDb.js";
import { User } from "./../models/user.model.js";

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
      // field: "user_id",
      field: "userId",
      references: {
        model: User,
        key: "id",
        deferrable: Deferrable.INITIALLY_IMMEDIATE,
      },
    },
    customerId: {
      type: DataTypes.STRING,
      allowNull: false,
      // field: "customer_id",
    },
    subscriptionId: {
      type: DataTypes.STRING,
      allowNull: false,
      // field: "subscription_id",
    },
    paymenIntenId: {
      type: DataTypes.STRING,
      allowNull: false,
      // field: "payment_intent_id",
    },
    clientSecret: {
      type: DataTypes.STRING,
      allowNull: false,
      // field: "client_secret",
    },
  },
  {
    // timestamps: false,
    tableName: "subscriptions",
  }
);

// await Subscription.sync();

export { Subscription };
