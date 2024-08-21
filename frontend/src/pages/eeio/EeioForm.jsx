import { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { request } from "../../utils/request.js";
import Button from "../../components/ui/Button.jsx";
import FormControl from "../../components/FormControl.jsx";
import Input from "../../components/ui/Input.jsx";
import Label from "../../components/ui/Label.jsx";
import Select from "../../components/ui/Select.jsx";
import { UserContext } from "../../contexts/UserContext.jsx";

const EeoiForm = ({
  productOrIndustry,
  selectedLevel1,
  setSelectedLevel1,
  fetchUserBusinessUnitsActivities,
}) => {
  const { user } = useContext(UserContext);

  const [businessUnits, setBusinessUnits] = useState("");
  const [businessUnitValue, setBusinessUnitValue] = useState("");
  const [level2Options, setLevel2Options] = useState("");
  const [level2Value, setLevel2Value] = useState("");
  const [Level3Options, setLevel3Options] = useState("");
  const [level3Value, setLevel3Value] = useState("");
  const [Level4Options, setLevel4Options] = useState("");
  const [level4Value, setLevel4Value] = useState("");
  const [Level5Options, setLevel5Options] = useState("");
  const [level5Value, setLevel5Value] = useState("");
  const [sectorOptions, setSectorOptions] = useState("");
  const [sectorValue, setSectorValue] = useState("");
  const [currencyValue, setCurrencyValue] = useState("pereuro");
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
    // setLevel2Options([]);
    setLevel3Options([]);
    setLevel4Options([]);
    setLevel5Options([]);
    setBusinessUnitValue("");
    setLevel2Value("");
    setLevel3Value("");
    setLevel4Value("");
    setLevel5Value("");
    setSectorValue("");
    setQuantity("");
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    // Validate form fields
    if (
      !businessUnitValue ||
      !productOrIndustry ||
      !selectedLevel1 ||
      !level2Value ||
      !level3Value ||
      !level4Value ||
      !level5Value ||
      !sectorValue ||
      !currencyValue ||
      !quantity
    ) {
      toast.warn("Please fill all fields");
      return;
    }

    const payload = {
      productOrIndustry,
      level1: selectedLevel1,
      businessUnitId: businessUnitValue,
      level2: level2Value,
      level3: level3Value,
      level4: level4Value,
      level5: level5Value,
      sector: sectorValue,
      unitOfMeasurement: currencyValue,
      quantity,
    };

    await request(
      `${import.meta.env.VITE_API_BASE_URL}/businessUnitsActivities?eeio=true`,
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
        fetchUserBusinessUnitsActivities();
      })
      .catch((error) => {
        toast.error("Error adding data");
        console.error("Couldn't submit data", error);
      });
  };

  const handleUpdateData = async () => {
    // Validate form fields
    if (
      // !userId ||
      !businessUnitValue ||
      !selectedForm ||
      !selectedLevel1 ||
      (level2Options.length > 0 && !level2Value) ||
      (Level3Options.length > 0 && !level3Value) ||
      (Level4Options.length > 0 && !level4Value) ||
      (Level5Options.length > 0 && !level5Value) ||
      (sectorOptions.length > 0 && !sectorValue) ||
      !currencyValue ||
      !quantity
    ) {
      toast.warn("Please fill all fields");
      return;
    }

    // Create payload
    const payload = {
      userId,
      businessUnitValue,
      selectedForm,
      selectedLevel1,
      level2Value,
      level3Value,
      level4Value,
      level5Value,
      sectorValue,
      currencyValue,
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
          fetchUserBusinessUnitsActivities();
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

  const fetchBusinessUnits = async () => {
    try {
      const response = await request(
        `${import.meta.env.VITE_API_BASE_URL}/users/${user.id}/businessUnits`,
        "GET"
      );
      if (!response.ok) {
        throw new Error(JSON.stringify((await response.json()).error));
      }
      const businessUnits = await response.json();
      setBusinessUnits(businessUnits);
    } catch (error) {
      let errorMessage = JSON.parse(error.message).error;
      console.log(errorMessage);
      console.error("Error fetching businessUnits:", error);
    }
  };

  const fetchEeioLevel2 = async () => {
    try {
      const url = `${import.meta.env.VITE_API_BASE_URL}/eeios?productOrIndustry=${productOrIndustry}&level1=${selectedLevel1}&column=level2&distinct=true`;
      const response = await request(url, "GET");
      if (!response.ok) {
        throw new Error(`Failed to fetch data:`);
      }
      const jsonData = await response.json();
      setLevel2Options(jsonData);
    } catch (error) {
      console.log(error);
      setLevel2Options([]);
    }
  };

  const fetchEeioLevel3 = async () => {
    try {
      const url = `${import.meta.env.VITE_API_BASE_URL}/eeios?productOrIndustry=${productOrIndustry}&level1=${selectedLevel1}&level2=${level2Value}&column=level3&distinct=true`;
      const response = await request(url, "GET");
      if (!response.ok) {
        throw new Error(`Failed to fetch data:`);
      }
      const jsonData = await response.json();
      setLevel3Options(jsonData);
    } catch (error) {
      setLevel3Options([]);
    }
  };

  const fetchLevel4 = async () => {
    try {
      const url = `${import.meta.env.VITE_API_BASE_URL}/eeios?productOrIndustry=${productOrIndustry}&level1=${selectedLevel1}&level2=${level2Value}&level3=${level3Value}&column=level4&distinct=true`;
      const response = await request(url, "GET");
      if (!response.ok) {
        throw new Error(`Failed to fetch data:`);
      }
      const jsonData = await response.json();
      setLevel4Options(jsonData);
    } catch (error) {
      setLevel4Options([]);
    }
  };

  const fetchLevel5 = async () => {
    // setSectorValue("");
    try {
      const url = `${import.meta.env.VITE_API_BASE_URL}/eeios?productOrIndustry=${productOrIndustry}&level1=${selectedLevel1}&level2=${level2Value}&level3=${level3Value}&level4=${level4Value}&column=level5&distinct=true`;
      const response = await request(url, "GET");
      if (!response.ok) {
        throw new Error(`Failed to fetch data:`);
      }
      const jsonData = await response.json();
      setLevel5Options(jsonData);
    } catch (error) {
      setLevel5Options([]);
    }
  };

  const fetchSector = async () => {
    try {
      const url = `${import.meta.env.VITE_API_BASE_URL}/eeios?productOrIndustry=${productOrIndustry}&level1=${selectedLevel1}&level2=${level2Value}&level3=${level3Value}&level4=${level4Value}&level5=${level5Value}&column=sector&distinct=true`;
      const response = await request(url, "GET");
      if (!response.ok) {
        throw new Error(`Failed to fetch data:`);
      }
      const jsonData = await response.json();
      setSectorOptions(jsonData);
    } catch (error) {
      setSectorOptions([]);
    }
  };

  useEffect(() => {
    fetchBusinessUnits();
    fetchEeioLevel2();
  }, []);

  useEffect(() => {
    if (level2Value) {
      fetchEeioLevel3();
    }
  }, [level2Value]);

  useEffect(() => {
    if (level3Value) {
      fetchLevel4();
    }
  }, [level3Value]);

  useEffect(() => {
    if (level4Value) {
      fetchLevel5();
    }
  }, [level4Value]);

  useEffect(() => {
    if (level5Value) {
      fetchSector();
    }
  }, [level5Value]);

  // useEffect(() => {
  //   if (id && user.id) {
  //     fetchEditData(id, user.id)
  //       .then((editData) => {
  //         console.warn(editData);

  //         setSelectedLevel1(editData[0].level1);
  //         setBusinessUnitValue(editData[0].title);
  //         setLevel2Value(editData[0].level2);
  //         setLevel3Value(editData[0].level3);
  //         setLevel4Value(editData[0].level4);
  //         setLevel5Value(editData[0].level5);
  //         setSectorValue(editData[0].sector);
  //         setQuantity(editData[0].quantity);
  //       })
  //       .catch((error) => {
  //         console.error("Error fetching edit data:", error);
  //       });
  //   }
  // }, [user.id, id]);

  return (
    <>
      <form onSubmit={handleFormSubmit} className="flex flex-col gap-y-3">
        <h3 className="m-0 font-extrabold text-2xl">Insert EEIO data here</h3>
        <div className="grid lg:grid-cols-2 gap-4">
          {/* Business Unit */}
          <FormControl>
            <Label>Business Unit</Label>
            <Select
              value={businessUnitValue}
              onChange={(e) => setBusinessUnitValue(e.target.value)}
            >
              <option value="">Select Option</option>
              {businessUnits && businessUnits.length > 0 ? (
                businessUnits.map((options, index) => {
                  return (
                    <option value={options.id} key={index}>
                      {options.title}
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
              value={level2Value}
              onChange={(e) => setLevel2Value(e.target.value)}
            >
              <option value="">Select Option</option>
              {level2Options &&
                level2Options.map((options, index) => {
                  return (
                    <option value={options.level2} key={index}>
                      {options.level2}
                    </option>
                  );
                })}
            </Select>
          </FormControl>

          {/* Level 3 */}
          <FormControl>
            <Label>Level 3</Label>
            <Select
              value={level3Value}
              onChange={(e) => setLevel3Value(e.target.value)}
            >
              <option value="">Select Option</option>
              {Level3Options &&
                Level3Options.map((options, index) => {
                  return (
                    <option value={options.level3} key={index}>
                      {options.level3}
                    </option>
                  );
                })}
            </Select>
          </FormControl>

          {/* Level 4 */}
          <FormControl>
            <Label>Level 4</Label>
            <Select
              value={level4Value}
              onChange={(e) => setLevel4Value(e.target.value)}
            >
              <option value="">Select Option</option>
              {Level4Options &&
                Level4Options.map((options, index) => {
                  return (
                    <option value={options.level4} key={index}>
                      {options.level4}
                    </option>
                  );
                })}
            </Select>
          </FormControl>

          {/* Level 5 */}
          <FormControl>
            <Label>Level 5</Label>
            <Select
              value={level5Value}
              onChange={(e) => setLevel5Value(e.target.value)}
            >
              <option value="">Select Option</option>
              {Level5Options &&
                Level5Options.map((options, index) => {
                  return (
                    <option value={options.level5} key={index}>
                      {options.level5}
                    </option>
                  );
                })}
            </Select>
          </FormControl>

          {/* Sector */}
          <FormControl>
            <Label>Sector</Label>
            <Select
              value={sectorValue}
              onChange={(e) => setSectorValue(e.target.value)}
            >
              <option value="">Select Option</option>
              {sectorOptions &&
                sectorOptions.map((options, index) => {
                  return (
                    <option value={options.sector} key={index}>
                      {options.sector}
                    </option>
                  );
                })}
            </Select>
          </FormControl>

          {/* Currency */}
          <FormControl>
            <Label>Currency</Label>
            <Select
              value={currencyValue}
              onChange={(e) => setCurrencyValue(e.target.value)}
            >
              <option value="perEuro">Per Euro</option>
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
