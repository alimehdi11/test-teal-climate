import React from "react";
import trashIcon from "../assets/trash-icon.svg";
import editIcon from "../assets/edit-icon.svg";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

const FrameComponent = ({
  companyData,
  setCompanyData,
  userId,
  setEdit,
  setIdOfDataToEdit,
}) => {
  const fetchCompanyData = async () => {
    try {
      const response = await fetch(
        `http://localhost:5000/companiesdata/${userId}`
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
      fetch(`http://localhost:5000/companiesdata/${id}`, {
        method: "DELETE",
        headers: {
          accept: "application/json",
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
    <section className="rounded-lg font-poppins overflow-x-auto mx-4 mb-40 shadow-black shadow-sm">
      <div
        className="flex bg-brand-color-2 text-white py-2"
        style={{ width: `${205 * 15}px` }}
      >
        <div
          style={{ flexBasis: "205px" }}
          className="flex-1 flex-shrink-0 flex justify-center items-center"
        >
          Scope
        </div>
        <div
          style={{ flexBasis: "205px" }}
          className="flex-1 flex-shrink-0 flex justify-center items-center"
        >
          Business Unit
        </div>
        <div
          style={{ flexBasis: "205px" }}
          className="flex-1 flex-shrink-0 flex justify-center items-center"
        >
          Scope Category
        </div>
        <div
          style={{ flexBasis: "205px" }}
          className="flex-1 flex-shrink-0 flex justify-center items-center"
        >
          Level 1
        </div>
        <div
          style={{ flexBasis: "205px" }}
          className="flex-1 flex-shrink-0 flex justify-center items-center"
        >
          Level 2
        </div>
        <div
          style={{ flexBasis: "205px" }}
          className="flex-1 flex-shrink-0 flex justify-center items-center"
        >
          Level 3
        </div>
        <div
          style={{ flexBasis: "205px" }}
          className="flex-1 flex-shrink-0 flex justify-center items-center "
        >
          Level 4
        </div>
        <div
          style={{ flexBasis: "205px" }}
          className="flex-1 flex-shrink-0 flex justify-center items-center"
        >
          Level 5
        </div>
        <div
          style={{ flexBasis: "205px" }}
          className="flex-1 flex-shrink-0 flex justify-center items-center"
        >
          UOM
        </div>
        <div
          style={{ flexBasis: "205px" }}
          className="flex-1 flex-shrink-0 flex justify-center items-center"
        >
          Quantity
        </div>
        <div
          style={{ flexBasis: "205px" }}
          className="flex-1 flex-shrink-0 flex justify-center items-center"
        >
          kg CO₂e
        </div>
        <div
          style={{ flexBasis: "205px" }}
          className="flex-1 flex-shrink-0 flex justify-center items-center"
        >
          kg CO₂e of CO₂
        </div>
        <div
          style={{ flexBasis: "205px" }}
          className="flex-1 flex-shrink-0 flex justify-center items-center"
        >
          kg CO₂e of CH₄
        </div>
        <div
          style={{ flexBasis: "205px" }}
          className="flex-1 flex-shrink-0 flex justify-center items-center"
        >
          kg CO₂e of N₂O
        </div>
        <div
          style={{ flexBasis: "205px" }}
          className="flex-1 flex-shrink-0 flex justify-center items-center"
        >
          Actions
        </div>
      </div>
      {/* Table rows */}
      {companyData &&
        companyData.map((item, index) => (
          <div key={index} className="flex mt-2">
            <div
              style={{ flexBasis: "205px" }}
              className="flex-1 flex-shrink-0 flex justify-center items-center"
            >
              {item.scope || "-"}
            </div>
            <div
              style={{ flexBasis: "205px" }}
              className="flex-1 flex-shrink-0 flex justify-center items-center"
            >
              {item.businessunit || "-"}
            </div>
            <div
              style={{ flexBasis: "205px" }}
              className="flex-1 flex-shrink-0 flex justify-center items-center"
            >
              {item.fuel_category || "-"}
            </div>
            <div
              style={{ flexBasis: "205px" }}
              className="flex-1 flex-shrink-0 flex justify-center items-center"
            >
              {item.level1 || "-"}
            </div>
            <div
              style={{ flexBasis: "205px" }}
              className="flex-1 flex-shrink-0 flex justify-center items-center"
            >
              {item.level2 || "-"}
            </div>
            <div
              style={{ flexBasis: "205px" }}
              className="flex-1 flex-shrink-0 flex justify-center items-center"
            >
              {item.level3 || "-"}
            </div>
            <div
              style={{ flexBasis: "205px" }}
              className="flex-1 flex-shrink-0 flex justify-center items-center"
            >
              {item.level4 || "-"}
            </div>
            <div
              style={{ flexBasis: "205px" }}
              className="flex-1 flex-shrink-0 flex justify-center items-center"
            >
              {item.level5 || "-"}
            </div>
            <div
              style={{ flexBasis: "205px" }}
              className="flex-1 flex-shrink-0 flex justify-center items-center"
            >
              {item.uom || "-"}
            </div>
            <div
              style={{ flexBasis: "205px" }}
              className="flex-1 flex-shrink-0 flex justify-center items-center"
            >
              {item.quantity || "-"}
            </div>
            <div
              style={{ flexBasis: "205px" }}
              className="flex-1 flex-shrink-0 flex justify-center items-center"
            >
              {item.co2e || "-"}
            </div>
            <div
              style={{ flexBasis: "205px" }}
              className="flex-1 flex-shrink-0 flex justify-center items-center"
            >
              {item.co2eofco2 || "-"}
            </div>
            <div
              style={{ flexBasis: "205px" }}
              className="flex-1 flex-shrink-0 flex justify-center items-center"
            >
              {item.co2eofch4 || "-"}
            </div>
            <div
              style={{ flexBasis: "205px" }}
              className="flex-1 flex-shrink-0 flex justify-center items-center"
            >
              {item.co2eofn2o || "-"}
            </div>
            <div
              style={{ flexBasis: "205px" }}
              className="flex-1 flex-shrink-0 flex justify-center items-center gap-4 text-base"
            >
              <Link
                to={`/activites/${item.id}/edit`}
                style={{ textDecoration: "none" }}
              >
                <img
                  src={editIcon}
                  className="p-1 rounded hover:bg-slate-300"
                />
              </Link>
              <img
                src={trashIcon}
                className="p-1 rounded hover:bg-slate-300"
                onClick={handleDelete(item.id)}
              />
            </div>
          </div>
        ))}
    </section>
  );
};

export default FrameComponent;
