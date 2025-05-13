'use client';

import { useState, useEffect, useMemo } from "react";
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
    icon: string;
  }>;
}

export default function Home() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(false);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [theme, setTheme] = useState("light");

  const popularCities = useMemo(
    () => ["Nairobi", "Mombasa", "Kisumu", "London", "Tokyo", "New York"],
    []
  );

  useEffect(() => {
    const storedTheme = localStorage.getItem("theme");
    if (storedTheme) {
      setTheme(storedTheme);
      document.documentElement.setAttribute("data-theme", storedTheme);
    }
  }, []);

  useEffect(() => {
    if (city.length > 0) {
      setSuggestions(
        popularCities.filter((c) =>
          c.toLowerCase().startsWith(city.toLowerCase())
        )
      );
    } else {
      setSuggestions([]);
    }
  }, [city, popularCities]);

  const handleSearch = async () => {
    setLoading(true);
    try {
      const data = await getWeather(city);
      setWeather(data);
    } catch (error) {
      console.error("Weather fetch error:", error);
      alert("Error fetching weather");
    }
    setLoading(false);
  };

  const handleThemeChange = (newTheme: string) => {
    setTheme(newTheme);
    document.documentElement.setAttribute("data-theme", newTheme);
    localStorage.setItem("theme", newTheme);
  };

  return (
    <main className="min-h-screen bg-base-200 flex items-center justify-center px-4 py-12 transition-all">
      <div className="w-full max-w-md space-y-6">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-4xl font-bold text-primary mb-2">
            C9b3rD3vi1 Weatherly ☀️
          </h1>
          <p className="text-sm text-base-content/70">
            Check real-time weather in any city
          </p>

          <div className="mt-4">
            <select
              aria-label="Select theme"
              className="select select-bordered w-full"
              value={theme}
              onChange={(e) => handleThemeChange(e.target.value)}
            >
              <option value="light">☀️ Light</option>
              <option value="dark">🌙 Dark</option>
              <option value="cupcake">🍰 Cupcake</option>
              <option value="dracula">🧛 Dracula</option>
              <option value="synthwave">🎶 Synthwave</option>
              <option value="corporate">🏢 Corporate</option>
              <option value="fantasy">🧚 Fantasy</option>
            </select>
          </div>
        </div>

        {/* Input Card */}
        <div className="card bg-base-100 shadow-xl p-6 space-y-4 relative">
          <input
            type="text"
            placeholder="Enter city"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className="input input-bordered w-full"
          />

          {/* Autocomplete Suggestions */}
          {suggestions.length > 0 && (
            <ul className="absolute top-20 left-6 right-6 bg-base-100 shadow-md rounded z-10">
              {suggestions.map((s, index) => (
                <li
                  key={index}
                  onClick={() => {
                    setCity(s);
                    setSuggestions([]);
                  }}
                  className="px-4 py-2 hover:bg-base-300 cursor-pointer"
                >
                  {s}
                </li>
              ))}
            </ul>
          )}

          <button
            onClick={handleSearch}
            className={`btn btn-primary w-full ${loading ? "btn-disabled" : ""}`}
          >
            {loading ? <span className="loading loading-spinner"></span> : "Get Weather"}
          </button>
        </div>

        {/* Weather Display */}
        {weather && (
          <div className="card bg-base-100 shadow-lg p-6">
            <h2 className="card-title text-2xl text-center mb-4">
              {weather.name}
            </h2>
            <div className="flex items-center justify-center mb-4">
              <img
                src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
                alt="Weather Icon"
                width={100}
                height={100}
              />
            </div>
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
