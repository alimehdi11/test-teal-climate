import { useState, useEffect, useContext } from "react";
import { getBearerToken } from "./../utils/auth.utils.js";
import { UserContext } from "../contexts/UserContext.jsx";
import Table from "../components/ui/Table.jsx";

const Top10EmissionsTable = () => {
  const [top10Emissions, setTop10Emissions] = useState([]);
  const { user } = useContext(UserContext);

  const fetchTop10Emissions = async (userId) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/companiesdata/top10/${userId}`,
        {
          headers: {
            authorization: getBearerToken(),
          },
        }
      );
      if (!response.ok) {
        throw new Error(`Failed to fetch data:`);
      }
      const jsonData = await response.json();
      return jsonData;
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  // useEffect(() => {
  //   if (user.id) {
  //     fetchTop10Emissions(user.id).then((top10Emissions) =>
  //       setTop10Emissions(top10Emissions)
  //     );
  //   }
  // }, [user.id]);

  /**
   * Above commented useEffect was previously used. It has [user.id] as dependency.
   * I change it to no dependency. I do not why developer who added this as a dependency.
   * For safety purpose I comment it so we can go back easily.
   */
  useEffect(() => {
    fetchTop10Emissions(user.id).then((top10Emissions) =>
      setTop10Emissions(top10Emissions)
    );
  }, []);

  // return <Table data={top10Emissions} />;

  return (
    <div
      className="mx-5 my-10 hide-scroll border-[1px] border-gray-300 border-solid rounded-md overflow-x-auto max-w-full font-poppins shadow-2xl"
      style={{ fontSize: "16px" }}
    >
      <table className="border-0">
        <thead>
          <tr className="bg-brand-color-2 text-white">
            <th className="border-t-0 border-s-0">S.No</th>
            <th className="border-t-0">Scope</th>
            <th className="border-t-0">Business Unit</th>
            <th className="border-t-0">Scope Category</th>
            <th className="border-t-0">Level 1</th>
            <th className="border-t-0">Level 2</th>
            <th className="border-t-0">Level 3</th>
            <th className="border-t-0">Level 4</th>
            {/* <th className="border-t-0">Level 5</th> */}
            <th className="border-t-0">uom</th>
            <th className="border-t-0">Quantity</th>
            <th className="border-t-0">
              kg CO<span style={{ fontSize: "0.6em" }}>2</span>e
            </th>
            {/* <th className="border-t-0">
              kg CO<span style={{ fontSize: "0.6em" }}>2</span>e of CO
              <span style={{ fontSize: "0.6em" }}>2</span>
            </th>
            <th className="border-t-0">
              kg CO<span style={{ fontSize: "0.6em" }}>2</span>e of CH
              <span style={{ fontSize: "0.6em" }}>4</span>
            </th>
            <th className="border-t-0">
              kg CO<span style={{ fontSize: "0.6em" }}>2</span>e of N
              <span style={{ fontSize: "0.6em" }}>2</span>O
            </th> */}
          </tr>
        </thead>
        <tbody>
          {top10Emissions &&
            top10Emissions.map((item, index) => (
              <tr>
                <td className="border-s-0">{index + 1}</td>
                <td>{item.scope || "-"}</td>
                <td>{item.businessunit || "-"}</td>
                <td>{item.fuel_category || "-"}</td>
                <td>{item.level1 || "-"}</td>
                <td>{item.level2 || "-"}</td>
                <td>{item.level3 || "-"}</td>
                <td>{item.level4 || "-"}</td>
                {/* <td>{item.level5 || "-"}</td> */}
                <td>{item.uom || "-"}</td>
                <td>{item.quantity || "-"}</td>
                <td className="border-e-0">{item.co2e.toFixed(2) || "-"}</td>
                {/* <td>{item.co2eofco2.toFixed(2) || "-"}</td>
                <td>{item.co2eofch4.toFixed(2) || "-"}</td>
                <td className="border-e-0">
                  {item.co2eofn2o.toFixed(2) || "-"}
                </td> */}
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default Top10EmissionsTable;
