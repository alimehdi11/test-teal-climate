import { DataTypes, Deferrable } from "sequelize";
import { sequelize } from "./../database/connectDb.js";
import { User } from "./user.model.js";

const Period = sequelize.define(
  "Period",
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    period: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: "period_userId",
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: User,
        key: "id",
        deferrable: Deferrable.INITIALLY_IMMEDIATE,
      },
      unique: "period_userId", // Composite unique key
    },
  },
  {
    tableName: "periods",
  }
);

Period.belongsTo(User, {
  foreignKey: "userId",
  as: "user",
});

export { Period };
