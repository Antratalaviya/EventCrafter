import React from 'react'
import MaxActive from './MaxActive';
import { useMax } from '../context/useMax';
import CarouselHome from '../carousel';

function MaxHome() {
    const { active } = useMax();

    return (
        <>
            {active ? <MaxActive /> : <CarouselHome />}
        </>
    )
}

export default MaxHome
