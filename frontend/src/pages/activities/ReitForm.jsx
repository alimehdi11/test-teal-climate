import { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { request } from "../../utils/request.js";
import Button from "../../components/ui/Button.jsx";
import FormControl from "../../components/FormControl.jsx";
import Input from "../../components/ui/Input.jsx";
import Label from "../../components/ui/Label.jsx";
import SearchableSelect from "../../components/ui/SearchableSelect.jsx";
import Select from "../../components/ui/Select.jsx";
import { usePeriod } from "../../contexts/PeriodProvider.jsx";
import { UserContext } from "../../contexts/UserContext.jsx";

const ReitForm = ({ fetchUserBusinessUnitsActivities }) => {
  const [businessUnitId, setBusinessUnitId] = useState("");
  const [continent, setContinent] = useState("");
  const [country, setCountry] = useState("");
  const [region, setRegion] = useState("");
  const [assetType, setAssetType] = useState("");
  const [year, setYear] = useState("");
  const [unitOfMeasurement, setUnitOfMeasurement] = useState("");
  const [quantity, setQuantity] = useState("");

  const [businessUnitOptions, setBusinessUnitOptions] = useState([]);
  const [continentOptions, setContinentOptions] = useState([]);
  const [countryOptions, setCountryOptions] = useState([]);
  const [regionOptions, setRegionOptions] = useState([]);
  const [assetTypeOptions, setAssetTypeOptions] = useState([]);
  const [yearOptions, setYearOptions] = useState([]);
  const [unitOfMeasurementOptions, setUnitOfMeasurementOptions] = useState([]);

  const { id } = useParams();
  const navigation = useNavigate();
  const { selectedPeriod } = usePeriod();
  const { user } = useContext(UserContext);

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
    setContinent("");
    setCountry("");
    setRegion("");
    setAssetType("");
    setYear("");
    setUnitOfMeasurement("");
    setQuantity("");
    setContinentOptions([]);
    setCountryOptions([]);
    setRegionOptions([]);
    setAssetTypeOptions([]);
    setYearOptions([]);
    setUnitOfMeasurementOptions([]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    // Checking for missing values
    if (
      !businessUnitId ||
      !continent ||
      !country ||
      !region ||
      !assetType ||
      !year ||
      !unitOfMeasurement ||
      !quantity
    ) {
      toast.warn("Please fill all fields");
      return;
    }
    const payload = {
      businessUnitId,
      continent,
      country,
      region,
      assetType,
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
      .then(() => {
        toast.success("Data submitted successfully");
        fetchUserBusinessUnitsActivities();
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
      !continent ||
      !country ||
      !region ||
      !assetType ||
      !year ||
      !unitOfMeasurement ||
      !quantity
    ) {
      toast.warn("Please fill all fields");
      return;
    }
    const payload = {
      businessUnitId,
      continent,
      country,
      region,
      assetType,
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

  const fetchContinents = async () => {
    try {
      const queryParams = `column=continent&distinct=true`;
      const url = `${import.meta.env.VITE_API_BASE_URL}/reits?${queryParams}`;
      const response = await request(url, "GET");
      if (!response.ok) {
        throw new Error(`Failed to fetch continents`);
      }
      const result = await response.json();
      setContinentOptions(result.map((item) => item.continent));
    } catch (error) {
      console.log(error);
    }
  };

  const fetchCountries = async () => {
    try {
      const queryParams = `continent=${continent}&column=country&distinct=true`;
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
      const queryParams = `continent=${continent}&country=${country}&column=region&distinct=true`;
      const url = `${import.meta.env.VITE_API_BASE_URL}/reits?${queryParams}`;
      const response = await request(url, "GET");
      if (!response.ok) {
        throw new Error(`Failed to fetch regions`);
      }
      const result = await response.json();
      setRegionOptions(result.map((item) => item.region));
    } catch (error) {
      console.log(error);
    }
  };

  const fetchAssetTypes = async () => {
    try {
      const queryParams = `continent=${continent}&country=${country}&region=${region}&column=assetType&distinct=true`;
      const url = `${import.meta.env.VITE_API_BASE_URL}/reits?${queryParams}`;
      const response = await request(url, "GET");
      if (!response.ok) {
        throw new Error(`Failed to fetch asset types`);
      }
      const result = await response.json();
      setAssetTypeOptions(result.map((item) => item.assetType));
    } catch (error) {
      console.log(error);
    }
  };

  const fetchYears = async () => {
    try {
      const queryParams = `continent=${continent}&country=${country}&region=${region}&assetType=${assetType}&column=year&distinct=true`;
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
      const queryParams = `continent=${continent}&country=${country}&region=${region}&assetType=${assetType}&year=${year}&column=unitOfMeasurement&distinct=true`;
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
        setBusinessUnitOptions(businessUnits);
      });
    }
  }, [selectedPeriod]);

  useEffect(() => {
    if (businessUnitId) {
      fetchContinents();
      setContinent("");
      setCountry("");
      setRegion("");
      setAssetType("");
      setYear("");
      setUnitOfMeasurement("");
    }
  }, [businessUnitId]);

  useEffect(() => {
    if (continent) {
      fetchCountries();
      setCountry("");
      setRegion("");
      setAssetType("");
      setYear("");
      setUnitOfMeasurement("");
    }
  }, [continent]);

  useEffect(() => {
    if (country) {
      fetchRegions();
      setRegion("");
      setAssetType("");
      setYear("");
      setUnitOfMeasurement("");
    }
  }, [country]);

  useEffect(() => {
    if (region) {
      fetchAssetTypes();
      setAssetType("");
      setYear("");
      setUnitOfMeasurement("");
    }
  }, [region]);

  useEffect(() => {
    if (assetType) {
      fetchYears();
      setYear("");
      setUnitOfMeasurement("");
    }
  }, [assetType]);

  useEffect(() => {
    if (year) {
      fetchUnitsOfMeasurement();
      setUnitOfMeasurement("");
    }
  }, [year]);

  useEffect(() => {
    if (id) {
      fetchActivityById().then((activity) => {
        setBusinessUnitId(activity.businessUnit.id);
        setContinent(activity.continent);
        setCountry(activity.country);
        setRegion(activity.region);
        setAssetType(activity.assetType);
        setYear(activity.year);
        setUnitOfMeasurement(activity.unitOfMeasurement);
        setQuantity(activity.quantity);
      });
    }
  }, [id]);

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
              {businessUnitOptions.length > 0 ? (
                businessUnitOptions.map((options, index) => {
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
          {/* Continent */}
          <FormControl className="relative">
            <Label>Continent</Label>
            <SearchableSelect
              data={continentOptions}
              item={continent}
              setItem={setContinent}
              text={"Select continent"}
              placeholder={"Search continent"}
            />
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
            <Label>Region</Label>
            <SearchableSelect
              data={regionOptions}
              item={region}
              setItem={setRegion}
              text={"Select region"}
              placeholder={"Search region"}
            />
          </FormControl>
          {/* Asset type */}
          <FormControl className="relative">
            <Label>Asset type</Label>
            <SearchableSelect
              data={assetTypeOptions}
              item={assetType}
              setItem={setAssetType}
              text={"Select asset type"}
              placeholder={"Search asset type"}
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
