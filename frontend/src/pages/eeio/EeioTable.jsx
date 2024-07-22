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

const EeioTable = ({ eeioData, fetchEeioData, userId }) => {
  const handleDelete = (id) => {
    return () => {
      request(
        `${import.meta.env.VITE_API_BASE_URL}/eeios/deleteEeioData/${id}/${userId}`,
        "DELETE"
      )
        .then((response) => {
          console.log("=====>>>>>", response);
          if (!response.ok) {
            throw new Error();
          }
          toast.success("Data delete successfully");
        })
        .then(() => {
          // Row deleted fetched data again
          fetchEeioData();
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
              "pi",
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
              "User Country",
              "Actions",
            ].map((item, index) => (
              <TableHead key={index}>{item}</TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {eeioData.length > 0 &&
            eeioData.map((eeio, index) => (
              <TableRow key={index}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{eeio.scope || "-"}</TableCell>
                <TableCell>{eeio.pi || "-"}</TableCell>
                <TableCell>{eeio.unitname || "-"}</TableCell>
                <TableCell>{eeio.level1 || "-"}</TableCell>
                <TableCell>{eeio.level2 || "-"}</TableCell>
                <TableCell>{eeio.level3 || "-"}</TableCell>
                <TableCell>{eeio.level4 || "-"}</TableCell>
                <TableCell>{eeio.level5 || "-"}</TableCell>
                <TableCell>{eeio.sector || "-"}</TableCell>
                <TableCell>{eeio.exiobasecode || "-"}</TableCell>
                <TableCell>{eeio.uom || "-"}</TableCell>
                <TableCell>{eeio.quantity || "-"}</TableCell>
                <TableCell>{eeio.co2e?.toFixed(2) || "-"}</TableCell>
                <TableCell>{eeio.co2eofco2?.toFixed(2) || "-"}</TableCell>
                <TableCell>{eeio.co2eofch4?.toFixed(2) || "-"}</TableCell>
                <TableCell>{eeio.co2eofn2o?.toFixed(2) || "-"}</TableCell>
                <TableCell>{eeio.co2eofother?.toFixed(2) || "-"}</TableCell>
                <TableCell>{eeio.continent || "-"}</TableCell>
                <TableCell>{eeio.country || "-"}</TableCell>
                <TableCell>{eeio.usercountry || "-"}</TableCell>
                <TableCell>
                  <div className="flex justify-center gap-x-1">
                    <Link
                      to={`/eeio/${eeio.id}/${eeio.pi}/edit`}
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
