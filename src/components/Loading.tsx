import React from 'react'

type Props = {}

export default function Loading({ }: Props) {
    return (
        <div className="flex flex-col items-center min-h-screen justify-center">
            <p className='animate-spin text-9xl'>☀️</p>
            <p className='animate-bounce text-9xl text-cyan-500 mt-56'>🦆🦆🦆...</p>
        </div>
    )
}