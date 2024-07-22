import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate, useParams } from "react-router-dom";
import { request } from "../../utils/request.js";
import Button from "../../components/ui/Button.jsx";
import FormControl from "../../components/FormControl.jsx";
import Input from "../../components/ui/Input.jsx";
import Label from "../../components/ui/Label.jsx";
import Select from "../../components/ui/Select.jsx";

const PortfolioForm = ({ userId, profileData, fetchProfileData }) => {
  const [countries, setCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState("");
  const [continents, setContinents] = useState([]);
  const [selectedContinent, setSelectedContinent] = useState("");
  const [regions, setRegions] = useState([]);
  const [selectedRegion, setSelectedRegion] = useState("");
  const [employees, setEmployees] = useState("");
  const [revenue, setRevenue] = useState("");
  const [notes, setNotes] = useState("");
  const [productionClients, setProductionClients] = useState("");
  const [ownershipPercentage, setOwnershipPercentage] = useState(100);
  // const [businessUnits, setBusinessUnits] = useState([]);
  const [businessUnit, setBusinessUnit] = useState("");
  const { id } = useParams();
  const navigate = useNavigate();

  const fetchContinents = async () => {
    try {
      const response = await request(
        `${import.meta.env.VITE_API_BASE_URL}/countries`,
        "GET"
      );
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      const jsonData = await response.json();
      // console.log("===>>>", jsonData);
      const uniqueContinents = [
        ...new Set(jsonData.countries.map((country) => country.continent)),
      ];
      setContinents(uniqueContinents);
    } catch (error) {
      console.error("Error fetching continents:", error);
    }
  };

  const fetchCountries = async (continent) => {
    try {
      const response = await request(
        `${import.meta.env.VITE_API_BASE_URL}/countries?continent=${continent}`,
        "GET"
      );
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      const jsonData = await response.json();
      const countriesInContinent = jsonData.countries.filter(
        (country) => country.continent === continent
      );
      const uniqueCountries = [
        ...new Set(countriesInContinent.map((country) => country.countries)),
      ];
      setCountries(uniqueCountries);
    } catch (error) {
      console.error("Error fetching countries:", error);
    }
  };

  const fetchRegions = async (country) => {
    try {
      const response = await request(
        `${import.meta.env.VITE_API_BASE_URL}/countries?country=${country}`,
        "GET"
      );
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      const jsonData = await response.json();
      const regionsInCountry = jsonData.countries
        .filter((item) => item.countries === country)
        .map((item) => item.region);
      const uniqueRegions = [...new Set(regionsInCountry)];
      setRegions(uniqueRegions);
    } catch (error) {
      console.error("Error fetching regions:", error);
    }
  };

  const resetForm = () => {
    setEmployees("");
    setRevenue("");
    setNotes("");
    setBusinessUnit("");
    setProductionClients("");
    setOwnershipPercentage(100);
    setSelectedContinent("");
    setSelectedRegion("");
    setSelectedCountry("");
    setCountries([]);
    setRegions([]);
  };

  const isBusinessUnitUnique = () => {
    const profile = profileData.filter((profile) => {
      return businessUnit === profile.unitname;
    });
    return profile.length > 0 ? false : true;
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    if (
      !businessUnit ||
      !selectedContinent ||
      !selectedCountry ||
      !selectedRegion ||
      !ownershipPercentage
      // revenue ||
      // productionClients ||
      // employees ||
      // notes
    ) {
      toast.warn("Please fill all fields");
      return;
    }

    if (!isBusinessUnitUnique()) {
      toast.warn("Business unit must be unique");
      return;
    }

    request(`${import.meta.env.VITE_API_BASE_URL}/companies`, "POST", {
      userid: userId,
      unit: businessUnit, // Updated property name
      continent: selectedContinent,
      country: selectedCountry,
      region: selectedRegion,
      employees: employees,
      production: productionClients, // Updated property name
      revenue: revenue,
      partnership: ownershipPercentage, // Updated property name
      notes: notes,
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error();
        }
        toast.success("Data submitted successfully");
        resetForm();
      })
      .then(() => {
        fetchProfileData();
      })
      .catch((error) => {
        toast.error("Error adding data");
        console.error("Error adding data:", error);
      });
  };

  const fetchProfileOfGivenId = async (id) => {
    try {
      const response = await request(
        `${import.meta.env.VITE_API_BASE_URL}/companies/profile/${id}`,
        "GET"
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

  const handleCancel = () => {
    resetForm();
    navigate("/profile");
  };

  const handleUpdateProfile = () => {
    if (
      !businessUnit ||
      !selectedContinent ||
      !selectedCountry ||
      !selectedRegion ||
      !ownershipPercentage
      // revenue ||
      // productionClients ||
      // employees ||
      // notes
    ) {
      toast.warn("Please fill all fields");
      return;
    }

    // if (!isBusinessUnitUnique()) {
    //   toast.warn("Business unit must be unique");
    //   return;
    // }
    // console.table({
    //   userId: userId,
    //   unit: businessUnit,
    //   continent: selectedContinent,
    //   countries: selectedCountry,
    //   region: selectedRegion,
    //   revenue: revenue,
    //   production: productionClients,
    //   employees: employees,
    //   partnership: ownershipPercentage,
    //   notes: notes,
    // });
    // return;
    request(`${import.meta.env.VITE_API_BASE_URL}/companies/${id}`, "PUT", {
      userId: userId,
      unit: businessUnit,
      continent: selectedContinent,
      countries: selectedCountry,
      region: selectedRegion,
      revenue: revenue,
      production: productionClients,
      employees: employees,
      partnership: ownershipPercentage,
      notes: notes,
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error();
        }
        toast.success("Data updated successfully");
        resetForm();
        navigation("/profile");
      })
      .then(() => {
        fetchProfileData();
      })
      .catch((error) => {
        toast.error("Error updating data");
        console.log(error);
      });
  };

  // Fetch initial data
  useEffect(() => {
    fetchContinents();
    // fetchBusinessUnits();
  }, []);

  useEffect(() => {
    if (!id) {
      setSelectedRegion("");
      setSelectedCountry("");
      setCountries([]);
      setRegions([]);
    }
    if (selectedContinent) {
      fetchCountries(selectedContinent);
    }
  }, [selectedContinent]);

  // Fetch regions based on selected country
  useEffect(() => {
    if (!id) {
      setSelectedRegion("");
      setRegions([]);
    }
    if (selectedCountry) {
      fetchRegions(selectedCountry);
    }
  }, [selectedCountry]);

  useEffect(() => {
    if (id) {
      fetchProfileOfGivenId(id)
        .then((profileOfGivenId) => {
          setBusinessUnit(profileOfGivenId[0].unitname);
          setSelectedContinent(profileOfGivenId[0].continent);
          setSelectedCountry(profileOfGivenId[0].countries);
          setSelectedRegion(profileOfGivenId[0].region);
          setEmployees(profileOfGivenId[0].employees);
          setProductionClients(profileOfGivenId[0].production);
          setRevenue(profileOfGivenId[0].revenue);
          setNotes(profileOfGivenId[0].notes);
          setOwnershipPercentage(profileOfGivenId[0].partnership);
        })
        .catch((error) => {
          console.error("Failed to get company data", error);
        });
    }
  }, [id]);

  return (
    <form onSubmit={handleFormSubmit}>
      <h3 className="m-0 mb-4 font-extrabold text-2xl">Create Your Profile</h3>
      <div className="grid lg:grid-cols-2 gap-4">
        {/* Fuel Category Dropdown */}
        <FormControl>
          <Label>Business Unit</Label>
          <Input
            type="text"
            value={businessUnit}
            onChange={(e) => setBusinessUnit(e.target.value)}
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
        <FormControl>
          <Label>Country</Label>
          <Select
            value={selectedCountry}
            onChange={(e) => setSelectedCountry(e.target.value)}
          >
            <option value="">Select Country</option>
            {countries.map((country, index) => (
              <option key={index} value={country}>
                {country}
              </option>
            ))}
          </Select>
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

        {/* Notes */}
        <FormControl>
          <Label>Notes (optional)</Label>
          <Input
            type="text"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
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
      </div>

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
            onClick={handleUpdateProfile}
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
