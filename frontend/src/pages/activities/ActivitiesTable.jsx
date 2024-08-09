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

const ActivitiesTable = ({
  userBusinessUnitsActivities,
  fetchUserBusinessUnitsActivities,
}) => {
  const handleDelete = (id) => {
    return () => {
      request(
        `${import.meta.env.VITE_API_BASE_URL}/businessUnitsActivities/${id}`,
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
          fetchUserBusinessUnitsActivities();
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
              "UOM",
              "Quantity",
              <>
                kg CO<span style={{ fontSize: "0.6em" }}>2</span>e
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
          {userBusinessUnitsActivities.length > 0 &&
            userBusinessUnitsActivities.map((userBusinessUnit, index) => (
              <TableRow key={index}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{userBusinessUnit.scope || "-"}</TableCell>
                <TableCell>
                  {userBusinessUnit.businessUnit.title || "-"}
                </TableCell>
                <TableCell>{userBusinessUnit.level1Category || "-"}</TableCell>
                <TableCell>{userBusinessUnit.level1 || "-"}</TableCell>
                <TableCell>{userBusinessUnit.level2 || "-"}</TableCell>
                <TableCell>{userBusinessUnit.level3 || "-"}</TableCell>
                <TableCell>{userBusinessUnit.level4 || "-"}</TableCell>
                <TableCell>{userBusinessUnit.level5 || "-"}</TableCell>
                <TableCell>
                  {userBusinessUnit.unitOfMeasurement || "-"}
                </TableCell>
                <TableCell>{userBusinessUnit.quantity || "-"}</TableCell>
                <TableCell>
                  {userBusinessUnit.CO2e === 0
                    ? "-"
                    : userBusinessUnit.CO2e?.toFixed(2) || "-"}
                </TableCell>
                <TableCell>
                  {userBusinessUnit.CO2e_of_CO2 === 0
                    ? "-"
                    : userBusinessUnit.CO2e_of_CO2?.toFixed(2) || "-"}
                </TableCell>
                <TableCell>
                  {userBusinessUnit.CO2e_of_CH4 === 0
                    ? "-"
                    : userBusinessUnit.CO2e_of_CH4?.toFixed(2) || "-"}
                </TableCell>
                <TableCell>
                  {userBusinessUnit.CO2e_of_N2O === 0
                    ? "-"
                    : userBusinessUnit.CO2e_of_N2O?.toFixed(2) || "-"}
                </TableCell>
                <TableCell>
                  <div className="flex justify-center gap-x-1">
                    <Link
                      to={`/activities/${userBusinessUnit.id}/edit`}
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
                      onClick={handleDelete(userBusinessUnit.id)}
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
