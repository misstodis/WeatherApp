import React from 'react'

type Props = {}

export default function Loading({ }: Props) {
    return (
        <div className="flex items-center min-h-screen justify-center">
            <p className='animate-bounce text-9xl text-cyan-500'>🦆🦆🦆...</p>
        </div>
    )
}