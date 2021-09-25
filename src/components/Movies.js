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
//Components
import Trending from "./Trending/Trending";
import NowPlaying from "./NowPlaying/NowPlaying";
import TopRating from "./TopRating/TopRating";
import Genres from "./Genres/Genres";


const Movies = () => {
    const {state, loading, error} = useHomeFetch();
    const [selectedGenres,setSelectedGenres] = useState([]);
    const [genres, setGenres] = useState([]);
    if(error) return <div>Something went wrong...</div>;

    const random = Math.floor(Math.random() * state.results.length);
    const randomHeroImage = state.results[random];

    return (
        <>  
            {!loading && randomHeroImage && 
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
            <TopRating type="movie"/>
        </>
    )
}

export default Movies;