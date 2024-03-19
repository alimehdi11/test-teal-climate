import React, { useState, useEffect } from "react";
import trashIcon from "../assets/trash-icon.svg";
import editIcon from "../assets/edit-icon.svg";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

const Profiletable = ({ profileData, setProfileData, userId }) => {
  const fetchData = async () => {
    try {
      const response = await fetch(`http://localhost:5000/companies/${userId}`);
      if (!response.ok) {
        throw new Error(`Failed to fetch data: ${response.statusText}`);
      }
      const jsonData = await response.json();
      setProfileData(jsonData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleDelete = (id) => {
    return () => {
      fetch(`http://localhost:5000/companies/${id}`, {
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
          fetchData();
        })
        .catch((error) => {
          toast.error("Error deleting data");
          console.log(error);
        });
    };
  };

  return (
    <section className="rounded-lg flex flex-col items-start justify-center pt-0 px-0 pb-6 box-border gap-[20px] max-w-full text-left text-sm text-white font-poppins font-medium mq1325:w-[calc(100%_-_40px)] overflow-x-auto m-4 mb-40 shadow-black shadow-sm">
      <div
        className="flex justify-start max-w-full bg-brand-color-2 py-2"
        style={{ width: "100%" }}
      >
        <div className="flex-1 flex justify-center items-center">
          Busniess Unit
        </div>
        <div className="flex-1 flex justify-center items-center">Continent</div>
        <div className="flex-1 flex justify-center items-center">Country</div>
        <div className="flex-1 flex justify-center items-center">Region</div>
        <div className="flex-1 flex justify-center items-center">Revenue</div>
        <div className="flex-1 flex justify-center items-center">
          Production / Clients
        </div>
        <div className="flex-1 flex justify-center items-center">
          No. Of Employees
        </div>
        <div className="flex-1 flex justify-center items-center">
          Ownership / <br />
          Partnership %
        </div>
        <div className="flex-1 flex justify-center items-center">Notes</div>
        <div className="flex-1 flex justify-center items-center">Actions</div>
      </div>
      <div
        className="flex flex-col justify-start max-w-full text-dark"
        style={{ width: "100%", gap: "20px" }}
      >
        {
          // on initial render data will be empty array
          profileData.length > 0 &&
            profileData.map((rowData, index) => (
              <div key={index} className="flex flex-row gap-4">
                <div className="flex-1 flex justify-center items-center">
                  {rowData.unitname || "-"}
                </div>
                <div className="flex-1 flex justify-center items-center">
                  {rowData.continent || "-"}
                </div>
                <div className="flex-1 flex justify-center items-center">
                  {rowData.countries || "-"}
                </div>
                <div className="flex-1 flex justify-center items-center">
                  {rowData.region || "-"}
                </div>
                <div className="flex-1 flex justify-center items-center">
                  {rowData.revenue || "-"}
                </div>
                <div className="flex-1 flex justify-center items-center">
                  {rowData.production || "-"}
                </div>
                <div className="flex-1 flex justify-center items-center">
                  {rowData.employees || "-"}
                </div>
                <div className="flex-1 flex justify-center items-center">
                  {rowData.partnership || "-"}
                </div>
                <div className="flex-1 flex justify-center items-center">
                  {rowData.notes || "-"}
                </div>
                <div className="flex-1 flex justify-center items-center gap-4 text-base">
                  <Link
                    to={`/profile/${rowData.id}/edit`}
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
                    onClick={handleDelete(rowData.id)}
                  />
                </div>
              </div>
            ))
        }
      </div>
    </section>
  );
};

export default Profiletable;
