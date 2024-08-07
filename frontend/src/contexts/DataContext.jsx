import { createContext, useState, useEffect, useContext } from "react";
import Loader from "../components/ui/Loader.jsx";
import { request } from "../utils/request.js";
import { UserContext } from "./UserContext.jsx";

const DataContext = createContext();

const DataProvider = ({ children }) => {
  const [data, setData] = useState({});
  const { user } = useContext(UserContext);
  const [isLoding, setIsLoding] = useState(false);

  useEffect(() => {
    if (Object.keys(user).length > 0) {
      setIsLoding(true);
      (async () => {
        const fetchActivities = async () => {
          try {
            const response = await request(
              `${import.meta.env.VITE_API_BASE_URL}/activities`,
              "GET"
            );
            if (!response.ok) {
              throw new Error("Failed to fetch data");
            }
            const jsonData = await response.json();
            return jsonData;
          } catch (error) {
            console.error("Error fetching Fuel Category:", error);
          }
        };
        const fetchLevel1Categories = async () => {
          try {
            const response = await request(
              `${import.meta.env.VITE_API_BASE_URL}/level1Categories`,
              "GET"
            );
            if (!response.ok) {
              throw new Error("Failed to fetch data");
            }
            const jsonData = await response.json();
            return jsonData;
          } catch (error) {
            console.error("Error fetching categories data:", error);
          }
        };
        const activities = await fetchActivities();
        const level1Categories = await fetchLevel1Categories();
        setData({
          activities,
          level1Categories,
        });
        setIsLoding(false);
      })();
    }
  }, [user]);

  return isLoding ? (
    <Loader />
  ) : (
    <DataContext.Provider value={data}>{children}</DataContext.Provider>
  );
};

export { DataProvider, DataContext };
