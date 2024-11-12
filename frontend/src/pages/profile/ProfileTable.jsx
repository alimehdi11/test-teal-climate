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
import { api } from "../../api/index.js";
import { usePeriod } from "../../contexts/PeriodProvider.jsx";
import Modal from "../../components/ui/Modal.jsx";
import { useState } from "react";

const ProfileTable = ({ businessUnits, setBusinessUnits }) => {
  const { selectedPeriod } = usePeriod();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isConfirm, setIsConfirm] = useState(false);
  const [businessUnitId, setBusinessUnitId] = useState(null);

  const handleDelete = () => {
    request(
      `${import.meta.env.VITE_API_BASE_URL}/businessUnits/${businessUnitId}`,
      "DELETE"
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error();
        }
        toast.success("Data deleted successfully");
        setIsConfirm(false);
        setBusinessUnitId(null);
      })
      .then(async () => {
        const { data, success, message } =
          await api.businessUnits.getAllBusinessUnits(selectedPeriod);
        if (success) {
          setBusinessUnits(data);
        } else {
          toast.error(message);
        }
      })
      .catch((error) => {
        toast.error("Error deleting data");
        console.error(error);
      });
  };

  if (businessUnits.length === 0) {
    return null;
  }

  if (isConfirm) {
    handleDelete();
  }

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
              "Period",
            ].map((item) => (
              <TableHead key={item}>{item}</TableHead>
            ))}
            <TableHead key="Actions" className="bg-tc-blue sticky right-0">
              Actions
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {businessUnits.map((userBusinessUnit, index) => (
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
              <TableCell>{userBusinessUnit.period.period}</TableCell>
              <TableCell className="sticky right-0 bg-white shadow-xl">
                <div className="flex justify-center gap-x-1">
                  <Link
                    to={`/profile/${userBusinessUnit.id}/edit`}
                    className="flex justify-center items-center"
                    onClick={
                      () => window.scrollTo(0, 0) // Scroll to the very top
                    }
                  >
                    <img
                      src={editIcon}
                      className="p-1 rounded hover:bg-slate-300 size-7"
                    />
                  </Link>
                  <img
                    src={trashIcon}
                    className="p-1 rounded hover:bg-slate-300 size-7"
                    onClick={() => {
                      setIsModalOpen(true);
                      setBusinessUnitId(userBusinessUnit.id);
                    }}
                  />
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Modal
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        setIsConfirm={setIsConfirm}
        message="All of the associated activities will be deleted."
      />
    </TableContainer>
  );
};

export default ProfileTable;
