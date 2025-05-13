'use client';

import { useState } from "react";
import WeatherForm from "@/components/WeatherForm";
import WeatherCard from "@/components/WeatherCard";

type WeatherData = {
  city: string;
  temperature: number;
  description: string;
  icon: string;
  humidity?: number;
  wind?: number;
};

export default function HomePage() {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchWeather = async (city: string) => {
    setLoading(true);
    setError("");
    setWeather(null);

    try {
      const res = await fetch(`http://localhost:8000/api/weather?city=${city}`);
      if (!res.ok) throw new Error("City not found");
      const data = await res.json();

      setWeather({
        city: data.city,
        temperature: data.temp,
        description: data.description,
        icon: data.icon,
        humidity: data.humidity,
        wind: data.wind,
      });
    } catch (err: any) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-base-100 flex flex-col items-center justify-center px-4 py-8">
      <h1 className="text-4xl font-bold mb-4 text-primary">☀️ Weatherly</h1>
      <p className="text-md text-muted mb-6">Enter a city to get current weather</p>

      <div className="w-full max-w-md space-y-4">
        <WeatherForm onSearch={fetchWeather} />
        {loading && <p className="text-center text-accent">Loading...</p>}
        {error && <p className="text-center text-error">{error}</p>}
        {weather && <WeatherCard weather={weather} />}
      </div>
    </main>
  );
}
