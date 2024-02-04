import React from 'react'
import WeatherCard from './WeatherCard'
import WeatherIcon from './WeatherIcon'
import WeatherDetail, { WeatherDetailProps } from './WeatherDetails'
import { convertKelvinToCelsius } from '@/utils/convertKelvinToCelsius';
import { TbTemperatureCelsius } from 'react-icons/tb';
import { metersToKilometer } from '@/utils/metersToKilometer';
import { convertWindSpeed } from '@/utils/convertWindSpeed';
import { format, fromUnixTime } from 'date-fns';

export interface ForcastWeatherDetailProps extends WeatherDetailProps {
  weatherIcon: string;
  date: string;
  day: string;
  temp: number;
  feelsLike: number;
  tempMin: number;
  tempMax: number;
  description: string;
}

export default function ForcastWeatherDetail(props: ForcastWeatherDetailProps) {
  return (
    <WeatherCard className='gap-4 mt-4'>
      {/* left */}
      <section className='flex gap4 items-center px-4'>
        <div className='flex flex-col items-center bg-gray-300 rounded-2xl p-1'>
          <WeatherIcon iconname={props.weatherIcon} />
          <p>{props.date}</p>
          <p className='text-sm'>{props.day}</p>
        </div>

        <div className='flex flex-col px-4'>
          <span className='flex text-4xl'>
            {convertKelvinToCelsius(props.temp ?? 0)}
            <TbTemperatureCelsius />
          </span>
          <p className='text-xs space-x-1 whitespace-nowrap'>
            <span className='flex'>
              Feels like {convertKelvinToCelsius(props.feelsLike ?? 0)}
              <TbTemperatureCelsius />
            </span>
          </p>
          <p className='capitalize'>{props.description}</p>
        </div>
      </section>

      {/* right */}
      <section className='flex overflow-auto justify-between gap-4 px-4 w-full pr-10'>
        <WeatherDetail
          {...props}
        />
      </section>
    </WeatherCard>
  )
}