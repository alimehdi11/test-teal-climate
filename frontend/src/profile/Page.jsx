import React, { useEffect } from "react";
import Sidebar from "./Sidebar";
import PortfolioForm from "./PortfolioForm";
import BasicForm from "./BasicForm";
import Navbar from "../Header/Navbar";
import Profiletable from "./Profiletable";
import { useState } from "react";
import { FaArrowLeftLong } from "react-icons/fa6";
import { getBearerToken } from "./../utils/auth.utils.js";

const Page = () => {
  const [userId, setUserId] = useState("");
  const [profileData, setProfileData] = useState([]);
  const [selectedForm, setSelectedForm] = useState("");

  useEffect(() => {
    // Fetch userID from localStorage
    const storedUserId = localStorage.getItem("userId");
    if (storedUserId) {
      setUserId(storedUserId);
    }
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_BASE_URL}/companies/${userId}`,
        {
          headers: {
            authorization: getBearerToken(),
          },
        }
      );
      if (!response.ok) {
        console.log(response);
        throw new Error(`Failed to fetch data: ${response.statusText}`);
      }
      const jsonData = await response.json();
      setProfileData(jsonData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    if (userId) {
      fetchData();
    }
  }, [userId]);

  return (
    <>
      <Navbar />
      <section className="w-[1326px] flex flex-row items-start justify-start py-0 px-5 box-border gap-[24px] max-w-full mq1125:flex-wrap">
        <div className="w-[362px] rounded-lg bg-white shadow-[0px_4px_60px_rgba(0,_0,_0,_0.02)] overflow-x-auto shrink-0 flex flex-row items-center justify-center min-w-[362px] max-w-full mq450:min-w-full mq1125:flex-1">
          {/* <div className="self-stretch w-[362px] relative rounded-lg bg-white shadow-[0px_4px_60px_rgba(0,_0,_0,_0.02)] shrink-0 hidden" /> */}
          <div className="h-[656px] w-[326px] relative shrink-0 z-[1] flex ">
            <Sidebar setSelectedForm={setSelectedForm} />
          </div>
        </div>
        {/* form */}
        {selectedForm ? (
          (selectedForm === "Basic" && <BasicForm />) || // Or
          (selectedForm === "Portfolio" && (
            <PortfolioForm
              userId={userId}
              profileData={profileData}
              setProfileData={setProfileData}
            />
          ))
        ) : (
          <div className="w-full h-[656px] bg-gray-200 rounded-md flex justify-center items-center font-bold text-gray-500">
            <FaArrowLeftLong className="text-[20px] me-2" /> Please select
            option from the sidebar
          </div>
        )}
      </section>
      <Profiletable
        profileData={profileData}
        setProfileData={setProfileData}
        userId={userId}
      />
    </>
  );
};

export default Page;
