import { toast } from "react-toastify";
import { request } from "../utils/request.js";
import trashIcon from "../assets/trash-icon.svg";
import editIcon from "../assets/edit-icon.svg";
import { Link } from "react-router-dom";

const ProfileTable = ({ profileData, fetchProfileData }) => {
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
    <div className="mx-4 my-4 hide-scroll border border-slate-500 rounded overflow-x-auto shadow-2xl">
      <table className="border-0">
        <thead>
          <tr className="bg-tc-blue text-white border-slate-500">
            <th className="border-t-0 border-slate-500 border-s-0">S.No</th>
            <th className="border-t-0 border-slate-500">Business Unit</th>
            <th className="border-t-0 border-slate-500">Continent</th>
            <th className="border-t-0 border-slate-500">Countries</th>
            <th className="border-t-0 border-slate-500">Region</th>
            <th className="border-t-0 border-slate-500">Employees</th>
            <th className="border-t-0 border-slate-500">Production</th>
            <th className="border-t-0 border-slate-500">Revenue</th>
            <th className="border-t-0 border-slate-500">Notes</th>
            <th className="border-t-0 border-slate-500">Partnership</th>
            <th className="border-t-0 border-slate-500 border-e-0">Actions</th>
          </tr>
        </thead>
        <tbody>
          {profileData.length > 0 &&
            profileData.map((profile, index) => (
              <tr className="border-slate-500">
                <td
                  className={
                    "border-slate-500 border-s-0" +
                    (index === profileData.length - 1 ? " border-b-0" : "")
                  }
                >
                  {index + 1}
                </td>
                <td
                  className={
                    "border-slate-500" +
                    (index === profileData.length - 1 ? " border-b-0" : "")
                  }
                >
                  {profile.unitname}
                </td>
                <td
                  className={
                    "border-slate-500" +
                    (index === profileData.length - 1 ? " border-b-0" : "")
                  }
                >
                  {profile.continent}
                </td>
                <td
                  className={
                    "border-slate-500" +
                    (index === profileData.length - 1 ? " border-b-0" : "")
                  }
                >
                  {profile.countries}
                </td>
                <td
                  className={
                    "border-slate-500" +
                    (index === profileData.length - 1 ? " border-b-0" : "")
                  }
                >
                  {profile.region}
                </td>
                <td
                  className={
                    "border-slate-500" +
                    (index === profileData.length - 1 ? " border-b-0" : "")
                  }
                >
                  {profile.employees}
                </td>
                <td
                  className={
                    "border-slate-500" +
                    (index === profileData.length - 1 ? " border-b-0" : "")
                  }
                >
                  {profile.production}
                </td>
                <td
                  className={
                    "border-slate-500" +
                    (index === profileData.length - 1 ? " border-b-0" : "")
                  }
                >
                  {profile.revenue}
                </td>
                <td
                  className={
                    "border-slate-500" +
                    (index === profileData.length - 1 ? " border-b-0" : "")
                  }
                >
                  {profile.notes}
                </td>
                <td
                  className={
                    "border-slate-500" +
                    (index === profileData.length - 1 ? " border-b-0" : "")
                  }
                >
                  {profile.partnership}
                </td>
                <td
                  className={
                    "border-slate-500 border-e-0" +
                    (index === profileData.length - 1 ? " border-b-0" : "")
                  }
                >
                  <div className="flex justify-center gap-x-1">
                    <Link
                      to={`/profile/${profile.id}/edit`}
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
                      onClick={handleDelete(profile.id)}
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

export default ProfileTable;
