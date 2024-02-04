'use client'

import Image from "next/image";
import Navbar from "../components/Navbar";
import { useQuery } from "react-query";
import axios from "axios";
import Loading from "@/components/Loading";
import { format, fromUnixTime, parseISO } from "date-fns";
import WeatherCard from "@/components/WeatherCard";
import { convertKelvinToCelsius } from "@/utils/convertKelvinToCelsius";
import { TbTemperatureCelsius, TbTemperatureMinus, TbTemperaturePlus } from "react-icons/tb";
import WeatherIcon from "@/components/WeatherIcon";
import { getDayOrNightIcon } from "@/utils/getDayOrNightIcon";
import ForcastWeatherDetail from "@/components/ForcastWeatherDetail";
import MoreWeatherInfoTodayCard from "@/components/MoreWeatherInfoTodayCard";
import { metersToKilometer } from "@/utils/metersToKilometer";
import { convertWindSpeed } from "@/utils/convertWindSpeed";

export default function Home() {
  const apiKey = process.env.NEXT_PUBLIC_WEATHER_KEY;

  const { isLoading, error, data } = useQuery<WeatherData>(
    'repoData',
    async () => {
      const { data } = await axios.get(
        `https://api.openweathermap.org/data/2.5/forecast?q=helmond&appid=${apiKey}&cnt=56`
      );

      return data;
    }
  )

  if (isLoading) return (
    <Loading />
  )


  const firstData = data?.list[0]

  const uniqueDates = [
    ...new Set(
      data?.list.map(
        (entry) => new Date(entry.dt * 1000).toISOString().split("T")[0]
      )
    )
  ];

  // console.log(uniqueDates);

  //filtering the data to get the first entry after 6Am for each unique date
  const firstDataForEachDate = uniqueDates.map((date) => {
    return data?.list.find((entry) => {
      const entryDate = new Date(entry.dt * 1000).toISOString().split("T")[0];
      const entryTime = new Date(entry.dt * 1000).getHours();

      return entryDate === date && entryTime >= 6;
    })
  })

  return (
    <div className="flex flex-col gap-4 bg-blue-300 min-h-screen">
      <Navbar />
      <main className="px-3 max-w-7xl mx-auto flex flex-col gap-9 w-full pb-10 pt-4">
        {/* today data */}
        <section className="">
          <h1 className="text-5xl font-extrabold text-black">{data?.city.name}</h1>
          <div className="mt-3">
            <h2 className="flex text-2xl gap-1 items-end">
              <p>{format(parseISO(firstData?.dt_txt ?? ''), 'EEEE')}</p>
              <p className='text-lg'>
                ({format(parseISO(firstData?.dt_txt ?? ''), 'dd.MM.yyyy')})
              </p>
            </h2>
            <div>
              <WeatherCard className='gap-10 px-6 items-center'>
                {/* temperature */}
                <div className='flex flex-col px-4'>
                  <span className='flex text-4xl'>
                    {convertKelvinToCelsius(firstData?.main.temp ?? 0)}
                    <TbTemperatureCelsius />
                  </span>
                  <p className="flex text-xs space-x-1 whitespace-nowrap">
                    <span>Feel like</span>
                    <span className="flex font-normal">
                      {convertKelvinToCelsius(firstData?.main.feels_like ?? 0)}
                      <TbTemperatureCelsius />
                    </span>
                  </p>
                  <p className='flex text-xs space-x-2 mt-1'>
                    <span className="flex">
                      {convertKelvinToCelsius(firstData?.main.temp_min ?? 0)}
                      <TbTemperatureMinus />
                    </span>
                    <span className="flex">
                      {convertKelvinToCelsius(firstData?.main.temp_max ?? 0)}
                      <TbTemperaturePlus />
                    </span>
                  </p>
                </div>

                {/* time and weather icon */}
                <div className="flex gap-10 sm:gap-16 overflow-x-auto w-full justify-between pr-3">
                  {data?.list.map((d, i) => (
                    <div
                      key={i}
                      className="flex flex-col justify-between gap2 items-center text-xs font-semibold"
                    >
                      <p className="whitespace-nowrap">
                        {format(parseISO(d.dt_txt), 'h:mm a')}
                      </p>
                      <WeatherIcon iconname={getDayOrNightIcon(d.weather[0].icon, d.dt_txt)} />
                      <p className="flex">
                        {convertKelvinToCelsius(firstData?.main.temp ?? 0)}
                        <TbTemperatureCelsius />
                      </p>
                    </div>
                  ))}
                </div>
              </WeatherCard>
            </div>
          </div>
          <MoreWeatherInfoTodayCard
            iconName={getDayOrNightIcon(
              firstData?.weather[0].icon ?? '',
              firstData?.dt_txt ?? ''
            )}
            firstData={firstData}
            cityInfo={data?.city}
          />
        </section >

        {/* 7  days data */}
        <section className="flex w-full flex-col gap 4" >
          <p>Forcast (7 days)</p>
          {
            firstDataForEachDate.map((d, i) => (
              <ForcastWeatherDetail
                key={i}
                description={d?.weather[0].description ?? ''}
                weatherIcon={d?.weather[0].icon ?? '01d'}
                date={format(parseISO(d?.dt_txt ?? ''), 'dd.MM')}
                day={format(parseISO(d?.dt_txt ?? ''), 'EEEE')}
                feelsLike={d?.main.feels_like ?? 0}
                temp={d?.main.temp ?? 0}
                tempMax={d?.main.temp_max ?? 0}
                tempMin={d?.main.temp_min ?? 0}
                airPressure={`${d?.main.pressure} hPa`}
                humidity={`${d?.main.humidity}%`}
                sunrise={format(
                  fromUnixTime(data?.city.sunrise ?? 1702517657),
                  'H:mm'
                )}
                sunset={format(
                  fromUnixTime(data?.city.sunset ?? 1702517657),
                  'H:mm'
                )}
                visability={`${metersToKilometer(d?.visibility ?? 100000)}`}
                windSpeed={`${convertWindSpeed(d?.wind.speed ?? 1.64)}`}
              />
            ))
          }
        </section >
      </main >
    </div >
  );
}
