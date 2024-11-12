import React, {
  createContext,
  useContext,
  useState,
  useRef,
  useEffect,
} from "react";
import { toPng } from "html-to-image";

const EmissionContext = createContext();
const EmissionContextProvider = ({ children }) => {
  const [companyName, setCompanyName] = useState(null);
  const [businessUnitsActivities, setBusinessUnitsActivities] = useState([]);
  const [businessUnits, setBusinessUnits] = useState([]);
  const [totalCO2e, setTotalCO2e] = useState(0);
  const [totalScope1CO2e, setTotalScope1CO2e] = useState(0);
  const [totalScope2CO2e, setTotalScope2CO2e] = useState(0);
  const [totalScope3CO2e, setTotalScope3CO2e] = useState(0);
  const [emissions, setEmissions] = useState({
    perEmployee: 0,
    perRevenue: 0,
    perProduct: 0,
  });
  const [scope3CategoriesCO2e, setScope3CategoriesCO2e] = useState([
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  ]);
  const [mapImage, setMapImage] = useState(null);
  const [charts, setCharts] = useState({});
  const mapRef = useRef();

  const captureMapImage = async () => {
    if (mapRef.current) {
      const dataUrl = await toPng(mapRef.current, { pixelRatio: 3 });
      setMapImage(dataUrl);
    }
  };

  const calculateTotalC02e = () => {
    const totalCO2e = businessUnitsActivities.reduce(
      (accumulator, obj) => accumulator + obj.CO2e,
      0
    );
    return totalCO2e / 1000; // kg CO2e
  };

  const calculateTotalC02eOfGivenScope = (scope) => {
    const totalC02eOfGivenScope = businessUnitsActivities.reduce(
      (accumulator, obj) => {
        if (obj.scope === scope) {
          return accumulator + obj.CO2e;
        }
        return accumulator;
      },
      0
    );
    return totalC02eOfGivenScope / 1000; // kg CO2e of given scope
  };

  const calculateTotalC02eOfScope2 = () => {
    const totalC02eOfScope2 = businessUnitsActivities.reduce(
      (accumulator, obj) => {
        // Here we are excluding marketBased data(Scope 2)
        if (obj.scope === "Scope 2" && obj.level5 !== "marketBased") {
          return accumulator + obj.CO2e;
        }
        return accumulator;
      },
      0
    );
    return totalC02eOfScope2 / 1000; // kg CO2e of given scope
  };

  const calculateC02ePercentageOfGivenScope = (scopeCO2e) => {
    if (totalCO2e === 0) {
      return 0;
    }

    return (((scopeCO2e * 1000) / (totalCO2e * 1000)) * 100).toFixed(2);
  };

  const calculateC02ePercentageOfScope2 = () => {
    if (totalCO2e === 0) {
      return 0;
    }

    return (((totalScope2CO2e * 1000) / (totalCO2e * 1000)) * 100).toFixed(2);
  };

  const calculateC02ePercentageOfGivenScopeCategory = (scopeCategory) => {
    const totalC02eOfGivenScopeCategory = businessUnitsActivities.reduce(
      (accumulator, obj) => {
        if (obj.level1Category === scopeCategory) {
          return accumulator + obj.CO2e;
        }
        return accumulator;
      },
      0
    );

    if (totalC02eOfGivenScopeCategory === 0) {
      return totalC02eOfGivenScopeCategory;
    } else {
      return (
        (totalC02eOfGivenScopeCategory / (totalCO2e * 1000)) *
        100
      ).toFixed(2);
    }
  };

  const calculateC02ePercentageOfLocationBasedScopeCategory = (
    scopeCategory
  ) => {
    const totalC02eOfGivenScopeCategory = businessUnitsActivities.reduce(
      (accumulator, obj) => {
        // Here we are excluding marketBased data(Scope 2)
        if (
          obj.level1Category === scopeCategory &&
          obj.level5 !== "marketBased"
        ) {
          return accumulator + obj.CO2e;
        }
        return accumulator;
      },
      0
    );

    if (totalC02eOfGivenScopeCategory === 0) {
      return totalC02eOfGivenScopeCategory;
    } else {
      return (
        (totalC02eOfGivenScopeCategory / (totalCO2e * 1000)) *
        100
      ).toFixed(2);
    }
  };

  const emissionsCalculationsFunctions = {
    calculateTotalC02e,
    calculateTotalC02eOfGivenScope,
    calculateTotalC02eOfScope2,
    calculateC02ePercentageOfGivenScope,
    calculateC02ePercentageOfGivenScopeCategory,
    calculateC02ePercentageOfScope2,
    calculateC02ePercentageOfLocationBasedScopeCategory,
  };

  const emissionStates = {
    companyName,
    setCompanyName,
    businessUnitsActivities,
    setBusinessUnitsActivities,
    totalCO2e,
    setTotalCO2e,
    totalScope1CO2e,
    setTotalScope1CO2e,
    totalScope2CO2e,
    setTotalScope2CO2e,
    totalScope3CO2e,
    setTotalScope3CO2e,
    scope3CategoriesCO2e,
    setScope3CategoriesCO2e,
    businessUnits,
    setBusinessUnits,
    emissions,
  };

  const contextValue = {
    mapImage,
    setMapImage,
    mapRef,
    charts,
    setCharts,
    captureMapImage,
    emissionsCalculationsFunctions,
    emissionStates,
  };
  useEffect(() => {
    if (businessUnits.length > 0) {
      let noOfEmployees = 0;
      let production = 0;
      let revenue = 0;

      businessUnits.forEach((item) => {
        noOfEmployees += item.noOfEmployees;
        production += item.production;
        revenue += item.revenue;
      });
      if (noOfEmployees || production || revenue) {
        setEmissions({
          perEmployee: (noOfEmployees ? totalCO2e / noOfEmployees:0).toFixed(2),
          perProduct: (production ? totalCO2e / production : 0).toFixed(2),
          perRevenue: (revenue ? totalCO2e / revenue : 0).toFixed(2),
        });
     }
    }
 
  }, [businessUnits, totalCO2e]);
console.log(emissions)
  return (
    <EmissionContext.Provider value={contextValue}>
      {children}
    </EmissionContext.Provider>
  );
};
export const useEmissionContext = () => useContext(EmissionContext);

export default EmissionContextProvider;
