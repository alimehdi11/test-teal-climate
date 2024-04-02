import React, { useState, useEffect } from "react";
import trashIcon from "../assets/trash-icon.svg";
import editIcon from "../assets/edit-icon.svg";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

const Profiletable = ({ profileData, setProfileData, userId }) => {
  const fetchData = async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_BASE_URL}/companies/${userId}`
      );
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
      fetch(`${process.env.REACT_APP_API_BASE_URL}/companies/${id}`, {
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
    <div className="mx-5 my-10 hide-scroll border-[1px] border-gray-300 border-solid rounded-md overflow-x-auto max-w-full font-poppins shadow-2xl">
      <table className="border-0">
        <thead>
          <tr className="bg-brand-color-2 text-white">
            <th className="border-t-0">Busniess Unit</th>
            <th className="border-t-0">Continent</th>
            <th className="border-t-0">Country</th>
            <th className="border-t-0">Region</th>
            <th className="border-t-0">Revenue</th>
            <th className="border-t-0">Production / Clients</th>
            <th className="border-t-0">No. Of Employees</th>
            <th className="border-t-0">Ownership Partnership %</th>
            <th className="border-t-0">Notes</th>
            <th className="border-t-0 border-e-0">Actions</th>
          </tr>
        </thead>
        <tbody>
          {profileData.length > 0 &&
            profileData.map((rowData, index) => (
              <tr>
                <td className="border-s-0">{rowData.unitname || "-"}</td>
                <td>{rowData.continent || "-"}</td>
                <td> {rowData.countries || "-"}</td>
                <td>{rowData.region || "-"}</td>
                <td>{rowData.revenue || "-"}</td>
                <td>{rowData.production || "-"}</td>
                <td>{rowData.employees || "-"}</td>
                <td>{rowData.partnership || "-"}</td>
                <td>{rowData.notes || "-"}</td>
                <td className="border-e-0">
                  <div className="flex justify-center items-center">
                    <Link
                      className="h-[23px]"
                      to={`/profile/${rowData.id}/edit`}
                    >
                      <img
                        src={editIcon}
                        className="p-1 rounded hover:bg-slate-300 w-5"
                      />
                    </Link>
                    <img
                      src={trashIcon}
                      className="p-1 rounded hover:bg-slate-300 w-5"
                      onClick={handleDelete(rowData.id)}
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

export default Profiletable;
