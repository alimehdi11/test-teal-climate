import React, { createContext, useContext, useState, useRef } from "react";
import { toPng } from "html-to-image";
import Report from "../pages/report/Report";

const EmissionContext = createContext();
const EmissionContextProvider = ({ children }) => {
  const [mapImage, setMapImage] = useState(null);
  const [charts, setCharts] = useState({});

  const mapRef = useRef();

  const captureMapImage = async () => {
    if (mapRef.current) {
      const dataUrl = await toPng(mapRef.current, { pixelRatio: 3 });
      setMapImage(dataUrl);
    }
  };

  const contextValue = {
    mapImage,
    setMapImage,
    mapRef,
    charts,
    setCharts,
    captureMapImage,
  };
  return (
    <EmissionContext.Provider value={contextValue}>
      {children}
    </EmissionContext.Provider>
  );
};
export const useEmissionContext = () => useContext(EmissionContext);

export default EmissionContextProvider;
