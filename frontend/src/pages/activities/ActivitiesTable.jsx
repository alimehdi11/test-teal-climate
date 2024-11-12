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
import { filterBusinessUnitsActivitiesForSelectedPeriod } from "../../utils/helper.js";
import { api } from "../../api/index.js";

const ActivitiesTable = ({
  businessUnitsActivities,
  setBusinessUnitsActivities,
  selectedPeriod,
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
        .then(async () => {
          const { success, message, data } =
            await api.businessUnitsActivities.getAllBusinessUnitsActivities();
          if (success) {
            setBusinessUnitsActivities(
              filterBusinessUnitsActivitiesForSelectedPeriod(
                data,
                selectedPeriod
              )
            );
          } else {
            toast.error(message);
          }
        })
        .catch((error) => {
          toast.error("Error deleting data");
          console.log(error);
        });
    };
  };

  if (businessUnitsActivities.length === 0) {
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
              "Unit Of Measurement",
              "Month",
              "Level1 Category",
              "Country",
              "Continent",
              "Sector",
              "Product Or Industry",
              "Reference",
              "Eeio",
              "Reit",
              "Region",
              "Asset Type",
              "Year",
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
              <>
                kg CO
                <span style={{ fontSize: "0.6em" }}>2</span>e of other
              </>,
            ].map((item, index) => (
              <TableHead key={index}>{item}</TableHead>
            ))}
            <TableHead key="Actions" className="bg-tc-blue sticky right-0">
              Actions
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {businessUnitsActivities.map((businessUnitActivity, index) => (
            <TableRow key={index}>
              <TableCell>{index + 1}</TableCell>
              <TableCell>{businessUnitActivity.scope || "-"}</TableCell>
              <TableCell>
                {businessUnitActivity.businessUnit.title || "-"}
              </TableCell>
              <TableCell>
                {businessUnitActivity.level1Category || "-"}
              </TableCell>
              <TableCell>{businessUnitActivity.level1 || "-"}</TableCell>
              <TableCell>{businessUnitActivity.level2 || "-"}</TableCell>
              <TableCell>{businessUnitActivity.level3 || "-"}</TableCell>
              <TableCell>{businessUnitActivity.level4 || "-"}</TableCell>
              <TableCell>{businessUnitActivity.level5 || "-"}</TableCell>
              <TableCell>
                {businessUnitActivity.unitOfMeasurement || "-"}
              </TableCell>
              <TableCell>
                {businessUnitActivity.month.charAt(0).toUpperCase() +
                  businessUnitActivity.month.slice(1) || "-"}
              </TableCell>
              <TableCell>
                {businessUnitActivity.level1Category || "-"}
              </TableCell>
              <TableCell>{businessUnitActivity.country || "-"}</TableCell>
              <TableCell>{businessUnitActivity.continent || "-"}</TableCell>
              <TableCell>{businessUnitActivity.sector || "-"}</TableCell>
              <TableCell>
                {businessUnitActivity.productOrIndustry || "-"}
              </TableCell>
              <TableCell>{businessUnitActivity.reference || "-"}</TableCell>
              <TableCell>
                {businessUnitActivity.eeio
                  ? String(businessUnitActivity.eeio)
                  : "-"}
              </TableCell>
              <TableCell>
                {businessUnitActivity.reit
                  ? String(businessUnitActivity.reit)
                  : "-"}
              </TableCell>
              <TableCell>{businessUnitActivity.region || "-"}</TableCell>
              <TableCell>{businessUnitActivity.assetType || "-"}</TableCell>
              <TableCell>{businessUnitActivity.year || "-"}</TableCell>
              <TableCell>
                {businessUnitActivity.level5 === "marketBased"
                  ? businessUnitActivity.marketBasedQuantity
                  : businessUnitActivity.quantity || "-"}
              </TableCell>
              <TableCell>
                {businessUnitActivity.CO2e === 0
                  ? "-"
                  : businessUnitActivity.CO2e?.toFixed(2)}
              </TableCell>
              <TableCell>
                {businessUnitActivity.CO2e_of_CO2 === 0
                  ? "-"
                  : businessUnitActivity.CO2e_of_CO2?.toFixed(2)}
              </TableCell>
              <TableCell>
                {businessUnitActivity.CO2e_of_CH4 === 0
                  ? "-"
                  : businessUnitActivity.CO2e_of_CH4?.toFixed(2)}
              </TableCell>
              <TableCell>
                {businessUnitActivity.CO2e_of_N2O === 0
                  ? "-"
                  : businessUnitActivity.CO2e_of_N2O?.toFixed(2)}
              </TableCell>
              <TableCell>
                {businessUnitActivity.CO2e_of_other === 0
                  ? "-"
                  : businessUnitActivity.CO2e_of_other?.toFixed(2)}
              </TableCell>
              <TableCell className="sticky right-0 bg-white shadow-xl">
                <div className="flex justify-center gap-x-1">
                  <Link
                    to={
                      `/activities/${businessUnitActivity.id}/edit` +
                      (businessUnitActivity.eeio
                        ? "?eeio=true"
                        : businessUnitActivity.reit
                          ? "?reit=true"
                          : "")
                    }
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
                    onClick={handleDelete(businessUnitActivity.id)}
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
