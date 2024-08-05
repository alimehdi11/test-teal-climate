import { Activity } from "../models/activity.model.js";

const getAllActivities = async (req, res) => {
  try {
    const allActivities = await Activity.findAll({
      attributes: [
        "scope",
        "level1",
        "level2",
        "level3",
        "level4",
        "level5",
        "unitOfMeasurement",
        "greenHouseGas",
      ],
    });
    return res.status(200).json({ datas: allActivities }); // TODO : { datas: allActivites } -> datas -> key can be named better
  } catch (error) {
    console.log("Could not getAllActivites");
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
  // pool
  // .connect()
  // .then((client) => {
  //   return Promise.all([
  //     client.query("SELECT * FROM activitydata"),
  //     client.query("SELECT * FROM companies WHERE userid = $1", [id]),
  //     client.query("SELECT * FROM companiesdata WHERE ids = $1", [id]),
  //   ])
  //     .then(([activityResult, companiesResult, companiesDataResult]) => {
  //       const datas = activityResult.rows;
  //       const companies = companiesResult.rows;
  //       const companiesdatas = companiesDataResult.rows;

  //       res.status(200).json({ datas, companiesdatas, companies });
  //       // res.render('activatedata', { datas, companiesdatas, companies });
  //     })
  //     .catch((error) => {
  //       console.error("activatedata Error:", error);
  //       res.status(500).send("Error fetching data");
  //     })
  //     .finally(() => {
  //       client.release(); // Release the connection back to the pool in all cases
  //     });
  // })
  // .catch((error) => {
  //   console.error("activatedata Error:", error);
  //   res.status(500).send("Error connecting to the database");
  // });
};

export { getAllActivities };
