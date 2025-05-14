import Image from 'next/image';

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
    <div className="card bg-base-200 shadow-md p-6 rounded-lg">
      <div className="flex items-center justify-between mb-4">
      <div>
        <h2 className="text-2xl font-bold text-primary">{weather.city}</h2>
        <p className="text-sm text-muted capitalize">{weather.description}</p>
        <Image
          src={`https://openweathermap.org/img/wn/${weather.icon}@2x.png`}
          alt={weather.description}
          width={80}
          height={80}
          className="w-16 h-16 sm:w-20 sm:h-20"
        />
      </div>

      <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
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
    </div>
  );
}
