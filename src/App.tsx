import { useState, FormEvent } from "react";
import axios from "axios";
import { format } from "date-fns";

function App() {
  const apiKey = "8b10eff6fd787d21bd7f5d2d710a1d28";
  const [location, setLocation] = useState<string>("");
  const [data, setData] = useState<TData | undefined>(undefined);
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const res = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=${apiKey}`
    );
    if (res) {
      setData(res.data);
    }
  };

  type TData = {
    name: string;
    id: number;
    main: {
      temp: number;
      temp_min: number;
      temp_max: number;
      presure: number;
      humidity: number;
      pressure: number;
    };
    wind: {
      speed: number;
    };
    weather: [
      {
        icon: string;
        main: string;
        description: string;
      }
    ];
  };

  return (
    <div className="w-full max-h-screen px-4 h-screen flex items-center justify-center overflow-hidden bg-[#151638]">
      <div className="max-w-sm text-white w-full rounded-2xl mx-auto p-10 bg-[#0b0c1e]">
        <form className="relative z-50" onSubmit={handleSubmit}>
          <div className="relative">
            <span className="absolute text-gray-500 translate-y-1/2 left-3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-5 h-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                />
              </svg>
            </span>
            <input
              value={location}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setLocation(e.target.value)
              }
              placeholder="Search location ..."
              type="text"
              className="w-full py-2 pl-10 pr-3 text-sm text-gray-400 bg-gray-800 outline-none focus:ring-2 ring-inherit focus:ring-blue-800 active:ring-2 active:ring-blue-800 placeholder:text-gray-500 rounded-2xl"
            />
          </div>
        </form>
        {data ? (
          <div className="flex flex-col w-full mt-6">
            <div className="flex flex-col">
              <div className="relative object-cover mx-auto -my-16 w-80 h-80 aspect-square">
                <img
                  className="w-full"
                  src={`https://openweathermap.org/img/wn/${data.weather[0].icon}@4x.png`}
                  alt=""
                />
              </div>
              <div className="relative flex flex-col items-center">
                <span className="text-4xl font-bold tracking-tighter text-blue-600">
                  {data.weather[0].main}
                </span>
                <span className="text-xl text-white/80">
                  Its {data.weather[0].description}
                </span>
                <span className="relative my-5 font-bold tracking-tighter text-8xl">
                  {Math.round(data.main.temp)}
                  <span className="absolute text-blue-600 text-7xl -top-4">
                    &deg;
                  </span>
                </span>
              </div>
            </div>
            <span className="mx-auto text-white/90">
              <span>{data.name}</span>
              {", "}
              <span>{format(new Date(), "dd MMM yyyy")}</span>
            </span>
            <div className="flex justify-between my-6">
              <div className="flex flex-col items-center">
                <span className="font-medium text-blue-600">
                  {data.wind.speed} km/h
                </span>
                <span className="text-sm text-white/70">Wind Speed</span>
              </div>
              <div className="flex flex-col items-center">
                <span className="font-medium text-blue-600">
                  {data.main.humidity}%
                </span>
                <span className="text-sm text-white/70">Humidity</span>
              </div>
              <div className="flex flex-col items-center">
                <span className="font-medium text-blue-600">
                  {data.main.pressure}
                </span>
                <span className="text-sm text-white/70">Pressure</span>
              </div>
            </div>
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
}

export default App;
