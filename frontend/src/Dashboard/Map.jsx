import React, { useEffect, useState } from "react";
import { MapContainer, GeoJSON } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import worldGeoJSON from "./data.json"; // Ensure the path to your GeoJSON data is correct
import "./App.css"; // Ensure this CSS file includes the necessary styles
const Map = () => {
  // State to store fetched emissions data
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
      console.log(`2nd - http://localhost:5000/worldHeatMap/${userId}`);
      fetch(`http://localhost:5000/worldHeatMap/${userId}`)
        .then((response) => response.json())
        // .then((data) => {
        //   console.table(data);
        //   return data;
        // })
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
    // const name = feature.properties.name;
    // const name = feature.properties.formal_en || feature.properties.name;
    let country;
    if (emissionsData[feature.properties.formal_en]) {
      country = feature.properties.formal_en;
    } else if (emissionsData[feature.properties.name]) {
      country = feature.properties.name;
    }
    const emissionsValue = emissionsData[country];

    let fillColor = "#AAAAAA"; // Default color for countries with no data or not matching

    // Example logic to determine fillColor based on emissionsValue
    // You should adjust this logic based on your actual data and requirements
    if (emissionsValue) {
      if (emissionsValue > 1000) {
        fillColor = "#ff0000"; // High emissions
      } else {
        fillColor = "#00ff00"; // Low emissions
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
    // if (feature.properties && feature.properties.name) {
    let country;
    if (emissionsData[feature.properties.formal_en]) {
      console.log("===> 1");
      country = feature.properties.formal_en;
    } else if (emissionsData[feature.properties.name]) {
      console.log("===> 2");
      country = feature.properties.name;
    } else {
      console.log("===> 3");
      console.log(emissionsData);
    }
    const emissionsValue = emissionsData[country];
    const tooltipContent = `<strong>${country}</strong>: ${
      emissionsValue || "Data not available"
    }`;
    layer.bindTooltip(tooltipContent);
    // }
  };

  return (
    <div className="w-full h-[664px] bg-[#ffffff]">
      <MapContainer
        center={[25, 10]}
        zoom={1}
        className="w-full h-full"
        zoomControl={false}
        scrollWheelZoom={true}
        doubleClickZoom={false}
        touchZoom={false}
        dragging={true}
        attributionControl={false}
        style={{ background: "white" }}
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
