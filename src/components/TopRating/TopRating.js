import React from 'react';

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


const TopRating = () => {
    const {state,loading,error} = useTopRatingFetch();
    if(error) return <div>Something went wrong...</div>;
    
    console.log(state);
    return (
        <>
        <Wrapper>
            {loading && <Spinner />}
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
        </Wrapper>

        </>
    )
}

export default TopRating;