import React from "react";
import trashIcon from "../assets/trash-icon.svg";
import editIcon from "../assets/edit-icon.svg";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { getBearerToken } from "./../utils/auth.utils.js";

const FrameComponent = ({ companyData, setCompanyData, userId }) => {
  const fetchCompanyData = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/companiesdata/${userId}`,
        {
          headers: {
            authorization: getBearerToken(),
          },
        }
      );
      if (!response.ok) {
        throw new Error(`Failed to fetch data:`);
      }
      const jsonData = await response.json();
      setCompanyData(jsonData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleDelete = (id) => {
    return () => {
      fetch(`${import.meta.env.VITE_API_BASE_URL}/companiesdata/${id}`, {
        method: "DELETE",
        headers: {
          accept: "application/json",
          authorization: getBearerToken(),
        },
      })
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
    <div className="mx-5 my-10 hide-scroll border-[1px] border-gray-300 border-solid rounded-md overflow-x-auto max-w-full font-poppins shadow-2xl">
      <table className="border-0">
        <thead>
          <tr className="bg-brand-color-2 text-white">
            <th className="border-t-0 border-s-0">Scope</th>
            <th className="border-t-0">Business Unit</th>
            <th className="border-t-0">Scope Category</th>
            <th className="border-t-0">Level 1</th>
            <th className="border-t-0">Level 2</th>
            <th className="border-t-0">Level 3</th>
            <th className="border-t-0">Level 4</th>
            <th className="border-t-0">Level 5</th>
            <th className="border-t-0">uom</th>
            <th className="border-t-0">Quantity</th>
            <th className="border-t-0">
              kg CO<span style={{ fontSize: "0.6em" }}>2</span>e
            </th>
            <th className="border-t-0">
              kg CO<span style={{ fontSize: "0.6em" }}>2</span>e of CO
              <span style={{ fontSize: "0.6em" }}>2</span>
            </th>
            <th className="border-t-0">
              kg CO<span style={{ fontSize: "0.6em" }}>2</span>e of CH
              <span style={{ fontSize: "0.6em" }}>4</span>
            </th>
            <th className="border-t-0">
              kg CO<span style={{ fontSize: "0.6em" }}>2</span>e of N
              <span style={{ fontSize: "0.6em" }}>2</span>O
            </th>
            <th className="border-t-0 border-e-0">Actions</th>
          </tr>
        </thead>
        <tbody>
          {companyData &&
            companyData.map((item) => (
              <tr>
                <td className="border-s-0">{item.scope || "-"}</td>
                <td>{item.businessunit || "-"}</td>
                <td>{item.fuel_category || "-"}</td>
                <td>{item.level1 || "-"}</td>
                <td>{item.level2 || "-"}</td>
                <td>{item.level3 || "-"}</td>
                <td>{item.level4 || "-"}</td>
                <td>{item.level5 || "-"}</td>
                <td>{item.uom || "-"}</td>
                <td>{item.quantity || "-"}</td>
                <td>{item.co2e?.toFixed(2) || "-"}</td>
                <td>{item.co2eofco2?.toFixed(2) || "-"}</td>
                <td>{item.co2eofch4?.toFixed(2) || "-"}</td>
                <td>{item.co2eofn2o?.toFixed(2) || "-"}</td>
                <td className="border-e-0">
                  <div className="flex justify-center items-center">
                    <Link
                      className="h-[23px]"
                      to={`/activites/${item.id}/edit`}
                    >
                      <img
                        src={editIcon}
                        className="p-1 rounded hover:bg-slate-300 w-5"
                      />
                    </Link>
                    <img
                      src={trashIcon}
                      className="p-1 rounded hover:bg-slate-300 w-5"
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

export default FrameComponent;
