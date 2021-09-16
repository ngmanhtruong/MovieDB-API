import React from "react";
//Config
import { IMAGE_BASE_URL, POSTER_SIZE } from "../../config";

//Hook
import { useTrendingFetch } from "../../hooks/useTrendingFetch";

//Components
import Carousel from "../Carousel/Carousel";
import CarouselItems from "../CarouselItems/CarouselItems";
import NoImage from '../../images/no_image.jpg';
import { Spinner } from "../Spinner/Spinner.styles";
//styles
import { Wrapper, Content } from './Trending.styles';


const Trending = ({ time, type}) => {
    const {state,loading,error} = useTrendingFetch(time="day",type="movie");
    if(error) return <div>Something went wrong...</div>;
    
    //console.log(state);
    return (
        <>
        <Wrapper>
            {loading && <Spinner />}
            <Carousel header="Trending Movies">
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

export default Trending;