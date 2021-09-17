import React from 'react';
import { useParams } from 'react-router';
//config
import { IMAGE_BASE_URL, POSTER_SIZE } from '../config';
//Components
import Spinner from './Spinner/Spinner';import BreadCrumb from './BreadCrumb/BreadCrumb';
import MovieInfo from './MovieInfo/MovieInfo';
import MovieInfoBar from './MovieInfoBar/MovieInfoBar';
//Hook
import { useMovieFetch } from '../hooks/useMovieFetch';
import { useMovieRecFetch } from '../hooks/useMovieRecFetch';
//Image
import NoImage from '../images/no_image.jpg';
import Actor from './Actor/Actor';
import Carousel from './Carousel/Carousel';
import CarouselMovies from './CarouselMovies/CarouselMovies';
import NoPersonImage from '../images/no-image.svg';


const Movie = () => {
    const { movieId } = useParams();

    const {state:movie, loading, error} = useMovieFetch(movieId);
    const {state:recommends, loading:recommendLoading, error:recommendError } = useMovieRecFetch(movieId);
    if (loading) return <Spinner />;
    if (error) return <div>Something went wrong...</div>;
    
    //console.log(recommends.results);
    return (
        <>
            <BreadCrumb movieTitle={movie.title} />
            <MovieInfo movie={movie} />
            <MovieInfoBar
                time={movie.runtime}
                budget={movie.budget}
                revenue={movie.revenue}
            />
            <Carousel header='Directors'>
                {movie.directors.map(director=>(
                    <Actor
                        key={director.credit_id}
                        clickable
                        name={director.name}
                        character={director.department}
                        imageUrl={
                            director.profile_path
                            ? `${IMAGE_BASE_URL}${POSTER_SIZE}${director.profile_path}`
                            : NoPersonImage
                        }
                    />
                ))}
            </Carousel>
            <Carousel header='Actors'>
                {movie.actors.map(actor=>(
                    <Actor
                        key={actor.credit_id}
                        clickable
                        name={actor.name}
                        character={actor.character}
                        imageUrl={
                            actor.profile_path
                            ? `${IMAGE_BASE_URL}${POSTER_SIZE}${actor.profile_path}`
                            : NoPersonImage
                        }
                    />
                ))}
            </Carousel>
            {recommendError && <div>Can't find Recommendations</div>}
            <Carousel header='Recommendations'>
                {recommends.results.map(recommend=>(
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
        </>
    )
}

export default Movie;