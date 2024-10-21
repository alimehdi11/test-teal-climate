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
  const [sector, setSector] = useState("");
  const [quantity, setQuantity] = useState("");

  const [sectorOptions, setSectorOptions] = useState([]);

  const { id } = useParams();
  const navigation = useNavigate();
  const { selectedPeriod, getPeriodMonths } = usePeriod();
  const [searchParams] = useSearchParams();
  const level1Options = [
    "Activities of households",
    "Agriculture, hunting and forestry",
    "Construction",
    "Education",
    "Electricity, gas and water supply",
    "Extra-territorial organizations and bodies",
    "Financial intermediation",
    "Fishing",
    "Health and social work",
    "Hotels and restaurants",
    "Manufacturing",
    "Mining and quarrying",
    "Other community, social and personal service activities",
    "Public administration and defence; compulsory social security",
    "Real estate, renting and business activities",
    "Transport, storage and communication",
    "Wholesale and retail trade; repair of motor vehicles, motorcycles and personal and household goods",
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
    setBusinessUnitId("");
    setLevel1("");
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
      !sector ||
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
      sector: sector,
      quantity,
      month,
    };
    return console.table(payload);
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
      !sector ||
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
      sector: sector,
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

  const fetchSector = async () => {
    try {
      const url = `${import.meta.env.VITE_API_BASE_URL}/eeios?productOrIndustry=${productOrIndustry}&level1=${level1}&column=sector&distinct=true`;
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
      fetchSector();
      if (!isFormInitializing) {
        setSector("");
      }
    }
  }, [level1]);

  useEffect(() => {
    if (id && searchParams.get("eeio")) {
      setIsFormInitializing(true);
      fetchActivityById().then((activity) => {
        setBusinessUnitId(activity.businessUnit.id);
        setLevel1(activity.level1);
        setSector(activity.sector);
        setQuantity(activity.quantity);
        setMonth(activity.month);
        setProductOrIndustry(activity.productOrIndustry);
      });
    }
  }, [id]);

  useEffect(() => {
    if (id) {
      if (businessUnitId && level1 && sector && quantity && month) {
        setIsFormInitializing(false);
      }
    }
  }, [businessUnitId, level1, sector, quantity, month]);

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
