import { useState, useEffect, useContext } from "react";
import { getBearerToken } from "../utils/auth.js";
import { UserContext } from "../contexts/UserContext.jsx";

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

  return (
    <div className="mx-4 my-4 hide-scroll border border-slate-500 rounded overflow-x-auto shadow-2xl">
      <table className="border-0">
        <thead>
          <tr className="bg-tc-blue text-white border-slate-500">
            <th className="border-t-0 border-slate-500 border-s-0">S.No</th>
            <th className="border-t-0 border-slate-500">Scope</th>
            <th className="border-t-0 border-slate-500">Business Unit</th>
            <th className="border-t-0 border-slate-500">Scope Category</th>
            <th className="border-t-0 border-slate-500">Level 1</th>
            <th className="border-t-0 border-slate-500">Level 2</th>
            <th className="border-t-0 border-slate-500">Level 3</th>
            <th className="border-t-0 border-slate-500">Level 4</th>
            {/* <th className="border-t-0">Level 5</th> */}
            <th className="border-t-0 border-slate-500">uom</th>
            <th className="border-t-0 border-slate-500">Quantity</th>
            <th className="border-t-0 border-slate-500">
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
          {top10Emissions.length > 0 &&
            top10Emissions.map((item, index) => (
              <tr className="border-slate-500">
                <td className="border-slate-500 border-s-0">{index + 1}</td>
                <td className="border-slate-500">{item.scope || "-"}</td>
                <td className="border-slate-500">{item.businessunit || "-"}</td>
                <td className="border-slate-500">
                  {item.fuel_category || "-"}
                </td>
                <td className="border-slate-500">{item.level1 || "-"}</td>
                <td className="border-slate-500">{item.level2 || "-"}</td>
                <td className="border-slate-500">{item.level3 || "-"}</td>
                <td className="border-slate-500">{item.level4 || "-"}</td>
                {/* <td className="border-slate-500">{item.level5 || "-"}</td> */}
                <td className="border-slate-500">{item.uom || "-"}</td>
                <td className="border-slate-500">{item.quantity || "-"}</td>
                <td className="border-slate-500 border-e-0">
                  {item.co2e.toFixed(2) || "-"}
                </td>
                {/* <td className="border-slate-500">{item.co2eofco2.toFixed(2) || "-"}</td>
                <td className="border-slate-500">{item.co2eofch4.toFixed(2) || "-"}</td>
                <td className="border-slate-500" className="border-e-0">
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
