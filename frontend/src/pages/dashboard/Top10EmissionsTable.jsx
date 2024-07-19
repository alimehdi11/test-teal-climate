import { useState, useEffect, useContext } from "react";
import { getBearerToken } from "../../utils/auth.js";
import { UserContext } from "../../contexts/UserContext.jsx";
import {
  TableContainer,
  Table,
  TableHeader,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
} from "../../components/ui/Table.jsx";

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
    <TableContainer>
      <Table>
        <TableHeader>
          <TableRow>
            {[
              "S.No",
              "Scope",
              "Business Unit",
              "Scope Category",
              "Level 1",
              "Level 2",
              "Level 3",
              "Level 4",
              "uom",
              "Quantity",
              <>
                kg CO<span style={{ fontSize: "0.6em" }}>2</span>e
              </>,
            ].map((item) => (
              <TableHead>{item}</TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {top10Emissions.length > 0 &&
            top10Emissions.map((item, index) => (
              <TableRow>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{item.scope || "-"}</TableCell>
                <TableCell>{item.businessunit || "-"}</TableCell>
                <TableCell>{item.fuel_category || "-"}</TableCell>
                <TableCell>{item.level1 || "-"}</TableCell>
                <TableCell>{item.level2 || "-"}</TableCell>
                <TableCell>{item.level3 || "-"}</TableCell>
                <TableCell>{item.level4 || "-"}</TableCell>
                <TableCell>{item.uom || "-"}</TableCell>
                <TableCell>{item.quantity || "-"}</TableCell>
                <TableCell>{item.co2e.toFixed(2) || "-"}</TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default Top10EmissionsTable;
