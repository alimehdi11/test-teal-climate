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

const ProfileTable = ({ profileData, fetchProfileData, setSelectedForm }) => {
  const handleDelete = (id) => {
    return () => {
      request(`${import.meta.env.VITE_API_BASE_URL}/companies/${id}`, "DELETE")
        .then((response) => {
          if (!response.ok) {
            throw new Error();
          }
          toast.success("Data delete successfully");
        })
        .then(() => {
          fetchProfileData();
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
            ].map((item) => (
              <TableHead>{item}</TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {profileData.length > 0 &&
            profileData.map((profile, index) => (
              <TableRow>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{profile.unitname}</TableCell>
                <TableCell>{profile.continent}</TableCell>
                <TableCell>{profile.countries}</TableCell>
                <TableCell>{profile.region}</TableCell>
                <TableCell>{profile.employees}</TableCell>
                <TableCell>{profile.production}</TableCell>
                <TableCell>{profile.revenue}</TableCell>
                <TableCell>{profile.notes}</TableCell>
                <TableCell>{profile.partnership}</TableCell>
                <TableCell>
                  <div className="flex justify-center gap-x-1">
                    <Link
                      to={`/profile/${profile.id}/edit`}
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
                      onClick={handleDelete(profile.id)}
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
