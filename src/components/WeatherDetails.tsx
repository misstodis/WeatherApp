import { SingelWeatherDetailProps } from '@/Type/SingleWeahterDetailProps'
import React from 'react'
import { FaWind } from 'react-icons/fa';
import { FiDroplet } from 'react-icons/fi';
import { GiSunrise, GiSunset } from 'react-icons/gi';
import { ImMeter } from 'react-icons/im';
import { LuEye } from 'react-icons/lu'

export interface WeatherDetailProps {
    visability: string;
    humidity: string;
    windSpeed: string;
    airPressure: string;
    sunrise: string;
    sunset: string;
}

export default function WeatherDetail(props: WeatherDetailProps) {

    const {
        visability = "25km",
        humidity = "61%",
        windSpeed = "7 km/h",
        airPressure = "1012 ha",
        sunrise = "6.20",
        sunset = "15:40",
    } = props;

    return (
        <>
            <SingleWeatherDetail
                icon={<LuEye />}
                value={props.visability}
                information='Visability'
            />

            <SingleWeatherDetail
                icon={<FiDroplet />}
                value={props.humidity}
                information='Humidity'
            />

            <SingleWeatherDetail
                icon={<FaWind />}
                value={props.windSpeed}
                information='WindSpeed'
            />

            <SingleWeatherDetail
                icon={<ImMeter />}
                value={props.airPressure}
                information='AirPressure'
            />

            <SingleWeatherDetail
                icon={<GiSunrise />}
                value={props.sunrise}
                information='Sunrise'
            />

            <SingleWeatherDetail
                icon={<GiSunset />}
                value={props.sunset}
                information='Sunset'
            />
        </>
    )
}

function SingleWeatherDetail(props: SingelWeatherDetailProps) {
    return (
        <div className='flex flex-col justify-between gap-2 items-center text-xs font-semibold text-black/80'>
            <p className='whitespace-nowrap'> {props.information} </p>
            <div className='text-3xl'> {props.icon} </div>
            <p> {props.value} </p>
        </div>
    )
}