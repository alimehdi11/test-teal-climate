import csv from "csv-parser";
import path from "path";
import fs from "fs";
const {
  Level1Category,
  ElectricVehicle,
  Country,
  Eeio,
  Airport,
  Activity,
  CountryMask,
} = await import("./createDatabaseTables.js");
import { sequelize } from "./../src/database/connectDb.js";

const csvFilesNames = [
  "activities.csv",
  "airports.csv",
  "countries.csv",
  "eeios.csv",
  "electricVehicles.csv",
  "level1Categories.csv",
  "countriesMasks.csv",
];

const models = [
  Activity,
  Airport,
  Country,
  Eeio,
  ElectricVehicle,
  Level1Category,
  CountryMask,
];

const filePaths = csvFilesNames.map((csvFileName) => {
  return path.join(process.cwd(), "seed", "tables", csvFileName);
});

const seedTable = async (model, filePath) => {
  const records = [];

  return new Promise((resolve, reject) => {
    const readStream = fs.createReadStream(filePath).on("error", (error) => {
      console.error(`Error reading csv file at ${filePath}:`, error);
      reject(error);
    });

    readStream
      .pipe(csv())
      .on("data", (row) => {
        records.push(row);
      })
      .on("end", async () => {
        try {
          await model.bulkCreate(records);
          console.log(`${model.tableName} table imported successfully!`);
          resolve();
        } catch (error) {
          console.error("Error importing CSV data:", error);
          reject(error);
        }
      });
  });
};

try {
  for (let i = 0; i < models.length; i++) {
    await seedTable(models[i], filePaths[i]);
  }
} catch (error) {
  console.log("Something went wrong while seeding tables:", error);
} finally {
  await sequelize.close();
  console.log("Database connection closed");
}
