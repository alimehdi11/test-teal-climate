import { useContext, useState } from "react";
import { toast } from "react-toastify";
import { request } from "../../utils/request.js";
import FormControl from "../../components/FormControl.jsx";
import Label from "../../components/ui/Label.jsx";
import Input from "../../components/ui/Input.jsx";
import Button from "../../components/ui/Button.jsx";
import { UserContext } from "../../contexts/UserContext.jsx";

const BasicForm = () => {
  const { user } = useContext(UserContext);
  const [formData, setFormData] = useState({
    userId: user.id,
    companyName: "",
    country: "",
    primaryIndustry: "",
    secondaryIndustry: "",
    sustainabilityManager: "",
    email: "",
    phoneNumber: "",
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const areAllInputsProvided = (formData) => {
    if (
      formData.userId === "" ||
      formData.companyName === "" ||
      formData.country === "" ||
      formData.primaryIndustry === "" ||
      formData.secondaryIndustry === "" ||
      formData.sustainabilityManager === "" ||
      formData.email === "" ||
      formData.phoneNumber === ""
    ) {
      return false;
    }
    return true;
  };

  const resetForm = () => {
    setFormData({
      companyName: "",
      country: "",
      primaryIndustry: "",
      secondaryIndustry: "",
      sustainabilityManager: "",
      email: "",
      phoneNumber: "",
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!areAllInputsProvided(formData)) {
      toast.warn("Please fill all fields");
      return;
    }
    console.log(formData);
    // return;
    const url = `${import.meta.env.VITE_API_BASE_URL}/companyIntro`;
    request(url, "POST", formData)
      .then((response) => {
        if (!response.ok) {
          throw new Error();
        }
        toast.success("Data submitted successfully");
        resetForm();
      })
      .catch((error) => {
        toast.error("Error adding data");
        console.error("Error adding data:", error);
      });
  };

  return (
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
        <FormControl>
          <Label>Email</Label>
          <Input
            type="email"
            name="email"
            value={formData.email}
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
      <Button
        className="w-full mt-4 text-white bg-tc-green hover:bg-opacity-90"
        type="submit"
      >
        Submit
      </Button>
    </form>
  );
};

export default BasicForm;
