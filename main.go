package main

import (
	"fmt"
	"io"
	"net/http"
)

func getWeatherForecast(location, forecastType, units string) ([]byte, error) {
	// Make the API call to fetch weather data based on the location, forecast type, and units
	apiURL := fmt.Sprintf("https://api.torrow.io/weather?location=%s&forecastType=%s&units=%s", location, forecastType, units)
	resp, err := http.Get(apiURL)
	if err != nil {
		return nil, err
	}
	defer resp.Body.Close()

	// Read and parse the response body
	body, err := io.ReadAll(resp.Body)
	if err != nil {
		return nil, err
	}

	// Format the parsed data as needed
	// For example, you can unmarshal the JSON data into a struct and then manipulate the struct as needed
	// For brevity, let's assume the response is already in the desired format

	return body, nil
}

func getWeatherData(w http.ResponseWriter, r *http.Request) {
	// Get the location, forecast type, and units from the query parameters
	location := r.URL.Query().Get("location")
	forecastType := r.URL.Query().Get("forecastType")
	units := r.URL.Query().Get("units")

	// Call the getWeatherForecast function with the provided parameters
	weatherData, err := getWeatherForecast(location, forecastType, units)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	// Set the response headers for JSON content type
	w.Header().Set("Content-Type", "application/json")

	// Write the weather data as the response
	w.Write(weatherData)
}

func main() {
	http.HandleFunc("/weather", getWeatherData)
	fmt.Println("Server started on port 8080")
	http.ListenAndServe(":8080", nil)
}