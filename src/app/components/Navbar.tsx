import React from 'react'
import { TiWeatherPartlySunny } from "react-icons/ti";
import { MdGpsFixed } from "react-icons/md";
import { GrMapLocation } from "react-icons/gr";

type Props = {}

export default function Navbar({ }: Props) {
    return (
        <nav className='shadow-sm sticky top-0 left-0 z-50 bg-white'>
            <div className='h-[80px] w-full flex justify-between items-center max-w-7x1 px-3 mx-auto'>
                <p className='flex items-center justify-center gap-2'>
                    <h2 className='text-gray-700 text-3xl'>Weather</h2>
                    <TiWeatherPartlySunny className='text-4xl text-yellow-400' />
                </p>
                <section className='flex items-center justify-center gap-2'>
                    <MdGpsFixed className='text-4xl text-gray-600 hover:opacity-80 cursor-pointer' />
                    <GrMapLocation className='text-4xl text-gray-600 hover:opacity-80 cursor-pointer' />
                    <p className='text-slate-900/80 text-sm'>
                        Netherland
                    </p>
                    <div>
                        {/* searchbox */}
                    </div>
                </section>
            </div>
        </nav>
    )
}