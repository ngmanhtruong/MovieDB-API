import React from "react";
import { useParams } from "react-router";
//Config
import { IMAGE_BASE_URL, POSTER_SIZE } from "../../config";

//Hook
import { useMovieRecFetch } from "../../hooks/useMovieRecFetch";

//Components
import Carousel from "../Carousel/Carousel";
import CarouselItems from "../CarouselItems/CarouselItems";
import NoImage from '../../images/no_image.jpg';
import { Spinner } from "../Spinner/Spinner.styles";
import CarouselMovies from '../CarouselMovies/CarouselMovies';
//styles
import { Wrapper } from './MovieRec.styles';


const MovieRec = ({ movieId }) => {
    const {state, loading, error } = useMovieRecFetch(movieId);
    if(error) return <div>Something went wrong...</div>;
    //console.log(state);

    return (
        <>
        <Wrapper>
            {loading && <Spinner />}
            <Carousel header='Recommendations'>
                {state.results.map(recommend=>(
                    <CarouselMovies
                        key={recommend.id}
                        clickable
                        image={
                            recommend.poster_path ? IMAGE_BASE_URL + POSTER_SIZE + recommend.poster_path 
                            : NoImage
                        }
                        movieId={recommend.id}
                        title={recommend.title}
                        vote_average={recommend.vote_average}
                    />
                ))}
            </Carousel>
        </Wrapper>

        </>
    )
}

export default MovieRec;