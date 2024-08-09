import { toast } from "react-toastify";
import { request } from "../../utils/request.js";
import trashIcon from "../../assets/trash-icon.svg";
import editIcon from "../../assets/edit-icon.svg";
import { Link } from "react-router-dom";
import {
  TableContainer,
  Table,
  TableHeader,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
} from "../../components/ui/Table.jsx";

const ProfileTable = ({
  userBusinessUnits,
  fetchUserBusinessUnits,
  setSelectedForm,
}) => {
  const handleDelete = (id) => {
    return () => {
      request(
        `${import.meta.env.VITE_API_BASE_URL}/businessUnits/${id}`,
        "DELETE"
      )
        .then((response) => {
          if (!response.ok) {
            throw new Error();
          }
          toast.success("Data delete successfully");
        })
        .then(() => {
          fetchUserBusinessUnits();
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
              "Business Unit",
              "Continent",
              "Country",
              "Region",
              "Employees",
              "Production",
              "Revenue",
              "Notes",
              "Partnership",
              "Actions",
            ].map((item, index) => (
              <TableHead key={item}>{item}</TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {userBusinessUnits.length > 0 &&
            userBusinessUnits.map((userBusinessUnit, index) => (
              <TableRow key={index}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{userBusinessUnit.title}</TableCell>
                <TableCell>{userBusinessUnit.continent}</TableCell>
                <TableCell>{userBusinessUnit.country}</TableCell>
                <TableCell>{userBusinessUnit.region}</TableCell>
                <TableCell>{userBusinessUnit.noOfEmployees || "-"}</TableCell>
                <TableCell>{userBusinessUnit.production || "-"}</TableCell>
                <TableCell>{userBusinessUnit.revenue || "-"}</TableCell>
                <TableCell>{userBusinessUnit.notes || "-"}</TableCell>
                <TableCell>{userBusinessUnit.partnership}</TableCell>
                <TableCell>
                  <div className="flex justify-center gap-x-1">
                    <Link
                      to={`/profile/${userBusinessUnit.id}/edit`}
                      className="flex justify-center items-center"
                      onClick={() => setSelectedForm("Portfolio")}
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

export default ProfileTable;
