import { createContext, useState, useEffect, useContext } from "react";
import Loader from "../components/ui/Loader.jsx";
import { request } from "../utils/request.js";
import { UserContext } from "./UserContext.jsx";
import { api } from "../../api/index.js";

const DataContext = createContext();

const DataProvider = ({ children }) => {
  const [data, setData] = useState({});
  const { user } = useContext(UserContext);
  const [isLoding, setIsLoding] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
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
        const fetchAirports = async () => {
          try {
            const response = await request(
              `${import.meta.env.VITE_API_BASE_URL}/airports`,
              "GET"
            );

            if (!response.ok) {
              throw new Error("Failed to fetch airports");
            }
            const jsonData = await response.json();
            return jsonData;
          } catch (error) {
            console.error("Error fetching airports data:", error);
          }
        };
        const [activities, level1Categories, airports, getAllPeriodsResponse] =
          await Promise.all([
            fetchActivities(),
            fetchLevel1Categories(),
            fetchAirports(),
            api.periods.getAllPeriods(),
          ]);

        setData({
          activities,
          level1Categories,
          airports,
          allPeriods: getAllPeriodsResponse.data,
        });
        setIsLoding(false);
      })();
    }
  }, [user]);

  return isLoding ? (
    <Loader />
  ) : (
    <DataContext.Provider
      value={{ data, setData, isSidebarOpen, toggleSidebar }}
    >
      {children}
    </DataContext.Provider>
  );
};

export { DataProvider, DataContext };
