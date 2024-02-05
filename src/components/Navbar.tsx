'use client'

import React, { useState } from 'react'
import { TiWeatherPartlySunny } from "react-icons/ti";
import { MdGpsFixed } from "react-icons/md";
import { GrMapLocation } from "react-icons/gr";
import SearchBox from './SearchBox';
import axios from 'axios';
import { error } from 'console';
import { useAtom } from 'jotai';
import { placeAtom } from '@/app/atom';
import Swal from 'sweetalert2';

type Props = {
    location: string
}

const API_KEY = process.env.NEXT_PUBLIC_WEATHER_KEY;

export default function Navbar({ location }: Props) {

    const [city, setCity] = useState("");
    const [error, setError] = useState("");

    const [suggestions, setSuggestions] = useState<string[]>([]);
    const [showSuggestions, setshowSuggestions] = useState(false);

    const [place, setPlace] = useAtom(placeAtom);

    const searchBoxHandler = async (value: string) => {
        setCity(value);

        if (city.length >= 3) {
            try {
                const respone = await axios.get(
                    `https://api.openweathermap.org/data/2.5/find?q=${value}&appid=${API_KEY}`
                );

                const suggestions = respone.data.list.map((item: any) => item.name)

                setSuggestions(suggestions);
                setError('');
                setshowSuggestions(true);
            } catch (error) {
                setSuggestions([]);
                setshowSuggestions(false);
            }
        }
        else {
            setSuggestions([]);
            setshowSuggestions(false);
        }
    }

    const handleSuggestionClick = (value: string) => {
        setCity(value)
        setshowSuggestions(false);
    }

    const handleSubmitSearch = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (suggestions.length == 0) {
            setError("Location not found");
        } else {
            setError('');
            setPlace(city);
            setshowSuggestions(false);
        }
    }

    const handleCurrentLocation = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(async (postion) => {
                const { latitude, longitude } = postion.coords

                try {
                    Swal.fire({
                        html: '<p class="mt-3 animate-bounce" >🦆🦆🦆...</p>',
                        timer: 2000,
                        showConfirmButton: false
                    }).then(async () => {
                        const respone = axios.get(
                            `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}`
                        );

                        setPlace((await respone).data.name);
                    })

                } catch (error) {
                    console.log(error);
                }

            });
        }
    }

    return (
        <nav className='shadow-sm sticky top-0 left-0 z-50 bg-white'>
            <div className='h-[80px] w-full flex justify-between items-center max-w-7x1 px-3 mx-auto'>
                <div className='flex items-center justify-center gap-2'>
                    <h2 className='text-gray-700 text-3xl'>Weather</h2>
                    <TiWeatherPartlySunny className='text-4xl text-yellow-400' />
                </div>
                <section className='flex items-center justify-center gap-2'>
                    <MdGpsFixed
                        className='text-4xl text-gray-600 hover:opacity-80 cursor-pointer'
                        onClick={handleCurrentLocation}
                    />
                    <GrMapLocation className='text-4xl text-gray-600 hover:opacity-80 cursor-pointer' />
                    <p className='text-slate-900/80 text-sm'>
                        {location}
                    </p>
                    <div className='relative'>
                        <SearchBox
                            value={city}
                            onChange={(e) => searchBoxHandler(e.target.value)}
                            onSubmit={(e) => handleSubmitSearch(e)}
                        />
                        {/* trick: hier is same like under( set props to a Component)

                            suggestions={suggestions}
                            error={error}
                            showSuggestions={showSuggestions}
                            handleSuggestionClick={ suggestionOnClickHandle }
                        */}
                        <SuggetionBox
                            {...{
                                showSuggestions,
                                suggestions,
                                handleSuggestionClick,
                                error,
                            }}
                        />
                    </div>
                </section>
            </div>
        </nav>
    )
}

function SuggetionBox(props: suggetionBoxType) {
    return (
        <>
            {(props.showSuggestions && props.suggestions.length > 1 || props.error) && (
                <ul className='mb-4 bg-white absolute border top-[44px] left-0 border-gray-300 rounded-md min-w-[200px] flex flex-col gap-1 py-2 px-2'>

                    {/* handle error */}
                    {props.error && props.suggestions.length < 1 && (
                        <li className='text-red-500 p-1'>{props.error}</li>
                    )}

                    {/* loop and show result after search */}
                    {props.suggestions.map((item, i) => (
                        <li
                            key={i}
                            className='cursor-pointer p-1 rounded hover:bg-blue-200'
                            onClick={() => props.handleSuggestionClick(item)}
                        >
                            {item}
                        </li>
                    ))}
                </ul>
            )}
        </>
    )
}

interface suggetionBoxType {
    showSuggestions: boolean;
    suggestions: string[];
    handleSuggestionClick: (item: string) => void;
    error: string;
}