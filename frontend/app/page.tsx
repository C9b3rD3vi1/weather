'use client';

import { useState } from "react";
import WeatherForm from "@/components/WeatherForm";
import WeatherCard from "@/components/WeatherCard";

type WeatherData = {
  city: string;
  temperature: number;
  description: string;
  icon: string;
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
        icon: data.icon
      });
    } catch (err: any) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="max-w-xl mx-auto p-4">
      <WeatherForm onSearch={fetchWeather} />
      {loading && <p className="text-center">Loading...</p>}
      {error && <p className="text-center text-red-500">{error}</p>}
      {weather && <WeatherCard weather={weather} />}
    </main>
  );
}
