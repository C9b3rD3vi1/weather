package main
import (
	"fmt"
	"io/ioutil"
	"os"
	"net/http"
	"encoding/json"
	"time"
)

//weather struct format
type Weather struct {
	City string `json:"city"`
	Temp float64 `json:"temp"`
	Desc string `json:"desc"`
	Humidity int    `json:"humidity"`
	Pressure int    `json:"pressure"`
}


const apiKey = "apiKey"
func getweather() (Weather, error) {

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

func main() {
	// Check if the API key is set
	if apiKey == "" {
		fmt.Println("API key is not set. Please set the API key.")
		os.Exit(1)
	}



	// Simulate fetching weather data
	fmt.Println("Fetching weather data...")
}