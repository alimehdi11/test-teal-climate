import { Level1Category } from "../models/level1Category.model.js";

const getAllLevel1Categories = async (req, res) => {
  try {
    const allLevel1Categories = await Level1Category.findAll({
      attributes: ["level1", "category"],
    });
    return res.status(200).json(allLevel1Categories);
  } catch (error) {
    console.log("Could not getAllLevel1Categories");
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }

  // const query = "SELECT type, categy FROM categries";
  // pool.query(query, (err, result) => {
  //   if (err) {
  //     console.error("Error fetching data:", err);
  //     res.status(500).send("Error fetching data");
  //   } else {
  //     console.log("Data fetched successfully");
  //     res.json(result.rows); // Send fetched data as JSON response
  //   }
  // });
};

export { getAllLevel1Categories };
