import React, { useState } from "react";
import { useEffect } from "react";
//Config
import { IMAGE_BASE_URL, POSTER_SIZE } from "../../config";

//Hook
import { useTrendingFetch } from "../../hooks/useTrendingFetch";

//Components
import Carousel from "../Carousel/Carousel";
import CarouselItems from "../CarouselItems/CarouselItems";
import NoImage from '../../images/no_image.jpg';
import { Spinner } from "../Spinner/Spinner.styles";
import Grid from '../Grid/Grid';
//styles
import { Wrapper } from './Trending.styles';


const Trending = ({ time, type}) => {
    const [thisTime, _setThisTime] = useState(time);
    const [thisType,_setThisType] = useState(type);

    const {state, loading, error, setTime, setType} = useTrendingFetch();

    useEffect(()=>{
        setTime(thisTime);
        setType(thisType);
    },[thisTime, thisType, setTime, setType])

    
    if(error) return <div>Something went wrong...</div>;
    //console.log(state);
    return (
        <>
        <Wrapper>
            {loading && <Spinner />}
            {type==="movie" &&
            <Grid header="Trending Movies" isHome={false}>
                {state.results.map(movie=>(
                    <CarouselItems 
                    key={movie.id}
                    clickable
                    image={
                        movie.poster_path ? IMAGE_BASE_URL + POSTER_SIZE + movie.poster_path
                        : NoImage
                    }
                    movieId={movie.id}
                    title={movie.title}
                    vote_average={movie.vote_average}
                    release_date={movie.release_date}
                    isCarousel = {false}
                    />
                ))}
            </Grid>
            }
            {type==="tv" &&
            <Carousel header="Trending TV & Shows">
                {state.results.map(movie=>(
                    <CarouselItems 
                    key={movie.id}
                    clickable
                    image={
                        movie.poster_path ? IMAGE_BASE_URL + POSTER_SIZE + movie.poster_path
                        : NoImage
                    }
                    movieId={movie.id}
                    title={movie.name}
                    vote_average={movie.vote_average}
                    first_air_date={movie.first_air_date}
                    />
                ))}
            </Carousel>
            }
        </Wrapper>

        </>
    )
}

export default Trending;