import React from "react";
//Config
import { POSTER_SIZE, BACKDROP_SIZE, IMAGE_BASE_URL } from '../config';
//Components
import HeroImage from "./HeroImage/HeroImage";

//Hook
import { useUpcomingFetch } from "../hooks/useUpcomingFetch";
//Image
import NoImage from '../images/no_image.jpg';
import Grid from "./Grid/Grid";
import Thumb from "./Thumb/Thumb";
import Spinner from './Spinner/Spinner';
import SearchBar from "./SearchBar/SearchBar";
import Button from "./Button/Button";
import { Link } from "react-router-dom";
import Title from "./Title/Title";

const Upcoming = () => {
    const {state, loading, error, setSearchTerm, searchTerm, setIsLoadingMore} = useUpcomingFetch();
    
    if(error) return <div>Did Something went wrong ...</div>;
    console.log(state);
    
    return (
        <>
            {!searchTerm && state.results[0] ?
            <HeroImage
                image={`${IMAGE_BASE_URL}${BACKDROP_SIZE}${state.results[0].backdrop_path}`}
                title={state.results[0].original_title}
                text={state.results[0].overview}
            />
            : null}
            <SearchBar setSearchTerm={setSearchTerm}/>
            {!searchTerm &&<Title>
                <Link to='/upcoming' className="active">
                    Upcoming Movies
                </Link>
                <span>|</span>
                <Link to='/'>
                    Popular Movies
                </Link>
            </Title>
            }
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
    )
}

export default Upcoming;