import { createContext, useState, useEffect } from "react";
import Loader from "../components/ui/Loader.jsx";
import { request } from "../utils/request.js";

const DataContext = createContext();

const DataProvider = ({ children }) => {
  const [data, setData] = useState(null);

  useEffect(() => {
    (async () => {
      const fetchActivitesData = async () => {
        try {
          const response = await request(
            `${import.meta.env.VITE_API_BASE_URL}/activitydata`,
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

      const fetchScopeCategoriesData = async () => {
        try {
          const response = await request(
            `${import.meta.env.VITE_API_BASE_URL}/categories`,
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

      const activitiesData = await fetchActivitesData();
      const scopeCategoriesData = await fetchScopeCategoriesData();

      setData({
        activitiesData,
        scopeCategoriesData,
      });
    })();
  }, []);

  return !data ? (
    <Loader />
  ) : (
    <DataContext.Provider value={data}>{children}</DataContext.Provider>
  );
};

export { DataProvider, DataContext };
