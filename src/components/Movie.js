import React from 'react';
import { useParams } from 'react-router';

//config
import { IMAGE_BASE_URL, POSTER_SIZE } from '../config';

//Components
import Spinner from './Spinner/Spinner';import BreadCrumb from './BreadCrumb/BreadCrumb';
import MovieInfo from './MovieInfo/MovieInfo';
import MovieInfoBar from './MovieInfoBar/MovieInfoBar';
import CarouselItems from './CarouselItems/CarouselItems';
import CarouselTrailers from './CarouselTrailers/CarouselTrailers';
import TrailersItem from './TrailersItem/TrailersItem';

//Hook
import { useMovieFetch } from '../hooks/useMovieFetch';

//Image
import Actor from './Actor/Actor';
import Carousel from './Carousel/Carousel';
import NoPersonImage from '../images/no-image.svg';
import MovieRec from './MovieRecommend/MovieRec';
import NoImage from '../images/no_image.jpg';


const Movie = () => {
    const { movieId } = useParams();

    const {state, loading, error} = useMovieFetch(movieId);
    
    if (loading) return <Spinner />;
    if (error) return <div>Something went wrong...</div>;
    // console.log(state);

    return (
        <>
            <BreadCrumb movieTitle={state.title} />

            <MovieInfo movie={state} />

            <MovieInfoBar
                time={state.runtime}
                budget={state.budget}
                revenue={state.revenue}
            />
                        {state.directors &&
            <Carousel header='Directors'>
                {state.directors.map(director => (
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
                        personId={director.id}
                    />
                ))}
            </Carousel>
            }
            {state.actors &&
            <Carousel header='Actors'>
                {state.actors.map(actor=>(
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
                        personId={actor.id}
                    />
                ))}
            </Carousel>
            }
            {state.videos && state.videos.results.length > 0 &&
            <CarouselTrailers 
                header='Videos'
                notHomePage = {true}
                background= {`https://img.youtube.com/vi/${state.videos.results[0].key}/hqdefault.jpg`}
            >
                {state.videos.results.map(movie => (
                    <TrailersItem 
                        key = {movie.id}
                        image= {
                            `https://img.youtube.com/vi/${movie.key}/hqdefault.jpg`
                        }
                        title = {movie.name}
                        backgroundLink = {`https://img.youtube.com/vi/${movie.key}/hqdefault.jpg`}
                        videoId = {movie.key}
                        
                    />
                ))}
            </CarouselTrailers>
            }
            {state.similar &&
            <Carousel header='Similar Movies'>
                {state.similar.results.map(movie=>(
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
                        media_type = {movie.media_type}
                        release_date = {movie.release_date}
                        first_air_date = {movie.first_air_date}
                    />
                ))}
            </Carousel>
            }
            <MovieRec movieId = {movieId} header = 'Recommendations'/>
        </>
    )
}

export default Movie;