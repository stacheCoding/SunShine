import React, { useState } from "react";
import WeatherForm from "./Weatherform";
import "./App.css";

function App() {
  const [location, setLocation] = useState("");
  const [units, setUnits] = useState("metric");
  const [selectedPeriod, setSelectedPeriod] = useState("1d");
  const [temperatureValues, setTemperatureValues] = useState([]);

  const handleGetWeather = async (location, units, selectedPeriod) => {
    const apiKey = "C2XROZfhblwj3OusXelFmIAiSiOkuBIz";
    const encodedLocation = encodeURIComponent(location);

    try {
      const response = await fetch(
        `https://api.tomorrow.io/v4/weather/forecast?location=${encodedLocation}&timesteps=${selectedPeriod}&units=${units}&apikey=${apiKey}`
      );

      if (!response.ok) {
        throw new Error("Failed to fetch weather data");
      }

      const data = await response.json();
      console.log("API Response:", data);

      let temperatureValues;

      if (selectedPeriod === "1d") {
        temperatureValues = data.timelines.daily
          .slice(0, 5)
          .map((dayData) => dayData.values.temperatureAvg);
      } else if (selectedPeriod === "1h") {
        temperatureValues = data.timelines.hourly
          .slice(0, 6)
          .map((hourData) => hourData.values.temperature);
      }

      console.log("Temperature values:", temperatureValues);
      setTemperatureValues(temperatureValues);
    } catch (error) {
      console.error("Error fetching weather data:", error.message);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <WeatherForm
          location={location}
          onLocationChange={setLocation}
          units={units}
          onUnitsChange={setUnits}
          selectedPeriod={selectedPeriod}
          onSelectedPeriodChange={setSelectedPeriod}
          onSubmit={handleGetWeather}
        />
        <div
          className={`temps ${
            temperatureValues.length > 0 ? "opacity-100" : "opacity-0"
          } flex flex-col justify-evenly h-96 bg-black rounded-3xl m-10 p-5`}
        >
          {temperatureValues.map((temperature, index) => {
            let displayText;
            if (selectedPeriod === "1d") {
              if (index === 0) {
                displayText = `The temperature average today is ${temperature}`;
              } else {
                const dayText = index > 1 ? "days" : "day";
                displayText = `The temperature average in ${index} ${dayText} is ${temperature}`;
              }
            } else if (selectedPeriod === "1h") {
              if (index === 0) {
                displayText = `The temperature now is ${temperature}`;
              } else {
                const hourText = index > 1 ? "hours" : "hour";
                displayText = `The temperature in ${index} ${hourText} is ${temperature}`;
              }
            }

            if (units === "metric") {
              displayText += "°C";
            } else if (units === "imperial") {
              displayText += "°F";
            }

            return <p key={index}>{displayText}</p>;
          })}
        </div>
      </header>
    </div>
  );
}

export default App;
