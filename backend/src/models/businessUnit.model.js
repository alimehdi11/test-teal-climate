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
 * Composite Unique Key ki Explanation:
 *
 * Is model mein, hum ek composite unique key use karte hain taake 'userId' aur 'title' ka combination
 * 'BusinessUnit' table mein unique rahe. Iska matlab yeh hai ke jabke 'userId' ya 'title' individually
 * unique nahi honge, inka combination zaroor unique hoga.
 *
 * Misal ke taur pe, ek user ke paas multiple business units ho sakti hain, lekin har business unit ka
 * title us user ke liye unique hona chahiye. Yeh 'unique' attribute use karke enforce kiya jata hai,
 * jisko humne 'userId' aur 'title' dono pe same string value "userId_Title" assign kiya hai.
 * Sequelize isko interpret karta hai jaise ke yeh ek request ho composite unique index banane ki
 * in dono fields par.
 *
 * Yeh composite unique key data integrity ko maintain karti hai taake duplicate entries na ho sakein
 * same user aur title combination ke liye.
 */

export { BusinessUnit };
