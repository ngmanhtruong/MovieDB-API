import react, { useState, useEffect } from "react";
import MoviesCarousel from "./Carousel/Carousel";

//Config
import { POSTER_SIZE, BACKDROP_SIZE, IMAGE_BASE_URL } from '../config';
//Components
import HeroImage from "./HeroImage/HeroImage";

//Hook
import { useHomeFetch } from '../hooks/useHomeFetch';
//Image
import NoImage from '../images/no_image.jpg';
import Grid from "./Grid/Grid";
import Thumb from "./Thumb/Thumb";
import Spinner from './Spinner/Spinner';
import SearchBar from "./SearchBar/SearchBar";
import Button from "./Button/Button";
import { Link } from "react-router-dom";
import Title from "./Title/Title";
import Trending from "./Trending/Trending";
import NowPlaying from "./NowPlaying/NowPlaying";
import TopRating from "./TopRating/TopRating";
import Genres from "./Genres/Genres";


const Movies = () => {
    const {state, loading, error} = useHomeFetch();
    if(error) return <div>Something went wrong...</div>;

    const random = Math.floor(Math.random() * state.results.length);
    const randomHeroImage = state.results[random];
    console.log(state);
    return (
        <>  
            {randomHeroImage && 
            <HeroImage 
                image={`${IMAGE_BASE_URL}original${randomHeroImage.backdrop_path}`}
                bigtext='Millions of movies are waiting for you, explore now.'
            />
            }
            <Trending 
                time="day"
                type="movie"
            />
            <NowPlaying />
            <TopRating />
            <Genres 
                type="movie"
            />
        </>
    )
}

export default Movies;