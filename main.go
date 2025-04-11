package main

import (
	"encoding/json"
	"fmt"
	"io/ioutil"
	"log"
	"net/http"
	"os"
	"time"

	"github.com/joho/godotenv"
)

//weather struct format
// Full structure matching the API response
type Weather struct {
	Name    string `json:"name"`
	Main    struct {
		Temp     float64 `json:"temp"`
		Humidity int     `json:"humidity"`
		Pressure int     `json:"pressure"`
	} `json:"main"`
	Weather []struct {
		Description string `json:"description"`
	} `json:"weather"`
}

// function to load environment variables
func loadEnv() string {
	err := godotenv.Load()
	if err != nil {
		log.Fatal("Error loading .env file")
	}

	// Get the API key from environment variables
	apiKey := os.Getenv("API_KEY") // Set your OpenWeatherMap API key here

	// Check if the API key is set
	if apiKey == "" {
		log.Fatal("API key is not set. Please set the API key.")
		os.Exit(1)
	}
	fmt.Println("API Key loaded successfully:")
	return apiKey
}


// city variable to store the user input
var city string

func getWeather() (Weather, error) {

	apiKey := loadEnv()

	// Weather data url
	url := fmt.Sprintf("https://api.openweathermap.org/data/2.5/weather?q=%s&appid=%s&units=metric", city, apiKey)

	// make a GET request to the OpenWeatherMap API
	resp, err := http.Get(url)
	if err != nil {
		return Weather{}, err
	}
	// close the response body
	defer resp.Body.Close()

	//read the response body
	body, err := ioutil.ReadAll(resp.Body)
	if err != nil {
		return Weather{}, err
	}
	//parse the JSON response
	var weather Weather
	err = json.Unmarshal(body, &weather)
	if err != nil {
		return Weather{}, err
	}

	//return the weather data
	return weather, nil
}


// main function to run the program
func main() {

	// Allow the user to input a city name, multiple times until they enter "exit"
	for {
		fmt.Print("Enter city name (or type 'exit' to quit): ")
		fmt.Scanln(&city)
		if city == "exit" {
			break
		}
		

	// Fetch the weather data
	weather, err := getWeather()
	if err != nil {
		fmt.Println("Error fetching weather data:", err)
		os.Exit(1)
	}


	// Print the weather data
	fmt.Printf("\n")
	fmt.Printf("City: %s\n", weather.Name)
	// Simulate a delay
	time.Sleep(2 * time.Second)
	fmt.Printf("Temperature: %.2f°C\n", weather.Main.Temp)
	fmt.Printf("Description: %s\n", weather.Weather[0].Description)
	fmt.Printf("Humidity: %d%%\n", weather.Main.Humidity)
	fmt.Printf("Pressure: %d hPa\n", weather.Main.Pressure)
	// Simulate a delay
	time.Sleep(2 * time.Second)
	fmt.Printf("\n")
	// Print a message to indicate that the data has been fetched
	fmt.Println("Weather data fetched successfully!")
	// Simulate a delay
	time.Sleep(2 * time.Second)
}
}