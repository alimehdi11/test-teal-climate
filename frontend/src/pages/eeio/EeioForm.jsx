import { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { request } from "../../utils/request.js";
import Button from "../../components/ui/Button.jsx";
import FormControl from "../../components/FormControl.jsx";
import Input from "../../components/ui/Input.jsx";
import Label from "../../components/ui/Label.jsx";
import Select from "../../components/ui/Select.jsx";
import { UserContext } from "../../contexts/UserContext.jsx";

const EeoiForm = ({
  selectedForm,
  selectedlevel1,
  setSelectedlevel1,
  fetchEeioData,
}) => {
  const { user } = useContext(UserContext);

  const [businessUnitsoption, setBusinessUnits] = useState("");
  const [businessUnitsvalue, setBusinessUnitsvalue] = useState("");
  const [level2options, setlevel2options] = useState("");
  const [Level2value, setLevel2value] = useState("");
  const [Level3option, setLevel3option] = useState("");
  const [Level3value, setLevel3value] = useState("");
  const [Level4option, setLevel4option] = useState("");
  const [Level4value, setLevel4value] = useState("");
  const [Level5option, setLevel5option] = useState("");
  const [Level5value, setLevel5value] = useState("");
  const [Sectoroption, setSectoroption] = useState("");
  const [Sectorvalue, setSectorvalue] = useState("");
  const [currencyvalue, setCurrencyValue] = useState("pereuro");
  const [quantity, setQuantity] = useState("");

  const { id } = useParams();

  const navigation = useNavigate();

  const fetchEditData = async (id, userId) => {
    try {
      const response = await request(
        `${import.meta.env.VITE_API_BASE_URL}/eeios/fetchEeioEditData/${id}/${user.id}`,
        "GET"
      );
      if (!response.ok) {
        throw new Error(`Failed to fetch data:`);
      }

      const jsonData = await response.json();
      // console.log('idies:', jsonData)

      return jsonData;

      // setEeioData(jsonData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const resetForm = () => {
    setlevel2options([]);
    setBusinessUnitsvalue("");
    setLevel2value("");
    setLevel3value("");
    setLevel4value("");
    setLevel5value("");
    setSectorvalue("");
    setQuantity("");
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    // Validate form fields
    if (
      !user.id ||
      !businessUnitsvalue ||
      !selectedForm ||
      !selectedlevel1 ||
      (level2options.length > 0 && !Level2value) ||
      (Level3option.length > 0 && !Level3value) ||
      (Level4option.length > 0 && !Level4value) ||
      (Level5option.length > 0 && !Level5value) ||
      (Sectoroption.length > 0 && !Sectorvalue) ||
      !currencyvalue ||
      !quantity
    ) {
      toast.warn("Please fill all fields");
      return;
    }

    const payload = {
      userId: user.id,
      businessUnitsvalue,
      selectedForm,
      selectedlevel1,
      Level2value,
      Level3value,
      Level4value,
      Level5value,
      Sectorvalue,
      currencyvalue,
      quantity,
    };

    await request(
      `${import.meta.env.VITE_API_BASE_URL}/eeios/insertEeioData`,
      "POST",
      payload
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error();
        }
        resetForm();
      })
      .then(() => {
        toast.success("Data submitted successfully");
        fetchEeioData();
      })
      .catch((error) => {
        toast.error("Error adding data");
        console.error("Couldn't submit data", error);
      });
  };

  const handleUpdateData = async () => {
    // Validate form fields
    if (
      !userId ||
      !businessUnitsvalue ||
      !selectedForm ||
      !selectedlevel1 ||
      (level2options.length > 0 && !Level2value) ||
      (Level3option.length > 0 && !Level3value) ||
      (Level4option.length > 0 && !Level4value) ||
      (Level5option.length > 0 && !Level5value) ||
      (Sectoroption.length > 0 && !Sectorvalue) ||
      !currencyvalue ||
      !quantity
    ) {
      toast.warn("Please fill all fields");
      return;
    }

    // Create payload
    const payload = {
      userId,
      businessUnitsvalue,
      selectedForm,
      selectedlevel1,
      Level2value,
      Level3value,
      Level4value,
      Level5value,
      Sectorvalue,
      currencyvalue,
      quantity,
    };

    try {
      const response = await request(
        `${import.meta.env.VITE_API_BASE_URL}/eeios/editEeioData/${id}`,
        "PUT",
        payload
      )
        .then((response) => {
          if (!response.ok) {
            throw new Error();
          }
          toast.success("Data edit successfully");
          resetForm();
          navigation("/eeio");
        })
        .then(() => {
          console.log("done");
          fetchEeioData();
        });
    } catch (error) {
      // Handle error
      toast.error("Error adding data");
      console.error("Couldn't submit data", error);
    }
  };

  const handleCancel = () => {
    resetForm();
    navigation("/eeio");
  };

  const fetchBusinessUnit = async () => {
    try {
      const response = await request(
        `${import.meta.env.VITE_API_BASE_URL}/companies/${user.id}?column=unitname`,
        "GET"
      );
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      return await response.json();
    } catch (error) {
      console.error("Error fetching companies businessunits:", error);
    }
  };

  const fetchLevel2Data = async () => {
    try {
      const result = await request(
        `${import.meta.env.VITE_API_BASE_URL}/eeios/level2/${selectedForm}/${selectedlevel1}`,
        "GET"
      );

      if (!result.ok) {
        throw new Error(`Failed to fetch data:`);
      }

      const jsonData = await result.json();
      setlevel2options(jsonData);
    } catch (error) {
      setlevel2options([]);
    }
  };

  const fetchLevel3Data = async () => {
    try {
      const response = await request(
        `${import.meta.env.VITE_API_BASE_URL}/eeios/level3/${selectedForm}/${selectedlevel1}/${Level2value}/`,
        "GET"
      );
      if (!response.ok) {
        throw new Error(`Failed to fetch data:`);
      }
      const jsonData = await response.json();
      setLevel3option(jsonData);
    } catch (error) {
      setLevel3option([]);
    }
  };

  const fetchLevel4Data = async () => {
    try {
      const response = await request(
        `${import.meta.env.VITE_API_BASE_URL}/eeios/level4/${selectedForm}/${selectedlevel1}/${Level2value}/${Level3value}/`,
        "GET"
      );
      if (!response.ok) {
        throw new Error(`Failed to fetch data:`);
      }
      const jsonData = await response.json();
      setLevel4option(jsonData);
    } catch (error) {
      setLevel4option([]);
    }
  };

  const fetchLevel5Data = async () => {
    setSectorvalue("");

    try {
      const response = await request(
        `${import.meta.env.VITE_API_BASE_URL}/eeios/level5/${selectedForm}/${selectedlevel1}/${Level2value}/${Level3value}/${Level4value}/`,
        "GET"
      );
      if (!response.ok) {
        throw new Error(`Failed to fetch data:`);
      }
      const jsonData = await response.json();
      setLevel5option(jsonData);
    } catch (error) {
      setLevel5option([]);
    }
  };

  const fetchSectorData = async () => {
    try {
      const response = await request(
        `${import.meta.env.VITE_API_BASE_URL}/eeios/sector/${selectedForm}/${selectedlevel1}/${Level2value}/${Level3value}/${Level4value}/${Level5value}/`,
        "GET"
      );
      if (!response.ok) {
        throw new Error(`Failed to fetch data:`);
      }
      const jsonData = await response.json();
      setSectoroption(jsonData);
    } catch (error) {
      setSectoroption([]);
    }
  };

  useEffect(() => {
    fetchBusinessUnit().then((businessUnits) => {
      // businessUnits = businessUnits.map((item) => item.unitname);
      setBusinessUnits(businessUnits);
    });
  }, []);

  useEffect(() => {
    if (selectedlevel1) {
      fetchLevel2Data();
    }
  }, [selectedlevel1]);

  useEffect(() => {
    fetchLevel3Data();
  }, [Level2value /*, level2options */]);

  useEffect(() => {
    fetchLevel4Data();
  }, [Level3value /*, Level3option */]);

  useEffect(() => {
    fetchLevel5Data();
  }, [Level4value /*, Level4option */]);

  useEffect(() => {
    fetchSectorData();
  }, [Level5value /*, Level5option */]);

  useEffect(() => {
    if (id && user.id) {
      fetchEditData(id, user.id)
        .then((editData) => {
          console.warn(editData);

          setSelectedlevel1(editData[0].level1);
          setBusinessUnitsvalue(editData[0].unitname);
          setLevel2value(editData[0].level2);
          setLevel3value(editData[0].level3);
          setLevel4value(editData[0].level4);
          setLevel5value(editData[0].level5);
          setSectorvalue(editData[0].sector);
          setQuantity(editData[0].quantity);
        })
        .catch((error) => {
          console.error("Error fetching edit data:", error);
        });
    }
  }, [user.id, id]);

  return (
    <>
      <form onSubmit={handleFormSubmit} className="flex flex-col gap-y-3">
        <h3 className="m-0 font-extrabold text-2xl">Insert EEIO data here</h3>
        <div className="grid lg:grid-cols-2 gap-4">
          {/* Business Units */}
          <FormControl>
            <Label>Business Units</Label>
            <Select
              value={businessUnitsvalue}
              onChange={(e) => setBusinessUnitsvalue(e.target.value)}
            >
              <option value="">Select Option</option>
              {businessUnitsoption && businessUnitsoption.length > 0 ? (
                businessUnitsoption.map((option, index) => {
                  return (
                    <option value={option.unitname} key={index}>
                      {option.unitname}
                    </option>
                  );
                })
              ) : (
                <option disabled>
                  'Profile not found create profile first'
                </option>
              )}
            </Select>
          </FormControl>

          {/* Level 2 */}
          <FormControl>
            <Label>Level 2</Label>
            <Select
              value={Level2value}
              onChange={(e) => setLevel2value(e.target.value)}
            >
              <option value="">Select Option</option>
              {level2options &&
                level2options.map((option, index) => {
                  return (
                    <option value={option.level2} key={index}>
                      {option.level2}
                    </option>
                  );
                })}
            </Select>
          </FormControl>

          {/* Level 3 */}
          <FormControl>
            <Label>Level 3</Label>
            <Select
              value={Level3value}
              onChange={(e) => setLevel3value(e.target.value)}
            >
              <option value="">Select Option</option>
              {Level3option &&
                Level3option.map((option, index) => {
                  return (
                    <option value={option.level3} key={index}>
                      {option.level3}
                    </option>
                  );
                })}
            </Select>
          </FormControl>

          {/* Level 4 */}
          <FormControl>
            <Label>Level 4</Label>
            <Select
              value={Level4value}
              onChange={(e) => setLevel4value(e.target.value)}
            >
              <option value="">Select Option</option>
              {Level4option &&
                Level4option.map((option, index) => {
                  return (
                    <option value={option.level4} key={index}>
                      {option.level4}
                    </option>
                  );
                })}
            </Select>
          </FormControl>

          {/* Level 5 */}
          <FormControl>
            <Label>Level 5</Label>
            <Select
              value={Level5value}
              onChange={(e) => setLevel5value(e.target.value)}
            >
              <option value="">Select Option</option>
              {Level5option &&
                Level5option.map((option, index) => {
                  return (
                    <option value={option.level5} key={index}>
                      {option.level5}
                    </option>
                  );
                })}
            </Select>
          </FormControl>

          {/* Sector */}
          <FormControl>
            <Label>Sector</Label>
            <Select
              value={Sectorvalue}
              onChange={(e) => setSectorvalue(e.target.value)}
            >
              <option value="">Select Option</option>
              {Sectoroption &&
                Sectoroption.map((option, index) => {
                  return (
                    <option value={option.sector} key={index}>
                      {option.sector}
                    </option>
                  );
                })}
            </Select>
          </FormControl>

          {/* Currency */}
          <FormControl>
            <Label>Currency</Label>
            <Select
              value={currencyvalue}
              onChange={(e) => setCurrencyValue(e.target.value)}
            >
              <option value="pereuro">Per Euro</option>
            </Select>
          </FormControl>

          {/* Quantity */}
          <FormControl>
            <Label>Quantity</Label>
            <Input
              type="number"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
            />
          </FormControl>
        </div>

        {/* Add, Edit, Cancel Buttons */}
        {id ? (
          <div className="flex flex-col gap-4 md:flex-row">
            <Button
              type="button"
              className="flex-1 text-white bg-tc-green hover:bg-opacity-90"
              onClick={handleCancel}
            >
              Cancel
            </Button>
            <Button
              type="button"
              className="flex-1 text-white bg-tc-green hover:bg-opacity-90"
              onClick={handleUpdateData}
            >
              Edit
            </Button>
          </div>
        ) : (
          <Button
            type="submit"
            className="text-white bg-tc-green hover:bg-opacity-90"
          >
            Add
          </Button>
        )}
      </form>
    </>
  );
};

export default EeoiForm;
