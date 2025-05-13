import Image from 'next/image';

type WeatherData = {
  city: string;
  temperature: number;
  description: string;
  icon: string;
};

export default function WeatherCard({ weather }: { weather: WeatherData }) {
  return (
    <div className="card w-full bg-base-200 shadow-md p-4">
      <h2 className="text-2xl font-bold">{weather.city}</h2>
      <p className="text-xl">{weather.temperature}°C</p>
      <p className="capitalize">{weather.description}</p>
      <Image
        src={`https://openweathermap.org/img/wn/${weather.icon}@2x.png`}
        alt={weather.description}
        width={80}
        height={80}
        className="w-20"
      />
    </div>
  );
}
