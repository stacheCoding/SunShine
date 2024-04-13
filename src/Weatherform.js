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
    <form>
      <input
        type="text"
        value={location}
        onChange={(e) => onLocationChange(e.target.value)}
        placeholder="Enter location"
      />
      <button type="button" onClick={handleGetWeather}>
        Get Weather
      </button>
      <div>
        <button type="button" onClick={() => handleUnitsChange("metric")}>
          Metric
        </button>
        <button type="button" onClick={() => handleUnitsChange("imperial")}>
          Imperial
        </button>
      </div>
      <div>
        <button type="button" onClick={() => handlePeriodChange("1d")}>
          Daily
        </button>
        <button type="button" onClick={() => handlePeriodChange("1h")}>
          Hourly
        </button>
      </div>
    </form>
  );
}

export default WeatherForm;
