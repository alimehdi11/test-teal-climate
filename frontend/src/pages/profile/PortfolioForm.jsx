import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import { request } from "../../utils/request.js";
import Button from "../../components/ui/Button.jsx";
import FormControl from "../../components/FormControl.jsx";
import Input from "../../components/ui/Input.jsx";
import Label from "../../components/ui/Label.jsx";
import Select from "../../components/ui/Select.jsx";
import { FaAngleDown } from "react-icons/fa6";

const PortfolioForm = ({ userBusinessUnits, fetchUserBusinessUnits }) => {
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
  const [showCountriesOptions, setShowCountriesOptions] = useState(false);
  const [filterCountryBy, setFilterCountryBy] = useState("");
  const [filteredCountries, setFilteredCountries] = useState([]);

  const [editMode, setEditMode] = useState(false);

  const { id } = useParams();

  const navigate = useNavigate();

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

  const isBusinessUnitUnique = () => {
    for (let bu = 0; bu < userBusinessUnits.length; bu++) {
      if (businessUnitTitle === userBusinessUnits[bu].title) {
        return false;
      }
    }
    return true;
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    if (
      !businessUnitTitle ||
      !selectedContinent ||
      !selectedCountry ||
      !selectedRegion ||
      // revenue ||
      // employees ||
      !ownershipPercentage
      // productionClients ||
      // notes
    ) {
      toast.warn("Please fill all fields");
      return;
    }

    if (!isBusinessUnitUnique()) {
      toast.warn("Businessunits title must be unique");
      return;
    }

    request(`${import.meta.env.VITE_API_BASE_URL}/businessUnits`, "POST", {
      title: businessUnitTitle,
      continent: selectedContinent,
      country: selectedCountry,
      region: selectedRegion,
      revenue: revenue,
      noOfEmployees: employees,
      partnership: ownershipPercentage,
      production: productionClients,
      notes: notes,
    })
      .then(async (response) => {
        if (!response.ok) {
          throw new Error(`${JSON.stringify(await response.json())}`);
        }
        toast.success("Data submitted successfully");
        resetForm();
      })
      .then(() => {
        fetchUserBusinessUnits();
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
      // revenue ||
      // employees ||
      !ownershipPercentage
      // productionClients ||
      // notes
    ) {
      toast.warn("Please fill all fields");
      return;
    }

    request(`${import.meta.env.VITE_API_BASE_URL}/businessUnits/${id}`, "PUT", {
      title: businessUnitTitle,
      continent: selectedContinent,
      country: selectedCountry,
      region: selectedRegion,
      revenue: revenue,
      noOfEmployees: employees,
      partnership: ownershipPercentage,
      production: productionClients,
      notes: notes,
    })
      .then(async (response) => {
        if (!response.ok) {
          throw new Error(`${JSON.stringify(await response.json())}`);
        }
        toast.success((await response.json()).message);
        resetForm();
        navigate("/profile");
      })
      .then(() => {
        fetchUserBusinessUnits();
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
      if (editMode) {
        setEditMode(false);
      } else {
        setSelectedCountry("");
      }
      filterCountriesByContinent();
    } else {
      setSelectedCountry("");
      setCountries([]);
    }
    setFilterCountryBy("");
  }, [selectedContinent]);

  useEffect(() => {
    if (selectedCountry) {
      filterRegionByCountries();
    } else {
      setSelectedRegion("");
      setRegions([]);
    }
  }, [selectedCountry]);

  useEffect(() => {
    if (id) {
      fetchBusinessUnitById();
      setEditMode(true);
    }
  }, [id]);

  useEffect(() => {
    if (filterCountryBy === "") {
      setFilteredCountries(countries);
    } else {
      setFilteredCountries(
        countries.filter((country) => {
          return country.toLowerCase().includes(filterCountryBy.toLowerCase());
        })
      );
    }
  }, [filterCountryBy, countries]);

  return (
    <form onSubmit={handleFormSubmit}>
      <h3 className="m-0 mb-4 font-extrabold text-2xl">Create Your Profile</h3>
      <div className="grid lg:grid-cols-2 gap-4">
        {/* Business Unit Title */}
        <FormControl>
          <Label>Business Unit Title</Label>
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
            <option value="">Select Continent</option>
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
          <button
            type="button"
            className="p-2 bg-white text-black hover:bg-white hover:text-black border border-slate-500 rounded-lg flex justify-between items-center"
            onClick={(e) => {
              setShowCountriesOptions((prev) => !prev);
            }}
          >
            {selectedCountry || "Select Country"}
            <FaAngleDown className="text-[0.8rem] -me-[6px]" />
          </button>
          {showCountriesOptions &&
            (countries.length > 0 ? (
              <ul className="absolute bg-white w-full top-[105%] border border-slate-500 overflow-y-auto max-h-60">
                <Input
                  placeholder="Search country"
                  value={filterCountryBy}
                  onChange={(e) => setFilterCountryBy(e.target.value)}
                />
                {filteredCountries.length > 0 ? (
                  filteredCountries.map((country) => (
                    <li
                      key={country}
                      onClick={() => {
                        setSelectedCountry(country);
                        setShowCountriesOptions(false);
                      }}
                      className="hover:bg-gray-500 hover:text-white px-2 cursor-pointer"
                    >
                      {country}
                    </li>
                  ))
                ) : (
                  <li className="px-2">No match found</li>
                )}
              </ul>
            ) : (
              <div className="absolute bg-gray-500 text-white w-full top-[105%] px-2">
                Select Country
              </div>
            ))}

          {/* <Select
            value={selectedCountry}
            onChange={(e) => setSelectedCountry(e.target.value)}
          >
            <option value="">Select Country</option>
            {countries.map((country, index) => (
              <option key={index} value={country}>
                {country}
              </option>
            ))}
          </Select> */}
        </FormControl>

        {/* Region */}
        <FormControl>
          <Label>Region</Label>
          <Select
            value={selectedRegion}
            onChange={(e) => setSelectedRegion(e.target.value)}
          >
            <option value="">Select Region</option>
            {regions.map((region, index) => (
              <option key={index} value={region}>
                {region}
              </option>
            ))}
          </Select>
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
      {/* <Button
        className="w-full mt-4 text-white bg-tc-green hover:bg-opacity-90"
        type="submit"
      >
        Add
      </Button> */}
      {/* Buttons */}
      {id ? (
        <div className="flex flex-col mt-4 gap-4 md:flex-row">
          <Button
            type="button"
            className="flex-1 text-white bg-tc-green hover:bg-opacity-90"
            onClick={handleCancel}
          >
            Cancel
          </Button>
          <Button
            type="button"
            className="flex-1 text-white bg-tc-green hover:bg-opacity-90"
            onClick={handleUpdate}
          >
            Edit
          </Button>
        </div>
      ) : (
        <Button
          className="w-full mt-4 text-white bg-tc-green hover:bg-opacity-90"
          type="submit"
        >
          Add
        </Button>
      )}
    </form>
  );
};

export default PortfolioForm;
