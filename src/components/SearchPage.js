import React, { useEffect, useState } from "react";

//Config
import { POSTER_SIZE, BACKDROP_SIZE, IMAGE_BASE_URL } from '../config';

//Image
import NoImage from '../images/no_image.jpg';
import NoPersonImage from '../images/no-image.svg';


//components
import Title from './Title/Title';
import Genres from "./Genres/Genres";
import Grid from './Grid/Grid';
import Thumb from "./Thumb/Thumb";
import Spinner from "./Spinner/Spinner";
import Button from './Button/Button';
import CarouselItems from "./CarouselItems/CarouselItems";

//helpers
import { selectGenreName } from "../helpers";
//hooks
import { useSearchPageFetch } from "../hooks/useSearchPageFetch";
import { useGenresFetch } from "../hooks/useGenresFetch";

const SearchPage = () => {
    const { 
        state, 
        loading, 
        error, 
        setGenreforURL, 
        setIsLoadingMore,
        setType
    } = useSearchPageFetch();

    const { movieState, 
        tvState, 
        loading: genresLoading, 
        error: genresError 
    } = useGenresFetch();

    // console.log(movieState, tvState);
    const [whichType, setWhichType] = useState('movie');
    const [genres, setGenres] = useState([]);
    const [selectedGenres, setSelectedGenres] = useState([]);
    const genresURL = selectGenreName(selectedGenres);

    const handleType = (e) => {
        if (e === 'movie'){
            setWhichType('movie');
            setType('movie');
            setGenreforURL('');
            setSelectedGenres([]);
        } else {
            setWhichType('tv');
            setType('tv');
            setGenreforURL('');
            setSelectedGenres([]);
        }
    }

    if(error) return <div><p>Something is wrong...</p></div>
    return (
        <>
            <h1 className='text-center active'>Search With Genres</h1>
            {whichType === 'movie'
                ?
                <Title>
                    <a 
                        className="active"
                        onClick= {()=>handleType('movie')}
                        >
                        Movies
                    </a>
                    <span>|</span>
                    <a onClick={()=>handleType('tv')}>
                        TV
                    </a>
                </Title>
                :
                <Title>
                    <a 
                        onClick= {()=>handleType('movie')}
                        >
                        Movies
                    </a>
                    <span>|</span>
                    <a 
                        className="active"
                        onClick={()=>handleType('tv')}
                    >
                        TV
                    </a>
                </Title>
            }
            {whichType ==='movie' 
                ?
                <Genres 
                    selectedGenres={selectedGenres}
                    setSelectedGenres={setSelectedGenres}
                    genres={genres}
                    setGenres={setGenres}
                    setGenreforURL={setGenreforURL}
                    setType={setType}
                    setWhichType={setWhichType}
                    state={movieState}
                />
                :
                <Genres 
                    selectedGenres={selectedGenres}
                    setSelectedGenres={setSelectedGenres}
                    genres={genres}
                    setGenres={setGenres}
                    setGenreforURL={setGenreforURL}
                    state={tvState}
                />
            }
            {genresURL !== '' && <p className='text-center'>With Selected: {genresURL} </p>}
            <Grid header='Search Results'>
                {state.results.map(movie=>(
                    <CarouselItems 
                        key={movie.id}
                        clickable
                        image={
                            movie.poster_path ? IMAGE_BASE_URL + POSTER_SIZE + movie.poster_path
                            : NoImage
                        }
                        movieId={movie.id}
                        title={movie.name ? movie.name : movie.title}
                        vote_average={movie.vote_average}
                        release_date={movie.release_date}
                        first_air_date={movie.first_air_date}
                        isCarousel = {false}
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

export default SearchPage;
