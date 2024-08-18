import "./../src/models/user.model.js";
import "./../src/models/subscription.model.js";
import "./../src/models/businessUnitEeio.model.js";
import "./../src/models/businessUnitActivity.model.js";
import "./../src/models/businessUnit.model.js";
import "./../src/models/resetPasswordToken.model.js";
import { Level1Category } from "./../src/models/level1Category.model.js";
import { ElectricVehicle } from "./../src/models/electricVehicle.model.js";
import { Country } from "./../src/models/country.model.js";
import { Eeio } from "./../src/models/eeio.model.js";
import { Airport } from "./../src/models/airport.model.js";
import { Activity } from "./../src/models/activity.model.js";

import { sequelize } from "./../src/database/connectDb.js";

await sequelize.sync({ force: true });

export { Level1Category, ElectricVehicle, Country, Eeio, Airport, Activity };
