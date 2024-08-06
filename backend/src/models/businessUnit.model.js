import { DataTypes, Deferrable } from "sequelize";
import { sequelize } from "../database/connectDb.js";
import { User } from "./user.model.js";

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
      references: {
        model: User,
        key: "id",
        deferrable: Deferrable.INITIALLY_IMMEDIATE,
      },
      unique: "userId_Title", // Composite unique key
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: "userId_Title", // Composite unique key
    },
    country: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    continent: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    region: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    noOfEmployees: {
      type: DataTypes.INTEGER,
    },
    production: {
      type: DataTypes.INTEGER,
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
    tableName: "businessUnits",
  }
);

/**
 * Explanation of Composite Unique Key:
 *
 * In this model, we use a composite unique key to ensure that the combination of 'userId' and 'title'
 * is unique in the 'BusinessUnit' table. This means that while 'userId' or 'title' individually
 * may not be unique, their combination must be unique.
 *
 * For example, a user can have multiple business units, but each business unit title must be unique
 * for that user. This is enforced by using the 'unique' attribute, where we assign the same string value
 * "userId_Title" to both 'userId' and 'title'.
 *
 * Sequelize interprets this as a request to create a composite unique index on these two fields.
 *
 * This composite unique key maintains data integrity by preventing duplicate entries for the same
 * user and title combination.
 */

export { BusinessUnit };
