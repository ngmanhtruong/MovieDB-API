import React, { useEffect, useState } from "react";
//Config
import { POSTER_SIZE, BACKDROP_SIZE, IMAGE_BASE_URL } from '../config';
//Components
import HeroImage from "./HeroImage/HeroImage";
import Grid from "./Grid/Grid";
import Thumb from "./Thumb/Thumb";
import Spinner from './Spinner/Spinner';
import SearchBar from "./SearchBar/SearchBar";
import Button from "./Button/Button";
import { Link } from "react-router-dom";
import Title from "./Title/Title";
//Hook
import { useHomeFetch } from '../hooks/useHomeFetch';
import { useUpcomingFetch } from "../hooks/useUpcomingFetch";
//Image
import NoImage from '../images/no_image.jpg';


const Home = () => {
    const {state, loading, error, setSearchTerm, searchTerm, setIsLoadingMore} = useHomeFetch();
    const { state : upcomingState, loading : upcomingLoading, error : upcomingError, setIsLoadingMore : upSetIsLoadingMore } = useUpcomingFetch();
    const [popular, setPopular] = useState(true);
    const handleMovies = (type) =>{
        if (type === 'upcoming'){
            setPopular(false);
        } else {
            setPopular(true);
        }
    }
    console.log(state);
    if(error) return <div>Did Something went wrong ...</div>;
    if(upcomingError) return <div>Did Something went wrong ...</div>;
    return (
        <>
            {!searchTerm && state.results[0] ?
            <HeroImage
                image={`${IMAGE_BASE_URL}original${state.results[0].backdrop_path}`}
                title={state.results[0].original_title}
                text={state.results[0].overview}
            />
            : null}
            <SearchBar setSearchTerm={setSearchTerm} text="Search Movies"/>
            {!searchTerm && popular 
            ?
            <Title>
                <a 
                    className="active"
                    onClick= {()=>handleMovies('popular')}
                    >
                    Popular Movies
                </a>
                <span>|</span>
                <a onClick={()=>handleMovies('upcoming')}>
                    Upcoming Movies
                </a>
            </Title>
            :
            <Title>
                <a 
                    className="active"
                    onClick={()=>handleMovies('upcoming')}
                >
                    Upcoming Movies
                </a>
                <span>|</span>
                <a 
                    onClick= {()=>handleMovies('popular')}
                    >
                    Popular Movies
                </a>
            </Title>
        }
            {popular ?
            <>
                <Grid header={searchTerm && 'Search Result'}>
                    {state.results.map(movie=>(
                        <Thumb
                            key={movie.id}
                            clickable
                            image={
                                movie.poster_path ? IMAGE_BASE_URL + POSTER_SIZE + movie.poster_path 
                                : NoImage
                            }
                            movieId={movie.id}
                            title={movie.title}
                            voteAverage={movie.vote_average}
                            titleDisplay
                        />
                    ))}
                </Grid>
                {loading && <Spinner />}
                {state.page < state.total_pages && !loading && (
                    <Button text='Load More' callback={()=> setIsLoadingMore(true)}/>
                )}
            </>
            : 
            <>
                <Grid header={searchTerm && 'Search Result'}>
                    {upcomingState.results.map(movie=>(
                        <Thumb
                            key={movie.id}
                            clickable
                            image={
                                movie.poster_path ? IMAGE_BASE_URL + POSTER_SIZE + movie.poster_path 
                                : NoImage
                            }
                            movieId={movie.id}
                            title={movie.title}
                            voteAverage={movie.vote_average}
                            titleDisplay
                        />
                    ))}
                </Grid>
                {upcomingLoading && <Spinner />}
                {upcomingState.page < upcomingState.total_pages && !upcomingLoading && (
                    <Button text='Load More' callback={()=> upSetIsLoadingMore(true)}/>
                )}
            </>
            }
        </>
    )
}

export default Home;
