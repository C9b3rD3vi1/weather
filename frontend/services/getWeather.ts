export async function getWeather(city: string) {
  const res = await fetch(`http://localhost:8080/api/weather?city=${city}`);
  if (!res.ok) {
    throw new Error("Failed to fetch weather");
  }
  return await res.json();
}
