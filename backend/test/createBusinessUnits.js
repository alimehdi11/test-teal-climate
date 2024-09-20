try {
  // Get all countries
  const url = `${process.env.API_BASE_URL}/countries`;
  const response = await fetch(url, {
    method: "GET",
    headers: {
      "Content-type": "application/json",
      Accept: "application/json",
      authorization: "Bearer " + process.env.TC_AUTH_TOKEN,
    },
  });
  const countriesData = await response.json();
  // Create business units for all continents->countries->regions
  const createBusinessUnit = async (item, index) => {
    const body = {
      title: `bu-${index + 1}`,
      continent: item.continent,
      country: item.name,
      region: item.region,
      noOfEmployees: 1,
      production: 1,
      revenue: 1,
      notes: 1,
      partnership: 100,
      period: "Jan 01, 2024 - Mar 31, 2024",
    };
    const url = `${process.env.API_BASE_URL}/businessUnits`;
    await fetch(url, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        Accept: "application/json",
        authorization: "Bearer " + process.env.TC_AUTH_TOKEN,
      },
      body: JSON.stringify(body),
    });
  };
  for (let index = 0; index < countriesData.length; index++) {
    await createBusinessUnit(countriesData[index], index);
  }
  console.log("Business units created successfully");
} catch (error) {
  console.log(error);
}
