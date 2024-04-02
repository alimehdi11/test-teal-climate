import React, { useEffect, useState } from "react";
import { MapContainer, GeoJSON } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import worldGeoJSON from "./data.json"; // Ensure the path to your GeoJSON data is correct
import "./App.css"; // Ensure this CSS file includes the necessary styles
const Map = () => {
  const [emissionsData, setEmissionsData] = useState({});
  const [userId, setUserId] = useState("");

  useEffect(() => {
    // Fetch userId from localStorage
    const storedUserID = localStorage.getItem("userId");
    if (storedUserID) {
      setUserId(storedUserID);
    }
  }, []);

  // Fetch emissions data from backend upon component mount
  useEffect(() => {
    if (userId) {
      fetch(`${process.env.REACT_APP_API_BASE_URL}/worldHeatMap/${userId}`)
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
          // console.log("===>>> countriesEmissions", countriesEmissions);
          setEmissionsData(countriesEmissions);
        })
        .catch((error) =>
          console.error("Error fetching emissions data:", error)
        );
    }
  }, [userId]);

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
    // console.log("onEachFeature");
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

  return (
    <div className="h-[400px] bg-[#ffffff] mx-auto overflow-hidden mt-10 px-4 flex gap-2">
      <div className="flex-[1]">
        <h3>Location wise Emissions</h3>
        <div
          className="h-[15px] rounded-[100px]"
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
        className="w-full h-full bg-white flex-[3]"
        center={[25, 20]}
        zoom={1}
        zoomControl={false}
        scrollWheelZoom={true}
        doubleClickZoom={false}
        touchZoom={false}
        dragging={true}
        attributionControl={false}
      >
        <GeoJSON
          data={worldGeoJSON}
          style={geoJsonStyle}
          onEachFeature={onEachFeature}
        />
      </MapContainer>
    </div>
  );
};
export default Map;
