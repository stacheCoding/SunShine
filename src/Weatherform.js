import React, { useState } from "react";
import "./Weatherform.css";
function WeatherForm({
  location,
  onLocationChange,
  units,
  onUnitsChange,
  selectedPeriod,
  onSelectedPeriodChange,
  onSubmit,
}) {
  const handleGetWeather = () => {
    onSubmit(location, units, selectedPeriod);
  };

  const handleUnitsChange = (newUnits) => {
    onUnitsChange(newUnits);
    onSubmit(location, newUnits, selectedPeriod);
  };

  const handlePeriodChange = (period) => {
    onSelectedPeriodChange(period);
    onSubmit(location, units, period);
  };

  return (
    <form className="flex flex-col items-center">
      <h1 className="borel-regular text-center text-5xl md:text-6xl lg:text-7xl mt-14">
        SunShine
      </h1>
      <input
        type="text"
        value={location}
        className="input-black py-2 px-3 mt-2 mb-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
        onChange={(e) => onLocationChange(e.target.value)}
        placeholder="Enter location"
      />
      <button
        type="button"
        className="relative my-2 px-6 py-2 text-base font-semibold text-center text-white transition duration-300 rounded-lg hover:from-purplse-600 hover:to-pink-600 ease bg-gradient-to-br from-purple-500 to-pink-500 md:w-auto"
        onClick={handleGetWeather}
      >
        Get Weather
      </button>
      <div>
        <button
          type="button"
          className="relative my-4 mr-2 relative px-6 py-2 text-base font-semibold text-center text-white transition duration-300 rounded-lg hover:from-purple-600 hover:to-pink-600 ease bg-gradient-to-br from-purple-500 to-pink-500 md:w-auto"
          onClick={() => handleUnitsChange("metric")}
        >
          Metric
        </button>
        <button
          type="button"
          className="relative px-6 py-2 text-base font-semibold text-center text-white transition duration-300 rounded-lg hover:from-purple-600 hover:to-pink-600 ease bg-gradient-to-br from-purple-500 to-pink-500 md:w-auto"
          onClick={() => handleUnitsChange("imperial")}
        >
          Imperial
        </button>
      </div>
      <div>
        <button
          type="button"
          className="relative my-4 mr-2 relative px-6 py-2 text-base font-semibold text-center text-white transition duration-300 rounded-lg hover:from-purple-600 hover:to-pink-600 ease bg-gradient-to-br from-purple-500 to-pink-500 md:w-auto"
          onClick={() => handlePeriodChange("1d")}
        >
          Daily
        </button>
        <button
          type="button"
          className="relative px-6 py-2 text-base font-semibold text-center text-white transition duration-300 rounded-lg hover:from-purple-600 hover:to-pink-600 ease bg-gradient-to-br from-purple-500 to-pink-500 md:w-auto"
          onClick={() => handlePeriodChange("1h")}
        >
          Hourly
        </button>
      </div>
    </form>
  );
}

export default WeatherForm;
