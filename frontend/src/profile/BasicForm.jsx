import React, { useState } from "react";
import { Slide, ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { request } from "../utils/network.utils";

const BasicForm = () => {
  const [formData, setFormData] = useState({
    userId: localStorage.getItem("userId"), // Logged in user id
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
    <>
      <form onSubmit={handleSubmit} className="w-full px-5">
        <h3 className="text-[24px]">Introduction</h3>
        <div className="grid grid-cols-2 gap-5">
          <div>
            <h3 className="m-0 mb-[12px] font-medium text-base w-full">
              Company Name
            </h3>
            <input
              className="h-10 rounded-lg p-3 box-border font-poppins text-sm min-w-[248px] border-[1px] border-solid border-slate-600 w-full"
              type="text"
              name="companyName"
              value={formData.companyName}
              onChange={(event) => handleInputChange(event)}
            />
          </div>
          <div>
            <h3 className="m-0 mb-[12px] font-medium text-base">Country</h3>
            <input
              className="h-10 rounded-lg p-3 box-border font-poppins text-sm min-w-[248px] border-[1px] border-solid border-slate-600 w-full"
              type="text"
              name="country"
              value={formData.country}
              onChange={(event) => handleInputChange(event)}
            />
          </div>
          <div>
            <h3 className="m-0 mb-[12px] font-medium text-base">
              Select Primary Industry
            </h3>
            <input
              className="h-10 rounded-lg p-3 box-border font-poppins text-sm min-w-[248px] border-[1px] border-solid border-slate-600 w-full"
              type="text"
              name="primaryIndustry"
              value={formData.primaryIndustry}
              onChange={(event) => handleInputChange(event)}
            />
          </div>
          <div>
            <h3 className="m-0 mb-[12px] font-medium text-base">
              Select Secondary Industry
            </h3>
            <input
              className="h-10 rounded-lg p-3 box-border font-poppins text-sm min-w-[248px] border-[1px] border-solid border-slate-600 w-full"
              type="text"
              name="secondaryIndustry"
              value={formData.secondaryIndustry}
              onChange={(event) => handleInputChange(event)}
            />
          </div>
        </div>
        <h3 className="text-[24px]">Contact</h3>
        <div className="grid grid-cols-2 gap-5">
          <div>
            <h3 className="m-0 mb-[12px] font-medium text-base w-full">
              Sustainability Manager
            </h3>
            <input
              className="h-10 rounded-lg p-3 box-border font-poppins text-sm min-w-[248px] border-[1px] border-solid border-slate-600 w-full"
              type="text"
              name="sustainabilityManager"
              value={formData.sustainabilityManager}
              onChange={(event) => handleInputChange(event)}
            />
          </div>
          <div>
            <h3 className="m-0 mb-[12px] font-medium text-base">Email</h3>
            <input
              className="h-10 rounded-lg p-3 box-border font-poppins text-sm min-w-[248px] border-[1px] border-solid border-slate-600 w-full"
              type="email"
              name="email"
              value={formData.email}
              onChange={(event) => handleInputChange(event)}
            />
          </div>
          <div>
            <h3 className="m-0 mb-[12px] font-medium text-base">
              Phone Number
            </h3>
            <input
              className="h-10 rounded-lg p-3 box-border font-poppins text-sm min-w-[248px] border-[1px] border-solid border-slate-600 w-full"
              type="text"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={(event) => handleInputChange(event)}
            />
          </div>
        </div>
        <button
          className="bg-brand-color-01 hover:bg-mediumseagreen text-white rounded-lg h-10 min-w-[170px] text-base block ms-auto mt-5"
          type="submit"
        >
          Submit
        </button>
      </form>
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

export default BasicForm;
