import React, { useState, useEffect } from 'react';

//styles
import { Wrapper } from './TopRating.styles';

//Hooks
import { useTopRatingFetch } from '../../hooks/useTopRating';
//Config
import { IMAGE_BASE_URL, POSTER_SIZE } from "../../config";
//Components
import Carousel from "../Carousel/Carousel";
import CarouselItems from "../CarouselItems/CarouselItems";
import NoImage from '../../images/no_image.jpg';
import { Spinner } from "../Spinner/Spinner.styles";


const TopRating = ({ type }) => {
    const [thisType,_setThisType] = useState(type);
    const { state, loading, error, setType } = useTopRatingFetch();

    useEffect(()=>{
        setType(thisType);
    },[thisType, setType])


    if(error) return <div>Something went wrong...</div>;
    
    console.log(state);
    return (
        <>
        <Wrapper>
            {loading && <Spinner />}
            {type === "movie" &&
            <Carousel header="Top Rated Movies">
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
                    />
                ))}
            </Carousel>
            }
            {type === "tv" &&
            <Carousel header="Top Rated TV & Shows">
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

export default TopRating;