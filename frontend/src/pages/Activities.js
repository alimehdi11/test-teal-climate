import { useState, useEffect } from "react";
import FrameComponent1 from "../components/FrameComponent1";
import FrameComponent from "../components/FrameComponent";
import Sidebar from "../components/Sidebar";
import Navbar from "../Header/Navbar";
import { useParams } from "react-router-dom";

const Activities = () => {
  const [selectedScope, setSelectedScope] = useState(null);
  const [selectedLevel, setSelectedLevel] = useState(null);
  const [userId, setUserId] = useState("");
  const [companyData, setCompanyData] = useState([]);
  const { id } = useParams();

  const fetchCompanyData = async () => {
    try {
      const response = await fetch(
        `http://localhost:5000/companiesdata/${userId}`
      );
      if (!response.ok) {
        throw new Error(`Failed to fetch data:`);
      }
      const jsonData = await response.json();
      setCompanyData(jsonData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    // Fetch userId from localStorage
    const storedUserID = localStorage.getItem("userId");
    if (storedUserID) {
      setUserId(storedUserID);
    }
  }, []);

  useEffect(() => {
    if (userId) {
      fetchCompanyData();
    }
  }, [userId]);

  useEffect(() => {
    if (!id) {
      setSelectedLevel(null);
    }
  }, [selectedScope]);

  return (
    <>
      <Navbar />
      <section className="flex flex-row items-start justify-start py-0 px-5 box-border gap-[24px] max-w-full mq1125:flex-wrap">
        <div className="w-[362px] rounded-lg bg-white shadow-[0px_4px_60px_rgba(0,_0,_0,_0.02)] overflow-x-auto shrink-0 flex flex-row items-center justify-center min-w-[362px] max-w-full mq450:min-w-full mq1125:flex-1 hide-scroll">
          <div className="h-[656px] w-[326px] relative shrink-0 z-[1] flex ">
            <Sidebar
              selectedScope={selectedScope}
              selectedLevel={selectedLevel}
              setSelectedScope={setSelectedScope}
              setSelectedLevel={setSelectedLevel}
            />
          </div>
        </div>
        {/* FORM */}
        <FrameComponent1
          selectedScope={selectedScope}
          selectedLevel={selectedLevel}
          setSelectedScope={setSelectedScope}
          setSelectedLevel={setSelectedLevel}
          userId={userId}
          setCompanyData={setCompanyData}
        />
      </section>
      {/* TABLE */}
      <FrameComponent
        companyData={companyData}
        setCompanyData={setCompanyData}
        userId={userId}
      />
    </>
  );
};

export default Activities;
