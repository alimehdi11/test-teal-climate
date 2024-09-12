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
    /**
     * Explanation of Composite Unique Key:
     *
     * This model uses a composite unique key to enforce the uniqueness of the combination of 'userId', 'title',
     * and 'period' in the 'BusinessUnit' table. Individually, none of these fields are required to be unique,
     * but their combination must be.
     *
     * The composite unique key is created by using the 'unique' attribute with the same string value
     * ("userId_title_period") across the 'userId', 'title', and 'period' fields. This instructs Sequelize
     * to generate a composite unique index that spans these three columns.
     *
     * Example:
     * A user (represented by 'userId') can have multiple business units, and those business units can have
     * the same title across different periods (such as different years or fiscal quarters). However, within
     * the same period, each business unit title must be unique for that specific user. This ensures that the
     * same user cannot have two business units with the same title for the same period.
     *
     * By enforcing this composite unique constraint, we ensure data integrity, preventing the creation of
     * duplicate business units for a user within the same time period. This allows for flexibility in
     * data entry while maintaining the necessary constraints to avoid redundancy.
     *
     * Sequelize uses the composite unique key ("userId_title_period") on the 'userId', 'title', and 'period'
     * fields to enforce this behavior.
     */
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: User,
        key: "id",
        deferrable: Deferrable.INITIALLY_IMMEDIATE,
      },
      unique: "userId_title_period", // Composite unique key
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: "userId_title_period", // Composite unique key
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
    period: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: "userId_title_period", // Composite unique key
    },
  },
  {
    tableName: "businessUnits",
  }
);

export { BusinessUnit };
