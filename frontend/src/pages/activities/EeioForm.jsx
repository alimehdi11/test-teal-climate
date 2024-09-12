import { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { request } from "../../utils/request.js";
import Button from "../../components/ui/Button.jsx";
import FormControl from "../../components/FormControl.jsx";
import Input from "../../components/ui/Input.jsx";
import Label from "../../components/ui/Label.jsx";
import Select from "../../components/ui/Select.jsx";
import { UserContext } from "../../contexts/UserContext.jsx";
import { usePeriod } from "../../contexts/PeriodProvider.jsx";

const EeoiForm = ({
  productOrIndustry,
  fetchUserBusinessUnitsActivities,
  setProductOrIndustry,
  setIsSpendBaseScope3Selected,
}) => {
  const { user } = useContext(UserContext);

  const [businessUnits, setBusinessUnits] = useState("");
  const [businessUnitValue, setBusinessUnitValue] = useState("");
  const [level1Value, setLevel1Value] = useState("");
  const [level2Options, setLevel2Options] = useState("");
  const [level2Value, setLevel2Value] = useState("");
  const [Level3Options, setLevel3Options] = useState("");
  const [level3Value, setLevel3Value] = useState("");
  const [Level4Options, setLevel4Options] = useState("");
  const [level4Value, setLevel4Value] = useState("");
  const [Level5Options, setLevel5Options] = useState("");
  const [level5Value, setLevel5Value] = useState("");
  const [sectorOptions, setSectorOptions] = useState("");
  const [sectorValue, setSectorValue] = useState("");
  const [currencyValue, setCurrencyValue] = useState("perEuro");
  const [quantity, setQuantity] = useState("");
  const [month, setMonth] = useState("");
  // const [year, setYear] = useState("");
  const { id } = useParams();
  const navigation = useNavigate();
  const { selectedPeriod } = usePeriod();
  const level1Options = [
    "Activities of households",
    "Public administration and defence; compulsory social security",
    "Financial intermediation",
    "Manufacturing",
    "Construction",
    "Real estate, renting and business activities",
    "Hotels and restaurants",
    "Wholesale and retail trade; repair of motor vehicles, motorcycles and personal and household goods",
    "Electricity, gas and water supply",
    "Agriculture, hunting and forestry",
    "Mining and quarrying",
    "Other community, social and personal service activities",
    "Fishing",
    "Health and social work",
    "Transport, storage and communication",
    "Extra-territorial organizations and bodies",
    "Education",
  ];
  const currentYear = new Date().getFullYear();
  const years = [currentYear, currentYear - 1];

  const fetchActivityById = async () => {
    try {
      const response = await request(
        `${import.meta.env.VITE_API_BASE_URL}/businessUnitsActivities/${id}`,
        "GET"
      );
      if (!response.ok) {
        throw new Error(`${JSON.stringify(await response.json())}`);
      }
      const activity = await response.json();
      return activity;
    } catch (error) {
      const errorMessage = JSON.parse(error.message).error;
      toast.error(errorMessage);
      console.error(errorMessage);
      console.error("Error fetchActivityById:", error);
    }
  };

  const resetForm = () => {
    setLevel3Options([]);
    setLevel4Options([]);
    setLevel5Options([]);
    setBusinessUnitValue("");
    setLevel1Value("");
    setLevel2Value("");
    setLevel3Value("");
    setLevel4Value("");
    setLevel5Value("");
    setSectorValue("");
    setQuantity("");
    setMonth("");
    // setProductOrIndustry("");
    // setIsSpendBaseScope3Selected(false);
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    // Checking for missing values
    if (
      !businessUnitValue ||
      !productOrIndustry ||
      !level1Value ||
      !level2Value ||
      !level3Value ||
      !level4Value ||
      !level5Value ||
      !sectorValue ||
      !currencyValue ||
      !quantity ||
      !month
      // ||
      // !year
    ) {
      toast.warn("Please fill all fields");
      return;
    }

    const payload = {
      productOrIndustry,
      level1: level1Value,
      businessUnitId: businessUnitValue,
      level2: level2Value,
      level3: level3Value,
      level4: level4Value,
      level5: level5Value,
      sector: sectorValue,
      unitOfMeasurement: currencyValue,
      quantity,
      month,
      // year,
    };
    await request(
      `${import.meta.env.VITE_API_BASE_URL}/businessUnitsActivities?eeio=true`,
      "POST",
      payload
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error();
        }
        resetForm();
      })
      .then(() => {
        toast.success("Data submitted successfully");
        fetchUserBusinessUnitsActivities();
      })
      .catch((error) => {
        toast.error("Error adding data");
        console.error("Couldn't submit data", error);
      });
  };

  const handleUpdateData = async () => {
    // Checking for missing values
    if (
      !businessUnitValue ||
      !productOrIndustry ||
      !level1Value ||
      !level2Value ||
      !level3Value ||
      !level4Value ||
      !level5Value ||
      !sectorValue ||
      !currencyValue ||
      !quantity ||
      !month
      // ||
      // !year
    ) {
      toast.warn("Please fill all fields");
      return;
    }

    // Update payload
    const payload = {
      productOrIndustry,
      level1: level1Value,
      businessUnitId: businessUnitValue,
      level2: level2Value,
      level3: level3Value,
      level4: level4Value,
      level5: level5Value,
      sector: sectorValue,
      unitOfMeasurement: currencyValue,
      quantity,
      month,
      // year,
    };

    try {
      await request(
        `${import.meta.env.VITE_API_BASE_URL}/businessUnitsActivities/${id}?eeio=true`,
        "PUT",
        payload
      )
        .then(async (response) => {
          if (!response.ok) {
            throw new Error(`${JSON.stringify(await response.json())}`);
          }
          toast.success("Data edit successfully");
          resetForm();
          navigation("/activities");
        })
        .then(() => {
          fetchUserBusinessUnitsActivities();
        });
    } catch (error) {
      const errorMessage = JSON.parse(error.message).error;
      toast.error(errorMessage);
      console.error(errorMessage);
      console.error("Error fetchActivityById:", error);
    }
  };

  const handleCancel = () => {
    resetForm();
    navigation("/activities");
  };

  const fetchBusinessUnits = async () => {
    try {
      const response = await request(
        `${import.meta.env.VITE_API_BASE_URL}/users/${user.id}/businessUnits`,
        "GET"
      );
      if (!response.ok) {
        throw new Error(JSON.stringify((await response.json()).error));
      }
      return await response.json();
    } catch (error) {
      let errorMessage = JSON.parse(error.message).error;
      console.log(errorMessage);
      console.error("Error fetching businessUnits:", error);
    }
  };

  const fetchEeioLevel2 = async () => {
    try {
      const url = `${import.meta.env.VITE_API_BASE_URL}/eeios?productOrIndustry=${productOrIndustry}&level1=${level1Value}&column=level2&distinct=true`;
      const response = await request(url, "GET");
      if (!response.ok) {
        throw new Error(`Failed to fetch data:`);
      }
      const jsonData = await response.json();
      setLevel2Options(jsonData);
    } catch (error) {
      console.log(error);
      setLevel2Options([]);
    }
  };

  const fetchEeioLevel3 = async () => {
    try {
      const url = `${import.meta.env.VITE_API_BASE_URL}/eeios?productOrIndustry=${productOrIndustry}&level1=${level1Value}&level2=${level2Value}&column=level3&distinct=true`;
      const response = await request(url, "GET");
      if (!response.ok) {
        throw new Error(`Failed to fetch data:`);
      }
      const jsonData = await response.json();
      setLevel3Options(jsonData);
    } catch (error) {
      setLevel3Options([]);
    }
  };

  const fetchLevel4 = async () => {
    try {
      const url = `${import.meta.env.VITE_API_BASE_URL}/eeios?productOrIndustry=${productOrIndustry}&level1=${level1Value}&level2=${level2Value}&level3=${level3Value}&column=level4&distinct=true`;
      const response = await request(url, "GET");
      if (!response.ok) {
        throw new Error(`Failed to fetch data:`);
      }
      const jsonData = await response.json();
      setLevel4Options(jsonData);
    } catch (error) {
      setLevel4Options([]);
    }
  };

  const fetchLevel5 = async () => {
    try {
      const url = `${import.meta.env.VITE_API_BASE_URL}/eeios?productOrIndustry=${productOrIndustry}&level1=${level1Value}&level2=${level2Value}&level3=${level3Value}&level4=${level4Value}&column=level5&distinct=true`;
      const response = await request(url, "GET");
      if (!response.ok) {
        throw new Error(`Failed to fetch data:`);
      }
      const jsonData = await response.json();
      setLevel5Options(jsonData);
    } catch (error) {
      setLevel5Options([]);
    }
  };

  const fetchSector = async () => {
    try {
      const url = `${import.meta.env.VITE_API_BASE_URL}/eeios?productOrIndustry=${productOrIndustry}&level1=${level1Value}&level2=${level2Value}&level3=${level3Value}&level4=${level4Value}&level5=${level5Value}&column=sector&distinct=true`;
      const response = await request(url, "GET");
      if (!response.ok) {
        throw new Error(`Failed to fetch data:`);
      }
      const jsonData = await response.json();
      setSectorOptions(jsonData);
    } catch (error) {
      setSectorOptions([]);
    }
  };

  useEffect(() => {
    if (selectedPeriod) {
      fetchBusinessUnits().then(async (businessUnits) => {
        if (businessUnits.length === 0) {
          toast.info("Please add business unit first");
          return;
        }
        businessUnits = businessUnits.filter((businessUnit) => {
          return businessUnit.period === selectedPeriod;
        });
        setBusinessUnits(businessUnits);
      });
    }
  }, [selectedPeriod]);

  useEffect(() => {
    if (level1Value) {
      fetchEeioLevel2();
    }
  }, [level1Value]);

  useEffect(() => {
    if (level2Value) {
      fetchEeioLevel3();
    }
  }, [level2Value]);

  useEffect(() => {
    if (level3Value) {
      fetchLevel4();
    }
  }, [level3Value]);

  useEffect(() => {
    if (level4Value) {
      fetchLevel5();
    }
  }, [level4Value]);

  useEffect(() => {
    if (level5Value) {
      fetchSector();
    }
  }, [level5Value]);

  useEffect(() => {
    if (id) {
      fetchActivityById().then((activity) => {
        setBusinessUnitValue(activity.businessUnit.id);
        setLevel1Value(activity.level1);
        setLevel2Value(activity.level2);
        setLevel3Value(activity.level3);
        setLevel4Value(activity.level4);
        setLevel5Value(activity.level5);
        setSectorValue(activity.sector);
        setQuantity(activity.quantity);
        setMonth(activity.month);
        // setYear(activity.year);
      });
    }
  }, [id]);

  return (
    <>
      <form
        onSubmit={handleFormSubmit}
        className="flex flex-col gap-y-3 bg-white rounded-md p-6"
      >
        <h3 className="m-0 mb-3 font-extrabold text-2xl">
          Insert EEIO data here
        </h3>
        <div className="grid gap-4">
          {/* month & year */}
          <div className="flex gap-4">
            <FormControl className="flex-1">
              <Label>Month</Label>
              <Select value={month} onChange={(e) => setMonth(e.target.value)}>
                <option value="">Select Option</option>
                {[
                  "january",
                  "february",
                  "march",
                  "april",
                  "may",
                  "june",
                  "july",
                  "august",
                  "september",
                  "october",
                  "november",
                  "december",
                ].map((option) => {
                  return (
                    <option key={option} value={option}>
                      {option.toUpperCase()}
                    </option>
                  );
                })}
              </Select>
            </FormControl>
            {/* <FormControl className="flex-1">
              <Label>Year</Label>
              <Select value={year} onChange={(e) => setYear(e.target.value)}>
                <option value="">Select Option</option>
                {years.map((option, index) => {
                  return (
                    <option key={index} value={option}>
                      {option}
                    </option>
                  );
                })}
              </Select>
            </FormControl> */}
          </div>
          {/* Business Unit */}
          <FormControl>
            <Label>Business Unit</Label>
            <Select
              value={businessUnitValue}
              onChange={(e) => setBusinessUnitValue(e.target.value)}
            >
              <option value="">Select Option</option>
              {businessUnits && businessUnits.length > 0 ? (
                businessUnits.map((options, index) => {
                  return (
                    <option value={options.id} key={index}>
                      {options.title}
                    </option>
                  );
                })
              ) : (
                <option disabled>
                  'Profile not found create profile first'
                </option>
              )}
            </Select>
          </FormControl>
          {/* Level 1 */}
          <FormControl>
            <Label>Level 1</Label>
            <Select
              value={level1Value}
              onChange={(e) => setLevel1Value(e.target.value)}
            >
              <option value="">Select Option</option>
              {level1Options.map((item, index) => (
                <option key={index}>{item}</option>
              ))}
            </Select>
          </FormControl>
          {/* Level 2 */}
          <FormControl>
            <Label>Level 2</Label>
            <Select
              value={level2Value}
              onChange={(e) => setLevel2Value(e.target.value)}
            >
              <option value="">Select Option</option>
              {level2Options &&
                level2Options.map((options, index) => {
                  return (
                    <option value={options.level2} key={index}>
                      {options.level2}
                    </option>
                  );
                })}
            </Select>
          </FormControl>
          {/* Level 3 */}
          <FormControl>
            <Label>Level 3</Label>
            <Select
              value={level3Value}
              onChange={(e) => setLevel3Value(e.target.value)}
            >
              <option value="">Select Option</option>
              {Level3Options &&
                Level3Options.map((options, index) => {
                  return (
                    <option value={options.level3} key={index}>
                      {options.level3}
                    </option>
                  );
                })}
            </Select>
          </FormControl>
          {/* Level 4 */}
          <FormControl>
            <Label>Level 4</Label>
            <Select
              value={level4Value}
              onChange={(e) => setLevel4Value(e.target.value)}
            >
              <option value="">Select Option</option>
              {Level4Options &&
                Level4Options.map((options, index) => {
                  return (
                    <option value={options.level4} key={index}>
                      {options.level4}
                    </option>
                  );
                })}
            </Select>
          </FormControl>
          {/* Level 5 */}
          <FormControl>
            <Label>Level 5</Label>
            <Select
              value={level5Value}
              onChange={(e) => setLevel5Value(e.target.value)}
            >
              <option value="">Select Option</option>
              {Level5Options &&
                Level5Options.map((options, index) => {
                  return (
                    <option value={options.level5} key={index}>
                      {options.level5}
                    </option>
                  );
                })}
            </Select>
          </FormControl>
          {/* Sector */}
          <FormControl>
            <Label>Sector</Label>
            <Select
              value={sectorValue}
              onChange={(e) => setSectorValue(e.target.value)}
            >
              <option value="">Select Option</option>
              {sectorOptions &&
                sectorOptions.map((options, index) => {
                  return (
                    <option value={options.sector} key={index}>
                      {options.sector}
                    </option>
                  );
                })}
            </Select>
          </FormControl>
          {/* Currency */}
          <FormControl>
            <Label>Currency</Label>
            <Select
              value={currencyValue}
              onChange={(e) => setCurrencyValue(e.target.value)}
            >
              <option value="perEuro">Per Euro</option>
            </Select>
          </FormControl>
          {/* Quantity */}
          <FormControl>
            <Label>Quantity</Label>
            <Input
              type="number"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
            />
          </FormControl>
        </div>
        {/* Add, Edit, Cancel Buttons */}
        {id ? (
          <div className="flex flex-col gap-4 md:flex-row self-end">
            <Button type="button" className="flex-1" onClick={handleCancel}>
              Cancel
            </Button>
            <Button type="button" className="flex-1" onClick={handleUpdateData}>
              Edit
            </Button>
          </div>
        ) : (
          <Button
            type="submit"
            className="self-end"
            style={{
              backgroundColor: "rgba(0,204,156,1)",
            }}
          >
            Add
          </Button>
        )}
      </form>
    </>
  );
};

export default EeoiForm;
