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
  setSelectedScope,
  setSelectedLevel,
  setIsSpendBaseScope3Selected,
  setProductOrIndustry,
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

  if (userBusinessUnitsActivities.length === 0) {
    return null;
  }

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
              "Month",
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
          {userBusinessUnitsActivities.map(
            (userBusinessUnitActivity, index) => (
              <TableRow key={index}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{userBusinessUnitActivity.scope || "-"}</TableCell>
                <TableCell>
                  {userBusinessUnitActivity.businessUnit.title || "-"}
                </TableCell>
                <TableCell>
                  {userBusinessUnitActivity.level1Category || "-"}
                </TableCell>
                <TableCell>{userBusinessUnitActivity.level1 || "-"}</TableCell>
                <TableCell>{userBusinessUnitActivity.level2 || "-"}</TableCell>
                <TableCell>{userBusinessUnitActivity.level3 || "-"}</TableCell>
                <TableCell>{userBusinessUnitActivity.level4 || "-"}</TableCell>
                <TableCell>{userBusinessUnitActivity.level5 || "-"}</TableCell>
                <TableCell>
                  {userBusinessUnitActivity.unitOfMeasurement || "-"}
                </TableCell>
                <TableCell>
                  {userBusinessUnitActivity.quantity || "-"}
                </TableCell>
                <TableCell>
                  {userBusinessUnitActivity.month.charAt(0).toUpperCase() +
                    userBusinessUnitActivity.month.slice(1)}
                </TableCell>
                <TableCell>
                  {userBusinessUnitActivity.CO2e === 0
                    ? "-"
                    : userBusinessUnitActivity.CO2e?.toFixed(2)}
                </TableCell>
                <TableCell>
                  {userBusinessUnitActivity.CO2e_of_CO2 === 0
                    ? "-"
                    : userBusinessUnitActivity.CO2e_of_CO2?.toFixed(2)}
                </TableCell>
                <TableCell>
                  {userBusinessUnitActivity.CO2e_of_CH4 === 0
                    ? "-"
                    : userBusinessUnitActivity.CO2e_of_CH4?.toFixed(2)}
                </TableCell>
                <TableCell>
                  {userBusinessUnitActivity.CO2e_of_N2O === 0
                    ? "-"
                    : userBusinessUnitActivity.CO2e_of_N2O?.toFixed(2)}
                </TableCell>
                <TableCell>
                  <div className="flex justify-center gap-x-1">
                    <Link
                      to={`/activities/${userBusinessUnitActivity.id}/edit`}
                      className="flex justify-center items-center"
                      onClick={() => {
                        if (userBusinessUnitActivity.eeio) {
                          setIsSpendBaseScope3Selected(true);
                          setProductOrIndustry(
                            userBusinessUnitActivity.productOrIndustry
                          );
                          setSelectedScope(null);
                          setSelectedLevel(null);
                        } else {
                          setIsSpendBaseScope3Selected(false);
                          setProductOrIndustry("");
                          setSelectedScope(userBusinessUnitActivity.scope);
                          setSelectedLevel(userBusinessUnitActivity.level1);
                        }
                      }}
                    >
                      <img
                        src={editIcon}
                        className="p-1 rounded hover:bg-slate-300 size-7"
                      />
                    </Link>
                    <img
                      src={trashIcon}
                      className="p-1 rounded hover:bg-slate-300 size-7"
                      onClick={handleDelete(userBusinessUnitActivity.id)}
                    />
                  </div>
                </TableCell>
              </TableRow>
            )
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default ActivitiesTable;
