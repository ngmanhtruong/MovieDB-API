import React from 'react';
import { useParams } from 'react-router';
//config
import { IMAGE_BASE_URL, POSTER_SIZE } from '../config';
//Components
import Spinner from './Spinner/Spinner';import BreadCrumb from './BreadCrumb/BreadCrumb';
import TVInfo from './TVInfo/TVInfo';

//Hook
import { useTVFetch } from '../hooks/useTVFetch';
//Image
import NoImage from '../images/no_image.jpg';
import Actor from './Actor/Actor';
import Carousel from './Carousel/Carousel';
import CarouselMovies from './CarouselMovies/CarouselMovies';
import NoPersonImage from '../images/no-image.svg';


const TV = () => {
    const { movieId } = useParams();

    const {state, loading, error} = useTVFetch(movieId);
    if (loading) return <Spinner />;
    if (error) return <div>Something went wrong...</div>;
    
    console.log(state);
    return (
        <>
            <BreadCrumb movieTitle={state.title} />
            <TVInfo movie={state} />

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
                    />
                ))}
            </Carousel>
            }
        </>
    )
}

export default TV;