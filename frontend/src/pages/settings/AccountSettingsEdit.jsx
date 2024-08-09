import Layout from "../../components/layout/Layout.jsx";
import SettingsSidebar from "./SettingsSidebar.jsx";
import { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { request } from "../../utils/request.js";
import FormControl from "../../components/FormControl.jsx";
import Label from "../../components/ui/Label.jsx";
import Input from "../../components/ui/Input.jsx";
import Button from "../../components/ui/Button.jsx";
import { UserContext } from "../../contexts/UserContext.jsx";
import { useNavigate } from "react-router-dom";

const AccountSettingsEdit = () => {
  const { user } = useContext(UserContext);
  const [formData, setFormData] = useState({
    country: "",
    companyName: "",
    phoneNumber: "",
    primaryIndustry: "",
    secondaryIndustry: "",
    sustainabilityManager: "",
  });
  const navigate = useNavigate();

  console.log(formData);
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const url = `${import.meta.env.VITE_API_BASE_URL}/users/${user.id}`;
      const response = await request(url, "PUT", formData);
      if (!response.ok) {
        throw new Error(`${JSON.stringify(await response.json())}`);
      }
      toast.success("Data updated successfully");
      navigate("/settings/account");
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
      <Layout
        sidebarContent={<SettingsSidebar />}
        mainContent={
          <>
            <form onSubmit={handleSubmit}>
              <h3 className="m-0 mb-4 font-extrabold text-2xl">Introduction</h3>
              <div className="grid lg:grid-cols-2 gap-4">
                <FormControl>
                  <Label>Company Name</Label>
                  <Input
                    type="text"
                    name="companyName"
                    value={formData.companyName}
                    onChange={(event) => handleInputChange(event)}
                  />
                </FormControl>
                <FormControl>
                  <Label>Country</Label>
                  <Input
                    type="text"
                    name="country"
                    value={formData.country}
                    onChange={(event) => handleInputChange(event)}
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
              <h3 className="m-0 my-4 font-extrabold text-2xl">Contact</h3>
              <div className="grid lg:grid-cols-2 gap-4">
                <FormControl>
                  <Label>Sustainability Manager</Label>
                  <Input
                    type="text"
                    name="sustainabilityManager"
                    value={formData.sustainabilityManager}
                    onChange={(event) => handleInputChange(event)}
                  />
                </FormControl>
                {/* <FormControl>
                  <Label>Email</Label>
                  <Input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={(event) => handleInputChange(event)}
                  />
                </FormControl> */}
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
              <Button
                className="w-full mt-4 text-white bg-tc-green hover:bg-opacity-90"
                type="submit"
              >
                Submit
              </Button>
            </form>
          </>
        }
      />
    </>
  );
};

export default AccountSettingsEdit;
