import { useEffect, useState } from 'react';
import FormControl from '../../components/FormControl';
import Label from '../../components/ui/Label';
import SearchableSelect from '../../components/ui/SearchableSelect';
import Select from '../../components/ui/Select';
import { usePeriod } from '../../contexts/PeriodProvider';
import { api } from "../../../api/index.js";
import Input from './../../components/ui/Input';
const ActivitiesForm2 = ({ businessUnits, selectedLevel, selectedScope }) => {
  const [selectedBusinessUnitId, setSelectedBusinessUnitId] = useState();
  const [level1CategoryOptions, setLevel1CategoryOptions] = useState([]);
  const [level2CategoryOptions, setLevel2CategoryOptions] = useState([]);
  const [level3CategoryOptions, setLevel3CategoryOptions] = useState([]);
  const [level4CategoryOptions, setLevel4CategoryOptions] = useState([]);
  const [level5CategoryOptions, setLevel5CategoryOptions] = useState([]);
  const [unitOfMeasurementOptions, setUnitOfMeasurementOptions] = useState([]);
  const [selectedLevel1Category, setSelectedLevel1Category] = useState();
  const [selectedLevel2Category, setSelectedLevel2Category] = useState();
  const [selectedLevel3Category, setSelectedLevel3Category] = useState();
  const [selectedLevel4Category, setSelectedLevel4Category] = useState();
  const [selectedLevel5Category, setSelectedLevel5Category] = useState();
  const [selectedUnitOfMeasurement, setSelectedUnitOfMeasurement] = useState();
  const [quantity, setQuantity] = useState("");
  const [month, setMonth] = useState();
  const { getPeriodMonths } = usePeriod();




  // Automatically set selectedBusinessUnitId if there's only one business unit
  useEffect(() => {
    if (businessUnits.length === 1) {
      setSelectedBusinessUnitId(businessUnits[0].id);
    }
  }, [businessUnits]);





  // Reusable fetch function for categories
  const fetchCategories = async (fetchFunction, setOptions, selectedId) => {
    if (selectedId == undefined) return;
    try {
      const categories = await fetchFunction();
      setOptions(categories.map(item => Object.values(item)[0]));
    } catch (error) {
      console.error("Failed to fetch categories:", error);
    }
  };

  // Fetch Level 1 Categories based on the selected business unit
  useEffect(() => {
    fetchCategories(
      () => api.level1Categories.getAllLevel1Categories(selectedLevel),
      setLevel1CategoryOptions,
      selectedBusinessUnitId
    );
  }, [selectedBusinessUnitId]);

  // Fetch Level 2 Categories based on the selected Level 1 Category
  useEffect(() => {
    const queryParams = `?scope=${selectedScope}&level1=${selectedLevel}&column=level2&distinct=true`
    fetchCategories(
      () => api.activities.getAllActivities(queryParams),
      setLevel2CategoryOptions,
      selectedLevel1Category
    );

  }, [selectedLevel1Category]);

  // Fetch Level 3 Categories based on the selected Level 2 Category
  useEffect(() => {
    const queryParams = `?scope=${selectedScope}&level1=${selectedLevel}&level2=${selectedLevel2Category}&column=level3&distinct=true`
    fetchCategories(
      () => api.activities.getAllActivities(queryParams),
      setLevel3CategoryOptions,
      selectedLevel2Category
    );


  }, [selectedLevel2Category]);


  useEffect(() => {
    const queryParams = `?scope=${selectedScope}&level1=${selectedLevel}&level2=${selectedLevel2Category}&level3=${selectedLevel3Category}&column=level4&distinct=true`
    // fetchCategories(
    //   () => api.activities.getAllActivities(queryParams),
    //   setLevel4CategoryOptions,
    //   selectedLevel3Category
    // ).then(() => {
    //   console.log("level4CategoryOptions", level4CategoryOptions)
    //   console.log("level5CategoryOptions", level5CategoryOptions)
    //   if(selectedLevel3Category){
    //     if (level4CategoryOptions.length == 0) {
    //       console.log("heloo");
    //       setSelectedLevel4Category("")
    //       setSelectedLevel5Category("")
    //     }
    //   }
    // })
    if (selectedLevel3Category) {
      (async () => {
        const level4Categories = await api.activities.getAllActivities(queryParams);
        setSelectedLevel4Category(level4Categories)

        console.log("level4Categories", level4Categories)
        if (level4Categories.length == 0) {
          console.log("hello");
          setSelectedLevel4Category("")
          setSelectedLevel5Category("")
        } 
      })()
    }

  }, [selectedLevel3Category])

  useEffect(() => {
    const queryParams = `?scope=${selectedScope}&level1=${selectedLevel}&level2=${selectedLevel2Category}&level3=${selectedLevel3Category}&level4=${selectedLevel4Category}&column=level5&distinct=true`
    if (level4CategoryOptions.length > 0 && level4CategoryOptions) {
      fetchCategories(
        () => api.activities.getAllActivities(queryParams),
        setLevel5CategoryOptions,
        selectedLevel4Category
      );
      if (level5CategoryOptions.length == 0) {
        setSelectedLevel5Category("")
      }
    }
  }, [selectedLevel4Category])

  useEffect(() => {

    const queryParams = `?scope=${selectedScope}&level1=${selectedLevel}&level2=${selectedLevel2Category}&level3=${selectedLevel3Category}&level4=${selectedLevel4Category}&level5=${selectedLevel5Category}&column=unitOfMeasurement&distinct=true`;

    const fetchCategories = async () => {
      try {
        const categories = await api.activities.getAllActivities(queryParams);
        setUnitOfMeasurementOptions(categories.map(item => Object.values(item)[0]));
      } catch (error) {
        console.error("Failed to fetch categories:", error);
      }
    };


    if (selectedLevel4Category !== undefined && selectedLevel5Category !== undefined) {
      fetchCategories();
    }


  }, [selectedLevel4Category, selectedLevel5Category]);













  const handleQuantity = (val) => {
    let qty = Number(val);
    if (qty != NaN || val == "") {
      if (isNaN(qty) && val != "") {
        return;
      } else {
        setQuantity(val)
      }
    }

  }


  return (
    <form className="flex flex-col gap-y-3 bg-white rounded-md p-6">
      <h3 className="m-0 font-extrabold text-2xl">Insert activity data here</h3>
      <div className="grid gap-4">
        <FormControl className="flex-1 relative">
          <Label>Month</Label>
          <SearchableSelect
            data={getPeriodMonths()}
            item={month}
            setItem={setMonth}
            text={"Select month"}
            placeholder={"Search month"}
          />
        </FormControl>

        <FormControl className="flex-1 relative">
          <Label>Business Unit</Label>
          <Select
            value={selectedBusinessUnitId || ""}
            onChange={(e) => setSelectedBusinessUnitId(e.target.value)}
          >
            <option value="">Select Option</option>
            {businessUnits.length > 0 ? (
              businessUnits.map((options, index) => (
                <option value={options.id} key={index}>
                  {options.title}
                </option>
              ))
            ) : (
              <option disabled>'Profile not found, create profile first'</option>
            )}
          </Select>
        </FormControl>

        <FormControl className="flex-1 relative">
          <Label>Level 1 Category</Label>
          <SearchableSelect
            data={level1CategoryOptions}
            item={selectedLevel1Category}
            setItem={setSelectedLevel1Category}
            text={"Select Level 1 Category"}
            placeholder={"Search Level 1 Category"}
          />
        </FormControl>

        <FormControl className="flex-1 relative">
          <Label>Level 2</Label>
          <SearchableSelect
            data={level2CategoryOptions}
            item={selectedLevel2Category}
            setItem={setSelectedLevel2Category}
            text={"Select Level 2 Category"}
            placeholder={"Search Level 2 Category"}
          />
        </FormControl>

        <FormControl className="flex-1 relative">
          <Label>Level 3</Label>
          <SearchableSelect
            data={level3CategoryOptions}
            item={selectedLevel3Category}
            setItem={setSelectedLevel3Category}
            text={"Select Level 3 Category"}
            placeholder={"Search Level 3 Category"}
          />
        </FormControl>
        {
          level4CategoryOptions.length > 0 &&
          <FormControl className="flex-1 relative">
            <Label>Level 4</Label>
            <SearchableSelect
              data={level4CategoryOptions}
              item={selectedLevel4Category}
              setItem={setSelectedLevel4Category}
              text={"Select Level 4 Category"}
              placeholder={"Search Level 4 Category"}
            />
          </FormControl>
        }
        {
          level5CategoryOptions.length > 0 &&
          <FormControl className="flex-1 relative">
            <Label>Level 5</Label>
            <SearchableSelect
              data={level5CategoryOptions}
              item={selectedLevel5Category}
              setItem={setSelectedLevel5Category}
              text={"Select Level 5 Category"}
              placeholder={"Search Level 5 Category"}
            />
          </FormControl>
        }
        <FormControl className="flex-1 relative">
          <Label>Unit Of Measurement</Label>
          <SearchableSelect
            data={unitOfMeasurementOptions}
            item={selectedUnitOfMeasurement}
            setItem={setSelectedUnitOfMeasurement}
            text={"Select Unit Of Measurement"}
            placeholder={"Select Unit Of Measurement"}
          />
        </FormControl>

        <FormControl className="flex-1 relative">
          <Label>Quantity</Label>
          <Input
            type="text"
            value={quantity}
            onChange={e => handleQuantity(e.target.value)}
            placeholder="Enter Quantity"
          />
        </FormControl>
      </div>
    </form>
  );
};

export default ActivitiesForm2;
