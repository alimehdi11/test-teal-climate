import { Sequelize, DataTypes } from "sequelize";

const sequelize = new Sequelize(
  "test" || process.env.DATABASE_NAME,
  process.env.DATABASE_USER,
  process.env.DATABASE_PASSWORD,
  {
    host: process.env.DATABASE_HOST,
    dialect: "postgres",
    logging: false,
  }
);

try {
  await sequelize.authenticate();
  console.log("Database connection has been established successfully.");
} catch (error) {
  console.error("Unable to connect to the database:", error);
}

const User = sequelize.define(
  "User",
  {
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastName: {
      type: DataTypes.STRING,
    },
  },
  {
    // tableName: "Users",
    // freezeTableName: true,
    // timestamps: false,
  }
);

await User.sync({ force: true });
User.drop();

export { sequelize as pool };
