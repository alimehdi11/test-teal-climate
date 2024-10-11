import { useState, useEffect } from "react";
import { useParams, useNavigate, useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";
import { request } from "../../utils/request.js";
import Button from "../../components/ui/Button.jsx";
import FormControl from "../../components/FormControl.jsx";
import Input from "../../components/ui/Input.jsx";
import Label from "../../components/ui/Label.jsx";
import Select from "../../components/ui/Select.jsx";
import { usePeriod } from "../../contexts/PeriodProvider.jsx";
import SearchableSelect from "../../components/ui/SearchableSelect.jsx";
import { filterBusinessUnitsActivitiesForSelectedPeriod } from "../../utils/helper.js";
import { api } from "../../../api/index.js";

const EeioForm = ({
  productOrIndustry,
  setProductOrIndustry,
  setBusinessUnitsActivities,
  businessUnits,
}) => {
  const [month, setMonth] = useState("");
  const [businessUnitId, setBusinessUnitId] = useState("");
  const [level1, setLevel1] = useState("");
  const [level2, setLevel2] = useState("");
  const [level3, setLevel3] = useState("");
  const [level4, setLevel4] = useState("");
  const [level5Value, setLevel5Value] = useState("");
  const [sector, setSector] = useState("");
  const [currency, setCurrency] = useState("perEuro");
  const [quantity, setQuantity] = useState("");

  const [level2Options, setLevel2Options] = useState([]);
  const [level3Options, setLevel3Options] = useState([]);
  const [level4Options, setLevel4Options] = useState([]);
  const [level5Options, setLevel5Options] = useState([]);
  const [sectorOptions, setSectorOptions] = useState([]);

  const { id } = useParams();
  const navigation = useNavigate();
  const { selectedPeriod, getPeriodMonths } = usePeriod();
  const [searchParams] = useSearchParams();
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
  const [isFormInitializing, setIsFormInitializing] = useState(false);

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
    setBusinessUnitId("");
    setLevel1("");
    setLevel2("");
    setLevel3("");
    setLevel4("");
    setLevel5Value("");
    setSector("");
    setQuantity("");
    setMonth("");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    // Checking for missing values
    if (
      !businessUnitId ||
      !productOrIndustry ||
      !level1 ||
      !level2 ||
      !level3 ||
      !level4 ||
      !level5Value ||
      !sector ||
      !currency ||
      !quantity ||
      !month
    ) {
      toast.warn("Please fill all fields");
      return;
    }

    const payload = {
      productOrIndustry,
      level1: level1,
      businessUnitId: businessUnitId,
      level2: level2,
      level3: level3,
      level4: level4,
      level5: level5Value,
      sector: sector,
      unitOfMeasurement: currency,
      quantity,
      month,
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
      .then(async () => {
        toast.success("Data submitted successfully");
        const { success, message, data } =
          await api.businessUnitsActivities.getAllBusinessUnitsActivities();
        if (success) {
          setBusinessUnitsActivities(
            filterBusinessUnitsActivitiesForSelectedPeriod(data, selectedPeriod)
          );
        } else {
          toast.error(message);
        }
      })
      .catch((error) => {
        toast.error("Error adding data");
        console.error("Couldn't submit data", error);
      });
  };

  const handleUpdateData = async () => {
    // Checking for missing values
    if (
      !businessUnitId ||
      !productOrIndustry ||
      !level1 ||
      !level2 ||
      !level3 ||
      !level4 ||
      !level5Value ||
      !sector ||
      !currency ||
      !quantity ||
      !month
    ) {
      toast.warn("Please fill all fields");
      return;
    }

    // Update payload
    const payload = {
      productOrIndustry,
      level1: level1,
      businessUnitId: businessUnitId,
      level2: level2,
      level3: level3,
      level4: level4,
      level5: level5Value,
      sector: sector,
      unitOfMeasurement: currency,
      quantity,
      month,
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
        .then(async () => {
          const { success, message, data } =
            await api.businessUnitsActivities.getAllBusinessUnitsActivities();
          if (success) {
            setBusinessUnitsActivities(
              filterBusinessUnitsActivitiesForSelectedPeriod(
                data,
                selectedPeriod
              )
            );
          } else {
            toast.error(message);
          }
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

  const fetchEeioLevel2 = async () => {
    try {
      const url = `${import.meta.env.VITE_API_BASE_URL}/eeios?productOrIndustry=${productOrIndustry}&level1=${level1}&column=level2&distinct=true`;
      const response = await request(url, "GET");
      if (!response.ok) {
        throw new Error(`Failed to fetch data:`);
      }
      const result = await response.json();
      setLevel2Options(result.map((item) => item.level2));
    } catch (error) {
      console.log(error);
      setLevel2Options([]);
    }
  };

  const fetchEeioLevel3 = async () => {
    try {
      const url = `${import.meta.env.VITE_API_BASE_URL}/eeios?productOrIndustry=${productOrIndustry}&level1=${level1}&level2=${level2}&column=level3&distinct=true`;
      const response = await request(url, "GET");
      if (!response.ok) {
        throw new Error(`Failed to fetch data:`);
      }
      const result = await response.json();
      setLevel3Options(result.map((item) => item.level3));
    } catch (error) {
      setLevel3Options([]);
    }
  };

  const fetchLevel4 = async () => {
    try {
      const url = `${import.meta.env.VITE_API_BASE_URL}/eeios?productOrIndustry=${productOrIndustry}&level1=${level1}&level2=${level2}&level3=${level3}&column=level4&distinct=true`;
      const response = await request(url, "GET");
      if (!response.ok) {
        throw new Error(`Failed to fetch data:`);
      }
      const result = await response.json();
      setLevel4Options(result.map((item) => item.level4));
    } catch (error) {
      setLevel4Options([]);
    }
  };

  const fetchLevel5 = async () => {
    try {
      const url = `${import.meta.env.VITE_API_BASE_URL}/eeios?productOrIndustry=${productOrIndustry}&level1=${level1}&level2=${level2}&level3=${level3}&level4=${level4}&column=level5&distinct=true`;
      const response = await request(url, "GET");
      if (!response.ok) {
        throw new Error(`Failed to fetch data:`);
      }
      const result = await response.json();
      setLevel5Options(result.map((item) => item.level5));
    } catch (error) {
      setLevel5Options([]);
    }
  };

  const fetchSector = async () => {
    try {
      const url = `${import.meta.env.VITE_API_BASE_URL}/eeios?productOrIndustry=${productOrIndustry}&level1=${level1}&level2=${level2}&level3=${level3}&level4=${level4}&level5=${level5Value}&column=sector&distinct=true`;
      const response = await request(url, "GET");
      if (!response.ok) {
        throw new Error(`Failed to fetch data:`);
      }
      const result = await response.json();
      setSectorOptions(result.map((item) => item.sector));
    } catch (error) {
      setSectorOptions([]);
    }
  };

  // Automatically set businessUnitId if there's only one business unit
  useEffect(() => {
    if (businessUnits.length === 1) {
      setBusinessUnitId(businessUnits[0].id);
    }
  }, [businessUnits]);

  useEffect(() => {
    if (level1) {
      fetchEeioLevel2();
      if (!isFormInitializing) {
        setLevel2("");
        setLevel3("");
        setLevel4("");
        setLevel5Value("");
        setSector("");
        setLevel3Options([]);
        setLevel4Options([]);
        setLevel5Options([]);
        setSectorOptions([]);
      }
    }
  }, [level1]);

  useEffect(() => {
    if (level2) {
      fetchEeioLevel3();
      if (!isFormInitializing) {
        setLevel3("");
        setLevel4("");
        setLevel5Value("");
        setSector("");
        setLevel4Options([]);
        setLevel5Options([]);
        setSectorOptions([]);
      }
    }
  }, [level2]);

  useEffect(() => {
    if (level3) {
      fetchLevel4();
      if (!isFormInitializing) {
        setLevel4("");
        setLevel5Value("");
        setSector("");
        setLevel5Options([]);
        setSectorOptions([]);
      }
    }
  }, [level3]);

  useEffect(() => {
    if (level4) {
      fetchLevel5();
      if (!isFormInitializing) {
        setLevel5Value("");
        setSector("");
        setSectorOptions([]);
      }
    }
  }, [level4]);

  useEffect(() => {
    if (level5Value) {
      fetchSector();
      if (!isFormInitializing) {
        setSector("");
      }
    }
  }, [level5Value]);

  useEffect(() => {
    if (id && searchParams.get("eeio")) {
      setIsFormInitializing(true);
      fetchActivityById().then((activity) => {
        setBusinessUnitId(activity.businessUnit.id);
        setLevel1(activity.level1);
        setLevel2(activity.level2);
        setLevel3(activity.level3);
        setLevel4(activity.level4);
        setLevel5Value(activity.level5);
        setSector(activity.sector);
        setQuantity(activity.quantity);
        setMonth(activity.month);
        setProductOrIndustry(activity.productOrIndustry);
      });
    }
  }, [id]);

  useEffect(() => {
    if (id) {
      if (
        businessUnitId &&
        level1 &&
        level2 &&
        level3 &&
        level4 &&
        level5Value &&
        sector &&
        quantity &&
        month
      ) {
        setIsFormInitializing(false);
      }
    }
  }, [
    businessUnitId,
    level1,
    level2,
    level3,
    level4,
    level5Value,
    sector,
    quantity,
    month,
  ]);

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-y-3 bg-white rounded-md p-6"
      >
        <h3 className="m-0 mb-3 font-extrabold text-2xl">
          Insert EEIO data here
        </h3>
        <div className="grid gap-4">
          {/* Period month */}
          <FormControl className="flex-1 relative">
            <Label>Month</Label>
            <SearchableSelect
              data={getPeriodMonths()}
              item={month}
              setItem={setMonth}
              text={"Select month"}
              placeholder={"Search month"}
            />
          </FormControl>
          {/* Business Unit */}
          <FormControl>
            <Label>Business Unit</Label>
            <Select
              value={businessUnitId}
              onChange={(e) => setBusinessUnitId(e.target.value)}
            >
              <option value="">Select Option</option>
              {businessUnits.length > 0 ? (
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
          <FormControl className="relative">
            <Label>Level 1</Label>
            <SearchableSelect
              data={level1Options}
              item={level1}
              setItem={setLevel1}
              text={"Select level 1"}
              placeholder={"Search level 1"}
            />
          </FormControl>
          {/* Level 2 */}
          <FormControl className="relative">
            <Label>Level 2</Label>
            <SearchableSelect
              data={level2Options}
              item={level2}
              setItem={setLevel2}
              text={"Select level 2"}
              placeholder={"Search level 2"}
            />
          </FormControl>
          {/* Level 3 */}
          <FormControl className="relative">
            <Label>Level 3</Label>
            <SearchableSelect
              data={level3Options}
              item={level3}
              setItem={setLevel3}
              text={"Select level 3"}
              placeholder={"Search level 3"}
            />
          </FormControl>
          {/* Level 4 */}
          <FormControl className="relative">
            <Label>Level 4</Label>
            <SearchableSelect
              data={level4Options}
              item={level4}
              setItem={setLevel4}
              text={"Select level 4"}
              placeholder={"Search level 4"}
            />
          </FormControl>
          {/* Level 5 */}
          <FormControl className="relative">
            <Label>Level 5</Label>
            <SearchableSelect
              data={level5Options}
              item={level5Value}
              setItem={setLevel5Value}
              text={"Select level 5"}
              placeholder={"Search level 5"}
            />
          </FormControl>
          {/* Sector */}
          <FormControl className="relative">
            <Label>Sector</Label>
            <SearchableSelect
              data={sectorOptions}
              item={sector}
              setItem={setSector}
              text={"Select sector"}
              placeholder={"Search sector"}
            />
          </FormControl>
          {/* Currency */}
          <FormControl>
            <Label>Currency</Label>
            <Select
              value={currency}
              onChange={(e) => setCurrency(e.target.value)}
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

export default EeioForm;
