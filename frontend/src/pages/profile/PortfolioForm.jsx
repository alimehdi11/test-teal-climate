import { useState, useEffect, useContext } from "react";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import { request } from "../../utils/request.js";
import Button from "../../components/ui/Button.jsx";
import FormControl from "../../components/FormControl.jsx";
import Input from "../../components/ui/Input.jsx";
import Label from "../../components/ui/Label.jsx";
import Select from "../../components/ui/Select.jsx";
import { usePeriod } from "../../contexts/PeriodProvider.jsx";
import SearchableSelect from "../../components/ui/SearchableSelect.jsx";
import { api } from "../../api/index.js";

const PortfolioForm = ({ setBusinessUnits }) => {
  const [countriesData, setCountriesData] = useState([]);
  const [regions, setRegions] = useState([]);
  const [countries, setCountries] = useState([]);
  const [businessUnitTitle, setBusinessUnitTitle] = useState("");
  const [selectedContinent, setSelectedContinent] = useState("");
  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedRegion, setSelectedRegion] = useState("");
  const [revenue, setRevenue] = useState("");
  const [employees, setEmployees] = useState("");
  const [ownershipPercentage, setOwnershipPercentage] = useState(100);
  const [productionClients, setProductionClients] = useState("");
  const [notes, setNotes] = useState("");
  const [isFormInitializing, setIsFormInitializing] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();
  const { selectedPeriod } = usePeriod();

  const continents = [
    "Europe",
    "Oceania",
    "Antarctica",
    "Americas",
    "Africa",
    "Asia",
  ];

  const fetchCountriesData = async () => {
    try {
      const response = await request(
        `${import.meta.env.VITE_API_BASE_URL}/countries`,
        "GET"
      );
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      const countries = await response.json();
      setCountriesData(countries);
    } catch (error) {
      console.error("Error fetching countries:", error);
    }
  };

  const resetForm = () => {
    setBusinessUnitTitle("");
    setSelectedContinent("");
    setSelectedCountry("");
    setSelectedRegion("");
    setRevenue("");
    setEmployees("");
    setOwnershipPercentage(100);
    setProductionClients("");
    setNotes("");
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    if (
      !businessUnitTitle ||
      !selectedContinent ||
      !selectedCountry ||
      !selectedRegion ||
      !ownershipPercentage
    ) {
      toast.warn("Please fill all fields");
      return;
    }
    const payload = {
      title: businessUnitTitle,
      continent: selectedContinent,
      country: selectedCountry,
      region: selectedRegion,
      revenue: revenue,
      noOfEmployees: employees,
      partnership: ownershipPercentage,
      production: productionClients,
      notes: notes,
      periodId: selectedPeriod,
    };
    request(
      `${import.meta.env.VITE_API_BASE_URL}/businessUnits`,
      "POST",
      payload
    )
      .then(async (response) => {
        if (!response.ok) {
          throw new Error(`${JSON.stringify(await response.json())}`);
        }
        toast.success("Data submitted successfully");
        resetForm();
      })
      .then(async () => {
        const { data, success, message } =
          await api.businessUnits.getAllBusinessUnits(selectedPeriod);
        if (success) {
          setBusinessUnits(data);
        } else {
          toast.error(message);
        }
      })
      .catch((error) => {
        const errorMessage = JSON.parse(error.message).error;
        toast.error(errorMessage);
        console.error("Error adding data : ", errorMessage);
      });
  };

  const fetchBusinessUnitById = async () => {
    try {
      const response = await request(
        `${import.meta.env.VITE_API_BASE_URL}/businessUnits/${id}`,
        "GET"
      );
      if (!response.ok) {
        console.log(response);
        throw new Error(`${JSON.stringify(await response.json())}`);
      }
      const businessUnit = await response.json();
      setBusinessUnitTitle(businessUnit.title);
      setSelectedContinent(businessUnit.continent);
      setSelectedCountry(businessUnit.country);
      setSelectedRegion(businessUnit.region);
      setRevenue(businessUnit.revenue);
      setEmployees(businessUnit.noOfEmployees);
      setOwnershipPercentage(businessUnit.partnership);
      setProductionClients(businessUnit.production);
      setNotes(businessUnit.notes);
      let period = businessUnit.period;
      period = period.split("-");
      const formattedDates = period.map((date) => {
        const d = new Date(date.trim());
        const year = d.getFullYear();
        const month = String(d.getMonth() + 1).padStart(2, "0"); // getMonth is zero-based, so add 1
        const day = String(d.getDate()).padStart(2, "0"); // getDate returns the day of the month
        return `${year}-${month}-${day}`;
      });
      setStartDate(formattedDates[0]);
      setEndtDate(formattedDates[1]);
    } catch (error) {
      const errorMessage = JSON.parse(error.message).error;
      toast.error(errorMessage);
      console.error("Error fetching data : ", errorMessage);
    }
  };

  const handleCancel = () => {
    resetForm();
    navigate("/profile");
  };

  const handleUpdate = () => {
    if (
      !businessUnitTitle ||
      !selectedContinent ||
      !selectedCountry ||
      !selectedRegion ||
      !ownershipPercentage
    ) {
      toast.warn("Please fill all fields");
      return;
    }
    const payload = {
      title: businessUnitTitle,
      continent: selectedContinent,
      country: selectedCountry,
      region: selectedRegion,
      revenue: revenue,
      noOfEmployees: employees,
      partnership: ownershipPercentage,
      production: productionClients,
      notes: notes,
      periodId: selectedPeriod,
    };
    request(
      `${import.meta.env.VITE_API_BASE_URL}/businessUnits/${id}`,
      "PUT",
      payload
    )
      .then(async (response) => {
        if (!response.ok) {
          throw new Error(`${JSON.stringify(await response.json())}`);
        }
        toast.success((await response.json()).message);
        resetForm();
      })
      .then(async () => {
        const { data, success, message } =
          await api.businessUnits.getAllBusinessUnits(selectedPeriod);
        if (success) {
          setBusinessUnits(data);
        } else {
          toast.error(message);
        }
        navigate("/profile");
      })
      .catch((error) => {
        const errorMessage = JSON.parse(error.message).error;
        toast.error(errorMessage);
        console.error("Error updating data : ", errorMessage);
      });
  };

  const filterCountriesByContinent = () => {
    const countries = [];
    countriesData.map((countriesDataItem) => {
      if (countriesDataItem.continent === selectedContinent) {
        countries.push(countriesDataItem.name);
      }
    });
    const uniqueCountries = [...new Set(countries)];
    setCountries(uniqueCountries);
  };

  const filterRegionByCountries = () => {
    const regions = [];
    countriesData.map((countriesDataItem) => {
      if (countriesDataItem.name === selectedCountry) {
        regions.push(countriesDataItem.region);
      }
    });
    const uniqueRegions = [...new Set(regions)];
    setRegions(uniqueRegions);
  };

  useEffect(() => {
    fetchCountriesData();
  }, []);

  useEffect(() => {
    if (selectedContinent) {
      filterCountriesByContinent();
      if (!isFormInitializing) {
        setSelectedCountry("");
        setSelectedRegion("");
        setRegions([]);
      }
    }
  }, [selectedContinent]);

  useEffect(() => {
    if (selectedCountry) {
      filterRegionByCountries();
      if (!isFormInitializing) {
        setSelectedRegion("");
      }
    }
  }, [selectedCountry]);

  useEffect(() => {
    if (id) {
      fetchBusinessUnitById();
      setIsFormInitializing(true);
    }
  }, [id]);

  useEffect(() => {
    if (
      businessUnitTitle &&
      selectedContinent &&
      selectedCountry &&
      selectedRegion &&
      revenue &&
      employees &&
      ownershipPercentage &&
      productionClients &&
      notes
    ) {
      setIsFormInitializing(false);
    }
  }, [
    businessUnitTitle,
    selectedContinent,
    selectedCountry,
    selectedRegion,
    revenue,
    employees,
    ownershipPercentage,
    productionClients,
    notes,
  ]);

  return (
    <form
      onSubmit={handleFormSubmit}
      className="flex flex-col gap-y-3 bg-white rounded-md p-6 mt-4"
    >
      <h3 className="m-0 mb-4 font-extrabold text-2xl">Create Your Profile</h3>
      <div className="grid gap-4  ">
        {/* Business Unit Title */}
        <FormControl>
          <Label>Business unit title</Label>
          <Input
            type="text"
            value={businessUnitTitle}
            onChange={(e) => setBusinessUnitTitle(e.target.value)}
          />
        </FormControl>

        {/* Continent */}
        <FormControl>
          <Label>Continent</Label>
          <Select
            value={selectedContinent}
            onChange={(e) => setSelectedContinent(e.target.value)}
          >
            <option value="">Select continent</option>
            {continents.map((continent, index) => (
              <option key={index} value={continent}>
                {continent}
              </option>
            ))}
          </Select>
        </FormControl>

        {/* Country */}
        <FormControl className="relative">
          <Label>Country</Label>
          <SearchableSelect
            data={countries}
            item={selectedCountry}
            setItem={setSelectedCountry}
            text={"Select country"}
            placeholder={"Search country"}
          />
        </FormControl>

        {/* Region */}
        <FormControl className="relative">
          <Label>Region</Label>
          <SearchableSelect
            data={regions}
            item={selectedRegion}
            setItem={setSelectedRegion}
            text={"Select region"}
            placeholder={"Search region"}
          />
          {/* <Select
            value={selectedRegion}
            onChange={(e) => setSelectedRegion(e.target.value)}
          >
            <option value="">Select region</option>
            {regions.map((region, index) => (
              <option key={index} value={region}>
                {region}
              </option>
            ))}
          </Select> */}
        </FormControl>

        {/* Revenu */}
        <FormControl>
          <Label>Revenue (optional)</Label>
          <Input
            type="number"
            value={revenue}
            min="0"
            onChange={(e) => setRevenue(e.target.value)}
          />
        </FormControl>

        {/* No. of employees  */}
        <FormControl>
          <Label>No. of employees (optional)</Label>
          <Input
            type="number"
            value={employees}
            min="0"
            onChange={(e) => setEmployees(e.target.value)}
          />
        </FormControl>

        {/* Production / Clients */}
        <FormControl>
          <Label>Production / Clients (optional)</Label>
          <Input
            type="number"
            value={productionClients}
            min="0"
            onChange={(e) => setProductionClients(e.target.value)}
          />
        </FormControl>

        {/* Quantity Dropdown */}
        <FormControl>
          <Label>Ownership / Partnership %</Label>
          <Input
            type="number"
            value={
              ownershipPercentage || ownershipPercentage === 0
                ? ownershipPercentage
                : 100
            }
            min={0}
            max={100}
            onChange={(e) =>
              setOwnershipPercentage(Math.min(100, Math.max(0, e.target.value)))
            }
          />
        </FormControl>

        {/* Notes */}
        <FormControl>
          <Label>Notes (optional)</Label>
          <Input
            type="text"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
          />
        </FormControl>
      </div>
      {/* Buttons */}
      {id ? (
        <div className="flex flex-col mt-4 gap-4 md:flex-row self-end">
          <Button type="button" className="flex-1" onClick={handleCancel}>
            Cancel
          </Button>
          <Button type="button" className="flex-1" onClick={handleUpdate}>
            Edit
          </Button>
        </div>
      ) : (
        <Button className="self-end" type="submit">
          Add
        </Button>
      )}
    </form>
  );
};

export default PortfolioForm;
