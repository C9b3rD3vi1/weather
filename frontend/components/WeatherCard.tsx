type WeatherData = {
  city: string;
  temperature: number;
  description: string;
  icon: string;
  humidity?: number;
  wind?: number;
};

export default function WeatherCard({ weather }: { weather: WeatherData }) {
  return (
    <div className="card bg-base-200 shadow-md p-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">{weather.city}</h2>
          <p className="text-sm capitalize text-muted">{weather.description}</p>
        </div>

        <img
          src={`https://openweathermap.org/img/wn/${weather.icon}@2x.png`}
          alt={weather.description}
          className="w-20 h-20"
        />
        
      </div>

      <div className="mt-4 grid grid-cols-2 gap-4 text-sm">
        <div>
          <p className="text-muted">Temperature</p>
          <p className="font-semibold">{weather.temperature}°C</p>
        </div>
        {weather.humidity !== undefined && (
          <div>
            <p className="text-muted">Humidity</p>
            <p className="font-semibold">{weather.humidity}%</p>
          </div>
        )}
        {weather.wind !== undefined && (
          <div>
            <p className="text-muted">Wind Speed</p>
            <p className="font-semibold">{weather.wind} m/s</p>
          </div>
        )}
      </div>
    </div>
  );
}
