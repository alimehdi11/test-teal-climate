import trashIcon from "../../assets/trash-icon.svg";
import editIcon from "../../assets/edit-icon.svg";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { request } from "../../utils/request.js";
import {
  TableContainer,
  Table,
  TableHeader,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
} from "../../components/ui/Table.jsx";

const ActivitiesTable = ({ companyData, fetchCompanyData }) => {
  const handleDelete = (id) => {
    return () => {
      request(
        `${import.meta.env.VITE_API_BASE_URL}/companiesdata/${id}`,
        "DELETE"
      )
        .then((response) => {
          if (!response.ok) {
            throw new Error();
          }
          toast.success("Data delete successfully");
        })
        .then(() => {
          // Row deleted fetched data again
          fetchCompanyData();
        })
        .catch((error) => {
          toast.error("Error deleting data");
          console.log(error);
        });
    };
  };

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
              "Level 5",
              "uom",
              "Quantity",
              <>
                kg CO <span style={{ fontSize: "0.6em" }}>2</span>e
              </>,
              <>
                kg CO
                <span style={{ fontSize: "0.6em" }}>2</span>e of CO
                <span style={{ fontSize: "0.6em" }}>2</span>
              </>,
              <>
                kg CO
                <span style={{ fontSize: "0.6em" }}>2</span>e of CH
                <span style={{ fontSize: "0.6em" }}>4</span>
              </>,
              <>
                kg CO
                <span style={{ fontSize: "0.6em" }}>2</span>e of N
                <span style={{ fontSize: "0.6em" }}>2</span>O
              </>,
              "Actions",
            ].map((item, index) => (
              <TableHead key={index}>{item}</TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {companyData.length > 0 &&
            companyData.map((item, index) => (
              <TableRow key={index}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{item.scope || "-"}</TableCell>
                <TableCell>{item.businessunit || "-"}</TableCell>
                <TableCell>{item.fuel_category || "-"}</TableCell>
                <TableCell>{item.level1 || "-"}</TableCell>
                <TableCell>{item.level2 || "-"}</TableCell>
                <TableCell>{item.level3 || "-"}</TableCell>
                <TableCell>{item.level4 || "-"}</TableCell>
                <TableCell>{item.level5 || "-"}</TableCell>
                <TableCell>{item.uom || "-"}</TableCell>
                <TableCell>{item.quantity || "-"}</TableCell>
                <TableCell>
                  {item.co2e === 0 ? "-" : item.co2e?.toFixed(2) || "-"}
                </TableCell>
                <TableCell>
                  {item.co2eofco2 === 0
                    ? "-"
                    : item.co2eofco2?.toFixed(2) || "-"}
                </TableCell>
                <TableCell>
                  {item.co2eofch4 === 0
                    ? "-"
                    : item.co2eofch4?.toFixed(2) || "-"}
                </TableCell>
                <TableCell>
                  {item.co2eofn2o === 0
                    ? "-"
                    : item.co2eofn2o?.toFixed(2) || "-"}
                </TableCell>
                <TableCell>
                  <div className="flex justify-center gap-x-1">
                    <Link
                      to={`/activities/${item.id}/edit`}
                      className="flex justify-center items-center"
                    >
                      <img
                        src={editIcon}
                        className="p-1 rounded hover:bg-slate-300 size-7"
                      />
                    </Link>
                    <img
                      src={trashIcon}
                      className="p-1 rounded hover:bg-slate-300 size-7"
                      onClick={handleDelete(item.id)}
                    />
                  </div>
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default ActivitiesTable;
