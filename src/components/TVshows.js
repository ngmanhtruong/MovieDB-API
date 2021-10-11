import react, { useState, useEffect } from "react";

//Config
import { POSTER_SIZE, BACKDROP_SIZE, IMAGE_BASE_URL } from '../config';
//Components
import HeroImage from "./HeroImage/HeroImage";

//Hook
import { usePopularTvFetch } from "../hooks/usePopularTvFetch";

//Components
import TopRatingTV from './TopRatingTV/TopRatingTV';
import PopularTV from "./PopularTV/PopularTV";
import AiringToday from "./AiringToday/AiringToday";
import BreadCrumb from "./BreadCrumb/BreadCrumb";



const TVShows = () => {
    const {state, loading, error} = usePopularTvFetch();
    if(error) return <div>Something went wrong...</div>;

    const random = Math.floor(Math.random() * state.results.length);
    const randomHeroImage = state.results[random];
    return (
        <>  
            <BreadCrumb movieTitle="TV & Shows"/>
            {!loading && randomHeroImage && 
            <HeroImage 
                image={`${IMAGE_BASE_URL}original${randomHeroImage.backdrop_path}`}
                bigtext="Don't miss out your favourite tv shows & series"
            />
            }
            <PopularTV />
            <AiringToday />
            <TopRatingTV />
        </>
    )
}

export default TVShows;