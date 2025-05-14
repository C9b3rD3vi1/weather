'use client';

import { useState } from "react";
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
      console.error("Weather fetch error:", error);
      alert("Error fetching weather");
    }
  };

  return (
    <main className="min-h-screen bg-base-200 flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md space-y-6">
        {/* Header Card */}
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-2 text-primary">C9b3rD3vi1 Weatherly ☀️</h1>
          <p className="text-sm text-base-content/70">Check real-time weather in any city</p>
        </div>

        {/* Input Card */}
        <div className="card bg-base-100 shadow-xl p-6 space-y-4">
          <input
            type="text"
            placeholder="Enter city"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className="input input-bordered w-full"
          />
          <button onClick={handleSearch} className="btn btn-primary w-full">
            Get Weather
          </button>
        </div>

        {/* Weather Display */}
        {weather && (
          <div className="card bg-base-100 shadow-lg p-6">
            <h2 className="card-title text-2xl text-center mb-4">{weather.name}</h2>
            <div className="space-y-2 text-base">
              <p><strong>🌡️ Temperature:</strong> {weather.main.temp} °C</p>
              <p><strong>☁️ Description:</strong> {weather.weather[0].description}</p>
              <p><strong>💧 Humidity:</strong> {weather.main.humidity}%</p>
              <p><strong>📈 Pressure:</strong> {weather.main.pressure} hPa</p>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
