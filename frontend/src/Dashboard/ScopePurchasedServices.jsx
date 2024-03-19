import React, { useState, useEffect } from 'react';

const ScopePurchasedServices = () => {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10; // Change this value to adjust the number of items per page

  useEffect(() => {
    // Fetch data from the API when the component mounts
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch('http://localhost:5000/Profiles');
      if (!response.ok) {
        throw new Error(`Failed to fetch data:`);
      }
      const jsonData = await response.json();
      console.log('Fetched data:', jsonData.datas); // Log fetched data
      setData(jsonData.datas);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  // Calculate the index range for the current page
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = data ? data.slice(indexOfFirstItem, indexOfLastItem) : [];


  const nextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const prevPage = () => {
    setCurrentPage((prevPage) => prevPage - 1);
  };

  return (
    <section className="w-[1286px] rounded-lg bg-white shadow-[0px_4px_60px_rgba(0,_0,_0,_0.02)] flex flex-col items-start justify-start pt-0 px-0 pb-6 box-border gap-[12px] max-w-full text-left text-2xs text-white font-poppins mq1325:w-[calc(100%_-_40px)]">
      {/* Your existing content */}
      {/* Table headers */}
      <div className="h-[57px] self-stretch rounded-t-lg rounded-b-none bg-brand-color-2 shadow-[0px_4px_60px_rgba(0,_0,_0,_0.02)] flex flex-row items-center justify-start pt-[7px] px-3.5 pb-1 box-border gap-[62px] max-w-full z-[1] mq450:gap-[62px] mq800:gap-[62px] mq1325:flex-wrap">
        {/* Table headers */}
        <div className="h-[57px] w-[1286px] gap-[25px] relative rounded-t-lg rounded-b-none bg-brand-color-2 shadow-[0px_4px_60px_rgba(0,_0,_0,_0.02)] hidden max-w-full"/>
        <div className="flex flex-row items-center justify-center gap-[110px] max-w-full mq450:flex-wrap" style={{ width: "1286px" }}>
          <div className="flex flex-col items-start justify-start py-0 pr-[9px] pl-0" style={{ width: "20%" }}>
            <div className="relative capitalize font-medium z-[2]">Scope</div>
          </div>
          <div className="flex flex-col items-start justify-start py-0 pr-5 pl-0" style={{ width: "20%" }}>
            <div className="relative capitalize font-medium z-[2]">Activity</div>
          </div>
          <div className="relative capitalize font-medium z-[2]" style={{ width: "20%" }}>Level 1</div>
          <div className="flex flex-col items-start justify-start py-0 pr-[39px] pl-0" style={{ width: "20%" }}>
            <div className="relative capitalize font-medium z-[2]">Level 2</div>
          </div>
          <div className="items-start justify-start py-0 pr-[13px] pl-0 box-border min-w-[38px]" style={{ width: "20%" }}>
            <div className="relative capitalize font-medium z-[2]">
              GHG Emission kg CO
              <span className="text-6xs">2e</span>
            </div>
          </div>
        </div>
      </div>
      {/* Table rows */}
      <div className="w-[1286px] gap-[25px]  self-stretch flex flex-col items-end justify-start  max-w-full text-dark">
        {currentItems.map((rowData, index) => (
          <div key={index} className="self-stretch flex flex-row flex-wrap items-center justify-start pt-0 pb-3 pr-8 pl-[17px] gap-[14px] border-b-[1px] border-solid border-whitesmoke">
            <div>{rowData.scope}</div>
            <div>{rowData.level1}</div>
            <div>{rowData.level2}</div>
            <div>{rowData.uom}</div>
            <div>{rowData.ghg}</div>
            <div>{rowData.ghgconversion}</div>
          </div>
        ))}
      </div>
      {/* Pagination */}
      <div className="flex justify-between mt-4">
        <button onClick={prevPage} disabled={currentPage === 1}>
          Previous
        </button>
        <button onClick={nextPage} disabled={indexOfLastItem >= (data?.length || 0)}>
  Next
</button>

      </div>
    </section>
  );
};

export default ScopePurchasedServices;
