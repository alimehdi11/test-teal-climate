import React, { useState, useEffect } from "react";
import { Slide, ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useParams, useNavigate } from "react-router-dom";

const FrameComponent1 = ({
  selectedScope,
  selectedLevel,
  setSelectedScope,
  setSelectedLevel,
  userId,
  setCompanyData,
}) => {
  const [scopeCategoryValue, setScopeCategoryValue] = useState("");
  const [fuelTypeValue, setFuelTypeValue] = useState("");
  const [businessUnitValue, setBusinessUnitValue] = useState("");
  const [unitOfMeasurementValue, setUnitOfMeasurementValue] = useState("");
  const [fuelNameValue, setFuelNameValue] = useState("");
  const [quantityValue, setQuantityValue] = useState("");
  const [level4Value, setLevel4Value] = useState("");
  const [level5Value, setLevel5Value] = useState("");

  const [activitesData, setActivitesData] = useState(null);

  const [businessUnits, setBusinessUnits] = useState([]);
  const [scopeCategoriesData, setScopeCategoriesData] = useState(null);

  const [unitOfMeasurements, setUnitOfMeasurements] = useState([]);
  const [scopeCategories, setScopeCategories] = useState([]);
  const [fuelTypes, setFuelTypes] = useState([]);
  const [fuelNames, setFuelNames] = useState([]);
  const [level4Options, setLevel4Options] = useState([]);
  const [level5Options, setLevel5Options] = useState([]);

  const { id } = useParams();
  const navigation = useNavigate();

  const fetchBusinessUnit = async () => {
    try {
      const response = await fetch(
        `http://localhost:5000/companies/${userId}?column=unitname`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      return await response.json();
    } catch (error) {
      console.error("Error fetching companies businessunits:", error);
    }
  };

  const fetchActivitesData = async () => {
    try {
      const response = await fetch("http://localhost:5000/activitydata");

      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      const jsonData = await response.json();

      // const uniqueFuels = [
      //   ...new Set(jsonData.companiesdatas.map((item) => item.fuel_category)),
      // ];

      // const uniqueFuelTypes = [
      //   ...new Set(jsonData.datas.map((item) => item.level2)),
      // ];

      // const uniqueFuelNames = [
      //   ...new Set(jsonData.datas.map((item) => item.level3)),
      // ];

      // const uniqueUOM = [...new Set(jsonData.datas.map((item) => item.uom))];

      // const businessUnit = [
      //   ...new Set(jsonData.companiesdatas.map((item) => item.businessunit)),
      // ];

      return jsonData;
    } catch (error) {
      console.error("Error fetching Fuel Category:", error);
    }
  };

  const fetchScopeCategoriesData = async () => {
    try {
      const response = await fetch("http://localhost:5000/categories");

      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      const jsonData = await response.json();
      return jsonData;
    } catch (error) {
      console.error("Error fetching categories data:", error);
    }
  };

  const filterScopeCategories = () => {
    let level2 = [];
    scopeCategoriesData.forEach((item) => {
      if (item.type === selectedLevel) {
        level2.push(item.categy);
      }
    });
    level2 = [...new Set(level2)];
    return level2;
  };

  const filterUnitOfMeasurements = () => {
    let unitsOfMeasurement = [];
    activitesData.datas.forEach((item) => {
      if (
        item.scope === selectedScope &&
        item.level1 === selectedLevel &&
        item.level2 === fuelTypeValue
        // &&
        // item.level3 === fuelNameValue
      ) {
        unitsOfMeasurement.push(item.uom);
      }
    });
    unitsOfMeasurement = [...new Set(unitsOfMeasurement)];
    return unitsOfMeasurement;
  };

  const filterFuelTypes = () => {
    let fuelTypes = [];
    activitesData.datas.forEach((item) => {
      if (item.scope === selectedScope && item.level1 === selectedLevel) {
        fuelTypes.push(item.level2);
      }
    });
    fuelTypes = [...new Set(fuelTypes)];
    return fuelTypes;
  };

  const filterFuelNames = () => {
    let fuelNames = [];
    activitesData.datas.forEach((item) => {
      if (
        item.level2 === fuelTypeValue &&
        item.level1 === selectedLevel &&
        item.scope === selectedScope &&
        item.level3
      ) {
        fuelNames.push(item.level3);
      }
    });
    fuelNames = [...new Set(fuelNames)];
    return fuelNames;
  };

  const calculateConversionGHG = () => {
    let co2e = null;
    let co2eofco2 = null;
    let co2eofch4 = null;
    let co2eofn2o = null;

    const ghgValues = [
      "kg CO2e",
      "kg CO2e of CO2 per unit",
      "kg CO2e of CH4 per unit",
      "kg CO2e of N2O per unit",
    ];

    for (let i = 0; i < activitesData.datas.length; i++) {
      const item = activitesData.datas[i];

      if (
        item.scope === selectedScope &&
        item.level1 === selectedLevel &&
        item.level2 === fuelTypeValue &&
        // item.level3 === fuelNameValue &&
        item.uom === unitOfMeasurementValue
      ) {
        if (item.ghg === ghgValues[0]) {
          co2e = item.ghgconversion;
        } else if (item.ghg === ghgValues[1]) {
          co2eofco2 = item.ghgconversion;
        } else if (item.ghg === ghgValues[2]) {
          co2eofch4 = item.ghgconversion;
        } else if (item.ghg === ghgValues[3]) {
          co2eofn2o = item.ghgconversion;
        }
      }
    }

    // Now co2e, co2eofco2, co2eofch4, and co2eofn2o contain the respective values

    return {
      co2e,
      co2eofco2,
      co2eofch4,
      co2eofn2o,
    };
  };

  const resetForm = () => {
    // setSelectedScope(null);
    // setSelectedLevel(null);
    setScopeCategoryValue("");
    setFuelTypeValue("");
    setUnitOfMeasurementValue("");
    setBusinessUnitValue("");
    setFuelNameValue("");
    setQuantityValue("");
  };

  const fetchCompanyData = async () => {
    try {
      const response = await fetch(
        `http://localhost:5000/companiesdata/${userId}`
      );
      if (!response.ok) {
        throw new Error(`Failed to fetch data:`);
      }
      const jsonData = await response.json();
      setCompanyData(jsonData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const fetchCompanyDataOfGivenId = async (id) => {
    try {
      const response = await fetch(
        `http://localhost:5000/companiesdata/activites/${id}`
      );
      if (!response.ok) {
        throw new Error(`Failed to fetch data:`);
      }
      const jsonData = await response.json();
      return jsonData;
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleFormSubmit = () => {
    // all value should be false
    if (
      !userId ||
      !scopeCategoryValue ||
      !fuelTypeValue ||
      !fuelNameValue ||
      !unitOfMeasurementValue ||
      !businessUnitValue ||
      !quantityValue ||
      !selectedScope ||
      !selectedLevel ||
      (level4Options.length > 0 && !level4Value) ||
      (level5Options.length > 0 && !level5Value)
    ) {
      toast.warn("Please fill all fields");
      return;
    }
    const ghgconversions = calculateConversionGHG();
    console.table({
      ids: userId,
      uom: unitOfMeasurementValue,
      businessunit: businessUnitValue,
      quantity: quantityValue,
      fuel_category: fuelNameValue,
      scope: selectedScope,
      level1: selectedLevel,
      level2: scopeCategoryValue,
      level3: fuelTypeValue,
      level4: level4Value || null,
      level5: level5Value || null,
      ...ghgconversions,
    });
    fetch("http://localhost:5000/companiesdata", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      // TODO : fuel_category value should be corrected
      body: JSON.stringify({
        ids: userId,
        uom: unitOfMeasurementValue,
        businessunit: businessUnitValue,
        quantity: quantityValue,
        fuel_category: fuelNameValue,
        level3: fuelTypeValue,
        level2: scopeCategoryValue,
        level1: selectedLevel,
        scope: selectedScope,
        level4: level4Value || null,
        level5: level5Value || null,
        ...ghgconversions,
      }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error();
        }
        toast.success("Data submitted successfully");
        resetForm();
      })
      .then(() => {
        fetchCompanyData();
      })
      .catch((error) => {
        toast.error("Error adding data");
        console.error("Couldn't submit data", error);
      });
  };

  const handleUpdateData = () => {
    if (
      !userId ||
      !scopeCategoryValue ||
      !fuelTypeValue ||
      !fuelNameValue ||
      !unitOfMeasurementValue ||
      !businessUnitValue ||
      !quantityValue ||
      !selectedScope ||
      !selectedLevel ||
      (level4Options.length > 0 && !level4Value) ||
      (level5Options.length > 0 && !level5Value)
    ) {
      toast.warn("Please fill all fields");
      return;
    }

    const ghgconversions = calculateConversionGHG();
    // console.table({
    //   ids: userId,
    //   uom: unitOfMeasurementValue,
    //   businessunit: businessUnitValue,
    //   quantity: quantityValue,
    //   fuel_category: fuelNameValue,
    //   level3: fuelTypeValue,
    //   level2: scopeCategoryValue,
    //   level1: selectedLevel,
    //   scope: selectedScope,
    //   level4: level4Value || null,
    //   level5: level5Value || null,
    //   ...ghgconversions,
    // });
    // return;
    fetch(`http://localhost:5000/companiesdata/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        accept: "application/json",
      },
      body: JSON.stringify({
        ids: userId,
        uom: unitOfMeasurementValue,
        businessunit: businessUnitValue,
        quantity: quantityValue,
        fuel_category: fuelNameValue,
        scope: selectedScope,
        level1: selectedLevel,
        level2: scopeCategoryValue,
        level3: fuelTypeValue,
        level4: level4Value || null,
        level5: level5Value || null,
        ...ghgconversions,
      }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error();
        }
        toast.success("Data updated successfully");
        resetForm();
        navigation("/activites");
      })
      .then(() => {
        fetchCompanyData();
      })
      .catch((error) => {
        toast.error("Error updating data");
        console.log(error);
      });
  };

  const handleCancel = () => {
    resetForm();
    navigation("/activites");
  };

  const filterLevel4Options = () => {
    let level4Options = [];
    activitesData.datas.forEach((item) => {
      if (
        item.scope === selectedScope &&
        item.level1 === selectedLevel &&
        item.level2 === fuelTypeValue &&
        item.level3 === fuelNameValue &&
        item.level4 !== "null" &&
        item.level4
      ) {
        level4Options.push(item.level4);
      }
    });
    level4Options = [...new Set(level4Options)];
    console.table(level4Options);
    return level4Options;
  };

  const filterLevel5Options = () => {
    let level5 = [];
    activitesData.datas.forEach((item) => {
      if (
        item.scope === selectedScope &&
        item.level1 === selectedLevel &&
        item.level2 === fuelTypeValue &&
        item.level3 === fuelNameValue &&
        item.level5 !== "null" &&
        item.level5
      ) {
        level5.push(item.level5);
      }
    });
    level5 = [...new Set(level5)];
    return level5;
  };

  useEffect(() => {
    // data comes on second render because userId is coming from parent component
    if (userId) {
      fetchActivitesData().then((activitiesData) => {
        setActivitesData(activitiesData);
      });
      fetchBusinessUnit().then((businessUnits) => {
        businessUnits = businessUnits.map((item) => item.unitname);
        setBusinessUnits(businessUnits);
      });
      fetchScopeCategoriesData().then((scopeCategoriesData) => {
        setScopeCategoriesData(scopeCategoriesData);
      });
    }
  }, [userId]);

  useEffect(() => {
    // console.log("=====>>>", 1);
    // console.log("=====>>>", selectedLevel);
    if (!id) {
      // console.log("=====>>>", 1.1);
      // console.log("=====>>>", selectedLevel);
      setScopeCategoryValue("");
    }
    if (scopeCategoriesData !== null) {
      // console.log("=====>>>", 1.2);
      // console.log("=====>>>", selectedLevel);
      const level2 = filterScopeCategories(selectedLevel);
      setScopeCategories(level2);
    }
  }, [selectedLevel]);

  useEffect(() => {
    // console.log("=====>>>", 2);
    if (!id) {
      setFuelTypes([]);
      setFuelTypeValue("");
      setUnitOfMeasurementValue("");
      setFuelNameValue("");
    }

    if (scopeCategoryValue !== "") {
      const fuelTypes = filterFuelTypes(selectedLevel);
      setFuelTypes(fuelTypes);
    }
  }, [scopeCategoryValue]);

  useEffect(() => {
    if (!id) {
      setFuelNames([]);
      setUnitOfMeasurements([]);
      setFuelNameValue("");
      setUnitOfMeasurementValue("");
    }
    if (fuelTypeValue !== "") {
      if (selectedLevel !== "Electricity") {
        // For Level1 !== "Electricity" then only we will filter fuelNames
        const fuelNames = filterFuelNames();
        setFuelNames(fuelNames);
      }
      const unitsOfMeasurement = filterUnitOfMeasurements();
      setUnitOfMeasurements(unitsOfMeasurement);
    }

    if (selectedLevel === "Electricity") {
      setFuelNameValue("-");
    }
  }, [fuelTypeValue]);

  useEffect(() => {
    if (!id) {
      // setUnitOfMeasurements([]);
      // setUnitOfMeasurementValue("");
      setLevel4Value("");
      setLevel4Options([]);
      setLevel5Value("");
      setLevel5Options([]);
    }

    if (fuelNameValue !== "" && selectedLevel !== "Electricity") {
      // const unitsOfMeasurement = filterUnitOfMeasurements();
      // setUnitOfMeasurements(unitsOfMeasurement);
      const level4Options = filterLevel4Options();
      setLevel4Options(level4Options);
      const level5Options = filterLevel5Options();
      setLevel5Options(level5Options);
    }
  }, [fuelNameValue]);

  useEffect(() => {
    if (id && activitesData) {
      fetchCompanyDataOfGivenId(id)
        .then((companyDataOfGivenId) => {
          setSelectedScope(companyDataOfGivenId[0].scope);
          setSelectedLevel(companyDataOfGivenId[0].level1);
          setScopeCategoryValue(companyDataOfGivenId[0].level2);
          setFuelTypeValue(companyDataOfGivenId[0].level3);
          setFuelNameValue(companyDataOfGivenId[0].fuel_category);
          setBusinessUnitValue(companyDataOfGivenId[0].businessunit);
          setUnitOfMeasurementValue(companyDataOfGivenId[0].uom);
          setQuantityValue(companyDataOfGivenId[0].quantity);
          setLevel4Value(companyDataOfGivenId[0].level4 || "");
          setLevel5Value(companyDataOfGivenId[0].level5 || "");
        })
        .catch((error) => {
          console.error("Failed to get company data", error);
        });
    }
  }, [id]);

  return (
    <>
      <div className="flex-1 rounded-lg bg-white shadow-[0px_4px_60px_rgba(0,_0,_0,_0.02)] flex flex-col items-end justify-start py-[18px] pr-[18px] pl-6 box-border gap-[216px] min-w-[585px] max-w-full text-left text-5xl text-dark font-poppins mq450:gap-[216px] mq800:min-w-full mq1125:gap-[216px]">
        <div className="self-stretch flex flex-col items-start justify-start gap-[32px] max-w-full mq450:gap-[32px]">
          <h1 className="m-0 h-9 relative text-inherit font-semibold font-inherit inline-block z-[1] mq450:text-lgi">
            Insert activity data here
          </h1>
          <div className="self-stretch flex flex-row items-start justify-start gap-[30px] max-w-full text-base mq800:flex-wrap">
            <div className="flex-1 flex flex-col items-start justify-start gap-[32px] min-w-[269px] max-w-full mq450:gap-[32px]">
              {/* Scope Category */}
              <div className="self-stretch flex flex-col items-start justify-start gap-[12px]">
                <h3 className="m-0 relative text-inherit capitalize font-medium font-inherit z-[1]">
                  Scope Category
                </h3>
                <select
                  className="w-full bg-not-white self-stretch h-10 rounded-lg overflow-hidden shrink-0 flex flex-row items-center justify-start pt-2.5 px-3 pb-[9px] box-border font-poppins text-sm text-gray-300 min-w-[248px] z-[1]"
                  onChange={(e) => setScopeCategoryValue(e.target.value)}
                  value={scopeCategoryValue}
                >
                  <option value="">Select Option</option>
                  {scopeCategories.map((option, index) => {
                    // TODO: This if block should be removed once database data is corrected
                    // if (!option) {
                    //   return;
                    // }
                    return (
                      <option key={index} value={option}>
                        {option}
                      </option>
                    );
                  })}
                </select>
              </div>
              {/* Fuel Type */}
              <div className="self-stretch flex flex-col items-start justify-start gap-[12px]">
                <h3 className="m-0 relative text-inherit capitalize font-medium font-inherit z-[1]">
                  {selectedLevel || "Fuel"} Type
                </h3>
                <select
                  className="w-full bg-not-white self-stretch h-10 rounded-lg overflow-hidden shrink-0 flex flex-row items-center justify-start pt-2.5 px-3 pb-[9px] box-border font-poppins text-sm text-gray-300 min-w-[248px] z-[1]"
                  onChange={(e) => setFuelTypeValue(e.target.value)}
                  value={fuelTypeValue}
                >
                  <option value="">Select Option</option>
                  {fuelTypes.map((option, index) => {
                    return (
                      <option key={index} value={option}>
                        {option}
                      </option>
                    );
                  })}
                </select>
              </div>
              {/* level4 */}
              {/* if fuelNameValue is selected and level4Options are available then only render this part*/}
              {level4Options.length > 0 && (
                <div className="self-stretch flex flex-col items-start justify-start gap-[12px]">
                  <h3 className="m-0 relative text-inherit capitalize font-medium font-inherit z-[1]">
                    Level 4
                  </h3>
                  <select
                    className="w-full bg-not-white self-stretch h-10 rounded-lg overflow-hidden shrink-0 flex flex-row items-center justify-start pt-2.5 px-3 pb-[9px] box-border font-poppins text-sm text-gray-300 min-w-[248px] z-[1]"
                    onChange={(e) => setLevel4Value(e.target.value)}
                    value={level4Value}
                  >
                    <option value="">Select Option</option>
                    {level4Options.map((option, index) => {
                      return (
                        <option key={index} value={option}>
                          {option}
                        </option>
                      );
                    })}
                  </select>
                </div>
              )}
              {/*  Unit of Measurement  */}
              <div className="self-stretch flex flex-col items-start justify-start gap-[12px]">
                <h3 className="m-0 relative text-inherit capitalize font-medium font-inherit z-[1]">
                  Unit of measurement
                </h3>
                <select
                  className="w-full bg-not-white self-stretch h-10 rounded-lg overflow-hidden shrink-0 flex flex-row items-center justify-start pt-2.5 px-3 pb-[9px] box-border font-poppins text-sm text-gray-300 min-w-[248px] z-[1]"
                  onChange={(e) => setUnitOfMeasurementValue(e.target.value)}
                  value={unitOfMeasurementValue}
                >
                  <option value="">Select Option</option>
                  {unitOfMeasurements.map((option, index) => {
                    return (
                      <option key={index} value={option}>
                        {option}
                      </option>
                    );
                  })}
                </select>
              </div>
            </div>
            <div className="flex-1 flex flex-col items-start justify-start gap-[32px] min-w-[269px] max-w-full mq450:gap-[32px]">
              {/* Business Unit */}
              <div className="self-stretch flex flex-col items-start justify-start gap-[12px]">
                <h3 className="m-0 relative text-inherit capitalize font-medium font-inherit z-[1]">
                  Business Unit
                </h3>
                <select
                  className="w-full bg-not-white self-stretch h-10 rounded-lg overflow-hidden shrink-0 flex flex-row items-center justify-start pt-2.5 px-3 pb-[9px] box-border font-poppins text-sm text-gray-300 min-w-[248px] z-[1]"
                  onChange={(e) => setBusinessUnitValue(e.target.value)}
                  value={businessUnitValue}
                >
                  <option value="">Select option</option>
                  {businessUnits &&
                    businessUnits.map((option, index) => {
                      return (
                        <option key={index} value={option}>
                          {option}
                        </option>
                      );
                    })}
                </select>
              </div>
              {/* Fuel Name */}
              {fuelNames.length > 0 && (
                <div className="self-stretch flex flex-col items-start justify-start gap-[12px]">
                  <h3 className="m-0 relative text-inherit capitalize font-medium font-inherit z-[1]">
                    {selectedLevel || "Fuel"} Name
                  </h3>
                  <select
                    className="w-full bg-not-white self-stretch h-10 rounded-lg overflow-hidden shrink-0 flex flex-row items-center justify-start pt-2.5 px-3 pb-[9px] box-border font-poppins text-sm text-gray-300 min-w-[248px] z-[1]"
                    onChange={(e) => setFuelNameValue(e.target.value)}
                    value={fuelNameValue}
                  >
                    <option value="">Select Option</option>
                    {fuelNames.map((option, index) => {
                      return (
                        <option key={index} value={option}>
                          {option}
                        </option>
                      );
                    })}
                  </select>
                </div>
              )}

              {/* level5 */}
              {/* if level4Value is selected and level5Options are available then only render this part*/}
              {level5Options.length > 0 && (
                <div className="self-stretch flex flex-col items-start justify-start gap-[12px]">
                  <h3 className="m-0 relative text-inherit capitalize font-medium font-inherit z-[1]">
                    Level 5
                  </h3>
                  <select
                    className="w-full bg-not-white self-stretch h-10 rounded-lg overflow-hidden shrink-0 flex flex-row items-center justify-start pt-2.5 px-3 pb-[9px] box-border font-poppins text-sm text-gray-300 min-w-[248px] z-[1]"
                    onChange={(e) => setLevel5Value(e.target.value)}
                    value={level5Value}
                  >
                    <option value="">Select Option</option>
                    {level5Options.map((option, index) => {
                      return (
                        <option key={index} value={option}>
                          {option}
                        </option>
                      );
                    })}
                  </select>
                </div>
              )}
              {/* Quantity */}
              <div className="self-stretch flex flex-col items-start justify-start gap-[12px]">
                <h3 className="m-0 relative text-inherit capitalize font-medium font-inherit z-[1]">
                  Quantity
                </h3>
                <input
                  type="number"
                  className="w-full bg-not-white self-stretch h-10 rounded-lg overflow-hidden shrink-0 flex flex-row items-center justify-start pt-2.5 px-3 pb-[9px] box-border font-poppins text-sm text-gray-300 min-w-[248px] z-[1]"
                  value={quantityValue}
                  onChange={(e) => setQuantityValue(e.target.value)}
                  placeholder="Enter Quantity"
                />
              </div>
            </div>
          </div>
        </div>
        {/* Add Button */}
        <div className="w-[220px] flex flex-row items-start justify-start gap-[8px] max-w-full mq450:flex-wrap">
          {id ? (
            <>
              <button
                className="cursor-pointer py-2.5 pr-5 pl-[21px] bg-brand-color-2 flex-[0.8859] rounded-lg flex flex-row items-center justify-center box-border min-w-[133px] z-[1] hover:bg-mediumseagreen"
                onClick={handleCancel}
              >
                <div className="h-6 relative text-base capitalize font-medium font-poppins text-white text-center inline-block z-[2]">
                  Cancel
                </div>
              </button>
              <button
                className="cursor-pointer py-2.5 pr-5 pl-[21px] bg-brand-color-2 flex-[0.8859] rounded-lg flex flex-row items-center justify-center box-border min-w-[133px] z-[1] hover:bg-mediumseagreen"
                onClick={handleUpdateData}
              >
                <div className="h-6 relative text-base capitalize font-medium font-poppins text-white text-center inline-block z-[2]">
                  Edit
                </div>
              </button>
            </>
          ) : (
            <button
              className="cursor-pointer py-2.5 pr-5 pl-[21px] bg-brand-color-01 flex-[0.8859] rounded-lg flex flex-row items-center justify-center box-border min-w-[133px] z-[1] hover:bg-mediumseagreen"
              onClick={handleFormSubmit}
            >
              <div className="h-6 relative text-base capitalize font-medium font-poppins text-white text-center inline-block z-[2]">
                Add
              </div>
            </button>
          )}
        </div>
      </div>
      <ToastContainer
        theme={"colored"}
        hideProgressBar={true}
        transition={Slide}
        autoClose={1500}
        pauseOnFocusLoss={false}
        style={{
          "--toastify-font-family": "Poppins",
          "--toastify-color-success": "#00CC9CFF",
        }}
      />
    </>
  );
};

export default FrameComponent1;
