import { toast } from "react-toastify";
import { getBearerToken } from "./../utils/auth.utils.js";
import Table from "../components/ui/Table.jsx";

const Profiletable = ({ profileData, setProfileData, userId }) => {
  const fetchData = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/companies/${userId}`,
        {
          headers: {
            authorization: getBearerToken(),
          },
        }
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
      fetch(`${import.meta.env.VITE_API_BASE_URL}/companies/${id}`, {
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
          fetchData();
        })
        .catch((error) => {
          toast.error("Error deleting data");
          console.log(error);
        });
    };
  };

  return (
    <Table data={profileData} column={{ name: "Actions", handleDelete }} />
  );
};

export default Profiletable;
