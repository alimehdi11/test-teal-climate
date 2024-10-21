import { useEffect, useState } from "react";
import { MapContainer, GeoJSON } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import worldMapJson from "../../data/worldMap.json";
import { usePeriod } from "../../contexts/PeriodProvider.jsx";
import { api } from "../../../api/index.js";

const WorldMap = () => {
  const [businessUnitsActivities, setBusinessUnitsActivities] = useState([]);
  const [
    businessUnitsActivitiesForSelectedPeriod,
    setBusinessUnitsActivitiesForSelectedPeriod,
  ] = useState([]);
  const [showMap, setShowMap] = useState(true);
  const { selectedPeriod } = usePeriod();

  const fetchBusinessUnitsActivities = async () => {
    try {
      const { success, data, message } =
        await api.businessUnitsActivities.getAllBusinessUnitsActivities();
      if (success) {
        setBusinessUnitsActivities(data);
      } else {
        toast.error(message);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  // Function to determine the style of each country based on emissions data
  const geoJsonStyle = (feature) => {
    let emissionsValue = 0;
    // Extracting emissions from user activities and adding all emissions if available for given country
    businessUnitsActivitiesForSelectedPeriod.forEach((businessUnitActivity) => {
      if (
        businessUnitActivity.businessUnit.country ===
          feature.properties.formal_en ||
        businessUnitActivity.businessUnit.country === feature.properties.name
      ) {
        emissionsValue += businessUnitActivity.CO2e;
      }
    });
    let fillColor = "#E0E0E0"; // Default color for countries with no data
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
    const country = feature.properties.name || feature.properties.formal_en;
    let emissionsValue = 0;
    // Extracting emissions from user activities and adding all emissions if available for given country
    businessUnitsActivitiesForSelectedPeriod.forEach((businessUnitActivity) => {
      if (
        businessUnitActivity.businessUnit.country ===
          feature.properties.formal_en ||
        businessUnitActivity.businessUnit.country === feature.properties.name
      ) {
        emissionsValue += businessUnitActivity.CO2e;
      }
    });
    // converting emissionsValue to "tonnes unit"\
    emissionsValue = Number((emissionsValue / 1000).toFixed(2));
    const tooltipContent = emissionsValue
      ? `<strong>${country}</strong> : ${emissionsValue}`
      : `<strong>${country}</strong>`;
    layer.bindTooltip(tooltipContent);
  };

  const filterBusinessUnitsActivitiesForSelectedPeriod = async () => {
    let filterdBusinessUnitsActivities = businessUnitsActivities.filter(
      (activity) => {
        return activity.businessUnit.period.id === Number(selectedPeriod);
      }
    );
    setBusinessUnitsActivitiesForSelectedPeriod(filterdBusinessUnitsActivities);
  };

  useEffect(() => {
    fetchBusinessUnitsActivities();
  }, []);

  useEffect(() => {
    if (businessUnitsActivities.length > 0 && selectedPeriod) {
      setShowMap(false);
      filterBusinessUnitsActivitiesForSelectedPeriod();
      setTimeout(() => {
        setShowMap(true);
      });
    }
  }, [businessUnitsActivities, selectedPeriod]);

  return (
    showMap && (
      <div className=" gap-4 mt-4 rounded-md  relative">
        <div className="flex flex-col items-start space-y-0 absolute z-[9] left-8 top-8 ">
          <h3 className="text-lg font-semibold mb-1">
            Location wise Emissions
          </h3>
          <div className="flex justify-between max-w-[300px] w-full text-sm text-gray-600 font-semibold">
            <span>0%</span>
            <span>100%</span>
          </div>
          <div
            style={{
              background:
                "linear-gradient(90deg, #FFECAA 0%, #FFC700 32%, #FFA400 64%, #FF6B00 100%)",
            }}
            className="max-w-[300px] w-full bg-gray-200 h-4 rounded-full"
          ></div>
        </div>
        <MapContainer
          className="w-full h-[300px] bg-white md:h-[600px] rounded-lg lg:flex-2 "
          center={[50, 0]}
          zoom={2}
          zoomControl={false}
          scrollWheelZoom={false}
          doubleClickZoom={false}
          touchZoom={false}
          dragging={false}
          attributionControl={false}
          style={{ zIndex: 1 }}
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
