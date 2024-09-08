import { useContext, useEffect, useState } from "react";
import { MapContainer, GeoJSON } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import worldMapJson from "../../data/worldMap.json";
import { UserContext } from "../../contexts/UserContext.jsx";
import { request } from "../../utils/request.js";

const WorldMap = () => {
  const [userBusinessUnitsActivities, setUserBusinessUnitsActivities] =
    useState([]);
  const { user } = useContext(UserContext);

  const fetchUserBusinessUnitsActivities = async () => {
    try {
      const userBusinessUnitsActivitiesResponse = await request(
        `${import.meta.env.VITE_API_BASE_URL}/users/${user.id}/businessUnitsActivities`,
        "GET"
      );
      if (!userBusinessUnitsActivitiesResponse.ok) {
        throw new Error(`Failed to fetch data:`);
      }
      const userBusinessUnitsActivities =
        await userBusinessUnitsActivitiesResponse.json();
      setUserBusinessUnitsActivities(userBusinessUnitsActivities);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  // Function to determine the style of each country based on emissions data
  const geoJsonStyle = (feature) => {
    let emissionsValue = 0;

    // Extracting emissions from user activities and adding all emissions if available for given country
    userBusinessUnitsActivities.forEach((userBusinessUnitActivity) => {
      if (
        userBusinessUnitActivity.businessUnit.country ===
          feature.properties.formal_en ||
        userBusinessUnitActivity.businessUnit.country ===
          feature.properties.name
      ) {
        emissionsValue += userBusinessUnitActivity.CO2e;
      }
    });

    let fillColor = "#E0E0E0"; // Default color for countries with no data or not matching

    if (emissionsValue) {
      if (emissionsValue > 1000) {
        fillColor = "#FF7100"; // High emissions
      } else if (emissionsValue > 500) {
        fillColor = "#FFCB13"; // Medium emissions
      } else {
        fillColor = "#FFE99E"; // Low emissions
      }
    }

    return {
      fillColor,
      weight: 1,
      opacity: 1,
      color: "white",
      fillOpacity: 0.7,
    };
  };

  // Function to handle tooltip content for each country
  const onEachFeature = (feature, layer) => {
    const country = feature.properties.formal_en || feature.properties.name;
    let emissionsValue = 0;

    // Extracting emissions from user activities and adding all emissions if available for given country
    userBusinessUnitsActivities.forEach((userBusinessUnitActivity) => {
      if (
        userBusinessUnitActivity.businessUnit.country ===
          feature.properties.formal_en ||
        userBusinessUnitActivity.businessUnit.country ===
          feature.properties.name
      ) {
        emissionsValue += userBusinessUnitActivity.CO2e;
      }
    });

    const tooltipContent = emissionsValue
      ? `<strong>${country}</strong> : ${emissionsValue}`
      : `<strong>${country}</strong>`;
    layer.bindTooltip(tooltipContent);
  };

  useEffect(() => {
    fetchUserBusinessUnitsActivities();
  }, []);

  return (
    <div className="p-4 flex flex-col lg:flex-row gap-4 mt-4 rounded-md bg-white">
      {/* Emissions bar */}
      <div className="lg:flex-1 max-w-[400px]">
        <h3 className="lg:mt-0">Location wise Emissions</h3>
        <div
          className="h-[15px] rounded-[100px] min-w-[300px]"
          style={{
            background:
              "linear-gradient(90deg, #FFECAA 0%, #FFC700 32.07%, #FFA400 64.04%, #FF6B00 100%)",
          }}
        ></div>
        <div className="flex justify-between">
          <span>0 %</span>
          <span>100 %</span>
        </div>
      </div>
      <MapContainer
        className="w-full h-full min-h-[300px] bg-white md:min-h-[600px] rounded-lg lg:flex-2"
        center={[50, 20]}
        zoom={2}
        zoomControl={false}
        scrollWheelZoom={false}
        doubleClickZoom={false}
        touchZoom={false}
        dragging={false}
        attributionControl={false}
      >
        <GeoJSON
          data={worldMapJson}
          style={geoJsonStyle}
          onEachFeature={onEachFeature}
        />
      </MapContainer>
    </div>
  );
};
export default WorldMap;
