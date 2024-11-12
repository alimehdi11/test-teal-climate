import { useState, useEffect } from "react";
import { useParams, useNavigate, useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";
import { request } from "../../utils/request.js";
import Button from "../../components/ui/Button.jsx";
import FormControl from "../../components/FormControl.jsx";
import Input from "../../components/ui/Input.jsx";
import Label from "../../components/ui/Label.jsx";
import SearchableSelect from "../../components/ui/SearchableSelect.jsx";
import Select from "../../components/ui/Select.jsx";
import { usePeriod } from "../../contexts/PeriodProvider.jsx";
import { api } from "../../api/index.js";
import { filterBusinessUnitsActivitiesForSelectedPeriod } from "../../utils/helper.js";

const ReitForm = ({ setBusinessUnitsActivities, businessUnits }) => {
  const [businessUnitId, setBusinessUnitId] = useState("");
  const [country, setCountry] = useState("");
  const [stateOrRegion, setStateOrRegion] = useState("");
  const [assetClass, setAssetClass] = useState("");
  const [year, setYear] = useState("");
  const [unitOfMeasurement, setUnitOfMeasurement] = useState("");
  const [quantity, setQuantity] = useState("");

  const [countryOptions, setCountryOptions] = useState([]);
  const [stateOrRegionOptions, setStateOrRegionOptions] = useState([]);
  const [assetClassOptions, setAssetClassOptions] = useState([]);
  const [yearOptions, setYearOptions] = useState([]);
  const [unitOfMeasurementOptions, setUnitOfMeasurementOptions] = useState([]);

  const { id } = useParams();
  const navigation = useNavigate();
  const { selectedPeriod } = usePeriod();

  const [isFormInitializing, setIsFormInitializing] = useState(false);

  const [searchParams] = useSearchParams();

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
    setCountry("");
    setStateOrRegion("");
    setAssetClass("");
    setYear("");
    setUnitOfMeasurement("");
    setQuantity("");
    setCountryOptions([]);
    setStateOrRegionOptions([]);
    setAssetClassOptions([]);
    setYearOptions([]);
    setUnitOfMeasurementOptions([]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    // Checking for missing values
    if (
      !businessUnitId ||
      !country ||
      !stateOrRegion ||
      !assetClass ||
      !year ||
      !unitOfMeasurement ||
      !quantity
    ) {
      toast.warn("Please fill all fields");
      return;
    }
    const payload = {
      businessUnitId,
      country,
      stateOrRegion,
      assetClass,
      year,
      unitOfMeasurement,
      quantity,
    };
    await request(
      `${import.meta.env.VITE_API_BASE_URL}/businessUnitsActivities?reit=true`,
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

  const handleEdit = async () => {
    // Checking for missing values
    if (
      !businessUnitId ||
      !country ||
      !stateOrRegion ||
      !assetClass ||
      !year ||
      !unitOfMeasurement ||
      !quantity
    ) {
      toast.warn("Please fill all fields");
      return;
    }
    const payload = {
      businessUnitId,
      country,
      stateOrRegion,
      assetClass,
      year,
      unitOfMeasurement,
      quantity,
    };
    try {
      await request(
        `${import.meta.env.VITE_API_BASE_URL}/businessUnitsActivities/${id}?reit=true`,
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

  const fetchCountries = async () => {
    try {
      const queryParams = `column=country&distinct=true`;
      const url = `${import.meta.env.VITE_API_BASE_URL}/reits?${queryParams}`;
      const response = await request(url, "GET");
      if (!response.ok) {
        throw new Error(`Failed to fetch countries`);
      }
      const result = await response.json();
      setCountryOptions(result.map((item) => item.country));
    } catch (error) {
      console.log(error);
    }
  };

  const fetchRegions = async () => {
    try {
      const queryParams = `country=${country}&column=stateOrRegion&distinct=true`;
      const url = `${import.meta.env.VITE_API_BASE_URL}/reits?${queryParams}`;
      const response = await request(url, "GET");
      if (!response.ok) {
        throw new Error(`Failed to fetch regions`);
      }
      const result = await response.json();
      setStateOrRegionOptions(result.map((item) => item.stateOrRegion));
    } catch (error) {
      console.log(error);
    }
  };

  const fetchAssetTypes = async () => {
    try {
      const queryParams = `country=${country}&stateOrRegion=${stateOrRegion}&column=assetClass&distinct=true`;
      const url = `${import.meta.env.VITE_API_BASE_URL}/reits?${queryParams}`;
      const response = await request(url, "GET");
      if (!response.ok) {
        throw new Error(`Failed to fetch asset types`);
      }
      const result = await response.json();
      setAssetClassOptions(result.map((item) => item.assetClass));
    } catch (error) {
      console.log(error);
    }
  };

  const fetchYears = async () => {
    try {
      const queryParams = `country=${country}&stateOrRegion=${stateOrRegion}&assetClass=${assetClass}&column=year&distinct=true`;
      const url = `${import.meta.env.VITE_API_BASE_URL}/reits?${queryParams}`;
      const response = await request(url, "GET");
      if (!response.ok) {
        throw new Error(`Failed to fetch years`);
      }
      const result = await response.json();
      setYearOptions(result.map((item) => item.year));
    } catch (error) {
      console.log(error);
    }
  };

  const fetchUnitsOfMeasurement = async () => {
    try {
      const queryParams = `country=${country}&stateOrRegion=${stateOrRegion}&assetClass=${assetClass}&year=${year}&column=unitOfMeasurement&distinct=true`;
      const url = `${import.meta.env.VITE_API_BASE_URL}/reits?${queryParams}`;
      const response = await request(url, "GET");
      if (!response.ok) {
        throw new Error(`Failed to fetch units of measurement`);
      }
      const result = await response.json();
      setUnitOfMeasurementOptions(result.map((item) => item.unitOfMeasurement));
    } catch (error) {
      console.log(error);
    }
  };

  // Automatically set businessUnitId if there's only one business unit
  useEffect(() => {
    if (businessUnits.length === 1) {
      setBusinessUnitId(businessUnits[0].id);
    }
  }, [businessUnits]);

  useEffect(() => {
    if (businessUnitId) {
      fetchCountries();
      if (!isFormInitializing) {
        setCountry("");
        setStateOrRegion("");
        setAssetClass("");
        setYear("");
        setUnitOfMeasurement("");
        setCountryOptions([]);
        setStateOrRegionOptions([]);
        setAssetClassOptions([]);
        setYearOptions([]);
        setUnitOfMeasurementOptions([]);
      }
    }
  }, [businessUnitId]);

  useEffect(() => {
    if (country) {
      fetchRegions();
      if (!isFormInitializing) {
        setStateOrRegion("");
        setAssetClass("");
        setYear("");
        setUnitOfMeasurement("");
        setAssetClassOptions([]);
        setYearOptions([]);
        setUnitOfMeasurementOptions([]);
      }
    }
  }, [country]);

  useEffect(() => {
    if (stateOrRegion) {
      fetchAssetTypes();
      if (!isFormInitializing) {
        setAssetClass("");
        setYear("");
        setUnitOfMeasurement("");
        setYearOptions([]);
        setUnitOfMeasurementOptions([]);
      }
    }
  }, [stateOrRegion]);

  useEffect(() => {
    if (assetClass) {
      fetchYears();
      if (!isFormInitializing) {
        setYear("");
        setUnitOfMeasurement("");
        setUnitOfMeasurementOptions([]);
      }
    }
  }, [assetClass]);

  useEffect(() => {
    if (year) {
      fetchUnitsOfMeasurement();
      if (!isFormInitializing) {
        setUnitOfMeasurement("");
      }
    }
  }, [year]);

  useEffect(() => {
    if (id && searchParams.get("reit")) {
      setIsFormInitializing(true);
      fetchActivityById().then((activity) => {
        setBusinessUnitId(activity.businessUnit.id);
        setCountry(activity.country);
        setStateOrRegion(activity.stateOrRegion);
        setAssetClass(activity.assetClass);
        setYear(activity.year);
        setUnitOfMeasurement(activity.unitOfMeasurement);
        setQuantity(activity.quantity);
      });
    }
  }, [id]);

  useEffect(() => {
    if (id) {
      if (
        businessUnitId &&
        country &&
        stateOrRegion &&
        assetClass &&
        year &&
        unitOfMeasurement &&
        quantity
      ) {
        setIsFormInitializing(false);
      }
    }
  }, [
    businessUnitId,
    country,
    stateOrRegion,
    assetClass,
    year,
    unitOfMeasurement,
    quantity,
  ]);

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-y-3 bg-white rounded-md p-6"
      >
        <h3 className="m-0 mb-3 font-extrabold text-2xl">
          Insert REIT data here
        </h3>
        <div className="grid gap-4">
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
          {/* Country */}
          <FormControl className="relative">
            <Label>Country</Label>
            <SearchableSelect
              data={countryOptions}
              item={country}
              setItem={setCountry}
              text={"Select country"}
              placeholder={"Search country"}
            />
          </FormControl>
          {/* Region */}
          <FormControl className="relative">
            <Label>State or region</Label>
            <SearchableSelect
              data={stateOrRegionOptions}
              item={stateOrRegion}
              setItem={setStateOrRegion}
              text={"Select state or region"}
              placeholder={"Search state or region"}
            />
          </FormControl>
          {/* Asset class */}
          <FormControl className="relative">
            <Label>Asset class</Label>
            <SearchableSelect
              data={assetClassOptions}
              item={assetClass}
              setItem={setAssetClass}
              text={"Select asset class"}
              placeholder={"Search asset class"}
            />
          </FormControl>
          {/* Year */}
          <FormControl className="relative">
            <Label>Year</Label>
            <SearchableSelect
              data={yearOptions}
              item={year}
              setItem={setYear}
              text={"Select year"}
              placeholder={"Search year"}
            />
          </FormControl>
          {/* Unit of measurement */}
          <FormControl className="relative">
            <Label>Unit of measurement</Label>
            <SearchableSelect
              data={unitOfMeasurementOptions}
              item={unitOfMeasurement}
              setItem={setUnitOfMeasurement}
              text={"Select unit of measurement"}
              placeholder={"Search unit of measurement"}
            />
          </FormControl>
          {/* Quantity */}
          <FormControl>
            <Label>Quantity</Label>
            <Input
              type="number"
              value={quantity}
              onChange={(e) => {
                setQuantity(e.target.value);
              }}
            />
          </FormControl>
        </div>
        {/* Add, Edit, Cancel Buttons */}
        {id ? (
          <div className="flex flex-col gap-4 md:flex-row self-end">
            <Button type="button" className="flex-1" onClick={handleCancel}>
              Cancel
            </Button>
            <Button type="button" className="flex-1" onClick={handleEdit}>
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

export default ReitForm;
