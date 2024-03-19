import { useState, useEffect } from "react";
import FrameComponent1 from "../components/FrameComponent1";
import FrameComponent from "../components/FrameComponent";
import Sidebar from "../components/Sidebar";
import Navbar from "../Header/Navbar";
import { useParams } from "react-router-dom";

const Activities = () => {
  const [selectedScope, setSelectedScope] = useState(null);
  const [selectedLevel, setSelectedLevel] = useState(null);
  const [userID, setUserID] = useState("");
  const [companyData, setCompanyData] = useState([]);
  // const [edit, setEdit] = useState(false);
  // const [idOfDataToEdit, setIdOfDataToEdit] = useState(null);
  const { id } = useParams();

  const fetchCompanyData = async () => {
    try {
      const response = await fetch(
        `http://localhost:5000/companiesdata/${userID}`
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
    // Fetch userID from localStorage
    const storedUserID = localStorage.getItem("userId");
    if (storedUserID) {
      setUserID(storedUserID);
    }
  }, []);

  useEffect(() => {
    if (userID) {
      fetchCompanyData();
    }
  }, [userID]);

  useEffect(() => {
    if (!id) {
      setSelectedLevel(null);
    }
  }, [selectedScope]);

  return (
    // <div className="relative bg-gray-50 overflow-hidden flex flex-col items-center justify-start gap-[144px] tracking-[normal] mq450:gap-[144px] mq800:gap-[144px] mq1125:h-auto">
    //   <main className="flex flex-col items-center justify-start gap-[24px]">
    <div>
      <main>
        <Navbar />
        <section className="flex flex-row items-start justify-start py-0 px-5 box-border gap-[24px] max-w-full mq1125:flex-wrap">
          <div className="w-[362px] rounded-lg bg-white shadow-[0px_4px_60px_rgba(0,_0,_0,_0.02)] overflow-x-auto shrink-0 flex flex-row items-center justify-center min-w-[362px] max-w-full mq450:min-w-full mq1125:flex-1">
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
            userId={userID}
            setCompanyData={setCompanyData}
            // companyData={companyData}
            // edit={edit}
            // setEdit={setEdit}
            // idOfDataToEdit={idOfDataToEdit}
          />
        </section>
        {/* TABLE */}
        <FrameComponent
          companyData={companyData}
          setCompanyData={setCompanyData}
          userId={userID}
          // setEdit={setEdit}
          // setIdOfDataToEdit={setIdOfDataToEdit}
        />
      </main>
    </div>
  );
};

export default Activities;
