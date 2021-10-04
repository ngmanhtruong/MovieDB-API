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

//Image
import Actor from './Actor/Actor';
import Carousel from './Carousel/Carousel';
import NoPersonImage from '../images/no-image.svg';
import MovieRec from './MovieRecommend/MovieRec';


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
            <MovieRec movieId = {movieId} header = 'Recommendations'/>
        </>
    )
}

export default Movie;