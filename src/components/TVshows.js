import react, { useState, useEffect } from "react";

//Config
import { POSTER_SIZE, BACKDROP_SIZE, IMAGE_BASE_URL } from '../config';
//Components
import HeroImage from "./HeroImage/HeroImage";

//Hook
import { useHomeFetch } from '../hooks/useHomeFetch';

//Components
import TopRating from "./TopRating/TopRating";
import PopularTV from "./PopularTV/PopularTV";
import AiringToday from "./AiringToday/AiringToday";


const TVShows = () => {
    const {state, loading, error} = useHomeFetch();
    if(error) return <div>Something went wrong...</div>;

    const random = Math.floor(Math.random() * state.results.length);
    const randomHeroImage = state.results[random];

    return (
        <>  
            {!loading && randomHeroImage && 
            <HeroImage 
                image={`${IMAGE_BASE_URL}original${randomHeroImage.backdrop_path}`}
                bigtext="Don't miss out your favourite tv shows & series"
            />
            }
            <PopularTV />
            <AiringToday />
            <TopRating type="tv"/>
        </>
    )
}

export default TVShows;