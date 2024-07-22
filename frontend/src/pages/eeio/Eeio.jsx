import { useState, useEffect, useContext } from "react";
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

  const [eeioData, setEeioData] = useState("");

  const fetchEeioData = async () => {
    try {
      const response = await request(
        `${import.meta.env.VITE_API_BASE_URL}/eeios/eeiodata/${user.id}`,
        "GET"
      );
      if (!response.ok) {
        throw new Error(`Failed to fetch data`);
      }
      const jsonData = await response.json();
      setEeioData(jsonData);
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
    fetchEeioData();
  }, []);

  useEffect(() => {
    if (selectedForm) {
      fetchLevel1Data();
    }
  }, [selectedForm]);

  useEffect(() => {
    if (id) {
      setSelectedForm(pi);
    }
  }, [id]);

  return (
    <>
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
          selectedForm && selectedlevel1 ? (
            <EeioForm
              selectedForm={selectedForm}
              selectedlevel1={selectedlevel1}
              setSelectedlevel1={setSelectedlevel1}
              fetchEeioData={fetchEeioData}
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
        eeioData={eeioData}
        fetchEeioData={fetchEeioData}
        userId={user.id}
      />
    </>
  );
};

export default Eeio;
