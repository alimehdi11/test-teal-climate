import { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { request } from "../utils/request.js";
import FormControl from "../components/FormControl.jsx";
import Label from "../components/ui/Label.jsx";
import Input from "../components/ui/Input.jsx";
import Button from "../components/ui/Button.jsx";
import { UserContext } from "../contexts/UserContext.jsx";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/layout/Sidebar.jsx";
import Main from "../components/layout/Main.jsx";
import SearchableSelect from "../components/ui/SearchableSelect.jsx";
import { api } from "../../api/index.js";

const AccountEdit = () => {
  const { user } = useContext(UserContext);
  const [countries, setCountries] = useState([])
  const [selectedCountry, setSelectedCountry] = useState("");


  const [formData, setFormData] = useState({
    companyName: "",
    phoneNumber: "",
    primaryIndustry: "",
    secondaryIndustry: "",
    sustainabilityManager: "",
  });


  useEffect(() => {
    const getCountries = async () => {
      const countries = await api.countries.getCountries("?column=name&distinct=true");
      setCountries(countries.map(country=>country.name));
    }
    getCountries();
  }, []);

  const navigate = useNavigate();




  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const url = `${import.meta.env.VITE_API_BASE_URL}/users/${user.id}`;
      const response = await request(url, "PUT", { ...formData, country: selectedCountry });
      if (!response.ok) {
        throw new Error(`${JSON.stringify(await response.json())}`);
      }
      toast.success("Data updated successfully");
      navigate("/account");
    } catch (error) {
      const errorMessage = JSON.parse(error.message).error;
      console.log(errorMessage);
      toast.error(errorMessage);
    }
  };

  const fetchUserById = async () => {
    try {
      const url = `${import.meta.env.VITE_API_BASE_URL}/users/${user.id}`;
      const response = await request(url, "GET");
      if (!response.ok) {
        throw new Error(`${JSON.stringify(await response.json())}`);
      }
      const userInfo = await response.json();
      setFormData({
        country: userInfo.country === null ? "" : userInfo.country,
        companyName: userInfo.companyName === null ? "" : userInfo.companyName,
        phoneNumber: userInfo.phoneNumber === null ? "" : userInfo.phoneNumber,
        primaryIndustry:
          userInfo.primaryIndustry === null ? "" : userInfo.primaryIndustry,
        secondaryIndustry:
          userInfo.secondaryIndustry === null ? "" : userInfo.secondaryIndustry,
        sustainabilityManager:
          userInfo.sustainabilityManager === null
            ? ""
            : userInfo.sustainabilityManager,
      });
    } catch (error) {
      const errorMessage = JSON.parse(error.message).error;
      console.log(errorMessage);
    }
  };

  useEffect(() => {
    fetchUserById();
  }, []);

  return (
    <>
      <Sidebar></Sidebar>
      <Main>
        <>
          <div className="my-5 font-extrabold text-2xl">Account</div>
          <form
            onSubmit={handleSubmit}
            className="bg-white p-6 rounded-md grid grid-cols-2 gap-4"
          >
            <div>
              <h3 className="m-0 mb-4 font-extrabold text-2xl">Introduction</h3>
              <div className="grid gap-4">
                <FormControl>
                  <Label>Company Name</Label>
                  <Input
                    type="text"
                    name="companyName"
                    value={formData.companyName}
                    onChange={(event) => handleInputChange(event)}
                  />
                </FormControl>
                <FormControl className="flex-1 relative">
                  <Label>Country</Label>
                  <SearchableSelect
                    data={countries}
                    item={selectedCountry}
                    setItem={setSelectedCountry}
                    text={"Select Country"}
                    placeholder={"Search Country"}
                  />
                </FormControl>
                <FormControl>
                  <Label>Select Primary Industry</Label>
                  <Input
                    type="text"
                    name="primaryIndustry"
                    value={formData.primaryIndustry}
                    onChange={(event) => handleInputChange(event)}
                  />
                </FormControl>
                <FormControl>
                  <Label>Select Secondary Industry</Label>
                  <Input
                    type="text"
                    name="secondaryIndustry"
                    value={formData.secondaryIndustry}
                    onChange={(event) => handleInputChange(event)}
                  />
                </FormControl>
              </div>
            </div>
            <div>
              <h3 className="m-0 mb-4 font-extrabold text-2xl">Contact</h3>
              <div className="grid gap-4">
                <FormControl>
                  <Label>Sustainability Manager</Label>
                  <Input
                    type="text"
                    name="sustainabilityManager"
                    value={formData.sustainabilityManager}
                    onChange={(event) => handleInputChange(event)}
                  />
                </FormControl>
                <FormControl>
                  <Label>Phone Number</Label>
                  <Input
                    type="text"
                    name="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={(event) => handleInputChange(event)}
                  />
                </FormControl>
              </div>
            </div>
            <Button className="col-span-2 justify-self-end" type="submit">
              Submit
            </Button>
          </form>
        </>
      </Main>
    </>
  );
};

export default AccountEdit;
