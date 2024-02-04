import React from 'react'
import WeatherIcon from './WeatherIcon'
import WeatherCard from './WeatherCard'
import WeatherDetail from './WeatherDetails'
import { metersToKilometer } from '@/utils/metersTOKilometer'
import { format, fromUnixTime } from 'date-fns'
import { convertWindSpeed } from '@/utils/convertWindSpeed'

type Props = {
    iconName: string,
    firstData: WeatherInfo | undefined,
    cityInfo: CityInfo | undefined
}

export default function MoreWeatherInfoTodayCard(props: Props) {
    return (
        <div className='flex mt-5'>
            <WeatherCard className='flex-col w-fit justify-center px-4 items-center'>
                <p className='capitalize text-center'>
                    {props.firstData?.weather[0].description}
                </p>
                <WeatherIcon iconname={props.iconName} />
            </WeatherCard>

            <WeatherCard className='ml-2 bg-yellow-300/80 border border-transparent px-6 gap-4 justify-between overflow-auto'>
                <WeatherDetail
                    visability={metersToKilometer(props.firstData?.visibility ?? 10000)}
                    humidity={`${props.firstData?.main.humidity}`}
                    windSpeed={convertWindSpeed(props.firstData?.wind.speed ?? 1.64)}
                    airPressure={`${props.firstData?.main.pressure} Hpa`}
                    sunrise={format(
                        fromUnixTime(props.cityInfo?.sunrise ?? 1702949452),
                        'H:mm'
                    )}
                    sunset={format(
                        fromUnixTime(props.cityInfo?.sunset ?? 1702949452),
                        'H:mm'
                    )}
                />
            </WeatherCard>
        </div>
    )
}