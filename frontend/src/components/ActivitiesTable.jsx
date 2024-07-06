import trashIcon from "../assets/trash-icon.svg";
import editIcon from "../assets/edit-icon.svg";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { request } from "../utils/request.js";

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
          // row deleted fetched data again
          fetchCompanyData();
        })
        .catch((error) => {
          toast.error("Error deleting data");
          console.log(error);
        });
    };
  };

  return (
    <div className="mx-4 my-4 hide-scroll border border-slate-500 rounded overflow-x-auto shadow-2xl">
      <table className="border-0">
        <thead>
          <tr className="bg-tc-blue text-white border-slate-500">
            <th className="border-t-0 border-slate-500 border-s-0">Scope</th>
            <th className="border-t-0 border-slate-500">Business Unit</th>
            <th className="border-t-0 border-slate-500">Scope Category</th>
            <th className="border-t-0 border-slate-500">Level 1</th>
            <th className="border-t-0 border-slate-500">Level 2</th>
            <th className="border-t-0 border-slate-500">Level 3</th>
            <th className="border-t-0 border-slate-500">Level 4</th>
            <th className="border-t-0 border-slate-500">Level 5</th>
            <th className="border-t-0 border-slate-500">uom</th>
            <th className="border-t-0 border-slate-500">Quantity</th>
            <th className="border-t-0 border-slate-500">
              kg CO<span style={{ fontSize: "0.6em" }}>2</span>e
            </th>
            <th className="border-t-0 border-slate-500">
              kg CO<span style={{ fontSize: "0.6em" }}>2</span>e of CO
              <span style={{ fontSize: "0.6em" }}>2</span>
            </th>
            <th className="border-t-0 border-slate-500">
              kg CO<span style={{ fontSize: "0.6em" }}>2</span>e of CH
              <span style={{ fontSize: "0.6em" }}>4</span>
            </th>
            <th className="border-t-0 border-slate-500">
              kg CO<span style={{ fontSize: "0.6em" }}>2</span>e of N
              <span style={{ fontSize: "0.6em" }}>2</span>O
            </th>
            <th className="border-t-0 border-slate-500 border-e-0">Actions</th>
          </tr>
        </thead>
        <tbody>
          {companyData.length > 0 &&
            companyData.map((item) => (
              <tr className="border-slate-500">
                <td className="border-slate-500 border-s-0">
                  {item.scope || "-"}
                </td>
                <td className="border-slate-500">{item.businessunit || "-"}</td>
                <td className="border-slate-500">
                  {item.fuel_category || "-"}
                </td>
                <td className="border-slate-500">{item.level1 || "-"}</td>
                <td className="border-slate-500">{item.level2 || "-"}</td>
                <td className="border-slate-500">{item.level3 || "-"}</td>
                <td className="border-slate-500">{item.level4 || "-"}</td>
                <td className="border-slate-500">{item.level5 || "-"}</td>
                <td className="border-slate-500">{item.uom || "-"}</td>
                <td className="border-slate-500">{item.quantity || "-"}</td>
                <td className="border-slate-500">
                  {item.co2e?.toFixed(2) || "-"}
                </td>
                <td className="border-slate-500">
                  {item.co2eofco2?.toFixed(2) || "-"}
                </td>
                <td className="border-slate-500">
                  {item.co2eofch4?.toFixed(2) || "-"}
                </td>
                <td className="border-slate-500">
                  {item.co2eofn2o?.toFixed(2) || "-"}
                </td>
                <td className="border-slate-500 border-e-0">
                  <div className="flex justify-center gap-x-1">
                    <Link
                      to={`/activites/${item.id}/edit`}
                      className="flex justify-center items-center"
                    >
                      <img
                        src={editIcon}
                        className="p-1 rounded hover:bg-slate-300 w-7 h-7"
                      />
                    </Link>
                    <img
                      src={trashIcon}
                      className="p-1 rounded hover:bg-slate-300 w-7 h-7"
                      onClick={handleDelete(item.id)}
                    />
                  </div>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default ActivitiesTable;
