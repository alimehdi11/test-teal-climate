import { useState, useEffect, useContext } from "react";
import Navbar from "../../components/Navbar.jsx";
import EeioSidebar from "./EeioSidebar.jsx";
import EeioTable from "./EeioTable.jsx";
import { useParams } from "react-router-dom";
import EeioForm from "./EeioForm.jsx";
import { FaArrowLeftLong } from "react-icons/fa6";
import { request } from "../../utils/request.js";
import { UserContext } from "../../contexts/UserContext.jsx";
import Layout from "../../components/layout/Layout.jsx";

const Eeio = () => {
  const { id } = useParams();
  const { pi } = useParams();

  const [selectedForm, setSelectedForm] = useState("");
  const [level1Options, setLevel1Options] = useState([]);
  const [selectedlevel1, setSelectedlevel1] = useState("");
  const { user } = useContext(UserContext);

  const [eeiodata, setEeiodata] = useState("");
  const [tableupdate, setTableUdate] = useState("");

  const fetchEeioData = async () => {
    try {
      const response = await request(
        `${import.meta.env.VITE_API_BASE_URL}/eeios/eeiodata/${user.id}`,
        "GET"
      );
      if (!response.ok) {
        throw new Error(`Failed to fetch data:`);
      }
      const jsonData = await response.json();

      setEeiodata(jsonData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const fetchLevel1Data = async () => {
    try {
      const response = await request(
        `${import.meta.env.VITE_API_BASE_URL}/eeios/${selectedForm}`,
        "GET"
      );

      if (!response.ok) {
        throw new Error(`Failed to fetch data:`);
      }

      const jsonData = await response.json();

      setLevel1Options(jsonData);
    } catch (error) {
      setLevel1Options([]);
    }
  };

  useEffect(() => {
    if (user.id) {
      fetchEeioData();
    }
    // setLevel1Options(jsonData.level1)
  }, [user.id]);

  useEffect(() => {
    fetchLevel1Data();
    // setLevel1Options(jsonData.level1)
  }, [selectedForm]);

  // useEffect(() => {
  //   // Fetch userId from localStorage
  //   const storedUserID = localStorage.getItem("userId");
  //   if (storedUserID) {
  //     setUserId(storedUserID);
  //   }
  // }, []);

  useEffect(() => {
    if (id) {
      setSelectedForm(pi);
    }
  }, [id]);

  return (
    <>
      <Navbar />
      <Layout
        sidebarContent={
          <EeioSidebar
            selectedForm={selectedForm}
            setSelectedForm={setSelectedForm}
            level1Options={level1Options}
            selectedlevel1={selectedlevel1}
            setSelectedlevel1={setSelectedlevel1}
          />
        }
        mainContent={
          selectedForm ? (
            <EeioForm
              selectedForm={selectedForm}
              setSelectedForm={setSelectedForm}
              selectedlevel1={selectedlevel1}
              setSelectedlevel1={setSelectedlevel1}
              tableupdate={tableupdate}
              setTableUdate={setTableUdate}
              setEeiodata={setEeiodata}
            />
          ) : (
            <div
              className="bg-gray-200 flex justify-center items-center font-bold text-gray-500 rounded-lg"
              style={{ height: "calc(100vh - 64px - 16px)" }}
            >
              <FaArrowLeftLong className="text-[20px] me-2" /> Please select
              option from the EeioSidebar
            </div>
          )
        }
      />
      <EeioTable
        eeiodata={eeiodata}
        setEeiodata={setEeiodata}
        userId={user.id}
      />
    </>
  );
};

export default Eeio;
