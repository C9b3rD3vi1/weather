'use client';

import { useState } from "react";
import { Input, Button } from "rippleui";  // Import from @rippleui/react package
import { getWeather } from "@/services/getWeather";

interface WeatherData {
  name: string;
  main: {
    temp: number;
    humidity: number;
    pressure: number;
  };
  weather: Array<{
    description: string;
  }>;
}

export default function Home() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState<WeatherData | null>(null);

  const handleSearch = async () => {
    try {
      const data = await getWeather(city);
      setWeather(data);
    } catch (error) {
      console.error('Weather fetch error:', error);
      alert("Error fetching weather");
    }
  };

  return (
    <div className="p-6 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">Weather App</h1>
      <Input
        placeholder="Enter city"
        value={city}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setCity(e.target.value)}
        className="mb-4"
      />
      <button
        onClick={handleSearch}
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        Get Weather
      </button>

      {weather && (
        <div className="mt-6 bg-white p-4 rounded shadow">
          <p><strong>City:</strong> {weather.name}</p>
          <p><strong>Temperature:</strong> {weather.main.temp} °C</p>
          <p><strong>Description:</strong> {weather.weather[0].description}</p>
          <p><strong>Humidity:</strong> {weather.main.humidity}%</p>
          <p><strong>Pressure:</strong> {weather.main.pressure} hPa</p>
        </div>
      )}
    </div>
  );
}
