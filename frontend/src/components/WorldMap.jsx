import React, { useContext, useEffect, useState } from "react";
import { MapContainer, GeoJSON } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import worldMapJson from "../data/worldMap.json";
import { getBearerToken } from "../utils/auth.js";
import { UserContext } from "../contexts/UserContext.jsx";

const WorldMap = () => {
  const [emissionsData, setEmissionsData] = useState({});
  const { user } = useContext(UserContext);

  // Function to determine the style of each country based on emissions data
  const geoJsonStyle = (feature) => {
    let country;
    if (emissionsData[feature.properties.formal_en]) {
      country = feature.properties.formal_en;
    } else if (emissionsData[feature.properties.name]) {
      country = feature.properties.name;
    }
    const emissionsValue = emissionsData[country];

    let fillColor = "#E0E0E0"; // Default color for countries with no data or not matching

    // Example logic to determine fillColor based on emissionsValue
    // You should adjust this logic based on your actual data and requirements
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
    let country;
    if (emissionsData[feature.properties.formal_en]) {
      country = feature.properties.formal_en;
    } else if (emissionsData[feature.properties.name]) {
      country = feature.properties.name;
    } else {
      // for those countries whose data is not available in "emissionsData"
      country = feature.properties.name;
    }

    const emissionsValue = emissionsData[country];
    const tooltipContent = `<strong>${country}</strong>: ${
      emissionsValue || "Data not available"
    }`;
    layer.bindTooltip(tooltipContent);
  };

  // Fetch emissions data from backend upon component mount
  useEffect(() => {
    if (user.id) {
      fetch(`${import.meta.env.VITE_API_BASE_URL}/worldHeatMap/${user.id}`, {
        headers: {
          authorization: getBearerToken(),
        },
      })
        .then((response) => response.json())
        .then((data) => {
          const countriesEmissions = data.reduce((acc, current) => {
            if (acc[current.countries]) {
              acc[current.countries] = acc[current.countries] + current.co2e;
              return acc;
            } else {
              return { ...acc, [current.countries]: current.co2e };
            }
          }, {});
          console.log("===>>> countriesEmissions", countriesEmissions);
          setEmissionsData(countriesEmissions);
        })
        .catch((error) =>
          console.error("Error fetching emissions data:", error)
        );
    }
  }, [user.id]);

  return (
    Object.keys(emissionsData).length > 0 && (
      <div className="mx-4 p-4 flex flex-col lg:flex-row gap-4 mt-4 rounded-lg bg-white">
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
          center={[55, 20]}
          zoom={2}
          zoomControl={true}
          scrollWheelZoom={true}
          doubleClickZoom={false}
          touchZoom={false}
          dragging={true}
          attributionControl={false}
        >
          <GeoJSON
            data={worldMapJson}
            style={geoJsonStyle}
            onEachFeature={onEachFeature}
          />
        </MapContainer>
      </div>
    )
  );
};
export default WorldMap;
