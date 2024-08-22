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

const EeioTable = ({
  userBusinessUnitsActivities,
  fetchUserBusinessUnitsActivities,
  setProductOrIndustry,
  setSelectedLevel1,
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
          toast.success("businessUnitActivity delete successfully");
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
              "Product/Industry",
              "Business Unit",
              "Level 1",
              "Level 2",
              "Level 3",
              "Level 4",
              "Level 5",
              "Sector",
              "Exiobase Code",
              "UOM",
              "Quantity",
              <>
                kg CO<span style={{ fontSize: "0.6em" }}>2</span>e
              </>,
              <>
                kg CO<span style={{ fontSize: "0.6em" }}>2</span>e of CO
                <span style={{ fontSize: "0.6em" }}>2</span>
              </>,
              <>
                kg CO<span style={{ fontSize: "0.6em" }}>2</span>e of CH
                <span style={{ fontSize: "0.6em" }}>4</span>
              </>,
              <>
                kg CO<span style={{ fontSize: "0.6em" }}>2</span>e of N
                <span style={{ fontSize: "0.6em" }}>2</span>O
              </>,
              <>
                kg CO<span style={{ fontSize: "0.6em" }}>2</span>e of Other
              </>,
              "Continent",
              "Country",
              "Reference",
              "Actions",
            ].map((item, index) => (
              <TableHead key={index}>{item}</TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {userBusinessUnitsActivities.length > 0 &&
            userBusinessUnitsActivities.map((eeio, index) => (
              <TableRow key={index}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{eeio.scope || "-"}</TableCell>
                <TableCell>{eeio.productOrIndustry || "-"}</TableCell>
                <TableCell>{eeio.businessUnit.title || "-"}</TableCell>
                <TableCell>{eeio.level1 || "-"}</TableCell>
                <TableCell>{eeio.level2 || "-"}</TableCell>
                <TableCell>{eeio.level3 || "-"}</TableCell>
                <TableCell>{eeio.level4 || "-"}</TableCell>
                <TableCell>{eeio.level5 || "-"}</TableCell>
                <TableCell>{eeio.sector || "-"}</TableCell>
                <TableCell>{eeio.exioBaseCode || "-"}</TableCell>
                <TableCell>{eeio.unitOfMeasurement || "-"}</TableCell>
                <TableCell>{eeio.quantity || "-"}</TableCell>
                <TableCell>
                  {eeio.CO2e === 0 ? "-" : eeio.CO2e?.toFixed(2)}
                </TableCell>
                <TableCell>
                  {eeio.CO2e_of_CO2 === 0 ? "-" : eeio.CO2e_of_CO2?.toFixed(2)}
                </TableCell>
                <TableCell>
                  {eeio.CO2e_of_CH4 === 0 ? "-" : eeio.CO2e_of_CH4?.toFixed(2)}
                </TableCell>
                <TableCell>
                  {eeio.CO2e_of_N2O === 0 ? "-" : eeio.CO2e_of_N2O?.toFixed(2)}
                </TableCell>
                <TableCell>
                  {eeio.CO2e_of_other === 0
                    ? "-"
                    : eeio.CO2e_of_other?.toFixed(2)}
                </TableCell>
                <TableCell>{eeio.continent || "-"}</TableCell>
                <TableCell>{eeio.country || "-"}</TableCell>
                <TableCell>{eeio.reference || "-"}</TableCell>
                <TableCell>
                  <div className="flex justify-center gap-x-1">
                    <Link
                      to={`/eeio/${eeio.id}/edit`}
                      className="flex justify-center items-center"
                      onClick={() => {
                        setProductOrIndustry(eeio.productOrIndustry);
                        setSelectedLevel1(eeio.level1);
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
                      onClick={handleDelete(eeio.id)}
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

export default EeioTable;
