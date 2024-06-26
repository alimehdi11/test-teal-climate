import React, { useState, useEffect } from "react";
import paths from "./Paths"; // Import the paths array from the external file

const WorldMap = () => {
  const [nameVisibility, setNameVisibility] = useState(false);
  const [name, setName] = useState("");
  const [time, setTime] = useState("");

  useEffect(() => {
    const handleMouseOver = (event) => {
      const countryName = event.target.id;
      setName(countryName);
      setNameVisibility(true);
    };

    const handleMouseLeave = () => {
      setNameVisibility(false);
    };

    const handleClick = async (event) => {
      const place = event.target.id;
      const api_url = `https://timezone.abstractapi.com/v1/current_time/?api_key=YOUR_API_KEY&location=${place}`;
      const response = await fetch(api_url);
      const data = await response.json();
      setTime(
        `${place}'s time = ${data.datetime} ${data.timezone_abbreviation}`
      );
    };

    const pathsElements = document.querySelectorAll(".allPaths");
    pathsElements.forEach((e) => {
      e.addEventListener("mouseover", handleMouseOver);
      e.addEventListener("mouseleave", handleMouseLeave);
      e.addEventListener("click", handleClick);

      return () => {
        e.removeEventListener("mouseover", handleMouseOver);
        e.removeEventListener("mouseleave", handleMouseLeave);
        e.removeEventListener("click", handleClick);
      };
    });
  }, []);

  return (
    <>
      <div className="relative">
        <svg
          id="allSvg"
          className="fill-current text-gray-300"
          strokeLinecap="round"
          strokeLinejoin="round"
          version="1.2"
          viewBox="0 0 2000 857"
          xmlns="http://www.w3.org/2000/svg"
        >
          {paths.map((path, index) => (
            <path key={index} id={path.id} className={path.class} d={path.d} />
          ))}
        </svg>
        {nameVisibility && (
          <div id="name" className="absolute bg-gray-200 p-1 rounded shadow">
            <p className="text-base">{name}</p>
          </div>
        )}
        {time && (
          <div id="time" className="absolute bg-gray-200 p-1 rounded shadow">
            {time}
          </div>
        )}
      </div>
    </>
  );
};

export default WorldMap;
