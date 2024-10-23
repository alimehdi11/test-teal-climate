import { useState, useEffect } from "react";
import {
  TableContainer,
  Table,
  TableHeader,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
} from "../../components/ui/Table.jsx";
import { request } from "../../utils/request.js";

const Top10EmissionsTable = () => {
  const [userTop10Emissions, setUserTop10Emissions] = useState([]);

  const fetchUserTop10Emissions = async () => {
    try {
      const response = await request(
        `${import.meta.env.VITE_API_BASE_URL}/businessUnitsActivities?limit=10&sortByColumn=CO2e&sortOrder=DESC`,
        "GET"
      );
      if (!response.ok) {
        console.log(response);
        throw new Error(`Failed to fetch data:`);
      }
      const { data } = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchUserTop10Emissions().then((userTop10Emissions) => {
      if (userTop10Emissions.length > 0) {
        setUserTop10Emissions(userTop10Emissions);
      } else {
        setUserTop10Emissions(Array(10).fill({}));
      }
    });
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
              "Tones",
            ].map((item, index) => (
              <TableHead key={index}>{item}</TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {userTop10Emissions.map((item, index) => (
            <TableRow key={index}>
              <TableCell>{index + 1}</TableCell>
              <TableCell>{item.scope || "-"}</TableCell>
              <TableCell>{item.businessUnit?.title || "-"}</TableCell>
              <TableCell>{item.level1Category || "-"}</TableCell>
              <TableCell>{item.level1 || "-"}</TableCell>
              <TableCell>{item.level2 || "-"}</TableCell>
              <TableCell>{item.level3 || "-"}</TableCell>
              <TableCell>{item.level4 || "-"}</TableCell>
              <TableCell>{item.unitOfMeasurement || "-"}</TableCell>
              <TableCell>{item.quantity || "-"}</TableCell>
              <TableCell>
                {item.CO2e ? Number((item.CO2e / 1000).toFixed(2)) : "-"}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default Top10EmissionsTable;
