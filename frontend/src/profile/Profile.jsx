import React, { useState, useEffect } from "react";
import Sidebar from "./Sidebar";
import { Slide, ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate, useParams } from "react-router-dom";

const Profile = ({ userId, profileData, setProfileData }) => {
  // const initialData = {
  //   employees: "",
  //   revenue: "",
  //   notes: "",
  //   productionClients: "",
  //   ownershipPercentage: "",
  //   businessUnits: [],
  //   selectedBusinessUnit: "",
  //   countries: [],
  //   continents: [],
  //   regions: [],
  // };
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
  const [selectedBusinessUnit, setSelectedBusinessUnit] = useState("");
  const { id } = useParams();
  const navigation = useNavigate();

  // Fetch continents from API
  const fetchContinents = async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_BASE_URL}/Profiles`
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

  // Fetch countries based on selected continent
  const fetchCountries = async (continent) => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_BASE_URL}/Profiles?continent=${continent}`
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

  // Fetch regions based on selected country
  const fetchRegions = async (country) => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_BASE_URL}/Profiles?country=${country}`
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

  const fetchData = async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_BASE_URL}/companies/${userId}`
      );
      if (!response.ok) {
        throw new Error(`Failed to fetch data: ${response.statusText}`);
      }
      const jsonData = await response.json();
      setProfileData(jsonData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const resetForm = () => {
    setEmployees("");
    setRevenue("");
    setNotes("");
    setSelectedBusinessUnit("");
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
      return selectedBusinessUnit === profile.unitname;
    });
    return profile.length > 0 ? false : true;
  };
  // Function to handle adding data
  const handleFormSubmit = () => {
    if (
      !selectedBusinessUnit ||
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

    fetch(`${process.env.REACT_APP_API_BASE_URL}/submit`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userid: userId,
        unit: selectedBusinessUnit, // Updated property name
        continent: selectedContinent,
        country: selectedCountry,
        region: selectedRegion,
        employees: employees,
        production: productionClients, // Updated property name
        revenue: revenue,
        partnership: ownershipPercentage, // Updated property name
        notes: notes,
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
        fetchData();
      })
      .catch((error) => {
        toast.error("Error adding data");
        console.error("Error adding data:", error);
      });
  };

  const fetchProfileOfGivenId = async (id) => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_BASE_URL}/companies/profile/${id}`
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
    navigation("/profile");
  };

  const handleUpdateProfile = () => {
    if (
      !selectedBusinessUnit ||
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
    //   unit: selectedBusinessUnit,
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
    fetch(`${process.env.REACT_APP_API_BASE_URL}/companies/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        accept: "application/json",
      },
      body: JSON.stringify({
        userId: userId,
        unit: selectedBusinessUnit,
        continent: selectedContinent,
        countries: selectedCountry,
        region: selectedRegion,
        revenue: revenue,
        production: productionClients,
        employees: employees,
        partnership: ownershipPercentage,
        notes: notes,
      }),
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
        fetchData();
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
          setSelectedBusinessUnit(profileOfGivenId[0].unitname);
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
    <>
      <div className="flex-1 rounded-lg bg-white shadow-[0px_4px_60px_rgba(0,_0,_0,_0.02)] flex flex-col items-end justify-start py-[18px] pr-[18px] pl-6 box-border gap-[30px] min-w-[585px] max-w-full text-left text-5xl text-dark font-poppins mq450:gap-[216px] mq800:min-w-full mq1125:gap-[216px]">
        {/* <div className="w-[900px] h-[656px] relative rounded-lg bg-white shadow-[0px_4px_60px_rgba(0,_0,_0,_0.02)] hidden max-w-full" /> */}
        <div className="self-stretch flex flex-col items-start justify-start gap-[32px] max-w-full mq450:gap-[32px]">
          <h1 className="m-0 h-9 relative text-inherit font-semibold font-inherit inline-block z-[1] mq450:text-lgi">
            Create Your Profile
          </h1>
          <div className="w-full grid grid-cols-2 text-base gap-5">
            {/* <div className="self-stretch flex flex-row items-start justify-start gap-[30px] max-w-full text-base mq800:flex-wrap"> */}
            {/* <div className="flex-1 flex flex-col items-start justify-start gap-[32px] min-w-[269px] max-w-full mq450:gap-[32px]"> */}
            {/* Fuel Category Dropdown */}
            <div className="self-stretch flex flex-col items-start justify-start gap-[12px]">
              <h3 className="m-0 relative text-inherit capitalize font-medium font-inherit z-[1]">
                Business Unit
              </h3>
              <div className="relative w-full">
                <input
                  type="text"
                  className="w-full bg-not-white self-stretch h-10 rounded-lg overflow-hidden shrink-0 flex flex-row items-center justify-start pt-2.5 px-3 pb-[9px] box-border font-poppins text-sm  min-w-[248px] z-[1] border-[1px] border-solid border-slate-600"
                  value={selectedBusinessUnit}
                  onChange={(e) => setSelectedBusinessUnit(e.target.value)}
                />
              </div>
            </div>

            {/* Continent */}
            <div className="self-stretch flex flex-col items-start justify-start gap-[12px]">
              <h3 className="m-0 relative text-inherit capitalize font-medium font-inherit z-[1]">
                Continent
              </h3>
              <select
                className="w-full bg-not-white self-stretch h-10 rounded-lg overflow-hidden shrink-0 flex flex-row items-center justify-start pt-2.5 px-3 pb-[9px] box-border font-poppins text-sm  min-w-[248px] z-[1] border-[1px] border-solid border-slate-600"
                value={selectedContinent}
                onChange={(e) => setSelectedContinent(e.target.value)}
              >
                <option value="">Select Continent</option>
                {continents.map((continent, index) => (
                  <option key={index} value={continent}>
                    {continent}
                  </option>
                ))}
              </select>
            </div>

            {/* Country */}
            <div className="self-stretch flex flex-col items-start justify-start gap-[12px]">
              <h3 className="m-0 relative text-inherit capitalize font-medium font-inherit z-[1]">
                Country
              </h3>
              <select
                className="w-full bg-not-white self-stretch h-10 rounded-lg overflow-hidden shrink-0 flex flex-row items-center justify-start pt-2.5 px-3 pb-[9px] box-border font-poppins text-sm  min-w-[248px] z-[1] border-[1px] border-solid border-slate-600"
                value={selectedCountry}
                onChange={(e) => setSelectedCountry(e.target.value)}
              >
                <option value="">Select Country</option>
                {countries.map((country, index) => (
                  <option key={index} value={country}>
                    {country}
                  </option>
                ))}
              </select>
            </div>

            {/* Region */}
            <div className="self-stretch flex flex-col items-start justify-start gap-[12px]">
              <h3 className="m-0 relative text-inherit capitalize font-medium font-inherit z-[1]">
                Region
              </h3>
              <select
                className="w-full bg-not-white self-stretch h-10 rounded-lg overflow-hidden shrink-0 flex flex-row items-center justify-start pt-2.5 px-3 pb-[9px] box-border font-poppins text-sm  min-w-[248px] z-[1] border-[1px] border-solid border-slate-600"
                value={selectedRegion}
                onChange={(e) => setSelectedRegion(e.target.value)}
              >
                <option value="">Select Region</option>
                {regions.map((region, index) => (
                  <option key={index} value={region}>
                    {region}
                  </option>
                ))}
              </select>
            </div>

            {/* Revenu */}
            <div className="self-stretch flex flex-col items-start justify-start gap-[12px]">
              <h3 className="m-0 relative text-inherit capitalize font-medium font-inherit z-[1]">
                Revenue (optional)
              </h3>
              <div className="relative w-full">
                <input
                  type="number"
                  className="w-full bg-not-white self-stretch h-10 rounded-lg overflow-hidden shrink-0 flex flex-row items-center justify-start pt-2.5 px-3 pb-[9px] box-border font-poppins text-sm  min-w-[248px] z-[1] border-[1px] border-solid border-slate-600"
                  value={revenue}
                  min="0"
                  onChange={(e) => setRevenue(e.target.value)}
                />
              </div>
            </div>

            <div className="self-stretch flex flex-col items-start justify-start gap-[12px]">
              <h3 className="m-0 relative text-inherit capitalize font-medium font-inherit z-[1]">
                No. of employees (optional)
              </h3>
              <div className="relative w-full">
                <input
                  type="number"
                  className="w-full bg-not-white self-stretch h-10 rounded-lg overflow-hidden shrink-0 flex flex-row items-center justify-start pt-2.5 px-3 pb-[9px] box-border font-poppins text-sm min-w-[248px] z-[1] border-[1px] border-solid border-slate-600"
                  value={employees}
                  min={0}
                  onChange={(e) => setEmployees(e.target.value)}
                />
              </div>
            </div>
            <div className="self-stretch flex flex-col items-start justify-start gap-[12px]">
              <h3 className="m-0 relative text-inherit capitalize font-medium font-inherit z-[1]">
                Notes (optional)
              </h3>
              <div className="relative w-full">
                <input
                  type="text"
                  className="w-full bg-not-white self-stretch h-10 rounded-lg overflow-hidden shrink-0 flex flex-row items-center justify-start pt-2.5 px-3 pb-[9px] box-border font-poppins text-sm  min-w-[248px] z-[1] border-[1px] border-solid border-slate-600"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                />
              </div>
            </div>
            {/* </div> */}
            {/* <div className="flex-1 flex flex-col items-start justify-start gap-[32px] min-w-[269px] max-w-full mq450:gap-[32px]"> */}
            <div className="self-stretch flex flex-col items-start justify-start gap-[12px]">
              <h3 className="m-0 relative text-inherit capitalize font-medium font-inherit z-[1]">
                Production / Clients (optional)
              </h3>
              <input
                type="number"
                className="w-full bg-not-white self-stretch h-10 rounded-lg overflow-hidden shrink-0 flex flex-row items-center justify-start pt-2.5 px-3 pb-[9px] box-border font-poppins text-sm min-w-[248px] z-[1] border-[1px] border-solid border-slate-600"
                value={productionClients}
                min={0}
                onChange={(e) => setProductionClients(e.target.value)}
              />
            </div>
            {/* Quantity Dropdown */}
            <div className="self-stretch flex flex-col items-start justify-start gap-[12px]">
              <h3 className="m-0 relative text-inherit capitalize font-medium font-inherit z-[1]">
                Ownership / Partnership %
              </h3>
              <div className="relative w-full">
                <input
                  type="number"
                  className="w-full bg-not-white self-stretch h-10 rounded-lg overflow-hidden shrink-0 flex flex-row items-center justify-start pt-2.5 px-3 pb-[9px] box-border font-poppins text-sm min-w-[248px] z-[1] border-[1px] border-solid border-slate-600"
                  value={
                    ownershipPercentage || ownershipPercentage === 0
                      ? ownershipPercentage
                      : 100
                  }
                  min={0}
                  max={100}
                  onChange={(e) =>
                    setOwnershipPercentage(
                      Math.min(100, Math.max(0, e.target.value))
                    )
                  }
                />
              </div>
            </div>
            {/* </div> */}
          </div>
        </div>
        {/* Buttons */}
        <div className="w-[250px] flex flex-row items-start justify-end gap-[8px] max-w-full mq450:flex-wrap">
          {id ? (
            <>
              <button
                className="cursor-pointer py-2.5 pr-5 pl-[21px] bg-brand-color-2 flex-[0.8859] rounded-lg flex flex-row items-center justify-center box-border min-w-[220px] z-[1] hover:bg-mediumseagreen"
                onClick={handleCancel}
              >
                <div className="h-6 relative text-base capitalize font-medium font-poppins text-white text-center inline-block z-[2]">
                  Cancel
                </div>
              </button>
              <button
                className="cursor-pointer py-2.5 pr-5 pl-[21px] bg-brand-color-2 flex-[0.8859] rounded-lg flex flex-row items-center justify-center box-border min-w-[133px] z-[1] hover:bg-mediumseagreen"
                onClick={handleUpdateProfile}
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
          "--toastify-color-warning": "#e74c3c",
        }}
      />
    </>
  );
};

export default Profile;
