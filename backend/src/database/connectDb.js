import { Sequelize } from "sequelize";

let sequelize;

const connectDb = async () => {
  const dialectOptions = {};
  if (process.env.NODE_ENV === "production") {
    dialectOptions.ssl = {
      rejectUnauthorized: false,
    };
  }
  sequelize = new Sequelize(
    process.env.DATABASE_NAME,
    process.env.DATABASE_USER,
    process.env.DATABASE_PASSWORD,
    {
      host: process.env.DATABASE_HOST,
      port: process.env.DATABASE_PORT,
      dialect: "postgres",
      logging: false,
      dialectOptions,
    }
  );

  try {
    await sequelize.authenticate();
    console.log(
      `Database ${process.env.DATABASE_NAME} connection has been established successfully.`
    );
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};

await connectDb();

export { sequelize };
